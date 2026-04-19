import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { trackEvent } from "@site/src/providers/analytics.providers";
import CodeBlock from "@theme/CodeBlock";
import { useRef } from "react";
import styles from "./styles.module.scss";

export default function BashSnippet({
  analyticsEventName,
  cmd
}: {
  analyticsEventName: string;
  cmd: string;
}): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const container = useRef(null);

  const onClick = async ({ target }: MouseEvent) => {
    const btn = container.current?.querySelector('button[title="Copy"]');

    if (!btn?.contains(target)) {
      return;
    }

    await trackEvent({
      name: analyticsEventName,
      siteConfig
    });
  };

  return (
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
      <CodeBlock className="code-npm">{cmd}</CodeBlock>
    </div>
  );
}
