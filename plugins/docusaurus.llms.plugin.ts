import type { LoadContext, Plugin, RouteConfig } from "@docusaurus/types";
import { flattenRoutes } from "@docusaurus/utils";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

interface PluginOptions {
  ignorePatterns?: string[];
  docsDir: string;
  sidebars?: string[];
}

/**
 * Generate /llms.txt files
 *
 * @link https://llmstxt.org/
 */
export default function docusaurusPluginLLMs(
  context: LoadContext,
  userOptions: Partial<PluginOptions> = {}
): Plugin<void> {
  return {
    name: "docusaurus-llms-txt-plugin",

    async postBuild({ routes, routesBuildMetadata }): Promise<void> {
      console.log("Generating /llms.txt documentation...");

      const { sidebars, ...options } = {
        docsDir: "docs",
        sidebars: ["docs", "references"],
        ...userOptions
      };

      const finalRoutes = flattenRoutes(routes);

      const filteredRoutes = finalRoutes.filter(
        ({ sidebar }) =>
          typeof sidebar === "string" && sidebars.includes(sidebar)
      );

      type RoutePath = string;
      type TreeRoute = {
        config: RouteConfig;
        children?: RouteConfig[];
      };

      const categoryRoutes = filteredRoutes.filter(
        ({ component }) => component === "@theme/DocCategoryGeneratedIndexPage"
      );

      const allTreeRoutes = filteredRoutes.filter((route) => {
        const isPathTree =
          filteredRoutes.find(
            ({ path }) => path.startsWith(route.path) && path !== route.path
          ) !== undefined;

        return isPathTree;
      });

      // We flatten the routes. For example if the tree contains both
      // /docs/build/functions/
      // and
      // /docs/build/functions/rust/
      // as anchors. We keep only the shortest one assuming it is the anchor for the all group.
      const flattenTreeRoutes = allTreeRoutes.filter(
        ({ path }) =>
          allTreeRoutes.find(
            ({ path: routePath }) =>
              path.startsWith(routePath) && path !== routePath
          ) === undefined
      );

      const treeRoutes = flattenTreeRoutes.reduce<Record<RoutePath, TreeRoute>>(
        (acc, { path, ...rest }) => {
          const children = filteredRoutes.filter(
            ({ path: childPath }) =>
              childPath.startsWith(path) && childPath !== path
          );

          return {
            ...acc,
            [path]: {
              config: {
                path,
                ...rest
              },
              children
            }
          };
        },
        {}
      );

      const leafRoutes = filteredRoutes.filter(({ path: routePath }) => {
        const isTreeRoute =
          Object.entries(treeRoutes).find(
            ([treePath, { children }]) =>
              routePath.startsWith(treePath) ||
              routePath === treePath ||
              children.find(({ path }) => path === routePath) !== undefined
          ) !== undefined;

        const isCategoryRoute =
          categoryRoutes.find(
            ({ path: categoryPath }) =>
              routePath.startsWith(categoryPath) || routePath === categoryPath
          ) !== undefined;

        return !isTreeRoute && !isCategoryRoute;
      });

      console.log(leafRoutes);

      // filteredRoutes.forEach((route) => {
      //   console.log(route);
      //   if (route.metadata?.sourceFilePath) {
      //     console.log(
      //       `Route ${route.path} was created from markdown file ${route.metadata?.sourceFilePath}`
      //     );
      //   }
      // });

      const allDocFiles = await collectDocsFiles({ context, options });
    }
  };
}

const collectDocsFiles = async ({
  context,
  options
}: {
  context: LoadContext;
  options: PluginOptions;
}): Promise<string[]> => {
  const { siteDir, outDir } = context;
  const { ignorePatterns = [], docsDir } = options;

  const fullDocsDir = join(siteDir, docsDir);
  const docFiles = await findAllDocsFilePaths({
    dir: fullDocsDir,
    ignorePatterns
  });

  const generatedDocFiles = docFiles.filter((docFile) => {
    const htmlFile = join(
      outDir,
      relative(siteDir, docFile).replace(/\.mdx?$/, "/index.html")
    );
    return existsSync(htmlFile);
  });

  return docFiles;
};

const findAllDocsFilePaths = async ({
  dir,
  ignorePatterns
}: {
  dir: string;
  ignorePatterns?: string[];
}): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });

  const files: string[] = [];
  for (const entry of entries) {
    // Path is deprecated but, current Node types do not provide parentPath
    // https://github.com/nodejs/node/issues/51955
    const { name: entryName, path: entryPath } = entry;
    const fullPath = join(entryPath, entryName);

    // TODO: ignorePatterns

    if (entry.isDirectory()) {
      const subFiles = await findAllDocsFilePaths({
        dir: fullPath,
        ignorePatterns
      });
      files.push(...subFiles);
    } else if (entryName.endsWith(".md") || entryName.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
};
