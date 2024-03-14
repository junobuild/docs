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
      <div>
        <h3 className={styles.title}>{title}</h3>

        {texts.map((text, i) => (
          <p key={i} className={styles.text}>
            {text}
          </p>
        ))}
      </div>

      <CodeBlock className={lang}>{code}</CodeBlock>
    </div>
  );
}
