import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { initOrbiter } from "@junobuild/analytics";
import Build from "@site/src/components/Build";
import Features from "@site/src/components/Features";
import Head from "@site/src/components/Head";
import Hero from "@site/src/components/Hero";
import Newsletter from "@site/src/components/Newsletter";
import Outro from "@site/src/components/Outro";
import Screenshot from "@site/src/components/Screenshot";
import Layout from "@theme/Layout";
import { useEffect } from "react";

import Launch from "@site/src/components/Launch";
import Testimonials from "@site/src/components/Testimonials";
import styles from "./index.module.scss";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const {
    customFields: { dev }
  } = siteConfig;

  useEffect(() => {
    if (dev) {
      return;
    }

    (async () =>
      initOrbiter({
        satelliteId: "ucnx3-aqaaa-aaaal-ab3ea-cai",
        orbiterId: "3iier-sqaaa-aaaal-aczaa-cai"
      }))();
  }, []);

  return (
    <Layout>
      <Head>
        <link href="https://juno.build" rel="canonical" />
      </Head>

      <div className={styles.home}>
        <section className={`container ${styles.main}`}>
          <Hero />

          <Screenshot />
        </section>

        <section className={`container ${styles.section}`}>
          <Features />
        </section>

        <section className={`container ${styles.section}`}>
          <Build />
        </section>

        <section className={`container ${styles.launch}`}>
          <Launch />
        </section>

        <section className={`container ${styles.block}`}>
          <Testimonials />
        </section>

        <section className={`container ${styles.block}`}>
          <Newsletter />
        </section>

        <Outro />
      </div>
    </Layout>
  );
}
