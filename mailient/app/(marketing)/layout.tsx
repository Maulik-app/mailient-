import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/marketing/site-shell";

// Public, indexable pages. Server-rendered so crawlers get the full text.
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
