import styles from "./styles.module.scss";

export default function Newsletter(): JSX.Element {
  return (
    <>
      <h2 className={styles.sub}>Newsletter</h2>
      <p>Stay updated with the latest features and significant updates to Juno by reading the occasional newsletter.</p>
      <form
        action="https://daviddalbusco.us20.list-manage.com/subscribe/post?u=9b5f83c6cb1006ea8f7225ccb&amp;id=7ec1080aa7&amp;f_id=009126eaf0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_self"
        noValidate={true}
        className={styles.form}
      >
        <input
          type="email"
          name="EMAIL"
          id="mce-EMAIL"
          required={true}
          className={styles.input}
          placeholder="dev@gmail.com"
        />

        <div
          style={{ position: "fixed", left: "-5000px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_9b5f83c6cb1006ea8f7225ccb_7ec1080aa7"
            tabIndex={-1}
            defaultValue=""
          />
        </div>

        <button type="submit" className={`${styles.button} button button--hero`}>Subscribe</button>
      </form>
    </>
  );
}
