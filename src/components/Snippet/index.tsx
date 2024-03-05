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
        <h2 className={styles.title}>{title}</h2>

        {texts.map((text, i) => (
          <p key={i} className={styles.text}>
            {text}
          </p>
        ))}
      </div>

      <div>
        <CodeBlock className={lang}>{code}</CodeBlock>
      </div>
    </div>
  );
}
