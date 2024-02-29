---
sidebar_position: 3
---

# Configuration

When running `juno` from the command line, it will automatically attempt to locate a config file named `juno.config.ts` or `juno.config.js` or `juno.config.json` within your project's root directory.

A basic config file looks like this:

```typescript
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    id: "aaaaa-bbbbb-ccccc-ddddd-cai",
    source: "build"
  }
});
```

---

## Config Intellisense

To enable intellisense in your IDE for TypeScript or JavaScript configurations, you will need to install the necessary types:

```bash
npm install @junobuild/config --save-dev
```

Afterwards, you can leverage your IDE's intellisense with jsdoc type hints:

```javascript title="juno.config.js"
/** @type {import('@junobuild/config').JunoConfig} */
export default {
  // ...
};
```

Alternatively, you can use the `defineConfig` helper which should provide intellisense without the need for jsdoc annotations:

```javascript title="juno.config.js"
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  // ...
});
```

---

## Conditional Config

If the config needs to conditionally determine options based the `mode` being used, it can export a function instead:

```javascript title="juno.config.js"
import { defineConfig } from "@junobuild/config";

export default defineConfig(({ mode }) => ({
  satellite: {
    id: "aaaaa-bbbbb-ccccc-ddddd-cai",
    source: "dist",
    ...(mode === "production" && { iframe: true })
  }
}));
```

---

## Modes

By default, the CLI runs command for the `production` mode.

This means when running a `juno` command in your terminal, it will pass the mode `production` to read your configuration.

You can overwrite the default mode used for a command by passing the `--mode` option flag. For example, if you want to deploy your app for a `staging` mode:

```bash
juno deploy --mode staging
```

---

## Environments - Multiple satellites

You may wish to deploy or operate a similar project across various environments. For instance, deploying the same application on multiple satellites can be accomplished by utilizing [modes](#modes).

To accommodate different satellite IDs, you can use a [conditional config](#conditional-config):

```javascript title="juno.config.js"
import { defineConfig } from "@junobuild/config";

export default defineConfig(({ mode }) => ({
  satellite: {
    id:
      mode === "staging"
        ? "11111-22222-33333-44444-cai"
        : "aaaaa-bbbbb-ccccc-ddddd-cai",
    source: "dist"
  }
}));
```

Or explicitly list the IDs:

```javascript title="juno.config.js"
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      staging: "11111-22222-33333-44444-cai",
      production: "aaaaa-bbbbb-ccccc-ddddd-cai"
    },
    source: "dist"
  }
});
```

The latter method is also compatible with JSON configuration:

```json title="juno.config.json"
{
  "satellite": {
    "ids": {
      "staging": "11111-22222-33333-44444-cai",
      "production": "aaaaa-bbbbb-ccccc-ddddd-cai"
    },
    "source": "dist"
  }
}
```

Note that defining an `id` or at least a `production` entry in `ids` is mandatory.
