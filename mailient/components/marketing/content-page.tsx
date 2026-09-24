import Link from "next/link";
import type { ReactNode } from "react";
import type { ContentPage, Faq, RelatedLink, Section } from "@/content/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, type Crumb } from "@/lib/seo/jsonld";
import { PRODUCT } from "@/lib/seo/site";

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="text-neutral-300">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="hover:text-white">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LastUpdated({ date }: { date: string }) {
  return (
    <p className="text-sm text-neutral-500">
      Last updated <time dateTime={date}>{formatDate(date)}</time>
    </p>
  );
}

export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.h2} id={slugify(s.h2)} className="mt-12 scroll-mt-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">{s.h2}</h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-100">{s.answer}</p>
          {s.body?.map((p) => (
            <p key={p} className="mt-4 leading-relaxed text-neutral-300">
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-neutral-300">
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}

/** Visible FAQ. Pair with faqPageSchema(faqs) so the markup matches what readers see. */
export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faq" className="mt-16 scroll-mt-8">
      <h2 className="text-2xl font-bold tracking-tight text-white">Frequently asked questions</h2>
      <dl className="mt-6 space-y-6">
        {faqs.map((f) => (
          <div key={f.q}>
            <dt className="font-semibold text-white">{f.q}</dt>
            <dd className="mt-2 leading-relaxed text-neutral-300">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function RelatedLinks({ links }: { links: RelatedLink[] }) {
  return (
    <nav aria-label="Related" className="mt-16 border-t border-white/10 pt-8">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">Related</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-neutral-200 underline decoration-white/20 underline-offset-4 hover:decoration-white">
              {l.label}
            </Link>
            {l.note && <span className="text-neutral-500"> — {l.note}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function TrialCta() {
  return (
    <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-lg font-semibold text-white">Put an inbox employee on your Gmail.</p>
      <p className="mt-2 text-sm text-neutral-400">
        {PRODUCT.trial.days}-day trial, card required. Nothing sends without your approval.
      </p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <Link href="/auth/signup" className="rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-neutral-200">
          Start your {PRODUCT.trial.days}-day trial
        </Link>
        <Link href="/pricing" className="rounded-full border border-white/20 px-5 py-2 text-white hover:border-white/50">
          See pricing
        </Link>
      </div>
    </div>
  );
}

type ContentPageViewProps = {
  page: ContentPage;
  crumbs: Crumb[];
  /** Rendered between the lede and the question sections (e.g. a comparison table). */
  intro?: ReactNode;
  /** Rendered after the FAQ, before related links (e.g. sources). */
  appendix?: ReactNode;
};

/** Article layout: answer-first lede, question H2s, FAQ, related links, and matching JSON-LD. */
export function ContentPageView({ page, crumbs, intro, appendix }: ContentPageViewProps) {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-10">
      <JsonLd data={[articleSchema(page), breadcrumbSchema(crumbs), faqPageSchema(page.faqs, page.path)]} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">{page.h1}</h1>
      <p className="mt-6 text-xl leading-relaxed text-neutral-200">{page.lede}</p>
      <div className="mt-4">
        <LastUpdated date={page.updatedAt} />
      </div>
      {intro}
      <Sections sections={page.sections} />
      <TrialCta />
      <FaqSection faqs={page.faqs} />
      {appendix}
      <RelatedLinks links={page.related} />
    </article>
  );
}
