import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    id: "ucnx3-aqaaa-aaaal-ab3ea-cai",
    source: "build",
    storage: {
      headers: [
        {
          source: "**/*.svg",
          headers: [["Cache-Control", "max-age=2592000"]]
        },
        {
          source: "/animations/**/*.lottie",
          headers: [["Cache-Control", "max-age=2592000"]]
        },
        {
          source: "/assets/fonts/**/*",
          headers: [["Cache-Control", "public, max-age=31536000"]]
        }
      ],
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
        },
        {
          source:
            "/docs/add-juno-to-an-app/install-the-sdk-and-initialize-juno",
          location: "/docs/add-juno-to-an-app/setup",
          code: 301
        },
        {
          source: "/docs/add-juno-to-an-app/deploy-your-app",
          location: "/docs/add-juno-to-an-app/deploy",
          code: 301
        },
        {
          source: "/docs/miscellaneous/sdk-usage-in-anodejs-context",
          location: "/docs/guides/nodejs",
          code: 301
        },
        {
          source: "/docs/architecture",
          location: "/docs/white-paper/architecture",
          code: 301
        },
        {
          source: "/docs/roadmap",
          location: "/docs/white-paper/architecture",
          code: 301
        },
        {
          source: "/docs/category/infrastructure",
          location: "/docs/white-paper/infrastructure",
          code: 301
        },
        {
          source: "/docs/category/infrastructure",
          location: "/docs/white-paper/infrastructure",
          code: 301
        },
        {
          source: "/docs/infrastructure/internet-computer",
          location: "/docs/white-paper/infrastructure",
          code: 301
        },
        {
          source: "/docs/infrastructure/sustainability",
          location: "/docs/white-paper/infrastructure",
          code: 301
        }
      ]
    }
  },
  orbiter: {
    id: "3iier-sqaaa-aaaal-aczaa-cai"
  }
});
