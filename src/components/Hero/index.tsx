import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Start from "@site/src/components/Start";
import { trackEvent } from "@site/src/providers/analytics.providers";
import clsx from "clsx";
import styles from "./styles.module.scss";

export default function Hero(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <article className={clsx("hero", styles.heroBanner)}>
      <div className={`${styles.container}`}>
        <h1 className={`hero__title ${styles.title} ${styles.item}`}>
          Build Web3 at Lightning Speed
        </h1>
        <p className={`${styles.item}`}>
          Juno is a blockchainless (or zero-knowledge) development platform for
          creating innovative applications.
        </p>
        <p className={`${styles.item}`}></p>
        <div className={`${styles.item} ${styles.actions}`}>
          <Start position="hero" />
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
        </div>
      </div>
    </article>
  );
}
