import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function Contact(): JSX.Element {
  // Do not prerender to prevent spam
  // See 2.6 - https://spencermortensen.com/articles/email-obfuscation/
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <h2 className={styles.sub}>Contact</h2>

      <p>
        Have a question or want to get in touch? Send an email to{" "}
        {loaded && <a href="mailto:hi@juno.build">hi@juno.build</a>}
      </p>

      <p>
        For technical questions, bug reports, or implementation help, the&nbsp;
        <a
          href="https://discord.gg/wHZ57Z2RAG"
          rel="noopener nofollower"
          target="_blank"
        >
          Discord
        </a>{" "}
        community is the best place to get quick answers from other developers.
      </p>
    </>
  );
}
