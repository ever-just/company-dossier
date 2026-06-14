<div align="center">

# Company Dossier

**A reproducible methodology for building competitive intelligence on private companies using AI agents and open-source tools.**

[![Last Updated](https://img.shields.io/badge/updated-June_2026-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Built With](https://img.shields.io/badge/built_with-Claude_Opus_4.6-blueviolet)]()
[![Tools](https://img.shields.io/badge/tools-30%2B_documented-orange)](tools.md)
[![Skills](https://img.shields.io/badge/agent_skills-20-purple)](skills.md)

---

*From zero knowledge to a 600-file structured dossier in 4 days.*
*Public sources only. No paid subscriptions. Fully reproducible.*

**[Real-world example →](https://github.com/ever-just/brogav-dossier)**

</div>

---

## What This Is

A complete guide to building intelligence dossiers on private companies — the kind used for M&A due diligence, competitive analysis, partnership evaluation, and investment research.

Everything here was developed and battle-tested building an actual dossier on a real company (BROGAV Solutions, a $4.5M data center equipment VAR in Minnesota). The methodology produced 613 files across 12 structured sections with confidence-tagged claims and full source attribution.

**This repo teaches the process. The [brogav-dossier](https://github.com/ever-just/brogav-dossier) repo shows the output.**

---

## Files in This Repo

| File | What it covers | Read if you want to... |
|------|---------------|----------------------|
| [`methodology.md`](methodology.md) | Philosophy, 7-phase pipeline, design principles | Understand the overall approach |
| [`collection_phases.md`](collection_phases.md) | 6 data collection methods with example commands | Execute each research phase step-by-step |
| [`tools.md`](tools.md) | 30+ tools (17 used, 8 rejected with rationale) | Know what to install and why |
| [`skills.md`](skills.md) | 20 agent skills with invocation guide | Deploy specialized research agents |
| [`patterns.md`](patterns.md) | 10 cross-cutting patterns across all skills | Understand the meta-methodology |
| [`architecture.md`](architecture.md) | Output folder structure, YAML schema, ROUTER.md | Design your dossier's information architecture |
| [`case_study.md`](case_study.md) | Day-by-day narrative of the BROGAV build | See how it actually played out in practice |
| [`prompts.md`](prompts.md) | 12 key prompts with effectiveness analysis | Copy prompts that drive each research phase |
| [`quality_assurance.md`](quality_assurance.md) | 3-phase audit methodology, 56 issues found | QA your dossier and catch errors |
| [`skeleton.md`](skeleton.md) | Bash one-liner to create the full folder structure | Start a new dossier in 30 seconds |
| [`frontmatter.md`](frontmatter.md) | YAML templates for 5 file types | Add metadata to every file |
| [`lessons_learned.md`](lessons_learned.md) | What worked, what didn't, what to do differently | Avoid our mistakes |
| [`SOURCES.md`](SOURCES.md) | Every tool, repo, and API we used (cited) | See our actual stack |
| [`ECOSYSTEM.md`](ECOSYSTEM.md) | 30+ related repos in the OSINT landscape | Find more tools and approaches |

---

## The Pipeline

```
 PLAN → LOCAL → SEARCH → WAYBACK → SCRAPE → SYNTHESIZE → REPORT
 5min    5min    15min    30min     30min     30min        30min
```

**~2.5 hours per company** for a configured agent. 4 days including deep dives, industry context, and quality assurance.

| Phase | What happens | Key tools |
|-------|-------------|-----------|
| **Plan** | Enumerate sources, create research checklist | Sequential thinking |
| **Local** | Parse any existing data, identify gaps | File system, grep |
| **Search** | Broad → targeted → domain-specific web searches | Web search APIs |
| **Wayback** | Historical pages, deleted content, PDF discovery | Wayback CDX API |
| **Scrape** | Platform data, video transcripts, async extraction | Playwright, yt-dlp, BeautifulSoup |
| **Synthesize** | Cross-reference, tag confidence, resolve conflicts | Multi-agent triangulation |
| **Report** | Structure output, add frontmatter, create navigation | Entity-centric file architecture |

---

## Output Architecture

What the finished dossier looks like:

```
COMPANY DOSSIER/
├── README.md              # Landing page
├── ROUTER.md              # Question → file lookup (60+ Q&A pairs)
├── _meta/                 # Navigation infrastructure
├── _data/                 # ALL CSVs (single source of truth)
├── _assets/               # ALL photos & PDFs with semantic index
├── _evidence/             # Raw source data (collected once)
├── 1_corporate/           # WHO THEY ARE
├── 2_people/              # WHO WORKS THERE (1 file per person)
├── 3_products/            # WHAT THEY SELL
├── 4_suppliers/           # WHO THEY BUY FROM (1 file per supplier)
├── 5_customers/           # WHO BUYS FROM THEM
├── 6_competitors/         # WHO THEY COMPETE WITH (1 file per competitor)
├── 7_financials/          # REVENUE & VALUATION
├── 8_marketing/           # HOW THEY GO TO MARKET
├── 9_brand/               # VISUAL IDENTITY
├── 10_timeline/           # HISTORY
├── 11_analysis/           # JUDGMENT & THESES
└── 12_industry/           # MARKET CONTEXT
```

**Key design decisions:** Entity-centric (1 file per entity). Max 500 lines per file. YAML frontmatter on every file. Separated layers (facts/judgment/evidence/data). ROUTER.md enables 2-read navigation for AI agents.

Full details: [`architecture.md`](architecture.md)

---

## Quick Start

```bash
# 1. Get the methodology
git clone https://github.com/ever-just/company-dossier.git

# 2. Create your dossier skeleton (replace TARGET with company name)
mkdir -p "TARGET DOSSIER"/{_meta,_data,_assets/photos,_evidence,1_corporate,2_people/profiles,3_products,4_suppliers/profiles,5_customers,6_competitors/profiles,7_financials,8_marketing,9_brand,10_timeline,11_analysis,12_industry}

# 3. Point your AI agent at the methodology
# Prompt: "Read methodology.md and collection_phases.md in the company-dossier repo.
# Build a complete intelligence dossier on [COMPANY NAME] using this methodology.
# Write output to the TARGET DOSSIER/ directory."
```

---

## Key Insight

> The gap in the OSINT ecosystem is not collection — it's synthesis. Dozens of tools can scrape, enumerate, and discover. **None produce structured, confidence-tagged, cross-referenced intelligence products.** This methodology fills that gap by treating the output architecture (entity files, frontmatter, ROUTER.md, confidence tags) as equally important to the collection pipeline.

---

## Validated Results (BROGAV Dossier)

| Metric | Value |
|--------|-------|
| Total structured files | 613 |
| Entity profiles created | 40 (17 suppliers, 8 competitors, 15 people) |
| Data points verified | 110 (via ROUTER.md path validation) |
| Factual errors caught in QA | 56 |
| Confidence coverage | 100% of files have frontmatter |
| Collection time | ~4 days (including industry context) |
| Sources used | 30+ tools and APIs |

---

<div align="center">

**[View the real output → ever-just/brogav-dossier](https://github.com/ever-just/brogav-dossier)**

*Built by [EverJust](https://everjust.org)*

</div>
