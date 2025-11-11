export const code = {
  lang: "language-rust",
  value: `// --------------------------------------------------
// Extend Juno with serverless functions written in Rust
// --------------------------------------------------
#[on_set_doc(collection = ["notes"])]
fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
  let data: Person = decode_doc_data(&context.data.data.after.data)?;

  print(format!("Caller: {}", context.caller.to_text()));
  print(format!("Name: {}", data.name));
}

// Define custom assertions to protect your data
#[assert_delete_doc(collections = ["answers"])]
fn assert_delete_doc(_: AssertDeleteDocContext) -> Result<(), String> {
    Err("Deletion not authorized".to_string())
}

// --------------------------------------------------
// Or write the same logic in TypeScript
// --------------------------------------------------
export const onSetDoc = defineHook<OnSetDoc>({
  collections: ["notes"],
  run: async (context) => {
    const data = decodeDocData<Person>(data.after.data);
  
    console.log(\`Caller: \${context.caller}\`);
    console.log(\`Data: \${data.name}\`);
  }
});

export const assertDeleteDoc = defineAssert<AssertDeleteDoc>({
  collections: ['answers'],
  assert: (context) => {
    throw new Error("Deletion not authorized");
  }
});
`
};
