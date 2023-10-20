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
- [Note-taking app](#note-taking-app)
- [Hosting](#hosting)

---

## Quickstart

Learn how to create a [satellite], set up a collection, and save data from a React app.

### 1. Set up a satellite and new collection

[Create a new satellite](../add-juno-to-an-app/create-a-satellite.md) in the Juno's console.

After your project is ready, create a collection in your datastore, which we'll call `demo`, using the [console](https://console.juno.build).

### 2. Create a React app

Create a React app using for example a [Vite](https://vitejs.dev/guide/) template.

```bash
npm create vite@latest myjunoapp -- --template react
```

### 3. Install the Juno SDK core library

Use `@junobuild/core` client library which provides a convenient interface for working with Juno from a React app.

Navigate to the React app and install `@junobuild/core`.

```bash
cd myjunoapp && npm i @junobuild/core
```

### 4. Insert data from your app

In `App.jsx`, initialize the library with your public satellite ID.

Add an `insert` function to persist a document.

```javascript
import { useEffect, useState } from "react";
import { initJuno, setDoc } from "@junobuild/core";

function App() {
  const [record, setRecord] = useState(undefined);

  // TODO: Replace the following satelliteId with your app's effective satellite ID.
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai",
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

export default App;
```

### 5. Start the app

Start the app, go to [http://localhost:5173](http://localhost:5173) in a browser, click "Insert a document," and you should see the data successfully persisted in your satellite on the blockchain.

---

## Note-taking app

This tutorial, published as a [blog post](/blog/build-a-web3-app-with-react-js), demonstrates how to build a basic note-taking app. The app authenticates and identifies the user, stores their notes in a simple key-pair database, some files in storage, and allows the user to log in and retrieve their data. The app uses:

- Juno [datastore](../build/datastore.md): a simple key-pair database for storing user data and other information.
- Juno [storage](../build/storage.md): a file storage system to store and serve user-generated content, such as photos.
- Juno [authentication](../build/authentication.md): easy-to-use SDKs that support truly anonymous authentication.

For detailed instructions, visit the guide 👉 [Build A Web3 App With React JS](/blog/build-a-web3-app-with-react-js).

---

## Hosting

If you're looking to deploy your existing app or website developed with React and Juno, this guide is for you.

### 1. Set up a satellite

[Create a new satellite](../add-juno-to-an-app/create-a-satellite.md) in the Juno's console.

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
