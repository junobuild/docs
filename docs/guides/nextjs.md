---
id: nextjs
title: Next.js
description: Use Juno with Next.js
toc_min_heading_level: 2
toc_max_heading_level: 2
sidebar_position: 1
---

# Use Juno with Next.js

Explore how to create a Juno project developed with Next.js.

## Table of contents

- [Quickstart](#quickstart)
- [Note-taking app](#note-taking-app)
- [Hosting](#hosting)

---

## Quickstart

Learn how to create a [satellite], set up a collection, and save data from a React app.

### 1. Set up a satellite and new collection

[Create a new satellite](../add-juno-to-an-app/create-a-satellite.md) in the Juno's console.

After your project is ready, create a collection in your datastore, which we'll call `demo`, using the [console](https://console.juno.build).

### 2. Create a Next.js app

Use the [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app) command, to create a Next.js app:

```bash
npx create-next-app@latest myjunoapp
```

### 3. Install the Juno SDK core library

Use `@junobuild/core` client library which provides a convenient interface for working with Juno from a Next.js app.

Navigate to the Next.js app and install `@junobuild/core`.

```bash
cd myjunoapp && npm i @junobuild/core
```

### 4. Insert data from your app

In `Page.tsx`, assuming you're using TypeScript; otherwise, in the corresponding JavaScript file, initialize the library with your public satellite ID.

Add an `insert` function to persist a document.

```typescript title="Page.tsx"
"use client";

import { useEffect, useState } from "react";
import { type Doc, initJuno, setDoc } from "@junobuild/core";

type Record = {
  hello: string;
};

export default function Home() {
  const [record, setRecord] = useState<Doc<Record> | undefined>(undefined);

  // TODO: Replace 'satelliteId' with your actual satellite ID
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "wjar4-kiaaa-aaaal-ab4va-cai",
      }))();
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

Start the app, go to [http://localhost:3000](http://localhost:3000) in a browser, click "Insert a document," and you should see the data successfully persisted in your satellite on the blockchain.

---

## Note-taking app

This example demonstrates how to build a basic note-taking app. The app authenticates and identifies the user, stores their notes in a simple key-pair database, some files in storage, and allows the user to log in and retrieve their data. The app uses:

- Juno [datastore](../build/datastore.md): a simple key-pair database for storing user data and other information.
- Juno [storage](../build/storage.md): a file storage system to store and serve user-generated content, such as photos.
- Juno [authentication](../build/authentication.md): easy-to-use SDKs that support truly anonymous authentication.

For sample code and instructions, visit the guide 👉 [GitHub repo](https://github.com/junobuild/examples/tree/main/next/diary).

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
  output: "export",
};

module.exports = nextConfig;
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

When prompted to provide the name or path of the folder containing your built dapp files, answer `out`.

### 5. Open

Open your browser and you should see your deployed app or website.

```bash
juno open
```

[satellite]: ../terminology.md#satellite
