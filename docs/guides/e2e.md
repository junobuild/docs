---
id: e2e
title: End-to-End Testing
description: Learn how to write and run end-to-end (E2E) tests for your Juno project using tools like Playwright and GitHub Actions. Includes emulator setup, authentication handling, and CI integration.
---

# End-to-End Testing

End to end (E2E) testing helps you verify that your application behaves as expected when deployed. It covers real workflows — from serverless functions to client calls — and helps catch issues that unit tests might miss.

This page outlines how to approach E2E testing with Juno. It includes recommendations and patterns.

---

## Frameworks

We suggest [Playwright](https://playwright.dev/), but [Cypress](https://www.cypress.io/) or other frameworks will work.

Choose whatever fits your project best.

That being said, integrating authentication is easier in Playwright given that a plugin is available (see next chapter).

---

## Authentication

If your application require authentication, we recommend using the Playwright plugin for Internet Identity maintained by the DFINITY foundation:

👉 [github.com/dfinity/internet-identity-playwright](https://github.com/dfinity/internet-identity-playwright)

It handles the full login flow programmatically, allowing your tests to sign in without user interaction.

### Example usage

After installing the plugin, you can write a test like this:

```typescript
import { testWithII } from "@dfinity/internet-identity-playwright";

testWithII("should sign-in with a new user", async ({ page, iiPage }) => {
  await page.goto("/");

  await iiPage.signInWithNewIdentity();
});
```

---

## Continuous Integration

To run end-to-end tests in CI, we recommend using the `junobuild/satellite` image.

This image runs a headless Satellite (spun with a predictable ID `jx5yt-yyaaa-aaaal-abzbq-cai`) with all core services enabled. It's a bit faster to start and does not require using the Console UI.

---

### Configuration

In your `juno.config.ts`, make sure to set the `development` ID to match the one used by the image, and set the emulator to run the `junobuild/satellite` image.

If you're using a different image like Skylab, you can make this configuration dynamic based on the mode received by `defineConfig`.

You can also replace `development` with `test` or any other mode. Adapt as you wish.

```typescript
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "jx5yt-yyaaa-aaaal-abzbq-cai",
      production: "<PROD_SATELLITE_ID>"
    },
    source: "out",
    collections: {
      datastore: [
        {
          collection: "notes",
          read: "managed",
          write: "managed",
          memory: "stable"
        }
      ],
      storage: [
        {
          collection: "images",
          read: "managed",
          write: "managed",
          memory: "stable"
        }
      ]
    }
  },
  emulator: {
    runner: {
      type: "docker"
    },
    satellite: {}
  }
});
```

The configuration above also defines the collections used by the application under test.

In the next chapter, we'll apply this config before running the tests.

---

### GitHub Actions

To run the tests in your CI, you can either use the [GitHub Actions](./github-actions/index.mdx) or install the CLI manually. In the example below, we install the CLI because we chain multiple commands.

```yaml
name: E2E Tests

on:
  pull_request:
  workflow_dispatch:

jobs:
  e2e:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 24
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies
        run: npm ci

      - name: Install Juno CLI
        run: npm i -g @junobuild/cli

      - name: Run emulator
        run: |
          set -e
          juno emulator start --headless &
          juno emulator wait
          juno login --emulator --mode development --headless
          juno config apply --mode development --headless

      - name: Run tests
        run: npm run e2e:ci

      - name: Upload Playwright report on failure
        uses: actions/upload-artifact@v4
        if: ${{ failure() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 3

      - name: Upload Playwright results on failure
        uses: actions/upload-artifact@v4
        if: ${{ failure() }}
        with:
          name: test-results
          path: test-results/
          retention-days: 3

  may-merge:
    needs: ["e2e"]
    runs-on: ubuntu-latest
    steps:
      - name: Cleared for merging
        run: echo OK
```

So, how it works:

- We start by checking out the code, installing Node.js, and running `npm ci` to install your project dependencies.
- As mentioned, instead of the Juno GitHub Actions, we install the Juno CLI globally so we can use it in the next steps.
- We then run the emulator using `juno emulator start --headless`, which launches the `junobuild/satellite` Docker image (defined in the `juno.config`) in the background, and follow up with:
  - `juno emulator wait` to ensure the emulator is ready before continuing.
  - `juno login` sets up authentication against the emulator in headless mode. This way the CLI can operate the Satellite — required for the next step.
  - `juno config apply` applies the configuration and sets the collections required by the project.
- Once everything is ready, we run the end-to-end tests via `npm run e2e:ci`. Replace with the command that runs your tests in headless mode.
- If the tests fail, Playwright reports and raw test results are uploaded as artifacts to help debugging.
- Finally, if everything passes, the `may-merge` job marks the PR as cleared.

That's it. Minimal setup, no need for the Console UI, and everything runs headlessly in CI.
