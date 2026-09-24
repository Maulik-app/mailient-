import { FACTS, PRICE_SUMMARY, PRODUCT, SITE } from "@/lib/seo/site";
import type { ContentPage } from "./types";

const INTEGRATIONS = PRODUCT.integrations.join(", ");

export const HOME: ContentPage = {
  path: "/",
  title: SITE.homeTitle,
  description: SITE.definitionShort,
  h1: "The AI inbox employee for founders",
  lede: SITE.definition,
  sections: [
    {
      h2: "What does Mailient do?",
      answer:
        "Mailient sorts your Gmail into what needs a decision and helps you act on it: drafting replies, surfacing missed follow-ups and scheduling meetings. Nothing goes out until you approve it.",
      bullets: [
        "Triage: your inbox sorted into opportunities, urgent requests, missed follow-ups and conversations at risk.",
        "Drafts: a reply written from the email in front of you, for you to edit and send.",
        "Meetings: Arcus proposes a time and, once you say yes, creates the Google Calendar event with a Google Meet link.",
        "Ask your inbox: chat with Arcus about what's in your email.",
      ],
    },
    {
      h2: "Does Mailient ever send email on its own?",
      answer:
        "No. Mailient drafts, proposes and prepares, but no email leaves your account until you send it, and no meeting is created until you confirm.",
      body: [
        "Auto-sending saves seconds and risks the one reply that loses a deal. Approval keeps judgment with you and hands off everything around it.",
      ],
    },
    {
      h2: "Who is Mailient for?",
      answer:
        "Mailient is built for founders who run their company out of Gmail, with investors, customers, candidates and vendors in one inbox. It is not for people with light email, people who want replies sent automatically, or teams that need a shared help desk.",
    },
    {
      h2: "What does Mailient cost?",
      answer: `Mailient costs ${PRICE_SUMMARY}`,
    },
    // Keep last: the homepage renders the comparison cards directly under it.
    {
      h2: "How is Mailient different from ChatGPT, Gemini, Fyxer or Superhuman?",
      answer:
        "Unlike ChatGPT with a Gmail connector, Mailient starts from your inbox rather than a question: your mail is already sorted by what needs a decision when you open it. Against dedicated inbox tools the differences are narrower, so we compare them side by side.",
    },
  ],
  faqs: [
    {
      q: "Is Mailient safe to connect to Gmail?",
      a: "Mailient connects with Google OAuth, so it never sees your Google password. Your Google tokens are stored encrypted, and you can revoke access from your Google Account at any time.",
    },
    {
      q: "Will Mailient send an email I haven't seen?",
      a: "No. Every email waits for you to send it. Nothing sends without your approval.",
    },
    {
      q: "Does Mailient work with Outlook?",
      a: "No. Mailient signs in with Google and works with Gmail and Google Workspace accounts.",
    },
    {
      q: "What does Mailient integrate with?",
      a: `Mailient works with ${INTEGRATIONS}.`,
    },
  ],
  related: [
    { href: "/ai-inbox-employee", label: "What is an AI inbox employee?" },
    { href: "/compare", label: "How Mailient compares" },
    { href: "/facts", label: "Mailient facts" },
    { href: "/pricing", label: "Pricing" },
  ],
  publishedAt: "2026-09-24",
  updatedAt: "2026-09-24",
};

export const AI_INBOX_EMPLOYEE: ContentPage = {
  path: "/ai-inbox-employee",
  title: "What Is an AI Inbox Employee?",
  description:
    "An AI inbox employee works your email as a job, not a compose button: it sorts what needs you, drafts, schedules, and waits for approval to send.",
  h1: "What is an AI inbox employee?",
  lede:
    "An AI inbox employee is software that treats your inbox as a job rather than a writing task. It sorts what needs you, surfaces what's slipping, drafts replies and schedules meetings, and hands you the decisions. Mailient is an AI inbox employee for founders on Gmail, and nothing it writes sends without your approval.",
  sections: [
    {
      h2: "How is an AI inbox employee different from an AI email assistant?",
      answer:
        "An AI email assistant waits for you: you open a thread, ask for a draft, and it writes one. An AI inbox employee like Mailient starts from the inbox instead of a prompt: it sorts what needs you and flags what's slipping, so you begin with decisions, not a search.",
      body: [
        "The difference is who starts the work. Assistants, such as a Help Me Write button, a chatbot with a Gmail connector or a writing add-on, save time on each email but still need you to find that email first. For a founder whose inbox mixes investors, customers and hiring, finding and deciding is most of the job. Typing is the easy part.",
      ],
    },
    {
      h2: "Why isn't ChatGPT with a Gmail connector an inbox employee?",
      answer:
        "ChatGPT's Gmail connector works inside a conversation: it reads your mail when you ask it something. Mailient starts from your inbox: when you open it, your mail is already sorted by what needs a decision, and drafting and scheduling happen in the same place.",
      body: [
        "Connectors are useful for questions like \"what did the investor say about the term sheet?\" They are not built to go through every new thread and decide which ones need you. That standing job is what makes something an employee rather than a tool.",
      ],
    },
    {
      h2: "What does Mailient do without being asked?",
      answer:
        "Mailient sorts your Gmail into opportunities, urgent requests, missed follow-ups and conversations at risk. From there you can have it draft a reply or have Arcus schedule the meeting, and nothing goes out until you approve it.",
      bullets: [...FACTS.is],
    },
    {
      h2: "Does an AI inbox employee send email without asking?",
      answer:
        "Mailient does not. Every email waits for you to send it, and Arcus creates a meeting only after you say yes.",
      body: [
        "This is a deliberate line. Auto-sending saves a few seconds per email and risks the one reply that loses a deal or an investor. Approval keeps the part that needs judgment with you and hands off everything around it: reading, sorting, drafting and scheduling.",
        "If you want fully automatic replies with no review, Mailient is the wrong tool.",
      ],
    },
    {
      h2: "Is it safe to give an AI inbox employee access to Gmail?",
      answer:
        "Mailient connects through Google OAuth, so it never sees your password, and you can revoke access from your Google Account at any time. It reads your mail through Google's Gmail API and keeps some message details, such as subject, sender and snippet, to power search and triage.",
      body: [
        "Before connecting any AI email tool, check three things: which permissions it asks for, whether it can send without you, and how you revoke it. Mailient asks for Gmail and Google Calendar access because it reads, drafts, sends when you tell it to, and schedules. It cannot send without your approval, and you revoke it from your Google Account's third-party access page.",
      ],
    },
    {
      h2: "Who should hire an AI inbox employee, and who shouldn't?",
      answer:
        "An AI inbox employee pays off when your inbox is where the company actually runs: investors, customers, candidates and vendors in one Gmail account. It is a poor fit if you get little email, want replies sent automatically, or need a shared team inbox.",
      bullets: [...FACTS.forWho],
    },
  ],
  faqs: [
    {
      q: "Is an AI inbox employee the same as a virtual assistant?",
      a: "It does the inbox work a human assistant would start with, sorting, drafting and scheduling, as software. Unlike a human assistant, Mailient never sends on its own judgment; you approve every email.",
    },
    {
      q: "Does Mailient replace Gmail?",
      a: "No. Mailient connects to your existing Gmail account and your mailbox stays in Gmail. You don't switch email providers.",
    },
    {
      q: "How much does an AI inbox employee cost?",
      a: `Mailient costs ${PRICE_SUMMARY}`,
    },
    {
      q: "Which tools does Mailient integrate with?",
      a: `Mailient works with ${INTEGRATIONS}.`,
    },
  ],
  related: [
    { href: "/compare/mailient-vs-fyxer", label: "Mailient vs Fyxer" },
    { href: "/compare/mailient-vs-gemini", label: "Mailient vs Gemini in Gmail" },
    { href: "/compare/mailient-vs-superhuman", label: "Mailient vs Superhuman" },
    { href: "/facts", label: "Mailient facts" },
    { href: "/pricing", label: "Pricing" },
  ],
  publishedAt: "2026-09-24",
  updatedAt: "2026-09-24",
};

export const FACTS_PAGE = {
  path: "/facts",
  title: "Mailient Facts: What It Is, Pricing, Security",
  description:
    "Checked facts about Mailient: what it does, what it doesn't, Gmail OAuth security, data it keeps, pricing, integrations, and who it's for.",
  h1: "Mailient facts",
  publishedAt: "2026-09-24",
  updatedAt: "2026-09-24",
};

export const COMPARE_INDEX = {
  path: "/compare",
  title: "Mailient vs Fyxer, Superhuman, Gemini & Shortwave",
  description:
    "Side-by-side comparisons of Mailient with Fyxer, Superhuman, Gemini in Gmail and Shortwave, with a source and check date on every claim.",
  h1: "How Mailient compares",
  lede:
    "Mailient is an AI inbox employee for founders on Gmail. These pages compare it with other AI email tools on the same six questions. Every claim links to its source with the date we last checked it, because plans and prices change.",
  updatedAt: "2026-09-24",
};
