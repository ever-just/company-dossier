---
name: company-dossier
description: Use this when the user wants to research a company, build a company profile or dossier, run a due-diligence brief, vet a vendor, prep for a sales call, evaluate an employer, or otherwise compile a sourced intelligence report on an organization from PUBLIC data. Triggers on "research [company]", "build a dossier/profile on", "due diligence on", "who is [company]", "company background check", "competitive intel", "vet this vendor/supplier", "look up this domain", or any request to assemble what is publicly known about a named company or domain into a structured, cited brief.
---

# Company Dossier

Build a complete, sourced intelligence dossier on any company from PUBLIC data. Output is a nine-section brief where **every claim is attributed to a source and tagged with a confidence level**. Public sources only.

## What you produce

A single dossier covering these nine sections, in this order:

1. **Overview & identity** — what the company is, legal/registration facts, age, size.
2. **People & org chart** — leadership, key staff, structure.
3. **Hiring radar** — open roles and what they signal.
4. **Money trail** — funding, revenue signals, financial filings.
5. **Locations** — HQ, offices, facilities.
6. **Tech fingerprint** — stack, tools, infrastructure.
7. **News & timeline** — chronology of notable events.
8. **Relationship web** — customers, partners, investors, competitors.
9. **Risk flags** — legal, financial, reputational, operational concerns.

Section-by-section guidance is in `reference/sections.md`. Read it before assembling the dossier.

## Decision: which path to take

First determine whether the `company-dossier` tooling is available, then pick a path.

- **Path A (preferred): use the tool.** Available if EITHER is true:
  - The `company-dossier` MCP connector is connected (a `build_dossier` tool is present), OR
  - You can run shell commands and `npx company-dossier <target>` (or a globally installed `company-dossier`) works.
- **Path B (fallback): gather signals manually** with whatever web tools you have (web search, web fetch, browsing). Assemble the same nine sections by hand.

If unsure, briefly check for the tool first (see Path A); fall back to Path B without blocking on it.

## Inputs you need

You need a **target**: a company name or a domain (e.g. `Acme Robotics` or `acme.com`).

- If the user gave neither, ask: "What company or domain should I build the dossier on?" Do not guess.
- If the name is ambiguous (common name, multiple companies), ask which one, or state the disambiguation assumption you made (e.g. "Assuming Acme Inc. of Austin, TX — the SaaS company, not the Acme hardware brand").
- A domain is the strongest input — it disambiguates and anchors the tech fingerprint. Prefer it when offered.

---

## Path A — Tool is available

### A1. MCP connector

Call the `build_dossier` tool with the target.

- Input: the company name or domain. Pass any user-specified options through (depth, sections to emphasize) if the tool exposes them.
- The tool returns a structured, sourced dossier. Present it to the user largely as-is, organized under the nine section headings.
- Do NOT strip the citations. The value of this tool is that claims are sourced — keep source URLs/handles and confidence tags attached.
- If the tool returns partial results (some sections empty), say so explicitly rather than filling gaps from memory. You may offer to supplement thin sections via Path B.

### A2. CLI

If there is no MCP connector but you can run commands:

```
npx company-dossier <company-or-domain>
```

- Use the exact target string the user gave (quote it if it has spaces): `npx company-dossier "Acme Robotics"`.
- The CLI prints a sourced dossier (and may write a file). Read its output and present it under the nine headings.
- If `npx` prompts to install the package, that is expected on first run; allow it. If the environment blocks network or package install, fall back to Path B.

### A3. After the tool runs

- Verify the output actually covers the nine sections. If a section is missing entirely, note it.
- Keep the tool's sourcing intact. If you add anything from your own knowledge, mark it clearly as unsourced and lower-confidence — never blend it silently into the cited output.

---

## Path B — Manual signal gathering

Use your available web tools (search, fetch, browse). Work section by section. The goal is the same nine-section sourced dossier.

### B1. Anchor on the target

- Resolve the official domain and the legal/operating name. The homepage, the "About" page, and the footer are your anchors.
- Note the disambiguation you settled on.

### B2. Gather per section

For each of the nine sections, run targeted public-source lookups. Suggested public sources (use what is accessible; do not log in, scrape behind paywalls, or bypass access controls):

- **Overview & identity** — company website (About/Company pages), business registries, Wikipedia, Crunchbase/PitchBook public pages, LinkedIn company page.
- **People & org chart** — LinkedIn (public profiles), company "Team"/"Leadership" page, press releases, conference speaker bios.
- **Hiring radar** — the company careers page, public job boards (LinkedIn Jobs, Indeed, Greenhouse/Lever public boards).
- **Money trail** — Crunchbase, press releases, SEC EDGAR (for US public filers), Companies House (UK), other public filing systems, funding-announcement news.
- **Locations** — website contact/office pages, Google Maps/Places public listings, registry filings.
- **Tech fingerprint** — the public site (visible frameworks, analytics, tag managers), job postings (named tools/stacks), public engineering blog, GitHub org, DNS/MX records (public), BuiltWith/Wappalyzer-style public signals.
- **News & timeline** — news search, the company's press/blog, trade publications.
- **Relationship web** — customer logos and case studies on the site, partner directories, investor announcements, "competitors" sections on aggregators.
- **Risk flags** — news search for litigation/layoffs/breaches/recalls, court-record aggregators (public), regulator actions, review sites (Glassdoor/Trustpilot) read critically.

### B3. Attribute and tag everything

This is non-negotiable. For **every** claim:

- **Attribute** it to a source: a URL, a publication + date, or a named public record. If you cannot attribute it, either drop it or label it explicitly as "uncited / general knowledge — verify."
- **Tag confidence:**
  - **High** — stated directly by a primary source (the company's own filing, official site, or a regulator).
  - **Medium** — reputable secondary source, or corroborated across two or more sources.
  - **Low** — single weak source, inference, dated information, or aggregator data that may be stale.
- Prefer primary sources. When sources conflict, show both and say which you trust and why.
- Date-stamp time-sensitive facts (funding, headcount, leadership) — public data goes stale.

### B4. Handle gaps honestly

- If a section has no findable public data, say "No public information found for this section" rather than inventing or padding it.
- Distinguish "could not find" from "does not exist."

---

## Output format

Present the dossier with the nine sections as headers, in order. Under each, list claims with their source and confidence inline, e.g.:

> **Money trail**
> - Raised a $12M Series A led by Foo Ventures, Mar 2024. *(Source: TechCrunch, 2024-03-11 — High)*
> - Estimated 50–100 employees. *(Source: LinkedIn company page, accessed today — Medium)*

End with a short **Sources** list (deduplicated) and a one-line note on data freshness and method (tool vs. manual).

Lead with the headline takeaway, then the detail. Keep it scannable.

---

## Legal & ethical boundaries

- **Public data only.** Use information that is publicly accessible. Do not log into private systems, bypass paywalls, defeat access controls, or scrape in violation of a site's terms.
- **No private/personal data harvesting.** Stick to professional, business-relevant facts about the company and its public-facing people (leadership in their professional capacity). Do not compile home addresses, personal contact details, family information, or other private personal data.
- **No deception.** Do not impersonate, pretext, or socially engineer to obtain information.
- **Source, don't assert.** The point of a dossier is verifiable intelligence. Unsourced claims undermine it.
- If a user asks for something that crosses these lines (surveillance of an individual, non-public records, circumventing protections), decline that part and explain why, then offer the compliant public-data version.
