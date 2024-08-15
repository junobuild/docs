import Head from "@site/src/components/Head";
import Newsletter from "@site/src/components/Newsletter";
import Layout from "@theme/Layout";
import styles from "./index.module.scss";

export default function NewsletterPage(): JSX.Element {
  return (
    <Layout>
      <Head>
        <link href="https://juno.build/newsletter" rel="canonical" />
      </Head>

      <section className={styles.container}>
        <Newsletter />

        <p>
          <small>
            * We use{" "}
            <a
              href="https://mailchimp.com/"
              rel="noopener noreferrer"
              aria-label="Open Mailchimp in a new window"
              target="_blank"
            >
              Mailchimp
            </a>{" "}
            to manage and send our emails.
          </small>
        </p>
      </section>
    </Layout>
  );
}
