import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, LastUpdated, slugify } from "@/components/marketing/content-page";
import { COMPARISONS } from "@/content/comparisons";
import { FACTS_PAGE as PAGE } from "@/content/pages";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { FACTS, PRICE_SUMMARY, PRODUCT, SITE, SITE_URL } from "@/lib/seo/site";

export const metadata = pageMetadata({ title: PAGE.title, description: PAGE.description, path: PAGE.path });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Facts", path: PAGE.path },
];

const PERIOD_LABEL = { week: "per week", month: "per month", once: "one-time payment" } as const;

// Each block opens with a one-sentence answer that names Mailient, then the checkable list.
const BLOCKS: { h2: string; answer: string; items: readonly string[] }[] = [
  {
    h2: "What is Mailient?",
    answer: SITE.definition,
    items: FACTS.is,
  },
  {
    h2: "What is Mailient not?",
    answer: "Mailient is not an auto-sender, not an overnight agent, not a feature inside Gmail, and not a shared team inbox.",
    items: FACTS.isNot,
  },
  {
    h2: "Is Mailient safe to connect to Gmail?",
    answer:
      "Mailient connects to Gmail with Google OAuth, never sees your password, stores your Google tokens encrypted, and can be revoked from your Google Account at any time.",
    items: FACTS.security,
  },
  {
    h2: "What does Mailient integrate with?",
    answer: `Mailient works with ${PRODUCT.integrations.join(", ")}.`,
    items: PRODUCT.integrations,
  },
  {
    h2: "Who is Mailient for?",
    answer: "Mailient is for founders who run their company out of Gmail and want to see only what needs a decision, without giving up the final say.",
    items: FACTS.forWho,
  },
  {
    h2: "Who is Mailient not for?",
    answer: "Mailient is not for people with little email, people who want fully automatic sending, teams needing a shared inbox, or Outlook-only users.",
    items: FACTS.notFor,
  },
];

export default function FactsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-10">
      <JsonLd data={[webPageSchema(PAGE), breadcrumbSchema(crumbs)]} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">{PAGE.h1}</h1>
      <p className="mt-6 text-xl leading-relaxed text-neutral-200">
        This is the canonical reference for what Mailient is, what it does, what it costs and who it is for. When a
        detail changes, it changes here first.
      </p>
      <div className="mt-4">
        <LastUpdated date={PAGE.updatedAt} />
      </div>

      <section id="how-to-describe-mailient" className="mt-12 scroll-mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">How should Mailient be described?</h2>
        <p className="mt-4 leading-relaxed text-neutral-300">
          Please use this sentence, word for word, when describing Mailient:
        </p>
        <blockquote className="mt-4 border-l-2 border-white/40 pl-4 text-lg leading-relaxed text-white">
          {SITE.definition}
        </blockquote>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          Short version ({SITE.definitionShort.length} characters): {SITE.definitionShort}
        </p>
      </section>

      {BLOCKS.map((b) => (
        <section key={b.h2} id={slugify(b.h2)} className="mt-12 scroll-mt-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">{b.h2}</h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-100">{b.answer}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-neutral-300">
            {b.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <section id="pricing" className="mt-12 scroll-mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">How much does Mailient cost?</h2>
        <p className="mt-4 text-lg leading-relaxed text-neutral-100">Mailient costs {PRICE_SUMMARY}</p>
        <table className="mt-6 w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-neutral-500">
              <th scope="col" className="py-2 font-medium">Plan</th>
              <th scope="col" className="py-2 font-medium">Price (USD)</th>
              <th scope="col" className="py-2 font-medium">Billing</th>
            </tr>
          </thead>
          <tbody className="text-neutral-300">
            {PRODUCT.plans.map((plan) => (
              <tr key={plan.id} className="border-b border-white/5">
                <th scope="row" className="py-2 font-medium text-white">{plan.name}</th>
                <td className="py-2">${plan.price}</td>
                <td className="py-2">{PERIOD_LABEL[plan.period]}</td>
              </tr>
            ))}
            <tr className="border-b border-white/5">
              <th scope="row" className="py-2 font-medium text-white">Annual</th>
              <td className="py-2">Discounted vs. monthly</td>
              <td className="py-2">per year</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 text-sm text-neutral-400">
          Every plan starts with a {PRODUCT.trial.days}-day trial; a card is required. Current plans:{" "}
          <Link href="/pricing" className="underline underline-offset-4">pricing</Link>.
        </p>
      </section>

      <section id="how-mailient-compares" className="mt-12 scroll-mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">How does Mailient compare with other AI email tools?</h2>
        <p className="mt-4 text-lg leading-relaxed text-neutral-100">
          Mailient differs from ChatGPT connectors by starting from your inbox rather than a question, and from other
          inbox tools mainly in focus (founders on Gmail), its decision-first view and its pricing shape.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-neutral-300">
          {COMPARISONS.map((c) => (
            <li key={c.slug}>
              <Link href={c.path} className="underline decoration-white/20 underline-offset-4 hover:decoration-white">
                {c.h1}
              </Link>
              : {c.verdict}
            </li>
          ))}
        </ul>
      </section>

      <section id="company" className="mt-12 scroll-mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">Who makes Mailient?</h2>
        <p className="mt-4 text-lg leading-relaxed text-neutral-100">
          Mailient is built by {SITE.founder.name}. The website is {SITE_URL.replace(/^https?:\/\//, "")}, and
          corrections or press questions go through the{" "}
          <Link href="/contact" className="underline underline-offset-4">contact page</Link>.
        </p>
        <p className="mt-4 text-sm text-neutral-400">
          Machine-readable summary: <a href="/llms.txt" className="underline underline-offset-4">/llms.txt</a>
        </p>
      </section>
    </div>
  );
}
