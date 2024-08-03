import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { trackEvent } from "@site/src/providers/analytics.providers";
import LaunchIllustration from "@site/static/img/launch.png";
import CodeBlock from "@theme/CodeBlock";
import { useRef } from "react";
import styles from "./styles.module.scss";

export default function Launch(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const container = useRef(null);

  const onClick = async ({ target }: MouseEvent) => {
    const btn = container.current?.querySelector('button[title="Copy"]');

    if (!btn?.contains(target)) {
      return;
    }

    await trackEvent({
      name: "copy_launch_snippet",
      siteConfig
    });
  };

  return (
    <div className={styles.sub}>
      <article>
        <h2 className={styles.title}>Launch your app now</h2>
        <p>
          Whether you're planning to build a website, blog, or application,
          quickly scaffold your project with ready-made templates.
        </p>

        <div
          className={styles.code}
          ref={container}
          onClick={async ($event) => onClick($event as unknown as MouseEvent)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="#00fff5"
            className={styles.bash}
          >
            <path d="M530-481 353-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l198 198q5 5 7 10t2 11q0 6-2 11t-7 10L396-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l176-176Z" />
          </svg>
          <CodeBlock className="code-npm">npm create juno@latest</CodeBlock>
        </div>
      </article>

      <img
        src={LaunchIllustration}
        loading="lazy"
        alt="An satellite being launch to space through the clouds."
      />
    </div>
  );
}
