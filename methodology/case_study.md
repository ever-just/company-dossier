# Building the BROGAV Solutions Intelligence Dossier: A Case Study

## Overview

This document narrates the complete construction of a competitive intelligence dossier on BROGAV Solutions LLC, a woman-owned commercial furniture dealership in Minneapolis, MN. The project ran June 10-14, 2026 and produced a 149-file intelligence package covering company profile, people, products, financials, marketing, industry context, and competitive landscape.

The work was performed by AI agents (Claude, invoked through Windsurf/Devin IDE and Claude Code CLI) with a human operator providing strategic direction, editorial decisions, and manual retrieval where automation was blocked.

---

## Day 1 (June 10-11, 2026): Initial Collection

### What Happened

The human invoked the `intelligence-dossier` agent skill inside Windsurf with a prompt requesting a full competitive intelligence dossier on BROGAV Solutions LLC. The skill orchestrated the following automated pipeline:

**Live Site Crawl**
- Agent crawled brogav.com systematically, capturing 55 pages of content
- Extracted navigation structure, service descriptions, team bios, project galleries
- Identified Wix as the CMS platform (implications: no robots.txt blocking, predictable URL patterns, limited SEO tooling)

**Wayback Machine CDX Discovery**
- Queried the Internet Archive's CDX API for all archived versions of brogav.com
- Discovered 12 PDF documents hosted on Wix CDN that were no longer linked from the live site
- Downloaded all PDFs (line cards, capability statements, project case studies)
- These PDFs contained data not available anywhere on the current site

**Logo Wall OCR**
- Extracted supplier brand logos from the "Partners" page imagery
- OCR + visual identification yielded ~25 brand names
- Cross-referenced against manufacturer websites to confirm partnerships

**People Intelligence**
- Queried aggregator platforms (SignalHire, RocketReach, Prospeo) for employee records
- Identified 15+ current and former employees
- Captured titles, tenure estimates, LinkedIn profile URLs
- Noted contradictions between sources (a recurring theme)

**Output**
- Initial 13-section dossier structure created
- Raw data organized into: Company Profile, People & Organization, Products & Suppliers, Market & Customers, Financials, Marketing & Events, Legal & Compliance, plus supporting sections
- Each section contained a README.md with summary and links to detail files

### Key Findings from Day 1
- BROGAV is a relatively small operation (estimated 10-20 employees)
- Strong WBENC/EDWOSB certification positioning
- Heavy reliance on manufacturer partnerships rather than proprietary products
- Limited digital marketing sophistication despite decent content volume

---

## Day 2 (June 12, 2026): Federal & Financial Deep Dive

### What Happened

With the skeleton in place, the human directed deeper investigation into financial profile and federal contracting status.

**Federal Contracting Research**
- USASpending.gov API queried for all awards to BROGAV Solutions — returned $0
- CLEATUS (Contract Lookup and Entity Analysis Tool) verified:
  - UEI (Unique Entity Identifier) is registered and active
  - CAGE code assigned
  - SAM.gov registration current
- Conclusion: BROGAV is registered for federal work but has won zero prime contracts
- This is notable because their EDWOSB certification exists specifically to win set-aside contracts

**D&B Firmographics**
- Dun & Bradstreet data incorporated
- Revenue figure of $4.51M obtained
- Employee count cross-referenced against LinkedIn and aggregator data

**Revenue Model Triangulation**
- D&B number ($4.51M) validated against independent calculation:
  - Headcount (confirmed employees) x industry revenue-per-employee benchmarks
  - Commercial furniture dealer median: $300K-$500K revenue per employee
  - 10-15 employees x $350K = $3.5M-$5.25M range
  - D&B figure falls within expected range — assessed as plausible

**Certification Verification**
- WBENC certification renewal confirmed via University of Minnesota OSD supplier directory
- Expiration date: May 31, 2026 (noted as requiring follow-up on renewal)
- EDWOSB (Economically Disadvantaged Women-Owned Small Business) status discovered via G2Xchange federal market intelligence platform
- This dual certification is a significant competitive differentiator in government and corporate supplier diversity programs

**Gap Analysis**
- Agent produced a prioritized list of remaining intelligence gaps
- Highest priority: competitive landscape, web traffic, deeper people profiles
- Medium priority: facility/lease details, insurance, bonding capacity
- Lower priority: political donations, litigation history (initial search showed nothing)

---

## Day 3 (June 13, 2026): Specialized Deep Dives

### What Happened

Day 3 was the most intensive research day, with multiple specialized agent skills invoked in sequence.

**Web Traffic Analysis**
- SimilarWeb API queried for brogav.com traffic estimates
- Competitor domains benchmarked for relative traffic comparison
- Results: very low organic traffic (typical for B2B furniture dealers who rely on relationships, not inbound)
- Traffic sources analyzed: mostly direct + referral, minimal organic search

**Competitive Landscape Screening**
- S&P Global Capital IQ database queried with filters:
  - Industry: Office Furniture Dealers / Commercial Interiors
  - Geography: Minnesota / Upper Midwest
  - Revenue: $1M-$50M range
- Initial result set: 4,797 companies nationally
- Filtered to regional competitors: ~50 companies
- Deep-profiled top 10 based on overlap in geography, size, and service offering
- Competitor profiles created with revenue, headcount, certifications, key differentiators

**Photo Intelligence Extraction**
- 46 images from the BROGAV website and social media analyzed
- Evidence extracted: office locations, project types, team size at events, client logos visible in installation photos
- Several images revealed client relationships not mentioned in text (logos on furniture in project photos)
- Event photos provided timeline evidence for team composition changes

**LinkedIn Post Analysis**
- 181 LinkedIn posts from BROGAV company page and employee profiles analyzed
- 97 unique companies tagged or mentioned across all posts
- Categorized into: clients, suppliers, industry partners, event co-participants
- Timeline analysis showed posting frequency and content strategy evolution
- Era-validated to prevent misattribution (employee posts from prior employers excluded)

**Industry Context Research**
- 6-dimension research framework applied:
  1. Economics: market size, growth rates, consolidation trends
  2. History: evolution of commercial furniture dealing, shift from transactional to service model
  3. Legal: GSA schedule requirements, state procurement rules, ADA compliance
  4. Political: government spending trends, Buy American provisions, DEI/supplier diversity executive orders
  5. Sociological: hybrid work impact on furniture demand, wellness/ergonomics trends
  6. Technology: configurators, BIM integration, sustainability tracking
- 32 research files produced across these dimensions
- Each file sourced from industry publications (Contract Magazine, Interior Design, FMLink)

**Children's Book Discovery**
- Web search for company name origin uncovered a self-published children's book
- Confirmed "BROGAV" is derived from founder's children's names
- This is a common pattern in woman-owned businesses (personal branding tied to family narrative)

**Content Audit**
- Automated cross-referencing pass identified:
  - 10 factual errors (dates wrong, titles incorrect, math errors)
  - 39 duplicate data points (same fact stated in multiple files with slight variations)
  - All corrected in place

---

## Day 4 (June 14, 2026): Architecture Redesign

### What Happened

The human shifted from research to structural engineering, invoking Claude Code for a comprehensive audit and reorganization.

**3-Agent Forensic Audit**
- Human deployed 3 parallel verification agents, each responsible for a section range:
  - Agent 1: Sections 00-04 (Company Profile, People, Products, Markets)
  - Agent 2: Sections 05-09 (Financials, Marketing, Legal, Operations)
  - Agent 3: Sections 10-13 (Industry, Competitors, Timeline, Appendices)
- Each agent independently verified all claims, checked math, flagged contradictions
- Combined output: 56 issues identified (12 material, 28 medium, 16 low)
- All issues remediated before restructure

**Architecture Redesign**
- Human and agent collaborated on a new folder structure inspired by:
  - M&A data room conventions (how acquirers expect to find information)
  - Obsidian MOC (Map of Content) methodology (for navigability)
  - YAML frontmatter standards (for future RAG/LLM ingestion)
- Decision: restructure from 13 flat sections to 12 thematic sections + 4 infrastructure folders

**Migration Execution**
- 13-section structure reorganized into cleaner taxonomy
- Entity splitting performed:
  - 17 individual supplier profile files (one per confirmed partner)
  - 8 individual competitor profile files (one per top competitor)
  - 15 individual people profile files (one per identified person)
- Each entity file follows a consistent template with YAML frontmatter

**Navigation Infrastructure**
- `ROUTER.md` created: 110 question-to-file-path mappings
  - Example: "What is BROGAV's revenue?" → `05_Financials/financial_signals.md`
  - Example: "Who is the CEO?" → `02_People/leadership/celina_berglund.md`
  - Designed so an LLM can route a user question to the right file without reading the whole dossier
- 12 `_MOC.md` files created (one per section) providing section-level navigation
- All internal links audited and fixed (no broken cross-references)

**YAML Frontmatter**
- All 149 files received standardized frontmatter:
  ```yaml
  ---
  title: [File Title]
  section: [Section Number and Name]
  entity_type: [person|company|supplier|competitor|topic]
  confidence: [high|medium|low]
  last_verified: 2026-06-14
  sources: [list of primary sources]
  ---
  ```
- This enables programmatic filtering, confidence-weighted retrieval, and staleness detection

**GitHub Push**
- Final package committed and pushed to private GitHub repository
- Clean commit history (initial commit + structural migration)

---

## Division of Labor

### What the Human Did Manually

| Task | Why Manual |
|---|---|
| Invoked agent skills with carefully crafted prompts | Strategic direction requires human judgment about what matters |
| Retrieved MN Secretary of State filing | Portal uses CAPTCHAs and session-based access that block automation |
| Made editorial decisions (keep archive copies, which conflicting data to trust) | Value judgments about information quality require human context |
| Reviewed and approved plans before execution | Destructive operations (file moves, deletes) need human sign-off |
| Decided when to stop researching and start structuring | Diminishing returns assessment is a human judgment call |

### What the Agents Did

| Task | Volume |
|---|---|
| Data collection (crawling, API queries, OCR, scraping) | 55 pages crawled, 12 PDFs captured, 5+ APIs queried |
| Analysis (cross-referencing, math verification, contradiction detection) | 56 issues found across 149 files |
| Content creation (profiles, MOCs, indexes, frontmatter) | 149 files written, 110 router entries, 12 MOCs |
| Structural decisions (folder architecture, naming, format choices) | Complete taxonomy designed from scratch |
| Quality assurance (audit, verification passes, link checking) | 3 parallel audit agents, full grep-based verification |

---

## Timeline Summary

| Day | Hours | Focus | Output |
|---|---|---|---|
| 1 | ~4h | Raw collection | 13-section skeleton, 55 pages, 12 PDFs |
| 2 | ~3h | Financial & federal | Revenue model, certifications, gap analysis |
| 3 | ~6h | Specialized deep dives | 32 industry files, competitor profiles, photo intel |
| 4 | ~5h | Audit + restructure | 56 issues fixed, 149 files reorganized, pushed to GitHub |
| **Total** | **~18h** | | **149-file dossier with full navigation infrastructure** |

---

## Key Takeaways

1. **The 80/20 of dossier building is collection vs. structure.** Day 1-3 collected everything; Day 4 made it usable. Without the restructure, the dossier would be a pile of files. With it, any question can be answered in one file lookup.

2. **Agents are best at breadth; humans are best at judgment.** The agent can check 4,797 companies in minutes. The human decides which 10 matter.

3. **Contradictions are the norm, not the exception.** Every people-intelligence aggregator returned different data. Revenue estimates varied by 40%. The skill is in triangulation, not in trusting any single source.

4. **PDFs from Wayback are gold.** Companies routinely delete capability statements, line cards, and case studies from their websites. The Internet Archive preserves them. 12 PDFs yielded data available nowhere else.

5. **Structure enables retrieval.** YAML frontmatter + ROUTER.md + MOCs transform a research dump into something an LLM (or human) can navigate in seconds. This infrastructure is as valuable as the content itself.
