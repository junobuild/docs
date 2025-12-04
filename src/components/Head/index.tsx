import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home({ children }): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Head>
      <title>{`${siteConfig.title} | Build serverless apps with self-hosting control`}</title>
      <meta
        content="Juno is an open-source serverless platform to build, deploy, and run apps in WASM containers with complete ownership and zero DevOps."
        name="description"
      />
      <meta content="Juno" property="og:title" />
      <meta
        content="Build serverless apps with self-hosting control"
        property="og:description"
      />
      <meta content="website" property="og:type" />
      <meta content="https://juno.build" property="og:url" />
      <meta
        content="https://juno.build/img/social_image_v12.jpg"
        property="og:image"
      />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="Juno" name="twitter:title" />
      <meta
        content="Build serverless apps with self-hosting control"
        name="twitter:description"
      />
      <meta
        content="https://juno.build/img/social_image_v12.jpg"
        name="twitter:image"
      />
      <meta content="@JunoBuild" name="twitter:creator" />

      {children}
    </Head>
  );
}
