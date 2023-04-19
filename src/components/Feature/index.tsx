import React from "react";
import styles from "./styles.module.scss";

export default function Feature({ icon, title, text, link }): JSX.Element {
  return (
    <article>
      <div className={styles.title}>
        {icon}

        <h4>{title}</h4>
      </div>

      <p className={styles.text}>{text}</p>

      {link}
    </article>
  );
}
