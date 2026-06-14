# Output Structure Architecture

This document defines the folder architecture, file conventions, and design rationale for a finished company intelligence dossier. Based on the BROGAV Solutions dossier (June 2026).

---

## Full Folder Tree

```
BROGAV DOSSIER/
|
|-- README.md                          # Top-level overview and reading guide
|-- ROUTER.md                          # Question-to-file lookup table (110+ entries)
|-- CHANGELOG.md                       # Dossier revision history
|
|-- 1_corporate/                       # Legal identity, registrations, facilities
|   |-- _MOC.md                        # Map of Content for this section
|   |-- identity.md                    # Legal name, entity type, formation, brand
|   |-- registrations.md               # MN SOS, D-U-N-S, UEI, CAGE, SAM.gov
|   |-- certifications.md             # WBENC, WOSB, EDWOSB, DBE, BBB
|   |-- facilities.md                  # Physical locations, own vs. lease
|   |-- tech_stack.md                  # Website, email, analytics, CRM
|   |-- legal_and_reputation.md        # Court records, liens, reviews, risk
|   |-- contacts.md                    # Phone, email, social handles
|   |-- phone_contacts.md             # Verified phone directory
|   |-- industry_codes.md             # NAICS, SIC, PSC codes
|   |-- industry_classification.md    # Sector positioning explanation
|   `-- certifications_tracker.csv    # Structured cert data
|
|-- 2_people/                          # Team roster, org structure, hiring
|   |-- _MOC.md
|   |-- org_overview.md                # Headcount, structure, reporting lines
|   |-- headcount_reconciliation.md    # Cross-source headcount validation
|   |-- hiring_signals.md             # Job postings, growth indicators
|   |-- hiring_signals_job_postings.md # Specific posting analysis
|   |-- departures.md                  # Known departures and transitions
|   `-- profiles/                      # One file per person
|       |-- celina_berglund.md
|       |-- thomas_weiss.md
|       |-- jessa_brixius.md
|       |-- adam_tueller.md
|       |-- [firstname_lastname].md    # Pattern: snake_case full name
|       `-- _unverified.md            # People with insufficient evidence
|
|-- 3_products/                        # Product portfolio and services
|   |-- _MOC.md
|   |-- portfolio_overview.md          # High-level product strategy
|   |-- branded_cabinets.md            # Proprietary product line
|   |-- pricing_and_channel.md         # Pricing model and distribution
|   |-- pricing_intelligence.md        # Observed price points
|   |-- services_turnkey.md            # Installation/integration services
|   |-- services_rental.md             # Rental/leasing programs
|   `-- categories/                    # One file per product category
|       |-- white_space.md             # Racks, cabinets, enclosures
|       |-- power_management.md        # UPS, PDU, generators
|       |-- cooling_containment.md     # CRAC, containment, airflow
|       `-- monitoring_safety.md       # DCIM, sensors, fire suppression
|
|-- 4_suppliers/                       # Manufacturer relationships
|   |-- _MOC.md
|   |-- oem_verification.md            # Verification results matrix
|   |-- supplier_version_tracking.md   # Logo wall changes over time
|   |-- supply_chain_risks.md          # Concentration, tariff, single-source
|   `-- profiles/                      # One file per supplier
|       |-- eaton.md
|       |-- schneider_electric.md
|       |-- vertiv.md
|       |-- [supplier_name].md         # Pattern: snake_case brand name
|       `-- _others.md                # Minor suppliers grouped
|
|-- 5_customers/                       # Client relationships and prospects
|   |-- _MOC.md
|   |-- known_clients.md              # Confirmed client list
|   |-- client_discovery.md           # Methodology and findings
|   |-- client_relationship_registry.md # Full registry with confidence tiers
|   |-- target_markets.md             # Industry verticals served
|   |-- testimonials.md               # Collected testimonials/quotes
|   |-- industry_associations.md      # Association memberships
|   `-- prospects/                    # Prospective clients
|       |-- prospect_ranking.md
|       |-- mn_priority.md
|       `-- national_tier_a.md
|
|-- 6_competitors/                    # Competitive landscape
|   |-- _MOC.md
|   |-- competitors_list.md           # Master list with tier assignments
|   |-- competitors_tier1_direct.md   # Detailed Tier 1 analysis
|   |-- positioning.md                # Comparative positioning map
|   |-- threat_assessment.md          # Competitive threat rankings
|   `-- profiles/                     # One file per competitor
|       |-- dvl_group.md
|       |-- en_sync.md
|       |-- [company_name].md
|       `-- _others.md
|
|-- 7_financials/                     # Revenue, valuation, signals
|   |-- _MOC.md
|   |-- financial_overview.md         # Summary of financial position
|   |-- revenue.md                    # Revenue estimates and sources
|   |-- valuation.md                  # Valuation methodology and range
|   `-- signals.md                    # Financial signals (hiring, capex, etc.)
|
|-- 8_marketing/                      # Marketing, advertising, content
|   |-- _MOC.md
|   |-- social_media.md               # Platform presence and activity
|   |-- linkedin_analysis.md          # LinkedIn-specific intelligence
|   |-- youtube_analysis.md           # Video content analysis
|   |-- video_content.md              # Transcript analysis and themes
|   |-- web_traffic.md                # Traffic estimates and trends
|   |-- keyword_analysis.md           # SEO keyword positioning
|   |-- advertising.md                # Ad transparency findings
|   |-- press_and_media.md            # Press mentions and media coverage
|   `-- events/                       # Event participation
|       |-- lets_break_the_ice.md
|       `-- lbti_sponsor_analysis.md
|
|-- 9_brand/                          # Brand identity and design
|   |-- _MOC.md
|   |-- identity.md                   # Brand positioning, voice, values
|   |-- design_system.md              # Colors, typography, visual language
|   |-- characters.md                 # Brand characters/mascots
|   `-- name_origin.md               # Etymology of brand name
|
|-- 10_timeline/                      # Historical chronology
|   |-- _MOC.md
|   |-- master_chronology.md          # Complete dated event timeline
|   |-- founding_story.md             # Origin narrative
|   |-- milestones.md                 # Key milestone events
|   `-- website_evolution.md          # Wayback-tracked site changes
|
|-- 11_analysis/                      # Strategic analysis and synthesis
|   |-- _MOC.md
|   |-- key_facts.md                  # One-page key facts summary
|   |-- executive_brief.md            # 2-page executive summary
|   |-- business_model_canvas.md      # 9-block BMC
|   |-- strategic_assessment.md       # SWOT and strategic position
|   |-- acquisition_thesis.md         # M&A rationale and terms
|   |-- partnership_thesis.md         # Partnership opportunity analysis
|   |-- risk_register.md              # Identified risks with severity
|   |-- intelligence_gaps.md          # What we could not determine
|   |-- inferred_insights.md          # Analytical conclusions
|   `-- additional_intelligence_framework.md  # Future research recs
|
|-- 12_industry/                      # Industry macro context
|   |-- _MOC.md
|   |-- market_sizing.md              # TAM/SAM/SOM
|   |-- channel_economics.md          # Margin structure, distribution
|   |-- ma_landscape.md               # M&A activity in sector
|   |-- macro_financial_environment.md
|   |-- history/
|   |   |-- seven_era_timeline.md
|   |   `-- channel_evolution.md
|   |-- regulation/
|   |   |-- federal_procurement.md
|   |   |-- state_licensing.md
|   |   |-- environmental.md
|   |   `-- tariff_exposure.md
|   |-- political/
|   |   |-- energy_grid.md
|   |   `-- state_incentives.md
|   |-- technology/
|   |   |-- liquid_cooling.md
|   |   |-- modular_prefab.md
|   |   `-- edge_hyperscale.md
|   |-- workforce/
|   |   |-- shortage.md
|   |   |-- associations.md
|   |   `-- diversity_premium.md
|   `-- synthesis/
|       |-- opportunity_map.md
|       |-- threat_map.md
|       |-- brogav_positioning.md
|       `-- confidence_matrix.md
|
|-- _data/                            # Canonical structured datasets (CSV)
|   |-- README.md                     # Data dictionary
|   |-- team_roster.csv
|   |-- org_chart.csv
|   |-- products.csv
|   |-- supplier_line_card.csv
|   |-- competitors.csv
|   |-- client_register.csv
|   |-- financials.csv
|   |-- events.csv
|   |-- certifications.csv
|   |-- industry_codes.csv
|   |-- documents.csv
|   |-- partners.csv
|   |-- people.csv
|   `-- source_inventory.csv
|
|-- _assets/                          # Binary files (images, PDFs)
|   |-- pdfs/
|   |   |-- datasheets/
|   |   |-- job_postings/
|   |   `-- partner_decks/
|   |-- photos/
|   |   |-- people/
|   |   |-- products/
|   |   |-- facilities/
|   |   |-- events/
|   |   |-- installations/
|   |   |-- logos/
|   |   |-- brand/
|   |   `-- misc/
|   `-- video_thumbnails/
|
|-- _evidence/                        # Raw source data and scrape artifacts
|   |-- README.md                     # Evidence handling guidelines
|   |-- source_data/                  # Manually collected source files
|   |-- web_scrapes/
|   |   `-- raw_html/                 # Archived HTML snapshots
|   `-- bulk_datasets/
|       |-- dnb/                      # D&B export data
|       `-- spglobal/                 # S&P Capital IQ export data
|
|-- _meta/                            # Dossier infrastructure files
|   |-- frontmatter_schema.yaml       # YAML schema definitions
|   |-- confidence_legend.md          # Confidence tier definitions
|   |-- cross_reference_index.md      # Master cross-reference table
|   `-- methodology.md               # How the dossier was built
|
`-- _archive/                         # Previous version files (pre-restructure)
    |-- 00_KEY_FACTS_SHEET.md
    |-- 00_EXECUTIVE_BRIEF.md
    |-- 00_CROSS_REFERENCE_INDEX.md
    |-- 01_Company_Profile/
    |-- 02_People_and_Organization/
    `-- ... (full old structure preserved)
```

---

## Section Purpose Guide

| # | Section | Purpose | Content Type |
|---|---------|---------|--------------|
| 1 | `1_corporate` | Legal identity, credentialing, and infrastructure | Reference (facts, no analysis) |
| 2 | `2_people` | Organization mapping: who works there, backgrounds, movements | Entity profiles + reference |
| 3 | `3_products` | What the company sells, how it is categorized, pricing | Reference + light analysis |
| 4 | `4_suppliers` | Upstream relationships with manufacturers | Entity profiles + verification |
| 5 | `5_customers` | Downstream relationships with buyers | Entity profiles + discovery |
| 6 | `6_competitors` | Competitive landscape mapping | Entity profiles + analysis |
| 7 | `7_financials` | Financial position estimates for a private company | Analysis (all inferred) |
| 8 | `8_marketing` | Go-to-market execution and market visibility | Evidence + analysis |
| 9 | `9_brand` | Brand identity, visual system, positioning | Reference |
| 10 | `10_timeline` | Dated chronology of the company's history | Reference |
| 11 | `11_analysis` | All strategic conclusions and synthesis | Analysis (draws from all sections) |
| 12 | `12_industry` | Macro industry context for interpreting findings | Analysis + reference |

---

## Underscore-Prefixed Infrastructure Folders

Folders prefixed with `_` are infrastructure -- they support the dossier but are not dossier content themselves.

| Folder | Purpose | Who Uses It |
|--------|---------|-------------|
| `_data/` | Canonical CSV datasets. Single source of truth for structured data (people, products, suppliers, etc.). When a narrative file and a CSV disagree, the CSV wins. | Both humans (Excel import) and agents (programmatic parsing) |
| `_assets/` | Binary files that cannot be stored as markdown. Organized by type (photos, PDFs, thumbnails). Referenced from narrative files via relative paths. | Humans (visual review), agents (image analysis) |
| `_evidence/` | Raw source material preserving the evidentiary chain. Proves where findings came from. Never edited after collection -- immutable once captured. | Verification audit, legal review |
| `_meta/` | Dossier configuration: frontmatter schema, confidence legend, cross-reference index, methodology notes. | Agents (schema validation), new contributors (onboarding) |
| `_archive/` | Previous dossier structure preserved intact. Kept for reference during transition; deletable once the new structure is validated as complete. | Nobody during normal use (reference only) |

Design principle: underscore prefix means "machine infrastructure." These folders appear last in alphabetical directory listings and signal to readers that they are support structures, not narrative content.

---

## File Naming Conventions

### Narrative Files (Markdown)

- **Snake_case**, all lowercase: `legal_and_reputation.md`, `hiring_signals.md`
- **Entity profiles** use the entity's full name: `celina_berglund.md`, `schneider_electric.md`
- **Grouped minor entities** use `_others.md` (underscore prefix = catch-all)
- **Unverified entities** use `_unverified.md`
- **Section indexes** are always `_MOC.md` (Map of Content)
- Maximum filename length: 40 characters (excluding extension)

### Section Folders

- Numeric prefix for ordering: `1_`, `2_`, `3_`, etc.
- Lowercase with underscores: `1_corporate`, `12_industry`
- No zero-padding (use `1_` not `01_`)

### CSV Files

- Stored in `_data/` (canonical) or section folders (section-specific, deprecated)
- Named for the entity type they contain: `team_roster.csv`, `products.csv`
- First row is always headers; no blank rows; UTF-8 encoding
- Canonical datasets in `_data/` are the single source of truth

### Binary Assets

- Photos: `[subject]_[context].jpg` (e.g., `celina_berglund_headshot.png`)
- PDFs: `[source]_[title]_[date].pdf` (e.g., `eaton_partner_deck_2024.pdf`)
- Thumbnails: `[video_id]_thumb.jpg`

---

## YAML Frontmatter Schema

Every markdown file in the dossier uses YAML frontmatter. Five document types are defined (full schema in `_meta/frontmatter_schema.yaml`):

### entity-profile

For files describing a single entity (person, supplier, competitor, client, product). One entity per file.

```yaml
---
title: "Celina Berglund"
type: entity-profile
entity_type: person                    # person | supplier | competitor | client | product
entity_id: celina_berglund            # snake_case unique identifier
tier: Leadership                       # Classification tier (optional)
confidence: HIGH                       # DEFINITIVE | HIGH | MODERATE | LOW | INFERRED | UNVERIFIED
last_updated: 2026-06-13
sources:
  - "https://www.linkedin.com/in/celinaberglund/"
  - "MN SOS filing 1234651600024"
related_files:
  - "1_corporate/identity.md"
  - "7_financials/revenue.md"
tags:
  - founder
  - ceo
  - wbenc
---
```

### reference

For factual reference documents (registrations, contact lists, product catalogs). Not analysis -- just organized facts.

```yaml
---
title: "Federal Registration"
type: reference
domain: corporate                      # Subject area (corporate, products, suppliers, etc.)
confidence: DEFINITIVE
last_updated: 2026-06-13
canonical_for: "SAM.gov, CAGE, UEI identifiers"
related_files:
  - "1_corporate/certifications.md"
  - "_data/industry_codes.csv"
tags:
  - sam-gov
  - federal
---
```

### analysis

For original analysis and strategic synthesis. Conclusions drawn from evidence in other files.

```yaml
---
title: "Acquisition Thesis"
type: analysis
domain: strategy                       # Subject area (strategy, competitive, financial)
confidence: INFERRED
last_updated: 2026-06-13
depends_on:                            # Files whose data feeds this analysis
  - "7_financials/revenue.md"
  - "7_financials/valuation.md"
  - "6_competitors/positioning.md"
related_files:
  - "11_analysis/risk_register.md"
tags:
  - acquisition
  - m-and-a
---
```

### evidence

For raw or processed evidence preserving the evidentiary chain behind claims.

```yaml
---
title: "LinkedIn Post Analysis"
type: evidence
source_platform: LinkedIn              # Where data came from
collection_date: 2026-06-10           # When collected (immutable)
collection_method: "Playwright scrape" # Tool or technique used
record_count: 181                      # Number of records in this file
confidence: MODERATE
related_files:
  - "2_people/profiles/celina_berglund.md"
  - "5_customers/known_clients.md"
tags:
  - linkedin
  - osint
---
```

### moc

Map of Content. Navigation file indexing all files within a section. Contains no original analysis.

```yaml
---
title: "Corporate Identity — Map of Content"
type: moc
section: 1_corporate                   # Which section this indexes
entity_count: 11                       # Number of files indexed
last_updated: 2026-06-14
---
```

---

## The ROUTER.md Pattern

### Purpose

Enable both AI agents and humans to find answers in one lookup. An agent reads ROUTER.md, finds the question closest to the user's query, follows the file path, and has the answer in one additional file read. Two reads total from question to answer.

### Structure

```markdown
> **For AI agents:** Read this file first. Find the question closest to yours.
> Follow the file path. You will have your answer in 1 more read.
> **For humans:** Use Ctrl+F to search for keywords.

# BROGAV Solutions Dossier Router

## Company Basics

| Question | File |
|----------|------|
| What is the company's legal name? | `1_corporate/identity.md` |
| Where is BROGAV headquartered? | `1_corporate/identity.md` |
| When was the company founded? | `1_corporate/registrations.md` |
| What is the DUNS number? | `1_corporate/registrations.md` |
| What certifications does BROGAV hold? | `1_corporate/registrations.md` |

## People and Organization

| Question | File |
|----------|------|
| Who is the CEO / founder? | `2_people/profiles/celina_berglund.md` |
| How many employees does BROGAV have? | `2_people/org_overview.md` |
| What is the full team roster? | `_data/team_roster.csv` |
| Has anyone left the company? | `2_people/departures.md` |
```

### Design Principles

- Questions are written in natural language (how a person or AI would ask)
- Every question maps to exactly one file (no ambiguity)
- File paths are relative to the dossier root
- Organized by section with clear headings
- Covers 110+ common questions across all 12 sections
- Updated whenever new files are added to the dossier

### Why It Exists

LLMs with limited context windows cannot read 150+ files. The router acts as a retrieval index, enabling a 2-read pattern (router then target file) instead of scanning dozens of files. For humans, Ctrl+F on the router page is faster than navigating the folder tree.

---

## The _MOC.md Pattern

### Purpose

Section-level navigation. Every numbered section contains a `_MOC.md` that indexes its files, provides reading order guidance, and summarizes key findings.

### Structure

```markdown
---
title: "Corporate Identity — Map of Content"
type: moc
section: 1_corporate
last_updated: 2026-06-14
---

# 1. Corporate Identity

Who BROGAV Solutions LLC is as a legal entity, where they operate, and how they
are credentialed. This section contains verified facts -- not analysis or judgment.

[2-3 sentence factual summary with key numbers]

## File Index

| File | Description | Priority |
|------|-------------|----------|
| `identity.md` | Legal name, formation date, entity type | ESSENTIAL |
| `registrations.md` | D-U-N-S, UEI, CAGE, SAM.gov status | HIGH |
| `certifications.md` | WBENC, WOSB, EDWOSB, DBE, BBB | HIGH |
| `facilities.md` | Physical locations, own vs. lease | MEDIUM |
| `tech_stack.md` | Website, email, analytics | MEDIUM |
| `contacts.md` | Phone, email, social handles | REFERENCE |

## Reading Guide

Start with `identity.md` for the one-page company snapshot. Read `certifications.md`
next -- the diversity certifications define their competitive positioning. `registrations.md`
matters for federal procurement context.
```

### Design Principles

- Contains NO original analysis (only links, descriptions, counts)
- Priority column guides readers with limited time (ESSENTIAL / HIGH / MEDIUM / REFERENCE)
- Reading Guide provides context that file titles alone cannot convey
- Entity count in frontmatter enables automated completeness checks
- Named `_MOC.md` (not `README.md`) to distinguish from the top-level README and avoid IDE auto-rendering conflicts

---

## Cross-Referencing Strategy

Three mechanisms work together to create a navigable knowledge graph:

### 1. Relative Links in Prose

Within markdown body text, reference related files using relative paths:

```markdown
See [Celina Berglund's profile](../2_people/profiles/celina_berglund.md) for background.
Revenue estimates are documented in [financials](../7_financials/revenue.md).
```

### 2. Frontmatter `related_files`

Every file's YAML frontmatter includes a `related_files` list. Paths are always relative to the dossier root (not relative to the current file):

```yaml
related_files:
  - "1_corporate/identity.md"
  - "7_financials/revenue.md"
  - "_data/team_roster.csv"
```

This enables programmatic graph construction -- build a directed graph of file relationships from frontmatter alone.

### 3. Canonical Source Index (`_meta/cross_reference_index.md`)

Master index mapping every major claim to its source file(s):

```markdown
| Claim | Primary Source | Supporting Sources | Confidence |
|-------|---------------|-------------------|------------|
| Revenue is $4.51M | 7_financials/revenue.md | _evidence/bulk_datasets/dnb/ | INFERRED |
| Headcount is 10 | 2_people/org_overview.md | _data/team_roster.csv | HIGH |
| WBENC expires 5/31/2027 | 1_corporate/certifications.md | sam.gov screenshot | DEFINITIVE |
```

### 4. Single Source of Truth Rule

When the same fact could live in multiple files, it lives in ONE canonical location. Other files link to it. The hierarchy:

1. **CSV in `_data/`** -- authoritative for structured data (roster, products, suppliers)
2. **Entity profile file** -- authoritative for facts about that entity
3. **Section reference file** -- authoritative for domain-specific facts
4. **Analysis file** -- synthesizes but never originates facts

When a narrative file and a CSV disagree, the CSV wins.

---

## Design Decisions and Rationale

### Why entity-centric (one file per person/supplier/competitor)?

Prevents duplication. Celina Berglund is relevant to corporate (founder), people (profile), financials (owner), marketing (speaker), and brand (creator). Without a single canonical file, her information scatters across 5+ files with inevitable contradictions. The entity file is the single source of truth; other files reference it.

### Why products separated from suppliers?

The relationship is many-to-many. One supplier (Eaton) provides products across multiple categories (UPS, PDU, switchgear). One product category (power management) is sourced from multiple suppliers. Separating them enables independent product analysis, independent supplier risk assessment, and clean handling of the company's own branded products (which have no supplier).

### Why max 500 lines per file?

LLM context efficiency. A 500-line file can be read in a single tool call by most AI agents without truncation. Files exceeding this length should be split by subtopic. This also enforces specificity -- a 1000-line file usually contains two distinct topics that should be separate files.

### Why numbered section prefixes (1_, 2_, 3_)?

Forces consistent reading order in directory listings. Sections are numbered by research dependency -- later sections depend on earlier ones. You need corporate identity (1) before you can research people (2). You need people (2) before you can analyze LinkedIn activity. You need products (3) and suppliers (4) before you can identify competitors (6). Alphabetical ordering would scramble this natural flow.

### Why `_MOC.md` instead of `README.md` for section indexes?

`README.md` has overloaded semantics: GitHub renders it automatically, IDEs display it as project documentation, and it implies "start here for the whole project." `_MOC.md` is explicitly a Map of Content -- a navigation index for one section, not a project introduction. The underscore prefix groups it visually with infrastructure files and sorts it before content files in directory listings.

### Why a dedicated `_archive/` folder?

Intelligence work is cumulative. The old structure may contain information inadvertently lost during restructuring. Keeping it allows verification audits to check completeness. Once the new structure is validated and no information gaps are found, `_archive/` can be removed. Disk space is cheap; lost intelligence is expensive.

### Why structured datasets in `_data/` rather than embedded tables?

CSVs are machine-readable (importable to Excel, parseable by pandas, queryable by agents). Markdown tables are visually readable but painful to maintain (alignment breaks), impossible to sort/filter, and error-prone past 20 rows. The canonical CSV is the source of truth; narrative files may contain summary tables that subset the CSV data.

### Why confidence tiers on every file?

Not all intelligence is equal. A Secretary of State filing is DEFINITIVE. A D&B revenue estimate is INFERRED. A single LinkedIn comment suggesting a client relationship is UNVERIFIED. Readers and downstream agents need to know how much weight to give each finding. The six tiers:

| Tier | Definition | Example |
|------|-----------|---------|
| DEFINITIVE | Primary government/official source, independently verifiable | SOS filing, court record, SAM.gov |
| HIGH | Multiple independent sources agree | 3 platforms show same job title |
| MODERATE | Single reliable source, plausible and consistent | D&B profile data |
| LOW | Single unreliable source or indirect inference | LinkedIn comment |
| INFERRED | Analytical conclusion from indirect evidence | Revenue estimated from headcount |
| UNVERIFIED | Claim exists but cannot be independently verified | Self-reported partnership |

### Why the ROUTER.md pattern exists?

The dossier grows to 100+ files. Without a router, finding "What is the DUNS number?" requires knowing the folder structure. The router eliminates this friction by mapping natural-language questions to exact file paths. It serves humans (Ctrl+F) and AI agents (pattern match, then follow path). Cost: maintaining the router as files are added. Benefit: guaranteed 2-read retrieval instead of unbounded exploration.

### Why underscore prefix for infrastructure folders?

Three benefits: (1) they sort to the bottom of directory listings, keeping narrative sections visually grouped at the top; (2) the prefix signals "not content" to anyone browsing the folder; (3) glob patterns can easily exclude them (`[!_]*` matches only content sections).

### Why no zero-padding on section numbers?

The dossier has 12 sections. Zero-padding (`01_`, `02_`) is unnecessary visual noise for a single-digit-to-low-double-digit count. If the dossier ever exceeds 99 sections, the architecture has failed for other reasons. Simpler prefixes are easier to type in path references.
