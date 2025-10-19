import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home({ children }): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Head>
      <title>{`${siteConfig.title} | Run ideas in your container`}</title>
      <meta
        content="Juno is an open-source, next-gen serverless platform that helps developers build and ship secure projects at scale."
        name="description"
      />
      <meta content="Juno" property="og:title" />
      <meta content="Run ideas in your container" property="og:description" />
      <meta content="website" property="og:type" />
      <meta content="https://juno.build" property="og:url" />
      <meta
        content="https://juno.build/img/social_image_v11.jpg"
        property="og:image"
      />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="Juno" name="twitter:title" />
      <meta content="Run ideas in your container" name="twitter:description" />
      <meta
        content="https://juno.build/img/social_image_v11.jpg"
        name="twitter:image"
      />
      <meta content="@JunoBuild" name="twitter:creator" />

      {children}
    </Head>
  );
}
