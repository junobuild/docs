---
sidebar_position: 11
---

# Troubleshooting

### Windows Powershell

If you are using Windows Powershell and encounter the following error after installing the [CLI]:

> The term 'juno' is not recognized as a name of a cmdlet, function, script file, or executable program.

Please ensure that npm is added to your system's PATH (e.g. `C:\Users\{PC_NAME}\AppData\Roaming\npm`).

### Windows Not Defined

Juno does not support yet Server Side Rendering (see [Roadmap](./white-paper/roadmap.mdx)). Therefore if you are facing such an issue as `ReferenceError: window is not defined` please make sure that your application is not build using SSR.

We generally recommend using Static Site Generation (SSG) / prerendering.

### ENOENT: no such file or directory

When encountering the following error after running `juno deploy`, it is likely caused by either not starting the command from the root directory of your project or having an incorrect configuration for the [source](./build/hosting.md#source) option, which Juno uses to locate the files for deployment.

> An unexpected error happened 😫. Error: ENOENT: no such file or directory, scandir ...

Make sure these two requirements are correctly met before restarting the command line.

[CLI]: miscellaneous/cli.md
