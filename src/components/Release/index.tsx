import { GitHubRelease } from "@site/src/types/github";
import styles from "./index.module.scss";

export default function Changelog({
  tag_name,
  published_at
}: Pick<GitHubRelease, "tag_name" | "published_at">): JSX.Element {
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(published_at));

  return (
    <>
      <a href={`/changelog/release-${tag_name}`} className={styles.title}>
        <h1>{tag_name}</h1>
      </a>

      <p className={styles.date}>
        <time>{date}</time>
      </p>
    </>
  );
}
