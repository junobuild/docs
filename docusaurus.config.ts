import { join } from "node:path";

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
import type { Config } from "@docusaurus/types";

const config: Config = {
  title: "Juno",
  tagline: "Build Web3 dApps like Web2",
  url: "https://juno.build",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "junobuild",
  projectName: "juno",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  customFields: {
    dev: process.env.NODE_ENV === "development",
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/junobuild/docs/edit/main/",
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "All our posts",
          blogSidebarCount: "ALL",
          editUrl: "https://github.com/junobuild/docs/edit/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      },
    ],
  ],

  plugins: [
    "docusaurus-plugin-sass",
    join(process.cwd(), "docusaurus.showcase.plugin.ts"),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: "img/social_image_v5.jpg",
      navbar: {
        title: "Juno",
        logo: {
          alt: "Juno Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          {
            type: "dropdown",
            label: "More",
            position: "left",
            items: [
              { to: "/blog", label: "Blog" },
              { to: "/showcase", label: "Showcase" },
            ],
          },
          {
            href: "https://console.juno.build",
            label: "Start building",
            position: "right",
          },
          {
            type: "html",
            position: "right",
            value:
              '<a href="https://github.com/junobuild/juno" target="_blank" rel="noopener noreferrer" aria-label="Go to Juno GitHub repo" class="navbar-github"><span>GitHub</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"/></svg></a>',
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting started",
                to: "/docs/intro",
              },
              {
                label: "Add Juno to an app",
                to: "/docs/add-juno-to-an-app/create-a-satellite",
              },
              {
                label: "Guides and examples",
                to: "/docs/category/guides-and-examples",
              },
            ],
          },
          {
            title: "Build",
            items: [
              {
                label: "Authentication",
                to: "/docs/build/authentication",
              },
              {
                label: "Datastore",
                to: "/docs/build/datastore",
              },
              {
                label: "Storage",
                to: "/docs/build/storage",
              },
              {
                label: "Hosting",
                to: "/docs/build/hosting",
              },
              {
                label: "Analytics",
                to: "/docs/build/analytics",
              },
            ],
          },
          {
            title: "About",
            items: [
              {
                label: "Internet Computer",
                to: "/docs/infrastructure/internet-computer",
              },
              {
                label: "Sustainability",
                to: "/docs/infrastructure/sustainability",
              },
              {
                label: "Architecture",
                to: "/docs/architecture",
              },
              {
                label: "Roadmap",
                to: "/docs/roadmap",
              },
              {
                label: "Brand & Press",
                href: "https://github.com/junobuild/brand",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "Showcase",
                to: "/showcase",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/junobuild",
              },
              {
                label: "Discord",
                href: "https://discord.gg/wHZ57Z2RAG",
              },
              {
                href: "https://oc.app/community/vxgpi-nqaaa-aaaar-ar4lq-cai/?ref=xanzv-uaaaa-aaaaf-aneba-cai",
                label: "OpenChat",
                position: "right",
              },
              {
                label: "GitHub",
                href: "https://github.com/junobuild/juno",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Juno.build`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash", "json"],
      },
      algolia: {
        appId: "FEZV8HILVI",
        apiKey: "985173b8726e18aee4c99ae03b9f30b5",
        indexName: "juno",
        contextualSearch: true,
      },
      feedOptions: {
        limit: false,
      },
    },
};

module.exports = config;
