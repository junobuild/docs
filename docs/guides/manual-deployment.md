---
id: manual-deployment
title: Manual Deployment
description: Learn how to deploy an application to a Juno Satellite from your device using the CLI.
sidebar_position: 9
---

# Manual Deployment

While we recommend using [GitHub Actions](./github-actions.mdx) for efficient and automated deployments, this guide covers how to manually deploy your Astro app to Juno from your device using the Juno CLI. Follow these steps to set up, build, and deploy your application to a Juno Satellite.

This approach is ideal for testing or personal projects.

---

### 1. Install Juno CLI and log in

Install the Juno command line interface by executing the following command in your terminal:

```bash
npm i -g @junobuild/cli
```

After the CLI is ready, log in to your satellite from your terminal to authenticate your device.

```bash
juno login
```

Running this command will open Juno's console in your browser. You will be prompted to grant permissions for your modules (Mission Control — i.e., your wallet, Satellite(s), or Analytics) to access from your machine.

### 2. Deploy

Build your project:

```bash
npm run build
```

Deploy your application or website by running the following command from your project’s root folder:

```bash
juno deploy
```

:::tip

When prompted for the name or path of the folder containing your built dapp files, provide the appropriate folder name for your framework, such as `build` (SvelteKit), `out` (Next.js), or `dist` (React, Astro, or Vue).

:::

Wait for the deploy to complete. Once uploaded, it will be live on your Juno Satellite and accessible on the web.
