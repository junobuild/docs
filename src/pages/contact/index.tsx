import Contact from "@site/src/components/Contact";
import Head from "@site/src/components/Head";
import Layout from "@theme/Layout";
import styles from "./index.module.scss";

export default function ContactPage(): JSX.Element {
  return (
    <Layout>
      <Head>
        <link href="https://juno.build/newsletter" rel="canonical" />
      </Head>

      <section className={styles.container}>
        <Contact />
      </section>
    </Layout>
  );
}
