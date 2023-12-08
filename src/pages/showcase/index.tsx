import React from "react";
import Layout from "@theme/Layout";
import Head from "@site/src/components/Head";
import styles from "./index.module.scss";
import Link from "@docusaurus/Link";
import Spotlight from "@site/src/components/Spotlight";

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <link href="https://juno.build/showcase" rel="canonical" />
      </Head>

      <section className={styles.intro}>
        <h1>Showcase</h1>

        <p>List of dApps devs are building with Juno.</p>

        <Link
          className="button button--hero"
          href="https://console.juno.build"
          target="_blank"
        >
          🙏 Please add yours
        </Link>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.grid}>
          <Spotlight
            title="Proposals.network"
            text="Browse and submit proposals on ICP"
            img="https://proposals.network/images/meta-share.jpg"
            url="https://proposals.network"
          />
        </div>
      </section>
    </Layout>
  );
}
