# Deploy Frontend

This section describes how to deploy the frontend of your project using GitHub Actions. The frontend typically includes all client-side assets — such as HTML, CSS, JavaScript, and other static files—that are served to users.

With this setup, changes pushed to your repository can be automatically deployed based on your workflow configuration.

---

## Configuration

To configure an action to deploy your frontend assets, follow these steps:

1. Create or edit a `deploy.yml` file in the `.github/workflows` subfolder of your repository. If the folders do not exist, create those.
2. Paste the following code into the file:

```yaml title="deploy.yml"
name: Deploy Frontend to Juno

on:
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          registry-url: "https://registry.npmjs.org"

      - name: Install Dependencies
        run: npm ci

      - name: Deploy to Juno
        uses: junobuild/juno-action@main
        with:
          args: deploy
        env:
          JUNO_TOKEN: ${{ secrets.JUNO_TOKEN }}
```

Whenever code is pushed to your `main` branch, this action performs the following tasks: it checks out your repository, installs dependencies. It then utilizes the [junobuild/juno-action](https://github.com/junobuild/juno-action) GitHub Action to build and deploy your dapp.

That's it—your pipeline is set! 🥳

:::note

If your `juno.config` file does not build your application using a `predeploy` field, you might need to add an additional step to your YAML file to do so:

```yaml
- name: Build
  run: npm run build
```

:::

---

## Modes

The GitHub Action is basically just an environment that proxies commands to the CLI. That’s why you can also pass the `--mode` option flag. Useful, for example, if you want to deploy your app for a `staging` instead of the default `production`.

You can either hardcode the mode in the arguments:

```yaml
- name: Deploy to Juno
  uses: junobuild/juno-action@main
  with:
    args: deploy --mode staging
  env:
    JUNO_TOKEN: ${{ secrets.JUNO_TOKEN }}
```

Or, if you're using an environment variable, pass it like this:

```yaml
- name: Deploy to Juno
  uses: junobuild/juno-action@main
  with:
    args: deploy --mode ${{ env.JUNO_MODE }}
  env:
    JUNO_TOKEN: ${{ secrets.JUNO_TOKEN }}
    JUNO_MODE: staging
```

---

## Optimization & Best Practices

Below are key considerations to ensure efficient and cost-effective deployment of your project.

### Build Reproducibility

Only new resources will be deployed to your satellite. Changes are detected through sha256 comparison. Therefore, ensuring the build reproducibility of your application is crucial to accurately identify and deploy the necessary updates.

### Deployment Costs

Deploying new assets consumes [cycles], and the cost increases with both the frequency of deployments and the number of items to deploy. While the above code snippet demonstrates a more frequent lifecycle, as a general recommendation, consider minimizing your deployment expenses with less frequent deployments. For instance, you can trigger the action on releases instead.

```yaml
on:
  release:
    types: [released]
```
