import Guide from "@site/src/components/Guide";
import Angular from "@site/static/icons/angular.svg";
import Astro from "@site/static/icons/astro.svg";
import JavaScript from "@site/static/icons/javascript.svg";
import NextJS from "@site/static/icons/nextjs.svg";
import NodeJS from "@site/static/icons/nodejs.svg";
import ReactLogo from "@site/static/icons/react.svg";
import Rust from "@site/static/icons/rust.svg";
import Svelte from "@site/static/icons/svelte.svg";
import Vue from "@site/static/icons/vue.svg";
import styles from "./styles.module.scss";

export default function Build(): JSX.Element {
  return (
    <div className={styles.section}>
      <h2 className={styles.sub}>Crafted for web devs</h2>
      <p className={styles.build}>
        There are numerous ways to develop on Juno without sacrificing your
        preferred tech stack
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
          title="Use Juno in non-interactive environment with NodeJS."
          link="/docs/guides/nodejs"
          icon={<NodeJS />}
        />

        <Guide
          title="Juno can also be extended with serverless functions written in Rust."
          link="/docs/guides/rust"
          icon={<Rust />}
        />
      </div>
    </div>
  );
}
