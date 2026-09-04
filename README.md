# Company Dossier

Build a complete, sourced intelligence dossier on any company from public records — for humans and agents.

**Status:** Production · npm `company-dossier` v0.3.4 · public · MIT

[![npm](https://img.shields.io/npm/v/company-dossier?style=flat&color=1D1D1F&label=npm)](https://www.npmjs.com/package/company-dossier)
[![license](https://img.shields.io/badge/license-MIT-1D1D1F?style=flat)](LICENSE)

[Live site](https://companydossier.lol) ·
[In-browser generator](https://companydossier.lol/generate/) ·
[Hosted MCP server](https://companydossier.lol/mcp/) ·
[VS Code extension](https://github.com/ever-just/company-dossier-vscode) ·
[Methodology](methodology/OVERVIEW.md)

|  |  |
|---|---|
| **What it is** | A company-research engine that compiles a nine-section, source-attributed dossier |
| **Who it's for** | Analysts, founders, sales and diligence teams — and the AI agents working for them |
| **Live at** | [companydossier.lol](https://companydossier.lol) · [hosted MCP server](https://companydossier.lol/mcp/) |
| **Stack** | Node 18+ · TypeScript · zero-dependency static site · GitHub Pages + AWS CloudFront |
| **Status** | Production · npm v0.3.4 · six public-source collectors · no API key required |

## The problem it solves

Researching a company properly costs a day and forty open tabs: the website, the archived
version of the website, the job board, the funding announcements, the DNS records, the news.
Almost all of it is public. None of it is assembled. The tools that do assemble it hand back
a raw data dump, put it behind a seat licence, or print a number with no source beside it.

Company Dossier assembles it instead. Give it a company name or a domain and it returns a
readable file organised into nine fixed sections, where every derived claim carries the source
it came from and every section without public data is marked as a gap rather than filled with
a guess. Public sources only. No account, no API key, free.

## What it does

- **Nine sections, always the same nine** — overview and identity, people, hiring, money,
  locations, tech fingerprint, news and timeline, relationship web, risk flags.
- **Collects from six public sources** — live website crawl, the Internet Archive's Wayback
  CDX API, DNS and email records, RDAP domain registration, web-technology fingerprinting,
  and public search and social discovery.
- **Attributes every claim** — each section records which source produced it, and the run
  metadata records which sources answered, degraded, or failed.
- **Runs four ways** — in the browser, from the terminal, as an MCP tool for an AI agent, or
  inside VS Code.
- **Emits machine-readable output** — `dossier.json` alongside the markdown, so a script or
  an agent reads the same dossier a person does.
- **Publishes a dossier as a site** — `--format site` scaffolds a themed static site and
  `--deploy gh-pages` publishes it, `noindex` by default.

## Quickstart

```bash
npx company-dossier acme.com                    # writes "Acme DOSSIER/" + dossier.json
npx company-dossier "Acme Corporation"          # research by name, no domain needed
npx company-dossier acme.com --sections overview,tech,risk --json > acme.json
```

As a library, or as an MCP server for an agent:

```js
import { buildDossier } from 'company-dossier';
const { json, files } = await buildDossier('acme.com');
```

```bash
company-dossier-mcp          # stdio MCP server, tool: build_dossier({ target, sections? })
company-dossier-mcp-http     # same tool over MCP Streamable HTTP on :8787
```

## How it works

One orchestrator in `packages/company-dossier/src/core.ts` fans out to the collectors in
parallel where that is safe, normalises what comes back into a single `DossierData` object,
then renders one markdown file per requested section plus a `README.md` index and
`dossier.json`. Collectors are independent and failure-tolerant: a source that times out is
recorded as `failed` in the run metadata and the dossier is still produced without it.

### Repository layout

```
packages/company-dossier/   The npm package — CLI, library, MCP (stdio + HTTP), web server
  src/collectors/           dns · rdap · website · wayback · techstack · search
  src/core.ts               Pipeline orchestrator and the nine-section renderer
site/                       Zero-dependency static generator for companydossier.lol
methodology/                The reproducible playbook: pipeline, architecture, tools, case study
integrations/               Claude Agent Skill + ChatGPT GPT / Apps-SDK (MCP) configuration
knowledge/                  Open Knowledge Format base, written for agent consumption
infrastructure/             S3 + CloudFront + ACM router for per-dossier subdomains
reports/                    Dated audit artifacts — security, mobile/accessibility, copy
growth/                     Discoverability and off-site distribution playbooks
```

## Configuration

Nothing is required to build a dossier. These apply only to the hosted surfaces.

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `COMPANY_DOSSIER_MCP_TOKEN` | No | unset | Bearer token for the HTTP MCP server; unset means no auth |
| `COMPANY_DOSSIER_MCP_ALLOWED_ORIGINS` | No | unset | CORS allow-list for the HTTP MCP server |
| `PORT` / `HOST` | No | `8787` / `0.0.0.0` | Listen address for the HTTP MCP and web servers |
| `COMPANY_DOSSIER_WEB_RATE` | No | see `src/web.ts` | Rate limit for the hosted web generator |
| `COMPANY_DOSSIER_S3_BUCKET` / `AWS_REGION` | No | `companydossier-dossier-sites` / `us-east-1` | Target for `infrastructure/deploy-dossier.mjs` |

## Development

```bash
cd packages/company-dossier && npm install && npm run build   # tsup → dist/
node site/build.mjs                                            # builds the site into docs/
```

The site deploys to GitHub Pages on any push touching `site/`
([`.github/workflows/pages.yml`](.github/workflows/pages.yml)); the built `docs/` output is
generated, not committed. Per-dossier subdomains are `noindex` by policy — see
[`infrastructure/README.md`](infrastructure/README.md) for why. Contributor conventions and a
deeper repo map are in [`AGENTS.md`](AGENTS.md).

## License

[MIT](LICENSE) · by EVERJUST. Built from public information only — a dossier is a starting
map, not a verdict. Verify before you act on it.
