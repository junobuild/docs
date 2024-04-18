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
          ref={container}
          onClick={async ($event) => onClick($event as unknown as MouseEvent)}
        >
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
