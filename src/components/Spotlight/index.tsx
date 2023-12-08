import React from "react";
import styles from "./index.module.scss";
import Link from "@docusaurus/Link";
import { ShowcaseSpotlight } from "@site/src/types/showcase";

export default function Spotlight({
  name,
  description,
  img,
  url,
}: ShowcaseSpotlight): JSX.Element {
  return (
    <Link href={url} target="_blank" rel="noreferrer noopener nofollow">
      <article className={`button button--juno ${styles.card}`}>
        <div className={styles.imgContainer}>
          <img
            src={img}
            loading="lazy"
            className={styles.img}
            role="presentation"
            alt={`${name} banner`}
          />
        </div>

        <div className={styles.content}>
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      </article>
    </Link>
  );
}
