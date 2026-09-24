import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonTable } from "@/components/marketing/comparison-table";
import { ContentPageView } from "@/components/marketing/content-page";
import { COMPARISONS, getComparison, MAILIENT_ROW } from "@/content/comparisons";
import { pageMetadata } from "@/lib/seo/metadata";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params) {
  const page = getComparison((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    type: "article",
    publishedTime: page.publishedAt,
    modifiedTime: page.updatedAt,
  });
}

export default async function ComparisonPage({ params }: Params) {
  const page = getComparison((await params).slug);
  if (!page) notFound();

  return (
    <ContentPageView
      page={page}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Compare", path: "/compare" },
        { name: page.h1, path: page.path },
      ]}
      intro={
        <>
          <p className="mt-8 border-l-2 border-white/40 pl-4 text-lg leading-relaxed text-white">{page.verdict}</p>
          <ComparisonTable
            caption={`Mailient vs ${page.competitor.name}. Each cell links to its source and the date it was last checked.`}
            columns={[
              { name: "Mailient", rows: MAILIENT_ROW },
              { name: page.competitor.name, rows: page.rows },
            ]}
          />
        </>
      }
      appendix={
        <section id="sources" className="mt-16 scroll-mt-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">Sources</h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            Plans and prices change often, so every cell in the table above shows its source and when it was last
            checked. Confirm current prices on{" "}
            <a href={page.competitor.pricingUrl} rel="nofollow noopener" className="underline underline-offset-4">
              {page.competitor.name}&apos;s pricing page
            </a>
            . Spotted something out of date? Tell us through the <Link href="/contact" className="underline underline-offset-4">contact page</Link>.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-400">
            {page.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="nofollow noopener" className="underline decoration-white/20 underline-offset-4 hover:decoration-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      }
    />
  );
}
