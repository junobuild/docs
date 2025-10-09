import Changelog from "@site/src/components/Changelog";
import Release from "@site/src/components/Release";
import { GitHubRelease } from "@site/src/types/github";
import type { Props } from "@theme/BlogLayout";
import ReadMoreLink from "@theme/BlogPostItem/Footer/ReadMoreLink";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChangelogPage(
  props: Props & { releases: GitHubRelease[] }
): JSX.Element {
  const { releases } = props;

  return (
    <Changelog {...props}>
      {releases.map(({ tag_name, body, published_at }) => (
        <div key={tag_name} id={tag_name}>
          <Release tag_name={tag_name} published_at={published_at} />

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {body.length > 400 ? `${body.substring(0, 400)}...` : body}
          </ReactMarkdown>

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
