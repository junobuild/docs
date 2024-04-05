---
sidebar_position: 4
---

# Plugins

Juno provides various plugins to simplify your development workflow. We also warmly welcome community contributions. If you would like to create or submit plugins or any libraries, please reach out or explore our [repository](https://github.com/junobuild/plugins)!

---

## Next.js Plugin

If you are developing your app using Next.js, this plugin automatically loads Satellite and Orbiter IDs from your project's configuration file.

These values allow you to instantiate Juno in your code without the need to manually define environment variables.

```javascript
await Promise.all([
  initJuno({
    satelliteId: import.meta.env.NEXT_PUBLIC_SATELLITE_ID
  }),
  initOrbiter({
    satelliteId: import.meta.env.NEXT_PUBLIC_SATELLITE_ID,
    orbiterId: import.meta.env.NEXT_PUBLIC_ORBITER_ID
  })
]);
```

### Installation

```bash
npm i @junobuild/nextjs-plugin -D
```

### Usage

```javascript title="next.config.mjs"
import { withJuno } from "@junobuild/nextjs-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export"
};

export default withJuno({ nextConfig });
```

### Local development

When developing locally, use the `container` option to inform the plugin that it should accommodate local environment variables.

```javascript title="next.config.mjs"
import { withJuno } from "@junobuild/nextjs-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export"
};

export default withJuno({ nextConfig, juno: { container: true } });
```

### More information

Discover additional information in the library's [README](https://github.com/junobuild/plugins/tree/main/plugins/nextjs-plugin).

---

## Vite Plugin

If you are developing your app using Vite, this plugin automatically loads the Satellite ID from your project's configuration file. If you are using analytics, it also loads the Orbiter ID too.

These values allow you to instantiate Juno in your code without the need to manually define environment variables.

```javascript
await Promise.all([
  initJuno({
    satelliteId: import.meta.env.VITE_SATELLITE_ID
  }),
  initOrbiter({
    satelliteId: import.meta.env.VITE_SATELLITE_ID,
    orbiterId: import.meta.env.VITE_ORBITER_ID
  })
]);
```

### Installation

```bash
npm i @junobuild/vite-plugin -D
```

### Usage

```javascript title="vite.config.js"
import juno from "@junobuild/vite-plugin";

export default defineConfig({
  plugins: [juno()]
});
```

### Local development

When developing locally, use the `container` option to inform the plugin that it should accommodate local environment variables.

```javascript title="vite.config.js"
import juno from "@junobuild/vite-plugin";

export default defineConfig({
  plugins: [
    juno({
      container: true
    })
  ]
});
```

### More information

Discover additional options in the library's [README](https://github.com/junobuild/plugins/tree/main/plugins/vite-plugin).
