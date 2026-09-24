import Link from "next/link";
import { redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection, RelatedLinks, Sections, TrialCta } from "@/components/marketing/content-page";
import { COMPARISONS } from "@/content/comparisons";
import { HOME } from "@/content/pages";
import { faqPageSchema, webPageSchema } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { PRODUCT } from "@/lib/seo/site";

export const metadata = pageMetadata({
  title: HOME.title,
  description: HOME.description,
  path: HOME.path,
  absoluteTitle: true,
});

type AuthModule = { auth: () => Promise<{ user?: unknown } | null> };

// An auth failure (including lib/auth throwing at import) must never cost crawlers
// the page, so it counts as signed out.
async function isSignedIn() {
  try {
    const { auth } = (await import("@/lib/auth")) as unknown as AuthModule;
    return Boolean((await auth())?.user);
  } catch {
    return false;
  }
}

export default async function HomePage() {
  // Signed-in users keep the old behaviour: "/" hands them to /auth/signin, which
  // routes them to onboarding or the home feed. Everyone else gets the page.
  if (await isSignedIn()) redirect("/auth/signin");

  return (
    <div className="mx-auto max-w-3xl px-5">
      <JsonLd data={[webPageSchema(HOME), faqPageSchema(HOME.faqs, HOME.path)]} />

      <section className="pt-16 md:pt-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">For founders on Gmail</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">{HOME.h1}</h1>
        <p className="mt-6 text-xl leading-relaxed text-neutral-200">{HOME.lede}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <Link href="/auth/signup" className="rounded-full bg-white px-6 py-2.5 font-semibold text-black hover:bg-neutral-200">
            Start your {PRODUCT.trial.days}-day trial
          </Link>
          <Link href="/ai-inbox-employee" className="rounded-full border border-white/20 px-6 py-2.5 text-white hover:border-white/50">
            How it works
          </Link>
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Works with {PRODUCT.integrations.join(", ")}.
        </p>
      </section>

      <Sections sections={HOME.sections} />

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {COMPARISONS.map((c) => (
          <li key={c.slug}>
            <Link
              href={c.path}
              className="block rounded-xl border border-white/10 p-4 text-neutral-200 hover:border-white/30"
            >
              <span className="font-semibold text-white">{c.h1}</span>
              <span className="mt-1 block text-sm text-neutral-400">{c.verdict}</span>
            </Link>
          </li>
        ))}
      </ul>

      <TrialCta />
      <FaqSection faqs={HOME.faqs} />
      <RelatedLinks links={HOME.related} />
    </div>
  );
}
