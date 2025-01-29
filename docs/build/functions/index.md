---
sidebar_position: 5
---

# Functions

Functions are a set of Rust-based features enabling developers to extend the native capabilities of Satellites. Functions facilitate the creation and management of serverless behaviors within smart contracts, or [Satellites](../../terminology.md#satellite). Triggered by specific events like document and asset operations, they allow developers to embed custom logic directly into the blockchain environment.

---

## How does it work?

Functions in Juno are defined using hooks that automatically handle event triggers related to documents and assets. These hooks include creating, updating, and deleting operations, allowing for a wide range of features within your Satellite.

A naive schema representation of a hook that is triggered when a document is set:

![Functions hooks flow](../../img/functions.png)

### Asynchronous Hook Spawning

When a Function is triggered, it spawns hooks asynchronously, operating independently of the caller's action. This means that the execution of the hooks is initiated without waiting for a synchronous response, ensuring that the flow of update calls to the Satellite remains unhindered. Consequently, callers may receive feedback on their actions before the corresponding hooks have commenced their execution.

### Error-Resilient Execution

Hooks are initiated only when there are no errors in the preceding operations. This ensures a robust and dependable execution flow, promoting reliability and consistency in the functioning of Functions.

### Optional

In the stock Satellite, custom hooks are not active by default. Developers should opt-in to activate these hooks to enable event-driven execution of custom logic if they wish to.

---

## Available Hooks

| Hook                         | Provider  | Description                                                     |
| ---------------------------- | --------- | --------------------------------------------------------------- |
| `on_set_doc`                 | Datastore | Triggered when a document is created or updated.                |
| `on_set_many_docs`           | Datastore | Activated for operations involving multiple documents.          |
| `on_delete_doc`              | Datastore | Invoked when a document is deleted.                             |
| `on_delete_many_docs`        | Datastore | Used when multiple documents are deleted.                       |
| `on_delete_filtered_docs`    | Datastore | Invoked when documents are deleted according filters.           |
| `on_upload_asset`            | Storage   | Triggered during asset upload.                                  |
| `on_delete_asset`            | Storage   | Activated when an asset is deleted.                             |
| `on_delete_many_assets`      | Storage   | Used for deleting multiple assets.                              |
| `on_delete_filtered_asserts` | Storage   | Invoked when assets are deleted according filters.              |
| `on_init`                    | Satellite | Called during the initialization of the satellite.              |
| `on_post_upgrade`            | Satellite | Invoked after the satellite has been upgraded to a new version. |

---

## Assertions

In addition to hooks, developers have the option to expand the native rule set of their Satellites by creating custom assertions. These assertions can be implemented similarly to hooks, with the key difference being that they are synchronous and must return a result indicating the outcome of the assertion.

| Assertion             | Provider  | Description                                   |
| --------------------- | --------- | --------------------------------------------- |
| `assert_set_doc`      | Datastore | Ensures a document can be created or updated. |
| `assert_delete_doc`   | Datastore | Verifies that a document can be deleted.      |
| `assert_upload_asset` | Storage   | Confirms an asset upload can be committed.    |
| `assert_delete_asset` | Storage   | Checks that an asset can be deleted.          |
