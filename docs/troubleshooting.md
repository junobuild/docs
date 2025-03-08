# Troubleshooting

---

### Windows Powershell

If you are using Windows Powershell and encounter the following error after installing the [CLI]:

> The term 'juno' is not recognized as a name of a cmdlet, function, script file, or executable program.

Please ensure that npm is added to your system's PATH (e.g. `C:\Users\{PC_NAME}\AppData\Roaming\npm`).

---

### Windows Not Defined

Juno does not support yet Server Side Rendering (see [Roadmap](./white-paper/roadmap.mdx)). Therefore if you are facing such an issue as `ReferenceError: window is not defined` please make sure that your application is not build using SSR.

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

When encountering the following error after running `juno deploy`, it is likely caused by either not starting the command from the root directory of your project or having an incorrect configuration for the [source](build/hosting/configuration.mdx#source) option, which Juno uses to locate the files for deployment.

> An unexpected error happened 😫. Error: ENOENT: no such file or directory, scandir ...

Make sure these two requirements are correctly met before restarting the command line.

---

### Canister exceeded its current Wasm memory limit

Every Satellite, and generally any module on Juno, starts with a default heap memory limit of 1 GB. While you can increase this limit in the settings, it's not recommended to go beyond it, as it may cause issues when upgrading your module.

The heap includes a bit of metadata, any collections you've created in Datastore and Storage (where using stable memory is advised), and the assets of your frontend application.

If you're deploying a really large application (>1 GB) or frequently pushing updates to an application that isn’t reproducible, your heap memory usage can grow unexpectedly and eventually hit the limit.

When that happens, your next deployment or update might fail to prevent exceeding the limit, which could lead to issues with your module.

```
Request ID: d7be9..bfcb8
  Reject code: 5
  Reject text: Error from Canister aaaaa-bbbbb-ccccc-ddddd-cai: Canister exceeded its current Wasm memory limit of 1073741824 bytes. The peak Wasm memory usage was 1073872896 bytes. If the canister reaches 4GiB, then it may stop functioning and may become unrecoverable. Please reach out to the canister owner to investigate the reason for the increased memory usage. It might be necessary to move data from the Wasm memory to the stable memory. If such high Wasm memory usage is expected and safe, then the developer can increase the Wasm memory limit in the canister settings..
Try checking the canister for a possible memory leak or modifying it to use more stable memory instead of Wasm memory. See documentation: https://internetcomputer.org/docs/current/references/execution-errors#wasm-memory-limit-exceeded
```

#### Preventing Heap Memory Issues

To avoid running into memory limits, it's important to monitor memory usage and follow two key best practices:

##### Use Stable Memory for Datastore and Storage

Stable memory is designed for long-term storage and helps prevent heap memory from growing uncontrollably. Whenever possible, store large datasets in stable memory instead of the heap.

##### Ensure Your Frontend Build is Reproducible

When building your frontend (e.g. with `npm run build`), the output should be identical to the previous build if no changes were made.

Why does this help? When you deploy your application, Juno does not clear existing files—it only adds new ones. To optimize this process, Juno compares the names and content (hash values) of all files with those already uploaded. If a file hasn't changed, it is skipped, reducing unnecessary memory usage and saving cycles.

If your build output isn’t reproducible, every deployment could introduce slightly different files, even if nothing has changed in your code. Over time, this would lead to unnecessary file accumulation, increasing heap memory usage and eventually causing issues.

##### Resolving Heap Memory Issues

There are different ways to resolve this issue, and the best approach depends on the features you're using. If you're using Datastore and Storage, we need to find a solution that prevents data loss. If you're only hosting a website, the steps to fix the issue will be much simpler.

In any case, the best course of action is to reach out so we can assess your situation and find a tailored solution together.

[CLI]: miscellaneous/cli.mdx
