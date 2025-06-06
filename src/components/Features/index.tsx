import Snippets from "@site/src/components/Snippets";
import { CloudIllustration } from "@site/src/icons/CloudIllustration";
import styles from "./styles.module.scss";

export default function Features(): JSX.Element {
  return (
    <>
      <div className={styles.sub}>
        <picture aria-label="An astronaut sitting on a cloud with their laptop">
          <CloudIllustration />
        </picture>
        <aside>
          <h2>Move Fast. Ship Smart.</h2>
          <p>
            Develop modern apps with zero backend setup. Build, test and deploy
            your way.
          </p>
        </aside>
      </div>

      <Snippets />
    </>
  );
}
