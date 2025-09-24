# Troubleshooting

---

### Windows Powershell

If you are using Windows Powershell and encounter the following error after installing the [CLI]:

> The term 'juno' is not recognized as a name of a cmdlet, function, script file, or executable program.

Please ensure that npm is added to your system's PATH (e.g. `C:\Users\{PC_NAME}\AppData\Roaming\npm`).

---

### Windows Not Defined

Juno does not support yet Server Side Rendering at the moment. Therefore, if you are facing such an issue as `ReferenceError: window is not defined` please make sure that your application is not build using SSR.

We generally recommend using Static Site Generation (SSG) / prerendering.

---

### ReferenceError: global is not defined

The Juno JavaScript libraries rely on the DFINITY [agent-js](https://github.com/dfinity/agent-js/) libraries to interact with the Internet Computer. These libraries require various Node.js polyfills for the browser, which unfortunately make the bundle heavier.

The templates provided by Juno - `npm create juno@latest` - are preconfigured to handle this limitation and issue. However, you might encounter errors if your app bundler is not properly configured. The most common error is global not being available on the client side:

```
ReferenceError: global is not defined
at new _Decoder (chunk-3K6K3FD6.js?v=df0b7a78:4968:30)
at new Uint8ArrayDecoder (chunk-3K6K3FD6.js?v=df0b7a78:7475:25)
at decode2 (chunk-3K6K3FD6.js?v=df0b7a78:7488:19)
at _HttpAgent.readState (chunk-3K6K3FD6.js?v=df0b7a78:14483:31)
at async chunk-3K6K3FD6.js?v=df0b7a78:15075:26
at async Promise.all (:5173/index 0)
at async Module.request (chunk-3K6K3FD6.js?v=df0b7a78:15169:3)
at async _HttpAgent.syncTime (chunk-3K6K3FD6.js?v=df0b7a78:14532:22)
at async Promise.all (:5173/index 0)
```

To resolve this issue, you can configure your bundler to polyfill the required libraries. Since the CLI provides support for most popular frameworks, you might find a proper configuration for your project by referring to the corresponding technology project in this repository: [https://github.com/junobuild/create-juno/tree/main/templates](https://github.com/junobuild/create-juno/tree/main/templates)

---

### ENOENT: no such file or directory

When encountering the following error after running `juno hosting deploy`, it is likely caused by either not starting the command from the root directory of your project or having an incorrect configuration for the [source](build/hosting/configuration.mdx#source) option, which Juno uses to locate the files for deployment.

> An unexpected error happened 😫. Error: ENOENT: no such file or directory, scandir ...

Make sure these two requirements are correctly met before restarting the command line.

---

### A Satellite ID is not configured. Juno cannot be initialized.

If you encounter the error:

> A Satellite ID is not configured. Juno cannot be initialized.

This means `initSatellite()` from the SDK is being called without a proper configuration. Most likely, the plugin responsible for loading your `juno.config` file values isn't set up correctly or is missing entirely.

To resolve this issue, make sure your SDK is correctly configured by following the steps in the documentation: [Setup SDK > Configuration](./setup-the-sdk.mdx#configuration)

---

### Invalid character: "&lt;"

When you scaffold an app with a template, the `juno.config` file includes placeholder values for the satellite IDs:

```typescript
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
      production: "<PROD_SATELLITE_ID>"
    },
    source: "dist"
  }
});
```

If you start your frontend development server without replacing these placeholders, you may encounter an error like: `Invalid character: "&lt;"` while running your app in the browser.

This happens because the app tries to parse the config at runtime and encounters the invalid placeholder character `<` in the ID values.

Continue with your setup or tutorial until you receive your actual satellite ID(s). Once you’ve updated the config with real values, make sure to restart your development server.

:::note

Note: `vite` may cache the configuration — if the error persists after updating the file, try restarting the dev server with the `--force` flag or make a small code change to trigger a rebuild.

:::

---

### My Heap Memory Keeps Growing — Is That Expected?

If your heap memory usage keeps increasing and doesn't go down, even after deleting data — [this is expected behavior](./miscellaneous/memory.md#behavior). See the documentation for why this happens and how to manage it effectively.

[CLI]: reference/cli.mdx
