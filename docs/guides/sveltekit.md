---
id: sveltekit
title: SvelteKit
description: Use Juno with SvelteKit
toc_min_heading_level: 2
toc_max_heading_level: 2
sidebar_position: 3
---

# Use Juno with SvelteKit

Explore how to create a Juno project developed with SvelteKit.

## Table of contents

- [Quickstart](#quickstart)
- [Note-taking app example](#note-taking-app-example)
- [Hosting](#hosting)

---

## Quickstart

This guide provides quickstart instructions for integrating Juno in two scenarios: starting a new project and adding Juno to an existing SvelteKit app.

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
npm i @junobuild/core-peer
```

### 2. Configure Datastore

#### Production Path

To use production, set up a satellite and new collection:

- [Create a new satellite](../add-juno-to-an-app/create-a-satellite.md) in the Juno's console.
- After your project is ready, create a collection in your datastore, which we'll call `demo`, using the [console](https://console.juno.build).

#### Local Development Path

To develop with the local emulator, add a collection named `demo` within the `juno.dev.config.ts` file.

```typescript
import { defineDevConfig } from "@junobuild/config";

export default defineDevConfig(() => ({
  satellite: {
    collections: {
      db: [
        {
          collection: "demo",
          read: "managed" as const,
          write: "managed" as const,
          memory: "stable" as const,
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

Create a new file `+layout.svelte` in `src/routes` and initialize the library with the satellite ID you have created for production, or use `jx5yt-yyaaa-aaaal-abzbq-cai` if you are developing locally with the emulator.

```html title="+layout.svelte"
<script>
  import { onMount } from "svelte";
  import { initSatellite } from "@junobuild/core";

  // TODO: Replace 'satelliteId' value with the satellite ID
  onMount(
    async () =>
      await initSatellite({
        satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai"
      })
  );
</script>

<slot />
```

Replace the existing content in your `+page.svelte` file in the same `routes` directory with the following code.

```html title="+page.svelte"
<script>
  import { setDoc } from "@junobuild/core";

  let doc;

  const insert = async () =>
    (doc = await setDoc({
      collection: "demo",
      doc: {
        key: `my-key-${new Date().getTime()}`,
        data: {
          hello: "world"
        }
      }
    }));
</script>

<button on:click="{insert}">Insert a document</button>

{#if doc !== undefined}
<span>Key: {doc.key}</span>
{/if}
```

### 5. Start the app

Start the app, go to [http://localhost:5173](http://localhost:5173) in a browser, click "Insert a document," and you should see the data successfully persisted in your satellite on the blockchain.

---

## Note-taking app example

This example demonstrates how to quickly deploy a basic note-taking app that integrates Juno's core features:

- [Authentication](../build/authentication.md): easy-to-use SDKs that support truly anonymous authentication.
- [Datastore](../build/datastore.md): a simple key-pair database for storing user data and other information.
- [Storage](../build/storage.md): a file storage system to store and serve user-generated content, such as photos.

Using the Juno CLI, you can easily scaffold this app. To start, run the appropriate command based on your package manager:

NPM:

```bash
npm create juno@latest
```

Yarn:

```bash
yarn create juno
```

PNPM:

```bash
pnpm create juno
```

<br />
Follow the CLI prompts to choose the note-taking app example and select local development. The CLI will manage all configurations and dependencies, allowing you to focus on exploring and customizing your app right away.

---

## Hosting

If you're looking to deploy your existing app or website developed with SvelteKit and Juno, this guide is for you.

### 1. Static site generation

The Internet Computer, including Juno, currently does not support Server Side Rendering. Therefore, it is recommended to generate a pre-rendered or client-side-only frontend application.

We suggest using the [adapter-static](https://kit.svelte.dev/docs/adapter-static) option from SvelteKit and replacing the default adapter.

Remove and install the adapter:

```bash
npm rm @sveltejs/adapter-auto && npm i -D @sveltejs/adapter-static
```

Update the import in `svelte.config.js` file:

```javascript title="svelte.config.js"
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  }
};

export default config;
```

Create a file `+layout.js` in `src/routes` to set the prerender option:

```javascript title="+layout.js"
export const prerender = true;
```

### 2. Set up a satellite

If you haven't created a satellite yet, go ahead and [create](../add-juno-to-an-app/create-a-satellite.md) a new one in the Juno's console.

### 3. Install Juno CLI and log in

Install the Juno command line interface by executing the following command in your terminal:

```bash
npm i -g @junobuild/cli
```

After the CLI is ready, log in to your satellite from your terminal to authenticate your device.

```bash
juno login
```

### 4. Deploy

Build your app:

```bash
npm run build
```

Deploy your project by running the following command from your project’s root folder:

```bash
juno deploy
```

When prompted to provide the name or path of the folder containing your built dapp files, answer `build`.

### 5. Open

Open your browser and you should see your deployed app or website.

```bash
juno open
```

[satellite]: ../terminology.md#satellite
