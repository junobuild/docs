import Link from "@docusaurus/Link";
import Feature from "@site/src/components/Feature";
import { code as analyticsCode } from "@site/src/snippets/analytics";
import { code as authCode } from "@site/src/snippets/auth";
import { code as datastoreCode } from "@site/src/snippets/datastore";
import { code as functionsCode } from "@site/src/snippets/functions";
import { code as hostingCode } from "@site/src/snippets/hosting";
import { code as storageCode } from "@site/src/snippets/storage";
import Analytics from "@site/static/icons/analytics.svg";
import Authentication from "@site/static/icons/authentication.svg";
import Datastore from "@site/static/icons/datastore.svg";
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
            onClick={() => setSnippet("hosting")}
            className={`${styles.btn} ${snippet === "hosting" ? styles.active : ""} button button--juno`}
          >
            <Feature
              title="Hosting"
              text="Static sites, SPA, SSG"
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
            onClick={() => setSnippet("auth")}
            className={`${styles.btn} ${snippet === "auth" ? styles.active : ""} button button--juno`}
          >
            <Feature
              title="Authentication"
              text="Google, GitHub, Passkeys and Internet Identity"
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
              text="Simple key–value store (NoSQL like)"
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
              text="File storage with access control"
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
            onClick={() => setSnippet("functions")}
            className={`${styles.btn} ${snippet === "functions" ? styles.active : ""} button button--juno`}
          >
            <Feature
              title="Functions"
              text="Serverless functions with Rust or TypeScript"
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
              text="Privacy-friendly web analytics"
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
        <CodeBlock className={selectedCode.lang}>
          {selectedCode.value}
        </CodeBlock>
      </div>
    </div>
  );
}
