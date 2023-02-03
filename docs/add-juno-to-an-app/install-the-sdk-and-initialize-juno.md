---
sidebar_position: 2
---

# Install the SDK and initialize Juno

To connect Juno to your web app, you need to install the SDK and initialize your [satellite].

:::tip

If you plan to use Juno for [hosting](../build/hosting.md) purposes only, you can skip these steps, as they are required for rich features such as the [datastore](../build/datastore.md) or [storage](../build/storage.md).

:::

1. Install Juno using npm:

```bash
npm i @junobuild/core
```

2. Initialize Juno in your web app:

```typescript
import { initDapp } from "@junobuild/core";

// TODO: Replace the following satelliteId with your app's effective satellite ID.
await initDapp({
  satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai",
});
```

Replace the satellite ID with the unique ID for your app, which can be found in the Juno [console](../terminology.md#console)'s [overview](https://console.juno.build/overview).

[satellite]: ../terminology.md#satellite
