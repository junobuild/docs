import type { LoadContext, Plugin } from "@docusaurus/types";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

interface PluginOptions {
  ignorePatterns?: string[];
  docsDir: string;
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

    async postBuild(): Promise<void> {
      console.log("Generating /llms.txt documentation...");

      const options = { docsDir: "docs", ...userOptions };

      const allDocFiles = await collectDocFiles({ context, options });
    }
  };
}

const collectDocFiles = async ({
  context,
  options
}: {
  context: LoadContext;
  options: PluginOptions;
}): Promise<string[]> => {
  const { siteDir, outDir } = context;
  const { ignorePatterns = [], docsDir } = options;

  const fullDocsDir = join(siteDir, docsDir);
  const docFiles = await findAllDocFilePaths({
    dir: fullDocsDir,
    ignorePatterns
  });

  for (const docFile of docFiles) {
    const htmlFile = join(outDir, relative(siteDir, docFile).replace(/\.mdx?$/, "/index.html"));
    console.log(htmlFile, existsSync(htmlFile));
  }

  return docFiles;
};

const findAllDocFilePaths = async ({
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
      const subFiles = await findAllDocFilePaths({
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
