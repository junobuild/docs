import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import JunoLogo from "@site/static/img/juno_logo.svg";

export default function Hero(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <article className={clsx("hero", styles.heroBanner)}>
      <div className={`${styles.container}`}>
        <h1 className={`hero__title ${styles.title} ${styles.item}`}>
          <JunoLogo />
        </h1>
        <p className={`hero__subtitle ${styles.item}`}>{siteConfig.tagline}</p>
        <p className={`${styles.item}`}>
          No backend code required.
          <br />
          100% on-chain with minimal carbon impact.
        </p>
        <div className={`${styles.item}`}>
          <Link className="button button--juno" to="/docs/intro">
            Get started
          </Link>
        </div>
      </div>
    </article>
  );
}
