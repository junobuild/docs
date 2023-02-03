// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Juno",
  tagline: "Build web3 apps faster than ever.",
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
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/buildwithjuno/site/edit/main/docs/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/buildwithjuno/site/edit/main/blog/",
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
            href: "https://twitter.com/junobuild",
            label: "Twitter",
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
                label: "GitHub",
                href: "https://github.com/buildwithjuno",
              },
            ],
          },
        ],
        logo: {
          alt: "Juno Logo",
          src: "img/juno_logo.svg",
          href: "https://juno.build",
          width: 160,
          height: 51,
        },
        copyright: `Copyright © ${new Date().getFullYear()} Juno.build`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
