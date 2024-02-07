import Snippet from "@site/src/components/Snippet";

export default function Developer(): JSX.Element {
  return (
    <Snippet
      title="Hooks."
      texts={[
        "Write strongly-typed serverless functions that are triggered automatically to run custom logic on your smart contract."
      ]}
      code={`#[derive(Serialize, Deserialize)]
struct Person {
    hello: String,
    amount: DocDataBigInt,
}

#[on_set_doc]
fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
  let data: Person = decode_doc_data(&context.data.data.after.data)?;

  print(format!("Caller: {}", context.caller.to_text()));
  print(format!("Data: {}", amount.value));
}`}
      inverted={false}
      lang="language-rust"
    />
  );
}
