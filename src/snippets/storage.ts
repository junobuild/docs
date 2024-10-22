export const lang = "language-javascript";
export const code = `import { uploadFile, listAssets } from "@junobuild/core";

// Files are organized into collections,
// with each collection having specific permissions.
const collection = "images";

// Uploading a file requires a File or Blob object
// and the target collection. That's it.
const result = await uploadFile({
  collection,
  data,
});

// All assets are publicly accessible by default but
// can be made "private" using a query token for access.

// Example: https://url/data.jpg?token=secret
const secret = crypto.randomUUID();

await uploadFile({
  collection,
  data,
  token: secret
});

// Assets can be listed with pagination, filtering, ordering, etc.
const myList = await listAssets({
  collection
});
`;