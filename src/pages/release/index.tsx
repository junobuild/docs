import Changelog from "@site/src/components/Changelog";
import { Markdown } from "@site/src/components/Markdown";
import Release from "@site/src/components/Release";
import { GitHubRelease } from "@site/src/types/github";
import type { Props } from "@theme/BlogLayout";
import styles from "./index.module.scss";

export default function ReleasePage(
  props: Props & {
    release: GitHubRelease | undefined;
    releases: GitHubRelease[];
  }
): JSX.Element {
  const { release } = props;

  const { tag_name, body, published_at } = release ?? {
    tag_name: "",
    body: "",
    published_at: new Date().toISOString()
  };

  return (
    <Changelog {...props}>
      <div key={tag_name} id={tag_name}>
        <Release tag_name={tag_name} published_at={published_at} />

        <Markdown body={body} />

        <footer className="row docusaurus-mt-lg">
          <div className="col text--left">
            <a
              aria-label="Open on GitHub"
              href={`https://github.com/junobuild/juno/releases/tag/${tag_name}`}
              rel="noopener noreferrer"
              className={styles.link}
            >
              Open on GitHub{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </Changelog>
  );
}
