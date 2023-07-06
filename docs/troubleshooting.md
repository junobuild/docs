---
sidebar_position: 10
---

# Troubleshooting

### Windows Powershell

If you are using Windows Powershell and encounter the following error after installing the [CLI]:

> The term 'juno' is not recognized as a name of a cmdlet, function, script file, or executable program.

Please ensure that npm is added to your system's PATH (e.g. `C:\Users\{PC_NAME}\AppData\Roaming\npm`).

### Windows Not Defined

Juno does not support yet Server Side Rendering (see [Roadmap](./roadmap.md)). Therefore if you are facing such an issue as `ReferenceError: window is not defined` please make sure that your application is not build using SSR.

We generally recommend using Static Site Generation (SSG) / prerendering.

[CLI]: miscellaneous/cli.md
