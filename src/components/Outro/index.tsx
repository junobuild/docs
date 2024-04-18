import Start from "@site/src/components/Start";
import MoonIllustration from "@site/static/img/moon.svg";
import styles from "./styles.module.scss";

export default function Outro(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div>
          <p className={`${styles.sub}`}>Take control of YOUR CODE.</p>
          <p className={styles.subText}>
            <small>Shape your future apps controlled exclusively by you.</small>
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
