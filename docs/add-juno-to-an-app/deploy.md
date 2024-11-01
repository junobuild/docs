---
sidebar_position: 3
description: Learn how to deploy your app using Juno with our comprehensive guide. Follow these steps to ensure a smooth deployment process.
keywords:
  [
    deploy app with Juno,
    Juno deployment guide,
    how to deploy app,
    Juno CLI,
    Juno satellite
  ]
---

# Deploy

Deploying your app with Juno is straightforward, just like deploying any modern frontend application.

:::note

[Node.js](https://nodejs.org/en/download/) version LTS or higher is required.

:::

## Build your App

Before proceeding, ensure that your app is prepared and built for production. Typically, this involves the following steps:

```bash
npm run build
```

## Deploy your App

To install the [CLI] if you haven't done so already:

```bash
npm i -g @junobuild/cli
```

Once the installation is complete, you can log in to your [satellite] from the terminal.

```bash
juno login
```

Running this command will open Juno's [console] in your browser. You will be prompted to grant access to your machine.

After setting up authentication, deploy your project by running the following command from the root folder of your project:

```bash
juno deploy
```

During the initial deployment, you will be prompted to select the target satellite. The process should proceed smoothly, and upon completion, your app will be hosted on-chain.

:::tip

Juno provides a **GitHub Action** that automates the deployment of your dapp to your satellite. For detailed instructions on how to configure it for your repository, please refer to the documentation [here](../guides/github-actions).

:::

[CLI]: ../miscellaneous/cli.mdx
[satellite]: ../terminology.md#satellite
[console]: ../terminology.md#console
