import Head from "@site/src/components/Head";
import Layout from "@theme/Layout";
import styles from "./index.module.scss";

export default function SponsorshipPage(): JSX.Element {
  return (
    <Layout>
      <Head>
        <link href="https://juno.build/sponsorship" rel="canonical" />
      </Head>

      <section className={styles.container}>
        <h2 className={styles.sub}>Sponsorship</h2>

        <p>
          Juno is fully open source, and we believe in supporting the people who
          make the open-source ecosystem thrive.
        </p>

        <p>
          As part of that commitment, we sponsor a few creators whose work we
          rely on and admire. Our current contributions are modest, but they'll
          grow as we do.
        </p>

        <h3 className={styles.subsub}>Currently sponsoring</h3>

        <ul className={styles.list}>
          <li>
            Colin McDonnell –{" "}
            <a
              href="https://github.com/colinhacks/zod"
              target="_blank"
              rel="noreferrer noopener"
            >
              Zod
            </a>
          </li>
          <li>
            Sindre Sorhus –{" "}
            <a
              href="https://sindresorhus.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              sindresorhus.com
            </a>
          </li>
        </ul>

        <p>
          We're just getting started, and we'll keep expanding this list as Juno
          grows.
        </p>

        <p>
          Want to suggest someone we should support? Get in touch on{" "}
          <a
            href="https://discord.gg/wHZ57Z2RAG"
            target="_blank"
            rel="noreferrer noopener"
          >
            Discord
          </a>{" "}
          or{" "}
          <a
            href="https://oc.app/community/vxgpi-nqaaa-aaaar-ar4lq-cai/?ref=xanzv-uaaaa-aaaaf-aneba-cai"
            target="_blank"
            rel="noreferrer noopener"
          >
            OpenChat
          </a>
          .
        </p>
      </section>
    </Layout>
  );
}
