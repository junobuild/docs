# Collections

You can create or update a collection in the "Collections" tab in Juno's console under the [datastore](https://console.juno.build/datastore) view.

---

## Configuration

Each collection has a set of configurable options that define its behavior and limitations:

| Option                 | Mandatory | Description                                                                                                                                                                                                                                            |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Key                    | Yes       | A unique identifier for the collection. The key that you will use in your code to interact with a particular collection.                                                                                                                               |
| Read permission        | Yes       | Defines who can read documents in the collection. See [Permissions](#permissions) below.                                                                                                                                                               |
| Write permission       | Yes       | Defines who can create, update, or delete documents. See [Permissions](#permissions) below.                                                                                                                                                            |
| Memory                 | Yes       | Specifies whether the collection uses `heap` or `stable` memory. This setting is permanent and cannot be changed after creation. The default is `stable` memory. For more information, see the related [documentation](../../miscellaneous/memory.md). |
| Max changes per user   | No        | Limits the number of documents a single user can create, update, or delete in the collection. This helps maintain fair resource distribution across users.                                                                                             |
| Max capacity           | No        | The maximum number of documents that can be stored in the collection, applying to the entire collection regardless of individual users.                                                                                                                |
| Max updates per minute | No        | Limits the number of creation, update and delete operations per minute to prevent excessive updates.                                                                                                                                                   |
| Immutable permissions  | No        | If enabled, read and write permissions cannot be modified after creation.                                                                                                                                                                              |

---

## Permissions

Permissions define who can read and write documents in a collection. Writing includes creating, updating, and deleting documents.

| Permission Type | Description                                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public          | Anyone can read or write documents in the collection.                                                                                                                                                                                    |
| private         | Only the creator (owner) of a document can read or write to it. However, note that since satellite controllers manage the underlying infrastructure, they have the technical ability to modify access rules by changing its source code. |
| managed         | The owner of a document and the controllers of the satellite can read or write to it in the collection.                                                                                                                                  |
| controllers     | Only satellite controllers can read or write any document in the collection.                                                                                                                                                             |

If not set to immutable, you can modify the permissions at any time, and the changes will take effect immediately.

:::tip

Any collection with read permissions set to `public`, `managed` or `controllers` will allow the controllers to view its content in the console under the [datastore](https://console.juno.build/datastore) view.

:::

[satellite]: ../../terminology.md#satellite
[controllers]: ../../terminology.md#controller
