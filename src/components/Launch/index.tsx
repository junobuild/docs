import LaunchIllustration from "@site/static/img/launch.png";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.scss";

export default function Launch(): JSX.Element {
  return (
    <div className={styles.sub}>
      <article>
        <h2 className={styles.title}>Launch your app now</h2>
        <p>
          Whether you're planning to build a website, blog, or application,
          quickly scaffold your project with ready-made templates.
        </p>

        <CodeBlock className="code-npm">npm create juno@latest</CodeBlock>
      </article>

      <img
        src={LaunchIllustration}
        loading="lazy"
        alt="An satellite being launch to space through the clouds."
      />
    </div>
  );
}
