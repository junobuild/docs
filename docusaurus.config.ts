import type { Config } from "@docusaurus/types";
import { join } from "node:path";

const { themes } = require("prism-react-renderer");
const codeTheme = themes.oneDark;
codeTheme.plain.backgroundColor = "black";
codeTheme.styles = [
  ...codeTheme.styles,
  {
    types: ["property", "tag", "symbol", "deleted", "important"],
    style: { color: "#00fff5" }
  },
  { types: ["keyword"], style: { color: "rgb(163, 174, 255)" } },
  {
    types: [
      "selector",
      "string",
      "char",
      "builtin",
      "inserted",
      "regex",
      "attr-value"
    ],
    style: { color: "#ff5df9" }
  },
  {
    types: ["variable", "operator", "function"],
    style: { color: "#ff5df9" }
  },
  {
    types: [
      "attr-name",
      "class-name",
      "maybe-class-name",
      "boolean",
      "constant",
      "number",
      "atrule"
    ],
    style: { color: "#F7AF9D" }
  }
];

const config: Config = {
  title: "Juno",
  tagline: "Build Web3 at Lightning Speed",
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
          editUrl: "https://github.com/junobuild/docs/edit/main/"
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "All our posts",
          blogSidebarCount: "ALL",
          editUrl: "https://github.com/junobuild/docs/edit/main/"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss")
        }
      }
    ]
  ],

  plugins: [
    "docusaurus-plugin-sass",
    join(process.cwd(), "docusaurus.showcase.plugin.ts"),
    join(process.cwd(), "docusaurus.changelog.plugin.ts")
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: "img/social_image_v6.jpg",
      navbar: {
        logo: {
          alt: "Juno Logo",
          src: "img/juno_logo.svg",
          srcDark: "img/juno_logo_dark.svg"
        },
        hideOnScroll: true,
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs"
          },
          {
            type: "dropdown",
            label: "More",
            position: "left",
            items: [
              { to: "/showcase", label: "Showcase" },
              { to: "/blog", label: "Blog" },
              { to: "/changelog", label: "Changelog" },
              { to: "/newsletter", label: "Newsletter" }
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
                Start building
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
            title: "Docs",
            items: [
              {
                label: "Getting started",
                to: "/docs/intro"
              },
              {
                label: "Add Juno to an app",
                to: "/docs/add-juno-to-an-app/create-a-satellite"
              },
              {
                label: "Guides and examples",
                to: "/docs/category/guides-and-examples"
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
                label: "Blog",
                to: "/blog"
              },
              {
                label: "Roadmap",
                to: "/docs/roadmap"
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
        additionalLanguages: ["bash", "json"]
      },
      algolia: {
        appId: "FEZV8HILVI",
        apiKey: "985173b8726e18aee4c99ae03b9f30b5",
        indexName: "juno",
        contextualSearch: true
      },
      feedOptions: {
        limit: false
      },
      announcementBar: {
        id: "support_us",
        content:
          'If you like Juno, <a target="_blank" rel="noopener noreferrer" href="https://github.com/junobuild/juno">star it on GitHub</a>!<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="20" height="20" style="vertical-align: text-bottom;" fill="currentColor"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg>',
        backgroundColor: "var(--ifm-navbar-background-color)",
        textColor: "var(--ifm-menu-color)",
        isCloseable: false
      }
    }
};

module.exports = config;
