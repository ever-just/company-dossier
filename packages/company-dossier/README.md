# company-dossier

**Build a complete, sourced intelligence dossier on any company from public data — CLI, library and MCP server.**

`company-dossier` compiles a structured, nine-section dossier on any company or
domain using only PUBLIC sources: a live website crawl, DNS reconnaissance, the
Internet Archive's Wayback Machine, a web-technology fingerprint, USASpending.gov
federal contracts, and social-profile discovery. Every derived claim is annotated
with its source, and sections without public data are clearly marked as gaps.

No API keys. No private databases. No login. Free.

🔗 https://companydossier.lol

## Install

```bash
npm install -g company-dossier
# or run without installing:
npx company-dossier acme.com
```

## Quickstart (CLI)

```bash
npx company-dossier acme.com
```

This writes an `Acme DOSSIER/` folder containing one markdown file per section
plus a machine-readable `dossier.json`.

```bash
# choose an output directory, stay quiet
company-dossier acme.com --out ./research --quiet

# research by name (no domain)
company-dossier "Acme Corporation"

# print JSON to stdout (good for piping)
company-dossier acme.com --json > acme.json

# only build specific sections
company-dossier acme.com --sections overview,tech,risk
```

Run `company-dossier --help` for all options.

## The nine sections

1. **Overview & identity** — name, description, schema.org, keywords
2. **People & org chart** — contact emails, individual-pattern emails (gaps marked)
3. **Hiring radar** — careers pages and job URLs from the site/sitemap
4. **Money trail** — USASpending.gov federal contracts and obligations
5. **Locations** — structured addresses and phone numbers
6. **Tech fingerprint** — CMS, analytics, pixels, CDN, frameworks, email/DNS
7. **News & timeline** — Wayback history, growth, deleted pages, archived PDFs
8. **Relationship web** — social and external profiles
9. **Risk flags** — automated low-confidence technical signals (SPF/DMARC, churn)

## Library usage

```ts
import { buildDossier, writeDossier } from 'company-dossier';

const result = await buildDossier('acme.com', {
  sections: ['overview', 'tech', 'risk'], // optional subset
});

// result.meta  — target, company name, sources & status
// result.json  — full structured data ({ meta, data })
// result.files — [{ path, content }] markdown + dossier.json

const folder = writeDossier(result, './research');
console.log('Written to', folder);
```

Individual collectors are also exported: `collectWebsite`, `collectDns`,
`collectWayback`, `extractTechStack`, `collectSearch`.

## MCP server

`company-dossier` ships an [MCP](https://modelcontextprotocol.io) server over
stdio exposing a single tool, `build_dossier`, that returns the markdown and JSON.

```json
{
  "mcpServers": {
    "company-dossier": {
      "command": "npx",
      "args": ["-y", "company-dossier-mcp"]
    }
  }
}
```

Tool input:

```json
{ "target": "acme.com", "sections": ["overview", "tech", "risk"] }
```

## Output

- A `<Company> DOSSIER/` folder with `README.md`, nine numbered markdown
  sections, and `dossier.json`.
- With `--json`, the structured dossier is printed to stdout instead.

## Public sources only

This tool reads only publicly accessible data and clearly labels every claim
with its source. It does not perform authentication, scraping behind logins, or
access to paid databases. Network-blocked or empty sources are reported as gaps,
never fabricated. Risk flags are automated signals, not legal or financial advice.

## License

MIT © EVERJUST
