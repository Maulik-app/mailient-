import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

// Authenticated app surfaces. Nothing here should be crawled or cited.
const PRIVATE_PATHS = [
  "/api/",
  "/app/",
  "/dashboard",
  "/settings",
  "/home-feed",
  "/notifications",
  "/onboarding",
  "/i/",
  "/aether/",
];

// Search and answer-engine crawlers named explicitly so a future change to the
// "*" group can't silently hide Mailient from AI search. A crawler that matches
// a named group ignores "*", so each group repeats the private paths.
const NAMED_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: NAMED_CRAWLERS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
