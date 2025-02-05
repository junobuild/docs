# Collections

You can create or update a collection in the "Collections" tab in Juno's console under the [datastore](https://console.juno.build/datastore) view.

---

## Rules

A rule is assigned to a collection to define read and write permissions, which can be configured as `public`, `private`, `managed`, or `controllers`.

- `public`: everyone can read from (resp. write to) any document in the collection
- `private`: only the owner of a document can read from (resp. write to) a document in the collection
- `managed`: the owner of a document _and_ the [controllers] of the satellite can read from (resp. write to) a document in the collection
- `controllers`: only the controllers of the satellite can read from (resp. write to) any document in the collection

:::tip

- You can modify the rules at any time, and changes will take effect immediately.
- Any collection with read permissions set to `public`, `managed` or `controllers` can be viewed by the satellite's controllers in the console under the [datastore](https://console.juno.build/datastore) view.

:::

## Memory

When you create a collection, it's assigned to either heap or stable memory. This assignment is permanent and cannot be changed once the collection is created. The default allocation is `stable` memory.

[satellite]: ../../terminology.md#satellite
[controllers]: ../../terminology.md#controller
