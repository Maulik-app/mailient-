import "./globals.css";
import Providers from "./providers";
import { JsonLd } from "../components/seo/JsonLd";
import { organizationSchema, softwareApplicationSchema, websiteSchema } from "../lib/seo/jsonld";
import { siteVerification } from "../lib/seo/metadata";
import { SITE, SITE_URL } from "../lib/seo/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.homeTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.definitionShort,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: siteVerification(),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" rel="stylesheet" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap');
        </style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" />
      </head>
      <body className="font-sans antialiased satoshi-app" data-new-gr-c-s-check-loaded="14.1258.0" data-gr-ext-installed="">
        <JsonLd data={[organizationSchema(), websiteSchema(), softwareApplicationSchema()]} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
