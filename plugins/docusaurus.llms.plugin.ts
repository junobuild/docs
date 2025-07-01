import type { LoadContext, Plugin, RouteConfig } from "@docusaurus/types";
import { Props } from "@docusaurus/types/src/context";
import { flattenRoutes } from "@docusaurus/utils";
import { dirname } from "node:path";

interface PluginOptions {
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

      const allRoutes = await collectDocsRoutes({ routes, sidebars });

      console.log(routesBuildMetadata);
    }
  };
}

type RoutePath = string;
type TreeRoute = {
  config?: RouteConfig;
  children: RouteConfig[];
};

type Routes = Record<RoutePath, TreeRoute>;

const collectDocsRoutes = async ({
  routes,
  sidebars
}: Pick<Props, "routes"> &
  Required<Pick<PluginOptions, "sidebars">>): Promise<Routes> => {
  const finalRoutes = flattenRoutes(routes);

  const filteredRoutes = finalRoutes.filter(
    ({ sidebar }) => typeof sidebar === "string" && sidebars.includes(sidebar)
  );

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

  const categorisedTreeRoutes = flattenTreeRoutes.reduce<Routes>(
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
      Object.entries(categorisedTreeRoutes).find(
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

  const leafTreeRoutes = leafRoutes.reduce<Routes>((acc, { path, ...rest }) => {
    const category = dirname(path);

    return {
      ...acc,
      [category]: {
        ...(acc[category] ?? {}),
        children: [...(acc[category]?.children ?? []), { path, ...rest }]
      }
    };
  }, {});

  return {
    ...leafTreeRoutes,
    ...categorisedTreeRoutes
  };
};
