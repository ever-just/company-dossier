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

## Remote MCP server

In addition to the stdio server, `company-dossier` ships a **remote (HTTP) MCP
server** over the MCP Streamable HTTP transport, exposing the same single tool,
`build_dossier`. This is what you deploy so hosted assistants (ChatGPT Apps SDK,
Claude connectors) can reach it over the network.

Run it locally:

```bash
npx company-dossier-mcp-http
# listening on http://0.0.0.0:8787  (override with PORT=...)
```

Endpoints: `POST/GET/DELETE /mcp` for the MCP session and `GET /health`
(returns `{"status":"ok"}`). It listens on `process.env.PORT || 8787`.

### Hosted endpoint

Deploy it (see [`deploy/README.md`](deploy/README.md) for one-command steps to
Render, Fly.io, or any Docker host) and point a subdomain at it. The hosted MCP
endpoint is then:

```
https://mcp.companydossier.lol/mcp
```

**Claude connectors / Claude Desktop (custom connector):** add a remote MCP
server with URL `https://mcp.companydossier.lol/mcp`. The `build_dossier` tool
becomes available.

**ChatGPT (Apps SDK / connectors):** add an MCP server pointing at
`https://mcp.companydossier.lol/mcp`; ChatGPT discovers and calls the
`build_dossier` tool.

Tool input (same as the stdio server):

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
