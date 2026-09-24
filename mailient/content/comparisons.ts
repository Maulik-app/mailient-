import { PRICE_SUMMARY } from "@/lib/seo/site";
import type { Comparison, ComparisonCell, ComparisonRows, RelatedLink } from "./types";

/**
 * Head-to-head comparison pages.
 *
 * Every table cell names its source and the date it was last checked. Vendor
 * pages beat third-party summaries; where sources conflict or a claim can't be
 * confirmed, say so instead of guessing. Mailient's own cells may only state
 * what the product demonstrably does (see FACTS in lib/seo/site.ts).
 */

const VERIFIED = "2026-09-24";

const cell = (value: string, source: string, lastVerified = VERIFIED): ComparisonCell => ({
  value,
  source,
  lastVerified,
});

export const MAILIENT_ROW: ComparisonRows = {
  worksOnGmail: cell("Yes — connects to your Gmail account with Google OAuth", "/facts#is-mailient-safe-to-connect-to-gmail"),
  unprompted: cell(
    "Partly — sorts your inbox automatically when you open Mailient; drafts only when you ask",
    "/facts#what-is-mailient",
  ),
  approval: cell(
    "Always — every email waits for you to send it; meetings need your confirmation",
    "/facts#what-is-mailient-not",
  ),
  drafting: cell("On request, from the email in front of you; you edit and send", "/facts#what-is-mailient"),
  price: cell("$8.99/week or $29/month; $499 lifetime; 3-day trial (card required)", "/facts#pricing"),
  bestFor: cell("Founders on Gmail who want to see only what needs a decision", "/facts#who-is-mailient-for"),
};

const SRC = {
  fyxerHome: "https://www.fyxer.com/",
  fyxerDrafts: "https://support.fyxer.com/en/articles/11562543-how-fyxer-drafts-your-emails-and-where-to-find-them",
  fyxerNoSend: "https://support.fyxer.com/en/articles/11042871-does-fyxer-ai-send-emails-automatically",
  fyxerWriter: "https://www.fyxer.com/ai-email-writer",
  fyxerPricing: "https://www.fyxer.com/pricing",
  fyxerPricingSummary: "https://www.eesel.ai/blog/fyxer-ai-pricing",
  superhumanPlans: "https://help.superhuman.com/hc/en-us/articles/46005733349517-Pricing-Plans",
  superhumanAutoDrafts: "https://blog.superhuman.com/auto-drafts-2-0/",
  superhumanReview: "https://gmelius.com/blog/superhuman-ai-review",
  superhumanVsGmail: "https://blog.superhuman.com/gmail-vs-superhuman/",
  geminiGmail: "https://workspace.google.com/products/gmail/ai/",
  geminiAiInbox: "https://support.google.com/mail/answer/16845247",
  geminiEra: "https://blog.google/products-and-platforms/products/gmail/gmail-is-entering-the-gemini-era/",
  geminiWorkspacePricing: "https://workspace.google.com/pricing",
  shortwaveHome: "https://www.shortwave.com/",
  shortwaveAssistant: "https://www.shortwave.com/docs/guides/ai-assistant/",
  shortwaveGhostwriter: "https://www.shortwave.com/blog/introducing-ghostwriter-ai-writing-that-learns-from-you/",
  shortwavePricing: "https://www.shortwave.com/pricing/",
};

const related = (self: string): RelatedLink[] =>
  [
    { href: "/ai-inbox-employee", label: "What is an AI inbox employee?" },
    { href: "/compare/mailient-vs-fyxer", label: "Mailient vs Fyxer" },
    { href: "/compare/mailient-vs-superhuman", label: "Mailient vs Superhuman" },
    { href: "/compare/mailient-vs-gemini", label: "Mailient vs Gemini in Gmail" },
    { href: "/compare/mailient-vs-shortwave", label: "Mailient vs Shortwave" },
    { href: "/facts", label: "Mailient facts" },
    { href: "/pricing", label: "Pricing" },
  ].filter((l) => l.href !== self);

export const COMPARISONS: Comparison[] = [
  {
    slug: "mailient-vs-fyxer",
    path: "/compare/mailient-vs-fyxer",
    competitor: { name: "Fyxer", url: SRC.fyxerHome, pricingUrl: SRC.fyxerPricing },
    title: "Mailient vs Fyxer: AI Inbox Assistants Compared",
    description:
      "Mailient vs Fyxer: Fyxer drafts in the background; Mailient sorts what needs you and drafts when asked. Neither sends on its own. Price and fit compared.",
    h1: "Mailient vs Fyxer",
    verdict:
      "Choose Fyxer if you want replies drafted automatically in your style, a team plan, Outlook, or a meeting notetaker. Choose Mailient if you are a founder on Gmail who wants to see only what needs a decision, with meetings scheduled after you confirm and weekly or lifetime pricing.",
    lede:
      "Mailient and Fyxer both work on the inbox you already have and never send email on their own. Fyxer's core is drafting: it sorts mail and writes replies in your style automatically, in the background, across Gmail and Outlook. Mailient's core is deciding: when you open it, it sorts your Gmail by what needs you, then drafts and schedules when you ask.",
    rows: {
      worksOnGmail: cell("Yes — Gmail and Outlook", SRC.fyxerHome),
      unprompted: cell("Yes — sorts incoming mail and drafts replies automatically", SRC.fyxerDrafts),
      approval: cell("Yes — Fyxer drafts but never sends on your behalf", SRC.fyxerNoSend),
      drafting: cell("Automatically, in your writing style", SRC.fyxerWriter),
      price: cell(
        "Starter $30/user/month, or $22.50/month billed annually; 7-day free trial (third-party summary)",
        SRC.fyxerPricingSummary,
      ),
      bestFor: cell("Teams, Outlook users, and people who want AI meeting notes", SRC.fyxerPricingSummary),
    },
    sections: [
      {
        h2: "What is the main difference between Mailient and Fyxer?",
        answer:
          "Fyxer is built around drafting: it writes replies in your style automatically, across Gmail and Outlook, for individuals and teams. Mailient is built around deciding: it sorts your Gmail into opportunities, urgent requests, missed follow-ups and conversations at risk, then helps you reply and schedule.",
        body: [
          "The two agree on the fundamentals: both work on the email account you already use, and both leave the send button to you. Fyxer drafts in the background; Mailient sorts when you open it and drafts when you ask.",
          "If you want an inbox where most replies are already written when you open it, Fyxer does that and Mailient doesn't. If your bottleneck is knowing which threads matter, Mailient is aimed at that.",
        ],
      },
      {
        h2: "When is Fyxer the better choice?",
        answer:
          "Fyxer is the better choice if you want replies drafted automatically in your style, use Outlook, need several people on one plan, or want an AI notetaker for calls. Its Professional plan adds multiple inboxes and HubSpot, which matters for sales-heavy teams.",
        bullets: [
          "You want drafts waiting for you without asking.",
          "Your company runs on Microsoft 365 or Outlook.",
          "You are buying for a team, or want meeting notes captured automatically.",
        ],
      },
      {
        h2: "When is Mailient the better choice?",
        answer:
          "Mailient is the better choice for a founder whose company runs through one Gmail account and who needs a short list of what requires a decision more than a pre-drafted inbox. It schedules meetings on Google Calendar with Google Meet links after you confirm, and offers a $8.99 weekly plan and a $499 lifetime plan.",
        bullets: [
          "You live in Gmail or Google Workspace.",
          "You want missed follow-ups and at-risk conversations surfaced, not just drafted.",
          "You'd rather pay once than pay per seat per month.",
        ],
      },
      {
        h2: "How does Mailient pricing compare with Fyxer?",
        answer: `Mailient costs ${PRICE_SUMMARY} A third-party summary listed Fyxer's Starter plan at $30 per user per month, or $22.50 billed annually, with a 7-day free trial in September 2026; confirm on Fyxer's pricing page.`,
        body: [
          "At the monthly level the two are within a dollar of each other. The difference is shape: Mailient's weekly plan covers a short crunch such as a fundraise, and the lifetime plan costs about the same as 17 months of Mailient's monthly plan.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Fyxer send emails automatically?",
        a: "No. Fyxer's help center says it only drafts and will never send an email on your behalf. Mailient works the same way: nothing sends without your approval.",
      },
      {
        q: "Can I switch from Fyxer to Mailient?",
        a: "Yes. Both connect to Gmail through Google OAuth, so switching means disconnecting one app and connecting the other. Your mailbox stays in Gmail either way.",
      },
      {
        q: "Does Mailient work with Outlook like Fyxer?",
        a: "No. Mailient signs in with Google and works with Gmail and Google Workspace accounts only. If you are on Outlook, Fyxer is the better fit.",
      },
    ],
    related: related("/compare/mailient-vs-fyxer"),
    sources: [
      { label: "Fyxer Help Center — Does Fyxer AI send emails automatically?", url: SRC.fyxerNoSend },
      { label: "Fyxer Help Center — How Fyxer drafts your emails", url: SRC.fyxerDrafts },
      { label: "Fyxer — AI email writer", url: SRC.fyxerWriter },
      { label: "Fyxer — Pricing", url: SRC.fyxerPricing },
      { label: "eesel AI — Fyxer AI pricing 2026 (third-party summary)", url: SRC.fyxerPricingSummary },
    ],
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
  },
  {
    slug: "mailient-vs-superhuman",
    path: "/compare/mailient-vs-superhuman",
    competitor: { name: "Superhuman", url: "https://superhuman.com/", pricingUrl: "https://superhuman.com/plans" },
    title: "Mailient vs Superhuman: AI Email for Founders",
    description:
      "Superhuman is an email client built for speed; Mailient is an AI inbox assistant that shows what needs you. Compare drafting, approval and price.",
    h1: "Mailient vs Superhuman",
    verdict:
      "Choose Superhuman if you want to get through email faster yourself, or want drafts written automatically on its Business plan. Choose Mailient if you want your Gmail sorted by what needs a decision, with drafting and meeting scheduling in the same place.",
    lede:
      "Superhuman and Mailient solve different halves of the email problem. Superhuman is a fast email client for Gmail and Outlook that makes you quicker at working your inbox. Mailient is an AI inbox assistant that sorts your Gmail by what needs a decision and drafts when you ask. Neither sends a reply you haven't approved.",
    rows: {
      worksOnGmail: cell("Yes — Gmail and Outlook accounts, in Superhuman's own app", SRC.superhumanReview),
      unprompted: cell("On Business: Auto Drafts writes replies in the background", SRC.superhumanPlans),
      approval: cell("Yes — Auto Drafts are drafts you review and send", SRC.superhumanAutoDrafts),
      drafting: cell("In your voice; automatic on Business, on request on Starter", SRC.superhumanPlans),
      price: cell("Starter $30/month ($300/year); Business $40/month ($396/year)", SRC.superhumanPlans),
      bestFor: cell("People who want to work through a lot of email faster themselves", SRC.superhumanVsGmail),
    },
    sections: [
      {
        h2: "What is the main difference between Mailient and Superhuman?",
        answer:
          "Superhuman is an email client built for speed, so you still work the inbox, just more quickly. Mailient is an inbox assistant built to show what needs you: it sorts your Gmail into opportunities, urgent requests, missed follow-ups and conversations at risk.",
        body: [
          "Superhuman's value is speed under your own hands: keyboard shortcuts, Split Inbox, reminders and read statuses. Mailient's value is the first pass: knowing which threads matter before you start.",
        ],
      },
      {
        h2: "Does Superhuman draft replies automatically?",
        answer:
          "On its Business plan, yes: Superhuman's Auto Drafts find emails that need a response and write drafts without a prompt. The $30 Starter plan includes Superhuman's on-demand AI writing but not Auto Drafts; Mailient drafts on request, from the email in front of you.",
      },
      {
        h2: "When is Superhuman the better choice?",
        answer:
          "Superhuman fits people who like working their email and want to be faster at it, or who want drafts written automatically. It also supports Outlook, and its Business plan adds HubSpot and Salesforce integrations for sales teams.",
        bullets: [
          "You want a new, faster email client and are happy to learn its shortcuts.",
          "You want drafts waiting for you without asking.",
          "You use Outlook, or need CRM integrations inside your email client.",
        ],
      },
      {
        h2: "When is Mailient the better choice?",
        answer:
          "Mailient fits founders whose time goes on deciding, not typing. It surfaces missed follow-ups and at-risk conversations, drafts replies when you ask, and schedules meetings on Google Calendar with Google Meet links once you confirm.",
        bullets: [
          "Your problem is knowing what matters, not typing speed.",
          "You work in Gmail or Google Workspace.",
          "You want a weekly or lifetime plan.",
        ],
      },
      {
        h2: "How does Mailient pricing compare with Superhuman?",
        answer:
          "Mailient is $29 per month, $8.99 per week, or $499 for lifetime access. Superhuman's help center listed Starter at $30 per month and Business, which includes Auto Drafts, at $40 per month or $396 per year in September 2026.",
      },
    ],
    faqs: [
      {
        q: "Is Mailient a Superhuman alternative?",
        a: "For founders who mainly want to see which emails need a decision, yes, at $29 a month. If you want a faster email client or fully automatic drafts, Superhuman is the stronger fit.",
      },
      {
        q: "Does Superhuman send emails without approval?",
        a: "No. Superhuman's Auto Drafts are drafts that you review and send. Mailient works the same way: nothing sends without your approval.",
      },
      {
        q: "Does Mailient work with Outlook?",
        a: "No. Mailient signs in with Google and works with Gmail and Google Workspace accounts only.",
      },
    ],
    related: related("/compare/mailient-vs-superhuman"),
    sources: [
      { label: "Superhuman Help Center — Pricing Plans", url: SRC.superhumanPlans },
      { label: "Superhuman — Introducing Auto Drafts 2.0", url: SRC.superhumanAutoDrafts },
      { label: "Gmelius — Superhuman AI review (third-party)", url: SRC.superhumanReview },
    ],
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
  },
  {
    slug: "mailient-vs-gemini",
    path: "/compare/mailient-vs-gemini",
    competitor: { name: "Gemini in Gmail", url: SRC.geminiGmail, pricingUrl: SRC.geminiWorkspacePricing },
    title: "Mailient vs Gemini in Gmail (2026 Comparison)",
    description:
      "Gemini is a compose helper inside Gmail. Mailient is a separate inbox assistant: it sorts what needs you, drafts when asked, and never sends alone.",
    h1: "Mailient vs Gemini in Gmail",
    verdict:
      "Gemini helps you write the email in front of you, inside Gmail. Mailient is a separate inbox assistant that sorts what needs you, drafts when you ask, schedules after you say yes, and never sends without your approval. Start with Gemini if help composing is enough; choose Mailient if the inbox itself is the job.",
    lede:
      "Gemini in Gmail is a set of AI features inside Gmail: Help Me Write and Suggested Replies are free, and AI Inbox, on paid Google AI plans, surfaces to-dos and proposes drafts. Mailient is a separate AI inbox assistant: it sorts your inbox into what needs a decision, drafts a reply when you ask, schedules meetings on Google Calendar with Meet links after you say yes, and sends nothing without your approval.",
    rows: {
      worksOnGmail: cell("Yes — built into Gmail", SRC.geminiGmail),
      unprompted: cell(
        "Partly — AI Inbox surfaces to-dos and proposes drafts (Google AI Ultra; rolling out to AI Plus and Pro in the US)",
        SRC.geminiAiInbox,
      ),
      approval: cell(
        "Drafts and suggestions wait for you. Auto-send by any Gemini agent: confirm on Gemini's current plan",
        SRC.geminiAiInbox,
      ),
      drafting: cell(
        "Help Me Write and Suggested Replies, which match how you write; AI Inbox proposes drafts on paid plans",
        SRC.geminiEra,
      ),
      price: cell("Help Me Write and Suggested Replies free; AI Inbox needs a paid Google AI plan", SRC.geminiEra),
      bestFor: cell("Anyone who wants AI help composing inside Gmail without adding a tool", SRC.geminiGmail),
    },
    sections: [
      {
        h2: "What is the main difference between Mailient and Gemini in Gmail?",
        answer:
          "Gemini is a feature inside Gmail; Mailient is a separate product with its own job. Gemini's core tools help you compose the email in front of you, while Mailient works the inbox as a whole: it sorts what needs you, drafts the reply when you ask, and schedules the meeting after you say yes.",
        bullets: [
          "A separate product, not a feature: Mailient gives you one view of only the emails that need a decision: opportunities, urgent requests, missed follow-ups and conversations at risk.",
          "An inbox job, not a compose helper: sorting, follow-up tracking, drafting and scheduling are one workflow rather than buttons in a compose window.",
          "Approval on every action: Mailient never sends an email on its own, and it creates a meeting only after you say yes.",
          "Calendar built in: Mailient's assistant, Arcus, proposes a time and, once you confirm, creates the Google Calendar event with a Google Meet link.",
        ],
      },
      {
        h2: "Can Gemini send email without your approval?",
        answer:
          "Gmail's Gemini features draft and suggest, and you press send. Google keeps adding agent features across its plans, so whether any Gemini agent can send on your behalf is something to confirm on Gemini's current plan; Mailient never sends without your approval.",
      },
      {
        h2: "Doesn't Gemini's AI Inbox already do what Mailient does?",
        answer:
          "Partly, and it's worth saying plainly. Google's AI Inbox surfaces important threads and generates draft replies, but as of September 2026 it is available to Google AI Ultra subscribers and rolling out to AI Plus and Pro subscribers in the US.",
        body: [
          "If AI Inbox already covers what you need, you may not need Mailient. Note that AI Inbox proposes drafts on its own and Mailient drafts only when you ask. Mailient is for founders who want a dedicated inbox product, with follow-up tracking and meeting scheduling in the same place, without a Google AI subscription.",
        ],
      },
      {
        h2: "When is Gemini in Gmail the better choice?",
        answer:
          "Gemini is the better choice if your email load is moderate and you want help writing and summarizing without paying for or learning another product. Its core writing features are free in Gmail, and Google Workspace business plans include Gemini.",
      },
      {
        h2: "When is Mailient the better choice?",
        answer:
          "Mailient is the better choice when your inbox is where your company runs and the cost is deciding, not typing. It brings back only the threads that need a decision, surfaces missed follow-ups, drafts replies when you ask and schedules meetings after you say yes, and it doesn't require a Google AI subscription.",
      },
      {
        h2: "How does Mailient pricing compare with Gemini?",
        answer:
          "Gemini's Help Me Write and Suggested Replies are free in Gmail, and AI Inbox needs a paid Google AI plan. Mailient costs $29 per month, $8.99 per week, or $499 for lifetime access, with a 3-day trial.",
      },
    ],
    faqs: [
      {
        q: "Is Gemini in Gmail free?",
        a: "Partly. Google says Help Me Write, Suggested Replies and AI Overview thread summaries are available to everyone at no cost. Asking your inbox questions and Proofread need Google AI Pro or Ultra, and AI Inbox needs a paid Google AI plan.",
      },
      {
        q: "Can Mailient and Gemini work on the same Gmail account?",
        a: "Yes. Mailient connects through Google OAuth and doesn't change Gmail's own features, so Gemini keeps working alongside it.",
      },
      {
        q: "Does Gemini send emails for you?",
        a: "Gemini in Gmail drafts and suggests; you send. For newer agent features, confirm on Gemini's current plan. Mailient never sends without your approval.",
      },
    ],
    related: related("/compare/mailient-vs-gemini"),
    sources: [
      { label: "Google — Gmail is entering the Gemini era", url: SRC.geminiEra },
      { label: "Gmail Help — Manage to-dos & topics with AI Inbox", url: SRC.geminiAiInbox },
      { label: "Google Workspace — Gemini in Gmail", url: SRC.geminiGmail },
      { label: "Google Workspace — Pricing", url: SRC.geminiWorkspacePricing },
    ],
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
  },
  {
    slug: "mailient-vs-shortwave",
    path: "/compare/mailient-vs-shortwave",
    competitor: { name: "Shortwave", url: SRC.shortwaveHome, pricingUrl: SRC.shortwavePricing },
    title: "Mailient vs Shortwave: AI Gmail Tools Compared",
    description:
      "Shortwave is an AI-first Gmail client with Ghostwriter and AI filters. Mailient is an AI inbox assistant that sorts your Gmail by what needs a decision.",
    h1: "Mailient vs Shortwave",
    verdict:
      "Choose Shortwave if you want an AI-first email client, drafts that learn from your sent mail, and your own automations. Choose Mailient if you want your Gmail sorted by what needs a decision, with scheduling built in and no rules to write.",
    lede:
      "Shortwave and Mailient both work with Gmail. Shortwave is an AI-first email client: an assistant, Ghostwriter drafting that learns from your past sent emails, AI search and AI filters you write in plain English. Mailient is an AI inbox assistant that sorts your Gmail by what needs a decision and drafts and schedules when you ask.",
    rows: {
      worksOnGmail: cell("Yes — Gmail and Google Workspace, in Shortwave's own app", SRC.shortwaveHome),
      unprompted: cell(
        "Partly — AI filters act on incoming mail and can trigger drafts; the assistant works when asked",
        SRC.shortwaveHome,
      ),
      approval: cell("AI drafts wait for you to send; check any automations you set up", SRC.shortwaveAssistant),
      drafting: cell("Ghostwriter drafts in your voice, learned from your past sent emails", SRC.shortwaveGhostwriter),
      price: cell("Free to start; paid plans per seat. Published 2026 figures conflict", SRC.shortwavePricing),
      bestFor: cell("Gmail users who want an AI-first client with strong search and their own automations", SRC.shortwaveHome),
    },
    sections: [
      {
        h2: "What is the main difference between Mailient and Shortwave?",
        answer:
          "Shortwave is an email client: you move your daily email work into its app and use AI as you go, including rules you write yourself. Mailient is an inbox assistant with a fixed job: it sorts your Gmail into what needs a decision and helps you reply and schedule when you ask.",
      },
      {
        h2: "When is Shortwave the better choice?",
        answer:
          "Shortwave is the better choice if you want an AI-first email client, drafts that learn your voice from your sent mail, and plain-English automations. Its AI filters can label, archive or draft for you based on rules you describe.",
      },
      {
        h2: "When is Mailient the better choice?",
        answer:
          "Mailient is the better choice if you'd rather not build rules. When you open it, it sorts your inbox into opportunities, urgent requests, missed follow-ups and conversations at risk, schedules meetings on Google Calendar with Meet links after you confirm, and sends nothing until you approve.",
      },
      {
        h2: "How does Mailient pricing compare with Shortwave?",
        answer:
          "Mailient costs $29 per month, $8.99 per week, or $499 once, with a 3-day trial. Shortwave is free to start and has per-seat paid plans; published figures for its 2026 tiers disagree, so check shortwave.com/pricing for current prices.",
      },
    ],
    faqs: [
      {
        q: "Does Shortwave learn my writing style?",
        a: "Yes. Shortwave says its Ghostwriter learns from your past sent emails. Mailient drafts from the email in front of you, and you edit before sending.",
      },
      {
        q: "Does Mailient replace Gmail?",
        a: "No. Mailient connects to your existing Gmail account and your mailbox stays in Gmail.",
      },
      {
        q: "Does either tool send email automatically?",
        a: "Mailient never sends without your approval. Shortwave's AI drafts wait for you to send; check any automations you set up yourself.",
      },
    ],
    related: related("/compare/mailient-vs-shortwave"),
    sources: [
      { label: "Shortwave — Introducing Ghostwriter", url: SRC.shortwaveGhostwriter },
      { label: "Shortwave Docs — The Shortwave AI Assistant", url: SRC.shortwaveAssistant },
      { label: "Shortwave — Pricing", url: SRC.shortwavePricing },
    ],
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
