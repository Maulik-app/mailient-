import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, FaqSection, LastUpdated } from "@/components/marketing/content-page";
import { PRICING_PAGE as PAGE } from "@/content/pages";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { FACTS, PRICE_SUMMARY, PRODUCT, type Plan } from "@/lib/seo/site";

export const metadata = pageMetadata({ title: PAGE.title, description: PAGE.description, path: PAGE.path });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: PAGE.path },
];

const PLAN_COPY: Record<Plan["id"], { unit: string; note: string }> = {
  weekly: { unit: "/week", note: "For a short crunch, like a fundraise or a launch." },
  monthly: { unit: "/month", note: "The flexible default. Annual billing is discounted." },
  lifetime: { unit: "once", note: "Pay once for lifetime access." },
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-10">
      <JsonLd data={[webPageSchema(PAGE), breadcrumbSchema(crumbs), faqPageSchema(PAGE.faqs, PAGE.path)]} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">{PAGE.h1}</h1>
      <p className="mt-6 max-w-3xl text-xl leading-relaxed text-neutral-200">Mailient costs {PRICE_SUMMARY}</p>
      <div className="mt-4">
        <LastUpdated date={PAGE.updatedAt} />
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {PRODUCT.plans.map((plan) => (
          <li key={plan.id} className="flex flex-col rounded-2xl border border-white/10 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">{plan.name}</h2>
            <p className="mt-4 text-4xl font-bold text-white">
              ${plan.price}
              <span className="ml-1 text-base font-medium text-neutral-500">{PLAN_COPY[plan.id].unit}</span>
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">{PLAN_COPY[plan.id].note}</p>
            <Link
              href="/auth/signup"
              className="mt-6 rounded-full bg-white px-5 py-2 text-center text-sm font-semibold text-black hover:bg-neutral-200"
            >
              Start {PRODUCT.trial.days}-day trial
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-neutral-500">
        Prices in {PRODUCT.currency}. Every plan starts with a {PRODUCT.trial.days}-day trial; a card is required.
      </p>

      <section id="included" className="mt-16 max-w-3xl scroll-mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">What does every Mailient plan include?</h2>
        <p className="mt-4 text-lg leading-relaxed text-neutral-100">
          Every Mailient plan includes the whole product; plans differ only in how you pay.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-neutral-300">
          {FACTS.is.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>Works with {PRODUCT.integrations.join(", ")}.</li>
        </ul>
      </section>

      <div className="max-w-3xl">
        <FaqSection faqs={PAGE.faqs} />
      </div>
    </div>
  );
}
