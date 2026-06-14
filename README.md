<div align="center">

<img src="https://img.shields.io/badge/methodology-competitive_intelligence-000?style=for-the-badge&logo=target&logoColor=white" alt="methodology">

# Company Dossier

### The complete playbook for building intelligence packages on private companies

[![Updated](https://img.shields.io/badge/updated-June_2026-2ea44f?style=flat-square)]()
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Tools](https://img.shields.io/badge/tools_documented-30%2B-orange?style=flat-square)](tools.md)
[![Agent Skills](https://img.shields.io/badge/agent_skills-20-blueviolet?style=flat-square)](skills.md)
[![LLMs.txt](https://img.shields.io/badge/llms.txt-available-green?style=flat-square)](llms.txt)

---

From zero knowledge about a company to a **600+ file intelligence package** in 4 days.<br>
Public sources only. No paid subscriptions. Reproducible by humans or AI agents.

[See what you get](#what-the-finished-product-contains) · [Start building](#how-to-start-a-new-dossier) · [View the pipeline](#the-7-phase-research-pipeline)

</div>

---

## What the finished product contains

When this methodology is run on a target company, you produce a structured intelligence package with **8 categories of intelligence**, containing **100+ distinct data points** across **40+ entity profiles** and **14 structured datasets**. Here is the full inventory:

---

### 🏢 Corporate Identity & Legal Standing

Everything needed to confirm who a company legally is and whether they're in good standing.

| Intelligence gathered | How it's found |
|----------------------|---------------|
| Legal entity name, prior names, DBA | Secretary of State filings |
| Date of formation, state, entity type | SOS records |
| Compliance history (terminations, reinstatements) | SOS filing timeline |
| Registered agent and office address | SOS records |
| Federal identifiers: DUNS, UEI, CAGE code | CLEATUS, SAM.gov |
| NAICS/SIC industry classification | SAM.gov, BBB, industry directories |
| Certifications (WBENC, WOSB, DBE, EDWOSB) | UMN OSD, SBA, WBENC |
| BBB rating and complaint history | BBB profile |
| Federal contract awards ($0 or actual) | USASpending.gov API |
| Litigation, liens, UCC filings, sanctions | CourtListener, state SOS, OpenSanctions |
| Property records (own vs. lease, sq footage, cost) | County assessor, Facebook Marketplace, LoopNet |
| Physical addresses (office, warehouse, former) | Multi-source triangulation |

---

### 👥 People & Organization

A complete map of who works there, who left, who was hired, and the organizational structure.

| Intelligence gathered | How it's found |
|----------------------|---------------|
| Full team roster (name, title, location, status) | LinkedIn, SignalHire, RocketReach, Prospeo, ZoomInfo |
| Individual career profiles (education, prior employers, specializations) | Aggregator cross-reference + LinkedIn |
| Org chart with reporting relationships | Inferred from titles + hiring patterns |
| Headcount reconciliation (why sources disagree) | Cross-referencing D&B, aggregators, named individuals |
| Hiring signals (open roles, salary data, posting history) | Wayback captures of careers page, Indeed |
| Departures (who left, when, where they went, significance) | LinkedIn, aggregator roster changes |
| Recruiting methods (network vs. job board vs. agency) | Podcast transcripts, posting analysis |
| Email addresses (SMTP verified: deliverable/not) | Pattern inference + AfterShip SMTP verification |
| Phone numbers | RocketReach, ZoomInfo, BBB |
| Founder concentration risk assessment | Role analysis + certification ownership mapping |

---

### 📦 Products & Services

What they sell, how they sell it, what it costs, and how it compares.

| Intelligence gathered | How it's found |
|----------------------|---------------|
| Full product catalog (every SKU with specs) | Live site crawl + Wayback product page history |
| Product category taxonomy | Site navigation analysis |
| Published pricing (where available) | E-commerce store scraping |
| Price comparison vs. major brands | Web research on competitor list pricing |
| Branded/private-label products (margin analysis) | Product page + manufacturing origin research |
| Services offered (turnkey, installation, rental) | Website + job postings + case studies |
| Rental program details | Brochure PDF extraction |
| Business model mix (% resale vs. services vs. rental vs. e-commerce) | Triangulation from multiple signals |
| Product launch timeline | Wayback CDX timestamp analysis |
| Inventory levels and surplus equipment | Live store + LinkedIn posts |

---

### 🏭 Suppliers & Partnerships

Who they buy from, how strong each relationship is, and whether claims are verified.

| Intelligence gathered | How it's found |
|----------------------|---------------|
| Complete supplier line card (all claimed partners) | Website partner page + logo wall OCR |
| Per-supplier entity profiles (tier, products, evidence, risk) | Multi-source synthesis |
| OEM verification status (confirmed vs. claimed) | Manufacturer "Find a Partner" directory checks |
| Relationship strength scoring (1-5 evidence points) | Scoring: directory=3, case study=2, logo=1 |
| Supply chain concentration risk | Single-source dependency analysis |
| Tariff exposure by product line | HTS code research + country-of-origin investigation |
| Manufacturing origin of branded products | Founder career history + facility research |
| Version tracking (when partners were added/removed) | Wayback captures of partner page over time |
| Partnership event evidence (co-sponsorship, speaking) | Event materials + LinkedIn posts |

---

### 🎯 Customers & Market Position

Who buys from them, how they're positioned, and where their opportunities are.

| Intelligence gathered | How it's found |
|----------------------|---------------|
| Confirmed clients (named, with evidence) | Testimonials, case studies, event sponsorships |
| Probable clients (tiered confidence: Confirmed → Inferred) | 12-source cross-referencing |
| Client relationship registry (relationship type, evidence, owner) | Synthesis from all sources |
| Testimonials and quotes (verbatim) | Website scraping + Wayback recovery |
| Target markets (geography, verticals, buyer types) | Job postings + event attendance + association membership |
| Industry association memberships | LinkedIn, website, event records |
| Customer concentration risk | Gap analysis (only 1 named client = risk) |
| Prospect lists (scored, ranked, by geography) | ICP definition + database screening |

---

### ⚔️ Competitive Landscape

Who they compete with, how they compare, and what threatens them.

| Intelligence gathered | How it's found |
|----------------------|---------------|
| Full competitor screening (4,000+ companies filtered) | S&P Global Capital IQ SIC-based screening |
| Top 10 nearest competitors (entity profiles) | Multi-factor similarity scoring |
| Competitive positioning matrix (capabilities comparison) | Product/service coverage analysis |
| Shared supplier brand overlap | Cross-referencing line cards |
| Geographic overlap mapping | Territory analysis from job postings |
| Competitor web traffic benchmarking | SimilarWeb API |
| Talent movement between competitors | Departure tracking |
| Competitive threat assessment (ranked) | Proximity × capability × market momentum |

---

### 💰 Financials & Valuation

Revenue estimation, financial signals, and M&A valuation range — all from public data.

| Intelligence gathered | How it's found |
|----------------------|---------------|
| Revenue estimate (with derivation methodology) | D&B Hoovers + headcount modeling + industry benchmarks |
| Revenue per employee calculation | Revenue ÷ confirmed headcount |
| Financial signals (bullish and bearish) | Hiring pace, inventory levels, facility expansion, awards |
| Surplus inventory valuation | Live store pricing × quantity |
| Estimated payroll costs | Indeed salary data + headcount |
| Warehouse/office lease costs | Property records + rental listings |
| EBITDA margin sensitivity analysis | Industry comp data × revenue scenarios |
| Enterprise valuation range (pessimistic to optimistic) | Multiple approaches: revenue multiple, EBITDA multiple |
| Acquisition thesis (who should buy, why, at what price) | Strategic analysis |
| Federal revenue opportunity (latent credentials) | WOSB pool size × capture probability |

---

### 📣 Marketing, Brand & Digital Presence

How they go to market, what's working, and where the gaps are.

| Intelligence gathered | How it's found |
|----------------------|---------------|
| Social media metrics (followers, engagement, growth rate) | Platform data + historical tracking |
| LinkedIn post analysis (top posts, engagement patterns, tagged companies) | MHTML archive extraction |
| YouTube channel analysis (videos, views, indexed vs. unlisted) | yt-dlp + Google search |
| Video transcripts (full text of all company videos) | yt-dlp auto-caption VTT |
| Website traffic estimates (monthly visits, bounce rate, time on site) | SimilarWeb API |
| Keyword rankings and opportunities (250+) | SimilarWeb competitor benchmarking |
| Competitor traffic benchmarking | SimilarWeb on top 10 competitors |
| Advertising activity (pixels installed vs. actual ads running) | GTM container parse + ad transparency platforms |
| PR and press coverage timeline | Web search + trade press archives |
| Owned events (details, sponsorship tiers, speakers, revenue estimate) | Wayback captures + sponsorship PDFs |
| Tech stack (CMS, CDN, analytics, email, ad pixels) | httpx + GTM + DNS + certificate transparency |
| Brand identity (colors, typography, voice, taglines) | Live site CSS/HTML extraction |
| Brand origin story | Podcast transcripts + Wayback "about" pages |
| Email infrastructure (provider, SPF, DKIM, DMARC, security gaps) | DNS TXT record analysis |

---

### 📊 Structured Datasets Produced

Every dossier produces 14 CSV datasets — queryable, sortable, machine-readable:

| Dataset | Rows | What's in it |
|---------|------|-------------|
| `team_roster.csv` | 20+ | Every person: name, title, location, status, source, notes |
| `org_chart.csv` | 15+ | Reporting relationships with department and start date |
| `supplier_line_card.csv` | 35+ | All suppliers: brand, category, products, confidence |
| `partners.csv` | 25+ | Supplier subset with OEM verification status |
| `client_register.csv` | 35+ | All known/suspected clients with confidence tier |
| `competitors.csv` | 4,000+ | Full screening dataset with tier, revenue, SIC, overlap score |
| `products.csv` | 45+ | Every product: SKU, category, price, condition, stock status |
| `certifications.csv` | 10+ | All certs: status, expiry, owner, risk if lapsed |
| `events.csv` | 25+ | Events attended/hosted: date, location, role, ROI |
| `financials.csv` | 20+ | Key metrics with source and confidence rating |
| `documents.csv` | 12+ | All recovered PDFs: title, date, author, content summary |
| `industry_codes.csv` | 70+ | NAICS, SIC, PSC, UNSPSC for company + all suppliers |
| `source_inventory.csv` | 20+ | Every research source with type and what it provided |
| `people.csv` | 15+ | Canonical people list (subset of full roster) |

---

### 🖼️ Visual Evidence & Documents

| Asset type | Typical count | What's captured |
|-----------|--------------|----------------|
| **Personnel photos** | 30+ | Headshots, team photos, event candids |
| **Product photos** | 15+ | Product photography, installation shots |
| **Facility photos** | 50+ | Office, warehouse, floor plans, satellite views |
| **Event photos** | 35+ | Conferences, golf outings, sponsored events |
| **Brand assets** | 25+ | Logos, marketing graphics, custom merchandise |
| **Partner/supplier logos** | 40+ | Every manufacturer logo from partner page |
| **PDF datasheets** | 4+ | Product specification sheets |
| **Job posting PDFs** | 4+ | Archived job descriptions with salary data |
| **Sponsorship decks** | 2-4 | Event sponsorship packages with pricing |
| **Partner presentations** | 2+ | Slide decks from partners presented at company events |

---

### 🧠 Strategic Analysis (Judgment Layer)

Beyond facts — what it all means for decision-making:

| Analysis produced | What it answers |
|------------------|----------------|
| **Executive brief** | "What is this company in one page?" |
| **Key facts sheet** | Quick-reference card for meetings |
| **SWOT analysis** | Strengths, weaknesses, opportunities, threats |
| **Risk register** (22+ risks, scored) | "What could go wrong and how likely is it?" |
| **Business model canvas** | How the company makes money (9 blocks) |
| **Acquisition thesis** | "Should we buy them? At what price? What's the risk?" |
| **Partnership thesis** | "Should we partner? What kind of partner benefits?" |
| **Competitive threat assessment** | "Who is most dangerous to this company?" |
| **Strategic assessment** | "Where are they headed? What's the ceiling?" |
| **Intelligence gaps** | "What don't we know? How to find out?" |
| **Industry positioning** | "Where do they sit in the value chain?" |
| **Market sizing** (TAM/SAM/SOM) | "How big is their addressable market?" |

---

### 🏗️ Industry Context (Macro Layer)

The broader context that informs strategic decisions:

| Dimension | What's researched |
|-----------|------------------|
| **Market economics** | TAM/SAM/SOM, channel economics, hyperscaler capex impact, M&A landscape |
| **Industry history** | Evolution timeline (7 eras), channel development, manufacturer strategies |
| **Legal & regulatory** | State licensing requirements, federal procurement rules, tariff exposure, environmental regs |
| **Political landscape** | State incentive competition, energy/grid crisis, federal policy, community opposition |
| **Workforce & society** | Labor shortage analysis, diversity certification premium, gender dynamics, associations |
| **Technology trajectory** | Liquid cooling adoption, edge vs. hyperscale, modular/prefab trends, sustainability mandates |
| **Synthesis** | Company positioning in value chain, opportunity map (15 tailwinds), threat map (15 headwinds) |

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
| **Plan** | Enumerate sources, define questions, create checklist | Sequential thinking |
| **Local** | Parse existing data, identify gaps | grep, file analysis |
| **Search** | Broad → targeted → domain-specific queries | Web APIs, Google dorking |
| **Wayback** | Recover deleted pages, discover PDFs, track changes | Wayback CDX API |
| **Scrape** | Platform data, videos, transcripts | Playwright, yt-dlp, BeautifulSoup |
| **Synthesize** | Cross-reference, tag confidence, resolve contradictions | Multi-agent verification |
| **Report** | Structure output, add frontmatter, build navigation | Entity-centric architecture |

**~2.5 hours** for a configured agent. 4 days with deep dives and industry context.

Details: [`methodology.md`](methodology.md) → [`collection_phases.md`](collection_phases.md)

---

## How to start a new dossier

```bash
# 1. Clone this methodology repo
git clone https://github.com/ever-just/company-dossier.git

# 2. Create your dossier structure
TARGET="COMPANY_NAME"
mkdir -p "$TARGET DOSSIER"/{_meta,_data,_assets/photos,_evidence,1_corporate,2_people/profiles,3_products,4_suppliers/profiles,5_customers,6_competitors/profiles,7_financials,8_marketing,9_brand,10_timeline,11_analysis,12_industry}

# 3. Point your AI agent at the methodology
```

**Agent prompt:**
```
Read methodology.md and collection_phases.md from the company-dossier repo.
Build a complete intelligence dossier on [COMPANY NAME] following the 7-phase
pipeline. Write output to the dossier directory using entity-centric files
with YAML frontmatter.
```

Full template: [`skeleton.md`](skeleton.md)

---

## What's in this repo?

| File | Description |
|------|-------------|
| 📋 [`methodology.md`](methodology.md) | Philosophy, 7-phase pipeline, design principles |
| 🔬 [`collection_phases.md`](collection_phases.md) | 6 collection methods with example commands |
| 🛠️ [`tools.md`](tools.md) | 30+ tools — used and rejected with rationale |
| 🤖 [`skills.md`](skills.md) | 20 agent skills — when and how to invoke |
| 🧬 [`patterns.md`](patterns.md) | 10 cross-cutting methodology patterns |
| 🏗️ [`architecture.md`](architecture.md) | Output structure, YAML schema, navigation design |
| 📖 [`case_study.md`](case_study.md) | Day-by-day build narrative |
| 💬 [`prompts.md`](prompts.md) | 12 key prompts with effectiveness analysis |
| ✅ [`quality_assurance.md`](quality_assurance.md) | 3-phase audit, 56 errors caught |
| 📐 [`skeleton.md`](skeleton.md) | One-command dossier structure creator |
| 🏷️ [`frontmatter.md`](frontmatter.md) | YAML templates for 5 file types |
| 💡 [`lessons_learned.md`](lessons_learned.md) | What worked and what failed |
| 📚 [`SOURCES.md`](SOURCES.md) | All tools, repos, and APIs cited |
| 🌐 [`ECOSYSTEM.md`](ECOSYSTEM.md) | 30+ related repos in OSINT landscape |
| 🤖 [`llms.txt`](llms.txt) | AI agent discovery file |

---

## How is this different from other OSINT tools?

| Existing tools | This methodology |
|---------------|-----------------|
| Collect raw data (emails, subdomains, DNS) | Produces **structured intelligence products** |
| Output is a terminal dump or JSON blob | Output is a **navigable 12-section dossier** |
| Focus on technical reconnaissance | Focus on **business intelligence** (revenue, suppliers, risks) |
| No confidence framework | Every claim tagged **Definitive → Unverified** |
| One-shot collection | **7 phases** including verification and QA |
| No synthesis | **Cross-references** across 3+ sources per finding |
| No structured output architecture | **Entity-centric files** with YAML frontmatter and ROUTER.md |

> **The gap in OSINT is not collection — it's synthesis.** Dozens of tools scrape data. None produce structured, confidence-tagged, cross-referenced intelligence products ready for decisions.

---

## Validated results

Tested on a real $4.5M private company:

| Metric | Result |
|--------|--------|
| Structured files produced | 613 |
| Entity profiles | 40 (suppliers + competitors + people) |
| Datasets (CSV) | 14 |
| Photos captured | 291 |
| PDFs recovered | 12 |
| Factual errors caught by QA | 56 |
| Navigation paths validated | 110 |
| Confidence coverage | 100% |
| Time (with deep dives) | 4 days |
| Cost | $0 |

---

<details>
<summary><strong>FAQ: Can an AI agent do this autonomously?</strong></summary>

Yes, with guidance. The methodology was developed with Claude Opus 4.6 (1M context). An agent can execute all 7 phases, but some steps need human decisions (editorial judgment, portal logins that block automation). See `prompts.md` for exact prompts.
</details>

<details>
<summary><strong>FAQ: What can't this reach?</strong></summary>

Login-gated LinkedIn data, SAM.gov full records (needs API key), court records (PACER fees), paid firmographics (ZoomInfo/Apollo), internal financials of private LLCs, state court portals that block bots. Documented as "intelligence gaps" with manual closure instructions.
</details>

<details>
<summary><strong>FAQ: Is this legal?</strong></summary>

Yes. Public sources only. No unauthorized access, no social engineering, no login bypass. See `methodology.md` for the ethical framework.
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
