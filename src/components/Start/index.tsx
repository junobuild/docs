import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { trackEvent } from "../../providers/analytics.providers";

export default function Start({ position }): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Link
      className="button button--hero"
      href="https://console.juno.build"
      target="_self"
      onClick={() =>
        trackEvent({
          name: "start_building",
          metadata: {
            position,
          },
          siteConfig,
        })
      }
    >
      Start building
    </Link>
  );
}
