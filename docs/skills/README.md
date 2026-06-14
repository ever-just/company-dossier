# Agent Skills Reference

This document catalogs the 20 research skills developed and deployed during the BROGAV Solutions dossier project. Each skill is a reusable agent workflow stored as a `SKILL.md` file in the canonical skills repository (`/Users/cloudaistudio/Projects/agentskills/skills/`).

---

## Skill Catalog

| # | Skill | Description | When to Use | Key Insight |
|---|-------|-------------|-------------|-------------|
| 1 | `intelligence-dossier` | Full company dossier builder with business model analysis, supplier catalog audit, and risk register | Starting a new company investigation from scratch; need comprehensive coverage across all dimensions | The 12-section structure with entity-centric design enables both human browsing and LLM retrieval; ROUTER.md is the navigation backbone |
| 2 | `deep-research` | 7-phase pipeline (Plan, Local, Search, Wayback, Scrape, Synthesize, Report) for any research question | Open-ended research questions requiring multiple source types and systematic coverage | The 7 phases exist because skipping any one creates blind spots; the Local phase before Search prevents redundant web queries |
| 3 | `company-legal-reputation-research` | 7-step legal/court/lien/sanctions vetting workflow covering federal, state, and county records | Pre-acquisition due diligence, vendor vetting, or any situation where legal risk must be quantified | Most legal intelligence comes from free state court searches and UCC filings, not expensive PACER queries |
| 4 | `supplier-verification` | Logo wall to confirmed partnerships via manufacturer "Where to Buy" pages, tariff exposure matrix, era validation | Verifying claimed supplier/partner relationships against independent manufacturer sources | Only 2 of 40 claimed relationships were independently confirmable; the gap between claimed and confirmed IS the finding |
| 5 | `client-discovery-osint` | 12-source cross-referencing to identify clients: testimonials, case studies, LinkedIn, events, YouTube, career histories | Building a client list for a private company that does not publish customer names | Tiered confidence framework prevents false precision; installation photos and event co-attendance are the highest-value signals |
| 6 | `linkedin-activity-intelligence` | Extract OSINT from LinkedIn MHTML archives: company/people tag parsing, post dating, timeline verification | Analyzing saved LinkedIn profiles or feeds for relationship mapping and activity patterns | 97 companies identified from 181 posts; the tags in LinkedIn posts reveal business relationships the poster may not intend to disclose |
| 7 | `era-validated-linkedin-analysis` | QA methodology preventing misattribution across multi-employer LinkedIn feeds | Analyzing LinkedIn activity for someone who has worked at multiple companies; need to separate eras | Without era validation, you attribute posts/activity to the wrong employer; always filter by date range matching known tenure |
| 8 | `open-source-traffic-analysis` | Multi-source traffic estimation (SimilarWeb API, Wayback CDX, Tranco, Cloudflare Radar) | Estimating website traffic for a competitor or target without access to their analytics | For B2B sites under 5K monthly visits, no single source is reliable; triangulate across 3+ sources and report ranges, not point estimates |
| 9 | `competitor-identification` | 5-phase competitor finding: database screening, geographic filtering, size matching, service overlap, certification comparison | Building a competitive landscape from scratch when you know the industry but not the players | Start with the broadest possible NAICS screen (thousands of results), then systematically narrow; premature filtering misses non-obvious competitors |
| 10 | `domain-email-enumeration` | DNS/MX/SPF/DMARC audit plus email pattern discovery plus SMTP verification | Mapping a company's email infrastructure and verifying which employees have active mailboxes | The MX record reveals the email provider (M365, Google Workspace, etc.); SPF records reveal all authorized sending services (marketing tools, CRMs) |
| 11 | `website-techstack-analysis` | Reverse-engineer CMS, CDN, analytics, ad pixels, ecommerce from page source and GTM container | Understanding what technology a company uses without asking them; reveals budget priorities and marketing maturity | GTM containers are public and reveal every tracking pixel, CRM integration, and ad platform; having a pixel installed does not mean ads are running |
| 12 | `business-model-canvas` | 9-block Osterwalder BMC builder: data audit, right-to-left fill order, cold_steel writing style, feedback loop mapping | Synthesizing all collected intelligence into a structured business model analysis | Fill right-to-left (Revenue Streams first, then work backward to Key Resources); this prevents aspirational thinking and grounds the canvas in evidence |
| 13 | `contact-sheet-image-analysis` | 33x faster image analysis via Pillow auto-classify, 6x6 thumbnail grids, batch AI review | Processing large numbers of images (photos, screenshots, logo walls) for intelligence extraction | A 6x6 contact sheet lets an AI model analyze 36 images in one inference call instead of 36 separate calls; classify first to skip irrelevant images |
| 14 | `oem-partner-verification` | Verify claimed OEM partnerships against manufacturer directories; tiered confidence (Authorized/Purchasing/Aspirational) | Validating whether a company actually has authorized dealer status with claimed manufacturers | Only 5% of claimed partnerships are verifiable via manufacturer dealer locators; most manufacturers do not publish dealer lists publicly |
| 15 | `ad-transparency-audit` | Cross-reference tracking pixels vs. actual ad spend across Google/Meta/TikTok transparency platforms plus GTM container parsing | Determining whether a company is actively spending on digital advertising, and on which platforms | Having a Meta Pixel installed does not mean Meta Ads are running; cross-reference with Meta Ad Library and Google Ads Transparency Center for confirmation |
| 16 | `verification-audit` | Cross-verify all dossier findings against independent sources, retract unverifiable claims, tier confidence levels | Final QA pass before delivering a dossier; ensures no single-source claims are presented as fact | The most productive single instruction: "flag any claim that appears in multiple files with different values"; contradictions are the #1 quality issue |
| 17 | `google-dorking-osint` | Structured Google dorking using known infrastructure identifiers (GA IDs, M365 tenant, Canva usernames) | Discovering hidden content, documents, or relationships that normal site crawling misses | Search THROUGH other organizations, not just the target; `site:partnercompany.com "BROGAV"` reveals relationships from the partner's perspective |
| 18 | `web-crawl-intelligence-extraction` | Process saved webcomplete captures, deleted Wayback pages, video transcripts, API dumps; prioritize by intel value | You have a pile of raw captured data (HTML, PDFs, transcripts) and need to systematically extract intelligence from all of it | Prioritize by expected intelligence density: deleted pages > current pages (if someone deleted it, it was probably interesting) |
| 19 | `industry-context-research` | 6-dimension industry research framework (economics, history, legal, political, sociological, technology) with parallel agent execution | Understanding the industry a target company operates in; provides context for interpreting company-specific findings | The 6 dimensions are PESTLE reframed for intelligence work; run them in parallel with one agent per dimension for 6x throughput |
| 20 | `commercial-property-research` | Property records, ownership verification (own vs. lease), floor plan acquisition, co-tenant mapping, lease rate analysis | Determining a company's real estate situation: do they own or lease, what do they pay, how much space, who are their neighbors | County property records are free and reveal ownership; co-tenant directories reveal who else is in the building (potential clients or competitors) |

---

## Skill Selection Guide

### Starting a New Dossier
1. `intelligence-dossier` — Sets up the full structure and runs initial collection
2. `deep-research` — Fills gaps identified during initial collection
3. `industry-context-research` — Provides the industry backdrop for interpreting findings

### Verifying Claims
4. `supplier-verification` — Confirms manufacturer relationships
5. `oem-partner-verification` — Validates authorized dealer status
6. `verification-audit` — Final cross-reference pass across all sections

### People Intelligence
7. `linkedin-activity-intelligence` — Extracts relationship data from LinkedIn feeds
8. `era-validated-linkedin-analysis` — Prevents misattribution across employers
9. `domain-email-enumeration` — Maps email infrastructure and verifies mailboxes
10. `client-discovery-osint` — Identifies customers through people connections

### Technology and Marketing
11. `website-techstack-analysis` — Maps the target's technology choices
12. `ad-transparency-audit` — Determines actual marketing spend
13. `open-source-traffic-analysis` — Estimates web traffic without analytics access
14. `google-dorking-osint` — Discovers hidden content and cross-organizational references

### Competitive Analysis
15. `competitor-identification` — Builds the competitive landscape from scratch
16. `business-model-canvas` — Synthesizes findings into a structured model
17. `commercial-property-research` — Assesses real estate and facility costs

### Quality Assurance
18. `verification-audit` — Cross-verifies all claims
19. `contact-sheet-image-analysis` — Batch-processes visual evidence
20. `web-crawl-intelligence-extraction` — Processes raw captured data

---

## Skill Execution Notes

- Skills are loaded by name reference in prompts (e.g., "Run the supplier-verification skill")
- Each skill's `SKILL.md` contains the full methodology, expected inputs, and output format
- Skills can be composed: `intelligence-dossier` internally calls `deep-research`, `supplier-verification`, and `verification-audit`
- Parallel execution is supported: `industry-context-research` runs 6 agents simultaneously
- All skills output markdown files with YAML frontmatter for programmatic processing

---

## Key Metrics from BROGAV Project

| Skill | Time Spent | Key Output |
|-------|-----------|------------|
| intelligence-dossier | ~4 hours | Complete 13-section dossier skeleton |
| deep-research | ~2 hours | 55 pages crawled, 33 deleted pages found |
| supplier-verification | ~1 hour | 2/40 confirmed (5% confirmation rate) |
| client-discovery-osint | ~1.5 hours | 75+ client relationships identified |
| verification-audit | ~1 hour | 56 issues found (12 material, 28 medium, 16 low) |
| industry-context-research | ~3 hours | 32 research files across 6 dimensions |
| contact-sheet-image-analysis | ~30 min | 46 images processed, 3 new client relationships found |
| competitor-identification | ~1 hour | 4,797 initial screen to 10 final competitors |
