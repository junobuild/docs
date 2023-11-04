import React from "react";
import styles from "./styles.module.scss";
import Guide from "@site/src/components/Guide";
import Svelte from "@site/static/icons/svelte.svg";
import ReactLogo from "@site/static/icons/react.svg";
import Angular from "@site/static/icons/angular.svg";
import JavaScript from "@site/static/icons/javascript.svg";
import NodeJS from "@site/static/icons/nodejs.svg";
import Vue from "@site/static/icons/vue.svg";
import NextJS from "@site/static/icons/nextjs.svg";
import Astro from "@site/static/icons/astro.svg";

export default function Build(): JSX.Element {
  return (
    <>
      <h2 className={styles.sub}>Crafted for JavaScript devs.</h2>
      <p className={styles.build}>
        There are numerous ways to develop your projects without compromising on
        your favorite frontend technologies.
      </p>

      <div className={styles.grid}>
        <Guide
          title="Use Juno with Next.js"
          link="/docs/guides/nextjs"
          icon={<NextJS />}
        />

        <Guide
          title="Use Juno with React"
          link="/docs/guides/React"
          icon={<ReactLogo />}
        />

        <Guide
          title="Use Juno with SvelteKit"
          link="/docs/guides/sveltekit"
          icon={<Svelte />}
        />

        <Guide
          title="Use Juno with Vue"
          link="/docs/guides/vue"
          icon={<Vue />}
        />

        <Guide
          title="Use Juno with Angular"
          link="/docs/guides/angular"
          icon={<Angular />}
        />

        <Guide
          title="Use Juno with Astro"
          link="/docs/guides/astro"
          icon={<Astro />}
        />

        <Guide
          title="A vanilla JavaScript example showcasing most of Juno's features"
          link="https://github.com/junobuild/examples/tree/main/vanilla"
          icon={<JavaScript />}
          external={true}
        />

        <Guide
          title="Juno can also be used in command-line interfaces with NodeJS"
          link="https://github.com/junobuild/examples/blob/main/node/basic"
          icon={<NodeJS />}
          external={true}
        />
      </div>
    </>
  );
}
