import type { LoadContext, Plugin } from "@docusaurus/types";
import { JSDOM } from "jsdom";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import TurndownService, { Options, Node as TurndownNode } from "turndown";

interface PluginOptions {
  docsDir: string;
  // An optional description appended after the title
  description?: string;
  // Additional path to ignore in addition to the categories
  ignorePaths?: string[];
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

    async postBuild({ routesBuildMetadata }): Promise<void> {
      console.log("Generating /llms.txt documentation...");

      const {
        docsDir,
        description,
        ignorePaths = []
      } = {
        docsDir: "docs",
        ...userOptions
      };

      // Collect all generated documentation routes
      const allRoutes = Object.keys(routesBuildMetadata).filter(
        (path) =>
          path.startsWith(`/${docsDir}/`) &&
          [`/category/`, ...ignorePaths].find((pathToIgnore) =>
            path.includes(pathToIgnore)
          ) === undefined
      );

      // Group
      const groupedRoutes = allRoutes.reduce<GroupedRoutes>((acc, path) => {
        if (path.endsWith("/")) {
          const category = path.slice(0, -1);

          return {
            ...acc,
            [category]: {
              ...(acc[category] ?? { children: [] })
            }
          };
        }

        const category = dirname(path);

        return {
          ...acc,
          [category]: {
            ...(acc[category] ?? {}),
            children: [...(acc[category]?.children ?? []), path]
          }
        };
      }, {});

      // Prepare markdown content and path

      const { outDir, siteConfig } = context;

      const dataRoutes: RoutesData = new Map();

      for (const route of allRoutes) {
        const markdown = await prepareMarkdown({
          route,
          outDir,
          docsDir,
          siteConfig
        });
        dataRoutes.set(route, markdown);
      }

      // Write MD files
      await Promise.all(
        [...dataRoutes.values()].map(({ markdown: { markdown, outputPath } }) =>
          writeFile(outputPath, markdown, "utf-8")
        )
      );

      // Create /llms.txt
      await generateLlmsTxt({
        groupedRoutes,
        dataRoutes,
        description,
        docsDir,
        ...context
      });
    }
  };
}

type GroupedRoutes = Record<string, { children: string[] }>;

interface RouteMarkdownData {
  relativePath: string;
  markdown: string;
  outputPath: string;
}

interface RouteMetadata {
  title?: string;
  description?: string;
}

interface RouteData {
  markdown: RouteMarkdownData;
  metadata: RouteMetadata;
}

type RoutesData = Map<string, RouteData>;

const prepareMarkdown = async ({
  outDir,
  docsDir,
  route,
  siteConfig: { title: siteTitle }
}: Pick<LoadContext, "outDir" | "siteConfig"> &
  Pick<PluginOptions, "docsDir"> & {
    route: string;
  }): Promise<RouteData> => {
  const turndownService = new TurndownService();
  turndownService.remove("script");
  turndownService.remove("head");
  turndownService.remove("nav");
  turndownService.remove("aside");
  turndownService.remove("footer");
  turndownService.remove("title");

  turndownService.addRule("docusaurus-skip-to-main-content", {
    filter: (element: HTMLElement, _options: Options): boolean =>
      element.getAttribute("role") === "region" &&
      element.parentElement.getAttribute("id") === "__docusaurus",
    replacement: (_content: string, _node: TurndownNode, _options: Options) =>
      ""
  });

  turndownService.addRule("docusaurus-doc-toc", {
    filter: (element: HTMLElement, _options: Options): boolean =>
      element.classList.contains("theme-doc-toc-mobile") ||
      element.classList.contains("theme-doc-toc-desktop"),
    replacement: (_content: string, _node: TurndownNode, _options: Options) =>
      ""
  });

  // Trim start and end and remove ZeroWidthSpace
  const cleanZeroWidthSpace = (text: string): string =>
    text.trim().replace(/[\u200B-\u200D\uFEFF]/g, "");

  turndownService.addRule("convert-link-to-markdown", {
    filter: (element: HTMLElement, _options: Options): boolean =>
      element.nodeName.toLowerCase() === "a",
    replacement: (content: string, node: TurndownNode, _options: Options) => {
      if (!("getAttribute" in node)) {
        return content;
      }

      const href = (node as HTMLElement).getAttribute("href");

      if (href.startsWith("#")) {
        // Anchor are rendered after titles - e.g "<h3> Something[#](#anchor)" which is handy for the web but,
        // a bit noise in markdown. So we try to clean those.
        const empty = cleanZeroWidthSpace(content) === "";

        if (empty) {
          return "";
        }

        return `([${content}](${href}))`;
      }

      // Not a link to the documentation can be printed as standard link
      if (!href.startsWith(`/${docsDir}/`)) {
        return `[${content.trim()}](${href})`;
      }

      const [link, anchor] = href.split("#");

      // For the documentation we manipulate the URL to point to the generated Markdown file
      const htmlPath = join(outDir, link, "index.html");

      if (!existsSync(htmlPath)) {
        return `[${content.trim()}](${href})`;
      }

      // TODO: technically speaking there is a chance of deadlink because the parser we use to generate the file path effectively
      // is not the same as the one we use here to manipulate the link.
      const mdPath = `/${relative(outDir, dirname(htmlPath))}.md`;
      const md = `[${content.trim()}](${mdPath}${anchor !== undefined ? `#${anchor}` : ""})`;

      return md;
    }
  });

  const readHtmlSource = async ({
    route
  }: {
    route: string;
  }): Promise<string> => {
    const htmlSourcePath = join(outDir, route, "index.html");
    return await readFile(htmlSourcePath, "utf8");
  };

  const generateMarkdown = async ({
    route
  }: {
    route: string;
  }): Promise<RouteMarkdownData> => {
    const html = await readHtmlSource({ route });

    const md = turndownService.turndown(html);

    const cleanMd = cleanZeroWidthSpace(md);

    const relativePath = route.endsWith("/")
      ? `${route.slice(0, -1)}.md`
      : `${route}.md`;

    const outputPath = join(outDir, relativePath);

    return {
      relativePath,
      outputPath,
      markdown: cleanMd
    };
  };

  const generateMetadata = async ({
    route
  }: {
    route: string;
  }): Promise<RouteMetadata> => {
    const html = await readHtmlSource({ route });

    const dom = new JSDOM(html);

    const title = dom.window.document.querySelector("title")?.textContent;

    const description = dom.window.document.head
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");

    return {
      title: title?.replace(` | ${siteTitle}`, ""),
      description: description?.replace("---", "")
    };
  };

  return {
    markdown: await generateMarkdown({ route }),
    metadata: await generateMetadata({ route })
  };
};

const LLMS_TXT = "llms.txt";

const generateLlmsTxt = async ({
  groupedRoutes,
  dataRoutes,
  siteConfig: { title, tagline, url },
  outDir,
  description,
  docsDir
}: {
  groupedRoutes: GroupedRoutes;
  dataRoutes: RoutesData;
} & Pick<LoadContext, "siteConfig" | "outDir"> &
  Pick<PluginOptions, "description" | "docsDir">) => {
  const buildLink = (route: string): string | undefined => {
    const data = dataRoutes.get(route);

    if (data === undefined) {
      return undefined;
    }

    const {
      markdown: { relativePath },
      metadata: { title, description }
    } = data;

    return `- [${title ?? ""}](${url}${relativePath})${description !== undefined && description !== "" ? `: ${description}` : ""}`;
  };

  const buildTitle = (key: string) => {
    if (key === `/${docsDir}`) {
      return `## General`;
    }

    const capitalize = (text: string): string =>
      text.replace(/./, (c) => c.toUpperCase());

    const titles = key
      .replaceAll(`/${docsDir}/`, "")
      .split("/")
      .map(capitalize)
      .join(" - ");

    return `## ${titles}`;
  };

  const content = Object.entries(groupedRoutes)
    .sort(([keyA, _], [keyB, __]) => keyA.localeCompare(keyB))
    .map(
      ([key, { children }]) => `${buildTitle(key)}
  
${children.map(buildLink).join("\n")}`
    )
    .join("\n\n");

  const llmsTxt = `# ${title}

${description ?? tagline}

${content}`;

  const outputPath = join(outDir, LLMS_TXT);

  await writeFile(outputPath, llmsTxt, "utf-8");
};
