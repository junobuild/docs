import CodeBlock from "@theme/CodeBlock";

export default function Datastore(): JSX.Element {
  const lang = "language-javascript";
  const code = `import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key",
    data: myExample,
  },
});`;

  return <CodeBlock className={lang}>{code}</CodeBlock>;
}
