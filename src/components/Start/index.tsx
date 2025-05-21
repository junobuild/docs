import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ReactNode } from "react";
import { trackEvent } from "../../providers/analytics.providers";

type StartProps = {
  position: string;
  className?: string;
  children: ReactNode;
};

export default function Start({
  position,
  className = "",
  children
}: StartProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const utmSource = queryParams.get("utm_source");

  return (
    <Link
      className={`button button--hero ${className}`}
      href="https://console.juno.build"
      target="_self"
      onClick={() =>
        trackEvent({
          name: "start_building",
          metadata: {
            position,
            ...(utmSource && utmSource !== "" ? { utm_source: utmSource } : {})
          },
          siteConfig
        })
      }
    >
      {children}
    </Link>
  );
}
