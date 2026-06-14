# Output Architecture

This document describes the folder structure, navigation patterns, and design principles of the finished intelligence dossier.

---

## Design Principles

### 1. Entity-Centric Design

Every identifiable entity (person, company, supplier, competitor) gets its own file. This enables:
- Targeted retrieval: an LLM can return a single file that answers a question about an entity
- Independent updates: when information changes about one supplier, only that file needs editing
- Cross-referencing: other files link TO entity files rather than duplicating information

### 2. Maximum 500 Lines Per File

No file exceeds 500 lines. When content grows beyond this threshold, it must be split into sub-files or entity files. Rationale:
- LLM context windows handle 500-line files efficiently without truncation
- Human readers can scan a 500-line file in <5 minutes
- Git diffs remain readable for files under 500 lines
- Forces the author to be concise and well-structured

### 3. Three-Audience Optimization

The architecture serves three distinct access patterns:
1. **M&A due diligence** — Investor can find any answer in <30 seconds via ROUTER.md
2. **LLM retrieval (RAG)** — System can identify the correct file from a user question using frontmatter metadata
3. **Human browsing** — Analyst can discover and explore without prior knowledge via _MOC.md files

---

## Complete Folder Tree

```
BROGAV_Solutions_Dossier/
├── ROUTER.md                          # 110+ question→file path mappings
├── 00_KEY_FACTS_SHEET.md              # One-page executive summary (all key metrics)
│
├── 01_Company_Profile/
│   ├── _MOC.md                        # Map of Content for this section
│   ├── _meta.yaml                     # Section metadata for tooling
│   ├── README.md                      # Section overview and summary
│   ├── company_overview.md            # Legal name, DBA, address, formation
│   ├── federal_registration.md        # SAM.gov, CAGE, UEI, NAICS codes
│   ├── state_registration.md          # MN SOS filing, registered agent
│   ├── certifications.md              # WBENC, EDWOSB, DBE, MBE details
│   └── domain_and_infrastructure.md   # DNS, email, hosting, tech stack
│
├── 02_People_and_Organization/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── team_roster.csv                # Structured: name, title, start_date, LinkedIn, confidence
│   ├── full_roster_profiles.md        # Narrative summaries of all personnel
│   ├── hiring_and_growth.md           # Headcount trends, growth signals
│   ├── departures_and_changes.md      # Turnover analysis, timeline of changes
│   ├── org_chart.md                   # Reporting structure (inferred)
│   └── leadership/                    # Individual entity files for leaders
│       ├── celina_berglund.md
│       ├── jessa_brixius.md
│       ├── thomas_weiss.md
│       └── [other_leaders].md
│
├── 03_Products_and_Suppliers/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── product_categories.md          # Furniture, flooring, walls, technology
│   ├── branded_cabinet_line.md        # BROGAV-branded product (if any)
│   ├── supplier_line_card.csv         # Structured: brand, category, status, confidence
│   ├── product_asset_audit.md         # Catalog completeness assessment
│   └── suppliers/                     # Individual entity files per supplier
│       ├── steelcase.md
│       ├── knoll.md
│       ├── herman_miller.md
│       └── [other_suppliers].md
│
├── 04_Market_and_Customers/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── target_markets.md              # Segments, verticals, geographic focus
│   ├── identified_clients.md          # Known/inferred client relationships
│   ├── go_to_market.md                # How they win business
│   └── clients/                       # Individual entity files per client
│       └── [client_name].md
│
├── 05_Financials/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── financial_signals.md           # Revenue estimates, contract data, proxies
│   ├── valuation_considerations.md    # Multiples, comps, methodology
│   └── revenue_model.md              # How they make money (markup, fees, recurring)
│
├── 06_Marketing_and_Events/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── social_media.md                # Platform presence, activity analysis
│   ├── press_and_media.md             # Press releases, articles, mentions
│   ├── events.csv                     # Structured: event, date, role, location
│   ├── events/                        # Individual event detail files
│   │   └── [event_name].md
│   ├── ad_transparency.md             # Active ad spend analysis
│   └── web_traffic.md                 # Traffic estimates and source breakdown
│
├── 07_Legal_and_Compliance/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── court_records.md               # Litigation search results
│   ├── liens_and_judgments.md         # UCC filings, tax liens
│   └── regulatory_compliance.md       # Industry-specific compliance
│
├── 08_Technology/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── tech_stack.md                  # CMS, CRM, analytics, tools
│   ├── digital_maturity.md            # Assessment of digital capabilities
│   └── tracking_and_pixels.md         # GTM container analysis
│
├── 09_Operations/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── facilities.md                  # Office/warehouse locations, own vs. lease
│   ├── service_delivery.md            # How they fulfill orders
│   └── logistics.md                   # Delivery, installation, supply chain
│
├── 10_Industry_Context/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── economics/                     # Market size, margins, growth
│   ├── history/                       # Industry evolution
│   ├── legal/                         # Regulatory landscape
│   ├── political/                     # Government spending, tariffs
│   ├── sociological/                  # Workplace trends, DEI
│   └── technology/                    # Digital transformation in furniture
│
├── 11_Competitive_Landscape/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   ├── competitive_summary.md         # Overview and positioning map
│   ├── competitor_matrix.csv          # Structured comparison data
│   └── competitors/                   # Individual entity files per competitor
│       ├── ispace_inc.md
│       ├── atmos_studio.md
│       └── [other_competitors].md
│
├── 12_Timeline/
│   ├── _MOC.md
│   ├── _meta.yaml
│   ├── README.md
│   └── master_timeline.md             # Chronological event log with sources
│
├── _infrastructure/
│   ├── CHANGELOG.md                   # All changes to the dossier with dates
│   ├── CONFIDENCE_LEGEND.md           # Definitions: high/medium/low/unverified
│   ├── SOURCE_INDEX.md                # Master list of all sources used
│   └── METHODOLOGY.md                # How this dossier was built
│
├── _datasets/
│   ├── products.csv                   # Canonical product/supplier dataset
│   ├── people.csv                     # Canonical personnel dataset
│   ├── competitors.csv                # Canonical competitor dataset
│   └── events.csv                     # Canonical events dataset
│
├── _captures/
│   ├── site_crawl/                    # Raw HTML from live crawl
│   ├── wayback/                       # Archived page captures
│   ├── documents/                     # Downloaded PDFs, presentations
│   ├── video/                         # VTT captions, metadata JSON
│   └── screenshots/                   # Evidence screenshots
│
└── _templates/
    ├── person_profile.md              # Template for new person entities
    ├── supplier_profile.md            # Template for new supplier entities
    ├── competitor_profile.md          # Template for new competitor entities
    └── event_detail.md                # Template for new event files
```

---

## Navigation Patterns

### ROUTER.md

The root-level `ROUTER.md` file maps natural-language questions to file paths. It serves as the primary retrieval index for both humans and LLM-based RAG systems.

**Format:**

```markdown
| Question | File Path | Section |
|----------|-----------|---------|
| What is BROGAV's revenue? | 05_Financials/financial_signals.md | Financials |
| Who is the CEO? | 02_People_and_Organization/leadership/celina_berglund.md | People |
| Is BROGAV WBENC certified? | 01_Company_Profile/certifications.md | Company Profile |
| Who are BROGAV's competitors? | 11_Competitive_Landscape/competitive_summary.md | Competitors |
| Does BROGAV have government contracts? | 05_Financials/financial_signals.md | Financials |
| What is BROGAV's tech stack? | 08_Technology/tech_stack.md | Technology |
```

**Coverage targets:**
- Every person by name (15+ entries)
- Every competitor by name (10+ entries)
- Every supplier by name (17+ entries)
- Every certification by name
- Every financial metric
- Process/strategy questions ("How does BROGAV win business?")
- Comparison questions ("How does BROGAV compare to iSpace?")

**Total entries:** 110+ (covers ~90% of likely questions)

### _MOC.md (Map of Content)

Every section folder contains a `_MOC.md` file that provides hierarchical navigation. The MOC pattern (from Obsidian/Zettelkasten methodology) enables discovery without requiring prior knowledge of the content.

**Format:**

```markdown
---
title: Products and Suppliers - Map of Content
section: 03
file_count: 22
last_updated: 2026-06-14
---

# Products and Suppliers

## Overview
- [README](README.md) — Section summary and key findings

## Product Intelligence
- [Product Categories](product_categories.md) — Furniture, flooring, walls, technology
- [Branded Cabinet Line](branded_cabinet_line.md) — BROGAV's own-brand product
- [Product Asset Audit](product_asset_audit.md) — Catalog completeness

## Supplier Relationships
- [Supplier Line Card](supplier_line_card.csv) — Full structured dataset
- [Steelcase](suppliers/steelcase.md) — Status: Confirmed
- [Knoll](suppliers/knoll.md) — Status: Claimed
- [Herman Miller](suppliers/herman_miller.md) — Status: Historical
- ...

## Key Findings
- Only 2/40 supplier relationships independently confirmed
- BROGAV carries products across 4 major categories
- Branded cabinet line suggests manufacturing ambition
```

### _meta.yaml

Machine-readable section metadata for automated tooling (quality checks, freshness audits, CI pipelines).

**Format:**

```yaml
section_name: Products and Suppliers
section_number: 3
file_count: 22
entity_files: 17
last_updated: 2026-06-14
description: Product catalog, supplier relationships, and manufacturer verification
confidence_distribution:
  high: 3
  medium: 8
  low: 6
  unverified: 5
```

---

## YAML Frontmatter Schema

Every content file (not CSVs or infrastructure files) includes YAML frontmatter. This enables programmatic quality checks, RAG indexing, and automated freshness monitoring.

### Required Fields

```yaml
---
title: "Human-readable title"
section: "03_Products_and_Suppliers"
entity_type: "supplier|person|competitor|company|event|topic"
confidence: "high|medium|low|unverified"
last_verified: "2026-06-14"
sources:
  - "https://source-url.com"
  - "LinkedIn profile (viewed 2026-06-10)"
  - "D&B Hoovers (accessed 2026-06-12)"
related_files:
  - "../05_Financials/financial_signals.md"
  - "./suppliers/steelcase.md"
---
```

### Field Definitions

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Display name for the file content |
| `section` | string | Parent section folder name |
| `entity_type` | enum | What kind of entity this file describes |
| `confidence` | enum | Overall confidence in the file's claims (see CONFIDENCE_LEGEND.md) |
| `last_verified` | date | When claims in this file were last checked against sources |
| `sources` | list | All sources used to build this file's content |
| `related_files` | list | Relative paths to files that cross-reference this one |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `relationship_status` | enum | For suppliers: confirmed, claimed, historical |
| `verification_method` | string | How the relationship/claim was verified |
| `current_role` | string | For people: their title, or "Former" |
| `revenue_estimate` | string | For competitors: estimated revenue |
| `last_known_update` | date | When the source data was last updated (vs. when we checked) |

---

## Cross-Referencing

### Relative Links

Files reference each other using relative markdown links:

```markdown
See [Celina Berglund's profile](../02_People_and_Organization/leadership/celina_berglund.md) 
for details on leadership background.

Revenue estimate methodology is documented in 
[Financial Signals](../05_Financials/financial_signals.md#revenue-estimation).
```

### related_files Frontmatter

The `related_files` array in frontmatter provides machine-readable cross-references:

```yaml
related_files:
  - "../02_People_and_Organization/leadership/celina_berglund.md"
  - "../05_Financials/financial_signals.md"
  - "./suppliers/steelcase.md"
```

This enables:
- Automated link validation (check all paths resolve)
- Graph visualization (which files are most connected)
- RAG context expansion (pull related files for fuller answers)

### Single Source of Truth Rule

When the same fact could live in multiple files, it lives in ONE canonical location and other files link to it:
- A person's title lives in their profile file, not in every file that mentions them
- Revenue lives in `financial_signals.md`, not duplicated in competitor comparisons
- A supplier's status lives in their entity file, not in the line card AND the MOC

The canonical CSV datasets in `_datasets/` are the single source of truth for structured data. Narrative files reference them but do not duplicate their content.

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Folders | `NN_Name_With_Underscores` | `03_Products_and_Suppliers` |
| Content files | `snake_case.md` | `financial_signals.md` |
| Entity files | `entity_name.md` | `celina_berglund.md` |
| Datasets | `descriptive_name.csv` | `supplier_line_card.csv` |
| Infrastructure | `UPPER_CASE.md` | `ROUTER.md`, `CHANGELOG.md` |
| Templates | `entity_type.md` | `person_profile.md` |
| Meta files | `_prefix` | `_MOC.md`, `_meta.yaml` |

---

## Infrastructure Folders

### _infrastructure/

Files that describe the dossier itself (meta-documentation):
- `CHANGELOG.md` — Dated log of all additions, corrections, and structural changes
- `CONFIDENCE_LEGEND.md` — Defines what high/medium/low/unverified mean in context
- `SOURCE_INDEX.md` — Master list of every source cited anywhere in the dossier
- `METHODOLOGY.md` — How the dossier was built (points to `/docs/` for full detail)

### _datasets/

Canonical structured data (CSV format). These are the authoritative source for any data that appears in narrative form elsewhere:
- `products.csv` — All products/suppliers with category, brand, status, confidence
- `people.csv` — All identified personnel with title, tenure, source, confidence
- `competitors.csv` — All competitors with revenue, headcount, location, overlap score
- `events.csv` — All events with date, location, BROGAV's role, source

### _captures/

Raw evidence files organized by collection method. These are never edited after capture — they serve as the immutable evidence base. Narrative files cite captures as sources.

### _templates/

Blank templates for creating new entity files. Ensures consistency when the dossier is updated with new people, suppliers, or competitors discovered after initial build.

---

## Architectural Decisions Log

| Decision | Rationale | Alternative Considered |
|----------|-----------|----------------------|
| 12 content sections | Matches M&A data room conventions; covers all intelligence domains without overlap | 8 sections (too broad, files become too long) |
| Entity files in subfolders | Enables independent updates and targeted retrieval | All content in section-level files (creates 2000+ line monsters) |
| ROUTER.md at root | Fastest path from question to answer; works for humans and LLMs | Relying solely on folder structure (requires prior knowledge) |
| _MOC.md per section | Discovery-oriented navigation for analysts who don't know what to look for | Table of contents in README (mixes summary with navigation) |
| YAML frontmatter | Enables programmatic quality checks without parsing content | Metadata in separate sidecar files (harder to keep in sync) |
| 500-line maximum | Prevents context window overflow and forces concise writing | No limit (leads to 2000-line files that no one reads completely) |
| Relative links | Works regardless of where the dossier root is mounted | Absolute paths (break when repo is cloned to different location) |
| CSV for structured data | Universal format readable by any tool; git-diffable | JSON (harder to visually scan), SQLite (requires tooling) |
| Snake_case naming | No spaces means no quoting issues in terminals, scripts, or URLs | Title Case with spaces (breaks in CLI, requires quoting everywhere) |
