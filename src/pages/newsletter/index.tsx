import Head from "@site/src/components/Head";
import Layout from "@theme/Layout";
import Newsletter from "@site/src/components/Newsletter";
import styles from "./index.module.scss";

export default function NewsletterPage(): JSX.Element {
  return (
    <Layout>
      <Head>
        <link href="https://juno.build/newsletter" rel="canonical" />
      </Head>

      <section className={styles.container}>
        <Newsletter />
      </section>
    </Layout>
  );
}
