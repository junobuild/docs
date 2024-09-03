import NewsletterForm from "@site/src/components/NewsletterForm";
import styles from "./styles.module.scss";

export default function Newsletter(): JSX.Element {
  return (
    <>
      <h2 className={styles.sub}>Newsletter</h2>
      <p>
        Stay updated with the latest features and significant updates to Juno by
        reading the occasional newsletter.
      </p>

      <div className={styles.action}>
        <NewsletterForm />
      </div>
    </>
  );
}
