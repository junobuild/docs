import { GitHubRelease } from "@site/src/types/github";

const getGitHubReleaseNotes = async (): Promise<GitHubRelease[]> => {
  const url = `https://api.github.com/repos/junobuild/juno/releases`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Cannot fetch GitHub release notes! HTTP response status: ${response.status}`
    );
  }

  return await response.json();
};

export default function changelogPlugin(_context, _options) {
  return {
    name: "docusaurus-changelog-plugin",
    async loadContent() {
      return getGitHubReleaseNotes();
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;

      const releasesJsonPath = await createData(
        "releases.json",
        JSON.stringify(content, null, 2)
      );

      for (const release of content) {
        const releaseJsonPath = await createData(
          `release-${release.tag_name}.json`,
          JSON.stringify(release, null, 2)
        );

        addRoute({
          path: `/changelog/release-${release.tag_name}`,
          component: "@site/src/pages/release/index.tsx",
          modules: {
            releases: releasesJsonPath,
            release: releaseJsonPath
          },
          exact: true
        });
      }

      addRoute({
        path: "/changelog",
        component: "@site/src/pages/changelog/index.tsx",
        modules: {
          releases: releasesJsonPath
        },
        exact: true
      });
    }
  };
}
