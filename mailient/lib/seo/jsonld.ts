import type { ContentPage, Faq } from "@/content/types";
import { PRODUCT, SITE, SITE_URL } from "./site";

/**
 * schema.org builders. Entities reference each other by @id so the whole site
 * describes one Organization and one SoftwareApplication.
 */

type Schema = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#software`;

const abs = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export function organizationSchema(): Schema {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: abs("/"),
    logo: { "@type": "ImageObject", url: abs(SITE.logo) },
    description: SITE.definition,
    founder: { "@type": "Person", name: SITE.founder.name },
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: abs("/contact") },
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

export function websiteSchema(): Schema {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: abs("/"),
    description: SITE.definition,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function softwareApplicationSchema(): Schema {
  return {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE.name,
    url: abs("/"),
    description: SITE.definition,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: SITE.category,
    operatingSystem: "Web",
    publisher: { "@id": ORG_ID },
    featureList: [
      "Inbox triage: opportunities, urgent requests, missed follow-ups, conversations at risk",
      "Reply drafting",
      "Meeting scheduling with Google Calendar and Google Meet",
      "Approval required before any email is sent",
    ],
    offers: PRODUCT.plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price.toFixed(2),
      priceCurrency: PRODUCT.currency,
      url: abs("/pricing"),
    })),
  };
}

export function faqPageSchema(faqs: Faq[], path: string): Schema {
  return {
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): Schema {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function articleSchema(page: ContentPage): Schema {
  return {
    "@type": "Article",
    "@id": `${abs(page.path)}#article`,
    headline: page.h1,
    description: page.description,
    url: abs(page.path),
    mainEntityOfPage: abs(page.path),
    datePublished: page.publishedAt,
    dateModified: page.updatedAt,
    author: { "@type": "Person", name: SITE.founder.name, worksFor: { "@id": ORG_ID } },
    publisher: { "@id": ORG_ID },
    about: { "@id": APP_ID },
    inLanguage: "en",
  };
}

export function webPageSchema(page: Pick<ContentPage, "path" | "title" | "description" | "updatedAt">): Schema {
  return {
    "@type": "WebPage",
    "@id": `${abs(page.path)}#webpage`,
    name: page.title,
    description: page.description,
    url: abs(page.path),
    dateModified: page.updatedAt,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": APP_ID },
    inLanguage: "en",
  };
}
