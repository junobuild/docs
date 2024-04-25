---
id: github-actions
title: GitHub Actions
description: Continuous integration and deployment
sidebar_position: 8
---

# GitHub Actions

Using any features offered by the Juno [CLI] within GitHub Actions is possible.

## Using GitHub Actions to Deploy Your Decentralized App

This documentation will guide you through the process of deploying your decentralized app to Juno satellites using the [junobuild/juno-action](https://github.com/junobuild/juno-action) GitHub Action.

### Adding a Secret Token for Automation

Before you can effectively implement automation, it is necessary to add a secret token to your GitHub repository or organization. This token will enable the CI (Continuous Integration) to deploy to your [satellite].

Follow the steps below to generate a new controller:

1. Go to the Juno's [console](https://console.juno.build).
2. Select your satellite.
3. On the satellite's dashboard, navigate to the "Controllers" tab.
4. Click on "Add a controller".
5. Generate a new controller (default option) with a permission scope set to "Read-write".
6. Click "Submit".
7. Upon successful creation, a new controller will be generated, and a "Secret token" will be displayed. Copy the token value and save it as an [encrypted secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in your repository or organization, using the key `JUNO_TOKEN`.

:::info

Although it is possible to generate a controller with administrative permission, we strongly recommend using the "Read-write" scope. This ensures that GitHub does not have the capability to operate your smart contract, such as stopping or deleting your satellite. By opting for the "Read-write" scope, you maintain full control over your decentralized app and minimize the risk of unwanted interference from GitHub.

:::

### Creating the GitHub Action

To configure the action, follow these steps:

1. Create a `deploy.yaml` file in the `.github/workflows` subfolder of your repository. If the folder doesn't exist, create it.
2. Paste the following code into a new `deploy.yaml` file.

```yaml
name: Deploy to Juno

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: "20.x"
          registry-url: "https://registry.npmjs.org"

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Juno
        uses: junobuild/juno-action@main
        with:
          args: deploy
        env:
          JUNO_TOKEN: ${{ secrets.JUNO_TOKEN }}
```

Whenever code is pushed to your `main` branch, this action performs the following tasks: it checks out your repository, installs dependencies, and builds your application. It then utilizes the [junobuild/juno-action](https://github.com/junobuild/juno-action) GitHub Action to deploy your dapp.

Make sure to adapt the code according to your specific requirements, such as adjusting the branch name and package manager command.

:::tip

Before configuring the action, take the following factors into consideration:

- **Build Reproducibility**: Only new resources will be deployed to your satellite. Changes are detected through sha256 comparison. Therefore, ensuring the build reproducibility of your application is crucial to accurately identify and deploy the necessary updates.
- **Deployment Costs**: Deploying new assets consumes [cycles], and the cost increases with both the frequency of deployments and the number of items to deploy. While the above code snippet demonstrates a more frequent lifecycle, as a general recommendation, consider minimizing your deployment expenses with less frequent deployments. For instance, you can trigger the action on releases instead.

```yaml
on:
  release:
    types: [released]
```

:::

[CLI]: ../miscellaneous/cli.md
[satellite]: ../terminology.md#satellite
[cycles]: ../terminology.md#cycles
