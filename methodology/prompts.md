# Prompts That Built the BROGAV Dossier

This document catalogs the key prompts used throughout the dossier project, explaining what each was designed to accomplish, why it was structured that way, what it produced, and what we learned.

---

## Category 1: Initial Research Invocation

### The Intelligence Dossier Kickoff

**Prompt:**
```
Build a full competitive intelligence dossier on BROGAV Solutions LLC, a commercial furniture 
dealership based in Minneapolis, MN. Website: brogav.com. Owner: Celina Berglund.

Cover: company profile, leadership & team, products/services, suppliers, target markets, 
financial signals, marketing/events, legal/compliance, and competitive positioning.

Use all available sources: live site crawl, Wayback Machine, LinkedIn, federal databases 
(SAM.gov, USASpending), D&B, people intelligence aggregators, and industry publications.

Output as a structured dossier with one folder per section, README files for navigation, 
and source attribution on every claim.
```

**Why This Structure Works:**
- Names the target precisely (LLC, location, owner name) so agents don't waste cycles disambiguating
- Enumerates the sections expected — this constrains scope and prevents the agent from over- or under-researching
- Lists specific source types — agents perform better when told WHERE to look, not just WHAT to find
- Specifies output format — prevents the agent from dumping everything into one file

**What It Produced:**
- Complete 13-section dossier skeleton in ~4 hours
- 55 pages crawled, 12 PDFs discovered, 15+ people identified
- README files in each section with summary + links

**Lessons Learned:**
- Enumerating sources in the prompt is critical. Without explicit mention of "Wayback Machine," the agent would not have checked CDX APIs
- Specifying "source attribution on every claim" upfront saves an entire QA pass later
- The owner's name in the prompt enables people-intelligence queries from the start

---

## Category 2: Deep Dive Prompts

### Web Traffic Analysis

**Prompt:**
```
Run the open-source-traffic-analysis skill on brogav.com and their top 5 competitors:
- ispaceinc.com
- atmosstudio.com  
- flooringcommercial.com
- [others identified from competitive screening]

Compare monthly visits, traffic sources, geographic distribution, and device split.
Output as a comparative table with analysis of what the traffic patterns reveal about 
each company's go-to-market strategy.
```

**Why This Structure Works:**
- References a specific skill by name — the agent loads its methodology
- Provides competitor domains upfront so the analysis is comparative, not isolated
- Asks for strategic interpretation ("what patterns reveal about GTM") not just raw numbers
- Specifying "comparative table" forces structured output

**What It Produced:**
- Traffic estimates for all domains (most showed very low organic traffic — typical for B2B relationship-driven businesses)
- Source breakdown revealing that BROGAV relies almost entirely on direct/referral traffic
- Insight: low SEO investment is a rational choice given their sales model, not a weakness

**Lessons Learned:**
- For B2B companies with <1000 monthly visits, SimilarWeb data is sparse and unreliable
- The comparative framing is more valuable than absolute numbers — "lower than competitors" matters more than "847 visits/month"

---

### Competitive Landscape Screening

**Prompt:**
```
Identify BROGAV Solutions' competitive landscape. Start with S&P Capital IQ or similar 
databases. Filter for:
- SIC/NAICS codes: 423210 (Office Furniture Wholesalers), 337211 (Office Furniture Manufacturing)
- Geography: Minnesota, Wisconsin, Iowa, Dakotas (Upper Midwest)
- Revenue range: $1M - $50M
- Must be a dealer/reseller (not manufacturer)

From the full list, select the top 10 most direct competitors based on:
1. Geographic overlap (same metro)
2. Size similarity (within 3x revenue)
3. Service offering overlap (furniture + design + project management)
4. Certification overlap (WBENC, EDWOSB, MBE)

For each top-10 competitor, create a profile with: revenue, headcount, years in business, 
key certifications, major clients (if discoverable), and one-sentence positioning statement.
```

**Why This Structure Works:**
- Starts broad (4,797 companies) then narrows systematically — prevents missing competitors through premature filtering
- Explicit NAICS codes prevent the agent from guessing wrong industries
- The 4-criteria scoring system for "top 10" selection forces disciplined prioritization
- Requesting a "one-sentence positioning statement" per competitor forces the agent to synthesize, not just list facts

**What It Produced:**
- Initial screen: 4,797 companies nationally in relevant NAICS codes
- Regional filter: ~50 companies in Upper Midwest
- Final top 10 with full profiles
- Revealed that BROGAV's strongest differentiation is WBENC + EDWOSB stack (rare combination)

**Lessons Learned:**
- NAICS codes alone are insufficient — many competitors are classified under interior design or construction, not furniture wholesale
- The "must be a dealer/reseller" filter requires manual judgment; some companies blur the line between dealer and manufacturer rep
- 3x revenue range is the sweet spot for "meaningful competitor" — below that they're too small to compete for the same contracts

---

### Industry Context Research

**Prompt:**
```
Run the industry-context-research skill for the commercial office furniture dealer industry.
Apply the 6-dimension framework:

1. ECONOMICS: Market size (US, MN), growth rate, consolidation trends, margin structure, 
   revenue models (product markup vs. service fees vs. recurring)
2. HISTORY: Evolution from transactional sales to full-service "workplace solutions," 
   major industry events (Steelcase/HM shifts, COVID impact, hybrid work)
3. LEGAL: GSA schedule requirements, state procurement rules, ADA/accessibility mandates, 
   sustainability certifications (BIFMA, LEED contribution)
4. POLITICAL: Government spending trends, Buy American/Trade Agreements Act, 
   supplier diversity executive orders, tariff impacts on imported furniture
5. SOCIOLOGICAL: Hybrid work impact on demand, wellness/ergonomics movement, 
   generational workspace preferences, DEI procurement mandates
6. TECHNOLOGY: Digital configurators, BIM/Revit integration, AR visualization, 
   IoT-enabled furniture, sustainability tracking platforms

For each dimension, produce a research file with sourced findings.
Output: one file per sub-topic within each dimension.
```

**Why This Structure Works:**
- The 6-dimension framework ensures comprehensive coverage without overlap
- Specific sub-topics within each dimension prevent the agent from writing at too high a level
- Mentioning real frameworks (BIFMA, GSA, BIM) signals the level of specificity expected
- "One file per sub-topic" prevents 32 topics from being crammed into one unnavigable document

**What It Produced:**
- 32 individual research files across 6 dimensions
- Key insight: the commercial furniture industry is undergoing rapid consolidation (MillerKnoll merger, Steelcase acquisitions) creating both threat and opportunity for small dealers
- Tariff exposure analysis revealed that 60%+ of product lines have China/Vietnam origin components
- Hybrid work demand shift quantified: 30-40% reduction in traditional workstation purchases, offset by collaboration space investment

**Lessons Learned:**
- 32 files is a lot — the MOC (Map of Content) file is essential for navigating them
- Some dimensions overlap (e.g., tariffs are both Political and Economic) — need to pick one home and cross-reference
- The agent tends to write industry files at a generic level; including BROGAV-specific implications in each file requires explicit instruction

---

### Photo Intelligence Extraction

**Prompt:**
```
Analyze all images from the BROGAV website and social media captures (46 images total, 
stored in /assets/images/). 

For each image, extract:
- People visible (count, estimated roles, name if identifiable)
- Location evidence (signage, landmarks, office features)
- Client/brand evidence (logos on furniture, wall signage in installation photos)
- Timeline evidence (seasonal cues, event banners with dates, technology visible)
- Project type (office, healthcare, education, hospitality)

Use the contact-sheet-image-analysis skill for batch processing.
Produce a summary table of all evidence found, with confidence ratings.
```

**Why This Structure Works:**
- Specifies exactly what to look for in each category — prevents the agent from describing images aesthetically rather than extracting intelligence
- References the batch processing skill (contact sheets) for efficiency
- Requests confidence ratings because photo evidence is inherently interpretive
- "Timeline evidence" is the most novel extraction type — most people don't think to date photos by their content

**What It Produced:**
- Evidence table covering all 46 images
- 3 previously unknown client relationships identified from logos in installation photos
- Team size at various events confirmed (corroborates headcount estimates)
- One image revealed a healthcare project type not mentioned anywhere on the website
- Seasonal/dated event banners provided timeline anchors for team composition changes

**Lessons Learned:**
- Contact sheet approach (6x6 grids) is 33x faster than analyzing images individually
- Logo identification in installation photos is high-value but low-confidence (a logo on furniture might be the manufacturer, not the client)
- The agent needs explicit permission to make inferences ("this appears to be a healthcare facility based on...") vs. only stating certain facts

---

## Category 3: Audit & QA Prompts

### The 3-Agent Forensic Deep Dive

**Launch Prompt (Human to Claude Code):**
```
Deploy 3 parallel verification agents against the BROGAV dossier. Each agent gets a 
section range and must independently verify every factual claim.

Agent 1 — Sections 00-04 (Company Profile, People & Org, Products, Markets):
- Verify all people titles against LinkedIn current state
- Confirm all supplier relationships against manufacturer "Where to Buy" pages
- Check that revenue-per-employee math is correct
- Flag any claim that appears in multiple files with different values

Agent 2 — Sections 05-09 (Financials, Marketing, Legal, Operations):
- Verify all financial figures against their stated sources
- Check that date references are current (not stale)
- Confirm certification expiration dates
- Verify event attendance claims against event attendee lists

Agent 3 — Sections 10-13 (Industry, Competitors, Timeline, Appendices):
- Verify competitor revenue figures against most recent available data
- Check that industry statistics cite year of data
- Confirm timeline entries have source attribution
- Flag any "as of" dates that are now past

All agents: output findings as a numbered issue list with severity 
(MATERIAL / MEDIUM / LOW) and recommended fix.
```

**Why This Structure Works:**
- Parallel execution cuts audit time by 3x
- Section ranges prevent overlap and ensure complete coverage
- Specific verification instructions for each range target the most likely error types per section
- Severity classification forces triage discipline
- "Recommended fix" means findings are immediately actionable

**What It Produced:**
- 56 total issues: 12 material, 28 medium, 16 low
- Material examples: revenue calculation arithmetic error, person listed as current employee who left 6 months ago, WBENC expiration date past without renewal confirmation
- All issues remediated before the architecture restructure

**Lessons Learned:**
- 3 agents is the right number — fewer creates bottlenecks, more creates coordination overhead
- The agents found errors that no single read-through would catch (e.g., same person's start date listed differently in two files)
- "Flag any claim that appears in multiple files with different values" is the single most productive instruction — contradictions are the #1 dossier quality issue

---

### Deep Verify: People & Org Data

**Prompt (internal, Agent 1 sub-task):**
```
For every person named in the dossier, verify:
1. Current title and employer (is it still BROGAV?)
2. Start date at BROGAV (cross-reference LinkedIn tenure with Prospeo/SignalHire)
3. Prior employer listed — confirm it exists and role matches
4. Any "~N years experience" claims — calculate from actual career start dates
5. Education claims — verify institution exists and program is real
6. Contact information — flag anything that looks like personal (non-work) data

If aggregators disagree, document both values and mark confidence as LOW until resolved.
```

**What It Produced:**
- 4 people had stale titles (promoted or departed since initial collection)
- 2 "years of experience" claims were wrong by 2+ years
- 1 person's prior employer was listed with wrong company name (aggregator error)
- Reconciliation notes added to each person's profile

---

### Deep Verify: Financials & Products

**Prompt (internal, Agent 2 sub-task):**
```
For every financial claim in the dossier:
1. Trace to source (D&B, calculated, estimated, or assumed)
2. If calculated: verify arithmetic step by step
3. If estimated: confirm the methodology is stated and reasonable
4. Check for internal consistency (does revenue per employee match total revenue / headcount?)

For every product/supplier claim:
1. Verify supplier is still an active brand (not acquired, discontinued, or renamed)
2. Check if BROGAV appears on the manufacturer's dealer locator
3. Confirm product categories match what the manufacturer actually makes
```

**What It Produced:**
- One arithmetic error: $2.06M figure was calculated incorrectly (actual math yields $2.14M)
- Two suppliers had been acquired and rebranded since initial research
- Only 2 of 40 claimed supplier relationships confirmed via manufacturer "Where to Buy" pages (most manufacturers don't publish dealer lists)

---

## Category 4: Architecture Design Prompts

### Folder Architecture Design

**Prompt:**
```
Design a new folder architecture for this dossier optimized for three use cases:
1. M&A due diligence (acquirer can find any answer in <30 seconds)
2. LLM retrieval (RAG system can identify the right file from a user question)
3. Human research (analyst can browse and discover without prior knowledge)

Constraints:
- Maximum 12 top-level sections (current 13 is fine, reduce if sections are thin)
- Every entity (person, company, supplier) gets its own file
- Every section gets a _MOC.md (Map of Content) for navigation
- All files get YAML frontmatter (title, section, entity_type, confidence, last_verified, sources)
- Create a ROUTER.md at root with 100+ question→file path mappings
- Naming convention: snake_case, no spaces, descriptive names

Consider these architectural references:
- M&A data room structure (legal, financial, operational, HR compartments)
- Obsidian vault MOC methodology (hierarchical navigation via linked index files)
- YAML frontmatter for programmatic access (Zettlr, Logseq, RAG pipelines)

Output: 
1. Complete folder tree (every file listed)
2. Migration plan (old path → new path for every existing file)
3. List of new files to create (MOCs, router, meta files)
```

**Why This Structure Works:**
- Three use cases force the architecture to serve multiple masters (not optimized for only one)
- Explicit constraints prevent over-engineering (max 12 sections) and under-engineering (entity splitting required)
- Architectural references ground the design in proven patterns rather than inventing from scratch
- Requesting a migration plan ensures nothing is lost in the transition
- The output specification (folder tree + migration plan + new files list) is a complete implementation spec

**What It Produced:**
- 12-section architecture with 4 infrastructure folders
- Migration plan mapping all existing files to new locations
- 12 MOC files, 1 ROUTER.md (110 entries), YAML frontmatter spec
- Entity splitting plan: 17 suppliers, 8 competitors, 15 people

**Lessons Learned:**
- The "3 use cases" framing was the key insight — it prevents the common trap of designing for how YOU think about the data rather than how others will need to access it
- M&A data room conventions are surprisingly well-suited to intelligence dossiers (both need fast lookup under time pressure)
- YAML frontmatter adds ~5 lines per file but enables programmatic quality checks (e.g., "show me all files with confidence: low")

---

### ROUTER.md + Meta Files

**Prompt:**
```
Create ROUTER.md at the dossier root. Format:

| Question | File Path | Section |
|---|---|---|

Include 100+ entries covering:
- Every fact someone might ask about (revenue, headcount, address, certifications)
- Every person by name ("Who is [name]?" → their profile)
- Every competitor by name
- Every supplier by name
- Process questions ("How does BROGAV win business?" → target_markets.md)
- Comparison questions ("How does BROGAV compare to [competitor]?" → competitor profile)

Also create _meta.yaml in each section folder with:
- section_name, section_number, file_count, last_updated, description

These meta files enable automated tooling to understand the dossier structure 
without reading every file.
```

**What It Produced:**
- ROUTER.md with 110 question→path mappings
- 12 _meta.yaml files (one per section)
- The router handles both factual queries and analytical queries

**Lessons Learned:**
- 110 routes covers ~90% of likely questions; diminishing returns after that
- The router is most valuable for LLM retrieval — it acts as a retrieval index without embedding computation
- Writing good questions requires imagining different user types (investor, competitor, employee, journalist)

---

### Entity Splitting: Suppliers

**Prompt:**
```
Split the supplier_line_card.csv and branded_cabinet_line.md into individual entity files.

For each confirmed supplier, create:
/03_Products_and_Suppliers/suppliers/[brand_name_snake_case].md

Template:
---
title: [Brand Name]
entity_type: supplier
relationship_status: [confirmed|claimed|historical]
confidence: [high|medium|low]
last_verified: 2026-06-14
verification_method: [website_dealer_locator|wayback_pdf|logo_wall|linkedin_mention]
---

# [Brand Name]

## Relationship Summary
- Status: [Active dealer | Historical reference | Unconfirmed]
- Product categories: [list]
- How verified: [method and date]

## Evidence
- [List every source that mentions this relationship]

## Products Relevant to BROGAV
- [What they likely purchase/resell from this supplier]
```

**Why This Structure Works:**
- One file per supplier enables targeted retrieval and independent updates
- `relationship_status` with three tiers prevents false precision (not everything is "confirmed")
- `verification_method` documents HOW we know, not just WHAT we know
- Evidence section creates an audit trail
- Template ensures consistency across 17 files

**What It Produced:**
- 17 individual supplier profile files
- Only 2 rated "confirmed" (appeared on manufacturer dealer locator)
- 8 rated "claimed" (appeared on BROGAV materials but not independently verified)
- 7 rated "historical" (appeared in archived PDFs but not current site)

**Lessons Learned:**
- The gap between "claimed" and "confirmed" is the most important finding — most supplier relationships are unverifiable from public sources
- Manufacturer dealer locators are the gold standard but only ~30% of manufacturers publish them
- Historical relationships (from Wayback PDFs) are still valuable intelligence — they show which partnerships have ended

---

### People Entity Splitting

**Prompt:**
```
Create individual profile files for every person identified in the dossier.

Path: /02_People_and_Organization/profiles/[firstname_lastname].md

Template:
---
title: [Full Name]
entity_type: person
current_role: [Title at BROGAV or "Former"]
confidence: [high|medium|low]
last_verified: 2026-06-14
sources: [list all sources used]
---

# [Full Name]

## Current Role
- Title: 
- Department:
- Reports to:
- Start date at BROGAV:

## Background
- Prior roles (reverse chronological):
- Education:
- Certifications:

## Intelligence Notes
- [Any notable findings, contradictions between sources, or gaps]

## Source Reconciliation
| Data Point | Source A (LinkedIn) | Source B (Prospeo) | Source C (SignalHire) | Resolved Value |
|---|---|---|---|---|

Where sources disagree, show all values and explain which was chosen and why.
```

**Why This Structure Works:**
- Source Reconciliation table is the key innovation — it makes disagreements visible rather than silently choosing one
- "Intelligence Notes" section captures the analyst's judgment (the non-algorithmic part)
- `current_role` in frontmatter enables quick filtering for active vs. former employees
- Template enforces that every profile has the same structure (critical for comparison)

**What It Produced:**
- 15 individual people profiles
- 6 profiles had source reconciliation tables with genuine disagreements
- 3 people confirmed as former employees (aggregators still listed them as current)
- Intelligence notes captured relationship mapping (who hired whom, who works together on projects)

**Lessons Learned:**
- The reconciliation table is the most valuable part of person profiles — it documents uncertainty rather than hiding it
- LinkedIn is the most reliable for current title; aggregators lag by 3-6 months
- Start dates are the hardest to verify — LinkedIn shows month/year but aggregators often only show year

---

## Meta-Lessons on Prompt Engineering for Research

1. **Enumerate sources explicitly.** Agents won't check Wayback, USASpending, or manufacturer dealer locators unless told to. The more specific the source list, the more thorough the research.

2. **Specify output structure in the prompt.** "Output as a table" produces better results than "summarize findings." Structure prevents rambling.

3. **Include the WHY alongside the WHAT.** "Verify supplier relationships" is weaker than "Verify supplier relationships because claimed partnerships drive competitive positioning analysis." The why helps the agent prioritize when time-constrained.

4. **Parallel decomposition works.** Splitting a 56-issue audit into 3 parallel agents with clear boundaries is faster and produces fewer gaps than one sequential pass.

5. **Templates prevent drift.** When creating 15+ files of the same type, a template in the prompt ensures consistency. Without it, file 1 and file 15 will look nothing alike.

6. **Name the skill.** Saying "Run the open-source-traffic-analysis skill" is more effective than describing the methodology. The agent loads the full skill context and applies it correctly.

7. **Ask for confidence ratings.** Every prompt that requests findings should also request confidence levels. This single addition transforms output from "a list of facts" to "a prioritized intelligence product."
