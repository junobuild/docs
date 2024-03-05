import Snippet from "@site/src/components/Snippet";

export default function Api(): JSX.Element {
  return (
    <Snippet
      title="Efficient Libraries."
      texts={[
        "Juno offers advanced blockchain capabilities via user-friendly JavaScript libraries, enabling seamless integration into your frontend projects."
      ]}
      code={`import { setDoc } from "@junobuild/core";

await setDoc<Example>({
  collection: "my_collection_key",
  doc: {
    key: "my_document_key",
    data: myExample,
  },
});`}
    />
  );
}
