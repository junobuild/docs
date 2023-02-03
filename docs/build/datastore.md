---
sidebar_position: 2
---

# Datastore

The Juno DataStore provides a convenient programming model for storing data on the blockchain, eliminating the need to write backend code. This allows for easy management of distributed, cross-user data.

:::note

To use these features, the Juno SDK must be [installed](../add-juno-to-an-app/install-the-sdk-and-initialize-juno.md) and initialized in your app.

:::

## How does it work?

Each [satellite] you create has a "Datastore," which can have as many collections as you wish.

A collection is identified by a customizable key, which is a `string`, and contains a list of documents.

Each document is a record that holds the data you want to persist on the chain, along with timestamps and a technical user.

Timestamps are used to prevent data from being overwritten, and the technical user is used to grant read and write permissions.

Each document is identified by a unique `key` per collection.

## Limitation

A [satellite] can hold up to 32GB of data for all services combined.

A document can weigh up to 2MB.

## Collections and rules

You can create or update collections and their rules in the "Rules" tab in Juno's console under the [datastore](https://console.juno.build/datastore) view.

A collection's read and write permissions can be set as `public`, `private`, `managed`, or `controllers`.

- `public` means anyone can read/write in the related collection
- `private` means only a registered user can access the data
- `managed` means both the user and the [controllers] can access the data
- `controllers` means only the [controllers] can access the data

:::tip

- You can modify the rules at any time, and changes will take effect immediately.
- Any collection with read permissions set to `public`, `managed` or `controllers` can be viewed in Juno's console under the [datastore](https://console.juno.build/datastore) view.

:::

## Add data

To add data, use the `setDoc` function:

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

You need to provide the `collection` in which to save the data and the `key` to use as an index for the document.

:::tip

The `key` can be any `string`, but it's recommended to generate IDs using the [nanoid](https://github.com/ai/nanoid) library.

:::

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

## Get data

To retrieve data, use the `getDoc` function and provide the `collection` and the `key` of the document:

```typescript
import { getDoc } from "@junobuild/core";

const myDoc = await getDoc({
  collection: "my_collection_key",
  key: myId,
});
```

## Update data

To update a document, use the `setDoc` function with a timestamp to validate that the most recent entry is being updated:

```typescript
import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    ...myDoc,
    data: myNewData,
  },
});
```

:::tip

It is common to retrieve the document before updating it to ensure that you have the most recent timestamp.

:::

## List data

To list data, use the `listDocs` function, which accepts various optional parameters, including a matcher (a regex applied to the documents' keys), pagination options, and sorting order:

```typescript
import { listDocs } from "@junobuild/core";

const myList = await listDocs({
  collection: "my_collection_key",
  filter: {},
});
```

## Delete data

To delete data, use the `delDoc` function, which also performs timestamp validation to ensure that the most recent document is being deleted:

```typescript
import { delDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: myDoc,
});
```

[satellite]: ../terminology.md#satellite
[controllers]: ../terminology.md#controller
