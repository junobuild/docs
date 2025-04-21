import Start from "@site/src/components/Start";
import MoonIllustration from "@site/static/img/moon.svg";
import styles from "./styles.module.scss";

export default function Outro(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div>
          <h2 className={`${styles.sub}`}>Your apps. Your terms.</h2>
          <p className={styles.subText}>
            No setup. No DevOps. No strings attached.
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
