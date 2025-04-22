import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Start from "@site/src/components/Start";
import { trackEvent } from "@site/src/providers/analytics.providers";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import styles from "./styles.module.scss";

export default function Hero(): JSX.Element {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Build", "Run", "Ship"],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 3500,
      loop: true,
      showCursor: false
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const { siteConfig } = useDocusaurusContext();
  return (
    <article className={clsx("hero", styles.heroBanner)}>
      <div className={`${styles.container}`}>
        <h1 className={`hero__title ${styles.title} ${styles.item}`}>
          <span ref={el} className={styles.typing}>
            Build
          </span>{" "}
          ideas in
          <br />
          your container
        </h1>
        <p className={`${styles.item}`}>
          Juno is an open-source, next-gen serverless platform that helps
          developers build and ship secure projects at scale.
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
