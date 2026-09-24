import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, LastUpdated } from "@/components/marketing/content-page";
import { COMPARISONS } from "@/content/comparisons";
import { COMPARE_INDEX as PAGE } from "@/content/pages";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/site";

export const metadata = pageMetadata({ title: PAGE.title, description: PAGE.description, path: PAGE.path });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Compare", path: PAGE.path },
];

export default function CompareIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-10">
      <JsonLd
        data={[
          webPageSchema(PAGE),
          breadcrumbSchema(crumbs),
          {
            "@type": "ItemList",
            itemListElement: COMPARISONS.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.h1,
              url: `${SITE_URL}${c.path}`,
            })),
          },
        ]}
      />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">{PAGE.h1}</h1>
      <p className="mt-6 text-xl leading-relaxed text-neutral-200">{PAGE.lede}</p>
      <div className="mt-4">
        <LastUpdated date={PAGE.updatedAt} />
      </div>
      <ul className="mt-10 space-y-4">
        {COMPARISONS.map((c) => (
          <li key={c.slug}>
            <Link href={c.path} className="block rounded-2xl border border-white/10 p-5 hover:border-white/30">
              <h2 className="text-xl font-semibold text-white">{c.h1}</h2>
              <p className="mt-2 leading-relaxed text-neutral-300">{c.verdict}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
