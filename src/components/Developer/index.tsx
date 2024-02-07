import Snippet from "@site/src/components/Snippet";

export default function Developer(): JSX.Element {
  return (
    <Snippet
      title="Developer Tools."
      texts={[
        "Leverage Juno's developer tools and console to manage your dApps, monitor and administrate your data.",
        "Utilize the convenient CLI or GitHub Actions to deploy your projects with ease."
      ]}
      code={`❯ npm i -g @junobuild/cli
❯ juno deploy`}
      inverted={true}
      lang="language-bash"
    />
  );
}
