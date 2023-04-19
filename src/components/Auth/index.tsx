import React from "react";
import Snippet from "@site/src/components/Snippet";

export default function Auth(): JSX.Element {
  return (
    <Snippet
      title="Authentication Integration."
      texts={[
        "Juno Authentication integrates tightly with other Juno services like datastore and storage.",
        "You can manage your users in an administration console. A new entry is created when a user succesfully signs in.",
      ]}
      code={`import { signIn } from "@junobuild/core";

await signIn();`}
      inverted={false}
    />
  );
}
