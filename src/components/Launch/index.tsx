import CodeBlock from "@theme/CodeBlock";
import LaunchIllustration from "../../assets/launch.svg";
import styles from "./styles.module.scss";

export default function Launch(): JSX.Element {
  return (
    <div className={styles.sub}>
      <article>
        <h2 className={styles.title}>Launch your app now</h2>
        <p>
          Are you starting a new project? We've got your back. Whether you're
          planning to build a website, blog, or application, quickly scaffold
          your project with ready-made templates.
        </p>

        <CodeBlock className="code-yolo">npm create juno@latest</CodeBlock>
      </article>

      <picture aria-label="An satellite being launch to space through the clouds.">
        <LaunchIllustration />
      </picture>
    </div>
  );
}
