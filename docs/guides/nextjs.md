---
id: nextjs
title: Next.js
description: Learn how to integrate Juno with Next.js. Follow our quickstart guide and examples to get started.
keywords: [Juno, Next.js, integration, quickstart, guide, examples, hosting]
toc_min_heading_level: 2
toc_max_heading_level: 2
sidebar_position: 1
---

# Use Juno with Next.js

Explore how to create a Juno project developed with Next.js.

## Table of contents

- [Quickstart](#quickstart)
- [Note-taking app example](#note-taking-app-example)
- [Hosting](#hosting)

---

## Quickstart

This guide provides quickstart instructions for integrating Juno in two scenarios: starting a new project and adding Juno to an existing Next.js app.

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

- [Create a new satellite](../create-a-satellite.md) in the Juno's console.
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

In `Page.tsx`, (if using TypeScript) or the corresponding JavaScript file, initialize the library with the satellite ID you have created for production, or use `jx5yt-yyaaa-aaaal-abzbq-cai` if you are developing locally with the emulator.

Add an `insert` function to persist a document as well.

```typescript title="Page.tsx"
"use client";

import { useEffect, useState } from "react";
import { type Doc, initSatellite, setDoc } from "@junobuild/core-peer";

type Record = {
  hello: string;
};

export default function Home() {
  const [record, setRecord] = useState<Doc<Record> | undefined>(undefined);

  useEffect(() => {
    (async () =>
      await initSatellite())();
  }, []);

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

    setRecord(doc);
  };

  return (
    <>
      <button onClick={insert}>Insert a document</button>
      {record !== undefined && <span>Key: {record.key}</span>}
    </>
  );
}
```

### 5. Start the app

Start the app and go to [http://localhost:3000](http://localhost:3000) in a browser. Click "Insert a document" to see the data successfully persisted in your satellite on the blockchain.

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

If you're looking to deploy your existing app or website developed with Next.js and Juno, this guide is for you.

### 1. Static exports

The Internet Computer, including Juno, currently does not support Server Side Rendering. Therefore, it is recommended to generate a pre-rendered or client-side-only frontend application.

We suggest using the [static exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) option from Next.js.

In `next.config.js` file:

```javascript title="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export"
};

module.exports = nextConfig;
```

### 2. Set up a satellite

If you haven't created a satellite yet, go ahead and [create](../create-a-satellite.md) a new one in the Juno's console.

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

When prompted to provide the name or path of the folder containing your built dapp files, answer `out`.

### 5. Open

Open your browser and you should see your deployed app or website.

```bash
juno open
```

[satellite]: ../terminology.md#satellite
