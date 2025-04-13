# Skylab

The [junobuild/skylab](https://hub.docker.com/r/junobuild/skylab) Docker image is an all-in-one emulator for local development. It bundles everything you need to build, test, and explore the Juno ecosystem:

- ✅ Juno Console (smart contract + UI)
- 🛰️ Satellites (support for multiple application containers)
- 📊 Orbiter (analytics and tracking module)
- ⚙️ Supporting infrastructure (see table below)

This container mounts an [Internet Computer](https://internetcomputer.org/) Replica and `icx-proxy` within a sandbox. Once ready, a custom-built CLI takes care of deploying and setting up the modules during the first boot.

It also actively watches a shared folder, allowing you to live reload serverless functions written in Rust or TypeScript.

This container replicates the production experience locally. That's why, when building your project with it, you'll need to create your Satellites for testing through the Console UI, just as you would in production.

---

## Configuration

Skylab requires minimal configuration. Since the Console UI is used to create your Satellite, the only step is to reference the correct Satellite ID in your project’s config file.

You can specify this ID under the `development` key in your Juno Config file:

```ts title="juno.config.ts"
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
      production: "<PROD_SATELLITE_ID>"
    },
    source: "dist",
    predeploy: ["npm run build"]
  }
});
```
