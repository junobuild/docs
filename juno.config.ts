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
    location: "/docs/setup-the-sdk",
    code: 301
  },
  {
    source: "/docs/add-juno-to-an-app/deploy-your-app",
    location: "/docs/category/deployment",
    code: 301
  },
  {
    source: "/docs/add-juno-to-an-app/deploy",
    location: "/docs/category/deployment",
    code: 301
  },
  {
    source: "/docs/category/add-juno-to-an-app",
    location: "/docs/category/guides",
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
    location: "/docs/miscellaneous/architecture",
    code: 301
  },
  {
    source: "/docs/roadmap",
    location: "/",
    code: 301
  },
  {
    source: "/docs/category/infrastructure",
    location: "/docs/miscellaneous/infrastructure",
    code: 301
  },
  {
    source: "/docs/infrastructure/internet-computer",
    location: "/docs/miscellaneous/infrastructure",
    code: 301
  },
  {
    source: "/docs/infrastructure/sustainability",
    location: "/docs/miscellaneous/infrastructure",
    code: 301
  },
  {
    source: "/docs/white-paper/**/*",
    location: "/",
    code: 301
  },
  {
    source: "/docs/miscellaneous/backups",
    location: "/docs/management/snapshots",
    code: 301
  },
  {
    source: "/docs/miscellaneous/monitoring",
    location: "/docs/management/monitoring",
    code: 301
  },
  {
    source: "/docs/management/backups",
    location: "/docs/management/snapshots",
    code: 301
  },
  {
    source: "/docs/miscellaneous/cli",
    location: "/docs/reference/cli",
    code: 301
  },
  {
    source: "/docs/miscellaneous/configuration",
    location: "/docs/reference/configuration",
    code: 301
  },
  {
    source: "/docs/miscellaneous/plugins",
    location: "/docs/reference/plugins",
    code: 301
  },
  {
    source: "/docs/miscellaneous/settings",
    location: "/docs/reference/settings",
    code: 301
  },
  {
    source: "/docs/category/guides-and-examples",
    location: "/docs/category/guides",
    code: 301
  },
  {
    source: "/docs/miscellaneous/controllers",
    location: "/docs/miscellaneous/access-keys",
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
    },
    predeploy: ["npm run build"]
  },
  orbiter: {
    id: "3iier-sqaaa-aaaal-aczaa-cai"
  }
});
