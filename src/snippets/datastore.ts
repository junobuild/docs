export const code = {
  lang: "language-javascript",
  value: `import { setDoc, getDoc } from "@junobuild/core";

const collection = "my_collection";
const key = crypto.randomUUID();

// Create or update a document
await setDoc({
  collection,
  doc: {
    key,
    data: {
      hello: "world"
    },
  },
});

// Retrieve a document by its collection and key
const myDoc = await getDoc({
  collection,
  key
});

// List documents with pagination, filters, and ordering
const myList = await listDocs({
  collection,
  paginate: {
    startAfter: "doc_10",
    limit: 5
  }
});
`
};
