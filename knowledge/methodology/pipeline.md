---
type: Process
title: The research pipeline
description: The public-source pipeline that turns a company name into a complete, source-attributed dossier.
resource: https://companydossier.lol/how-it-works/
tags: [pipeline, osint, sourcing]
timestamp: 2026-06-21T00:00:00Z
---

# The research pipeline

1. **Plan** — enumerate public sources and the questions to answer.
2. **Gather** — pull signals from job boards, public filings, news/press, the open web, maps & places, reviews, and the company site.
3. **Assemble & de-dupe** — cross-reference and sort signals into the [nine sections](../concepts/nine-sections.md).
4. **Source** — attribute every derived claim; tag confidence; mark unknowns as gaps.
5. **Read or export** — skim in minutes; export markdown + `dossier.json`, or push to a repo.

Public sources only — no authentication bypass, no private-data harvesting. The full
methodology is documented at https://github.com/ever-just/company-dossier (see `methodology/`).
