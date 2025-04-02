# Lifecycle

Understand the full journey of Serverless Functions in Juno, from setup and development to deployment and maintenance.

---

## Workflow

The following steps outline how to initialize, develop, test, and deploy serverless functions.

### Initial Setup

If you didn’t use a template or skipped the language selection during setup, you can run `juno dev eject` at the root of your project. This command configures your project with the appropriate setup based on your language of choice. For Rust, it includes a `Cargo.toml` and a `lib.rs` file. For TypeScript, it sets up an `index.ts` file.

### Developing Functions

Once your project is scaffolded, you can start writing your functions. Use the CLI to build them by running `juno dev build`.

### Local Development

For local development and testing, a sandbox environment is essential. With Docker and the CLI, you can establish this environment by running `juno dev start`.

Find more information about local development in the [documentation](../../guides/local-development.mdx).

:::info

The local sandbox environment supports hot reloading. This means that the container will automatically redeploy your local Satellite each time `juno dev build` is executed and a new version is produced.

:::

### Deployment

After finalizing and testing your Functions, the next step is to deploy your modified Satellite to production. The `juno dev build` command produces a compressed WASM file (`satellite.wasm.gz`) that includes both the optimized code and necessary metadata. This file is located at `./target/deploy/satellite.wasm.gz` relative to your project's root directory.

To deploy, use the following command from the same root directory:

```bash
juno upgrade -t s -s target/deploy/satellite.wasm.gz
```

This process updates your Satellite with your new custom Functions.

### Summary

| CLI Command                                              | Short description                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `juno dev eject`                                         | Initializes your project for writing serverless functions.                           |
| `juno dev start`                                         | Starts the local development environment using Docker.                               |
| `juno dev build`                                         | Compiles your custom Satellite's code. Changes are automatically redeployed locally. |
| `juno upgrade -t s -s ./target/deploy/satellite.wasm.gz` | Upgrades your Satellite in production.                                               |

---

## **Maintenance**

After deployment, keeping your Satellite functional and optimized requires ongoing monitoring and updates. Staying up to date is also a key factor, as we may introduce new features that need to be integrated into your Satellite to ensure full functionality within the Juno Console.

Since your project includes all Satellite features using `include_satellite!();`, it's essential to stay in sync with Juno’s updates to maintain compatibility.

:::caution

Always upgrade iteratively and avoid skipping version numbers. While we strive to minimize breaking changes, it's crucial to upgrade through each released version sequentially.

For example, if you're on **v0.0.23** and the latest release is **v0.0.26**, first upgrade to **v0.0.24**, then **v0.0.25**, and finally **v0.0.26**. Skipping versions could lead to unexpected issues.

:::

### Updating Your Satellite

To upgrade your Satellite, bump the dependencies in your `Cargo.toml` file located in `/src/satellite/`. The key dependencies to check and update are:

- `junobuild-satellite`
- `junobuild-storage`
- `junobuild-macros`
- `ic_cdk`
- `candid`

If other crates in your project depend on these, they should also be upgraded accordingly.

The recommended versions for each release can be found in the [changelog](/changelog) or [release notes on GitHub](https://github.com/junobuild/juno/releases).

If you need assistance, feel free to reach out through the available support channels.
