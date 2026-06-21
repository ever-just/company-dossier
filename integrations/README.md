# Company Dossier — AI assistant integrations

Integration assets that let AI assistants invoke **Company Dossier**: a tool that
builds a complete, sourced intelligence dossier on any company from PUBLIC data.

- npm package: `company-dossier`
- CLI: `npx company-dossier <company-or-domain>`
- Library: `buildDossier(...)`
- MCP server binary: `company-dossier-mcp` → exposes the tool `build_dossier`
- Site: https://companydossier.lol
- Repos: https://github.com/ever-just/company-dossier (core),
  https://github.com/ever-just/company-dossier-vscode

Every dossier is nine sections — Overview & identity, People & org chart, Hiring
radar, Money trail, Locations, Tech fingerprint, News & timeline, Relationship
web, Risk flags — with every claim sourced and confidence-tagged. Public data only.

---

## What's in this folder

```
integrations/
├─ README.md                              ← this file
├─ claude-skill/
│  ├─ company-dossier/
│  │  ├─ SKILL.md                         ← the Claude Agent Skill
│  │  └─ reference/
│  │     └─ sections.md                   ← the nine-section reference
│  └─ company-dossier.zip                 ← zipped skill folder, ready to upload
└─ chatgpt/
   ├─ gpt/
   │  └─ instructions.md                  ← Custom GPT spec (name, desc, instructions, starters)
   └─ apps-sdk/
      ├─ README.md                        ← how the ChatGPT App (MCP-based) is wired
      └─ manifest.example.json            ← example connector manifest (placeholders marked)
```

| Asset | Type | What it does |
|---|---|---|
| `claude-skill/company-dossier/SKILL.md` | Claude Agent Skill | Tells Claude when and how to build the nine-section dossier; uses the MCP/CLI tool when available, falls back to manual web gathering. |
| `claude-skill/company-dossier/reference/sections.md` | Skill reference | Per-section guidance Claude reads while assembling. |
| `claude-skill/company-dossier.zip` | Upload artifact | The skill folder zipped for distribution/upload. |
| `chatgpt/gpt/instructions.md` | Custom GPT spec | Copy-paste config for a browsing-based Custom GPT. |
| `chatgpt/apps-sdk/README.md` | App wiring doc | How the MCP-backed ChatGPT App connects to `company-dossier-mcp`. |
| `chatgpt/apps-sdk/manifest.example.json` | Example manifest | Starting point for the connector manifest. |

> Accuracy note: external submission flows (Anthropic's connector directory,
> OpenAI's GPT Store and Apps SDK review) change over time. Steps and URLs below
> are current best guidance as of 2026-06; where an exact field/URL is uncertain
> it is flagged. Confirm against the live consoles before submitting.

---

## Claude

### Install the skill locally (file-based — no login)

Agent Skills are a folder containing `SKILL.md`. To use locally:

- **Claude Code / Agent SDK:** place the `company-dossier/` folder in your skills
  directory (e.g. a project `.claude/skills/` or your user-level skills folder),
  so the path is `…/skills/company-dossier/SKILL.md`. Claude reads the
  frontmatter `description` to decide when to invoke it. Restart/reload so it's
  discovered. (Confirm the exact skills directory for your Claude Code version —
  `/help` or the skills docs list it.)
- The `.zip` (`claude-skill/company-dossier.zip`) is the same folder packaged for
  upload to any surface that accepts a skill bundle.

### Use the skill via the API (Messages API) — file-based

To run the skill through the Claude API you upload it as a custom skill and
attach it to a request that has the code-execution container:

1. Create the skill from the bundle via the Skills API
   (`POST /v1/skills`, beta header `skills-2025-10-02`).
2. On the message request, pass `container={"skills":[{"type":"custom",
   "skill_id":"<id>","version":"latest"}]}` with the
   `code_execution_20250825` tool, and both betas
   `code-execution-2025-08-25` + `skills-2025-10-02`.

(See platform.claude.com docs → Agent Skills for the current upload shape.)

### Publish the MCP server as a Claude connector (requires browser login)

The richer integration is publishing `company-dossier-mcp` (tool `build_dossier`)
as a remote MCP **connector** so Claude calls it directly:

1. Deploy the MCP server to a public HTTPS endpoint (placeholder:
   `https://mcp.companydossier.lol`).
2. **[Browser login required]** Add it as a custom connector in Claude:
   Claude **Settings → Connectors → Add custom connector**, enter the server URL
   and any auth. This is per-user/per-workspace and is done in the browser UI.
3. **[Browser login required] To list it in Anthropic's connector/MCP
   directory:** apply through Anthropic's connector submission process — at time
   of writing this is a partner/submission form rather than a self-serve upload.
   Check claude.com/connectors (or the current Anthropic connectors/directory
   page) for the live submission path. `# VERIFY` the exact URL — Anthropic's
   directory program is evolving; if no self-serve listing exists yet, the
   custom-connector + shared skill `.zip` is the distribution path.

What's automatable vs. not:
- **File-based (no login):** authoring the skill, zipping it, deploying the MCP
  server, sharing the `.zip`.
- **Requires human browser login:** adding the connector in Claude's settings,
  and any submission to Anthropic's directory.

---

## ChatGPT

### Custom GPT — create & publish in the GPT Store (requires browser login)

The Custom GPT (in `chatgpt/gpt/instructions.md`) is browsing-based and needs no
server.

1. **[Browser login required]** Go to https://chatgpt.com/gpts/editor (requires a
   ChatGPT plan that allows GPT creation). Click **Create**.
2. In **Configure**, paste from `instructions.md`: Name, Description,
   Instructions, and the four Conversation starters. Enable **Web Browsing**.
3. Save. Set visibility: Only me / Anyone with the link / Public (GPT Store).
4. **To list in the GPT Store:** choose **Publish → Everyone**, pick a category,
   and ensure your builder profile is verified (a verified name or website is
   required to publish publicly). OpenAI may review before it appears in Store
   search.

All of the above is done in the browser and **cannot be automated** — the
`instructions.md` file is the source content you paste in.

### ChatGPT App (Apps SDK / MCP) — submit for review (requires browser login)

The App (in `chatgpt/apps-sdk/`) connects to the `company-dossier-mcp` server and
calls `build_dossier`. Full wiring is in `chatgpt/apps-sdk/README.md`; summary:

1. **File-based:** deploy the MCP server publicly; fill
   `manifest.example.json` (replace placeholders, set auth, point at the deployed
   URL).
2. **[Browser login required]** Sign in to the OpenAI developer console / Apps
   SDK dashboard (https://developers.openai.com/apps-sdk — `# VERIFY` current
   entry point), create the App, and upload metadata (name, descriptions, icon,
   privacy/terms URLs, category, auth).
3. **[Browser login required]** Test in ChatGPT developer mode (tool discovery +
   a sample `build_dossier` call), then **submit for review**. OpenAI reviews for
   policy, safety, data use, and functionality before an app can be listed.

What's automatable vs. not:
- **File-based (no login):** writing the manifest, deploying the MCP server.
- **Requires human browser login:** creating the App in the console, developer-mode
  testing, and submitting for review.

---

## Quick reference — login vs. file-based

| Step | Surface | Login needed? |
|---|---|---|
| Author skill, zip it | Claude | No (file-based) |
| Place skill in local skills dir | Claude | No (file-based) |
| Upload custom skill via Skills API | Claude | API key, not browser |
| Add MCP server as custom connector | Claude | **Yes — browser** |
| Submit to Anthropic connector directory | Claude | **Yes — browser** (`# VERIFY` path) |
| Write Custom GPT config | ChatGPT | No (file-based) |
| Create / publish Custom GPT in Store | ChatGPT | **Yes — browser** |
| Fill manifest, deploy MCP server | ChatGPT App | No (file-based) |
| Create App, dev-mode test, submit for review | ChatGPT App | **Yes — browser** |
