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
      label: "Products",
      collapsed: false,
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
            "build/authentication/google",
            "build/authentication/internet-identity",
            "build/authentication/passkeys",
            "build/authentication/utilities",
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
      label: "Guides",
      link: {
        type: "generated-index",
        description:
          "Explore our quick start guides and tutorials, designed to help you host, develop, and deploy your apps using your favorite tech stack."
      },
      items: [
        {
          type: "category",
          label: "Frontend",
          link: {
            type: "generated-index",
            description:
              "Integrate Juno with your favorite frontend frameworks."
          },
          items: [
            {
              type: "category",
              label: "Next.js",
              link: {
                slug: "/guides/nextjs",
                type: "generated-index",
                description:
                  "Explore how to create a Juno project developed with Next.js."
              },
              items: ["guides/nextjs/build", "guides/nextjs/deploy"]
            },
            {
              type: "category",
              label: "React",
              link: {
                slug: "/guides/react",
                type: "generated-index",
                description:
                  "Explore how to create a Juno project developed with React."
              },
              items: ["guides/react/build", "guides/react/deploy"]
            },
            {
              type: "category",
              label: "Vue",
              link: {
                slug: "/guides/vue",
                type: "generated-index",
                description:
                  "Explore how to create a Juno project developed with Vue."
              },
              items: ["guides/vue/build", "guides/vue/deploy"]
            },
            {
              type: "category",
              label: "SvelteKit",
              link: {
                slug: "/guides/sveltekit",
                type: "generated-index",
                description:
                  "Explore how to create a Juno project developed with SvelteKit."
              },
              items: ["guides/sveltekit/build", "guides/sveltekit/deploy"]
            },
            {
              type: "category",
              label: "Angular",
              link: {
                slug: "/guides/angular",
                type: "generated-index",
                description:
                  "Explore how to create a Juno project developed with Angular."
              },
              items: ["guides/angular/build", "guides/angular/deploy"]
            },
            {
              type: "category",
              label: "Astro",
              link: {
                slug: "/guides/astro",
                type: "generated-index",
                description:
                  "Explore how to create a Juno project developed with Astro."
              },
              items: ["guides/astro/build", "guides/astro/deploy"]
            },
            {
              type: "category",
              label: "Docusaurus",
              link: {
                slug: "/guides/docusaurus",
                type: "generated-index",
                description:
                  "Explore how to deploy a Juno project developed with Docusaurus."
              },
              items: ["guides/docusaurus/deploy"]
            }
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
          label: "Scripts",
          link: {
            type: "generated-index",
            description: "Run Juno operations using scripts and tooling."
          },
          items: ["guides/nodejs"]
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
        "guides/e2e",
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
            slug: "/examples/frontend",
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
            slug: "/examples/functions",
            description:
              "Write serverless backend logic for your app using TypeScript or Rust. These examples show how to use hooks, assertions, and common function patterns on Juno."
          },
          items: [
            {
              type: "category",
              label: "Rust",
              link: {
                type: "generated-index",
                slug: "/examples/functions/rust",
                description:
                  "Examples of writing serverless functions in Rust for Juno. Includes patterns like custom assertions, data manipulation and calls."
              },
              items: [
                "examples/functions/rust/assertion",
                "examples/functions/rust/mutating-docs",
                "examples/functions/rust/generating-assets",
                "examples/functions/rust/canister-calls"
              ]
            },
            {
              type: "category",
              label: "TypeScript",
              link: {
                type: "generated-index",
                slug: "/examples/functions/typescript",
                description:
                  "Examples of writing serverless functions in TypeScript for Juno. Includes patterns like custom assertions, data manipulation and calls."
              },
              items: [
                "examples/functions/typescript/assertion",
                "examples/functions/typescript/mutating-docs",
                "examples/functions/typescript/canister-calls"
              ]
            }
          ]
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
    {
      type: "category",
      label: "Comparisons",
      link: {
        type: "generated-index",
        description:
          "See how Juno compares to other modern platforms, and when each one makes sense."
      },
      items: [
        "comparison/vs-vercel",
        "comparison/vs-netlify",
        "comparison/vs-railway",
        "comparison/vs-heroku",
        "comparison/vs-self-hosting"
      ]
    },
    "terminology",
    "faq",
    "troubleshooting",
    "pricing"
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
            "reference/functions/typescript/canisters",
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
