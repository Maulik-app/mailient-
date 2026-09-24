# Outreach drafts

These are drafts only; nothing here has been sent. Personalize each one: the
first line should prove you read the recipient's work. Send from your own
address, one at a time, not as a mail merge.

Rules that apply to every message:

- Lead with the data or the tool, never with "check out my startup".
- Use the frozen sentence from `brand-copy.md` whenever you describe Mailient.
- No invented numbers. Each figure below comes from the research or the pricing page.
- One follow-up after 5–7 days, then stop.

---

## 1. Research pitch: journalists and newsletters (target: 30)

**Targets named in the plan:** Security Boulevard, The Register, BleepingComputer,
First Round Review, Indie Hackers, TLDR (and TLDR InfoSec), relevant Beehiiv
newsletters, and "state of email" / deliverability blogs. Find the specific
writer who covered email security or DMARC in the last 6 months; don't use
generic tips@ addresses unless that's the outlet's stated route.

### Paste-ready abstract (check the TODOs before sending)

> On 5 September 2026 we checked the top 50,000 domains on
> [TODO: name the ranking list used]. 36,548 of them receive email. Of those,
> 47.9% (about 17,500 domains) do not publish a DMARC policy that would stop a
> receiving server from delivering a message forged in their name.
> [TODO: state the exact rule, e.g. "no DMARC record, or p=none", exactly as the method section defines it.]
> The full per-domain dataset is available as a CSV, and any domain can be
> re-checked with a free, no-account spoofing checker.

Keep the claim to what was measured: a missing or non-enforcing policy means a
forged message *would not be blocked by DMARC*. It does not mean it *was* forged
or *will* be delivered (receivers apply other filters too).

### Email

**Subject:** 47.9% of top mail-receiving domains don't block forged mail sent in their name

Hi {first name},

{One line on a specific piece they wrote about email security, phishing or DMARC.}

We checked the 36,548 mail-receiving domains in the top 50,000 on 5 September.
47.9% publish no DMARC policy that would stop a forged message from being
delivered. The method, the full CSV and a 5-chart summary are here:
{research URL}.

If it's useful for a piece, I can pull the numbers for a specific sector or
list of companies, or check any domain live: {tool URL}/{domain}.

{Your name}
Mailient — {research URL}

---

## 2. "Best AI email assistant" authors (target: 20)

**Find them:** search for `best AI email assistant 2026`, `Fyxer alternatives`,
`Superhuman alternatives`, `Fyxer vs Lindy`, `AI inbox assistant for founders`,
and the prompts you track in ChatGPT, Perplexity and Gemini. The articles
those engines cite are the targets. Skip listicles that are thin
affiliate pages with no author.

**Before sending:** take one real screenshot of Mailient's triage view
(redact names). One image beats three paragraphs.

**Subject:** A row for "{article title}": the approval-first option

Hi {first name},

Your {article title} compares {two tools they list}. One category it doesn't
cover yet is tools that treat the inbox as a job, deciding what needs you,
rather than a compose helper.

Mailient is an AI inbox assistant for founders. It connects to Gmail, sorts
what needs you, drafts a reply when you ask, and will not send anything until
you approve it. $29/month or $8.99/week; screenshot
attached.

If it fits, a suggested one-liner: "Best for founders on Gmail who want to see
only what needs a decision, with approval on every send." Happy to set up a trial
account if you want to test it first.

{Your name}

---

## 3. Review requests: G2 and Capterra (target: 10 real users)

Ask users who have been active for at least a week. Don't offer anything in
exchange for a positive review: G2 and Capterra both prohibit it, and incentives
of any kind have to be disclosed under their rules. Ask for an honest review.

**Subject:** 2 minutes: would you review Mailient on G2?

Hi {first name},

You've had Mailient on your inbox for {n} weeks, so you know better than
anyone whether it's worth it. Would you write an honest review on G2?
It takes about two minutes: {G2 review link}

Specific details help other founders most: what it handles for you,
and what it still gets wrong.

Thanks,
{Your name}

(Send the Capterra link to a different half of the list rather than asking
the same person twice.)

---

## 4. Free tool outreach: security and deliverability blogs

**Find them:** articles titled "what is DMARC", "SPF DKIM DMARC explained",
"how to check if your domain can be spoofed" that link to a checker. Offer yours
as an additional resource and include the raw data.

**Subject:** A no-account DMARC/spoofing checker for your "{article title}"

Hi {first name},

Your guide to {topic} links readers to {tool they link to}. We published a free
spoofing checker that needs no account and returns a plain-English verdict plus
the exact SPF/DKIM/DMARC records to add: {tool URL}.

It's built on the same scan as our research on the top 50,000 domains (47.9% of
the mail-receiving ones don't block forged mail); the raw CSV is public if
you'd like to cite it: {research URL}.

{Your name}

---

## Tracking

Log every send in one sheet with these columns:

`date | outlet / site | person | URL of their article | pitch type (1–4) | sent? | follow-up date | reply | outcome (link / mention / listing / no) | link URL`

Review weekly. Pitches that land links show you which angle to repeat.
