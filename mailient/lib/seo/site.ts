/**
 * Single source of truth for how Mailient describes itself.
 *
 * Every public surface (metadata, JSON-LD, /llms.txt, /facts, marketing pages)
 * reads from here so the entity description cannot drift. If you change the
 * definition, also update the off-site profiles listed in docs/seo/brand-copy.md.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://mailient.xyz").replace(/\/$/, "");

export const SITE = {
  name: "Mailient",
  url: SITE_URL,
  category: "AI inbox employee",
  /** Frozen canonical definition. Use verbatim. */
  definition:
    "Mailient is an always-on AI inbox employee for founders. It reads Gmail overnight, drafts in your voice, books meetings, and shows you only what needs a decision. Nothing sends without approval.",
  /** Same claim in 156 characters (fits the 160-char X bio): meta descriptions, directory short fields. */
  definitionShort:
    "Mailient is an always-on AI inbox employee for founders. It reads Gmail overnight, drafts in your voice, and books meetings. Nothing sends without approval.",
  homeTitle: "Mailient — AI Inbox Employee for Founders | Runs Gmail While You Build",
  logo: "/mailient-logo.png",
  founder: { name: "Maulik" },
  // TODO: add the X, LinkedIn, Product Hunt, Crunchbase and G2 profile URLs once
  // each profile carries SITE.definition. Unknown handles are left out on purpose.
  sameAs: [] as string[],
} as const;

export type Plan = {
  id: "weekly" | "monthly" | "lifetime";
  name: string;
  price: number;
  period: "week" | "month" | "once";
};

export const PRODUCT = {
  // Only integrations that are live in the product. Others in the app's
  // integrations modal are still marked "Coming Soon".
  integrations: ["Gmail", "Google Calendar", "Google Meet"],
  trial: { days: 3, cardRequired: true },
  currency: "USD",
  // An annual plan also exists and is cheaper than monthly; its exact price is
  // intentionally not stated until confirmed.
  plans: [
    { id: "weekly", name: "Weekly", price: 8.99, period: "week" },
    { id: "monthly", name: "Monthly", price: 29, period: "month" },
    { id: "lifetime", name: "Lifetime", price: 499, period: "once" },
  ] satisfies Plan[],
} as const;

export const PRICE_SUMMARY =
  "$8.99 per week, $29 per month, or $499 once for lifetime access. Annual billing is discounted. Every plan starts with a 3-day trial; a card is required.";

/**
 * Short, checkable claims. Rendered on /facts, in comparison tables and /llms.txt.
 *
 * Every line here must be provable from the code. Deliberately left out until the
 * code shows them: overnight/background runs, learning from sent mail, automatic
 * drafting, and Notion / Slack / Cal.com integrations.
 */
export const FACTS = {
  is: [
    "A separate AI inbox employee that connects to your existing Gmail account.",
    "Sorts your inbox without being asked: opportunities, urgent requests, missed follow-ups and conversations at risk.",
    "Drafts a reply from the email in front of you, for you to edit and send.",
    "Schedules meetings through its assistant, Arcus: once you confirm, it creates the Google Calendar event with a Google Meet link.",
  ],
  isNot: [
    "Not an auto-sender. Every email goes out only when you send it, and meetings are created only after you confirm.",
    "Not a feature inside Gmail. It is a separate app that works on your Gmail account.",
    "Not a team help desk or shared-inbox tool.",
  ],
  security: [
    "Connects with Google OAuth. Mailient never sees your Google password.",
    "Google access tokens are stored encrypted.",
    "Your mailbox stays in Gmail. Mailient keeps some message details (subject, sender, recipients, date, snippet and labels) to power search and triage.",
    "You can revoke access at any time from your Google Account's third-party access page.",
  ],
  forWho: [
    "Founders who run their company out of Gmail.",
    "People whose inbox mixes deals, investors, hiring and customers.",
  ],
  notFor: [
    "People who get very little email.",
    "People who want replies sent automatically with no review.",
    "Teams that need a shared support inbox.",
    "Outlook-only users. Mailient signs in with Google only.",
  ],
} as const;
