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
import Head from "@docusaurus/Head";
import { initOrbiter } from "@junobuild/analytics";

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
        <title>{`${siteConfig.title} | Build Web3 dApps like Web2`}</title>
        <link href="https://juno.build" rel="canonical" />
        <meta
          content="Build Web3 dApps like Web2 No backend code required. 100% on-chain with minimal carbon impact."
          name="description"
        />
        <meta content="Juno" property="og:title" />
        <meta content="Build Web3 dApps like Web2" property="og:description" />
        <meta content="website" property="og:type" />
        <meta content="https://juno.build" property="og:url" />
        <meta
          content="https://juno.build/img/social_image_v5.jpg"
          property="og:image"
        />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="Juno" name="twitter:title" />
        <meta content="Build Web3 dApps like Web2" name="twitter:description" />
        <meta
          content="https://juno.build/img/social_image_v5.jpg"
          name="twitter:image"
        />
        <meta content="@JunoBuild" name="twitter:creator" />
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
