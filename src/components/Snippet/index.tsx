import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.scss";

export default function Snippet({
  title,
  texts,
  code,
  lang = "language-javascript"
}): JSX.Element {
  return (
    <div className={styles.grid}>
      <CodeBlock className={lang}>{code}</CodeBlock>
    </div>
  );
}
