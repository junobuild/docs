# CLI

The Juno CLI (GitHub: https://github.com/buildwithjuno) provides a variety of tools for managing and deploying [satellites](../terminology.md#satellite).

## Installation

1. Install Node.js (version LTS or above) from https://nodejs.org/en/download/. You can use nvm (https://github.com/nvm-sh/nvm) to manage multiple Node.js versions on a single machine.
   - When installing Node.js, it is recommended to check all related dependency checkboxes.
2. Install the Juno CLI globally or in your sandbox using npm:

```bash
npm i -g @junobuild/cli
```

## Login

The CLI requires authentication to make changes, such as deploying an application, upgrading a [satellite] or [mission control], etc.

The authentication process requires a browser:

1. Start the login process with the following command:

```bash
juno login
```

2. Sign in to the [console](../terminology.md#console) if not already logged in.

3. Select the [satellites] and/or [mission control] you would like to control from your local device.

4. Confirm

Your local machine should now be authorized to control the selected objects.

:::tip

- Controlling your [mission control] is useful for upgrading its code when new releases are published.

:::

:::note

A new [principal] is generated on your local machine and added as a [controller] of the selected [satellites] and/or [mission control]. This key is saved in the OS-specific user's variables path. Check which directory matches yours here: https://github.com/sindresorhus/env-paths#pathsconfig.

:::

## Logout

To remove the authorization of your local machine:

```bash
juno logout
```

:::note

This currently does not remove the [controllers] from [satellites] and/or [mission control]. It only logs out your local machine and removes the locally saved key (principal).

:::

## Init

Many common tasks performed using the CLI, such as deploying an app, require a **project directory**. A project directory is usually the same directory as your source control root.

To initialize your app, run the following command from within your project directory:

```bash
juno init
```

This command sets up a [satellite] for your app. During the initialization, you will be asked to complete the following tasks:

- Select the desired target [satellite].
- Provide the path to your bundled app files that need to be deployed.

The directory will contain a `juno.json` configuration file after the initialization.

:::note

The list of [satellites] presented by the CLI at this step are those selected during your environment [authenticated](cli.md#login).

:::

## juno.json

The `juno init` command creates a `juno.json` configuration file in the root of your project directory.

This file is necessary to deploy your app with the CLI as it specifies which files from your project directory will be deployed to which satellite.

The [satellite] ID and path can be configured or edited manually through juno init.

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

The configuration provides various **options**:

### Source

Where should Juno search for the files to deploy in your project directory.

This is commonly the output folder of `npm run build`, such as `/dist` or `/build`.

### Ignore files

The `ignore` attribute allows you to exclude certain files from being deployed to your [satellite].

This attribute works similarly to Git's `.gitignore`, and you can specify which files to ignore using globs.

Here is an example of how the ignore attribute can be utilized:

```json
{
  "satellite": {
    "satelliteId": "qsgjb-riaaa-aaaaa-aaaga-cai",
    "source": "dist",
    "ignore": ["**/*.txt", ".tmp/"]
  }
}
```

### HTTP Headers

Headers allow the client and the [satellite] to pass additional information along with a request or a response. Some sets of headers can affect how the browser handles the page and its content.

For instance, you may want to set a specific `Cache-Control` for performance reasons.

:::info

Please note that currently, the headers are only applied on the .raw. domain until the implementation of "Certification v2" is completed. You can track the progress of this implementation by following the feature request [#168](https://github.com/buildwithjuno/juno/issues/168).

:::

Here's an example of the `headers` object:

```json
{
  "satellite": {
    "satelliteId": "ddddd-ccccc-aaaaa-bbbbb-cai",
    "source": "dist",
    "storage": {
      "headers": [
        {
          "source": "/",
          "headers": [["Cache-Control", "public,max-age=0,must-revalidate"]]
        },
        {
          "source": "assets/fonts/*",
          "headers": [["Cache-Control", "max-age=31536000"]]
        },
        {
          "source": "**/*.jpg",
          "headers": [
            ["Cache-Control", "max-age=31536000"],
            ["Access-Control-Allow-Origin", "*"]
          ]
        }
      ]
    }
  }
}
```

This `source` attribute works similarly to Git's `.gitignore`, and you can specify which files match the headers using globs.

:::note

- The `Content-Type` header is calculated automatically and cannot be altered.
- No validation or check for uniqueness is performed. For example, if a header matches a file based on multiple rules, multiple headers will be set.
- Likewise, if you provide the same header when you [upload](https://juno.build/docs/build/storage#upload-asset) file to your "Storage" and within the configuration, both headers will be set in the response.

:::

### Rewrites

:::caution

The "Rewrites" option is currently not functioning as expected, and we are actively analyzing it for potential improvements.

:::

You can utilize optional rewrites to display the same content for multiple URLs. Rewrites are especially useful when combined with pattern matching, allowing acceptance of any URL that matches the pattern.

Here's the basic structure for a `rewrites` attribute. This example serves `hello-world.html` for requests to files or directories that don't exist.

```json
{
  "satellite": {
    "satelliteId": "ddddd-ccccc-aaaaa-bbbbb-cai",
    "source": "dist",
    "storage": {
      "rewrites": [
        {
          "source": "**",
          "destination": "/hello-world.html"
        }
      ]
    }
  }
}
```

This `source` attribute works similarly to Git's `.gitignore`, and you can specify which files match the headers using globs.

:::note

- Rewrites are only applied to requests that do not match any existing resources.
- By default, all unknown paths are automatically rewritten to `/index.html`. To disable this default behavior, you can set an empty configuration for the rewrite rule.

:::

## Deploy

To deploy an app to a [satellite] using Juno, run the following command from the project directory:

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

If the smart contracts' code of your [mission control] or [satellites] become outdated, you can upgrade them.

Running the following command from the project directory upgrade your [satellite] (default option):

```bash
juno upgrade
```

By adding a suffix, you can upgrade your [mission control]:

```bash
juno upgrade -m
```

:::caution

- We recommend that you stay current with the Juno releases, as some features may not perform correctly in the [console](../terminology.md#console) if your smart contracts are outdated.
- Upgrading is as complex as migrating storage and requires a stable internet connection for a successful process.

:::

[satellite]: ../terminology.md#satellite
[satellites]: ../terminology.md#satellite
[mission control]: ../terminology.md#mission-control
[principal]: ../terminology.md#principal
[controller]: ../terminology.md#controller
[controllers]: ../terminology.md#controller
