# SEO / AEO launch

Goal: make Mailient the canonical, *accurate* entity for AI inbox triage for
founders on Gmail. The metrics that matter are indexed pages, non-brand
impressions, referring domains, AI mention rate and organic trial starts. Domain
Rating (DR) is a lagging score, not a KPI.

Positioning rule: the site states only what the product code does today. Current
proof is summarized in `FACTS` in `lib/seo/site.ts`. Widen the frozen sentence
only when production code proves more (a background worker that is on, voice
learning from sent mail, automatic drafting, live Notion / Slack / Cal.com).

## Do these in order

### 1. Rotate the leaked credentials (today)

The first commit on `main` (`36e4115`, public repo) contains, in plain text:

| Credential | Was in | Severity |
|---|---|---|
| Supabase `service_role` key | `lib/supabase.js` | Critical: bypasses row-level security. Treat as leaked. |
| Supabase anon key | `lib/supabase.js` | Public by design, but rotate along with the service key. |
| Rube MCP bearer token | `lib/rube-mcp-client.js`, `RUBE_MCP_INTEGRATION_COMPLETE.md` | Rotate with Rube. |

This change removes all three from the code: credentials now come from env vars
only, and the app fails loudly if they're missing. That does **not** remove them
from git history or from anyone who already cloned the repo. Rotation is the fix.

1. Supabase dashboard → Project Settings → API: rotate the JWT secret / API keys so the old `service_role` and `anon` keys stop working. Then update env vars in the hosting dashboard:
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only; never `NEXT_PUBLIC_`).
   - The code also accepts `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`, because the old `ENVIRONMENT_SETUP.md` documented those names. If production was running on the hardcoded fallbacks (env vars unset), set the env vars **before** deploying this change, or every server route will fail at startup.
2. Rotate the Rube MCP token with Rube and set `RUBE_MCP_TOKEN`. (`lib/rube-mcp-client.js` isn't imported anywhere; deleting it is fine.)
3. Client-side exposure: in this repo no `'use client'` component imports `lib/supabase.js` or `lib/rube-mcp-client.js`, directly or through other modules, so the keys were not in browser bundles *here*. Run the same check in the production repo.
4. Optional history purge (hygiene only, since rotation is what protects you). It rewrites `main` and needs a force-push; everyone must re-clone:
   ```bash
   pip install git-filter-repo
   git clone --mirror https://github.com/Maulik-app/mailient-.git && cd mailient-.git
   printf 'regex:eyJhbGciOi[A-Za-z0-9._-]+==>REDACTED\n' > ../secrets.txt
   git filter-repo --replace-text ../secrets.txt
   git push --force --mirror
   ```
   GitHub may keep old commits reachable by SHA until you ask GitHub Support to purge cached views.

### 2. Put this on the repo that actually deploys mailient.xyz

This repo is **not** production: it has no `/tools`, `/research`, `/security`
or current pricing, its last push before this work was January, and its
production build is broken. `Maulik-app/mailient` is empty. `mailient.xyz`
resolves to `64.29.17.1` (a Vercel address, we believe); check Vercel → the
project → Settings → Git for the repo it actually builds from.

Port to that repo (everything is self-contained):

- Copy `lib/seo/`, `content/`, `components/seo/`, `components/marketing/`, `app/(marketing)/`, `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/`, `app/opengraph-image.tsx`, `docs/seo/`.
- Merge into production's `next.config`: `htmlLimitedBots: /.*/`. Without it, Next.js 15 streams `<title>`, description and `rel=canonical` into `<body>` for Googlebot and the AI crawlers (OAI-SearchBot, PerplexityBot, Claude-SearchBot), and Google ignores a canonical outside `<head>`.
- Merge the `metadata` export and site-wide `<JsonLd>` from `app/layout.jsx` into production's root layout.
- Homepage: keep production's design if you like, but carry over the title, H1, lede (`SITE.definition`), FAQ, JSON-LD and the signed-in redirect from `app/(marketing)/page.tsx`.
- Add production-only public routes (`/tools`, each tool, `/research/...`, `/security`) to `app/sitemap.ts` and to "Key pages" in `lib/seo/llms.ts`, and re-check that their copy doesn't contradict `FACTS`.
- Before deploying, confirm production's product matches `FACTS`. If production does more (e.g. an overnight worker that is on), update `FACTS` and `SITE.definition` with a pointer to that code.

### 3. Pricing

`/pricing` is rebuilt from `PRODUCT.plans` (server-rendered, FAQ schema): $8.99/week,
$29/month, $499 lifetime, 3-day trial with card. The template page ("5 transfers
per month", $7.99 / $29.99) is gone. **Open item:** the annual price. The site
says "annual billing is discounted" until you add the number to `PRODUCT.plans`.

### 4. Push

Only after 1–3, and to the production repo.

### 5. Search Console + Bing

1. Set env vars and redeploy: `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` (and `NEXT_PUBLIC_SITE_URL=https://mailient.xyz`, the default).
2. Google Search Console: add a *Domain* property (DNS TXT) or use the HTML tag via the env var. Submit `https://mailient.xyz/sitemap.xml`. Request indexing for `/`, `/facts`, `/ai-inbox-employee`, `/pricing` and the four `/compare/*` pages.
3. Bing Webmaster Tools: "Import from Google Search Console", or verify via `BING_SITE_VERIFICATION`. Submit the same sitemap. ChatGPT search leans on Bing.

### 6. Verify on the live domain

```bash
bash docs/seo/verify-live.sh                 # defaults to https://mailient.xyz
```

It fetches every public page as Googlebot and `/facts` as OAI-SearchBot,
PerplexityBot and Claude-SearchBot, and fails on: non-200, title/canonical not in
`<head>`, missing JSON-LD, noindex on a public page, Mailient claims the code
doesn't support ("reads Gmail overnight", "always-on", 90-day voice learning,
Notion/Slack/Cal.com), template pricing, private routes in the sitemap, public
routes blocked in robots.txt, and FAQ schema that doesn't match the visible FAQ.
Tested: passes on this branch; on the previous commit it flags the overnight
claims, the template pricing and the misplaced metadata.

Then view-source `/` yourself once: the H1 and lede must be in the raw HTML.

## What ships (in code)

| Item | Where |
|---|---|
| Frozen definition, proven facts, pricing (single source of truth) | `lib/seo/site.ts` |
| Server-rendered homepage; signed-in sessions redirect server-side to `/auth/signin` as before | `app/(marketing)/page.tsx` |
| `/facts`, `/ai-inbox-employee` (category guide, including "What doesn't Mailient do yet?") | `app/(marketing)/`, copy in `content/pages.ts` |
| `/compare` + Fyxer, Superhuman, Gemini, Shortwave; every table cell has a source URL and last-verified date | `app/(marketing)/compare/`, `content/comparisons.ts` |
| `/pricing` from `PRODUCT.plans` with FAQ schema | `app/(marketing)/pricing/page.tsx` |
| robots.txt (search + AI crawlers allowed, app routes blocked), sitemap, `/llms.txt` | `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/` |
| JSON-LD: Organization, WebSite, SoftwareApplication; Article, FAQPage, BreadcrumbList, WebPage, ItemList | `lib/seo/jsonld.ts`, `components/seo/JsonLd.tsx` |
| Metadata always in `<head>` | `next.config.ts` (`htmlLimitedBots`) |
| Dashboard `noindex` | `app/dashboard/layout.tsx` |
| Credentials from env only | `lib/supabase.js`, `lib/rube-mcp-client.js`, `ENVIRONMENT_SETUP.md` |

## Recurring checks

- **Competitor cells:** open each `source`, confirm, bump that cell's `lastVerified`. Monthly at least; prices go stale fast. Fyxer's price is from a third-party summary and labelled as such; Shortwave's is deliberately not stated because 2026 sources conflict.
- **`SITE.sameAs`:** add each profile URL once it carries the frozen sentence (`brand-copy.md`).

## Off-site, after the above

1. Update profiles with the new sentence: `brand-copy.md`.
2. Make the research article citeable, then pitch journalists and newsletters: `outreach.md` §1 (the research page lives in the production repo).
3. Ask 10 real users for G2 / Capterra reviews: `outreach.md` §3.
4. Pitch "best AI email 2026" authors: `outreach.md` §2.
5. Only then write blog posts.

## Writing rules for new pages

- The first sentence answers the query and names Mailient.
- Every H2 is a question; the first 40–60 words under it stand alone as an answer.
- Mailient claims must match `FACTS`. Say where a competitor is stronger.
- One original number or screenshot, or none. Never an invented one.
- FAQ at the bottom, rendered visibly *and* as FAQPage schema from the same array.
- Bump `updatedAt` only when the substance changes.
