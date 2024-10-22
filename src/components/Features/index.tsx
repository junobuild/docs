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
          <h2>Bootstrap in a Weekend</h2>
          <p>
            Bring your ideas to life with a comprehensive toolkit designed to
            accelerate your development.
          </p>
        </aside>
      </div>

      <Snippets />
    </>
  );
}
