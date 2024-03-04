import Snippet from "@site/src/components/Snippet";

export default function Auth(): JSX.Element {
  return (
    <Snippet
      title="Seamless User Authentication."
      texts={[
        "Juno Authentication integrates tightly with other Juno services like datastore and storage.",
        "You can manage your users in an administration console. A new entry is automatically created when a user successfully signs in."
      ]}
      code={`import { signIn } from "@junobuild/core";

await signIn();`}
    />
  );
}
