# Cross-Cutting Patterns Across All 20 Skills

These patterns were identified by analyzing all 20 research skills together. They represent the underlying methodology that connects individual skills into a coherent system.

---

## 1. Tiered Evidence Framework

Every skill uses the same confidence scale:
- **Tier 1 / Definitive / High (5+ points):** 3+ independent sources OR government record
- **Tier 2 / Moderate (3-4 points):** 2 independent sources agree
- **Tier 3 / Low (1-2 points):** 1 credible source OR strong inference
- **Tier 4 / Inferred (<1 point):** Logical deduction, no direct evidence

Scoring example (supplier verification): manufacturer directory = 3 pts, case study = 2 pts, product page = 2 pts, LinkedIn post = 2 pts, event co-sponsor = 1 pt, logo only = 1 pt.

---

## 2. Multi-Source Triangulation

No single source is authoritative. Every claim needs independent verification:
- Revenue: D&B + headcount model + aggregator band + industry benchmarks
- Employment: LinkedIn + SignalHire + RocketReach + SMTP verification
- Partnerships: Logo wall + manufacturer directory + event participation + case studies
- Timeline: Wayback Machine + LinkedIn posts + press releases + SOS filings

**Rule:** 1 source = Low confidence. 2 sources = Moderate. 3+ independent = High.

---

## 3. Era Separation Discipline

LinkedIn posts, interviews, and employee data span multiple employers. Every finding MUST be mapped to its era:
- Celina's 2019 post about "Protector Cabinets" = Emcor era, NOT BROGAV
- Golf event photo from 2021 = pre-BROGAV
- "We build in Jacksonville" = supplier's factory, not BROGAV's facility

**The single most common error in LinkedIn intelligence is era contamination.**

---

## 4. Anti-Logo-Wall Pattern

Recurring across supplier-verification, oem-partner-verification, client-discovery:
- Logo walls inflate partnership counts
- 25 logos may represent 3-5 deep relationships
- 27 claimed partnerships → only 2 independently confirmed (BROGAV case)
- Visually impressive ≠ operationally real

**Always verify each logo independently. Never cite logo wall count as partnership count.**

---

## 5. Free Tools, No API Keys Required

Almost all skills use free/open-source tools:
- Wayback CDX API (no key)
- SimilarWeb free API endpoint (no key, rate limited)
- USASpending.gov API (no key for basic queries)
- SMTP verification (direct connection, no key)
- holehe (open source, 121 services)
- theHarvester (open source)
- ExifTool (open source)
- Tesseract OCR (open source)

Paid tools explicitly avoided: SimilarWeb Pro, Ahrefs, SEMrush, Apollo.io full, ZoomInfo full, PACER per-search fees.

---

## 6. Architectural Consistency

All skills output to the same structure:
- 12 numbered content sections + 4 infrastructure folders
- Entity-centric files (one per supplier, competitor, person)
- YAML frontmatter on every file
- CSVs in `_data/` only
- Photos in `_assets/` only
- Raw evidence in `_evidence/` only

This consistency means skills can be composed: intelligence-dossier invokes deep-research, which invokes competitor-identification, which invokes open-source-traffic-analysis — all writing to the same folder tree.

---

## 7. Verification as Terminal Phase

Every research project ends with:
1. **verification-audit** — retract unverifiable claims, downgrade confidence
2. **era-validated-linkedin-analysis** — catch misattributed LinkedIn data
3. **Cross-reference check** — grep for contradictions between files

BROGAV results: 4 entity registrations retracted (aggregator hallucinations), 7 pre-era misattributions caught, salary data downgraded from "new intel" to "low-medium confidence."

---

## 8. Parallelization Where Safe

Multi-source research runs parallel agents when sources don't conflict:
- 3 agents covering dossier sections 00-04, 05-09, 10-13 simultaneously
- 6 industry dimensions researched in parallel (economics, history, legal, political, sociology, technology)
- Forensic audit: 3 agents checking people/org, financials/products, timeline/legal in parallel

**Rule:** Only parallelize when agents write to DIFFERENT files. Never have 2 agents editing the same file.

---

## 9. Matrices Over Narratives

Actionable intelligence uses structured comparisons:
- Product/service coverage matrix (target vs. each competitor)
- Shared brand matrix (which suppliers overlap)
- Geographic overlap map
- Tariff exposure matrix (supplier × origin × HTS code × rate)
- Certification value matrix (cert × customer segment × revenue impact)

Narrative alone is not enough for decision-making. Matrices make analysis scannable and comparable.

---

## 10. Wayback Machine as Universal Tool

Appears across 12 of 20 skills. Used for:
- Deleted page recovery (products, pricing, team pages)
- Site evolution tracking (when e-commerce launched, when pages disappeared)
- PDF discovery (CDX MIME filter for `application/pdf`)
- Event details (historical event pages with speakers, sponsors, pricing)
- Address history (footer changes reveal relocations)
- Competitive intelligence (competitor's historical partner pages)

**Rate limit:** 1.5 seconds between CDX queries. Use `&collapse=original` to deduplicate results.

---

## Application

When building a new dossier, apply these patterns in this order:

1. Set up architectural structure (pattern 6) FIRST
2. Collect data with era separation (pattern 3) from the start
3. Triangulate every claim (pattern 2) as you write
4. Use free tools (pattern 5) before considering paid alternatives
5. Build matrices (pattern 9) alongside narratives
6. Parallelize where safe (pattern 8) for speed
7. Apply verification (pattern 7) as the final phase
8. Question every logo wall (pattern 4) and demand evidence
9. Use Wayback (pattern 10) on every target domain
10. Tag confidence (pattern 1) on every factual claim
