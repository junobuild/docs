import Snippet from "@site/src/components/Snippet";

export default function Developer(): JSX.Element {
  return (
    <Snippet
      title="Developer-Focused Tools."
      texts={[
        "Designed by developers for developers, Juno's tools and console empower you to manage your dApps, monitor, and administrate your data.",
        "Utilize the convenient CLI or GitHub Actions to deploy your projects with ease."
      ]}
      code={`❯ npm i -g @junobuild/cli
❯ juno deploy`}
      lang="language-bash"
    />
  );
}
