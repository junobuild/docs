import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Hero from "@site/src/components/Hero";
import Features from "@site/src/components/Features";
import Build from "@site/src/components/Build";
import Illustration from "@site/src/components/Illustration";
import Auth from "@site/src/components/Auth";
import Api from "@site/src/components/Api";
import Developer from "@site/src/components/Developer";
import Outro from "@site/src/components/Outro";
import { initOrbiter } from "@junobuild/analytics";
import Head from "@site/src/components/Head";

import styles from "./index.module.scss";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const {
    customFields: { dev },
  } = siteConfig;

  useEffect(() => {
    if (dev) {
      return;
    }

    (async () =>
      initOrbiter({
        satelliteId: "ucnx3-aqaaa-aaaal-ab3ea-cai",
        orbiterId: "3iier-sqaaa-aaaal-aczaa-cai",
      }))();
  }, []);

  return (
    <Layout>
      <Head>
        <link href="https://juno.build" rel="canonical" />
      </Head>

      <div className={styles.home}>
        <section className={`${styles.main}`}>
          <div className="container">
            <Hero />

            <Illustration />
          </div>
        </section>

        <section className={`container ${styles.section}`}>
          <Features />
        </section>

        <section className={`container ${styles.section}`}>
          <Build />
        </section>

        <section className={`container ${styles.block}`}>
          <Auth />

          <Api />

          <Developer />
        </section>

        <section className={`container ${styles.block}`}>
          <Outro />
        </section>
      </div>
    </Layout>
  );
}
