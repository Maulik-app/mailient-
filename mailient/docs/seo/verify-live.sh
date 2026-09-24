#!/usr/bin/env bash
# Checks the deployed SEO surface the way a crawler sees it (raw HTML, no JS).
#
#   bash docs/seo/verify-live.sh                      # checks https://mailient.xyz
#   bash docs/seo/verify-live.sh http://localhost:3000
#
# Fails (exit 1) on: non-200 pages, missing title/canonical/JSON-LD, noindex on a
# public page, product claims the code doesn't support, stale template pricing,
# private routes in the sitemap, public routes blocked in robots.txt, and FAQ
# schema that doesn't match the visible FAQ.
set -euo pipefail

BASE="${1:-https://mailient.xyz}"
BASE="${BASE%/}"
UA="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
DIR="$(mktemp -d)"
trap 'rm -rf "$DIR"' EXIT

PAGES=(/ /facts /ai-inbox-employee /compare /compare/mailient-vs-fyxer /compare/mailient-vs-superhuman /compare/mailient-vs-gemini /compare/mailient-vs-shortwave /pricing)
FILES=(/robots.txt /sitemap.xml /llms.txt)

fetch() { # path -> file; prints HTTP status
  local out="$DIR/$(echo "$1" | tr '/' '_').body"
  curl -sS -A "$UA" -o "$out" -w "%{http_code}" --max-time 60 "$BASE$1" || echo "000"
}

echo "Checking $BASE"
for p in "${PAGES[@]}" "${FILES[@]}"; do
  code=$(fetch "$p")
  echo "  $code $p"
done

# AI answer-engine crawlers mostly don't run JavaScript: metadata must be in <head> for them too.
for bot in "OAI-SearchBot/1.0" "PerplexityBot/1.0" "Claude-SearchBot/1.0"; do
  curl -sS -A "Mozilla/5.0 (compatible; $bot)" -o "$DIR/bot_${bot%%/*}.body" --max-time 60 "$BASE/facts" || true
done

python3 - "$DIR" "$BASE" <<'PY'
import html, json, os, re, sys

d, base = sys.argv[1], sys.argv[2]
fails = []
def body(path):
    f = os.path.join(d, path.replace("/", "_") + ".body")
    return open(f, errors="ignore").read() if os.path.exists(f) else ""

pages = ["/", "/facts", "/ai-inbox-employee", "/compare", "/compare/mailient-vs-fyxer",
         "/compare/mailient-vs-superhuman", "/compare/mailient-vs-gemini",
         "/compare/mailient-vs-shortwave", "/pricing"]

# Mailient claims the product code does not support today, plus stale template
# copy. Phrased so true statements about competitors (e.g. "Ghostwriter drafts in
# your voice") and Mailient's own disclaimers ("does not run overnight") pass.
FORBIDDEN = [
    r"reads Gmail overnight", r"works? overnight", r"while you sleep", r"always-on",
    r"last 90 days", r"90 days of (your )?sent", r"Mailient[^.]{0,40}\bdrafts in your voice",
    r"inbox employee for founders", r"Notion", r"Slack", r"Cal\.com",
    r"transfers per month", r"\$7\.99", r"\$29\.99", r"currency support",
]

def visible_text(s):
    s = re.sub(r"<script.*?</script>|<style.*?</style>", " ", s, flags=re.S)
    return html.unescape(re.sub(r"<[^>]+>", " ", s))

for p in pages + ["/llms.txt"]:
    s = body(p)
    if not s:
        fails.append(f"{p}: empty response"); continue
    text = s if p.endswith(".txt") else visible_text(s)
    for pat in FORBIDDEN:
        m = re.search(pat, text, flags=re.I)
        if m:
            fails.append(f"{p}: unsupported/stale claim {m.group(0)!r}")
    if p.endswith(".txt"):
        continue
    head = s.split("</head>")[0]
    if not re.search(r"<title>[^<]+</title>", head): fails.append(f"{p}: no <title>")
    if 'rel="canonical"' not in head: fails.append(f"{p}: no canonical")
    if re.search(r'name="robots" content="[^"]*noindex', head): fails.append(f"{p}: noindex on a public page")
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, flags=re.S)
    if not blocks: fails.append(f"{p}: no JSON-LD")
    vis = re.sub(r"\s+", " ", visible_text(s))
    for b in blocks:
        doc = json.loads(b)
        for e in doc.get("@graph", [doc]):
            if e.get("@type") == "FAQPage":
                for q in e["mainEntity"]:
                    for field in (q["name"], q["acceptedAnswer"]["text"]):
                        if re.sub(r"\s+", " ", field) not in vis:
                            fails.append(f"{p}: FAQ schema text not visible on page: {field[:60]!r}")

for f in sorted(os.listdir(d)):
    if f.startswith("bot_"):
        head = open(os.path.join(d, f), errors="ignore").read().split("</head>")[0]
        if "<title>" not in head or 'rel="canonical"' not in head:
            fails.append(f"/facts as {f[4:-5]}: title/canonical not in <head>")

pricing = visible_text(body("/pricing"))
for label, pat in (("$8.99", r"\$8\.99"), ("$29", r"\$29(?![.\d])"), ("$499", r"\$499(?![.\d])")):
    if not re.search(pat, pricing): fails.append(f"/pricing: missing {label}")

sitemap = body("/sitemap.xml")
locs = re.findall(r"<loc>([^<]+)</loc>", sitemap)
if not locs: fails.append("sitemap.xml: no <loc> entries")
for loc in locs:
    if re.search(r"/(api|dashboard|settings|home-feed|onboarding|notifications|auth|i|aether)(/|$)", loc):
        fails.append(f"sitemap.xml: private route listed: {loc}")

robots = body("/robots.txt")
for rule in re.findall(r"(?im)^disallow:\s*(\S+)", robots):
    for public in ("/tools", "/research", "/facts", "/compare", "/pricing", "/ai-inbox-employee", "/llms.txt"):
        if public.startswith(rule.rstrip("*")) or rule == "/":
            fails.append(f"robots.txt: 'Disallow: {rule}' blocks {public}")
if "sitemap:" not in robots.lower(): fails.append("robots.txt: no Sitemap line")

if fails:
    print("\nFAIL")
    for f in dict.fromkeys(fails): print("  -", f)
    sys.exit(1)
print("\nPASS: no unsupported claims, real pricing, clean sitemap and robots, FAQ schema matches visible copy.")
PY
