import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import IconMarkdown from "@site/static/icons/markdown.svg";
import IconClaude from "@site/static/icons/claude.svg";
import IconOpenAI from "@site/static/icons/openai.svg";
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

  const isCategory = pathname.includes("/category/");

  if (isCategory) {
    return <></>;
  }

  const {
    siteConfig: { url }
  } = useDocusaurusContext();

  const markdownLink = `${pathname}.md`;

  const prompt = encodeURIComponent(`Read from this URL: ${url}${pathname}`);
  const claudeLink = `https://claude.ai/new?q=${prompt}`;
  const chatGPTLink = `https://chatgpt.com/?prompt=${prompt}`;

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
          link={markdownLink}
          text="View as Markdown"
          description="Open this page in Markdown"
        />

        <AskAiLink
          icon={<IconClaude />}
          link={claudeLink}
          text="Open in Claude"
          description="Ask questions about this page"
        />

        <AskAiLink
          icon={<IconOpenAI />}
          link={chatGPTLink}
          text="Open in ChatGPT"
          description="Ask questions about this page"
        />
      </ul>
    </div>
  );
};
