---
id: react
title: React
description: Use Juno with React
toc_min_heading_level: 2
toc_max_heading_level: 2
sidebar_position: 2
---

# Use Juno with React

Explore how to create a Juno project developed with React.

## Table of contents

- [Quickstart](#quickstart)
- [Note-taking app example](#note-taking-app-example)
- [Hosting](#hosting)

---

## Quickstart

This guide provides quickstart instructions for integrating Juno in two scenarios: starting a new project and adding Juno to an existing React app.

Additionally, it covers how to develop against a production environment or locally.

### Path A: Start a new project with a template

1. Create a new project using the Juno quickstart CLI:

```bash
npm create juno@latest
```

### Path B: Integrate Juno into an existing React app

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

To develop with the local emulator, add a collection named `demo` within the `juno.dev.config.js` file.

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

In `App.jsx`, initialize the library with the satellite ID you have created for production, or use `jx5yt-yyaaa-aaaal-abzbq-cai` if you are developing locally with the emulator.

Add an `insert` function to persist a document.

```javascript title="App.jsx"
import { useEffect, useState } from "react";
import { initSatellite, setDoc } from "@junobuild/core";

function App() {
  const [record, setRecord] = useState(undefined);

  useEffect(() => {
    (async () => await initSatellite())();
  }, []);

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

    setRecord(doc);
  };

  return (
    <>
      <button onClick={insert}>Insert a document</button>
      {record !== undefined && <span>Key: {record.key}</span>}
    </>
  );
}

export default App;
```

### 5. Start the app

Start the app and go to [http://localhost:5173](http://localhost:5173) in a browser. Click "Insert a document" to see the data successfully persisted in your satellite on the blockchain.

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

If you're looking to deploy your existing app or website developed with React and Juno, this guide is for you.

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

Build your app:

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
