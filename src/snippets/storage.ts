export const code = {
  lang: "language-javascript",
  value: `import { uploadFile, listAssets } from "@junobuild/core";

const collection = "images";

// Files are organized into collections,
// each with its own access permissions.
 
// Upload a file using a File or Blob object
const result = await uploadFile({
  collection,
  data,
});

// Assets are public by default but can be made private
// using an access token in the URL, e.g.:
// https://url/data.jpg?token=secret
const token = crypto.randomUUID();

await uploadFile({
  collection,
  data,
  token
});

// List assets with pagination, filters, and ordering
const myList = await listAssets({
  collection
});
`
};
