import { trackEvent as trackEventOrbiter } from "@junobuild/analytics";
import type { DocusaurusConfig } from "@docusaurus/types";

export const trackEvent = async ({
  name,
  metadata,
  siteConfig,
}: {
  name: string;
  metadata?: Record<string, string>;
  siteConfig: DocusaurusConfig;
}): Promise<boolean> => {
  const {
    customFields: { dev },
  } = siteConfig;

  if (dev) {
    return false;
  }

  await trackEventOrbiter({
    name,
    metadata,
  });

  return true;
};
