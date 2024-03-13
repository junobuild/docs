import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home({ children }): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Head>
      <title>{`${siteConfig.title} | Build Web3 at Lightning Speed`}</title>
      <meta
        content="Juno is a zero-knowledge blockchain platform that equips developers with all the essential tools to create any Web3 application, making it as easy as developing serverless Web2."
        name="description"
      />
      <meta content="Juno" property="og:title" />
      <meta content="Build Web3 at Lightning Speed" property="og:description" />
      <meta content="website" property="og:type" />
      <meta content="https://juno.build" property="og:url" />
      <meta
        content="https://juno.build/img/social_image_v6.jpg"
        property="og:image"
      />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="Juno" name="twitter:title" />
      <meta
        content="Build Web3 at Lightning Speed"
        name="twitter:description"
      />
      <meta
        content="https://juno.build/img/social_image_v6.jpg"
        name="twitter:image"
      />
      <meta content="@JunoBuild" name="twitter:creator" />

      {children}
    </Head>
  );
}
