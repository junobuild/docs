---
sidebar_position: 2
---

# Setup

If you intend to use Juno solely for [hosting](../build/hosting.md) purposes, you may skip the following steps, which are necessary only for implementing advanced features such as [authentication](../build/authentication.md), [datastore](../build/datastore.md) or [storage](../build/storage.md).

Conversely, if you plan to utilize these rich features, here is how you can connect Juno to your web app.

1. Install Juno SDK using npm:

```bash
npm i @junobuild/core
```

2. Initialize your satellite in your web app:

```typescript
import { initJuno } from "@junobuild/core";

// TODO: Replace the placeholder satellite ID with your actual satellite ID.
await initJuno({
  satelliteId: "aaaaa-bbbbb-ccccc-ddddd-cai"
});
```

It is generally recommended to initialize the library at the top of your application.

3. Configure your application with your satellite ID:

- **Manually**: Simply replace the `satelliteId` with the unique ID of your satellite, which can be copied from the [console](https://console.juno.build) on the overview page.

- **Plugin**: Although manual configuration is sufficient, we recommend leveraging environment variables that are automatically injected through the use of plugins provided by Juno. If you are using [Next.js](../miscellaneous/plugins.md#nextjs-plugin) or [Vite](../miscellaneous/plugins.md#vite-plugin) check out the related documentation to set up such a versatile environment.

:::note

The starting templates incorporate the use of plugins. Run `npm create juno@latest` to start a new project.

:::

[satellite]: ../terminology.md#satellite
