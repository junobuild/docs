import { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";
import { NotFound as NotFoundContent } from "@site/src/components/NotFound";
import Layout from "@theme/Layout";

export default function NotFound() {
  return (
    <>
      <PageMetadata
        title={translate({
          id: "theme.NotFound.title",
          message: "Page Not Found"
        })}
      />
      <Layout>
        <NotFoundContent />
      </Layout>
    </>
  );
}
