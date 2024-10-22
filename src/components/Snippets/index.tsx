import Link from "@docusaurus/Link";
import Feature from "@site/src/components/Feature";
import { code as analyticsCode } from "@site/src/snippets/analytics";
import { code as authCode } from "@site/src/snippets/auth";
import { code as datastoreCode } from "@site/src/snippets/datastore";
import { code as functionsCode } from "@site/src/snippets/functions";
import { code as hostingCode } from "@site/src/snippets/hosting";
import { code as storageCode } from "@site/src/snippets/storage";
import Datastore from "@site/static/icons/Datastore.svg";
import Analytics from "@site/static/icons/analytics.svg";
import Authentication from "@site/static/icons/authentication.svg";
import Functions from "@site/static/icons/functions.svg";
import Hosting from "@site/static/icons/hosting.svg";
import Storage from "@site/static/icons/storage.svg";
import CodeBlock from "@theme/CodeBlock";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

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
      case "storage": {
        setSelectedCode(storageCode);
        break;
      }
      case "hosting": {
        setSelectedCode(hostingCode);
        break;
      }
      case "functions": {
        setSelectedCode(functionsCode);
        break;
      }
      case "analytics": {
        setSelectedCode(analyticsCode);
        break;
      }
      default: {
        setSelectedCode(authCode);
        break;
      }
    }
  }, [snippet]);

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
              text="Maximize security and privacy with anonymous user access."
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
              text="Store data in a simple key-value model, organized by collections of documents."
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
          <button
            onClick={() => setSnippet("storage")}
            className={`${styles.btn} ${snippet === "storage" ? styles.active : ""} button button--juno`}
          >
            <Feature
              title="Storage"
              text="Easily upload and serve user-generated content, such as files, and images, on Web3."
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
          <button
            onClick={() => setSnippet("hosting")}
            className={`${styles.btn} ${snippet === "hosting" ? styles.active : ""} button button--juno`}
          >
            <Feature
              title="Hosting"
              text="Hosting powered by blockchain with support for custom domains to maintain your brand identity."
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
          <button
            onClick={() => setSnippet("functions")}
            className={`${styles.btn} ${snippet === "functions" ? styles.active : ""} button button--juno`}
          >
            <Feature
              title="Functions"
              text="Extend Juno's smart contracts and develop custom serverless features."
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
          <button
            onClick={() => setSnippet("analytics")}
            className={`${styles.btn} ${snippet === "analytics" ? styles.active : ""} button button--juno`}
          >
            <Feature
              title="Analytics"
              text="Gather valuable insights with simple, open-source web analytics that don't use cookies."
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
