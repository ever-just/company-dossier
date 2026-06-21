<div align="center">

# Company Dossier

**Open a complete, sourced file on any company — from the public record.**

[![Website](https://img.shields.io/badge/site-companydossier.lol-15130f?style=for-the-badge)](https://companydossier.lol)
[![npm](https://img.shields.io/npm/v/company-dossier?style=for-the-badge&color=cb3837&logo=npm)](https://www.npmjs.com/package/company-dossier)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

*Company Dossier compiles a complete, sourced intelligence profile of any business —*
*people, hiring, money, locations, tech, news, relationships and risk — into one file.*
*Public sources only. Free.*

[Website & widget](https://companydossier.lol) ·
[npm package](https://www.npmjs.com/package/company-dossier) ·
[VS Code extension](https://github.com/ever-just/company-dossier-vscode) ·
[Methodology](methodology/OVERVIEW.md)

</div>

---

## The nine sections of a dossier

Overview & identity · People & org chart · Hiring radar · Money trail · Locations ·
Tech fingerprint · News & timeline · Relationship web · Risk flags — every claim
source-attributed.

## Four ways to use it

| | Use it | Best for |
|:--|:--|:--|
| 🌐 **Website widget** | [companydossier.lol/generate](https://companydossier.lol/generate/) — paste your Claude key, generate in-browser, download or push to a GitHub repo | Anyone, no install |
| 📦 **npm (CLI + library + MCP)** | `npx company-dossier <company-or-domain>` | Scripts, CI, AI agents |
| 🧩 **VS Code extension** | [Marketplace / repo](https://github.com/ever-just/company-dossier-vscode) — `@dossier /research` | Working in your editor |
| 📚 **Methodology** | [`methodology/`](methodology/OVERVIEW.md) — the full reproducible playbook | Analysts & teams |

### npm quick start

```bash
npx company-dossier acme.com          # writes a "<Company> DOSSIER/" folder + dossier.json
npm i -g company-dossier              # or install globally
```

```js
import { buildDossier } from 'company-dossier';
const { json, files } = await buildDossier('acme.com');
```

An MCP server ships in the box (`company-dossier-mcp` / `company-dossier-mcp-http`, tool `build_dossier`)
so ChatGPT, Claude, and other agents can generate dossiers too.

## Repository structure

```
methodology/     The reproducible playbook (pipeline, architecture, tools, skills, case study)
site/            Source for companydossier.lol (zero-dependency static generator → docs/)
packages/
  company-dossier/   the npm package: CLI + library + MCP server
integrations/    Claude Agent Skill + ChatGPT GPT / Apps-SDK (MCP) config
```

## What makes it different

Most OSINT tools dump raw data. Company Dossier produces a **structured, source-attributed,
confidence-tagged** intelligence *file* — readable in minutes, built only from public sources.

See [`methodology/OVERVIEW.md`](methodology/OVERVIEW.md) for the full breakdown, validated results
(613 structured files on a real company), and the 7-phase pipeline.

## License

[MIT](LICENSE) · Built by [EVERJUST](https://everjust.org). Public information only —
a dossier is a starting map; always verify before you act.
