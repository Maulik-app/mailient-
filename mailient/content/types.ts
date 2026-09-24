/**
 * Content collection types for the public, indexable pages.
 *
 * Writing rules every entry follows:
 * - `lede` answers the page's query in ~50 words and names Mailient.
 * - Each section `h2` is a question; its `answer` is a standalone 2-sentence
 *   answer that still makes sense when quoted on its own.
 * - `updatedAt` changes only when the substance changes.
 */

export type Faq = { q: string; a: string };

export type Section = {
  h2: string;
  answer: string;
  body?: string[];
  bullets?: string[];
};

export type RelatedLink = { href: string; label: string; note?: string };

export type Source = { label: string; url: string };

export type ContentPage = {
  path: string;
  /** <title> without the " | Mailient" suffix. Keep under ~60 characters with the suffix. */
  title: string;
  /** Meta description. Keep under 155 characters. */
  description: string;
  h1: string;
  lede: string;
  sections: Section[];
  faqs: Faq[];
  related: RelatedLink[];
  publishedAt: string;
  updatedAt: string;
};

export const COMPARISON_ROWS = [
  { key: "worksOnGmail", label: "Works on your existing Gmail?" },
  { key: "unprompted", label: "Works without being prompted?" },
  { key: "approval", label: "Approval before anything sends?" },
  { key: "drafting", label: "How are replies drafted?" },
  { key: "price", label: "Price (as last checked)" },
  { key: "bestFor", label: "Best for" },
] as const;

export type ComparisonRowKey = (typeof COMPARISON_ROWS)[number]["key"];

/**
 * One table cell. Every cell carries where the claim came from and when it was
 * last checked, because competitor plans and prices go stale within weeks.
 */
export type ComparisonCell = {
  value: string;
  /** Absolute URL, or a site path for Mailient's own claims. */
  source: string;
  /** ISO date the value was last checked against `source`. */
  lastVerified: string;
};

export type ComparisonRows = Record<ComparisonRowKey, ComparisonCell>;

export type Comparison = ContentPage & {
  slug: string;
  competitor: { name: string; url: string; pricingUrl: string };
  /** One-line verdict shown under the H1 alongside the lede. */
  verdict: string;
  rows: ComparisonRows;
  /** Supporting reading for the prose sections. */
  sources: Source[];
};
