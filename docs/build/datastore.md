---
sidebar_position: 2
---

# Datastore

The Juno Datastore provides a convenient programming model for storing data on the blockchain, eliminating the need to write backend code. This allows for easy management of distributed, cross-user data.

:::note

To use these features, the Juno SDK must be [installed](../add-juno-to-an-app/install-the-sdk-and-initialize-juno.md) and initialized in your app.

:::

## How does it work?

Each [satellite] you create has a "Datastore", which can have as many collections as you wish.

A collection contains a list of documents, each identified by a textual key that you define.

Each document is a record that holds the data you want to persist on chain, along with timestamps (created and last updated) and an associated owner (the creator of the document).

Timestamps are used to prevent data from being overwritten, and the associated owner is used to grant read and write permissions.

Each document is identified by a `key` (unique within a collection).

In essence, a "Datastore" functions as a keypair store.

## Limitation

Each satellite has specific memory limits. For detailed information, please refer to the related [documentation](../miscellaneous/memory.md) page.

As for documents, they can be up to 2MB in size. However, larger files can be saved in the [storage](build/storage.md).

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

## Add a document

To add a document, use the `setDoc` function:

```typescript
import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key",
    data: myExample,
  },
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
    data: myExample,
  },
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
    description: "This is a description",
  },
});

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key_2",
    data: myExample,
    description: "#programming #technology #web3 #junobuild",
  },
});
```

## Get a document

To retrieve data, use the `getDoc` function and provide the `collection` and the `key` of the document:

```typescript
import { getDoc } from "@junobuild/core";

const myDoc = await getDoc({
  collection: "my_collection_key",
  key: myId,
});
```

## Get multiple documents

Obtaining multiple documents at once can improve performance compared to making multiple individual `getDoc` calls depending on the use case.

You can achieve this by using the `getManyDocs` function:

```typescript
import { getManyDocs } from "@junobuild/core";

const docPair1 = {
  collection: "my_collection",
  key: "my_document_key_1",
};

const docPair2 = {
  collection: "my_other_collection",
  key: "my_document_key_2",
};

const docs = await getManyDocs({ docs: [docPair1, docPair2] });
```

## Update a document

To update a document, use the `setDoc` function with a timestamp to validate that the most recent entry is being updated:

```typescript
import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    ...myDoc, // includes 'key' and 'updated_at'
    data: myNewData,
  },
});
```

The `updated_at` timestamp must match the timestamp of the last document update on the satellite, otherwise the call will fail. This prevents unexpected concurrent updates.

:::tip

It is common to retrieve the document with `getDoc` before updating it to ensure that you have the most recent timestamp.

:::

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
      hello: "world",
    },
  },
};

const update2 = {
  collection: "my_other_collection",
  doc: {
    key: "my_document_key_2",
    data: {
      count: 123,
    },
  },
};

const docs = await setManyDocs({ docs: [update1, update2] });
```

## List documents

To list documents, use the `listDocs` function:

```typescript
import { listDocs } from "@junobuild/core";

const myList = await listDocs({
  collection: "my_collection_key",
});
```

The function **accepts various optional parameters**, including a matcher (a regex applied to the document keys and descriptions), pagination options, and sorting order.

```javascript
import { listDocs } from "@junobuild/core";

const myList = await listDocs({
  collection: "my_collection_key",
  filter: {
    order: {
      desc: true,
      field: "updated_at",
    },
  },
});
```

Sorting can be applied descending or ascending to following fields:

- `keys`
- `updated_at`
- `created_at`

Options `matcher`, `paginate` and `order` can be use together.

The function **returns various information**, in the form of an object whose interface is given below.

```javascript
{
  items: []; // The data - array of documents
  items_length: bigint; // The numbers of items - basically items.length
  items_page?: bigint; // If the query is paginated, at what page (starting from 0) do the items find the place
  matches_length: bigint; // The total number of matching results
  matches_pages?: bigint; // If the query is paginated, the total number (starting from 0) of pages
}
```

## Delete a document

To delete a document, use the `deleteDoc` function, which also performs timestamp validation to ensure that the most recent document is being deleted:

```typescript
import { deleteDoc } from "@junobuild/core";

await deleteDoc<Example>({
  collection: "my_collection_key",
  doc: myDoc,
});
```

## Delete multiple documents

To delete multiple documents in an atomic manner, you can use the function `deleteManyDocs`:

```typescript
import { deleteManyDocs } from "@junobuild/core";

await deleteManyDocs({ docs: [myDoc1, myDo2, myDoc3] });
```

[satellite]: ../terminology.md#satellite
[controllers]: ../terminology.md#controller
[JSON]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
