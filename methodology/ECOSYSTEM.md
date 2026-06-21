# Ecosystem

Open-source repositories and tools in the broader company intelligence / OSINT landscape. Organized by category with relevance notes for dossier builders.

---

## OSINT Frameworks (Full Pipeline Tools)

These are comprehensive platforms that automate multiple OSINT collection phases. We studied their architecture but used individual tools instead for flexibility.

| Repository | Stars | Description | Relevance to Dossier Building |
|-----------|-------|-------------|------------------------------|
| [smicallef/spiderfoot](https://github.com/smicallef/spiderfoot) | 18K | Automates OSINT for threat intel and attack surface mapping. 200+ modules. | HIGH — covers DNS, email, social, dark web, company data. Module architecture inspired our skill-based approach. |
| [blacklanternsecurity/bbot](https://github.com/blacklanternsecurity/bbot) | 10K | Recursive internet scanner. Subdomain enumeration, web crawling, secret scanning. | MEDIUM — great for technical reconnaissance but overkill for business intelligence. |
| [lanmaster53/recon-ng](https://github.com/lanmaster53/recon-ng) | 5.7K | Full-featured reconnaissance framework with modular marketplace. | MEDIUM — Metasploit-style interface for OSINT. Good for one-off queries but not structured dossier output. |
| [OWASP/Amass](https://github.com/owasp-amass/amass) | 14.7K | In-depth attack surface mapping and asset discovery. | LOW for business intel — focuses on technical infrastructure (DNS, certs, ASNs), not business data. |

## People Intelligence

| Repository | Stars | Description | Relevance |
|-----------|-------|-------------|-----------|
| [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock) | 85K | Hunt down social media accounts by username across 400+ sites. | MEDIUM — useful for finding personal accounts of founders/executives. |
| [soxoj/maigret](https://github.com/soxoj/maigret) | 33K | Collect a dossier on a person by username from 3000+ sites. | HIGH — directly applicable for building executive profiles and finding associated accounts. |
| [megadose/holehe](https://github.com/megadose/holehe) | 11K | Check if an email is used on different sites (forgotten password probing). | HIGH — we used this directly to map BROGAV team members' online presence. |
| [khast3x/h8mail](https://github.com/khast3x/h8mail) | 5K | Email OSINT and breach hunting. | MEDIUM — useful for exposure assessment but not core to business intelligence. |
| [laramies/theHarvester](https://github.com/laramies/theHarvester) | 16K | Emails, subdomains, and names harvester. | HIGH — we used this for initial email/subdomain discovery on brogavsolutions.com. |

## Web Technology Detection

| Repository | Stars | Description | Relevance |
|-----------|-------|-------------|-----------|
| [projectdiscovery/httpx](https://github.com/projectdiscovery/httpx) | 10K | Fast multi-purpose HTTP toolkit with tech detection. | HIGH — our primary tool for identifying Wix, GA4, GTM, CDN, and email infrastructure. |
| [projectdiscovery/wappalyzergo](https://github.com/projectdiscovery/wappalyzergo) | 1K | Go implementation of Wappalyzer technology detection. | MEDIUM — backup validation tool. |
| [AliasIO/wappalyzer](https://www.wappalyzer.com/) | (closed source now) | Original web tech detection. Moved from open source to commercial. | Evaluated but repo was deleted. Used httpx + manual GTM parsing instead. |

## Google Dorking & Document Discovery

| Repository | Stars | Description | Relevance |
|-----------|-------|-------------|-----------|
| [IvanGlinkin/Fast-Google-Dorks-Scan](https://github.com/IvanGlinkin/Fast-Google-Dorks-Scan) | 1.7K | Automated Google dork scanning across categories. | HIGH — patterns adapted into our google-dorking-osint skill. |
| [m3n0sd0n4ld/GooFuzz](https://github.com/m3n0sd0n4ld/GooFuzz) | 1.6K | Fuzzing with OSINT approach via Google dorking. Find dirs, files, params. | MEDIUM — useful for finding exposed documents without leaving traces on target server. |
| [exploit-db.com/google-hacking-database](https://www.exploit-db.com/google-hacking-database) | N/A | Master database of Google dork queries by category. | HIGH — our primary reference for crafting dorking queries. |

## Wayback Machine & Historical Research

| Repository | Stars | Description | Relevance |
|-----------|-------|-------------|-----------|
| [tomnomnom/waybackurls](https://github.com/tomnomnom/waybackurls) | 4.5K | Fetch all URLs from Wayback Machine for a domain. | HIGH — used for initial URL enumeration of brogav.com. |
| [internetarchive/wayback](https://github.com/internetarchive/wayback) | 842 | Official IA Wayback Machine codebase. | MEDIUM — reference for CDX API documentation. |
| [linksmith/chrono-scraper](https://github.com/linksmith/chrono-scraper) | 4 | Tool to extract and index Wayback Machine data for full-text search. | LOW — interesting concept but we built our own extraction pipeline. |

## Video & Media Intelligence

| Repository | Stars | Description | Relevance |
|-----------|-------|-------------|-----------|
| [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) | 170K | Feature-rich command-line audio/video downloader. | HIGH — we used this to download all BROGAV YouTube videos and auto-caption VTT files. |

## Competitive Intelligence

| Repository | Stars | Description | Relevance |
|-----------|-------|-------------|-----------|
| [qb-harshit/Competitve-Intelligence-CLI](https://github.com/qb-harshit/Competitve-Intelligence-CLI) | 40 | CLI tool for scraping and analyzing competitor websites. | MEDIUM — basic but demonstrates the concept of structured competitor analysis. |
| [Rainmaker-Ventures/awesome-competitive-intelligence-and-monitoring](https://github.com/Rainmaker-Ventures/awesome-competitive-intelligence-and-monitoring) | 3 | Curated list of CI tools and resources. | LOW — sparse but conceptually aligned with our methodology. |
| [RamsesAguirre777/facebook-ads-library-mcp](https://github.com/RamsesAguirre777/facebook-ads-library-mcp) | 37 | Facebook Ads Library MCP server for competitive ad intelligence. | MEDIUM — relevant to our ad-transparency-audit skill; uses same Meta Ad Library data source. |

## Curated OSINT Resource Lists

| Repository | Stars | Description | Relevance |
|-----------|-------|-------------|-----------|
| [jivoi/awesome-osint](https://github.com/jivoi/awesome-osint) | 26.8K | The canonical awesome list for OSINT. | HIGH — our primary reference for tool discovery across all phases. |
| [ARPSyndicate/awesome-intelligence](https://github.com/ARPSyndicate/awesome-intelligence) | 2.4K | Curated OSINT resources with category organization. | MEDIUM — good supplementary reference. |
| [ItIsMeCall911/Awesome-Telegram-OSINT](https://github.com/ItIsMeCall911/Awesome-Telegram-OSINT) | 2.7K | Telegram-specific OSINT tools. | LOW — not relevant to our use case but valuable for other intelligence contexts. |

## Company Data & Enrichment

| Repository | Stars | Description | Relevance |
|-----------|-------|-------------|-----------|
| [rahulchhabria/local-enrichment-tool](https://github.com/rahulchhabria/local-enrichment-tool) | 4 | AI-powered company enrichment (firmographic, technographic, hiring data). | MEDIUM — similar goal but uses paid APIs we avoided. |
| [Fastpacer/-Business-Intelligence-Pro](https://github.com/Fastpacer/-Business-Intelligence-Pro) | 0 | AI company intelligence platform (summaries, websites, industries, news). | LOW — early-stage but conceptually identical to our approach. |
| [AIGrowthFactory/l_scraper](https://github.com/AIGrowthFactory/l_scraper) | 1 | LinkedIn scraper + PDF report generator + Airtable storage. | LOW — narrow LinkedIn focus but demonstrates structured output pattern. |

## Legal & Due Diligence

| Repository | Stars | Description | Relevance |
|-----------|-------|-------------|-----------|
| [damionrashford/RivalSearch-Plugin](https://github.com/damionrashford/RivalSearch-Plugin) | — | Competitive research plugin. Step 7 (Reputation & Risk) adapted. | HIGH — directly adapted into our legal research methodology. |
| [lawve-ai/awesome-legal-skills](https://github.com/lawve-ai/awesome-legal-skills) | — | Legal AI skills including vendor due diligence. | HIGH — Phase 1 reputational check adapted into our workflow. |

---

## Gaps in the Ecosystem

Things we needed that don't have good open-source solutions:

| Need | Best Available | Gap |
|------|---------------|-----|
| Company revenue estimation | D&B/ZoomInfo (paid) | No open-source revenue estimator from public signals |
| Manufacturer partner directory scraping | Manual per-OEM | No tool that systematically checks "Find a Partner" pages across OEMs |
| State court record aggregation | CourtListener (federal only) | No free aggregator for state civil courts (all require manual portal access) |
| LinkedIn company data without login | Aggregators (partial) | No tool extracts LinkedIn company info without authentication |
| SAM.gov structured data | API (requires key registration) | DEMO_KEY doesn't work; registration is bureaucratic |
| Private company financials | D&B modeling (paid) | No open-source method to estimate private company revenue accurately |
| WBENC/certification directory | Manual portal login | No API or scraper for certification body directories |

---

## How to Use This List

**If you're building a company dossier:**
1. Start with `theHarvester` + `httpx` for initial reconnaissance
2. Use `yt-dlp` for any video content
3. Use `holehe` for email existence mapping
4. Use Wayback CDX API directly (no tool needed — it's a REST endpoint)
5. Reference `awesome-osint` for tool discovery when you hit a wall
6. Study `spiderfoot` module architecture for pipeline design inspiration

**If you're building an automated dossier tool:**
1. Study our methodology (this repo) for the pipeline design
2. Use `bbot` or `spiderfoot` as the collection engine
3. Add structured output (entity-centric files, YAML frontmatter, ROUTER.md)
4. The gap is in synthesis and analysis — no existing tool does this
