# Lifecycle

Understand the full journey of Serverless Functions in Juno, from setup and development to deployment and maintenance.

---

## Initial Setup

If you didn’t use a template or skipped the language selection during setup, you can run `juno functions eject` at the root of your project. This command configures your project with the appropriate setup based on your language of choice. For Rust, it includes a `Cargo.toml` and a `lib.rs` file. For TypeScript, it sets up an `index.ts` file.

---

## Developing Functions

Once your project is scaffolded, you can start writing your functions. Use the CLI to build them with:

```bash
juno functions build
```

If you start the emulator (see chapter below) in watch mode, your functions will be rebuilt automatically on save, so you don’t need to run this command manually.

---

## Local Development

For local development and testing, a sandbox environment is essential. You can establish this environment by running the CLI command `juno emulator start`.

:::info

Find more information about local development in the [documentation](../../guides/local-development.mdx).

:::

The local sandbox environment supports hot reloading. This means that the container will automatically redeploy your local Satellite each time `juno functions build` is executed and a new version is produced.

If you start the emulator with the `--watch` flag, it will also rebuild your functions automatically when changes are detected.

---

## Deploying

Juno offers two main ways to deploy your serverless functions, depending on whether you're working locally or integrating with a CI pipeline like GitHub Actions.

---

### 1. Direct Deploy

If you're developing locally or in another environment where the **access key has admin privileges**, you can deploy the latest build directly:

```bash
juno functions upgrade
```

- ✅ Skips the CDN.
- ✅ Immediate deployment.
- 🔐 Requires access key with upgrade permission.
- 📦 Uses the default path: `./target/deploy/satellite.wasm.gz`.

Optional:

```bash
juno functions upgrade --src ./path/to/custom-build.wasm.gz
```

---

### 2. With CDN + Approval Workflow

If you're using CI (like GitHub Actions) or an environment where your **access key has write privileges**:

#### a) Publish to CDN

In your GitHub Action or script:

```bash
juno functions publish
```

With options:

```bash
juno functions publish --mode staging --src ./path/to/build.wasm.gz
```

- 📤 Uploads to the Satellite’s CDN release.
- 🔐 Requires access key with **editor** role.

#### b) Upgrade from CDN

From your local CLI or in the Console UI, you can then upgrade.

```bash
juno functions upgrade --cdn
```

- 🔎 Interactively selects the WASM version from the published CDN.
- 🧾 Only deploys with a key that has **upgrade** rights.
- 🕵️ If your key is **submit-only**, the change will wait for approval in the Console UI or CLI.

---

### 3. Optional Approval Flow

If you're using CI (like GitHub Actions) or an environment where your **access key has submit privileges** — meaning it cannot directly modify or write data — you can follow a workflow that requires manual approval before deployment.

```bash
juno functions publish --no-apply
```

Then the published release:

- Becomes a **pending change**.
- Must be **reviewed and applied** manually.

Apply the change either in the Console UI or directly using the CLI.

#### 📜 List submitted changes

```bash
juno changes list
```

#### ✅ Apply a specific change

```bash
juno changes apply --id <change_id>
```

Once applied, the Satellite can then be upgraded in the CLI or respectively in the Console UI using:

```bash
juno functions upgrade --cdn-path <published_version_path>
```

---

## Summary

A quick reference for the most common CLI commands and deployment workflows when working with serverless functions in Juno.

### 🛠️ Common CLI Commands

| Command(s)             | Scenario                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `juno functions eject` | Initializes your project for writing serverless functions.                           |
| `juno emulator start`       | Starts the emulator.                                                                 |
| `juno functions build` | Compiles your custom Satellite's code. Changes are automatically redeployed locally. |

### 🚀 Deployment Scenarios

| Command(s)                                                                                                 | Scenario                                       |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `juno functions upgrade`                                                                                   | Upgrades your serverless functions immediatly. |
| `juno functions upgrade --src ./path/to/custom-build.wasm.gz`                                              | Use a custom WASM path to upgrade.             |
| `juno functions publish` in CI → `juno functions upgrade --cdn` in CLI or Console UI                       | CI/CD with write access.                       |
| `juno functions publish --no-apply` in CI → `juno changes apply` → `juno functions upgrade --cdn-path ...` | CI/CD with submit-only access.                 |
| `juno functions publish --mode staging`                                                                    | CI/CD using staging environment.               |
