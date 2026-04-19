import BashSnippet from "@site/src/components/BashSnippet";
import styles from "./styles.module.scss";

export default function Build(): JSX.Element {
  return (
    <div className={styles.section}>
      <h2 className={styles.sub}>
        Building with <span className={styles.agents}>AI agents</span>?
      </h2>
      <p className={styles.text}>
        Give them instant knowledge by installing skills.
      </p>

      <BashSnippet
        cmd="npx skills add junobuild/skills"
        analyticsEventName="copy_ai_snippet"
      ></BashSnippet>
    </div>
  );
}
