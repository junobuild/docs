import Snippet from "@site/src/components/Snippet";

export default function Auth(): JSX.Element {
  return (
    <Snippet
      title="Plug & Play Authentication."
      texts={[
        "Juno Authentication ensures deep integration with services like Datastore and Storage, offering a cohesive ecosystem.",
        "You can manage your users in an administration console. A new entry is automatically created when a user successfully signs in."
      ]}
      code={`import { signIn } from "@junobuild/core";

<button onClick={signIn}>Sign-in</button>`}
      inverted={false}
    />
  );
}
