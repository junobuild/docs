import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { trackEvent } from "@site/src/providers/analytics.providers";
import IconClaude from "@site/static/icons/claude.svg";
import IconMarkdown from "@site/static/icons/markdown.svg";
import IconOpenAI from "@site/static/icons/openai.svg";
import styles from "./styles.module.scss";

const AskAiLink = ({ icon, text, link, description, pathname, eventName }) => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <li>
      <a
        href={link}
        className="dropdown__link"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent({
            name: eventName,
            metadata: {
              pathname
            },
            siteConfig
          })
        }
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

  // Some URL such as https://juno.build/docs/build/authentication/ ends with a slash
  const cleanPathname = pathname.replace(/\/+$/, "");

  const markdownLink = `${cleanPathname}.md`;

  const prompt = encodeURIComponent(
    `Read from this URL: ${url}${cleanPathname}`
  );
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
        onClick={($event) => $event.preventDefault()}
      >
        Ask AI
      </a>

      <ul className="dropdown__menu">
        <AskAiLink
          icon={<IconMarkdown />}
          link={markdownLink}
          pathname={cleanPathname}
          text="View as Markdown"
          description="Open this page in Markdown"
          eventName="ask_ai_view_markdown"
        />

        <AskAiLink
          icon={<IconClaude />}
          link={claudeLink}
          pathname={cleanPathname}
          text="Open in Claude"
          description="Ask questions about this page"
          eventName="ask_ai_claude"
        />

        <AskAiLink
          icon={<IconOpenAI />}
          link={chatGPTLink}
          pathname={cleanPathname}
          text="Open in ChatGPT"
          description="Ask questions about this page"
          eventName="ask_ai_chatgpt"
        />
      </ul>
    </div>
  );
};
