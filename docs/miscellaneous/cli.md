---
sidebar_position: 1
---

# CLI

The Juno CLI (GitHub: https://github.com/junobuild) provides a variety of tools for managing and deploying [satellite].

## Installation

1. Install Node.js (version LTS or above) from https://nodejs.org/en/download/. You can use nvm (https://github.com/nvm-sh/nvm) to manage multiple Node.js versions on a single machine.
   - When installing Node.js, it is recommended to check all related dependency checkboxes.
2. Install the Juno CLI globally or in your sandbox using npm:

```bash
npm i -g @junobuild/cli
```

## Login

The CLI requires authentication to make changes, such as deploying an application, upgrading a [satellite] or mission control, etc.

The authentication process requires a browser:

1. Start the login process with the following command:

```bash
juno login
```

2. Sign in to the [console](../terminology.md#console) if not already logged in.

3. Select the satellites and/or mission control you would like to control from your local device.

4. Confirm

The terminal on your local machine should now be authorized to control the selected objects.

:::note

If you've previously authenticated your terminal and decide to log in again, the CLI will prompt you about reusing your existing identity. This allows you to reuse your authorization, especially when creating new segments like satellites or orbiters.

:::

### How it works?

A new [principal] is generated on your local machine and added as a [controller] of the selected satellites and/or mission control. This principal is then used to authenticate any CLI calls made from your terminal to your satellites and mission controls.

The key is saved in the OS-specific user's variables path.

- macOS: `~/Library/Preferences/juno-nodejs`
- Windows: `%APPDATA%\juno-nodejs\Config` (for example, `C:\Users\USERNAME\AppData\Roaming\juno-nodejs\Config`)
- Linux: `~/.config/juno-nodejs` (or `$XDG_CONFIG_HOME/juno-nodejs`)

To get the paths for storing data the CLI is using the library [env-paths](https://github.com/sindresorhus/env-paths#pathsconfig).

## Logout

To remove the authorization of your local machine:

```bash
juno logout
```

:::note

This currently does not remove the controllers from satellites and/or mission control. It only logs out your local machine and removes the locally saved key (principal).

:::

## Init

The `juno init` command creates a `juno.json` configuration file in the root of your project directory.

This file is necessary to deploy your app with the CLI as it specifies which files from your project directory will be deployed to which satellite.

The satellite ID and path can be configured or edited manually through juno init.

:::note

Running `juno init` will overwrite the `juno.json` configuration file.

:::

The following is an example `juno.json`:

```json
{
  "satellite": {
    "satelliteId": "qsgjb-riaaa-aaaaa-aaaga-cai",
    "source": "dist"
  }
}
```

You can [configure your Hosting behavior](../build/hosting.md#configure-hosting-behavior) by specifying various options within that file.

## Deploy

To deploy an app to a satellite using Juno, run the following command from the project directory:

```bash
juno deploy
```

:::note

This command uploads each file separately and computes and uploads the corresponding hashes. Subsequent deploys will only upload files that have changed.

:::

## Config

To apply any changes to your [storage](../build/storage.md) configuration, run the following command from your project directory:

```bash
juno config
```

## Clear

To clear the on-chain assets of the app, run the following command:

```bash
juno clear
```

:::note

This command removes existing files from the satellite and only affects the app assets. The user's uploaded files will not be cleared as the app is deployed to a reserved collection, `#dapp`.

:::

:::tip

If you have compressed (gzip and brotli) your bundle and assets after deploying your app, it is also necessary to clear the assets. This is because a certification tree of all assets needs to be calculated.

:::

## Upgrade

If the smart contracts' code of your mission control or satellites become outdated, you can upgrade them.

Running the following command from the project directory upgrade your satellite (default option):

```bash
juno upgrade
```

By adding a suffix, you can upgrade your mission control:

```bash
juno upgrade -m
```

:::caution

- We recommend that you stay current with the Juno releases, as some features may not perform correctly in the [console](../terminology.md#console) if your smart contracts are outdated.
- Upgrading is as complex as migrating storage and requires a stable internet connection for a successful process.

:::

[satellite]: ../terminology.md#satellite
[mission control]: ../terminology.md#mission-control
[principal]: ../terminology.md#principal
[controller]: ../terminology.md#controller
