---
description: Learn how to develop and deploy Serverless Functions with Juno using Rust or TypeScript, enabling event-driven execution without blockchain constraints.
keywords:
  [
    serverless functions,
    event-driven execution,
    Juno Functions,
    blockchainless,
    smart functions
  ]
---

# Functions

Functions are a set of features enabling developers to extend the native capabilities of [Satellites](../../terminology.md#satellite) using Rust or TypeScript. They let you define serverless behaviors directly within your containerized smart contract.

Triggered by events like document and asset operations, they allow you to automatically run backend code or assertions. These functions are shipped with your container and don’t require you to manage or scale your own servers.

---

## How does it work?

Functions are defined using hooks that automatically respond to document and asset events such as create, update, or delete. This allows you to embed dynamic behavior directly into your container.

A naive schema representation of a hook that is triggered when a document is set:

![Functions hooks flow](../../img/functions.png)

### Asynchronous Hook Spawning

When a Function is triggered, it spawns hooks asynchronously, operating independently of the caller's action. This means that the execution of the hooks is initiated without waiting for a synchronous response, ensuring that the flow of update calls to the Satellite remains unhindered. Consequently, callers may receive feedback on their actions before the corresponding hooks have commenced their execution.

### Error-Resilient Execution

Hooks are initiated only when there are no errors in the preceding operations. This ensures a robust and dependable execution flow, promoting reliability and consistency in the functioning of Functions.

### Optional

Custom hooks are not active by default. You need to opt in to enable event-driven execution of your own logic.

---

## Available Hooks

| Hook                        | Provider  | Description                                                     |
| --------------------------- | --------- | --------------------------------------------------------------- |
| `on_set_doc`                | Datastore | Triggered when a document is created or updated.                |
| `on_set_many_docs`          | Datastore | Activated for operations involving multiple documents.          |
| `on_delete_doc`             | Datastore | Invoked when a document is deleted.                             |
| `on_delete_many_docs`       | Datastore | Used when multiple documents are deleted.                       |
| `on_delete_filtered_docs`   | Datastore | Invoked when documents are deleted according filters.           |
| `on_upload_asset`           | Storage   | Triggered during asset upload.                                  |
| `on_delete_asset`           | Storage   | Activated when an asset is deleted.                             |
| `on_delete_many_assets`     | Storage   | Used for deleting multiple assets.                              |
| `on_delete_filtered_assets` | Storage   | Invoked when assets are deleted based on filters.               |
| `on_init`                   | Satellite | Called during the initialization of the satellite.              |
| `on_post_upgrade`           | Satellite | Invoked after the satellite has been upgraded to a new version. |

---

## Assertions

In addition to hooks, developers have the option to expand the native rule set of their Satellites by creating custom assertions. These assertions can be implemented similarly to hooks, with the key difference being that they are synchronous and must return a result indicating the outcome of the assertion.

| Assertion             | Provider  | Description                                   |
| --------------------- | --------- | --------------------------------------------- |
| `assert_set_doc`      | Datastore | Ensures a document can be created or updated. |
| `assert_delete_doc`   | Datastore | Verifies that a document can be deleted.      |
| `assert_upload_asset` | Storage   | Confirms an asset upload can be committed.    |
| `assert_delete_asset` | Storage   | Checks that an asset can be deleted.          |
