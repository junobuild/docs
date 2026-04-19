import BashSnippet from "@site/src/components/BashSnippet";
import { LaunchIllustration } from "@site/src/icons/LaunchIllustration";
import styles from "./styles.module.scss";

export default function Launch(): JSX.Element {
  return (
    <div className={styles.sub}>
      <article>
        <h2 className={styles.title}>Starting a new project?</h2>
        <p>
          We've got you covered. Quickly scaffold your project with ready-made
          templates.
        </p>

        <BashSnippet
          analyticsEventName="copy_launch_snippet"
          cmd="npm create juno@latest"
        />
      </article>

      <picture
        aria-label="An satellite being launch to space through the clouds."
        className={styles.img}
      >
        <LaunchIllustration />
      </picture>
    </div>
  );
}
