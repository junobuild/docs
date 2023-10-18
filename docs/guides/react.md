---
id: react
title: React
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Use Juno with React

Learn how to create a Juno project developed with React.

## Table of contents

- [Quickstart](#quickstart)
- [Note-taking app](#note-taking-app)

---

## Quickstart

Learn how to create a [satellite], set up a collection, and save data from a React app.

### 1. Set up a satellite and new collection

[Create a new satellite](../add-juno-to-an-app/create-a-satellite.md) in the Juno's console.

After your project is ready, create a collection in your datastore, which we'll call `demo` in the [console](https://console.juno.build).

### 2. Create a React app

Create a React app using for example a [Vite](https://vitejs.dev/guide/) template.

```bash
npm create vite@latest my-app -- --template react
```

### 3. Install the Juno SDK core library

Use `@junobuild/core` client library which provides a convenient interface for working with Juno from a React app.

Navigate to the React app and install `@junobuild/core`.

```bash
cd my-app && npm i @junobuild/core
```

#### 4. Insert data from your app

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
      {record !== undefined && <output>Key: {record.key}</output>}
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

[satellite]: ../terminology.md#satellite
