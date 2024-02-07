import Snippet from "@site/src/components/Snippet";

export default function Api(): JSX.Element {
  return (
    <Snippet
      title="Efficient TypeScript API."
      texts={[
        "Juno's API is designed to provide powerful blockchain features through easy-to-use and streamlined functions."
      ]}
      code={`import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key",
    data: myExample,
  },
});`}
      inverted={true}
    />
  );
}
