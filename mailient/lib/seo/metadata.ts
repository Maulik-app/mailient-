import type { Metadata } from "next";
import { SITE } from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path starting with "/". Becomes the canonical URL (resolved against metadataBase). */
  path: string;
  /** Skip the "%s | Mailient" template (used by the homepage). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  // A page-level openGraph object replaces the one inherited from app/opengraph-image,
  // so the shared card is referenced explicitly.
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE.definitionShort };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      locale: "en_US",
      title: socialTitle,
      description,
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

/** Search engine ownership tags. Set the env vars in the hosting dashboard before building. */
export function siteVerification(): Metadata["verification"] {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}
