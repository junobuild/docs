export const lang = "language-javascript";
export const code = `import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key",
    data: myExample,
  },
});`;