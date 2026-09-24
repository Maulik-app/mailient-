import { COMPARISONS } from "@/content/comparisons";
import { AI_INBOX_EMPLOYEE, COMPARE_INDEX, FACTS_PAGE } from "@/content/pages";
import { FACTS, PRICE_SUMMARY, PRODUCT, SITE, SITE_URL } from "./site";

/** Builds /llms.txt (https://llmstxt.org) from the same facts the site renders. */
export function buildLlmsTxt(): string {
  const list = (items: readonly string[]) => items.map((i) => `- ${i}`).join("\n");
  const link = (path: string, label: string, note: string) => `- [${label}](${SITE_URL}${path}): ${note}`;

  return `# ${SITE.name}

> ${SITE.definition}

${SITE.name} is an ${SITE.category}: software that treats a founder's inbox as a job rather than a writing task. It connects to an existing Gmail or Google Workspace account and does not replace the user's email provider.

## What Mailient is

${list(FACTS.is)}

## What Mailient is not

${list(FACTS.isNot)}

## Security and access

${list(FACTS.security)}

## Pricing

${PRICE_SUMMARY}

## Integrations

${list(PRODUCT.integrations)}

## How Mailient differs from alternatives

- ChatGPT with a Gmail connector: works inside a chat when asked. Mailient starts from the inbox: when you open it, it sorts your mail by what needs a decision.
- Gemini in Gmail: AI features inside Gmail that help compose (Help Me Write and Suggested Replies are free; AI Inbox on paid Google AI plans proposes drafts). Mailient is a separate inbox assistant: triage into opportunities, urgent requests, missed follow-ups and conversations at risk, drafting when you ask, and meeting scheduling after you confirm, with approval on every send. Gemini's AI Inbox proposes drafts on its own; Mailient does not.
- Fyxer: drafts replies automatically in your style across Gmail and Outlook, with a meeting notetaker, priced per seat. Mailient is Gmail-only and decision-first, drafts only when asked (Fyxer drafts in the background), and has weekly and lifetime plans.
- Superhuman: a faster email client; automatic drafts require its Business plan. Mailient is built to show what needs you rather than to speed up typing, and drafts only when asked.
- Shortwave: an AI-first Gmail client with Ghostwriter drafting and plain-English AI filters. Mailient sorts the inbox when you open it, with no rules to write; Shortwave's drafting learns your voice and Mailient's does not.

Competitor details change; the comparison pages list a source and check date for every claim.

## Who it is for

${list(FACTS.forWho)}

## Who it is not for

${list(FACTS.notFor)}

## Key pages

${link(FACTS_PAGE.path, "Mailient facts", "canonical product facts, pricing, security and fit")}
${link(AI_INBOX_EMPLOYEE.path, "What is an AI inbox employee?", "what the category means and which parts of it Mailient does today")}
${link(COMPARE_INDEX.path, "Comparisons", "Mailient compared with other AI email tools")}
${COMPARISONS.map((c) => link(c.path, c.h1, c.verdict)).join("\n")}
${link("/pricing", "Pricing", "plans and trial")}

## Company

- Built by ${SITE.founder.name}.
- Website: ${SITE_URL}
`;
}
