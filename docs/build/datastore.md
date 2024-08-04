---
sidebar_position: 2
---

# Datastore

The Juno Datastore provides a convenient programming model for storing data on the blockchain, eliminating the need to write backend code. This allows for easy management of distributed, cross-user data.

:::note

To use these features, the Juno SDK must be [installed](../add-juno-to-an-app/setup) and initialized in your app.

:::

---

## How does it work?

Each [satellite] you create has a "Datastore", which can have as many collections as you wish.

A collection contains a list of documents, each identified by a textual key that you define.

Each document is a record that holds the data you want to persist on chain, along with timestamps (created and last updated) and an associated owner (the creator of the document).

Timestamps are used to prevent data from being overwritten, and the associated owner is used to grant read and write permissions.

Each document is identified by a `key` (unique within a collection).

In essence, a "Datastore" functions as a keypair store.

---

## Limitation

Each satellite has specific memory limits. For detailed information, please refer to the related [documentation](../miscellaneous/memory.md) page.

As for documents, they can be up to 2MB in size. However, larger files can be saved in the [storage](build/storage.md).

---

## Collections

You can create or update a collection in the "Collections" tab in Juno's console under the [datastore](https://console.juno.build/datastore) view.

### Rules

A rule is assigned to a collection to define read and write permissions, which can be configured as `public`, `private`, `managed`, or `controllers`.

- `public`: everyone can read from (resp. write to) any document in the collection
- `private`: only the owner of a document can read from (resp. write to) a document in the collection
- `managed`: the owner of a document _and_ the [controllers] of the satellite can read from (resp. write to) a document in the collection
- `controllers`: only the controllers of the satellite can read from (resp. write to) any document in the collection

:::tip

- You can modify the rules at any time, and changes will take effect immediately.
- Any collection with read permissions set to `public`, `managed` or `controllers` can be viewed by the satellite's controllers in the console under the [datastore](https://console.juno.build/datastore) view.

:::

### Memory

When you create a collection, it's assigned to either heap or stable memory. This assignment is permanent and cannot be changed once the collection is created. The default allocation is `heap` memory.

---

## Add a document

To add a document, use the `setDoc` function:

```typescript
import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key",
    data: myExample
  }
});
```

You need to provide the `collection` in which to save the data and the `key` to use as an index for the document. The `data` can be any [JSON]-serializable data.

### Key

The `key` can be any `string`, but it's recommended to generate IDs using the [nanoid](https://github.com/ai/nanoid) library.

```typescript
import { setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";

const myId = nanoid();

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: myId,
    data: myExample
  }
});
```

### Description

A document can be saved with an optional `description` field, allowing for a maximum length of 1024 characters. This field serves both descriptive purposes and can be used for more granular filtering of your documentation. When retrieving documents, you can also filter based on the description field in addition to the keys, providing additional flexibility and organization options.

```typescript
import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key_1",
    data: myExample,
    description: "This is a description"
  }
});

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key_2",
    data: myExample,
    description: "#programming #technology #web3 #junobuild"
  }
});
```

---

## Get a document

To retrieve data, use the `getDoc` function and provide the `collection` and the `key` of the document:

```typescript
import { getDoc } from "@junobuild/core";

const myDoc = await getDoc({
  collection: "my_collection_key",
  key: myId
});
```

---

## Get multiple documents

Obtaining multiple documents at once can improve performance compared to making multiple individual `getDoc` calls depending on the use case.

You can achieve this by using the `getManyDocs` function:

```typescript
import { getManyDocs } from "@junobuild/core";

const docPair1 = {
  collection: "my_collection",
  key: "my_document_key_1"
};

const docPair2 = {
  collection: "my_other_collection",
  key: "my_document_key_2"
};

const docs = await getManyDocs({ docs: [docPair1, docPair2] });
```

---

## Update a document

To update a document, use the `setDoc` function with its current version to validate that the most recent entry is being updated:

```typescript
import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: myId,
    data: myExample,
    version: 3n
  }
});
```

The `version` must match the current version of the last document within the satellite; otherwise, the call will fail. This prevents unexpected concurrent overwrites, which is useful, for example, if your users use your projects simultaneously on multiple devices.

:::tip

You can spread the document you have previously retrieved, for example with `getDoc`, to populate the `version` and `key` fields.

```typescript
import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    ...myDoc, // includes 'key' and 'version'
    data: myNewData
  }
});
```

:::

---

## Set multiple documents

You might need to set multiple documents, whether within the same collection or across collections, all at once in an atomic manner. This ensures that if any of the creations or deletions fail, the entire batch will be automatically reverted.

You can achieve this using the `setManyDocs` function:

```typescript
import { setManyDocs } from "@junobuild/core";

const update1 = {
  collection: "my_collection",
  doc: {
    key: "my_document_key_1",
    data: {
      hello: "world"
    }
  }
};

const update2 = {
  collection: "my_other_collection",
  doc: {
    key: "my_document_key_2",
    data: {
      count: 123
    }
  }
};

const docs = await setManyDocs({ docs: [update1, update2] });
```

---

## List documents

The `listDocs` function is used to retrieve documents from a specified collection.

```typescript
import { listDocs } from "@junobuild/core";

const myList = await listDocs({
  collection: "my_collection_key"
});
```

### Parameters

The function requires a collection and accepts various optional parameters, including a matcher (a regex applied to the document keys and descriptions), pagination options, and sorting order.

1. **`collection`** (required)

   - **Description**: The key of the collection from which documents are to be listed.
   - **Type**: `string`

2. **`matcher`** (optional)

   - **Description**: An object used to filter documents based on their keys or descriptions using regular expressions.
   - **Type**: `ListMatcher`

     ```typescript
     interface ListMatcher {
       key?: string;
       description?: string;
       createdAt?: ListTimestampMatcher;
       updatedAt?: ListTimestampMatcher;
     }
     ```

     - **key**: A regex to match against document keys.
     - **description**: A regex to match against document descriptions.
     - **createdAt**: A `ListTimestampMatcher` to filter documents based on their creation timestamp.
     - **updatedAt**: A `ListTimestampMatcher` to filter documents based on their last update timestamp.

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

       - **equal**: Matches documents where the timestamp is exactly equal to the specified value.
       - **greaterThan**: Matches documents where the timestamp is greater than the specified value.
       - **lessThan**: Matches documents where the timestamp is less than the specified value.
       - **between**: Matches documents where the timestamp falls within a specified range.

     - **timestamp**: Used with `equal`, `greaterThan`, and `lessThan` matchers to specify the exact timestamp for comparison.
     - **timestamps**: Used with the `between` matcher to specify a range of timestamps. The range is inclusive of both the start and end values.

3. **`paginate`** (optional)

   - **Description**: An object to control pagination of the results
   - **Type**: `ListPaginate`

     ```typescript
     interface ListPaginate {
       startAfter?: string;
       limit?: number;
     }
     ```

     - **startAfter**: A string key to start listing documents after this key.
     - **limit**: The maximum number of documents to return.

4. **`order`** (optional)

   - **Description**: Control the sorting order of the results.
   - **Type**: `ListOrder`

     ```typescript
     interface ListOrder {
       desc: boolean;
       field: ListOrderField;
     }

     type ListOrderField = "keys" | "updated_at" | "created_at";
     ```

5. **`owner`** (optional)

   - **Description**: The owner of the documents.
   - **Type**: `ListOwner`

     ```typescript
     type ListOwner = string | Principal;
     ```

:::note
Example of usage of the parameters:

```typescript
import { listDocs } from "@junobuild/core";

const myList = await listDocs({
  collection: "my_collection_key",
  owner: "some_owner_id_or_principal",
  matcher: {
    key: "^doc_",
    description: "example",
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
  filter: {
    order: {
      desc: true,
      field: "updated_at"
    }
  }
});
```

:::

The function returns the documents and various information, in the form of an object whose interface is given below.

```typescript
{
  items: []; // The data - array of documents
  items_length: bigint; // The number of documents - basically items.length
  items_page?: bigint; // If the query is paginated, at what page (starting from 0) do the items find the place
  matches_length: bigint; // The total number of matching results
  matches_pages?: bigint; // If the query is paginated, the total number (starting from 0) of pages
}
```

---

## Delete a document

To delete a document, use the `deleteDoc` function, which also performs timestamp validation to ensure that the most recent document is being deleted:

```typescript
import { deleteDoc } from "@junobuild/core";

await deleteDoc<Example>({
  collection: "my_collection_key",
  doc: myDoc
});
```

---

## Delete multiple documents

To delete multiple documents in an atomic manner, you can use the function `deleteManyDocs`:

```typescript
import { deleteManyDocs } from "@junobuild/core";

await deleteManyDocs({ docs: [myDoc1, myDo2, myDoc3] });
```

---

## Configuration

You can configure various settings of the Datastore.

#### Where do you define your Datastore configuration?

You define your Datastore configuration in your Juno configuration file. The CLI automatically creates the file at the root of your project directory when you run the [juno init](../miscellaneous/cli.md#init) or [juno deploy](../miscellaneous/cli.md#deploy) command for the first time.

#### How do you apply your changes?

To apply any changes you make in your configuration to your satellite, execute the [juno config](../miscellaneous/cli.md#config) command with the CLI.

### Maximum Memory Size

You can configure optional limits on heap and stable memory for your smart contract to control the creation and update of documentations in your Datastore.

When the limit is reached, the Datastore and smart contract will continue to operate normally but will reject changes to documents.

```javascript
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    id: "qsgjb-riaaa-aaaaa-aaaga-cai",
    source: "dist",
    datastore: {
      maxMemorySize: {
        stable: 1_073_741_824n // For example max. 1 GiB in bytes of Stable memory
      }
    }
  }
});
```

[satellite]: ../terminology.md#satellite
[controllers]: ../terminology.md#controller
[JSON]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
