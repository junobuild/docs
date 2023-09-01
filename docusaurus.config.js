// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Juno",
  tagline: "Build Web3 Apps Like It's Web2.",
  url: "https://juno.build",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "buildwithjuno",
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
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/buildwithjuno/docs/edit/main/",
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "All our posts",
          blogSidebarCount: "ALL",
          editUrl: "https://github.com/buildwithjuno/docs/edit/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],

  plugins: ["docusaurus-plugin-sass"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/social_image_v3.jpg",
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
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://console.juno.build",
            label: "Start building",
            position: "right",
          },
          {
            href: "https://discord.gg/wHZ57Z2RAG",
            label: "Discord",
            position: "right",
          },
          {
            href: "https://github.com/buildwithjuno/juno",
            label: "GitHub",
            position: "right",
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
                href: "https://github.com/buildwithjuno/brand",
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
                href: "https://github.com/buildwithjuno/juno",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Juno.build`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: "FEZV8HILVI",
        apiKey: "985173b8726e18aee4c99ae03b9f30b5",
        indexName: "juno",
        contextualSearch: true,
      },
    }),
};

module.exports = config;
