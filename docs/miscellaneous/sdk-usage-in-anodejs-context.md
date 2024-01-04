---
sidebar_position: 5
---

# SDK usage in a NodeJS context

:::note

This guide is intended for use of Juno in a non-interactive environment, not in a browser.

:::

## Requirements

To use Juno in a NodeJS environment, a Fetch API is required for querying [satellites](../terminology.md#satellite).

The most convenient way to achieve this is by using the [node-fetch](https://github.com/node-fetch/node-fetch) library.

To install `node-fetch`, run:

```bash
npm i node-fetch
```

## Usage

In a NodeJS environment, initializing Juno in your app is not required, unlike using Juno in a web application.

The second step in the [Install the SDK and initialize Juno](../add-juno-to-an-app/install-the-sdk-and-initialize-juno.md) guide can be skipped.

Instead, any of Juno's functions can be called with an extra parameter that includes both the fetch library and the satellite ID.

For example, calling the `getDoc` function from the datastore:

```typescript
import { getDoc } from "@junobuild/core";
import fetch from "node-fetch";
import { AnonymousIdentity } from "@dfinity/agent";

await getDoc({
  collection: "demo",
  key: "id2",
  satellite: {
    identity: new AnonymousIdentity(),
    satelliteId: "t6rzw-2iaaa-aaaaa-aaama-cai",
    fetch,
  },
});
```

:::tip

Since [authentication](../build/authentication.md) is not required in this context, information about authentication must also be provided.
The DFINITY [agent-js](https://github.com/dfinity/agent-js/) library can be used to build an `identity`.

:::
