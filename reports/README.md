# Reports

Point-in-time audit artifacts for Company Dossier. Each report records the tools
run, what was found, and what (if anything) was fixed. They are dated snapshots,
not living docs — re-run the relevant checks before relying on a finding.

| Report | What it covers |
|:--|:--|
| [`SECURITY-AUDIT.md`](SECURITY-AUDIT.md) | Security posture of the static site, the in-browser generator widget, the npm package (CLI / library / MCP server), and integrations. OWASP Top 10 mapping, `npm audit`, secret scans, header/TLS review. |
| [`MOBILE-AUDIT.md`](MOBILE-AUDIT.md) | Mobile / responsive / accessibility audit of the built site. Playwright across 320–768px and axe-core (WCAG 2.1 A/AA), with the CSS fixes applied. |
| [`COPY-AUDIT.md`](COPY-AUDIT.md) | Advisory copy review of the live site — before/after suggestions for headlines, ledes, meta descriptions, and CTAs. |
