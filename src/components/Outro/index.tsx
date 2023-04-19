import React from "react";
import styles from "./styles.module.scss";
import Start from "@site/src/components/Start";

export default function Outro(): JSX.Element {
  return (
    <div className={styles.outro}>
      <p className={`${styles.sub} ${styles.ease}`}>
        Develop your next decentralized app with{" "}
        <span className={styles.bold}>ease</span>.
      </p>
      <p className={`${styles.sub} ${styles.time}`}>
        Launch it in <span className={styles.bold}>no time</span>.
      </p>

      <Start />
    </div>
  );
}
