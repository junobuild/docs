---
sidebar_position: 6
---

# SDK usage in a NodeJS context

This guide is intended for use of Juno in a non-interactive environment, i.e. not in a browser.

:::tip

You can find a few examples of NodeJS usage in the [example](https://github.com/junobuild/examples/tree/main/node) repository.

:::

---

## Usage

To get started, you need to ensure the SDK is installed in your project:

```bash
npm i @junobuild/core-peer
```

Unlike in a web application, initializing Juno globally in your NodeJS app is not required.

Instead, you can call any of Juno's functions with an additional parameter that includes the satellite ID and other parameters, such as `container` set to `true` if you are [developing locally](../guides/local-development.md).

Moreover, since no interactive [Authentication](../build/authentication.md) is performed in this context, the information must also be provided. The DFINITY [agent-js](https://github.com/dfinity/agent-js/) library can be used to build an `identity`.

---

## Example

To call the `getDoc` function from the Datastore:

```typescript
import { getDoc } from "@junobuild/core-peer";
import { AnonymousIdentity } from "@dfinity/agent";

const satellite = {
  identity: new AnonymousIdentity(),
  id: "jx5yt-yyaaa-aaaal-abzbq-cai",
  container: true
}

const doc = await getDoc({
  collection: "demo",
  key: "id2",
  satellite
});

console.log(doc);
```
