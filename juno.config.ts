import type {
  StorageConfigHeader,
  StorageConfigRedirect
} from "@junobuild/config";
import { defineConfig } from "@junobuild/config";

const headers: StorageConfigHeader[] = [
  {
    source: "**/*.svg",
    headers: [["Cache-Control", "max-age=2592000"]]
  },
  {
    source: "**/*.png",
    headers: [["Cache-Control", "max-age=2592000"]]
  },
  {
    source: "**/*.webp",
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
];

const redirects: StorageConfigRedirect[] = [
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
    source: "/docs/add-juno-to-an-app/install-the-sdk-and-initialize-juno",
    location: "/docs/add-juno-to-an-app/setup-the-sdk",
    code: 301
  },
  {
    source: "/docs/add-juno-to-an-app/deploy-your-app",
    location: "/docs/add-juno-to-an-app/deploy",
    code: 301
  },
  {
    source: "/docs/add-juno-to-an-app/deploy",
    location: "/docs/category/guides-and-examples",
    code: 301
  },
  {
    source: "/docs/category/add-juno-to-an-app",
    location: "/docs/category/guides-and-examples",
    code: 301
  },
  {
    source: "/docs/add-juno-to-an-app/create-a-satellite",
    location: "/docs/create-a-satellite",
    code: 301
  },
  {
    source: "/docs/add-juno-to-an-app/setup-the-sdk",
    location: "/docs/setup-the-sdk",
    code: 301
  },
  {
    source: "/docs/add-juno-to-an-app/setup",
    location: "/docs/setup-the-sdk",
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
    source:
      "/assets/files/juno-white-paper-9dc998f30569e21ccb46a4d7ed51ff56.pdf",
    location: "/files/juno-white-paper.pdf",
    code: 301
  },
  // White Paper 1.0.1: The token distribution was correct, but the pie charts did not perfectly represent the percentages.
  {
    source:
      "/assets/files/juno-white-paper-47063bc5d28d71fe7534bfa249ce3f14.pdf",
    location: "/files/juno-white-paper.pdf",
    code: 301
  },
  // Pages redirected after SNS DAO failure.
  {
    source: "/files/juno-white-paper.pdf",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/category/tokenomics",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/white-paper/tokenomics/purpose",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/white-paper/tokenomics/outgoings",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/white-paper/tokenomics/total-supply",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/white-paper/tokenomics/token-distribution",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/white-paper/tokenomics/voting-power",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/white-paper/tokenomics/initial-sns-configuration",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/white-paper/tokenomics/sns-swap-configuration",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/white-paper/legal-umbrella",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/white-paper/contributors",
    location: "/docs/white-paper/intro",
    code: 301
  },
  {
    source: "/docs/miscellaneous/backups",
    location: "/docs/management/backups",
    code: 301
  },
  {
    source: "/docs/miscellaneous/monitoring",
    location: "/docs/management/monitoring",
    code: 301
  }
];

export default defineConfig({
  satellite: {
    id: "ucnx3-aqaaa-aaaal-ab3ea-cai",
    source: "build",
    storage: {
      headers,
      redirects
    }
  },
  orbiter: {
    id: "3iier-sqaaa-aaaal-aczaa-cai"
  }
});
