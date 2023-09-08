import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import Feature from "@site/src/components/Feature";
import Svelte from "@site/static/icons/svelte.svg";
import ReactLogo from "@site/static/icons/react.svg";
import Angular from "@site/static/icons/angular.svg";
import JavaScript from "@site/static/icons/javascript.svg";
import NodeJS from "@site/static/icons/nodejs.svg";
import Vue from "@site/static/icons/vue.svg";

export default function Build(): JSX.Element {
  return (
    <>
      <h2 className={styles.sub}>Create with Juno.</h2>
      <p className={styles.build}>
        There are numerous ways to develop your projects without compromising on
        your favorite frontend technologies.
      </p>

      <div className={styles.grid}>
        <Feature
          title="Svelte"
          text="A sample registration form utilizes Juno's Datastore and authentication features, enabling user registration for a beta program."
          link={
            <Link
              href="https://github.com/buildwithjuno/examples/tree/main/svelte/form"
              className={styles.link}
            >
              View code
            </Link>
          }
          icon={<Svelte />}
        />

        <Feature
          title="React"
          text="A diary dapp showcases how users can securely add notes and upload images on the blockchain."
          link={
            <Link
              href="https://github.com/buildwithjuno/examples/blob/main/react/diary"
              className={styles.link}
            >
              View code
            </Link>
          }
          tutorial={
            <Link
              to="/blog/build-a-web3-app-with-react-js"
              className={styles.link}
            >
              Tutorial
            </Link>
          }
          icon={<ReactLogo />}
        />

        <Feature
          title="Angular"
          text="The same decentralized diary application, but built with Angular."
          link={
            <Link
              href="https://github.com/buildwithjuno/examples/blob/main/angular/diary"
              className={styles.link}
            >
              View code
            </Link>
          }
          tutorial={
            <Link
              to="/blog/develop-an-angular-app-on-blockchain"
              className={styles.link}
            >
              Tutorial
            </Link>
          }
          icon={<Angular />}
        />

        <Feature
          title="Vue"
          text="Another iteration of the dapp example developed with Vue."
          link={
            <Link
              href="https://github.com/buildwithjuno/examples/blob/main/vue/diary"
              className={styles.link}
            >
              View code
            </Link>
          }
          tutorial={
            <Link
              to="/blog/build-a-web3-app-with-vuejs"
              className={styles.link}
            >
              Tutorial
            </Link>
          }
          icon={<Vue />}
        />

        <Feature
          title="JavaScript"
          text="This vanilla example showcases most of Juno's features."
          link={
            <Link
              href="https://github.com/buildwithjuno/examples/tree/main/vanilla"
              className={styles.link}
            >
              View code
            </Link>
          }
          icon={<JavaScript />}
        />

        <Feature
          title="NodeJS"
          text="Juno can also be used in command-line interfaces.."
          link={
            <Link
              href="https://github.com/buildwithjuno/examples/blob/main/node/basic"
              className={styles.link}
            >
              View code
            </Link>
          }
          icon={<NodeJS />}
        />
      </div>
    </>
  );
}
