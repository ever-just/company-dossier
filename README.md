<div align="center">

# Company Dossier

### A reproducible methodology for building competitive intelligence packages using AI agents

![Last Updated](https://img.shields.io/badge/last_updated-June_2026-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Built With](https://img.shields.io/badge/built_with-Claude_Opus_4.6-blueviolet)

</div>

---

This repository documents a complete, step-by-step methodology for building structured intelligence dossiers on private companies using only public sources, AI agents, and open-source tools. It is designed for analysts, due diligence teams, and autonomous agents who need to produce comprehensive company profiles with confidence-tagged claims, entity-centric files, and full source attribution. The output is a 12-section dossier containing 30-50 structured files covering company profile, people, products, financials, market position, risks, and strategic analysis.

---

## Table of Contents

- [What You Get](#what-you-get)
- [The Process at a Glance](#the-process-at-a-glance)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Methodology Docs](#methodology-docs)
- [Tools Required](#tools-required)
- [Agent Skills Used](#agent-skills-used)
- [Built With](#built-with)
- [Real-World Example](#real-world-example)
- [License](#license)

---

## What You Get

A structured intelligence dossier containing:

| Layer | Contents |
|-------|----------|
| **Key Facts Sheet** | One-page executive summary with all critical data points |
| **12 Thematic Sections** | Company profile, people & org, products & suppliers, market & customers, financials, marketing & events, legal & compliance, technology, risk register, competitive landscape, industry context, strategic analysis |
| **Entity Profiles** | Individual markdown files for every person, company, product, and supplier with YAML frontmatter |
| **Data Layer** | CSV datasets (team roster, supplier line card, events, product catalog) for programmatic access |
| **Confidence Tags** | Every claim tagged `HIGH` (3+ sources), `MEDIUM` (2 sources), or `LOW` (1 source / inferred) |
| **Source Attribution** | Every fact traceable to a specific URL, document, or capture date |
| **ROUTER.md** | Navigation index linking every file with one-line descriptions |

---

## The Process at a Glance

```
┌─────────┐    ┌─────────┐    ┌──────────┐    ┌─────────┐    ┌────────┐    ┌────────────┐    ┌────────┐
│  PLAN   │───▶│  LOCAL  │───▶│  SEARCH  │───▶│ WAYBACK │───▶│ SCRAPE │───▶│ SYNTHESIZE │───▶│ REPORT │
│  5 min  │    │  5 min  │    │  15 min  │    │  30 min │    │ 30 min │    │   30 min   │    │ 30 min │
└─────────┘    └─────────┘    └──────────┘    └─────────┘    └────────┘    └────────────┘    └────────┘
     │               │              │               │              │              │               │
 Enumerate       Parse cached    Broad →        CDX API,      Platforms,    Cross-ref,       Excel +
 sources,        data, analyze   Targeted →     deleted page   async         tag              PDF,
 create          repo, ID gaps   Domain-        recovery,      scraping,     confidence,      source
 checklist                       specific       PDF capture    video/audio   triangulate      sheets
```

**Total time: ~2.5 hours per target company** (for a skilled agent with all tools configured)

---

## Architecture

The output dossier follows this folder structure:

```
COMPANY_Dossier/
├── 00_KEY_FACTS_SHEET.md              # Executive one-pager
├── ROUTER.md                          # Navigation index
├── 01_Company_Profile/
│   ├── README.md                      # Section MOC (Map of Content)
│   ├── federal_registration.md        # SAM.gov, CAGE, NAICS
│   ├── state_registration.md          # Secretary of State filings
│   └── domain_and_infrastructure.md   # DNS, hosting, tech stack
├── 02_People_and_Organization/
│   ├── README.md
│   ├── team_roster.csv                # Structured people data
│   ├── full_roster_profiles.md        # All personnel with roles
│   ├── hiring_and_growth.md           # Headcount signals
│   ├── departures_and_changes.md      # Turnover analysis
│   └── leadership/
│       ├── person_one.md              # Individual entity profile
│       └── person_two.md
├── 03_Products_and_Suppliers/
│   ├── README.md
│   ├── supplier_line_card.csv         # All vendor relationships
│   ├── product_asset_audit.md         # SKU-level inventory
│   └── branded_cabinet_line.md        # Product deep-dive
├── 04_Market_and_Customers/
│   ├── target_markets.md
│   └── client_evidence.md
├── 05_Financials/
│   ├── README.md
│   ├── financial_signals.md           # Revenue proxies, growth signals
│   └── valuation_considerations.md
├── 06_Marketing_and_Events/
│   ├── README.md
│   ├── events.csv
│   ├── social_media.md
│   └── press_and_media.md
├── 07_Legal_and_Compliance/
│   ├── court_records.md
│   ├── liens_and_judgments.md
│   └── sanctions_screening.md
├── 08_Technology/
│   ├── tech_stack.md
│   └── digital_footprint.md
├── 09_Risk_Register/
│   └── risk_matrix.md
├── 10_Competitive_Landscape/
│   ├── competitor_profiles/
│   └── positioning_analysis.md
├── 11_Industry_Context/
│   └── [industry-specific files]
├── 12_Strategic_Analysis/
│   └── acquisition_thesis.md
└── datasets/
    ├── products.csv
    ├── suppliers.csv
    └── events.csv
```

---

## Quick Start

**Step 1: Clone and configure**

```bash
git clone https://github.com/ever-just/company-dossier.git
cd company-dossier
cp templates/dossier_template/ my-target-company/
```

**Step 2: Fill in your target**

Edit `my-target-company/00_KEY_FACTS_SHEET.md` with the company name, URL, and any known facts. This seeds the research.

**Step 3: Run the pipeline**

Point your AI agent at the methodology docs and let it execute each phase sequentially:

```
Agent prompt: "Follow the methodology in docs/methodology/ to build a complete 
intelligence dossier on [COMPANY NAME]. Start with Phase 1 (Plan) and proceed 
through all 7 phases. Write output to the my-target-company/ directory."
```

---

## Methodology Docs

| Document | Description |
|----------|-------------|
| [00 Overview](docs/methodology/00_overview.md) | Philosophy, pipeline summary, design principles, definition of "done" |
| [01 Collection Phases](docs/methodology/01_collection_phases.md) | Detailed playbook for all 6 data collection methods |
| [02 Analysis Framework](docs/methodology/02_analysis_framework.md) | How to synthesize raw data into structured intelligence |
| [03 Quality Standards](docs/methodology/03_quality_standards.md) | Confidence tagging, source attribution, verification rules |
| [04 Entity Profiles](docs/methodology/04_entity_profiles.md) | YAML frontmatter schema, file naming, cross-linking |
| [05 Output Templates](docs/methodology/05_output_templates.md) | Blank templates for every section and file type |
| [06 Agent Prompts](docs/methodology/06_agent_prompts.md) | Copy-paste prompts to drive each research phase |
| [07 Lessons Learned](docs/methodology/07_lessons_learned.md) | Anti-patterns, pitfalls, and hard-won insights |

---

## Tools Required

| Tool | Purpose | Install |
|------|---------|---------|
| **Python 3.11+** | Primary scripting runtime | `brew install python` |
| **aiohttp** | Async HTTP requests with rate limiting | `pip install aiohttp` |
| **BeautifulSoup4** | HTML parsing and data extraction | `pip install beautifulsoup4` |
| **lxml** | Fast XML/HTML parser | `pip install lxml` |
| **Playwright** | Headless browser for JS-rendered pages | `pip install playwright && playwright install` |
| **yt-dlp** | Video/audio download and caption extraction | `pip install yt-dlp` |
| **pdfminer.six** | PDF text extraction | `pip install pdfminer.six` |
| **Tesseract OCR** | Image-to-text for scanned documents | `brew install tesseract` |
| **ExifTool** | Metadata extraction from images/PDFs | `brew install exiftool` |
| **openpyxl** | Excel file generation | `pip install openpyxl` |
| **reportlab** | PDF report generation | `pip install reportlab` |
| **holehe** | Email existence checking across platforms | `pip install holehe` |
| **Pillow** | Image processing and contact sheet generation | `pip install Pillow` |
| **Claude Code** | AI agent runtime (Opus 4.6, 1M context) | [claude.ai/claude-code](https://claude.ai/claude-code) |

---

## Agent Skills Used

<div align="center">

| Skill | Purpose |
|-------|---------|
| `deep-research` | 7-phase research pipeline orchestration |
| `intelligence-dossier` | Full dossier structure and business model analysis |
| `company-legal-reputation-research` | Court records, liens, sanctions screening |
| `client-discovery-osint` | 12-source client identification from public data |
| `supplier-verification` | Verify partnerships via manufacturer directories |
| `oem-partner-verification` | Confirm OEM relationships against authorized dealer lists |
| `linkedin-activity-intelligence` | Extract company/people intel from LinkedIn archives |
| `era-validated-linkedin-analysis` | Prevent misattribution across multi-employer feeds |
| `competitor-identification` | 5-phase competitor finding methodology |
| `industry-context-research` | 6-dimension industry analysis framework |
| `commercial-property-research` | Property records, lease analysis, facility costs |
| `domain-email-enumeration` | DNS/MX/SPF/DMARC audit and email discovery |
| `website-techstack-analysis` | CMS, CDN, analytics, ad pixel reverse engineering |
| `open-source-traffic-analysis` | Multi-source web traffic estimation |
| `ad-transparency-audit` | Cross-reference tracking pixels vs actual ad spend |
| `google-dorking-osint` | Structured dorking using infra identifiers |
| `web-crawl-intelligence-extraction` | Process saved captures and deleted pages |
| `contact-sheet-image-analysis` | Batch image analysis via thumbnail grids |
| `verification-audit` | Cross-verify findings, retract unverifiable claims |
| `business-model-canvas` | 9-block Osterwalder BMC construction |

</div>

---

## Built With

<div align="center">

| Component | Role |
|-----------|------|
| **Claude Opus 4.6 (1M context)** | Primary research and synthesis agent |
| **Claude Code** | Agent runtime and tool orchestration |
| **Windsurf** | IDE for skill development and file management |
| **Devin** | Parallel agent execution for collection phases |

</div>

---

## Real-World Example

The methodology in this repo was developed and validated by building a complete intelligence dossier on **BROGAV Solutions** (a private industrial supply company in Minnesota).

**Results:**
- 32+ structured files across 13 sections
- 40+ supplier relationships mapped and verified
- 15+ personnel identified with role history
- 7 competitors profiled with positioning analysis
- Full industry context (6 dimensions, 32 sub-files)
- Confidence-tagged throughout (HIGH/MEDIUM/LOW)

View the output: [**ever-just/brogav-dossier**](https://github.com/ever-just/brogav-dossier)

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

*Built by [EverJust](https://everjust.org) — making intelligence work reproducible.*

</div>
