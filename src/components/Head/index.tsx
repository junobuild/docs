import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";

export default function Home({ children }): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Head>
      <title>{`${siteConfig.title} | Build Web3 dApps like Web2`}</title>
      <meta
        content="Juno is a zero-knowledge blockchain platform that equips developers with all the essential tools to create any Web3 application, making it as easy as developing serverless Web2."
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

      {children}
    </Head>
  );
}
