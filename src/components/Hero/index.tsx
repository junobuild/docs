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
          {siteConfig.tagline}
        </h1>
        <p className={`${styles.item}`}>
          Juno is an open-source Blockchainless platform. Start building your
          decentralized app with a datastore, authentication, file storage, and
          custom domain. No backend code required.
        </p>
        <p className={`${styles.item}`}></p>
        <div className={`${styles.item} ${styles.actions}`}>
          <Link
            className="button button--hero"
            href="https://console.juno.build"
            target="_self"
          >
            Start building
          </Link>

          <Link className="button button--juno" to="/docs/intro">
            Documentation
          </Link>
        </div>
      </div>
    </article>
  );
}
