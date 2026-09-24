import Link from "next/link";
import { SITE } from "@/lib/seo/site";

const NAV = [
  { href: "/ai-inbox-employee", label: "Guide" },
  { href: "/compare", label: "Compare" },
  { href: "/facts", label: "Facts" },
  { href: "/pricing", label: "Pricing" },
];

const FOOTER_LINKS = [
  { href: "/ai-inbox-employee", label: "What is an AI inbox employee?" },
  { href: "/compare/mailient-vs-fyxer", label: "Mailient vs Fyxer" },
  { href: "/compare/mailient-vs-superhuman", label: "Mailient vs Superhuman" },
  { href: "/compare/mailient-vs-gemini", label: "Mailient vs Gemini in Gmail" },
  { href: "/compare/mailient-vs-shortwave", label: "Mailient vs Shortwave" },
  { href: "/facts", label: "Facts" },
  { href: "/pricing", label: "Pricing" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          {SITE.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm text-neutral-400 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/auth/signin" className="text-neutral-400 hover:text-white">
            Sign in
          </Link>
          <Link href="/auth/signup" className="rounded-full bg-white px-4 py-1.5 font-semibold text-black hover:bg-neutral-200">
            Start trial
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 md:grid-cols-[2fr_3fr]">
        <div>
          <p className="font-bold text-white">{SITE.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">{SITE.definition}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-2 text-sm text-neutral-400 sm:grid-cols-2">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
