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
- [Registration-form app](#registration-form-app)
- [Hosting](#hosting)

---

## Quickstart

Learn how to create a [satellite], set up a collection, and save data from a React app.

### 1. Set up a satellite and new collection

[Create a new satellite](../add-juno-to-an-app/create-a-satellite.md) in the Juno's console.

After your project is ready, create a collection in your datastore, which we'll call `demo`, using the [console](https://console.juno.build).

### 2. Create a SvelteKit app

Create a [SvelteKit](https://kit.svelte.dev/docs/creating-a-project) app using the `npm create` command:

```bash
npm create svelte@latest myjunoapp
```

### 3. Install the Juno SDK core library

Use `@junobuild/core` client library which provides a convenient interface for working with Juno from a SvelteKit app.

Navigate to the SvelteKit app and install `@junobuild/core`.

```bash
cd myjunoapp && npm i @junobuild/core
```

### 4. Insert data from your app

Create a new file `+layout.svelte` in `src/routes` and initialize the library with your public satellite ID.

Add an `insert` function to persist a document.

```html title="+layout.svelte"
<script>
  import { onMount } from "svelte";
  import { initJuno } from "@junobuild/core";

  // TODO: Replace the following satelliteId with your app's effective satellite ID.
  onMount(
    async () =>
      await initJuno({
        satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai",
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
          hello: "world",
        },
      },
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

## Registration-form app

This example demonstrates how to build a basic registration-form app. The app authenticates and identifies the user, stores their information in a simple key-pair database, and allows the user to log in and retrieve their data. The app uses:

- Juno [datastore](../build/datastore.md): a simple key-pair database for storing user data and other information.
- Juno [authentication](../build/authentication.md): easy-to-use SDKs that support truly anonymous authentication.

For sample code and instructions, visit the guide 👉 [GitHub repo](https://github.com/junobuild/examples/tree/main/svelte/form).

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
    adapter: adapter(),
  },
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
