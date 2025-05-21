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
        strings: ["Run", "Ship", "Build"],
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
          <span ref={el} className={styles.typing} />
          {!typedLoaded && <span className={styles.typing}>Build</span>} ideas
          in
          <br />
          your container
        </h1>
        <p className={`${styles.item}`}>
          Juno is an open-source, next-gen serverless platform that helps
          developers build and ship secure projects at scale.
        </p>
        <p className={`${styles.item}`}></p>
        <div className={`${styles.item} ${styles.actions}`}>
          <Start position="hero">Get Started</Start>
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
