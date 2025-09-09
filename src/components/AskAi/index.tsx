import { useLocation } from "@docusaurus/router";
import IconMarkdown from "@site/static/icons/markdown.svg";
import styles from "./styles.module.scss";

const AskAiLink = ({ icon, text, link, description }) => {
  return (
    <li>
      <a
        href={link}
        className="dropdown__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.link}>
          {icon}
          <span>{text}</span>
        </span>
        <span className={styles.linkDescription}>{description}</span>
      </a>
    </li>
  );
};

export const AskAi = () => {
  const { pathname } = useLocation();

  const markdownLink = pathname.includes("/category/")
    ? undefined
    : `${pathname}.md`;

  return (
    <div className="dropdown dropdown--hoverable">
      <a
        href="#"
        aria-haspopup="true"
        aria-expanded="false"
        role="button"
        className={`navbar__link breadcrumbs__link ${styles.btn}`}
      >
        Ask AI
      </a>

      <ul className="dropdown__menu">
        {markdownLink !== undefined && (
          <AskAiLink
            icon={<IconMarkdown />}
            link={markdownLink}
            text="View as Markdown"
            description="Open this page in Markdown"
          />
        )}
      </ul>
    </div>
  );
};
