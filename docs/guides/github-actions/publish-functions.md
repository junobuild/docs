---
title: Publish Functions
---

# Build and Publish Serverless Functions

This section explains how to automate the build and publication of your serverless functions using GitHub Actions. The process works for functions written in TypeScript or Rust and helps integrate function deployment into your development workflow.

---

## Configuration

To configure an action to build and publish serverless functions, follow these steps:

1. Create or edit `publish.yml` in `.github/workflows/`.
2. Paste the following code into the file:

```yaml title="publish.yml"
name: Publish Serverless Functions

on:
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  publish:
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

      - name: Build
        uses: junobuild/juno-action@main
        with:
          args: functions build

      - name: Publish
        uses: junobuild/juno-action@main
        with:
          args: functions publish
        env:
          JUNO_TOKEN: ${{ secrets.JUNO_TOKEN }}
```

This action will build and publish your serverless function bundle.

If your access key has a **write** role, the changes will be automatically deployed to your Satellite's CDN.

If your key only has a **submit** role, the release will be submitted as a pending change for manual approval. To avoid errors in submit-only workflows, you can explicitly use the `--no-apply` flag to skip auto-application.

```yaml
- name: Publish
  uses: junobuild/juno-action@main
  with:
    args: functions publish --no-apply
  env:
    JUNO_TOKEN: ${{ secrets.JUNO_TOKEN }}
```

---

## Optimization & Best Practices

Below are key considerations to ensure efficient and cost-effective publication of your functions.

### Triggering on Release

You can adjust the trigger to publish your serverless function only on releases, which helps reduce unnecessary CI runs and deployments.

```yaml
on:
  release:
    types: [released]
```

This ensures that your function bundle is built and published only when a GitHub release is published.
