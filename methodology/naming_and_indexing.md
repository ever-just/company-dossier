# Naming, Indexing & Agent-Readability

How to name files, folders, and structure metadata so that both humans and AI agents can find information without reading every file.

---

## The Core Problem

An AI agent looking for "what is BROGAV's relationship with Eaton?" shouldn't have to read 50 files to find the answer. Good naming and indexing means:

1. **The filename tells you what's inside** (no reading required)
2. **The folder tells you the category** (navigate by structure)
3. **The frontmatter tells the agent what it is** (machine-parseable metadata)
4. **The ROUTER.md tells you where any answer lives** (2-read navigation)

---

## File Naming Conventions

### Rules

| Rule | Example | Why |
|------|---------|-----|
| `snake_case.md` for all content | `revenue_derivation.md` | Universal, no escaping needed |
| `_UPPERCASE.md` for navigation files | `_MOC.md`, `README.md`, `ROUTER.md` | Sorts to top, signals "system file" |
| Entity files = entity name | `eaton.md`, `celina_berglund.md` | Filename IS the lookup key |
| Category prefix where needed | `podcast_idc_celina_jul2023.mp3` | Sortable, scannable |
| Dates in ISO format | `2023-07-14` or `20230714` | Sorts chronologically |
| No spaces in filenames | `supply_chain_risks.md` not `Supply Chain Risks.md` | Breaks shell scripts |

### Naming Patterns by File Type

```
# Entity profiles (one per entity)
4_suppliers/profiles/eaton.md
2_people/profiles/celina_berglund.md
6_competitors/profiles/dvl_group.md

# Category files (one per topic)
3_products/categories/power_management.md
12_industry/regulation/tariff_exposure.md

# Evidence files (source + subject + date)
transcript_podcast_idc_celina_jul2023.txt
podcast_idc_celina_jul2023.mp3
li_person_celina_adam_bisnow_dice_attending.jpg

# Datasets (what it contains)
_data/team_roster.csv
_data/supplier_line_card.csv
_data/client_register.csv

# Navigation files (always UPPERCASE or _prefixed)
_MOC.md          # Map of Content (per section)
ROUTER.md        # Question-to-file lookup
README.md        # Landing page
MANIFEST.md      # Asset inventory
_INDEX.md        # Photo/PDF semantic index
```

---

## Folder Naming Conventions

### Rules

| Rule | Example | Why |
|------|---------|-----|
| Numbered content sections | `1_corporate/`, `2_people/` | Reading order, sortable |
| `_prefixed` for infrastructure | `_data/`, `_meta/`, `_assets/` | Sorts to top, signals "not content" |
| Max 4 levels deep | `12_industry/regulation/tariff_exposure.md` | Beyond 4 = lost |
| No empty folders | Every folder has 3+ files | Empty folder = wasted click |
| Singular nouns for entity collections | `profiles/` not `profile/` | Consistent |
| `categories/` for taxonomy splits | `3_products/categories/power_management.md` | Groups sub-topics |

### Folder Name = Question It Answers

| Folder | Question |
|--------|----------|
| `1_corporate/` | "Who are they legally?" |
| `2_people/` | "Who works there?" |
| `3_products/` | "What do they sell?" |
| `4_suppliers/` | "Who do they buy from?" |
| `5_customers/` | "Who buys from them?" |
| `6_competitors/` | "Who do they compete with?" |
| `7_financials/` | "What's their revenue?" |
| `8_marketing/` | "How do they go to market?" |
| `9_brand/` | "What's their identity?" |
| `10_timeline/` | "What's their history?" |
| `11_analysis/` | "So what? (judgment)" |
| `12_industry/` | "What's the market context?" |

---

## YAML Frontmatter (How Agents Know What's Inside Without Reading)

Every `.md` file gets a metadata header that tells an agent what the file is about **without opening it**:

```yaml
---
title: "Eaton Corporation"           # Human-readable name
type: entity-profile                 # What kind of file (entity/reference/analysis/evidence/moc)
entity_type: supplier                # What kind of entity (person/supplier/competitor/client)
entity_id: eaton                     # Machine lookup key (matches filename)
tier: 1                              # Importance ranking
confidence: high                     # How reliable this data is
last_updated: 2026-06-14             # When content last changed
tags: [power, ups, pdu, anchor]      # Searchable keywords
related_files:                       # What else to read
  - _data/supplier_line_card.csv
  - 3_products/categories/power_management.md
---
```

### How an agent uses frontmatter:

1. Agent receives question: "What's BROGAV's relationship with Eaton?"
2. Agent reads `ROUTER.md` → finds path: `4_suppliers/profiles/eaton.md`
3. Agent reads ONLY the frontmatter of `eaton.md`:
   - Sees `type: entity-profile`, `entity_type: supplier`, `tier: 1`, `confidence: high`
   - Knows immediately: this is a high-confidence, tier-1 supplier profile
   - Reads the full file content for the answer
4. **Total reads: 2** (ROUTER + target file)

### Without frontmatter:

1. Agent reads `ROUTER.md` → no ROUTER exists
2. Agent reads `README.md` → sees 12 sections, guesses section 3 or 4
3. Agent reads `4_suppliers/_MOC.md` → sees 17 profiles, picks eaton.md
4. Agent reads `eaton.md` → gets answer
5. **Total reads: 4** (and that's the GOOD case — without ROUTER it could be 6+)

---

## ROUTER.md (The Agent Navigation Index)

The single most important file for agent discoverability. Maps natural-language questions to exact file paths:

```markdown
| Question | File |
|----------|------|
| What is BROGAV's revenue? | 7_financials/revenue.md |
| Who is the CEO? | 2_people/profiles/celina_berglund.md |
| What's their relationship with Eaton? | 4_suppliers/profiles/eaton.md |
| Who are their competitors? | 6_competitors/_MOC.md |
| What certifications do they have? | 1_corporate/certifications.md |
```

**Rules for ROUTER.md:**
- 60+ entries minimum
- Questions phrased the way a human/agent would actually ask
- Every major topic covered
- Paths validated (every path must resolve to a real file)
- Updated whenever files are added/moved/renamed

---

## _MOC.md (Map of Content — Section-Level Index)

Each section has a `_MOC.md` that tells you what's in that folder and why you'd read each file:

```markdown
---
title: "Suppliers — Map of Content"
type: moc
section: 4_suppliers
entity_count: 27
---

# Suppliers

| File | What it contains | When to read |
|------|-----------------|-------------|
| `oem_verification.md` | Which partnerships are confirmed vs claimed | Due diligence, risk assessment |
| `supply_chain_risks.md` | Concentration, tariffs, single-source | Risk analysis |
| `profiles/eaton.md` | Everything about the Eaton relationship | Specific supplier questions |
| `profiles/schneider_electric.md` | Schneider Electric relationship | Specific supplier questions |
```

---

## Photo/Asset Naming

Photos are the hardest to name well because filenames must describe visual content:

### Pattern: `source_subject_context.ext`

```
# LinkedIn-sourced
li_person_celina_adam_bisnow_dice_attending.jpg
li_product_busway_cable_system_display.jpg
li_event_ski2friday_copper_mountain_group.jpg
li_brand_mission_critical_customer_driven.jpg

# Website-sourced
product_cabinet_dim_42D24W_black.jpg
badge_wbenc_certified.png
hero_mission_critical.jpg

# YouTube thumbnails
video_ceo_day_in_the_life_feb2023_thumb.jpg
podcast_celina_strategitcom_sep2023_thumb.jpg
```

### The _INDEX.md Pattern

Every photo folder gets an index that maps files to their intelligence value:

```markdown
# Photo Index — People

| File | Subject | Intelligence value |
|------|---------|-------------------|
| `li_person_celina_adam_bisnow_dice_attending.jpg` | Celina + Adam at Bisnow DICE event | Confirms Denver market activity |
| `celina_berglund_headshot.png` | Official founder photo | Brand asset |
```

This means an agent can read `_INDEX.md` (30 lines) instead of opening 30 image files.

---

## CSV Naming & Schema Documentation

CSVs need TWO things to be agent-readable:

1. **Descriptive filename**: `supplier_line_card.csv` not `data.csv` or `export_20240612.csv`
2. **Schema in _data/README.md**: column definitions, what each value means, what's required

```markdown
### supplier_line_card.csv (39 rows)
| Column | Type | Description |
|--------|------|-------------|
| brand | text | Manufacturer name |
| category | enum | Power / Connectivity / Enclosures / Monitoring |
| supplies | text | What BROGAV buys from them |
| confidence | enum | High / Medium / Low / Inferred |
```

An agent reading `_data/README.md` immediately knows what every CSV contains without opening them.

---

## Anti-Patterns (What NOT to Do)

| Bad | Good | Why |
|-----|------|-----|
| `data.csv` | `supplier_line_card.csv` | Agent can't guess what "data" contains |
| `notes.md` | `acquisition_thesis.md` | "Notes" means nothing |
| `doc1.pdf`, `doc2.pdf` | `BROGAV_Server_Cabinet_DataSheet_2023.pdf` | Numbered files are unsearchable |
| `Research/Analysis/Deep Dive/` | `11_analysis/` | Vague, deep nesting |
| `2024-06-12 Meeting Notes.md` | Avoid entirely | Date-first names are for archives, not reference docs |
| `FINAL_v3_REVISED.md` | Just `acquisition_thesis.md` | Version in filename = maintenance hell |
| `stuff/` | Never | If you can't name it, don't folder it |

---

## The "Tell Agents What's Inside" Checklist

Before considering a file "done," verify:

- [ ] Filename describes content (not just format or date)
- [ ] YAML frontmatter present with: title, type, confidence, last_updated, tags
- [ ] File is listed in the section's `_MOC.md`
- [ ] File's most common questions are in `ROUTER.md`
- [ ] If it's a CSV, its schema is in `_data/README.md`
- [ ] If it's a photo, it's listed in `_assets/photos/_INDEX.md`
- [ ] If it's a PDF, it's listed in `_assets/pdfs/_INDEX.md`
- [ ] Related files are linked in frontmatter `related_files` array
- [ ] Tags enable keyword search (e.g., `tags: [power, ups, eaton]`)
