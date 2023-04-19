import React from "react";
import styles from "./styles.module.scss";
import CodeBlock from "@theme/CodeBlock";

export default function Snippet({ title, texts, code, inverted }): JSX.Element {
  return (
    <div className={`${styles.grid} ${inverted ? styles.inverted : ""}`}>
      <div>
        <h2 className={styles.title}>{title}</h2>

        {texts.map((text, i) => (
          <p key={i} className={styles.text}>
            {text}
          </p>
        ))}
      </div>

      <div>
        <CodeBlock className="language-javascript">{code}</CodeBlock>
      </div>
    </div>
  );
}
