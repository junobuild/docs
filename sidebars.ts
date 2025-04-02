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
      items: ["create-a-satellite", "setup-the-sdk"]
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
          items: ["guides/github-actions", "guides/manual-deployment"]
        },
        "guides/local-development"
      ]
    },
    {
      type: "category",
      label: "Build",
      link: {
        type: "generated-index",
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
    "reference/settings"
  ]
};

export default sidebars;
