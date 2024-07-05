---
sidebar_position: 3
---

# Storage

Juno Storage is designed for app developers who need to store and serve user-generated content, such as photos or videos.

It offers a powerful and cost-effective object storage solution on the blockchain.

:::note

To use Juno Storage's features, you must [install](../add-juno-to-an-app/setup) and initialize the Juno SDK in your app.

:::

---

## How does it work?

Each [satellite] you create includes a "Storage" provider, which can store assets (images, documents, videos, etc.) that are automatically made available on the internet.

Assets are stored in "collections" and you can have as many collections as you wish.

Each asset within a collection is identified by a `path` -- e.g. `/images/a-user-image.jpg` -- unique within all collections. Assets hold the data you want to persist on chain, along with metadata (the "owner" or creator of the asset).

:::caution

Unless you use the optional [`token` parameter](#protected-asset) to persist an asset in your satellite and make its URL difficult to guess, any asset stored in Juno Storage will be publicly available on the internet.

:::

---

## Limitation

Each satellite has specific memory limits. For detailed information, please refer to the related [documentation](../miscellaneous/memory.md) page.

There is no specific limit on the size of assets (files) that can be uploaded to Juno, unless you choose to set an optional [rule](#rules) to restrict it.

---

## Collections

You can create or update a collection in the "Collections" tab in Juno's console under the [storage](https://console.juno.build/storage) view.

### Rules

A rule is assigned to a collection to define read and write permissions, which can be configured as `public`, `private`, `managed`, or `controllers`.

:::caution

Assets are publicly accessible on the Internet regardless of the permission schema. The rules are only applied when reading or writing the data through the library.

:::

- `public`: everyone can read from (resp. write to) any asset in the collection
- `private`: only the owner of a asset and can read from (resp. write to) a document in the collection
- `managed`: the owner of an asset _and_ the [controllers] of the satellite can read from (resp. write to) an asset in the collection
- `controllers`: only the controllers of the satellite can read from (resp. write to) any asset in the collection

:::tip

- Rules can be modified at any time and changes will be applied immediately
- Any collection with read permission set as `public`, `managed` or `controllers` can be viewed in the console's [storage](https://console.juno.build/storage) view.

:::

### Memory

When you create a collection, it's assigned to either heap or stable memory. This assignment is permanent and cannot be changed once the collection is created. The default allocation is `stable` memory.

### Max size

You can also set an optional parameter that limits the size, in bytes, of assets that can be uploaded to a collection.

---

## Upload asset

To upload an asset, use the following code:

```typescript
import { uploadFile } from "@junobuild/core";

const result = await uploadFile({
  data,
  collection: "images"
});
```

The `data` parameter is the file you want to upload. This is typically selected using an HTML `<input type="file" /> ` element.

The `uploadFile` function provides various options, including:

- `filename`: By default, Juno uses the file's filename. You can overwrite this and provide a custom filename. Example: `myimage.jpg`.
- `fullPath`: Juno will automatically compute the `fullPath`, which is the **unique** path that is used to make the asset available on the internet. The `fullPath` is the filename prefixed with `/` plus the related collection key. Example: `/images/myimage.jpg`.
- `headers`: The headers can affect how the browser handles the asset. If no headers are provided Juno will infer the `Content-Type` from the file type.
- `encoding`: The type of encoding for the file. For example, `identity` (raw) or `gzip`.

:::note

- Uploading a file with the same name as an existing file will overwrite the previous file (assuming the uploader has write access to the previous file).

- URL encoding is currently not supported on the Internet Computer. Therefore, it's important to keep in mind that your `filename` should not be encoded. That is why the library decodes the `filename` automatically.

:::

### Protected asset

While all assets can be found on the internet, it is possible to make their URL difficult to guess so that they remain undiscoverable (**as long as they are not shared**) and considered "private".

Juno achieves this by using an optional `token` query parameter.

```typescript
import { uploadFile } from "@junobuild/core";
import { nanoid } from "nanoid";

const result = await uploadFile({
  data,
  collection: "images",
  token: nanoid()
});
```

Imagine a file "mydata.jpg" uploaded with a token. Attempting to access it through the URL "https://yoursatellite/mydata.jpg" will not work. The asset can only be retrieved if a token is provided: "https://yoursatellite/mydata.jpg?token=a-super-long-secret-id".

---

## List assets

The "Storage" provider offers a way to list assets.
The `listAssets` function -- in addition to specifying the collection to query -- accepts various optional parameters:

- `matcher`: a regex to apply to the assets' `fullPath` and `description`
- `paginate`: an object used to query a subset of the assets
- `order`: requests entries sorted in ascending or descending order

:::note
Example of usage of the parameters:

```typescript
import { listAssets } from "@junobuild/core";

const myList = await listAssets({
  collection: "images",
  // Optional parameters
  matcher: {
    fullPath: /.*\.png$/, // match assets with .png extension
    description: /holiday/ // match description containing 'holiday'
  },
  paginate: {
    page: 0, // Start from the first page
    limit: 10 // Limit the results to 10 assets per page
  },
  order: "asc" // Order the results in ascending order
});
```

:::

The function returns the assets and various information, in the form of an object whose interface is given below.

```typescript
{
  items: []; // The data - array of assets
  items_length: bigint; // The number of assets - basically items.length
  items_page?: bigint; // If the query is paginated, at what page (starting from 0) do the items find the place
  matches_length: bigint; // The total number of matching results
  matches_pages?: bigint; // If the query is paginated, the total number (starting from 0) of pages
}
```

---

## Delete asset

To delete an asset, you only need to provide its `fullPath`. Unlike the [datastore](datastore.md), there is no timestamp validation performed when deleting an asset.

```typescript
import { deleteAsset } from "@junobuild/core";

await deleteAsset({
  collection: "images",
  storageFile: myAsset
});
```

---

## Delete multiple assets

To delete multiple assets in an atomic manner, you can use the function `deleteManyAssets`:

```typescript
import { deleteManyAssets } from "@junobuild/core";

const myAsset1 = {
  collection: "hello",
  fullPath: "/hello/world.jpg"
};

const myAsset2 = {
  collection: "data",
  fullPath: "/data/something.json"
};

await deleteManyAssets({ assets: [myAsset1, myAsset2] });
```

[satellite]: ../terminology.md#satellite
[controllers]: ../terminology.md#controller
