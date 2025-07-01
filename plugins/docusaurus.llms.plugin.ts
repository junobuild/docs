import type { LoadContext, Plugin } from "@docusaurus/types";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import TurndownService, { Options, Node as TurndownNode } from "turndown";

interface PluginOptions {
  docsDir: string;
  description?: string;
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

      const { docsDir, description } = {
        docsDir: "docs",
        ...userOptions
      };

      // Collect all generated documentation routes
      const allRoutes = Object.keys(routesBuildMetadata).filter((path) =>
        path.startsWith(`/${docsDir}/`)
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

      const { outDir } = context;

      const markdownRoutes: RoutesMarkdown = new Map();

      for (const route of allRoutes) {
        const markdown = await prepareMarkdown({ route, outDir, docsDir });
        markdownRoutes.set(route, markdown);
      }

      // Write MD files
      await Promise.all(
        [...markdownRoutes.values()].map(({ markdown, outputPath }) =>
          writeFile(outputPath, markdown, "utf-8")
        )
      );

      // Create /llms.txt
      await generateLlmsTxt({ groupedRoutes, markdownRoutes, description, ...context });
    }
  };
}

type GroupedRoutes = Record<string, { children: string[] }>;

interface RouteMarkdown {
  markdown: string;
  outputPath: string;
}

type RoutesMarkdown = Map<string, RouteMarkdown>;

const prepareMarkdown = async ({
  outDir,
  docsDir,
  route
}: Pick<LoadContext, "outDir"> &
  Pick<PluginOptions, "docsDir"> & {
    route: string;
  }): Promise<RouteMarkdown> => {
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

      const mdPath = `/${relative(outDir, dirname(htmlPath))}.md`;
      const md = `[${content.trim()}](${mdPath}${anchor !== undefined ? `#${anchor}` : ""})`;

      return md;
    }
  });

  const generate = async ({
    route
  }: {
    route: string;
  }): Promise<RouteMarkdown> => {
    const htmlSourcePath = join(outDir, route, "index.html");
    const html = await readFile(htmlSourcePath, "utf8");

    const md = turndownService.turndown(html);

    const cleanMd = cleanZeroWidthSpace(md);

    const mdDestPath = join(
      outDir,
      route.endsWith("/") ? `${route.slice(0, -1)}.md` : `${route}.md`
    );

    return {
      outputPath: mdDestPath.replace(".html", ".md"),
      markdown: cleanMd
    };
  };

  return await generate({ route });
};

const LLMS_TXT = "llms.txt";

const generateLlmsTxt = async ({
  groupedRoutes,
  markdownRoutes,
  siteConfig: { title, tagline },
  outDir,
  description
}: {
  groupedRoutes: GroupedRoutes;
  markdownRoutes: RoutesMarkdown;
} & Pick<LoadContext, "siteConfig" | "outDir"> &
  Pick<PluginOptions, "description">) => {
  const llmsTxt = `# ${title}

> ${description ?? tagline}`;

  const outputPath = join(outDir, LLMS_TXT);

  await writeFile(outputPath, llmsTxt, "utf-8");
};
