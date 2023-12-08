import React from "react";
import styles from "./index.module.scss";
import Link from "@docusaurus/Link";

export default function Spotlight({ title, text, img, url }): JSX.Element {
  return (
    <Link href={url} target="_blank" rel="noreferrer noopener nofollow">
      <article className={`button button--juno ${styles.card}`}>
        <div className={styles.imgContainer}>
          <img
            src={img}
            loading="lazy"
            className={styles.img}
            role="presentation"
            alt={`${title} banner`}
          />
        </div>

        <div className={styles.content}>
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
      </article>
    </Link>
  );
}
