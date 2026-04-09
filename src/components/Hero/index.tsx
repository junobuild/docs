import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Start from "@site/src/components/Start";
import { trackEvent } from "@site/src/providers/analytics.providers";
import clsx from "clsx";
import { useRef } from "react";
import styles from "./styles.module.scss";

export default function Hero(): JSX.Element {
  const el = useRef(null);

  const { siteConfig } = useDocusaurusContext();
  return (
    <article className={clsx("hero", styles.heroBanner)}>
      <div className={`${styles.container}`}>
        <h1
          className={`hero__title ${styles.title} ${styles.item} ${styles.bold}`}
        >
          Open-Source SDK
          <br />
          for building apps
        </h1>
        <p className={`${styles.item} ${styles.subtitle}`}>
          Juno is a full-stack platform to develop, deploy, and run apps in WASM
          containers with zero DevOps.
        </p>
        <p className={`${styles.item}`}></p>
        <div className={`${styles.item} ${styles.actions}`}>
          <Start position="hero">Start Building</Start>
          <Link
            className="button button--juno"
            to="/docs/intro"
            onClick={() =>
              trackEvent({
                name: "documentation",
                siteConfig
              })
            }
          >
            Documentation
          </Link>

          <a
            href="/llms-full.txt"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.llms}
          >
            llms-full.txt
          </a>
        </div>
      </div>
    </article>
  );
}
