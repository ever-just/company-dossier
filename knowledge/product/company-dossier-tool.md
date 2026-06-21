---
type: Software
title: Company Dossier
description: Free tool that builds a sourced, nine-section intelligence dossier on any company from public data. Runs as a web widget, npm CLI/library, VS Code extension, ChatGPT app, Claude app/skill, and MCP server.
resource: https://companydossier.lol
tags: [software, free, osint, company-research, mcp, cli, vscode]
timestamp: 2026-06-21T00:00:00Z
---

# Company Dossier

Free, public-sources-only tool that compiles the [nine-section dossier](../concepts/nine-sections.md).

## Ways to run it
- **Web widget** — https://companydossier.lol/generate/ (bring your own Claude key; runs in-browser).
- **Send to your AI** — https://companydossier.lol/use-in-ai/ (one click into ChatGPT/Claude/Perplexity/Gemini/Grok).
- **npm** — package `company-dossier`: `npx company-dossier <company-or-domain>`; library `import { buildDossier } from 'company-dossier'`.
- **VS Code extension** — https://github.com/ever-just/company-dossier-vscode (`@dossier /research`).
- **MCP server** — `company-dossier-mcp` (stdio) / `company-dossier-mcp-http` (HTTP), tool `build_dossier({ target, sections? })`. Usable from ChatGPT (Apps SDK) and Claude (connector/skill).

## Properties
- **Cost:** free. **Data:** public sources only; every claim source-attributed.
- **Output:** a folder of markdown (the nine sections) + a machine-readable `dossier.json`.
- **License:** MIT. **Source:** https://github.com/ever-just/company-dossier
