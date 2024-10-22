import Link from "@docusaurus/Link";
import Feature from "@site/src/components/Feature";
import Datastore from "@site/static/icons/Datastore.svg";
import Analytics from "@site/static/icons/analytics.svg";
import Authentication from "@site/static/icons/authentication.svg";
import Functions from "@site/static/icons/functions.svg";
import Hosting from "@site/static/icons/hosting.svg";
import Storage from "@site/static/icons/storage.svg";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CodeBlock from "@theme/CodeBlock";
import { code as authCode } from "@site/src/snippets/auth";
import { code as datastoreCode } from "@site/src/snippets/datastore";

type Snippet =
  | "auth"
  | "datastore"
  | "storage"
  | "hosting"
  | "functions"
  | "analytics";

export default function Snippets(): JSX.Element {
  const [snippet, setSnippet] = useState<Snippet>("auth");

  const lang = "language-javascript";

  const [selectedCode, setSelectedCode] = useState(authCode);

  useEffect(() => {
    switch (snippet) {
      case "datastore": {
        setSelectedCode(datastoreCode);
        break;
      }
      default: {
        setSelectedCode(authCode);
        break;
      }
    }
  }, [snippet])

  return (
    <div className={styles.grid}>
      <ul className={styles.list}>
        <li>
          <button
            onClick={() => setSnippet("auth")}
            className={`${styles.btn} ${snippet === "auth" ? styles.active : ""} button button--juno`}
          >
            <Feature
              title="Authentication"
              text="Ensure maximum security and privacy by using passwordless authentication. Securely and anonymously identify users."
              link={
                <Link to="/docs/build/authentication" className={styles.link}>
                  Learn more
                </Link>
              }
              icon={<Authentication />}
            />
          </button>
        </li>

        <li>
          <button
            onClick={() => setSnippet("datastore")}
            className={`${styles.btn} ${snippet === "datastore" ? styles.active : ""} button button--juno`}
          >
            <Feature
              title="Datastore"
              text="A simple and convenient programming model for storing data on the blockchain."
              link={
                <Link to="/docs/build/datastore" className={styles.link}>
                  Learn more
                </Link>
              }
              icon={<Datastore />}
            />
          </button>
        </li>

        <li>
          <button className={`button button--juno ${styles.btn}`}>
            <Feature
              title="Storage"
              text="Easily store and serve user-generated content, such as files, photos, and videos, on Web3."
              link={
                <Link to="/docs/build/storage" className={styles.link}>
                  Learn more
                </Link>
              }
              icon={<Storage />}
            />
          </button>
        </li>

        <li>
          <button className={`button button--juno ${styles.btn}`}>
            <Feature
              title="Hosting"
              text="Maintain your brand identity with a custom domain for your decentralized application."
              link={
                <Link to="/docs/build/hosting" className={styles.link}>
                  Learn more
                </Link>
              }
              icon={<Hosting />}
            />
          </button>
        </li>

        <li>
          <button className={`button button--juno ${styles.btn}`}>
            <Feature
              title="Functions"
              text="Execute custom code in response to background events, extend Juno's smart contracts, and develop features that run on-chain."
              link={
                <Link to="/docs/build/functions" className={styles.link}>
                  Learn more
                </Link>
              }
              icon={<Functions />}
            />
          </button>
        </li>

        <li>
          <button className={`button button--juno ${styles.btn}`}>
            <Feature
              title="Analytics"
              text="Gather valuable, anonymous user insights with a simple, lightweight, and open-source web analytics that do not use cookies."
              link={
                <Link to="/docs/build/analytics" className={styles.link}>
                  Learn more
                </Link>
              }
              icon={<Analytics />}
            />
          </button>
        </li>
      </ul>

      <div className={styles.code}>
        <CodeBlock className={lang}>{selectedCode}</CodeBlock>
      </div>
    </div>
  );
}
