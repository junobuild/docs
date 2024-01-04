---
sidebar_position: 3
---

# Plugins

Juno provides various plugins to simplify your development workflow. We also warmly welcome community contributions. If you would like to create or submit plugins or any libraries, please reach out!

## Vite Plugin

If you are developing your app using Vite, this plugin automatically loads the Satellite ID from your project's `juno.json`. If you are using analytics, it also loads the Orbiter ID too.

These values allow you to instantiate Juno in your code without the need to manually define environment variables.

```javascript
await Promise.all([
  initJuno({
    satelliteId: import.meta.env.VITE_SATELLITE_ID,
  }),
  initOrbiter({
    satelliteId: import.meta.env.VITE_SATELLITE_ID,
    orbiterId: import.meta.env.VITE_ORBITER_ID,
  }),
]);
```

### Installation

```bash
npm i @junobuild/vite-plugin -D
```

### Usage

```javascript
// vite.config.js
import juno from "@junobuild/vite-plugin";

export default defineConfig({
  plugins: [juno()],
});
```

### More information

The plugin can be found in this [repository](https://github.com/junobuild/plugins).
