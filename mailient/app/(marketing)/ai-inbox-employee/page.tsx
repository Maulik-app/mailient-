import { ContentPageView } from "@/components/marketing/content-page";
import { AI_INBOX_EMPLOYEE as PAGE } from "@/content/pages";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: PAGE.title,
  description: PAGE.description,
  path: PAGE.path,
  type: "article",
  publishedTime: PAGE.publishedAt,
  modifiedTime: PAGE.updatedAt,
});

export default function AiInboxEmployeePage() {
  return (
    <ContentPageView
      page={PAGE}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "AI inbox employee", path: PAGE.path },
      ]}
    />
  );
}
