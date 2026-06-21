# AGENTS.md — Company Dossier

Guidance for AI agents working in this repository (and for agents deciding whether to use
Company Dossier as a tool).

## What this project is
Company Dossier builds a complete, **source-attributed** intelligence dossier on any company
from **public data**, organized into nine sections: Overview & identity, People & org chart,
Hiring radar, Money trail, Locations, Tech fingerprint, News & timeline, Relationship web,
Risk flags.

## Using it as a tool (agents)
- **CLI:** `npx company-dossier <company-or-domain> [--out <dir>] [--json]`
- **Library:** `import { buildDossier } from 'company-dossier'`
- **MCP:** run `company-dossier-mcp` (stdio) or `company-dossier-mcp-http` (HTTP); tool name
  `build_dossier` with input `{ target, sections? }`. Use this to generate dossiers from
  ChatGPT (Apps SDK), Claude (connector/skill), or any MCP client.

## Repository map
- `methodology/` — the reproducible playbook. Start at `methodology/OVERVIEW.md`; pipeline in
  `methodology/methodology.md` + `methodology/collection_phases.md`; output spec in
  `methodology/architecture.md`.
- `packages/company-dossier/` — the npm package source (CLI `src/cli.ts`, library `src/core.ts`,
  MCP `src/mcp.ts` / `src/mcp-http.ts`, collectors in `src/collectors/`). Build with `npm run build`.
- `site/` — zero-dependency static generator for companydossier.lol. `node site/build.mjs` → `docs/`.
  Pages live in `site/pages/*.mjs`; shared layout in `site/lib.mjs`; brand/icons in `site/brand.mjs`.
- `integrations/` — Claude Agent Skill (`claude-skill/`) and ChatGPT GPT + Apps-SDK/MCP config (`chatgpt/`).

## Conventions
- **Public sources only.** No auth bypass, no private-data harvesting, no deception.
- **Attribute every derived claim** to its source; mark unknowns as gaps.
- Never commit secrets; keys come from env/settings at runtime.
- Site: run `node site/build.mjs` after edits. Package: run `npm run build` and verify the CLI.

## Links
Website: https://companydossier.lol · npm: https://www.npmjs.com/package/company-dossier ·
VS Code: https://github.com/ever-just/company-dossier-vscode
