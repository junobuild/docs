export const code = {
  lang: "language-javascript",
  value: `import { setDoc, getDoc } from "@junobuild/core";

const collection = "my_collection";
const key = crypto.randomUUID();

// Set a document by specifying its collection,
// key, and data.
await setDoc({
  collection,
  doc: {
    key,
    data: {
      hello: "world"
    },
  },
});

// Retrieve a document by collection and key
const myDoc = await getDoc({
  collection,
  key
});

// List documents with pagination, filtering, and ordering, etc.
const myList = await listDocs({
  collection,
  paginate: {
    startAfter: "doc_10",
    limit: 5
  }
});
`
};
