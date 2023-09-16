import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import Feature from "@site/src/components/Feature";
import Authentication from "@site/static/icons/authentication.svg";
import Datastore from "@site/static/icons/datastore.svg";
import Storage from "@site/static/icons/storage.svg";
import Hosting from "@site/static/icons/hosting.svg";
import Analytics from "@site/static/icons/analytics.svg";

export default function Features(): JSX.Element {
  return (
    <>
      <h3 className={styles.sub}>No backend code required.</h3>
      <p>100% on-chain with minimal carbon impact.</p>

      <div className={styles.grid}>
        <Feature
          title="Authentication"
          text="Ensure maximum security and privacy by using passwordless authentication to securely and anonymously identify users."
          link={
            <Link to="/docs/build/authentication" className={styles.link}>
              Learn more
            </Link>
          }
          icon={<Authentication />}
        />

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
      </div>
    </>
  );
}
