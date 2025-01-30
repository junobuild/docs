# Development

When you're ready to implement Functions within your Juno Satellite, you'll have a variety of event-driven macros at your disposal, enabling custom logic execution in response to specific actions. Here's how to implement each available Function:

:::note

Running `juno dev eject` not only prepares your environment for the serverless development but also scaffolds a default `lib.rs` module. This module is pre-configured with the necessary structure and examples to get started with all the Functions features listed below.

:::

---

## Hooks

Hooks allow you to define event-driven logic that responds to specific actions within your Satellite. The following is a list of available hooks and their respective use cases.

### on_set_doc

Triggered when a document is created or updated in the datastore.

```rust
#[on_set_doc]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // Custom logic for handling document creation or updates
    Ok(())
}
```

When no attributes are provided, the hook is triggered for any document set within any collection.
You can scope the events to a particular list of collections.

```rust
#[on_set_doc(collections = ["demo"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // Custom logic for handling document creation or updates
    Ok(())
}
```

The attributes accept a list of comma-separated collections. If the attribute array is left empty, the hook will never be called.

### on_set_many_docs

Activated for batch operations involving multiple document creations or updates.

```rust
#[on_set_many_docs]
async fn on_set_many_docs(context: OnSetManyDocsContext) -> Result<(), String> {
    // Custom logic for handling multiple document creations or updates
    Ok(())
}
```

Similarly to [on_set_doc](#on_set_doc), the hook can scope the events to a particular list of collections or be left empty if it should never fire.

### on_delete_doc

Invoked when a document is deleted from the datastore.

```rust
#[on_delete_doc]
async fn on_delete_doc(context: OnDeleteDocContext) -> Result<(), String> {
    // Custom logic for handling document deletion
    Ok(())
}
```

Similarly to [on_set_doc](#on_set_doc), the hook can scope the events to a particular list of collections or be left empty if it should never fire.

### on_delete_many_docs

Used when multiple documents are deleted in a batch operation.

```rust
#[on_delete_many_docs]
async fn on_delete_many_docs(context: OnDeleteManyDocsContext) -> Result<(), String> {
    // Custom logic for handling the deletion of multiple documents
    Ok(())
}
```

Similarly to [on_set_doc](#on_set_doc), the hook can scope the events to a particular list of collections or be left empty if it should never fire.

### on_delete_filtered_docs

Invoked when documents are deleted according to specified filters in the datastore.

```rust
#[on_delete_filtered_docs]
async fn on_delete_filtered_docs(context: OnDeleteFilteredDocsContext) -> Result<(), String> {
    // Custom logic for handling the deletion of filtered documents
    Ok(())
}
```

Similarly to [on_set_doc](#on_set_doc), the hook can scope the events to a particular list of collections or be left empty if it should never fire.

### on_upload_asset

Triggered during the process of uploading an asset.

```rust
#[on_upload_asset]
async fn on_upload_asset(context: OnUploadAssetContext) -> Result<(), String> {
    // Custom logic for handling asset uploads
    Ok(())
}
```

Similarly to [on_set_doc](#on_set_doc), the hook can scope the events to a particular list of collections or be left empty if it should never fire.

### on_delete_asset

Activated when an asset is removed from the datastore.

```rust
#[on_delete_asset]
async fn on_delete_asset(context: OnDeleteAssetContext) -> Result<(), String> {
    // Custom logic for handling asset deletion
    Ok(())
}
```

Similarly to [on_set_doc](#on_set_doc), the hook can scope the events to a particular list of collections or be left empty if it should never fire.

### on_delete_many_assets

Used for operations that involve deleting multiple assets in a batch.

```rust
#[on_delete_many_assets]
async fn on_delete_many_assets(context: OnDeleteManyAssetsContext) -> Result<(), String> {
    // Custom logic for handling the deletion of multiple assets
    Ok(())
}
```

Similarly to [on_set_doc](#on_set_doc), the hook can scope the events to a particular list of collections or be left empty if it should never fire.

### on_delete_filtered_assets

Invoked when assets are deleted according to specified filters in the storage.

```rust
#[on_delete_filtered_assets]
async fn on_delete_filtered_assets(context: OnDeleteFilteredAssetsContext) -> Result<(), String> {
    // Custom logic for handling the deletion of filtered assets
    Ok(())
}
```

Similarly to [on_set_doc](#on_set_doc), the hook can scope the events to a particular list of collections or be left empty if it should never fire.

### on_init

Called during the initialization of the satellite. This hook is invoked when the satellite is first deployed and can be used to set up initial configurations or resources.

```rust
#[on_init]
fn on_init() -> Result<(), String> {
    // Custom logic for initialization
    Ok(())
}
```

Unlike datastore or storage hooks, `on_init` cannot be scoped to specific collections or assets, as it is meant to handle global initialization logic.

This feature is not enabled by default. To use it, you’ll need to opt in by updating your `Cargo.toml` file.

```toml
[dependencies]
junobuild-satellite = { version = "*", features = ["default", "on_init"] }
```

### on_post_upgrade

Invoked after the satellite has been upgraded to a new version. This hook is typically used to manage migration tasks, or starting custom processes like timers.

```rust
#[on_post_upgrade]
fn on_post_upgrade() -> Result<(), String> {
    // Custom logic for post-upgrade tasks
    Ok(())
}
```

Similar to `on_init`, the `on_post_upgrade` hook cannot be scoped to collections or assets. It operates globally to handle upgrade-related operations.

This feature is not enabled by default. To use it, you’ll need to opt in by updating your `Cargo.toml` file.

```toml
[dependencies]
junobuild-satellite = { version = "*", features = ["default", "on_post_upgrade"] }
```

---

## Assertions

Assertions enable validation checks before specific actions are executed within your Satellite. The following is a list of available assertions and their functionalities.

### assert_set_doc

Ensures a document can be created or updated.

```rust
#[assert_set_doc]
fn assert_set_doc(_context: AssertSetDocContext) -> Result<(), String> {
    // Custom logic for asserting a document's creation or update is possible
    Ok(())
}
```

### assert_delete_doc

Verifies that a document can be deleted.

```rust
#[assert_delete_doc]
fn assert_delete_doc(context: AssertDeleteDocContext) -> Result<(), String> {
    // Custom logic for asserting a document can be deleted
    Ok(())
}
```

### assert_upload_asset

Confirms an asset upload can be committed.

```rust
#[assert_upload_asset]
fn assert_upload_asset(_context: AssertUploadAssetContext) -> Result<(), String> {
    // Custom logic for asserting an asset upload is possible
    Ok(())
}
```

### assert_delete_asset

Checks that an asset can be deleted.

```rust
#[assert_delete_asset]
fn assert_delete_asset(_context: AssertDeleteAssetContext) -> Result<(), String> {
    // Custom logic for asserting an asset can be deleted
    Ok(())
}
```

---

## Including the Satellite

After defining your Functions, at the very end of your `lib.rs` module, include the Satellite to ensure that your custom logic and the default features or Juno are properly registered and executable within the Juno ecosystem.

:::important

This is crucial for compatibility with the Juno Console and CLI, as it expects the Satellite to expose the necessary functionality for monitoring, deployment, and interaction. Without this macro, certain features in the Console may not function correctly.

:::

```rust
include_satellite!();
```

---

## Feature Selection

When you run `juno dev eject`, all the available hooks and assertions are scaffolded in your `lib.rs` module. However, if you don’t have to implement all of them for example to improve readability or reduce unnecessary logic, you can selectively enable only the features you need.

To do this, disable the default features in your `Cargo.toml` and explicitly specify only the ones you want to use.

For example, if you only need `on_set_doc` and `assert_set_doc`, configure your `Cargo.toml` like this:

```toml
[dependencies]
junobuild-satellite = { version = "0.0.21", default-features = false, features = ["on_set_doc", "assert_set_doc"] }
```

With this setup, only `on_set_doc` and `assert_set_doc` must be implemented with custom logic, while other hooks and assertions will not be included in your Satellite.

---

## Additional Notes

WebAssembly (Wasm) binaries serve as the compilation target for the Satellites. While Juno's CLI automatically specifies this target for you, manual execution of certain `cargo` commands necessitates explicitly providing this target.

For instance:

```bash
cargo clippy --target=wasm32-unknown-unknown
```
