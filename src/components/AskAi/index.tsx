import styles from "./styles.module.scss";
import IconMarkdown from "@site/static/icons/markdown.svg";

const AskAiLink = ({ icon, text, link, description }) => {
  return (
    <li>
      <a href={link} className="dropdown__link">
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
        <AskAiLink
          icon={<IconMarkdown />}
          link="/something"
          text="View as Markdown"
          description="Open this page in Markdown"
        />
      </ul>
    </div>
  );
};
