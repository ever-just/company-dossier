# Dossier Skeleton

Use this as the starting point when building a new company dossier. Create this folder structure FIRST, then fill it with research.

---

## Quick Start

```bash
# Replace COMPANY_NAME with your target
mkdir -p "COMPANY_NAME DOSSIER"/{_meta,_data,_assets/photos/{people,products,facilities,events,brand,logos},_assets/pdfs/{datasheets,job_postings},_evidence/{source_data,bulk_datasets,web_scrapes/raw_html},_archive,1_corporate,2_people/profiles,3_products/categories,4_suppliers/profiles,5_customers/prospects,6_competitors/profiles,7_financials,8_marketing/events,9_brand,10_timeline,11_analysis,12_industry/{history,regulation,workforce,technology,political,synthesis}}

# Create initial navigation files
touch "COMPANY_NAME DOSSIER"/{README.md,ROUTER.md,CHANGELOG.md}
touch "COMPANY_NAME DOSSIER"/{1_corporate,2_people,3_products,4_suppliers,5_customers,6_competitors,7_financials,8_marketing,9_brand,10_timeline,11_analysis,12_industry}/_MOC.md
touch "COMPANY_NAME DOSSIER"/_data/README.md
touch "COMPANY_NAME DOSSIER"/_assets/MANIFEST.md
touch "COMPANY_NAME DOSSIER"/_evidence/README.md
touch "COMPANY_NAME DOSSIER"/_meta/{methodology.md,confidence_legend.md,frontmatter_schema.yaml}
```

---

## Section Purposes

| # | Folder | Question it answers | Typical files |
|---|--------|-------------------|---------------|
| 1 | `1_corporate/` | Who are they legally? | identity.md, registrations.md, certifications.md, facilities.md, tech_stack.md, contacts.md |
| 2 | `2_people/` | Who works there? | org_overview.md, hiring_signals.md, departures.md, profiles/*.md |
| 3 | `3_products/` | What do they sell? | portfolio_overview.md, branded_products.md, services.md, pricing.md, categories/*.md |
| 4 | `4_suppliers/` | Who do they buy from? | _MOC.md (summary table), oem_verification.md, profiles/*.md |
| 5 | `5_customers/` | Who buys from them? | known_clients.md, testimonials.md, target_markets.md, prospects/*.md |
| 6 | `6_competitors/` | Who do they compete with? | positioning.md, threat_assessment.md, profiles/*.md |
| 7 | `7_financials/` | What's their revenue/value? | revenue.md, signals.md, valuation.md |
| 8 | `8_marketing/` | How do they go to market? | social_media.md, press.md, web_traffic.md, events/*.md |
| 9 | `9_brand/` | What's their identity? | identity.md, name_origin.md, design_system.md |
| 10 | `10_timeline/` | What's their history? | founding_story.md, chronology.md, milestones.md |
| 11 | `11_analysis/` | So what? (judgment) | executive_brief.md, risk_register.md, acquisition_thesis.md |
| 12 | `12_industry/` | What's the context? | market_sizing.md, regulation/*.md, technology/*.md |

---

## Infrastructure Folders

| Folder | Purpose | Rule |
|--------|---------|------|
| `_meta/` | Navigation, schemas, methodology | 3-6 files max |
| `_data/` | ALL CSVs | Single source of truth — no CSVs elsewhere |
| `_assets/` | ALL photos and PDFs | With MANIFEST.md and _INDEX.md per subfolder |
| `_evidence/` | Raw source data | Collected once, rarely updated |
| `_archive/` | Superseded files | Git has history, but this is human-readable |

---

## First Files to Create (in order)

1. `README.md` — Landing page with navigation table
2. `ROUTER.md` — Start with 20 questions, grow to 60+
3. `_meta/methodology.md` — How you're doing the research
4. `_data/README.md` — Schema documentation (update as you add CSVs)
5. `11_analysis/executive_brief.md` — Write this LAST but keep it at the top level for access

---

## File Constraints

- **Max lines per file:** 500 (target 150-300)
- **Entity files:** One per supplier, competitor, person
- **Naming:** `snake_case.md` for content; `_MOC.md`, `README.md`, `ROUTER.md`, `MANIFEST.md` for navigation
- **Frontmatter:** Required on every .md file (see `frontmatter_examples.md`)
- **Links:** Always relative paths from current file
- **Dates:** ISO 8601 (YYYY-MM-DD) or absolute ("since January 2010", never "~3 years")
- **Confidence:** Tag every factual claim as Definitive/High/Moderate/Low/Inferred/Unverified
