# Lessons Learned

What worked, what didn't, and what we'd do differently next time. Based on building the BROGAV Solutions dossier (June 2026).

---

## What Worked Well

### 1. Wayback Machine CDX API is a goldmine
- Recovered 33 deleted pages, 12 PDFs, and 25 homepage versions
- Rate limit at 1.5s between requests was sufficient
- The CDX `output=json` format is easy to parse
- Insight: companies delete pages but rarely request Wayback removal

### 2. SMTP verification is definitive
- AfterShip email-verifier (Go tool) gives binary yes/no when there's no catch-all
- Confirmed 11 of 17 mailboxes; identified 6 as non-existent
- Key: Microsoft 365 domains without catch-all give authoritative RCPT TO results
- Resolved one departure question (Cameron Henderson — email rejected but LinkedIn confirmed active)

### 3. Entity-centric architecture (post-restructure)
- One file per supplier/competitor/person eliminates fragmentation
- An agent reading "everything about Eaton" needs 1 file, not 5
- ROUTER.md (question→file) reduced navigation from 3-5 reads to 2

### 4. Parallel agent deployment for research
- Launching 3 exploration agents simultaneously (sections 00-04, 05-09, 10-13) covered 179 files in one pass
- Each agent independently found contradictions the others missed
- Total time: ~3 minutes for complete dossier content analysis

### 5. Confidence tagging prevents false authority
- 6-tier scale (Definitive → Unverified) makes it clear what's solid and what's inference
- D&B revenue ($4.51M) labeled "Moderate" because it's modeled, not audited — this prevented overstating certainty
- "UNVERIFIED" tag on Helin Ozdil prevented including a ghost employee in headcount

### 6. The children's book discovery
- Found via Wix CDN image filename during routine crawl
- Confirmed company name origin (BROGAV = BROdy + GAVin) — resolved a weeks-old ambiguity
- Lesson: always examine CDN URLs and image filenames; they contain metadata the site doesn't show

---

## What Didn't Work

### 1. Incremental collection without a data model
- Built dossier across multiple sessions without pre-defining the schema
- Result: same facts stated differently in 5+ files, dates formatted inconsistently
- Fix: define the output structure FIRST, then fill it. Don't restructure after the fact.

### 2. Mega-files grow invisibly
- `supplier_deep_dive.md` grew to 537 lines across sessions; nobody noticed until audit
- `complete_product_catalog.md` hit 1,099 lines — far too long for any agent to parse efficiently
- Fix: enforce a hard 300-line limit from day 1. Split on creation, not later.

### 3. CSVs duplicated without awareness
- `metrics.csv` existed in 2 locations with different values
- `events.csv` existed in 3 locations (06/, 08/, and events/ subfolder)
- Fix: single `_data/` folder from the start. Never allow CSVs outside it.

### 4. Photos with no semantic index
- 378 photos accumulated across 8 folders with no captions or entity links
- An agent or human asking "show me warehouse photos" had no way to find them
- Fix: create `_INDEX.md` for every photo folder at the time of download, not after

### 5. LinkedIn data without login is severely limited
- Can't see full employee list, tenure, or connections
- Aggregators (SignalHire, RocketReach) often contradict each other on titles
- Can't resolve "is this person still employed?" definitively
- Fix: accept this as a hard limitation. Document it as a gap. Don't speculate.

### 6. "~14 years" experience claims age
- Written in early 2024, still stated in June 2026 — now 2 years stale
- Same issue with follower counts, headcount, and certification dates
- Fix: never use relative time ("~14 years"). Always use absolute ("since January 2010")

### 7. Revenue estimation without hard data is theatrical
- Triangulated from headcount, industry benchmarks, aggregator bands, and D&B modeling
- Result: a range from $2M to $12M (useless) narrowed to $4.5-6M (still uncertain)
- The single D&B figure ($4.51M) dominates; all other sources add noise, not signal
- Fix: state the one authoritative figure. Note the range. Don't pretend triangulation adds precision.

---

## What We'd Do Differently

### Before starting:
1. **Define the output schema first** — know what 12 sections you want before collecting data
2. **Set file size limits** — max 300 lines per file, enforced from day 1
3. **Create _data/ folder first** — all CSVs go here from the start
4. **Create ROUTER.md skeleton** — list the 60 questions you want answered before researching

### During collection:
5. **One entity = one file from the start** — create `suppliers/eaton.md` the first time you mention Eaton
6. **YAML frontmatter on creation** — not as a post-hoc cleanup
7. **Download photos with captions** — write the `_INDEX.md` entry at download time
8. **Use absolute dates everywhere** — "since Jan 2010" not "14+ years"
9. **Use git mv, not cp** — preserve file history during restructuring

### During analysis:
10. **Show your math** — never state "$2.06M" without the calculation visible
11. **Cross-reference on write** — when adding a claim to file A, check if it exists in file B
12. **Flag aging data explicitly** — LinkedIn followers, headcount, and cert dates are volatile

### After completion:
13. **Run the 3-agent forensic audit** — it caught 56 issues in one pass
14. **Validate ROUTER.md paths** — every path must resolve to a real file
15. **Grep for stale dates** — search for any certification/revenue date and verify currency
