# Agent Skills Reference

All 20 research-related skills available for AI-agent-driven company intelligence dossier construction. Each skill is a reusable agent workflow stored as a `SKILL.md` file in the canonical skills repository.

Skills repo: `/Users/cloudaistudio/Projects/agentskills/skills/`

---

## 1. intelligence-dossier

**Description:** Full company dossier builder with business model analysis, supplier catalog audit, and risk register.

**When to invoke:** At project kickoff. This is the orchestrator skill that coordinates the entire dossier build, calling other skills as sub-tasks.

**What it produces:** Complete folder structure (12 numbered sections + 4 infrastructure folders), populated with entity profiles, reference files, analysis documents, ROUTER.md, and _MOC.md per section. Key deliverables: executive brief, risk register, intelligence gaps report.

**Key methodology insight:** Build entity-centric (one file per person/supplier/competitor/client) rather than topic-centric. This prevents duplication and enables cross-referencing. Start with corporate identity (Section 1) because registration data seeds every other section.

---

## 2. deep-research

**Description:** 7-phase research pipeline: Plan, Local, Search, Wayback, Scrape, Synthesize, Report.

**When to invoke:** When starting any research task requiring multiple sources and structured output. Acts as the methodology backbone for all other skills.

**What it produces:** Structured research output with source attribution, confidence ratings, and gap analysis. Deliverable format varies (Excel, PDF, Markdown) based on task requirements.

**Key methodology insight:** The 7 phases are sequential gates -- never skip to SEARCH before exhausting LOCAL data. Rate limit aggressively (1.5s Wayback, 0.4s YouTube, 2s per general domain). Triangulate: 3+ independent sources = HIGH confidence; 1 source = LOW.

---

## 3. company-legal-reputation-research

**Description:** 7-step legal, court, lien, and sanctions vetting workflow.

**When to invoke:** After corporate identity is established (need legal name, state of formation, principal names). Can run in parallel with supplier verification.

**What it produces:** Legal and reputation report: state/federal court records, UCC lien filings, tax liens, BBB profile, Glassdoor/Indeed reviews, OFAC/sanctions screening, D&B risk rating. Final output: clean/flagged determination with confidence level.

**Key methodology insight:** Search by ALL known entity names (current legal name, DBAs, prior names, principal names individually). BROGAV's original name "Hope-filled Hearts LLC" would have been missed without checking MN SOS filing history.

---

## 4. supplier-verification

**Description:** Logo wall to confirmed partnerships via manufacturer "Where to Buy" directories, tariff exposure matrix, era validation.

**When to invoke:** After the product/supplier list is compiled from website crawling. Before writing supplier profiles.

**What it produces:** Tiered verification matrix: Authorized (listed in manufacturer directory), Purchasing (buys from manufacturer but not listed), Aspirational (claims partnership but unverifiable). BROGAV result: only 2 of 40 confirmed.

**Key methodology insight:** Manufacturers maintain "Where to Buy" or "Find a Partner" pages -- these are ground truth. Most small VARs purchase through distribution and are not in manufacturer directories. This is standard but the distinction matters for due diligence.

---

## 5. client-discovery-osint

**Description:** 12-source cross-referencing methodology to identify clients of private companies.

**When to invoke:** When the dossier needs customer intelligence but the target has no public client list. Requires completed people profiles and web crawl data.

**What it produces:** Client relationship registry with confidence tiers: Named (explicitly stated), Inferred (strong evidence from multiple signals), Possible (single weak signal). BROGAV: started with 1 named client, identified 75+ relationships.

**Key methodology insight:** The 12 sources: testimonials, case studies, LinkedIn posts/comments, event co-attendance, YouTube appearances, website project pages, career histories (employees' prior clients), web search, industry associations, certifications/awards mentioning clients, D&B customer data, photo evidence (installation shots with visible logos).

---

## 6. linkedin-activity-intelligence

**Description:** Extract OSINT from LinkedIn MHTML archives: company/people tag parsing, post dating, relationship graph building.

**When to invoke:** When you have saved LinkedIn profile/activity pages (MHTML format). Most productive on founder/CEO accounts that post frequently about clients and partners.

**What it produces:** Structured dataset of tagged companies (from post mentions), tagged people, posting frequency, content themes, relationship strength signals. BROGAV: 97 unique companies identified from 181 posts on the CEO's feed.

**Key methodology insight:** LinkedIn posts tagging a company indicate a business relationship. Photos at a location indicate installation/site visit (client signal). Comments from company accounts indicate active engagement. Date posts by content clues since MHTML does not always preserve timestamps.

---

## 7. era-validated-linkedin-analysis

**Description:** QA methodology preventing misattribution of LinkedIn activity across multi-employer career histories.

**When to invoke:** When analyzing LinkedIn feeds of people who have changed jobs. Critical for preventing false attribution of prior-employer activity to the current company.

**What it produces:** Validated timeline with each post/activity assigned to the correct employer era. Flags and removes intelligence belonging to a prior employment period.

**Key methodology insight:** A person's LinkedIn activity from 2019 (when they worked at Company A) cannot be attributed to Company B (where they work now). Always cross-reference posting date against employment timeline. Several BROGAV team members previously worked at competitors.

---

## 8. open-source-traffic-analysis

**Description:** Multi-source traffic estimation combining SimilarWeb, Wayback CDX volume, Tranco rankings, and Cloudflare Radar.

**When to invoke:** When estimating web presence and digital marketing effectiveness. Run after tech stack analysis (need to know their analytics platform).

**What it produces:** Traffic estimate report: monthly visit range, traffic source breakdown (direct/organic/paid/referral), geographic distribution, confidence intervals, competitor benchmarks.

**Key methodology insight:** No single source is accurate for small sites (<10K monthly visits). If Tranco does not rank them, SimilarWeb shows <5K, and Wayback shows infrequent crawling -- the site genuinely has minimal traffic. This itself is intelligence (offline/relationship sales model).

---

## 9. competitor-identification

**Description:** 5-phase competitor finding from existing datasets and web research.

**When to invoke:** After corporate identity and industry classification are established. Needs NAICS/SIC codes, geographic focus, and approximate revenue range.

**What it produces:** Tiered competitor list: Tier 1 (direct -- same geography, size, products), Tier 2 (adjacent geography or different size), Tier 3 (different model but same customers). Individual competitor profiles with comparative analysis. BROGAV: 4,797 initial screen narrowed to 10 final competitors.

**Key methodology insight:** The 5 phases: (1) Capital IQ/D&B screening by SIC + geography, (2) Google search for "[industry] [location]", (3) LinkedIn company search by industry, (4) manufacturer partner directories (who else sells same products?), (5) event/association membership overlap. Phase 4 is uniquely powerful for resellers.

---

## 10. domain-email-enumeration

**Description:** DNS/MX/SPF/DMARC audit plus email pattern discovery and SMTP mailbox verification.

**When to invoke:** Early in research, immediately after identifying the primary domain. Produces team roster intelligence feeding people profiles.

**What it produces:** Complete DNS audit (MX revealing email provider, SPF revealing authorized senders, DMARC policy), email format pattern, verified mailbox list confirming which team members have active accounts.

**Key methodology insight:** The email format pattern is gold -- once you know it (e.g., `{firstname}@domain.com`), verify any suspected team member by testing their predicted address via SMTP. MX records reveal infrastructure. SPF records sometimes leak third-party services (CRM, marketing automation).

---

## 11. website-techstack-analysis

**Description:** Reverse-engineer CMS, CDN, analytics, advertising pixels, ecommerce platform, and third-party integrations from page source.

**When to invoke:** After initial web crawl. Provides infrastructure intelligence and reveals marketing/sales toolchain.

**What it produces:** Technology stack inventory: hosting, CDN, analytics (with property IDs), advertising pixels (Meta, TikTok, Trade Desk), CRM signals, ecommerce platform, email marketing integrations.

**Key methodology insight:** Parse the GTM container directly -- it reveals more than any external tool. A company with pixels installed but no ads in transparency platforms either has paused campaigns, runs under a different entity, or installed pixels speculatively. The GA4 property ID can be searched to find other domains owned by the same entity.

---

## 12. business-model-canvas

**Description:** 9-block Osterwalder BMC builder with data-driven fill, feedback loop mapping, and vulnerability analysis.

**When to invoke:** After completing sections 1-8 of the dossier. Needs corporate, people, products, suppliers, customers, competitors, financials, and marketing data to fill all 9 blocks accurately.

**What it produces:** Complete BMC: Value Propositions, Customer Segments, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure. Plus feedback loop diagram and vulnerability analysis.

**Key methodology insight:** Fill right-to-left (Customer Segments first, Cost Structure last). Every claim must cite a dossier file. Use "cold steel" writing -- no adjectives, no aspiration, only observable facts. Anti-patterns: do not infer revenue streams without evidence, do not list aspirational partnerships as Key Partners.

---

## 13. contact-sheet-image-analysis

**Description:** 33x faster batch image analysis using Pillow auto-classification and 6x6 thumbnail contact sheets.

**When to invoke:** When you have 50+ images to classify and analyze (event galleries, product photos, web crawl images). Replaces one-by-one analysis.

**What it produces:** Classified image inventory (people, products, facilities, events, logos, other) with extracted intelligence. Contact sheets enable batch AI review. BROGAV: 46 images processed, 3 new client relationships discovered from installation photos.

**Key methodology insight:** Generate 6x6 thumbnail grids, then batch-analyze each grid with a multimodal LLM. One API call analyzes 36 images instead of 36 separate calls. Auto-classify by filename patterns before visual analysis to skip irrelevant images.

---

## 14. oem-partner-verification

**Description:** Verify claimed OEM partnerships against manufacturer dealer locator pages with tiered confidence output.

**When to invoke:** After supplier list is extracted from website (logo wall OCR + manual identification). Before writing supplier profiles.

**What it produces:** Verification matrix: Authorized (confirmed in directory), Purchasing (buys through distribution, not listed), Aspirational (unverifiable). BROGAV: only 2 of 40 confirmed -- 5% confirmation rate.

**Key methodology insight:** The gap between "on the logo wall" and "confirmed authorized partner" is enormous. Most small VARs purchase through broad-line distributors and are not in manufacturer directories. This is standard practice but the distinction matters for acquisition diligence and competitive positioning.

---

## 15. ad-transparency-audit

**Description:** Cross-reference installed tracking pixels against actual advertising spend in platform transparency tools.

**When to invoke:** After tech stack analysis reveals advertising pixels. Determines whether pixels represent active campaigns or dormant instrumentation.

**What it produces:** Ad spend assessment: active platforms (with creative examples), estimated spend range, campaign duration, targeting signals. BROGAV: pixels installed for Meta, TikTok, Trade Desk -- zero active ads found in any transparency library.

**Key methodology insight:** Google Ads Transparency Center, Meta Ad Library, and TikTok Commercial Content Library are all searchable by advertiser. A pixel with no matching ads means campaigns are paused, running under a different entity, or pixels were installed speculatively. This reveals marketing maturity and budget allocation.

---

## 16. verification-audit

**Description:** Cross-verify all dossier findings against independent sources, retract unverifiable claims, tier confidence levels.

**When to invoke:** After the dossier is substantially complete (all 12 sections drafted). Final quality gate before delivery.

**What it produces:** Verification report: every major claim listed with supporting sources, confidence tier, and retractions where claims could not be independently verified. Updates frontmatter confidence fields across all files. BROGAV: 56 issues found (12 material, 28 medium, 16 low).

**Key methodology insight:** The most common error: treating aggregator data (D&B, ZoomInfo) as primary sources. These platforms model/estimate data and propagate errors. Always ask: "What is the PRIMARY source?" The most productive instruction: "flag any claim that appears in multiple files with different values" -- contradictions are the top quality issue.

---

## 17. google-dorking-osint

**Description:** Structured Google dorking using known infrastructure identifiers to discover related assets and leaked information.

**When to invoke:** After tech stack analysis provides identifiers (GA IDs, M365 tenant, Canva usernames). Most productive mid-project when you have unique identifiers to search with.

**What it produces:** Discovered assets: other domains owned by same entity (via shared GA ID), documents on third-party sites mentioning the target, leaked content (public Canva links, shared Google Drive docs), partner/client relationships visible through shared infrastructure.

**Key methodology insight:** Do not just search the company name. Search THROUGH other organizations using the target's identifiers. A GA4 property ID searched across the web reveals all domains using that analytics account. `site:partnercompany.com "BROGAV"` reveals the relationship from the partner's perspective.

---

## 18. web-crawl-intelligence-extraction

**Description:** Process saved web crawl captures, deleted Wayback pages, video transcripts, and API response dumps into structured intelligence.

**When to invoke:** After crawling and scraping phases have collected raw data. Extracts structured findings from the raw corpus.

**What it produces:** Findings organized by entity type (people, companies, products, dates, amounts, locations). Each finding includes source file, extraction confidence, and target dossier section.

**Key methodology insight:** Prioritize by intelligence density: (1) PDF partner decks and case studies -- names, dates, project details; (2) video transcripts -- people mention clients casually; (3) job postings -- reveal tools, structure, growth plans; (4) deleted pages -- information removed is often more revealing than information kept.

---

## 19. industry-context-research

**Description:** 6-dimension macro industry research framework: economics, history, legal/regulatory, political, sociological/workforce, technology.

**When to invoke:** After company-specific research is complete. Positions the target within macro trends and identifies tailwinds/headwinds.

**What it produces:** Industry context section (Section 12) with sub-files per dimension: market sizing, channel economics, M&A landscape, regulatory environment, tariff exposure, workforce dynamics, technology trajectory, synthesis (opportunity map, threat map, positioning). BROGAV: 32 files across 6 dimensions.

**Key methodology insight:** Research the industry AFTER the company, not before. Company-specific findings reveal which dimensions matter most. For a data center VAR, the relevant dimensions were channel economics, federal procurement, tariff exposure, and AI/hyperscale buildout -- a generic industry report would miss VAR-specific dynamics. Run 6 agents in parallel for throughput.

---

## 20. commercial-property-research

**Description:** Property records, ownership verification (own vs. lease), floor plan acquisition, co-tenant mapping, and facility cost analysis.

**When to invoke:** After identifying physical addresses from corporate filings, website, or job postings. Provides financial capacity and growth trajectory intelligence.

**What it produces:** Property intelligence report: deed holder, own-vs-lease determination, tax records, square footage, building condition, co-tenants (for multi-tenant), lease rate vs. market comps, facility cost as percentage of revenue.

**Key methodology insight:** County assessor records are public and free. A company that OWNS its facility has more assets than one that leases. Facility cost / revenue ratio reveals operational efficiency. BROGAV: 4,102 sq ft owned property in residential area -- consistent with lean, drop-ship-oriented VAR model.

---

## Skill Execution Order (Recommended)

```
Phase 1 -- Foundation (Day 1)
  intelligence-dossier (orchestrator)
  deep-research (methodology)
  domain-email-enumeration
  website-techstack-analysis

Phase 2 -- Collection (Days 1-2)
  web-crawl-intelligence-extraction
  contact-sheet-image-analysis
  linkedin-activity-intelligence
  era-validated-linkedin-analysis

Phase 3 -- Verification (Days 2-3)
  supplier-verification / oem-partner-verification
  client-discovery-osint
  company-legal-reputation-research
  commercial-property-research
  open-source-traffic-analysis
  ad-transparency-audit
  google-dorking-osint

Phase 4 -- Analysis (Days 3-4)
  competitor-identification
  business-model-canvas
  industry-context-research

Phase 5 -- Quality Gate (Day 4)
  verification-audit
```

---

## Skill Selection Quick Reference

| Need | Skill |
|------|-------|
| Start a new dossier from scratch | `intelligence-dossier` |
| Fill gaps in any research area | `deep-research` |
| Vet legal/compliance risk | `company-legal-reputation-research` |
| Confirm supplier claims | `supplier-verification` or `oem-partner-verification` |
| Find hidden clients | `client-discovery-osint` |
| Mine LinkedIn for relationships | `linkedin-activity-intelligence` |
| Prevent multi-employer misattribution | `era-validated-linkedin-analysis` |
| Estimate website traffic | `open-source-traffic-analysis` |
| Map competitive landscape | `competitor-identification` |
| Discover email infrastructure | `domain-email-enumeration` |
| Reverse-engineer tech stack | `website-techstack-analysis` |
| Synthesize into business model | `business-model-canvas` |
| Process bulk images | `contact-sheet-image-analysis` |
| Audit ad spend claims | `ad-transparency-audit` |
| Final quality check | `verification-audit` |
| Find hidden docs via search | `google-dorking-osint` |
| Extract intel from raw captures | `web-crawl-intelligence-extraction` |
| Understand macro industry | `industry-context-research` |
| Assess real estate position | `commercial-property-research` |

---

## Key Metrics from BROGAV Project

| Skill | Time | Key Output |
|-------|------|------------|
| intelligence-dossier | ~4 hours | Complete 13-section dossier, 150+ files |
| deep-research | ~2 hours | 55 pages crawled, 33 deleted pages recovered |
| supplier-verification | ~1 hour | 2/40 confirmed (5% rate) |
| client-discovery-osint | ~1.5 hours | 75+ relationships from 12 sources |
| verification-audit | ~1 hour | 56 issues (12 material, 28 medium, 16 low) |
| industry-context-research | ~3 hours | 32 files across 6 dimensions |
| contact-sheet-image-analysis | ~30 min | 46 images, 3 new client relationships |
| competitor-identification | ~1 hour | 4,797 initial to 10 final competitors |
| domain-email-enumeration | ~20 min | 11 verified mailboxes, email pattern confirmed |
| linkedin-activity-intelligence | ~45 min | 97 companies from 181 posts |

---

## Execution Notes

- Skills are invoked by name reference in prompts (e.g., "Run the supplier-verification skill")
- Each skill's `SKILL.md` contains full methodology, expected inputs, and output format
- Skills compose: `intelligence-dossier` internally calls `deep-research`, `supplier-verification`, and `verification-audit`
- Parallel execution supported: `industry-context-research` runs 6 agents simultaneously (one per dimension)
- All skills output markdown with YAML frontmatter for programmatic processing
- Total time for comprehensive dossier on a private SMB: approximately 4 working days
