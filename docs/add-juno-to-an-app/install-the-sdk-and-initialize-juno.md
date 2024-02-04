---
sidebar_position: 2
---

# Install the SDK and initialize Juno

To connect Juno to your web app, you need to install the SDK and initialize your [satellite].

:::tip

If you plan to use Juno for [hosting](../build/hosting.md) purposes only, you can skip these steps, as they are only required for rich features like [authentication](../build/authentication.md), [datastore](../build/datastore.md) or [storage](../build/storage.md).

:::

1. Install Juno using npm:

```bash
npm i @junobuild/core
```

2. Initialize Juno in your web app:

```typescript
import { initJuno } from "@junobuild/core";

// TODO: Replace 'satelliteId' with your actual satellite ID
await initJuno({
  satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai"
});
```

Replace the satellite ID with the unique ID for your app, which can be found in the [console](https://console.juno.build).

[satellite]: ../terminology.md#satellite
