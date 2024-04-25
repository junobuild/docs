import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    id: "ucnx3-aqaaa-aaaal-ab3ea-cai",
    source: "build",
    storage: {
      redirects: [
        {
          source: "/docs/miscellaneous/github_actions",
          location: "/docs/guides/github-actions",
          code: 301
        },
        {
          source: "/docs/miscellaneous/local-development",
          location: "/docs/guides/local-development",
          code: 301
        }
      ]
    }
  },
  orbiter: {
    id: "3iier-sqaaa-aaaal-aczaa-cai"
  }
});
