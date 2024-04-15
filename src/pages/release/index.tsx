import Changelog from "@site/src/components/Changelog";
import { GitHubRelease } from "@site/src/types/github";
import type { Props } from "@theme/BlogLayout";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./index.module.scss";

export default function Release(
  props: Props & { release: GitHubRelease; releases: GitHubRelease[] }
): JSX.Element {
  const { release } = props;

  const { tag_name, body } = release;

  return (
    <Changelog {...props}>
      <div key={tag_name} id={tag_name}>
        <a href={`/changelog/release-${tag_name}`} className={styles.title}>
          <h1>{tag_name}</h1>
        </a>

        <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>

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
