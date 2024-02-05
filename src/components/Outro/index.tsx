import Start from "@site/src/components/Start";
import styles from "./styles.module.scss";

export default function Outro(): JSX.Element {
  return (
    <div className={styles.outro}>
      <p className={`${styles.sub} ${styles.time}`}>
        Develop your next dApp at{" "}
        <span className={styles.bold}>Lightning Speed</span>.
      </p>

      <Start position="footer" />
    </div>
  );
}
