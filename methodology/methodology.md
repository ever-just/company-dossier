# Methodology Overview

## Philosophy

This methodology operates on four foundational principles:

1. **Public sources only.** Every piece of intelligence must be derivable from publicly accessible information — websites, government registries, social media, public filings, video content, and cached/archived pages. No social engineering, no pretexting, no unauthorized access. This keeps the process legal, ethical, and reproducible by any agent or analyst.

2. **Reproducible.** Another agent (or human) should be able to follow these steps and arrive at substantially the same dossier. Every decision point is documented. Every tool invocation is specified. The methodology is deterministic enough to automate while flexible enough to handle edge cases.

3. **Confidence-tagged.** No claim exists without a confidence level. `HIGH` means three or more independent sources corroborate the fact. `MEDIUM` means two sources agree. `LOW` means a single source or inference. Unverifiable claims are either retracted or explicitly flagged as speculative.

4. **Entity-centric.** The dossier is organized around entities (people, companies, products, locations) rather than around research activities. Each entity gets its own file with structured frontmatter. This makes cross-referencing natural and allows partial updates without restructuring the whole dossier.

---

## The 7-Phase Research Pipeline

### Phase 1: PLAN (5 minutes)

The planning phase prevents wasted effort. Before touching any tool, the agent enumerates all known facts about the target, identifies the most promising source categories, and creates a checklist of specific questions to answer. The output is a research plan with prioritized sources and explicit gaps to fill.

Sequential thinking (step-by-step reasoning) is critical here. The agent should ask: What do I already know? What public registries exist for this company type? What platforms would their employees use? What industry events would they attend? The plan becomes the roadmap for all subsequent phases.

### Phase 2: LOCAL (5 minutes)

Before making any external requests, exhaust local data. This means parsing any cached web pages, analyzing existing repository files, reading previously captured PDFs, and mining structured data (CSVs, JSON) that may already exist in the workspace. This phase often reveals 30-40% of the answers immediately.

The local phase also identifies gaps — questions that cannot be answered from cached data alone. These gaps become the priority targets for the search and scrape phases. Never search for something you already have.

### Phase 3: SEARCH (15 minutes)

Web search follows a three-tier strategy: **Broad** (company name + industry terms), **Targeted** (specific people, products, or events), and **Domain-specific** (searching through industry directories, award databases, government portals). Each tier uses different query construction patterns.

Key techniques include Google dorking with known infrastructure identifiers (GA tracking IDs, M365 tenants, Canva usernames), searching THROUGH other organizations (trade associations, event sponsors, project partners) rather than searching FOR the target directly, and using filetype operators to surface PDFs, spreadsheets, and presentations.

### Phase 4: WAYBACK (30 minutes)

The Wayback Machine CDX API is the single most powerful tool for understanding a company's history. Query the CDX index for all captures of the target domain, then systematically retrieve key pages at multiple timestamps. This reveals: team members who have since departed, products that were discontinued, pricing that has changed, partnerships that ended, and messaging pivots.

Rate limiting is critical — 1.5 seconds between Wayback requests to avoid being blocked. Prioritize high-value pages: About/Team, Products/Services, Partners, and any page that returned a 404 on the live site. Deleted pages often contain the most valuable intelligence.

### Phase 5: SCRAPE (30 minutes)

Platform-specific scraping targets structured data that general search misses. This includes: event platforms (Sched, Emamo, Eventbrite) for speaking appearances and booth presence, YouTube for video content and auto-generated captions, LinkedIn for organizational structure and hiring patterns, job boards for tech stack and growth signals, and review sites for customer sentiment.

Async scraping with rate limiting (0.4 seconds for YouTube, 1-2 seconds for most platforms) allows parallel collection without triggering blocks. Always extract structured metadata (dates, tags, categories) alongside content.

### Phase 6: SYNTHESIZE (30 minutes)

Synthesis transforms raw collected data into structured intelligence. The process is: (1) Cross-reference claims across sources — if three sources agree, mark HIGH confidence. (2) Resolve contradictions — when sources disagree, note the discrepancy and investigate further or flag as uncertain. (3) Build entity profiles — consolidate everything known about each person, company, or product into their dedicated file. (4) Map relationships — who works with whom, who supplies what to whom, who competes with whom.

The synthesis phase is where most analytical value is created. Raw data becomes insight through triangulation and pattern recognition.

### Phase 7: REPORT (30 minutes)

The final phase produces the deliverable dossier. This means: populating all section READMEs with Maps of Content, writing the Key Facts Sheet as a one-page executive summary, generating CSV datasets from accumulated structured data, building the ROUTER.md navigation index, and optionally producing Excel/PDF exports for non-technical consumers.

Quality checks happen here: every claim has a source, every confidence tag is justified, every section README accurately describes its contents, and cross-links between files are valid.

---

## Time Estimates

| Phase | Duration | Primary Activity |
|-------|----------|-----------------|
| Plan | 5 min | Source enumeration, gap analysis, checklist creation |
| Local | 5 min | Cache parsing, existing data analysis |
| Search | 15 min | 3-tier web search (broad → targeted → domain-specific) |
| Wayback | 30 min | CDX API querying, historical page recovery |
| Scrape | 30 min | Platform-specific data collection |
| Synthesize | 30 min | Cross-referencing, confidence tagging, entity building |
| Report | 30 min | Dossier assembly, quality checks, export |
| **Total** | **~2.5 hours** | |

These times assume a skilled agent with all tools pre-configured. First-time setup adds 30-60 minutes for tool installation and API configuration.

---

## Design Principles

### Separation of Evidence and Analysis

Raw evidence (screenshots, HTML captures, PDF downloads) lives in a `sources/` or `captures/` directory. Analysis and synthesis live in the dossier sections. This separation means you can always trace an analytical claim back to its raw evidence, and you can re-run synthesis without re-collecting data.

### Entity-Centric Files

Every significant entity (person, company, product, supplier) gets its own markdown file with YAML frontmatter:

```yaml
---
entity_type: person
name: "Jane Smith"
role: "VP of Sales"
company: "Target Co"
confidence: HIGH
sources:
  - https://targetco.com/team
  - https://linkedin.com/in/janesmith
last_verified: 2026-06-10
---
```

This structure enables programmatic access, automated updates, and consistent cross-referencing.

### YAML Frontmatter

Every file in the dossier begins with YAML frontmatter containing metadata: last updated date, confidence level, primary sources, and section classification. This makes the dossier machine-readable and enables automated quality audits.

### MOC (Map of Content) Navigation

Each section's `README.md` serves as a Map of Content — a navigational hub that links to all files in that section with one-line descriptions. This pattern (borrowed from knowledge management systems like Obsidian) allows both humans and agents to quickly orient themselves within the dossier.

### ROUTER.md Pattern

The top-level `ROUTER.md` is the master navigation file. It lists every file in the dossier with a one-line description and its confidence level. An agent landing in the dossier for the first time reads ROUTER.md to understand the complete structure before diving into any section.

---

## What "Done" Looks Like

A complete dossier meets these quantitative standards:

| Metric | Target |
|--------|--------|
| Total files | 30-50 structured markdown + CSV files |
| Section coverage | All 12 sections populated (even if thin) |
| Confidence distribution | 40%+ HIGH, 30%+ MEDIUM, <30% LOW |
| Source attribution | 100% of factual claims cite at least one source |
| Entity profiles | Individual file for every person in leadership + key suppliers |
| Data layer | At least 3 CSV datasets (people, suppliers, events/products) |
| Cross-links | Every entity mentioned in multiple sections is linked to its profile |
| Key Facts Sheet | Complete and accurate summary of all critical findings |
| ROUTER.md | Accurately indexes every file with current descriptions |

A dossier is "done" when an executive could read the Key Facts Sheet and make an informed decision, an analyst could drill into any section for supporting evidence, and an agent could programmatically extract structured data from the CSVs and frontmatter.
