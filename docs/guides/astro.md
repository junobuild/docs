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

Learn how to create a [satellite], set up a collection, and save data from a React app.

### 1. Set up a satellite and new collection

[Create a new satellite](../add-juno-to-an-app/create-a-satellite.md) in the Juno's console.

After your project is ready, create a collection in your datastore, which we'll call `demo`, using the [console](https://console.juno.build).

### 2. Create an Astro app

Create a [Astro](https://astro.build/) app using the `npm create` command:

```bash
npm create astro@latest myjunoapp
```

### 3. Install the Juno SDK core library

Use `@junobuild/core` client library which provides a convenient interface for working with Juno from a Astro app.

Navigate to the Astro app and install `@junobuild/core`.

```bash
cd myjunoapp && npm i @junobuild/core
```

### 4. Insert data from your app

In `index.astro`, initialize the library with your public satellite ID.

Add an `insert` function to persist a document.

```html title="index.astro"
<!DOCTYPE html>
<html lang="en">
  <body>
    <main>
      <button id="insert">Insert a document</button>
      <p>Document persisted key: <output id="result"></output></p>

      <script>
        import { initJuno, setDoc } from "@junobuild/core";

        // Initialize Juno
        document.addEventListener(
          "DOMContentLoaded",
          async () => {
            await initJuno({
              satelliteId: "nkzsw-gyaaa-aaaal-ada3a-cai",
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
                hello: "world",
              },
            },
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
