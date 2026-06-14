<div align="center">

<img src="https://img.shields.io/badge/methodology-competitive_intelligence-000?style=for-the-badge&logo=target&logoColor=white" alt="methodology">

# Company Dossier

### How to research any private company using AI agents and open-source intelligence

[![Updated](https://img.shields.io/badge/updated-June_2026-2ea44f?style=flat-square)]()
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Tools](https://img.shields.io/badge/tools_documented-30%2B-orange?style=flat-square)](tools.md)
[![Agent Skills](https://img.shields.io/badge/agent_skills-20-blueviolet?style=flat-square)](skills.md)
[![LLMs.txt](https://img.shields.io/badge/llms.txt-available-green?style=flat-square)](llms.txt)

---

From zero knowledge to a **613-file structured dossier** in 4 days.<br>
Public sources only. No paid subscriptions. Fully reproducible by humans or AI agents.

[View real output](https://github.com/ever-just/brogav-dossier) · [Start building](#how-to-start-a-new-dossier) · [See the pipeline](#the-7-phase-research-pipeline)

</div>

---

## What is a company dossier?

A structured intelligence package on a private company — covering identity, people, products, suppliers, customers, competitors, financials, marketing, and strategic risks. Unlike a one-off Google search, a dossier is:

- **Structured** — organized into searchable sections with per-entity files
- **Confidence-tagged** — every claim marked Definitive / High / Moderate / Low / Inferred
- **Source-attributed** — every fact traceable to a URL, document, or API response
- **Agent-navigable** — YAML frontmatter and ROUTER.md enable 2-read answers for AI

---

## Who is this for?

| You are... | You'll use this to... |
|------------|----------------------|
| 🤖 **AI agent** tasked with company research | Follow the methodology to produce structured output |
| 📊 **Analyst** doing competitive intelligence | Execute the 7-phase pipeline on your target |
| 💼 **Investor** evaluating an acquisition | Build a diligence-grade package from public data |
| 🔍 **Researcher** studying a private company | Get organized fast instead of drowning in tabs |
| 🛠️ **Builder** creating OSINT tools | Reference our architecture for structured output design |

---

## The 7-Phase Research Pipeline

```
 ┌────────┐   ┌───────┐   ┌────────┐   ┌─────────┐   ┌────────┐   ┌────────────┐   ┌────────┐
 │  PLAN  │──▶│ LOCAL │──▶│ SEARCH │──▶│ WAYBACK │──▶│ SCRAPE │──▶│ SYNTHESIZE │──▶│ REPORT │
 │  5min  │   │ 5min  │   │ 15min  │   │  30min  │   │ 30min  │   │   30min    │   │ 30min  │
 └────────┘   └───────┘   └────────┘   └─────────┘   └────────┘   └────────────┘   └────────┘
```

| Phase | What happens | Tools |
|-------|-------------|-------|
| **Plan** | Enumerate sources, define research questions, create checklist | Sequential thinking |
| **Local** | Parse existing data, analyze what you already have, identify gaps | grep, file analysis |
| **Search** | Broad → targeted → domain-specific web searches | Web APIs, Google dorking |
| **Wayback** | Recover deleted pages, find historical content, discover PDFs | Wayback CDX API, waybackurls |
| **Scrape** | Extract platform data, download videos, parse transcripts | Playwright, yt-dlp, BeautifulSoup |
| **Synthesize** | Cross-reference claims, tag confidence, resolve contradictions | Multi-agent verification |
| **Report** | Create entity files, add frontmatter, build ROUTER.md navigation | Structured writing |

**Total: ~2.5 hours** for a configured agent. 4 days including deep dives and industry context.

Full details: [`methodology.md`](methodology.md) → [`collection_phases.md`](collection_phases.md)

---

## What does the output look like?

A 12-section dossier with infrastructure folders:

```
COMPANY DOSSIER/
├── README.md          # Landing page
├── ROUTER.md          # 60+ questions mapped to file paths (AI navigation)
│
├── _data/             # All CSVs — single source of truth
├── _assets/           # All photos & PDFs with semantic index
├── _evidence/         # Raw source data (collected once)
│
├── 1_corporate/       # Identity, registrations, certifications
├── 2_people/          # 1 file per person (15+ profiles)
├── 3_products/        # Product catalog, services, pricing
├── 4_suppliers/       # 1 file per supplier (17+ profiles)
├── 5_customers/       # Known clients, prospects, testimonials
├── 6_competitors/     # 1 file per competitor (8+ profiles)
├── 7_financials/      # Revenue estimation, valuation
├── 8_marketing/       # Social media, events, press, traffic
├── 9_brand/           # Visual identity, name origin
├── 10_timeline/       # Founding story, chronology
├── 11_analysis/       # Risk register, SWOT, acquisition thesis
└── 12_industry/       # Market sizing, regulation, technology
```

**Design principles:** Entity-centric (1 file per entity). Max 500 lines. YAML frontmatter everywhere. Separated layers (facts / judgment / evidence / data).

Full architecture: [`architecture.md`](architecture.md)

---

## How to start a new dossier

```bash
# 1. Clone this methodology repo
git clone https://github.com/ever-just/company-dossier.git

# 2. Create your dossier structure (one command)
TARGET="COMPANY_NAME"
mkdir -p "$TARGET DOSSIER"/{_meta,_data,_assets/photos,_evidence,1_corporate,2_people/profiles,3_products,4_suppliers/profiles,5_customers,6_competitors/profiles,7_financials,8_marketing,9_brand,10_timeline,11_analysis,12_industry}

# 3. Point your AI agent at the methodology
```

**Agent prompt:**
```
Read methodology.md and collection_phases.md from the company-dossier repo.
Build a complete intelligence dossier on [COMPANY NAME] following the 7-phase
pipeline. Write all output to the dossier directory using entity-centric files
with YAML frontmatter.
```

Starter template: [`skeleton.md`](skeleton.md) — full folder tree with bash command

---

## What's in this repo?

| File | Description |
|------|-------------|
| 📋 [`methodology.md`](methodology.md) | Philosophy, 7-phase pipeline, design principles, definition of "done" |
| 🔬 [`collection_phases.md`](collection_phases.md) | 6 data collection methods with commands and examples |
| 🛠️ [`tools.md`](tools.md) | 30+ tools — what each does, how we used it, rate limits, alternatives |
| 🤖 [`skills.md`](skills.md) | 20 agent skills — when to invoke each, what it produces |
| 🧬 [`patterns.md`](patterns.md) | 10 cross-cutting patterns that connect all skills |
| 🏗️ [`architecture.md`](architecture.md) | Output structure, YAML schema, ROUTER.md pattern, naming rules |
| 📖 [`case_study.md`](case_study.md) | Day-by-day narrative of building the BROGAV dossier |
| 💬 [`prompts.md`](prompts.md) | 12 key prompts with analysis of what made them effective |
| ✅ [`quality_assurance.md`](quality_assurance.md) | 3-phase forensic audit — how we caught 56 errors |
| 📐 [`skeleton.md`](skeleton.md) | Copy-paste structure to start a new dossier |
| 🏷️ [`frontmatter.md`](frontmatter.md) | YAML templates for 5 file types |
| 💡 [`lessons_learned.md`](lessons_learned.md) | What worked, what failed, what to do differently |
| 📚 [`SOURCES.md`](SOURCES.md) | Every tool, repo, and API cited |
| 🌐 [`ECOSYSTEM.md`](ECOSYSTEM.md) | 30+ related repos in the OSINT landscape |
| 🤖 [`llms.txt`](llms.txt) | AI agent discovery file (structured index for LLMs) |

---

## How is this different from other OSINT tools?

| Existing tools | This methodology |
|---------------|-----------------|
| Collect raw data (emails, subdomains, DNS) | Produces **structured intelligence products** |
| Output is a terminal dump or JSON blob | Output is a **navigable dossier** with YAML frontmatter |
| Focus on technical reconnaissance | Focus on **business intelligence** (revenue, suppliers, risks) |
| No confidence framework | Every claim tagged **Definitive → Unverified** |
| One-shot collection | **7-phase pipeline** with verification and QA phases |
| No synthesis | **Cross-references** claims across 3+ sources per finding |

> **The gap in OSINT is not collection — it's synthesis.** Dozens of tools scrape data. None produce structured, confidence-tagged, cross-referenced intelligence products ready for decisions.

---

## Tools at a glance

| Category | Tools |
|----------|-------|
| **Collection** | Python/BeautifulSoup, Playwright, Wayback CDX API, yt-dlp |
| **People intel** | holehe, theHarvester, SMTP verification, SignalHire/RocketReach |
| **Tech detection** | httpx, GTM container parsing, crt.sh |
| **Government data** | USASpending API, MN SOS, CLEATUS (UEI/CAGE) |
| **Traffic analysis** | SimilarWeb API, Tranco, Cloudflare Radar |
| **Document analysis** | ExifTool, pdftotext, Tesseract OCR |
| **Dorking** | Google advanced operators, Wayback CDX MIME filters |

Full reference with install commands: [`tools.md`](tools.md)

---

## Validated results

Built on a real company (BROGAV Solutions, $4.5M data center VAR):

| Metric | Result |
|--------|--------|
| Structured files produced | 613 |
| Entity profiles | 40 (suppliers + competitors + people) |
| Factual errors caught by QA | 56 |
| Data points with validated paths | 110 |
| Confidence tag coverage | 100% |
| Time to complete (with deep dives) | 4 days |
| Tools/APIs used | 30+ |
| Cost | $0 (public sources only) |

**[View the full output →](https://github.com/ever-just/brogav-dossier)**

---

## Frequently asked questions

<details>
<summary><strong>Can an AI agent do this autonomously?</strong></summary>

Yes, with guidance. The methodology was developed using Claude Opus 4.6 (1M context) in Claude Code. An agent can execute all 7 phases, but some steps require human decisions (editorial judgment on confidence, portal logins that block automation). See `prompts.md` for the exact prompts that drive each phase.
</details>

<details>
<summary><strong>What can't this methodology access?</strong></summary>

Login-gated LinkedIn data, SAM.gov full records (needs API key), court records (PACER fees), paid firmographics (ZoomInfo/Apollo full), internal financials of private LLCs, and state court portals that block bots. These are documented as "intelligence gaps" with specific instructions for manual closure.
</details>

<details>
<summary><strong>How is confidence determined?</strong></summary>

6-tier scale: **Definitive** (government record) → **High** (2+ independent sources) → **Moderate** (1 credible source) → **Low** (single aggregator) → **Inferred** (logical deduction) → **Unverified** (OCR/uncorroborated). See `frontmatter.md` for the full framework.
</details>

<details>
<summary><strong>Is this legal?</strong></summary>

Yes. All sources are public. No unauthorized access, no social engineering, no login bypass. The methodology explicitly documents what it cannot reach (login-gated data) and recommends legitimate alternatives (direct inquiry, paid reports). See `methodology.md` for the ethical framework.
</details>

---

<div align="center">

### Built with

[![Claude](https://img.shields.io/badge/Claude_Opus_4.6-1M_context-blueviolet?style=for-the-badge&logo=anthropic&logoColor=white)]()
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)]()
[![Wayback](https://img.shields.io/badge/Wayback_Machine-CDX_API-red?style=for-the-badge&logo=internetarchive&logoColor=white)]()

---

*[EverJust](https://everjust.org) — making intelligence work reproducible.*

</div>
