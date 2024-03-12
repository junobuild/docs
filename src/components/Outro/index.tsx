import Start from "@site/src/components/Start";
import MoonIllustration from "../../assets/moon.svg";
import styles from "./styles.module.scss";

export default function Outro(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div>
          <p className={`${styles.sub}`}>
            Develop your next decentralized app in NO TIME.
          </p>
          <Start position="footer" className={`button-lg ${styles.start}`} />
        </div>
        <picture aria-label="An astronaut planting a flag reading 'Juno' on a small planet, giving a thumbs up.">
          <MoonIllustration />
        </picture>
      </div>
    </section>
  );
}
