import { useFormFields, useMailChimpForm } from "use-mailchimp-form";
import styles from "./styles.module.scss";

export default function Newsletter(): JSX.Element {
  const mailchimpUrl =
    "https://daviddalbusco.us20.list-manage.com/subscribe/post?u=9b5f83c6cb1006ea8f7225ccb&amp;id=7ec1080aa7&amp;f_id=009126eaf0";

  const { loading, error, success, message, handleSubmit } =
    useMailChimpForm(mailchimpUrl);

  const { fields, handleFieldChange } = useFormFields({
    EMAIL: ""
  });

  return (
    <>
      <h2 className={styles.sub}>Newsletter</h2>
      <p>
        Stay updated with the latest features and significant updates to Juno by
        reading the occasional newsletter.
      </p>

      <div className={styles.action}>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(fields);
          }}
        >
          <input
            id="EMAIL"
            type="email"
            value={fields.EMAIL}
            onChange={handleFieldChange}
            className={styles.input}
            placeholder="dev@gmail.com"
          />

          <button
            type="submit"
            className={`${styles.button} button button--hero`}
          >
            Subscribe
          </button>
        </form>

        <p className={styles.msg}>
          {loading && "Submitting..."}
          {error && message}
          {success && message}
        </p>
      </div>
    </>
  );
}
