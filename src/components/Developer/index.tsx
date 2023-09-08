import React from "react";
import Snippet from "@site/src/components/Snippet";

export default function Developer(): JSX.Element {
  return (
    <Snippet
      title="Developer Tools."
      texts={[
        "Leverage Juno's developer tools to manage your dApps, monitor and administer your data from a single control center.",
        "Utilize the convenient CLI or GitHub Actions to deploy your projects with ease.",
      ]}
      code={`npm i -g @junobuild/cli
juno init
juno deploy`}
      inverted={false}
      lang="language-bash"
    />
  );
}
