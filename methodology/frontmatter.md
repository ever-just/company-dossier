# YAML Frontmatter Templates

Copy-paste templates for every file type in the dossier. Every `.md` file must have frontmatter.

---

## Entity Profile (person, supplier, competitor, client)

```yaml
---
title: "Eaton Corporation"
type: entity-profile
entity_type: supplier        # person | supplier | competitor | client | product
entity_id: eaton             # lowercase slug, matches filename
tier: 1                      # 1-4 for suppliers/competitors; null for others
confidence: high             # definitive | high | moderate | low | inferred | unverified
last_updated: 2026-06-14
sources:
  - partner_wall_ocr
  - website_crawl
  - linkedin_posts
related_files:
  - _data/supplier_line_card.csv
  - 3_products/categories/power_management.md
tags:
  - power
  - ups
  - pdu
  - anchor-partner
---
```

## Reference File (facts, registrations, contacts)

```yaml
---
title: "Corporate Identity and Registration"
type: reference
domain: corporate            # corporate | financial | market | product | timeline | brand
confidence: high
last_updated: 2026-06-14
canonical_for:
  - legal_name
  - duns_number
  - uei
  - cage_code
related_files:
  - _data/certifications.csv
  - 1_corporate/registrations.md
tags:
  - identity
  - legal
---
```

## Analysis File (judgments, assessments, theses)

```yaml
---
title: "Acquisition Thesis"
type: analysis
domain: strategic            # strategic | financial | competitive | operational
confidence: moderate
last_updated: 2026-06-14
depends_on:
  - 7_financials/revenue.md
  - 4_suppliers/_MOC.md
  - 6_competitors/_MOC.md
related_files:
  - 11_analysis/risk_register.md
  - 11_analysis/partnership_thesis.md
tags:
  - m-and-a
  - valuation
  - strategic
---
```

## Evidence File (raw data, source material)

```yaml
---
title: "LinkedIn Post Analysis"
type: evidence
source_platform: linkedin    # linkedin | wayback | usaspending | dnb | manual
collection_date: 2026-06-10
collection_method: manual_scrape
record_count: 181
confidence: high
related_files:
  - 8_marketing/linkedin_analysis.md
  - 2_people/profiles/celina_berglund.md
tags:
  - raw-data
  - social-media
---
```

## Map of Content (_MOC.md)

```yaml
---
title: "Suppliers — Map of Content"
type: moc
section: 4_suppliers
entity_count: 27
last_updated: 2026-06-14
---
```

## Navigation / Index File

```yaml
---
title: "Question Router"
type: reference
domain: meta
last_updated: 2026-06-14
---
```

---

## Rules

1. **Every `.md` file gets frontmatter.** No exceptions.
2. **`title`** = human-readable name (Title Case)
3. **`type`** = one of: `entity-profile`, `reference`, `analysis`, `evidence`, `moc`
4. **`confidence`** = one of: `definitive`, `high`, `moderate`, `low`, `inferred`, `unverified`
5. **`last_updated`** = ISO date of last meaningful content change
6. **`related_files`** = array of relative paths from repo root
7. **`tags`** = lowercase, hyphenated, for search/filter
8. **`entity_id`** (entity-profiles only) = filename without extension
9. **`depends_on`** (analysis only) = files that must be read to understand this analysis
10. **`canonical_for`** (reference only) = data points for which this file is the source of truth
