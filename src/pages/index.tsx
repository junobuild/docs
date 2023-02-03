import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Hero from "@site/src/components/Hero";
import Illustration from "@site/src/components/Illustration";
import Head from "@docusaurus/Head";

import styles from "./index.module.scss";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <Head>
        <title>{`${siteConfig.title} | Build web3 apps`}</title>
        <meta
          name="description"
          content="Build web3 apps faster than ever. No backend code required. 100% on-chain with minimal carbon impact."
        />
      </Head>
      <main className={`${styles.main}`}>
        <section className={`container ${styles.section}`}>
          <Hero />

          <Illustration />
        </section>
      </main>
    </Layout>
  );
}
