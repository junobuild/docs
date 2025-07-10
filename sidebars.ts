import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: "category",
      label: "Getting Started",
      link: {
        type: "doc",
        id: "intro"
      },
      items: ["start-a-new-project", "setup-the-sdk", "create-a-satellite"]
    },
    {
      type: "category",
      label: "Guides",
      link: {
        type: "generated-index",
        description:
          "Explore our quick start guides and tutorials, designed to help you host, develop, and deploy your apps using your favorite tech stack."
      },
      items: [
        {
          type: "category",
          label: "Clients",
          link: {
            type: "generated-index",
            description: "Integrate Juno with your favorite frameworks."
          },
          items: [
            "guides/nextjs",
            "guides/react",
            "guides/vue",
            "guides/sveltekit",
            "guides/angular",
            "guides/astro",
            "guides/nodejs"
          ]
        },
        {
          type: "category",
          label: "Functions",
          link: {
            type: "generated-index",
            description:
              "Build serverless functions to run backend code in response to events or requests."
          },
          items: ["guides/rust", "guides/typescript"]
        },
        {
          type: "category",
          label: "Deployment",
          link: {
            type: "generated-index",
            description: "Deploy your app to Juno Satellites"
          },
          items: [
            {
              type: "category",
              label: "GitHub Actions",
              link: {
                type: "doc",
                id: "guides/github-actions/index"
              },
              items: [
                "guides/github-actions/deploy-frontend",
                "guides/github-actions/publish-functions",
                "guides/github-actions/upgrade-functions"
              ]
            },
            "guides/manual-deployment"
          ]
        },
        "guides/local-development",
        "guides/ai"
      ]
    },
    {
      type: "category",
      label: "Examples",
      link: {
        type: "generated-index",
        description:
          "Explore projects that show how to build with Juno using different frontend frameworks and serverless function setups. Includes full-stack apps built with React, SvelteKit, Angular, and Next.js, as well as serverless function patterns written in TypeScript and Rust."
      },
      items: [
        {
          type: "category",
          label: "Frontend",
          link: {
            type: "generated-index",
            description:
              "Build full apps with Juno using your preferred frontend framework. These examples cover everything from auth to data handling with React, SvelteKit, Angular, Next.js, and more."
          },
          items: [
            "examples/frontend/nextjs",
            "examples/frontend/react-typescript",
            "examples/frontend/react-javascript",
            "examples/frontend/vue",
            "examples/frontend/sveltekit",
            "examples/frontend/angular",
            "examples/frontend/vanilla-javascript"
          ]
        },
        {
          type: "category",
          label: "Functions",
          link: {
            type: "generated-index",
            description:
              "Write serverless backend logic for your app using TypeScript or Rust. These examples show how to use hooks, assertions, and common function patterns on Juno."
          },
          items: [
            {
              type: "category",
              label: "Rust",
              link: {
                type: "generated-index",
                description:
                  "Examples of writing serverless functions in Rust for Juno. Includes patterns like custom assertions, data manipulation and calls."
              },
              items: [
                "examples/functions/rust/assertion",
                "examples/functions/rust/mutating-docs-with-hooks",
                "examples/functions/rust/generating-assets-with-hooks",
                "examples/functions/rust/canister-calls"
              ]
            }
          ]
        }
      ]
    },
    {
      type: "category",
      label: "Products",
      link: {
        type: "generated-index",
        slug: "/category/build", // For backward compatibility, we use /build in the URL even though the label is now "Products" (it was originally called "Build")
        description:
          "Learn about Juno features to build apps running 100% on blockchain without the need to manage servers or write any backend code."
      },
      items: [
        {
          type: "category",
          label: "Authentication",
          link: {
            type: "doc",
            id: "build/authentication/index"
          },
          items: [
            "build/authentication/development",
            "build/authentication/customization",
            "build/authentication/management"
          ]
        },
        {
          type: "category",
          label: "Datastore",
          link: {
            type: "doc",
            id: "build/datastore/index"
          },
          items: ["build/datastore/collections", "build/datastore/development"]
        },
        {
          type: "category",
          label: "Storage",
          link: {
            type: "doc",
            id: "build/storage/index"
          },
          items: ["build/storage/collections", "build/storage/development"]
        },
        {
          type: "category",
          label: "Hosting",
          link: {
            type: "doc",
            id: "build/hosting/index"
          },
          items: ["build/hosting/development", "build/hosting/configuration"]
        },
        {
          type: "category",
          label: "Functions",
          link: {
            type: "doc",
            id: "build/functions/index"
          },
          items: [
            "build/functions/lifecycle",
            {
              type: "category",
              label: "Development",
              link: {
                type: "doc",
                id: "build/functions/development/index"
              },
              items: [
                "build/functions/development/rust",
                "build/functions/development/typescript"
              ]
            },
            "build/functions/logs"
          ]
        },
        {
          type: "category",
          label: "Analytics",
          link: {
            type: "doc",
            id: "build/analytics/index"
          },
          items: ["build/analytics/setup", "build/analytics/development"]
        }
      ]
    },
    {
      type: "category",
      label: "Management",
      link: {
        type: "generated-index"
      },
      items: [
        {
          type: "autogenerated",
          dirName: "management"
        }
      ]
    },
    {
      type: "category",
      label: "Miscellaneous",
      link: {
        type: "generated-index"
      },
      items: [
        {
          type: "autogenerated",
          dirName: "miscellaneous"
        }
      ]
    },
    "terminology",
    "faq",
    "troubleshooting",
    "pricing"
  ],
  ["white-paper"]: [
    "white-paper/intro",
    "white-paper/what-is-juno",
    "white-paper/problems-statement",
    "white-paper/solution",
    "white-paper/use-cases",
    "white-paper/roadmap",
    "white-paper/architecture",
    "white-paper/infrastructure",
    "white-paper/open-source",
    "white-paper/business-model",
    "white-paper/competitors",
    "white-paper/costs-challenges",
    "white-paper/validation",
    "white-paper/target-audience",
    "white-paper/market-size",
    "white-paper/conclusion"
  ],
  references: [
    "reference/cli",
    "reference/configuration",
    "reference/plugins",
    "reference/settings",
    {
      type: "category",
      label: "Functions",
      link: {
        type: "generated-index",
        slug: "/reference/functions",
        description:
          "API reference for writing serverless functions in Rust or TypeScript."
      },
      items: [
        {
          type: "category",
          label: "Rust",
          link: {
            type: "generated-index",
            slug: "/reference/functions/rust",
            description:
              "API reference for writing serverless functions in Rust."
          },
          items: [
            "reference/functions/rust/sdk",
            "reference/functions/rust/utils",
            "reference/functions/rust/ic-cdk"
          ]
        },
        {
          type: "category",
          label: "TypeScript",
          link: {
            type: "generated-index",
            slug: "/reference/functions/typescript",
            description:
              "API reference for writing serverless functions with TypeScript."
          },
          items: [
            "reference/functions/typescript/sdk",
            "reference/functions/typescript/utils",
            "reference/functions/typescript/ic-cdk",
            "reference/functions/typescript/node"
          ]
        }
      ]
    },
    {
      type: "category",
      label: "Emulator",
      link: {
        type: "generated-index",
        slug: "/reference/emulator",
        description:
          "The emulator provides a complete local environment to build, test, and run your project without deploying anything live. There are two images available, depending on your needs:"
      },
      items: [
        "reference/emulator/skylab",
        "reference/emulator/satellite",
        "reference/emulator/infrastructure"
      ]
    }
  ]
};

export default sidebars;
