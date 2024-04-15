import {
  BlogSidebarItem,
  BlogSidebar as BlogSidebarType
} from "@docusaurus/plugin-content-blog";
import { GitHubRelease } from "@site/src/types/github";
import type { Props } from "@theme/BlogLayout";
import BlogSidebar from "@theme/BlogSidebar";
import Layout from "@theme/Layout";
import clsx from "clsx";

export default function Changelog(
  props: Props & { releases: GitHubRelease[] }
): JSX.Element {
  const { toc, children, releases, ...layoutProps } = props;
  const hasSidebar = true;

  const sidebarItems: BlogSidebarItem[] = releases.map(({ tag_name }) => ({
    title: tag_name,
    permalink: `/changelog#${tag_name}`,
    unlisted: false
  }));

  let sidebar: BlogSidebarType = {
    items: sidebarItems,
    title: "Releases"
  };

  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--lg">
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx("col", {
              "col--7": hasSidebar,
              "col--9 col--offset-1": !hasSidebar
            })}
          >
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
