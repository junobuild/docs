---
sidebar_position: 2
---

# Setup

If you intend to use Juno solely for [hosting](../build/hosting.md) purposes, you may skip the following steps, which are necessary only for implementing advanced features such as [authentication](../build/authentication.md), [datastore](../build/datastore.md) or [storage](../build/storage.md).

Conversely, if you plan to utilize these rich features, here is how you can connect Juno to your web app.

## Initialization

1. Install Juno SDK using npm:

```bash
npm i @junobuild/core
```

2. Initialize your satellite in your web app:

```typescript
import { initSatellite } from "@junobuild/core";

await initSatellite();
```

It is generally recommended to initialize the library at the top of your application.

If you are using the the [Next.js](../miscellaneous/plugins.md#nextjs-plugin) or [Vite](../miscellaneous/plugins.md#vite-plugin) plugins, you can start developing or continue with [deployment](./deploy.md).

---

## Configuration

No parameters are required to initialize a satellite if you are using plugins, which take care of the environment variables.

### Automated

The configuration of your project is set in a `juno.config` ile (TypeScript, JavaScript, or JSON) that exists at the root of your project. The the [Next.js](../miscellaneous/plugins.md#nextjs-plugin) or [Vite](../miscellaneous/plugins.md#vite-plugin) plugins read the file and automatically load the information required to initialize your dApp when you build and run it.

### Manually configure your application

If you are not using a plugin, you need to provide the `satelliteId` when initializing the satellite. Update the initialization as follows:

```typescript
import { initSatellite } from "@junobuild/core";

await initSatellite({
  satelliteId: "your-actual-satellite-id"
});
```

Replace the placeholder `satelliteId` with your actual satellite ID, which can be copied from the [console](https://console.juno.build) on the overview page.

[satellite]: ../terminology.md#satellite
