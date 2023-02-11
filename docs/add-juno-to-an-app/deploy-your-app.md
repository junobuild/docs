---
sidebar_position: 3
---

# Deploy your app

Deploying your app with Juno is straightforward, just like deploying any modern frontend application.

## Requirements

- [Node.js](https://nodejs.org/en/download/) version LTS or higher
- Latest version of Juno [CLI]
- The environment where deployment is executed (e.g. local or CI) must be authorized to control your [satellite]. For more information, see the [CLI] documentation on authorizing a non-interactive environment.

## Build your app

Build your app **for production**. Commonly:

```bash
npm run build
```

## Deploy your app

If you do not have the [CLI] installed yet, install it:

```bash
npm install --global @junobuild/cli
```

and initialize the local project state (`juno.json`):

```bash
juno login
juno init
```

When prompted, during `login` and `init` select the satellite you created earlier.

Use the Juno [CLI] to upload your production build to your [satellite]:

```bash
juno deploy
```

:::note

If you're deploying your app for the first time or if there's no `juno.json` configuration file available in the root of your project, you'll be prompted for some information. The Juno [CLI] needs this information to know which [satellite] your app should be deployed to and where the files are located.

:::

[CLI]: ../miscellaneous/cli.md
[satellite]: ../terminology.md#satellite
