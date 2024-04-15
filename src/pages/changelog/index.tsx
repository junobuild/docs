import Changelog from "@site/src/components/Changelog";
import { GitHubRelease } from "@site/src/types/github";
import type { Props } from "@theme/BlogLayout";
import ReadMoreLink from "@theme/BlogPostItem/Footer/ReadMoreLink";
import clsx from "clsx";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./index.module.scss";

export default function ChangelogPage(
  props: Props & { releases: GitHubRelease[] }
): JSX.Element {
  const { releases } = props;

  return (
    <Changelog {...props}>
      {releases.map(({ tag_name, body }) => (
        <div key={tag_name} id={tag_name}>
          <a href={`/changelog/release-${tag_name}`} className={styles.title}>
            <h1>{tag_name}</h1>
          </a>

          <Markdown remarkPlugins={[remarkGfm]}>
            {body.length > 400 ? `${body.substring(0, 400)}...` : body}
          </Markdown>

          {body.length > 400 && (
            <footer className="row docusaurus-mt-lg">
              <div className={clsx("col text--right")}>
                <ReadMoreLink
                  blogPostTitle={tag_name}
                  to={`/changelog/release-${tag_name}`}
                />
              </div>
            </footer>
          )}

          <hr />
        </div>
      ))}
    </Changelog>
  );
}
