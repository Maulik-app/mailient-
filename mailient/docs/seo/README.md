# SEO / AEO launch: round 1

Goal: make Mailient the canonical entity for "AI inbox employee" and
"always-on AI email assistant for founders". The metrics that matter are indexed
pages, non-brand impressions, referring domains, AI mention rate and organic
trial starts. Domain Rating (DR) is a lagging score, not a KPI.

## What this round ships (in code)

| Item | Where |
|---|---|
| Frozen definition, facts, pricing (single source of truth) | `lib/seo/site.ts` |
| Server-rendered homepage (replaces the JS redirect). Signed-out visitors and crawlers get the full page; signed-in sessions are redirected server-side to `/auth/signin`, which routes them on exactly as before. | `app/(marketing)/page.tsx` |
| `/facts` canonical facts page | `app/(marketing)/facts/page.tsx` |
| `/ai-inbox-employee` category page | `app/(marketing)/ai-inbox-employee/page.tsx`, copy in `content/pages.ts` |
| `/compare` + Fyxer, Superhuman, Gemini, Shortwave, with source + last-verified date on every table cell | `app/(marketing)/compare/`, copy in `content/comparisons.ts` |
| `robots.txt`: search and AI crawlers allowed, app routes blocked | `app/robots.ts` |
| `sitemap.xml` generated from the content collection | `app/sitemap.ts` |
| `/llms.txt` generated from the same facts | `app/llms.txt/route.ts`, `lib/seo/llms.ts` |
| JSON-LD: Organization, WebSite, SoftwareApplication (site-wide); Article, FAQPage, BreadcrumbList, WebPage, ItemList (per page) | `lib/seo/jsonld.ts`, `components/seo/JsonLd.tsx` |
| Title template, canonical, Open Graph, Twitter, share image | `app/layout.jsx`, `lib/seo/metadata.ts`, `app/opengraph-image.tsx` |
| Google / Bing verification tags from env vars | `siteVerification()` in `lib/seo/metadata.ts` |
| Dashboard marked `noindex` | `app/dashboard/layout.tsx` |

## Before you publish: check these

- [ ] **The frozen sentence vs. the product.** Every claim on `/facts`, in comparison tables, in JSON-LD and in `/llms.txt` was checked against this codebase (see `FACTS` in `lib/seo/site.ts`). Claims this checkout does *not* prove were removed: overnight/background runs, learning from 90 days of sent mail, automatic drafting, and Notion / Slack / Cal.com. The frozen sentence (`SITE.definition`, used as the homepage lede and meta description) still says "reads Gmail overnight" and "drafts in your voice". If production proves both, restore the removed facts with a pointer to that code; if not, edit `SITE.definition` once and every surface follows.
- [ ] **Annual price.** The site says "annual billing is discounted" without a number. Add it to `PRODUCT.plans` in `lib/seo/site.ts` once confirmed.
- [ ] **Competitor rows.** Every table cell carries its own `source` URL and `lastVerified` date, rendered under the value. Vendor sites couldn't be fetched from the build environment, so values come from vendor help pages and, for Fyxer pricing, a third-party summary that is labelled as such. Open each source, confirm, and bump that cell's `lastVerified`. Re-check prices monthly.
- [ ] **Shortwave price.** Published 2026 figures conflict, so the page points to shortwave.com/pricing instead of stating a number. Add one only after checking the vendor page.
- [ ] **`/pricing` page in this repo** still has template copy ("Send up to 5 transfers per month", $7.99 / $29.99). It contradicts the real prices. If this repo is what deploys, replace it before submitting the sitemap.
- [ ] **`SITE.sameAs`** is empty. Add each profile URL as it starts carrying the frozen sentence (see `brand-copy.md`).

## Deploy steps (you)

1. **Set env vars** in the hosting dashboard, then redeploy:
   - `NEXT_PUBLIC_SITE_URL=https://mailient.xyz` (defaults to this if unset)
   - `GOOGLE_SITE_VERIFICATION=<content value of Google's HTML tag>`
   - `BING_SITE_VERIFICATION=<content value of Bing's msvalidate.01 tag>`
2. **Google Search Console.** Add a *Domain* property for `mailient.xyz` (DNS TXT record; covers every subdomain and protocol). If you use the URL-prefix property instead, use the HTML-tag method with the env var above. Then Sitemaps → submit `https://mailient.xyz/sitemap.xml`. Use URL Inspection → Request indexing for `/`, `/facts`, `/ai-inbox-employee` and the four `/compare/*` pages.
3. **Bing Webmaster Tools.** Fastest route: "Import from Google Search Console". Otherwise verify with the `msvalidate.01` tag via `BING_SITE_VERIFICATION`. Submit the same sitemap. ChatGPT search leans on Bing's index, so don't skip this.
4. **Check the live output:** `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and view-source on one compare page (the JSON-LD `<script>` tags must be in the HTML). Run one page through Google's Rich Results Test.
5. **Update the off-site profiles** with the frozen sentence: checklist in `brand-copy.md`.

## If production is built from a different repo

This repo has no `/tools`, `/research`, `/security`, `/changelog` or
`/product/arcus`, yet the live site has them, so production is probably built
from other source. Everything in this round is self-contained and ports as-is:

- Copy `lib/seo/`, `content/`, `components/seo/`, `components/marketing/`, `app/(marketing)/`, `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/`, `app/opengraph-image.tsx`.
- Merge the `metadata` export from `app/layout.jsx` and the site-wide `<JsonLd>` into the production root layout.
- If production already has a homepage, keep its design but carry over the title, H1, lede (`SITE.definition`), FAQ and JSON-LD from `app/(marketing)/page.tsx`.
- Add the production-only routes to `app/sitemap.ts` and to "Key pages" in `lib/seo/llms.ts`, especially `/research/email-authentication-2026-q3` and `/tools`.

## Off-site plan for this round, in order

1. Freeze the sentence everywhere: `brand-copy.md`.
2. Ship robots, sitemap, verification, schema, `/llms.txt`, `/facts`: done in code; deploy steps above.
3. Four comparison pages + category page: done in code.
4. Make the research article citeable, then pitch 30 journalists and newsletters: `outreach.md` §1. The research page itself isn't in this repo; it needs an 80-word abstract, method, sample, exclusions, CSV download, charts with captions, a "cite this" block and a link to the checker.
5. Ask 10 users for G2 / Capterra reviews: `outreach.md` §3.
6. Pitch 20 "best AI email 2026" authors: `outreach.md` §2.
7. Only then write blog posts.

## Next round (not in this change)

- `/best-ai-email-assistants-for-founders` roundup (Superhuman, Shortwave, Fyxer, Lindy, Gemini, Inbox Zero, Mailient), `/compare/mailient-vs-lindy`, `/compare/mailient-vs-inbox-zero`, `/ai-email-assistant-for-founders`, `/about`, `/faq`.
- FAQ schema on `/pricing`.
- Weekly measurement doc: Search Console + Bing queries, 25 tracked prompts across ChatGPT, Perplexity, Gemini and AI Overviews (named / cited / absent), referring domains, tool → signup conversion.

## Writing rules for new pages

- The first sentence answers the query and names Mailient.
- Every H2 is a question; the first 40–60 words under it stand alone as an answer.
- Include one original number or screenshot, or none. Never an invented one.
- FAQ at the bottom (rendered visibly *and* as FAQPage schema from the same array).
- Internal links to `/facts`, `/pricing`, comparisons (and `/tools`, `/research` where they exist).
- Bump `updatedAt` only when the substance changes.
