# Lifecycle

Understand the full journey of Serverless Functions in Juno, from setup and development to deployment and maintenance.

---

## Initial Setup

If you didn’t use a template or skipped the language selection during setup, you can run `juno dev eject` at the root of your project. This command configures your project with the appropriate setup based on your language of choice. For Rust, it includes a `Cargo.toml` and a `lib.rs` file. For TypeScript, it sets up an `index.ts` file.

---

## Developing Functions

Once your project is scaffolded, you can start writing your functions. Use the CLI to build them with:

```bash
juno dev build
```

If you start the emulator (see chapter below) in watch mode, your functions will be rebuilt automatically on save, so you don’t need to run this command manually.

---

## Local Development

For local development and testing, a sandbox environment is essential. With Docker and the CLI, you can establish this environment by running `juno dev start`.

:::info

Find more information about local development in the [documentation](../../guides/local-development.mdx).

:::

The local sandbox environment supports hot reloading. This means that the container will automatically redeploy your local Satellite each time `juno dev build` is executed and a new version is produced.

If you start the emulator with the `--watch` flag, it will also rebuild your functions automatically when changes are detected.

---

## Deployment

After finalizing and testing your Functions, the next step is to deploy your modified Satellite to production. The `juno dev build` command produces a compressed WASM file (`satellite.wasm.gz`) that includes both the optimized code and necessary metadata. This file is located at `./target/deploy/satellite.wasm.gz` relative to your project's root directory.

To deploy, use the following command from the same root directory:

```bash
juno upgrade -t s -s target/deploy/satellite.wasm.gz
```

This process updates your Satellite with your new custom Functions.

---

## Summary

| CLI Command                                              | Short description                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `juno dev eject`                                         | Initializes your project for writing serverless functions.                           |
| `juno dev start`                                         | Starts the local development environment using Docker.                               |
| `juno dev build`                                         | Compiles your custom Satellite's code. Changes are automatically redeployed locally. |
| `juno upgrade -t s -s ./target/deploy/satellite.wasm.gz` | Upgrades your Satellite in production.                                               |
