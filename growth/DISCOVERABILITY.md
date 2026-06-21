# Discoverability & AI-citation playbook

How Company Dossier is set up to be found by search engines and AI assistants — and the
off-site work that compounds it. Based on 2026-current research (sources at bottom).

## TL;DR
The things that actually move the needle in 2026 are the durable fundamentals — **indexable
static HTML, JSON-LD, sitemaps, a welcome-mat robots.txt, speed** — plus **off-site authority
on the few platforms AI engines trust** (Reddit, GitHub, G2, Wikidata). The "Google Open
Knowledge Format (OKF)" is an *enterprise data-catalog* spec and is **not** relevant to web SEO.

## ✅ On-site — already implemented (in `site/`)
- **Static HTML** for every page (AI crawlers do **not** run JavaScript — Vercel study). Content is in the initial payload.
- **JSON-LD**: `WebSite`, `Organization`, `SoftwareApplication`/`Offer`, `Article`/`BlogPosting`, `BreadcrumbList`, `FAQPage`, `HowTo`, `DefinedTermSet`. (FAQ/HowTo *rich results* are deprecated, but the markup still aids machine comprehension.)
- **`sitemap.xml`** with `lastmod`, referenced from `robots.txt`.
- **`robots.txt` welcome-mat** — explicitly allows Googlebot + every search/retrieval AI bot (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot, Amazonbot, CCBot, Google-Extended…). A free tool that wants citations lets them all in.
- **IndexNow** — key file at root + a post-deploy ping (`site/indexnow.mjs`, run from CI on `main`). Instant notification to Bing/Yandex/Naver/Seznam/Yep (and ChatGPT Search via Bing). Google ignores IndexNow (uses sitemaps).
- **RSS** at `/feed.xml` (blog) + `<link rel=alternate>`.
- **`llms.txt`** — generated map of the site (low proven ROI for ranking; mainly useful for dev assistants like Cursor/Copilot/Claude). Google has said it won't use it.
- **PWA + speed** — static on GitHub Pages CDN = fast TTFB; manifest + service worker.
- **Semantic HTML**, canonical, OpenGraph/Twitter, security.txt, www↔apex, HTTPS.

## ⚠️ Verification — needs your accounts (one-time)
1. **Google Search Console** — add a **Domain property** (`companydossier.lol`) → verify with a **DNS TXT** record (I can add it via GoDaddy if you paste the token) → submit `https://companydossier.lol/sitemap.xml`.
2. **Bing Webmaster Tools** — fastest path: **Import from GSC** (auto-verifies, carries sitemaps). Bing also powers ChatGPT Search retrieval.
3. After verifying, use **URL Inspection → Request indexing** for the top pages.

## 🚀 Off-site — the compounding work (ranked by impact for this niche)
1. **Reddit** — the #1-cited domain across ChatGPT/Perplexity/Google AI (Semrush, Nov 2025). Earn *organic* mentions in r/OSINT, r/sales, r/Entrepreneur, r/datasets answering high-intent questions ("free company lookup", "ZoomInfo alternatives"). No spam — it backfires.
2. **GitHub** — keyword-rich repo name/description/**topics** (done), great READMEs (done), stars. Submit PRs to relevant **awesome-lists** (awesome-osint, awesome-sales) — high-authority backlinks + real discovery.
3. **G2 / Capterra** — the "inclusion gate" for AI software recommendations; G2 is the only B2B review site in the top-cited AI domains. Claim listings (+ AlternativeTo, SaaSHub, SourceForge).
4. **Show HN** (Hacker News) — best launch channel for a free OSINT/dev tool; modest title, be in-thread early, never solicit upvotes. Then **Product Hunt** for the high-DR backlink.
5. **Digital PR via original research/data** (e.g., a public OSINT dataset or benchmark) — earns editorial backlinks that double as AI-citation fuel; credible third-party mentions matter more than self-description.
6. **Wikidata** item now (machine-readable, feeds Knowledge Graph + AI; no notability gate, just citations). **Wikipedia** only later, once independent press coverage exists.
7. Keep one **consistent entity description** everywhere (site, GitHub, npm, G2, social).
- Skip as authority signals: npm download counts (gameable) and generic social likes (indirect only). LinkedIn *content* is an exception (a top-cited AI domain).

## 📏 How to measure
- **Indexing/rankings:** GSC (impressions, position, Core Web Vitals from CrUX field data) + Bing Webmaster.
- **Structured data:** Rich Results Test (`search.google.com/test/rich-results`) + Schema validator (`validator.schema.org`).
- **Speed:** PageSpeed Insights (field LCP/INP/CLS — Lighthouse can't measure INP).
- **AI citations:** manual prompts in ChatGPT/Perplexity/Google AI + check cited sources; server-log analysis of `*-User`/`*-SearchBot` user-agents (GitHub Pages doesn't expose logs — use a tracker); optional tools (Otterly, Peec, Ahrefs Brand Radar, Semrush AI toolkit).

## 🧠 Open Knowledge Format (OKF) — implemented as agent knowledge (not an SEO signal)
OKF (Google Cloud, June 2026) is a vendor-neutral spec: a **directory of markdown files with YAML
frontmatter** (`type`/`title`/`description`/`resource`/`tags`/`timestamp`, `index.md` per dir) so AI
agents can consume curated knowledge without translation. It is **not** a web-ranking signal — but
since our dossier output is already markdown+frontmatter, we ship a real OKF knowledge base at
[`/knowledge/`](https://companydossier.lol/knowledge/index.md) (source in `knowledge/`) describing the
product, concepts, and methodology for agent consumption. Linked from `llms.txt` and the footer.

## ❌ Ignore (researched, not applicable here)
- **Data Commons** — for large public statistical datasets, not a tool's marketing site.
- **NLWeb / A2A** — need a running backend; not possible on static GitHub Pages.
- **"Special AI markup required for AI Overviews"** — Google states none is needed; normal indexing = eligibility.

## Sources
Google AI features doc; Google OKF blog (Jun 2026); Vercel "rise of the AI crawler" (Dec 2024);
Semrush most-cited-domains (Nov 2025); IndexNow.org; OpenAI/Anthropic/Perplexity crawler docs;
Search Engine Land/Journal GEO guides (2026). Full URLs in the research notes for this change.
