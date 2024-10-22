import CodeBlock from "@theme/CodeBlock";

export default function Auth(): JSX.Element {
  const lang = "language-javascript";
  const code = `import { signIn } from "@junobuild/core";

<button onClick={signIn}>Sign-in</button>`;

  return <CodeBlock className={lang}>{code}</CodeBlock>;
}
