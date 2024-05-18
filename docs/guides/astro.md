---
id: astro
title: Astro
description: Use Juno with Astro
toc_min_heading_level: 2
toc_max_heading_level: 2
sidebar_position: 6
---

# Use Juno with Astro

Explore how to create a Juno project developed with Astro.

## Table of contents

- [Quickstart](#quickstart)
- [Hosting](#hosting)

---

## Quickstart

This guide provides quickstart instructions for integrating Juno in two scenarios: starting a new project and adding Juno to an existing Astro app.

Additionally, it covers how to develop against a production environment or locally.

### Path A: Start a new project with a template

1. Create a new project using the Juno quickstart CLI:

```bash
npm create juno@latest
```

### Path B: Integrate Juno into an existing Next.js app

1. Add the Juno SDK:

Navigate to your existing app directory and install Juno SDK:

```bash
cd your-existing-app
npm i @junobuild/core
```

### 2. Configure Datastore

#### Production Path

To use production, set up a satellite and new collection:

- [Create a new satellite](../add-juno-to-an-app/create-a-satellite.md) in the Juno's console.
- After your project is ready, create a collection in your datastore, which we'll call `demo`, using the [console](https://console.juno.build).

#### Local Development Path

To develop with the local emulator, add a collection named `demo` within the `juno.dev.config.mjs` file.

```typescript
import { defineDevConfig } from "@junobuild/config";

/** @type {import('@junobuild/config').JunoDevConfig} */
export default defineDevConfig(() => ({
  satellite: {
    collections: {
      db: [
        {
          collection: "demo",
          read: "managed",
          write: "managed",
          memory: "stable",
          mutablePermissions: true
        }
      ]
    }
  }
}));
```

- Once set, run the local emulator:

```bash
juno dev start
```

- If the Juno admin CLI (required for deployment, configuration, or to run the emulator) is not installed yet, run:

```
npm i -g @junobuild/cli
```

### 3. Insert data from your app

In `index.astro`, initialize the library with the satellite ID you have created for production, or use `jx5yt-yyaaa-aaaal-abzbq-cai` if you are developing locally with the emulator.

Add an `insert` function to persist a document.

```html title="index.astro"
<!doctype html>
<html lang="en">
  <body>
    <main>
      <button id="insert">Insert a document</button>
      <p>Document persisted key: <output id="result"></output></p>

      <script>
        import { initSatellite, setDoc } from "@junobuild/core";

        // Initialize Juno
        // TODO: Replace 'satelliteId' with your actual satellite ID
        document.addEventListener(
          "DOMContentLoaded",
          async () => {
            await initSatellite({
              satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai"
            });
          },
          { once: true }
        );

        // Insert a document in Juno's datastore
        const insert = async () => {
          const doc = await setDoc({
            collection: "demo",
            doc: {
              key: `my-key-${new Date().getTime()}`,
              data: {
                hello: "world"
              }
            }
          });

          const result = document.querySelector("#result");
          if (result !== null) {
            result.textContent = doc.key;
          }
        };

        document
          .querySelector("#insert")
          ?.addEventListener("click", insert, { passive: true });
      </script>
    </main>
  </body>
</html>
```

### 5. Start the app

Start the app, go to [http://localhost:4321/](http://localhost:4321/) in a browser, click "Insert a document," and you should see the data successfully persisted in your satellite on the blockchain.

---

## Hosting

If you're looking to deploy your existing app or website developed with Astro and Juno, this guide is for you.

### 1. Set up a satellite

If you haven't created a satellite yet, go ahead and [create](../add-juno-to-an-app/create-a-satellite.md) a new one in the Juno's console.

### 2. Install Juno CLI and log in

Install the Juno command line interface by executing the following command in your terminal:

```bash
npm i -g @junobuild/cli
```

After the CLI is ready, log in to your satellite from your terminal to authenticate your device.

```bash
juno login
```

### 3. Deploy

Build your website:

```bash
npm run build
```

Deploy your project by running the following command from your project’s root folder:

```bash
juno deploy
```

When prompted to provide the name or path of the folder containing your built dapp files, answer `dist`.

### 4. Open

Open your browser and you should see your deployed app or website.

```bash
juno open
```

[satellite]: ../terminology.md#satellite
