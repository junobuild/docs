import React from "react";
import styles from "./index.module.scss";

export default function Spotlight({ title, text, img }): JSX.Element {
  return (
    <article className={`button button--juno ${styles.card}`}>
      <img src={img} loading="lazy" className={styles.img} />

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </article>
  );
}
