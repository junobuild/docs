export const lang = "language-rust";
export const code = `#[derive(Serialize, Deserialize)]
struct Person {
    hello: String,
    amount: DocDataBigInt,
}

#[on_set_doc]
fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
  let data: Person = decode_doc_data(&context.data.data.after.data)?;

  print(format!("Caller: {}", context.caller.to_text()));
  print(format!("Data: {}", amount.value));
}`