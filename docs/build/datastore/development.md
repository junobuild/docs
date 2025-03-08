# Development

This page provides an overview of how to integrate and manage documents using the Juno SDK, including adding, retrieving, updating, listing, and deleting documents within your app.

:::note

To use these features, the Juno SDK must be [installed](../../setup-the-sdk.mdx) and initialized in your app.

:::

---

## Add a document

To add a document, use the `setDoc` function:

```typescript
import { setDoc } from "@junobuild/core";

await setDoc({
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

await setDoc({
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

await setDoc({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key_1",
    data: myExample,
    description: "This is a description"
  }
});

await setDoc({
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

await setDoc({
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

await setDoc({
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

2. **`filter`** (optional)

   - **Description**: An optional object that can be used to provide various parameters to filter documents.

   a. **`matcher`** (optional)

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

   b. **`paginate`** (optional)

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

   - **Description**: The owner of the documents.
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
    order: {
      desc: true,
      field: "updated_at"
    },
    owner: "some_owner_id_or_principal"
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

## Count documents

The `countDocs` function is used to count the number of documents in a specified collection without retrieving the actual documents.

```typescript
import { countDocs } from "@junobuild/core";

const count = await countDocs({
  collection: "my_collection_key"
});
```

### Usage

This function accepts similar parameters as the `listDocs` function, including `collection`, `matcher`, and `owner`, and returns the count of matching documents.

For detailed information on how to use these parameters, refer to the [List documents](#list-documents) section.

The return value is the same as the `items_length` property from the `listDocs` function, providing the count of documents that match the criteria.

---

## Delete

There are multiple ways to delete documents from your Datastore.

### Delete a document

To delete a document, use the `deleteDoc` function, which performs version validation to ensure that the most recent document is being deleted:

```typescript
import { deleteDoc } from "@junobuild/core";

await deleteDoc({
  collection: "my_collection_key",
  doc: myDoc
});
```

The document must include the current `version` from the latest entry within the satellite; otherwise, the call will fail. This prevents unexpected concurrent overwrites, which is particularly useful if your users access your projects simultaneously on multiple devices.

### Delete multiple documents

To delete multiple documents in an atomic manner, you can use the function `deleteManyDocs`:

```typescript
import { deleteManyDocs } from "@junobuild/core";

await deleteManyDocs({ docs: [myDoc1, myDo2, myDoc3] });
```

### Delete filtered documents

The `deleteFilteredDocs` function allows you to delete multiple documents from a collection based on specific filter criteria. This function simplifies bulk deletions by leveraging the same parameters as the [listDocs](#list-documents) function for filtering.

```typescript
import { deleteFilteredDocs } from "@junobuild/core";

await deleteFilteredDocs({
  collection: "my_collection_key",
  filter: {
    // Same options as filter of listDocs
  }
});
```

[JSON]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
