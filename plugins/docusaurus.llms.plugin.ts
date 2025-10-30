import type { LoadContext, Plugin } from "@docusaurus/types";
import { JSDOM } from "jsdom";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import TurndownService, { Options, Node as TurndownNode } from "turndown";

const { gfm } = require("@joplin/turndown-plugin-gfm");

interface PluginOptionGroupMatcher {
  matcher: string;
  position?: number;
  title?: string;
}

interface PluginOptionGroup {
  matchers: PluginOptionGroupMatcher[];
  parentPath: string;
  title: string;
}

interface PluginOptions {
  docsDir: string;
  // An optional description appended after the title
  description?: string;
  // Additional paths to ignore, in addition to the categories.
  ignorePaths?: string[];
  // A title for the links that are identified at the root. By default: Miscellaneous
  miscCategoryTitle?: string;
  // A custom list of groups. Matching routes will be listed under these.
  // Particularly useful to reorganize routes available at the root.
  groups?: PluginOptionGroup[];
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
        ignorePaths = [],
        miscCategoryTitle = "Miscellaneous",
        groups = []
      } = {
        docsDir: "docs",
        ...userOptions
      };

      // Collect all generated documentation routes
      const allRoutes = Object.keys(routesBuildMetadata).filter(
        (path) =>
          path.startsWith(`/${docsDir}/`) &&
          [`/category/`, "/tags/", ...ignorePaths].find((pathToIgnore) =>
            path.includes(pathToIgnore)
          ) === undefined
      );

      // Group routes
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

        const resolveGroup = ():
          | {
              group: PluginOptionGroup;
              matcher: PluginOptionGroupMatcher;
            }
          | undefined => {
          for (const { matchers, ...rest } of groups) {
            const matcher = matchers.find(({ matcher }) =>
              path.includes(matcher)
            );

            if (matcher !== undefined) {
              return { group: { matchers, ...rest }, matcher };
            }
          }

          return undefined;
        };

        const matchingGroup = resolveGroup();

        if (matchingGroup === undefined) {
          const groupPath = dirname(path);

          return {
            ...acc,
            [groupPath]: {
              ...(acc[groupPath] ?? {}),
              children: [...(acc[groupPath]?.children ?? []), { path }]
            }
          };
        }

        const {
          group: { parentPath, title, matchers },
          matcher: { title: matcherTitle }
        } = matchingGroup;

        const children = [
          ...(acc[parentPath]?.children ?? []),
          { path, ...(matcherTitle !== undefined && { title: matcherTitle }) }
        ].sort(({ path: pathA }, { path: pathB }) => {
          const findPosition = (childPath: string): number | undefined =>
            matchers.find(({ matcher }) => childPath.includes(matcher))
              ?.position;

          const positionPathA = findPosition(pathA);
          const positionPathB = findPosition(pathB);

          return (positionPathA ?? 0) - (positionPathB ?? 0);
        });

        return {
          ...acc,
          [parentPath]: {
            ...(acc[parentPath] ?? {}),
            ...(title !== undefined && { title }),
            children
          }
        };
      }, {});

      const sortedGroupedRoutes = Object.entries(groupedRoutes).sort(
        ([keyA, _], [keyB, __]) => {
          // We want groups first.
          const isGroup = (key: string): boolean =>
            groups.find(({ parentPath }) => parentPath === key) !== undefined;

          if (isGroup(keyA)) {
            return -1;
          }

          if (isGroup(keyB)) {
            return 1;
          }

          // We want "Misc" at the end.
          if (keyA === `/${docsDir}`) {
            return 1;
          }

          if (keyB === `/${docsDir}`) {
            return -1;
          }

          return keyA.localeCompare(keyB);
        }
      );

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
        groupedRoutes: sortedGroupedRoutes,
        dataRoutes,
        description,
        docsDir,
        miscCategoryTitle,
        ...context
      });

      // Create /llms-full.txt
      await generateLlmsTxtFull({
        groupedRoutes: sortedGroupedRoutes,
        dataRoutes,
        description,
        docsDir,
        ...context
      });
    }
  };
}

interface GroupedRouteChild {
  path: string;
  title?: string;
}

interface GroupedRoute {
  title?: string;
  children: GroupedRouteChild[];
}

type GroupedRoutes = Record<string, GroupedRoute>;

type SortedGroupedRoutes = [string, GroupedRoute][];

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
  const turndownService = new TurndownService({
    headingStyle: "atx",
    hr: "---",
    codeBlockStyle: "fenced"
  });

  // Extend support for tables
  // Source: https://github.com/mixmark-io/turndown/issues/416#issuecomment-1701341446
  turndownService.use(gfm);

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

  turndownService.addRule("docusaurus-admonition", {
    filter: (element: HTMLElement, _options: Options): boolean =>
      element.parentElement.classList.contains("theme-admonition") &&
      element.className.includes("admonitionHeading"),
    replacement: (content: string, _node: TurndownNode, _options: Options) =>
      `**${capitalize(content)}:**`
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
const LLMS_TXT_FULL = "llms-full.txt";

const generateLlmsTxt = async ({
  groupedRoutes,
  dataRoutes,
  siteConfig: { url, ...restSiteConfig },
  outDir,
  description,
  docsDir,
  miscCategoryTitle
}: {
  groupedRoutes: SortedGroupedRoutes;
  dataRoutes: RoutesData;
} & Pick<LoadContext, "siteConfig" | "outDir"> &
  Pick<PluginOptions, "description" | "docsDir"> &
  Required<Pick<PluginOptions, "miscCategoryTitle">>) => {
  const buildLink = ({
    path,
    title: customTitle
  }: GroupedRouteChild): string | undefined => {
    const data = dataRoutes.get(path);

    if (data === undefined) {
      return undefined;
    }

    const {
      markdown: { relativePath },
      metadata: { title, description }
    } = data;

    return `- [${customTitle ?? title ?? ""}](${url}${relativePath})${description !== undefined && description !== "" ? `: ${description}` : ""}`;
  };

  const buildTitle = ({ key, title }: { key: string; title?: string }) => {
    if (key === `/${docsDir}`) {
      return `## ${miscCategoryTitle}`;
    }

    const titles =
      title ??
      key.replaceAll(`/${docsDir}/`, "").split("/").map(capitalize).join(" - ");

    return `## ${titles}`;
  };

  const content = groupedRoutes
    .map(
      ([key, { children, title }]) => `${buildTitle({ key, title })}
  
${children.map(buildLink).join("\n")}`
    )
    .join("\n\n");

  await generateLlmsTxtFile({
    file: LLMS_TXT,
    content,
    siteConfig: { url, ...restSiteConfig },
    description,
    outDir
  });
};

const generateLlmsTxtFull = async ({
  groupedRoutes,
  dataRoutes,
  siteConfig: { url, ...restSiteConfig },
  outDir,
  description
}: {
  groupedRoutes: SortedGroupedRoutes;
  dataRoutes: RoutesData;
} & Pick<LoadContext, "siteConfig" | "outDir"> &
  Pick<PluginOptions, "description" | "docsDir">) => {
  const buildMarkdown = ({ path }: GroupedRouteChild): string | undefined => {
    const data = dataRoutes.get(path);

    if (data === undefined) {
      return undefined;
    }

    const {
      markdown: { markdown }
    } = data;

    return markdown;
  };

  const content = groupedRoutes
    .map(([_, { children }]) => children.map(buildMarkdown).join("\n\n"))
    .join("\n\n");

  await generateLlmsTxtFile({
    file: LLMS_TXT_FULL,
    content,
    siteConfig: { url, ...restSiteConfig },
    description,
    outDir
  });
};

const generateLlmsTxtFile = async ({
  file,
  content,
  siteConfig: { title, tagline },
  outDir,
  description
}: { file: typeof LLMS_TXT | typeof LLMS_TXT_FULL } & {
  content: string;
} & Pick<LoadContext, "siteConfig" | "outDir"> &
  Pick<PluginOptions, "description">) => {
  const llmsTxtContent = `# ${title}

${description ?? tagline}

${content}`;

  const outputPath = join(outDir, file);

  await writeFile(outputPath, llmsTxtContent, "utf-8");
};

const capitalize = (text: string): string =>
  text.replace(/./, (c) => c.toUpperCase());
