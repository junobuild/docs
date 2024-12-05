import { ShowcaseSpotlight } from "@site/src/types/showcase";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = join(process.cwd(), "showcase.json");

// Return a shuffled version of the array. Adapted from https://stackoverflow.com/a/12646864 to
// avoid shuffling in place.
function shuffleArray<T>(array_: T[]): T[] {
  const array = [...array_];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const buildByPeterPeterParker = ({
  github
}: Pick<ShowcaseSpotlight, "github">) =>
  github?.includes("https://github.com/peterpeterparker") ||
  github?.includes("https://github.com/junobuild");

const shuffleJson = (showcaseJsonString: string) => {
  const data: ShowcaseSpotlight[] = shuffleArray(
    JSON.parse(showcaseJsonString)
  );

  const dapps = [
    ...shuffleArray(data.filter((dapp) => !buildByPeterPeterParker(dapp))),
    ...shuffleArray(data.filter((dapp) => buildByPeterPeterParker(dapp)))
  ];

  return JSON.stringify(dapps, null, 2);
};

export default function showcasePlugin(context, options) {
  return {
    name: "docusaurus-showcase-plugin",
    async loadContent() {
      return readFileSync(source, "utf-8");
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;

      const dappsJsonPath = await createData(
        "dapps.json",
        shuffleJson(content)
      );

      addRoute({
        path: "/showcase",
        component: "@site/src/pages/showcase/index.tsx",
        modules: {
          dapps: dappsJsonPath
        },
        exact: true
      });
    }
  };
}
