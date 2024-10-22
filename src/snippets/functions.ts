export const lang = "language-rust";
export const code = `// You can supercharge Juno's capabilities
// and start developing your own serverless features
#[query]
fn hello(text: String) -> String {
    format!("Hello: {}", text)
}

// The JS/TS bindings are automatically generated on the fly
await hello('Yolo')

// You can declare your own API endpoints or
// implement hooks that are triggered when data is modified
#[on_set_doc]
fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
  let data: Person = decode_doc_data(&context.data.data.after.data)?;

  print(format!("Caller: {}", context.caller.to_text()));
  print(format!("Data: {}", amount.value));
}

/ Similarly, you can also extend the assertion scheme
// to define your own synchronous set of rules
#[assert_delete_doc(collections = ["answers"])]
fn assert_delete_doc(_: AssertDeleteDocContext) -> Result<(), String> {
    Err("Deletion not authorized".to_string())
}
`