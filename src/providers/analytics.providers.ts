import { trackEvent as trackEventOrbiter } from "@junobuild/analytics";
import type { DocusaurusConfig } from "@docusaurus/types";

export const trackEvent = async ({
  name,
  metadata,
  siteConfig,
}: {
  name: string;
  metadata?: Record<string, string>
  siteConfig: DocusaurusConfig;
}) => {
  const {
    customFields: { dev },
  } = siteConfig;

  if (dev) {
    return;
  }

  await trackEventOrbiter({
    name,
    metadata
  });

  return true;
};
