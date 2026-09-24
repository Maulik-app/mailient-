import type { MetadataRoute } from "next";
import { COMPARISONS } from "@/content/comparisons";
import { AI_INBOX_EMPLOYEE, COMPARE_INDEX, FACTS_PAGE, HOME, PRICING_PAGE } from "@/content/pages";
import { SITE_URL } from "@/lib/seo/site";

type Entry = MetadataRoute.Sitemap[number];

const entry = (path: string, lastModified: string, priority: number): Entry => ({
  // Root matches the canonical Next.js emits for "/" (no trailing slash).
  url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  lastModified,
  changeFrequency: "monthly",
  priority,
});

// Only routes this codebase serves. lastModified comes from each page's content entry.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry(HOME.path, HOME.updatedAt, 1),
    entry(AI_INBOX_EMPLOYEE.path, AI_INBOX_EMPLOYEE.updatedAt, 0.9),
    entry(FACTS_PAGE.path, FACTS_PAGE.updatedAt, 0.8),
    entry(COMPARE_INDEX.path, COMPARE_INDEX.updatedAt, 0.7),
    ...COMPARISONS.map((c) => entry(c.path, c.updatedAt, 0.8)),
    entry(PRICING_PAGE.path, PRICING_PAGE.updatedAt, 0.8),
  ];
}
