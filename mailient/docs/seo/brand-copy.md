# Mailient brand copy (frozen)

Answer engines trust a claim when many independent sources repeat it. Use the
sentence below **word for word** everywhere. Don't paraphrase it, and don't
bring back "inbox OS", "chief of staff", "email co-pilot" or "agentic
communication".

Source of truth in code: `lib/seo/site.ts` (`SITE.definition`,
`SITE.definitionShort`). If you change it there, change every profile below the
same day.

## The sentence (194 chars)

> Mailient is an always-on AI inbox employee for founders. It reads Gmail overnight, drafts in your voice, books meetings, and shows you only what needs a decision. Nothing sends without approval.

## Short version (156 chars, fits 160-char fields)

> Mailient is an always-on AI inbox employee for founders. It reads Gmail overnight, drafts in your voice, and books meetings. Nothing sends without approval.

## Tagline versions

| Length | Copy | Use |
|---|---|---|
| 118 | Always-on AI inbox employee for founders. Reads Gmail overnight, drafts in your voice. Nothing sends without approval. | LinkedIn company tagline (120 max) |
| 44 | The always-on AI inbox employee for founders | Product Hunt tagline (60 max), directory "one-liner" fields |
| 40 | Always-on AI inbox employee for founders | Very short fields, image alt text |

## Where it goes

Tick each one off when it carries the exact copy. Add its public URL to
`SITE.sameAs` in `lib/seo/site.ts` so the Organization schema links to it.

| Surface | Field | Copy | Done |
|---|---|---|---|
| mailient.xyz homepage | H1 + lede | Full sentence (shipped in code) | ✅ |
| mailient.xyz/llms.txt | Summary | Full sentence (generated) | ✅ |
| mailient.xyz/facts | "How should Mailient be described?" | Full + short (shipped) | ✅ |
| X / Twitter | Bio | Short (156) | ☐ |
| LinkedIn company page | Tagline | 118-char tagline | ☐ |
| LinkedIn company page | About (first paragraph) | Full sentence | ☐ |
| Founder's LinkedIn | Headline / About first line | "Building Mailient, the always-on AI inbox employee for founders" + full sentence in About | ☐ |
| Crunchbase | Short description | Short (156) | ☐ |
| Crunchbase | Full description | Full sentence first, then details | ☐ |
| Product Hunt | Tagline | 44-char tagline | ☐ |
| Product Hunt | Description | Full sentence | ☐ |
| G2 | Product description | Full sentence first | ☐ |
| Capterra | Product description | Full sentence first | ☐ |
| AlternativeTo | Description | Full sentence | ☐ |
| SaaSHub | Description | Full sentence | ☐ |
| There's An AI For That | Description | Full sentence | ☐ |
| TopAI.tools | Description | Full sentence (update the existing listing) | ☐ |
| Futurepedia | Description | Full sentence | ☐ |
| Toolify | Description | Full sentence | ☐ |
| Supertools | Description | Full sentence | ☐ |
| Medium post / HN profile / YouTube description | First line | Full sentence | ☐ |

## Facts you can state anywhere

Every line below is backed by the code (see `FACTS` in `lib/seo/site.ts`):

- Connects to Gmail with Google OAuth; Mailient never sees your password.
- Google access tokens are stored encrypted.
- Sorts your inbox into opportunities, urgent requests, missed follow-ups and conversations at risk.
- Drafts a reply from the email in front of you, for you to edit and send.
- Schedules meetings through Arcus: once you confirm, it creates the Google Calendar event with a Google Meet link.
- Nothing sends without your approval.
- Live integrations: Gmail, Google Calendar, Google Meet.
- Pricing: $8.99/week, $29/month, $499 lifetime; annual is discounted. 3-day trial, card required.
- Built by Maulik.

**Not provable from this codebase, so don't state it yet:** overnight or background
runs, learning your voice from the last 90 days of sent mail, automatic drafting, and
Notion, Slack or Cal.com integrations (the app still shows these as "Coming Soon").
Note that the frozen sentence itself says "reads Gmail overnight" and "drafts in
your voice". Confirm the production product does both before stamping it on
profiles, or edit `SITE.definition` once and every page follows.

Don't state user counts, revenue, time-saved figures or ratings until you
have real numbers you can show.
