import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { trackEvent } from "../../providers/analytics.providers";

type StartProps = {
  position: string;
  className?: string;
};

export default function Start({
  position,
  className = ""
}: StartProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Link
      className={`button button--hero ${className}`}
      href="https://console.juno.build"
      target="_self"
      onClick={() =>
        trackEvent({
          name: "start_building",
          metadata: {
            position
          },
          siteConfig
        })
      }
    >
      Start building
    </Link>
  );
}
