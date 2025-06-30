import npm2yarn from "@docusaurus/remark-plugin-npm2yarn";
import type { Config } from "@docusaurus/types";
import { join } from "node:path";

const { themes } = require("prism-react-renderer");
const codeTheme = themes.oneDark;

codeTheme.plain.backgroundColor = "black";
codeTheme.plain.color = "white";

codeTheme.styles = [
  ...codeTheme.styles,
  {
    types: ["comment"],
    style: { color: "#707070", fontStyle: "italic" }
  },
  {
    types: ["keyword", "atrule"],
    style: { color: "#b0baff" }
  },
  {
    types: ["function", "builtin"],
    style: { color: "#ff5df9" }
  },
  {
    types: ["string", "inserted", "attr-value"],
    style: { color: "#b0baff" }
  },
  {
    types: ["constant", "boolean", "number"],
    style: { color: "white" }
  },
  {
    types: ["class-name", "maybe-class-name", "tag"],
    style: { color: "#b0baff" }
  },
  {
    types: ["property", "variable", "operator", "symbol"],
    style: { color: "white" }
  }
];

const config: Config = {
  title: "Juno",
  tagline: "Run ideas in your container",
  url: "https://juno.build",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "junobuild",
  projectName: "juno",
  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },
  customFields: {
    dev: process.env.NODE_ENV === "development"
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: "sidebars.ts",
          editUrl: "https://github.com/junobuild/docs/edit/main/",
          exclude: ["**/reference/cli/**", "**/components/**"],
          remarkPlugins: [npm2yarn]
        },
        pages: {
          remarkPlugins: [npm2yarn]
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "All our posts",
          blogSidebarCount: "ALL",
          editUrl: "https://github.com/junobuild/docs/edit/main/",
          remarkPlugins: [npm2yarn]
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss")
        }
      }
    ]
  ],

  plugins: [
    [
      "docusaurus-plugin-sass",
      {
        api: "modern-compiler"
      },
    ],
    join(process.cwd(), "plugins", "docusaurus.showcase.plugin.ts"),
    join(process.cwd(), "plugins", "docusaurus.changelog.plugin.ts"),
    [
      join(process.cwd(), "plugins", "docusaurus.llms.plugin.ts"),
      {
        test: "ello"
      }
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      metadata: [
        {
          name: "keywords",
          content:
            "Web3, blockchain platform, decentralized applications, Web3 development, passwordless authentication, datastore, file storage, hosting, serverless functions, analytics, open source"
        }
      ],
      image: "img/social_image_v9.jpg",
      navbar: {
        logo: {
          alt: "Juno Logo",
          src: "img/juno_logo.svg",
          srcDark: "img/juno_logo_dark.svg"
        },
        hideOnScroll: true,
        items: [
          {
            type: "dropdown",
            label: "Products",
            position: "left",
            items: [
              {
                to: "/docs/build/authentication",
                html: `<span style="display: flex; align-items: center; gap: 0.45rem;"><span style="display: flex; justify-content: center; align-items: center; width: 1.25rem; height: 1.25rem; padding: 0.25rem; border-radius: 50%; background: #fff;"><img src="/icons/authentication.svg" style="height: 1em;" alt="" /></span>Authentication</span>`
              },
              {
                to: "/docs/build/datastore",
                html: `<span style="display: flex; align-items: center; gap: 0.45rem;"><span style="display: flex; justify-content: center; align-items: center; width: 1.25rem; height: 1.25rem; padding: 0.25rem; border-radius: 50%; background: #fff;"><img src="/icons/datastore.svg" style="height: 1em;" alt="" /></span>Datastore</span>`
              },
              {
                to: "/docs/build/storage",
                html: `<span style="display: flex; align-items: center; gap: 0.45rem;"><span style="display: flex; justify-content: center; align-items: center; width: 1.25rem; height: 1.25rem; padding: 0.25rem; border-radius: 50%; background: #fff;"><img src="/icons/storage.svg" style="height: 1em;" alt="" /></span>Storage</span>`
              },
              {
                to: "/docs/build/hosting",
                html: `<span style="display: flex; align-items: center; gap: 0.45rem;"><span style="display: flex; justify-content: center; align-items: center; width: 1.25rem; height: 1.25rem; padding: 0.25rem; border-radius: 50%; background: #fff;"><img src="/icons/hosting.svg" style="height: 1em;" alt="" /></span>Hosting</span>`
              },
              {
                to: "/docs/build/functions",
                html: `<span style="display: flex; align-items: center; gap: 0.45rem;"><span style="display: flex; justify-content: center; align-items: center; width: 1.25rem; height: 1.25rem; padding: 0.25rem; border-radius: 50%; background: #fff;"><img src="/icons/functions.svg" style="height: 1em;" alt="" /></span>Functions</span>`
              },
              {
                to: "/docs/build/analytics",
                html: `<span style="display: flex; align-items: center; gap: 0.45rem;"><span style="display: flex; justify-content: center; align-items: center; width: 1.25rem; height: 1.25rem; padding: 0.25rem; border-radius: 50%; background: #fff;"><img src="/icons/analytics.svg" style="height: 1em;" alt="" /></span>Analytics</span>`
              }
            ]
          },
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs"
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "references",
            label: "References"
          },
          {
            type: "dropdown",
            label: "More",
            position: "left",
            items: [
              { to: "/docs/white-paper/intro", label: "White Paper" },
              { to: "/showcase", label: "Showcase" },
              { to: "/blog", label: "Blog" },
              { to: "/newsletter", label: "Newsletter" },
              { to: "/sponsorship", label: "Sponsorship" }
            ]
          },
          {
            type: "html",
            position: "right",
            value: `
              <a
                href="https://console.juno.build"
                class="navbar-menu-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Building
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                </svg>
              </a>`
              .replace(/\n\s+/g, " ")
              .trim()
          },
          {
            type: "html",
            position: "right",
            value:
              '<a href="https://github.com/junobuild/juno" target="_blank" rel="noopener noreferrer" aria-label="Go to Juno GitHub repo" class="navbar-menu-item"><span>GitHub</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"/></svg></a>'
          }
        ]
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Getting started",
                to: "/docs/intro"
              },
              {
                label: "Add Juno to an app",
                to: "/docs/create-a-satellite"
              },
              {
                label: "Guides",
                to: "/docs/category/guides"
              },
              {
                label: "References",
                to: "/docs/reference/cli"
              }
            ]
          },
          {
            title: "Products",
            items: [
              {
                label: "Authentication",
                to: "/docs/build/authentication"
              },
              {
                label: "Datastore",
                to: "/docs/build/datastore"
              },
              {
                label: "Storage",
                to: "/docs/build/storage"
              },
              {
                label: "Hosting",
                to: "/docs/build/hosting"
              },
              {
                label: "Functions",
                to: "/docs/build/functions"
              },
              {
                label: "Analytics",
                to: "/docs/build/analytics"
              }
            ]
          },
          {
            title: "Community",
            items: [
              {
                label: "Showcase",
                to: "/showcase"
              },
              {
                label: "X",
                href: "https://twitter.com/junobuild"
              },
              {
                label: "YouTube",
                href: "https://youtube.com/@junobuild"
              },
              {
                label: "Discord",
                href: "https://discord.gg/wHZ57Z2RAG"
              },
              {
                href: "https://oc.app/community/vxgpi-nqaaa-aaaar-ar4lq-cai/?ref=xanzv-uaaaa-aaaaf-aneba-cai",
                label: "OpenChat",
                position: "right"
              }
            ]
          },
          {
            title: "More",
            items: [
              {
                label: "White Paper",
                to: "/docs/white-paper/intro"
              },
              {
                label: "Showcase",
                to: "/showcase"
              },
              {
                label: "Blog",
                to: "/blog"
              },
              {
                label: "Newsletter",
                to: "/newsletter"
              },
              {
                label: "Sponsorship",
                to: "/sponsorship"
              },
              {
                label: "Changelog",
                to: "/changelog"
              },
              {
                label: "GitHub",
                href: "https://github.com/junobuild/juno"
              },
              {
                label: "Brand & Press",
                href: "https://github.com/junobuild/brand"
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Juno.build`
      },
      prism: {
        theme: codeTheme,
        additionalLanguages: ["bash", "json", "toml"]
      },
      algolia: {
        appId: "FEZV8HILVI",
        apiKey: "985173b8726e18aee4c99ae03b9f30b5",
        indexName: "juno",
        contextualSearch: true
      },
      feedOptions: {
        limit: false
      }
    }
};

module.exports = config;
