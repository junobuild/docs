# Collections

You can create or update a collection in the "Collections" tab in Juno's console under the [storage](https://console.juno.build/storage) view.

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
| Max size               | No        | Sets an optional limit (in bytes) on the maximum size of individual assets that can be uploaded to a collection.                                                                                                                                       |
| Max updates per minute | No        | Limits the number of creation, update and delete operations per minute to prevent excessive updates.                                                                                                                                                   |
| Immutable permissions  | No        | If enabled, read and write permissions cannot be modified after creation.                                                                                                                                                                              |

---

## Permissions

Permissions define who can read and write assets in a collection. Writing includes creating (uploading), updating, and deleting assets.

:::caution

Assets are publicly accessible on the Internet regardless of the permission schema. The rules are only applied when reading or writing the data through the library.

:::

| Permission     | Description                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Public**     | Anyone can read or write assets in the collection.                                                                                                                                                                                         |
| **Private**    | Only the creator (owner) of the asset can read or write to it. However, note that since Satellite administrators manage the underlying infrastructure, they have the technical ability to modify access rules by changing its source code. |
| **Managed**    | The owner of an asset, the administrator and editor of the Satellite can read or write to it in the collection.                                                                                                                            |
| **Restricted** | Only Satellite administrator and editor can read or write any asset in the collection.                                                                                                                                                     |

If not set to immutable, you can modify the permissions at any time, and the changes will take effect immediately.

:::tip

Any collection with read permissions set to `public`, `managed` or `restricted` will allow the developer to view its content in the console under the [storage](https://console.juno.build/storage) view.

:::

[controllers]: ../../terminology.md#controller
