---
description: Juno Storage offers a powerful and cost-effective object storage solution on the blockchain for app developers. Learn how to store and serve user-generated content securely.
---

# Storage

Juno Storage is designed for app developers who need to store and serve user-generated content, such as photos or files.

It offers a powerful and cost-effective object storage solution on the blockchain.

![A screenshot of the Storage in Juno's Console](../img/satellite/storage.webp)

:::note

To use Juno Storage's features, you must [install](../setup-the-sdk.mdx) and initialize the Juno SDK in your app.

:::

---

## How does it work?

Each [satellite] you create includes a "Storage" provider, which can store assets (images, documents, etc.) that are automatically made available on the internet.

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
- `private`: only the owner of a asset and can read from (resp. write to) a asset in the collection
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

The `listAssets` function is used to retrieve assets from a specified collection.

```typescript
import { listAssets } from "@junobuild/core";

const myList = await listAssets({
  collection: "my_collection_key"
});
```

### Parameters

The function requires a collection and accepts various optional parameters, including a matcher (a regex applied to the assets fullPaths and descriptions), pagination options, and sorting order.

:::note

`listAssets` uses the same interface as `listDocs`. That is why the parameter `matcher` expect a value `key` to filter the assets according their `fullPath`.

:::

1. **`collection`** (required)

   - **Description**: The key of the collection from which assets are to be listed.
   - **Type**: `string`

2. **`filter`** (optional)

   - **Description**: An optional object that can be used to provide various parameters to filter assets.

   a. **`matcher`** (optional)

   - **Description**: An object used to filter assets based on their keys (fullPaths) or descriptions using regular expressions.
   - **Type**: `ListMatcher`

     ```typescript
     interface ListMatcher {
       key?: string;
       description?: string;
       createdAt?: ListTimestampMatcher;
       updatedAt?: ListTimestampMatcher;
     }
     ```

     - **key**: A regex to match against asset keys.
     - **description**: A regex to match against asset descriptions.
     - **createdAt**: A `ListTimestampMatcher` to filter assets based on their creation timestamp.
     - **updatedAt**: A `ListTimestampMatcher` to filter assets based on their last update timestamp.

   - **Type**: `ListTimestampMatcher` can be used to specify criteria for timestamp matching.

     ```typescript
     type ListTimestampMatcher =
       | {
           matcher: "equal";
           timestamp: bigint;
         }
       | {
           matcher: "greaterThan";
           timestamp: bigint;
         }
       | {
           matcher: "lessThan";
           timestamp: bigint;
         }
       | {
           matcher: "between";
           timestamps: {
             start: bigint;
             end: bigint;
           };
         };
     ```

     - **matcher**: Specifies the type of timestamp comparison. Can be one of the following:

       - **equal**: Matches assets where the timestamp is exactly equal to the specified value.
       - **greaterThan**: Matches assets where the timestamp is greater than the specified value.
       - **lessThan**: Matches assets where the timestamp is less than the specified value.
       - **between**: Matches assets where the timestamp falls within a specified range.

     - **timestamp**: Used with `equal`, `greaterThan`, and `lessThan` matchers to specify the exact timestamp for comparison.
     - **timestamps**: Used with the `between` matcher to specify a range of timestamps. The range is inclusive of both the start and end values.

   b. **`paginate`** (optional)

   - **Description**: An object to control pagination of the results
   - **Type**: `ListPaginate`

     ```typescript
     interface ListPaginate {
       startAfter?: string;
       limit?: number;
     }
     ```

     - **startAfter**: A string key to start listing assets after this key.
     - **limit**: The maximum number of assets to return.

   c. **`order`** (optional)

   - **Description**: Control the sorting order of the results.
   - **Type**: `ListOrder`

     ```typescript
     interface ListOrder {
       desc: boolean;
       field: ListOrderField;
     }

     type ListOrderField = "keys" | "updated_at" | "created_at";
     ```

   d. **`owner`** (optional)

   - **Description**: The owner of the assets.
   - **Type**: `ListOwner`

     ```typescript
     type ListOwner = string | Principal;
     ```

:::note[Example]
Usage of the parameters:

```typescript
import { listDocs } from "@junobuild/core";

const myList = await listDocs({
  collection: "my_collection_key",
  filter: {
    matcher: {
      key: ".*.png$", // match assets with .png extension
      description: "holiday", // match description containing 'holiday'
      createdAt: {
        matcher: "greaterThan",
        timestamp: 1627776000n
      },
      updatedAt: {
        matcher: "between",
        timestamps: {
          start: 1627770000n,
          end: 1627900000n
        }
      }
    },
    paginate: {
      startAfter: "doc_10",
      limit: 5
    },
    order: {
      desc: true,
      field: "updated_at"
    },
    owner: "some_owner_id_or_principal"
  }
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

## Count assets

The `countAssets` function is used to count the number of assets in a specified collection without retrieving the actual assets.

```typescript
import { countAssets } from "@junobuild/core";

const assetCount = await countAssets({
  collection: "my_collection_key"
});
```

### Usage

This function accepts similar parameters as the `listAssets` function, including `collection`, `matcher`, and `owner`, and returns the count of matching documents.

For detailed information on how to use these parameters, refer to the [List assets](#list-assets) section.

The return value is the same as the `items_length` property from the `listAssets` function, providing the count of assets that match the criteria.

---

## Delete

There are multiple ways to delete assets from your Storage.

### Delete asset

To delete an asset, you only need to provide its `fullPath`. Unlike the [datastore](./datastore/index.md), there is no timestamp validation performed when deleting an asset.

```typescript
import { deleteAsset } from "@junobuild/core";

await deleteAsset({
  collection: "images",
  storageFile: myAsset
});
```

### Delete multiple assets

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

### Delete filtered assets

The `deleteFilteredAssets` function allows you to delete multiple assets from a collection based on specific filter criteria. This function simplifies bulk deletions by leveraging the same parameters as the [listAssets](#list-assets) function for filtering.

```typescript
import { deleteFilteredAssets } from "@junobuild/core";

await deleteFilteredAssets({
  collection: "my_collection_key",
  filter: {
    // Same options as filter of listAssets
  }
});
```

---

## Configuration

The Storage supports various configuration options to optimize its behavior, such as HTTP headers, redirects, and iFrame support. For a detailed explanation of all available options, see the [configuration](../miscellaneous/configuration.mdx) section.

:::note

If you are looking to configure the hosting behavior of your site, check out the related [documentation](./hosting.mdx#configure-hosting-behavior).

:::

#### Where do you define your Storage configuration?

You define your Storage configuration in your Juno configuration file. The CLI automatically creates the file at the root of your project directory when you run the [juno init](../miscellaneous/cli.mdx#init) or [juno deploy](../miscellaneous/cli.mdx#deploy) command for the first time.

#### How do you apply your changes?

To apply any changes you make in your configuration to your satellite, execute the [juno config](../miscellaneous/cli.mdx#config) command with the CLI.

[satellite]: ../terminology.md#satellite
[controllers]: ../terminology.md#controller
