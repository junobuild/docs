import Start from "@site/src/components/Start";
import MoonIllustration from "@site/static/img/moon.svg";
import styles from "./styles.module.scss";

export default function Outro(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div>
          <h2 className={`${styles.sub}`}>Your Work. Your Way.</h2>
          <p className={styles.subText}>
            Build and deploy without limits — your apps, your rules, your
            control.
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
