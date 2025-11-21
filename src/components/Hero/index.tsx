import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Start from "@site/src/components/Start";
import { trackEvent } from "@site/src/providers/analytics.providers";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import styles from "./styles.module.scss";

export default function Hero(): JSX.Element {
  const el = useRef(null);

  const [typedLoaded, setTypedLoaded] = useState(false);

  useEffect(() => {
    let typed: Typed | undefined;

    const timeout = setTimeout(() => {
      typed = new Typed(el.current, {
        strings: ["Run", "Ship", "Build", "Launch", "Host"],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 3500,
        loop: true,
        showCursor: false
      });

      setTypedLoaded(true);
    }, 2500);

    return () => {
      clearTimeout(timeout);
      typed?.destroy();
    };
  }, []);

  const { siteConfig } = useDocusaurusContext();
  return (
    <article className={clsx("hero", styles.heroBanner)}>
      <div className={`${styles.container}`}>
        <h1 className={`hero__title ${styles.title} ${styles.item}`}>
          <span ref={el} className={`${styles.bold} ${styles.typed}`} />
          {!typedLoaded && (
            <span className={`${styles.bold} ${styles.typed}`}>Build</span>
          )}{" "}
          ideas in
          <br />
          your <span className={styles.bold}>container</span>
        </h1>
        <p className={`${styles.item} ${styles.subtitle}`}>
          Juno is an open-source serverless platform to build, deploy, and run
          modern apps with the privacy and control of self-hosting.
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
