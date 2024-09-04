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
        },
        // White Paper 1.0.0: Typo in treasury tokens reported by the community on Twitter.
        {
          source: "/assets/files/juno-white-paper-9dc998f30569e21ccb46a4d7ed51ff56.pdf",
          location: "/files/juno-white-paper.pdf",
          code: 301
        },
        // White Paper 1.0.1: The token distribution was correct, but the pie charts did not perfectly represent the percentages.
        {
          source: "/assets/files/juno-white-paper-47063bc5d28d71fe7534bfa249ce3f14.pdf",
          location: "/files/juno-white-paper.pdf",
          code: 301
        }
      ]
    }
  },
  orbiter: {
    id: "3iier-sqaaa-aaaal-aczaa-cai"
  }
});
