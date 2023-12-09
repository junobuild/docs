import React from "react";
import Layout from "@theme/Layout";
import Head from "@site/src/components/Head";
import styles from "./index.module.scss";
import Link from "@docusaurus/Link";
import Spotlight from "@site/src/components/Spotlight";
import json from "../../../showcase.json";
import type { ShowcaseSpotlight } from "@site/src/types/showcase";
import { shuffleArray } from "@site/src/utils/array.utils";

export default function Home(): JSX.Element {
  const buildByPeterPeterParker = ({
    github,
  }: Pick<ShowcaseSpotlight, "github">): boolean =>
    github?.includes("https://github.com/peterpeterparker") ||
    github?.includes("https://github.com/junobuild");

  const dapps = [
    ...shuffleArray(json.filter((dapp) => !buildByPeterPeterParker(dapp))),
    ...shuffleArray(json.filter((dapp) => buildByPeterPeterParker(dapp))),
  ];

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
          href="https://github.com/junobuild/docs#submit-your-work"
          target="_blank"
        >
          🙏 Please add yours
        </Link>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.grid}>
          {dapps.map((data, i) => (
            <Spotlight {...data} key={i} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
