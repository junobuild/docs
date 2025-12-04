import Snippets from "@site/src/components/Snippets";
import CloudIllustration from "@site/static/img/cloud.svg";
import styles from "./styles.module.scss";

export default function Features(): JSX.Element {
  return (
    <>
      <div className={styles.sub}>
        <picture aria-label="An astronaut sitting on a cloud with their laptop">
          <CloudIllustration />
        </picture>
        <aside>
          <h2>
            Complete stack.
            <br />
            Zero overhead.
          </h2>
          <p>
            Key-value datastore, storage, auth, analytics, and serverless
            functions running in secure containers. No infrastructure to manage.
          </p>
        </aside>
      </div>

      <Snippets />
    </>
  );
}
