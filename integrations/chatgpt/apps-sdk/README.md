# ChatGPT App (Apps SDK / MCP) — Company Dossier

This describes how the **ChatGPT App** version of Company Dossier is wired. It is
distinct from the Custom GPT in `../gpt/` — the Custom GPT browses the web with
built-in tools, whereas the App connects to our own **MCP server** and calls the
`build_dossier` tool, giving deterministic, sourced output from the same engine
behind `npx company-dossier` and the Claude connector.

> **LIVE.** The MCP server is deployed and serving:
> - Endpoint: `https://mcp.companydossier.lol/mcp` (Streamable HTTP)
> - Health: `https://mcp.companydossier.lol/health` → `{"status":"ok"}`
> - Auth: **bearer token** (`Authorization: Bearer <token>`) — the token is held out of
>   the repo; configure it in the ChatGPT connector. Unauthenticated calls get `401`.
> - Tool: `build_dossier` (verified discoverable via `tools/list`).
> - Hosting: EC2 (`t3.micro`, us-east-1) behind Caddy (auto-TLS via Let's Encrypt).
>
> Status note: OpenAI's Apps SDK and its submission/review process are evolving.
> Field names, manifest shape, and console URLs below reflect current public
> guidance; where we are not certain of an exact field, it is marked
> `# VERIFY`. Confirm against the live Apps SDK docs at
> https://developers.openai.com/apps-sdk before submitting.

## Connect it in ChatGPT (developer mode) — works today

1. ChatGPT → **Settings → Connectors** (or **Apps & Connectors**) → enable
   **Developer mode** if shown.
2. **Add / Create** a connector pointing at the MCP server:
   - **URL:** `https://mcp.companydossier.lol/mcp`
   - **Transport:** Streamable HTTP (MCP)
   - **Auth / Custom header:** `Authorization` = `Bearer <token>` (use the token from
     the operator — it is not stored in this repo).
3. ChatGPT discovers the `build_dossier` tool. Try: *"Build a dossier on stripe.com."*
4. To list it in the Apps directory, finish the manifest (`manifest.example.json`) and
   submit per the flow below. For a public listing serving arbitrary users, move auth
   from a single shared bearer to **OAuth 2.1** (or add metering) — see `auth` in the manifest.

## Architecture

```
ChatGPT  ──(MCP over HTTPS)──▶  company-dossier-mcp  ──▶  build_dossier engine
                                (https://mcp.companydossier.lol)        │
                                                                        ▼
                                                          public-data collectors
```

- The App is a thin connector. It registers our MCP server with ChatGPT.
- ChatGPT discovers the `build_dossier` tool from the server and calls it when a
  user asks for company research.
- The server runs the same dossier engine as the CLI/library and returns a
  structured, sourced nine-section dossier.

## The MCP server

- Binary: `company-dossier-mcp` (shipped in the `company-dossier` npm package).
- Public endpoint for the hosted App: `https://mcp.companydossier.lol`
  (placeholder — replace with the real deployed URL).
- Transport: MCP over HTTPS (Streamable HTTP). The Apps SDK expects a remote MCP
  server reachable over HTTPS.
- Exposed tool: **`build_dossier`**
  - Input: `target` (string) — company name or domain. Optional depth/section
    flags if the server exposes them.
  - Output: a structured dossier across the nine sections, with per-claim source
    and confidence. Apps SDK tools may also return a component/UI payload for
    inline rendering — see "UI component" below.

## Required metadata & auth

For listing the App, you will need to provide (in the manifest and/or the
developer console):

- **Name, short + long description, icon/logo, category** (likely "Productivity"
  or "Research" — `# VERIFY` the current category list).
- **Privacy policy URL** and **terms URL** — required for any listed app.
- **The MCP server URL** (`https://mcp.companydossier.lol`).
- **Auth model** — pick one and configure it on both the server and the manifest:
  - *No-auth / public* — simplest; fine if the tool needs no per-user secrets.
  - *OAuth 2.1* — if the server must authenticate users or meter usage. The Apps
    SDK supports an OAuth flow for connectors; you provide authorization/token
    endpoints and scopes. (`# VERIFY` exact OAuth field names in the manifest.)
  - Company Dossier uses only public data and needs no user credentials, so
    **no-auth is the default**; switch to OAuth only if you add accounts/billing.
- **Data-use disclosure** — what the tool sends out (the target string) and what
  it returns (public-data dossier). Reviewers check this.

## UI component (optional)

Apps SDK tools can return a rendered component (an inline card/panel) alongside
text. A dossier renders well as a sectioned, collapsible card with source links.
If you ship one, declare the component resource in the server's tool response per
the Apps SDK component contract. Text-only output is also valid and is the
simplest first version.

## Local development

1. Run the server locally: `npx company-dossier-mcp` (or the package's documented
   dev command). It should serve MCP over HTTPS/localhost.
2. Point ChatGPT developer mode at the local server URL to test tool discovery
   and `build_dossier` calls before deploying. (Developer mode / connector
   testing is in ChatGPT Settings → Connectors / Apps — `# VERIFY` exact path.)
3. Deploy the server to `https://mcp.companydossier.lol`, then update the manifest
   URL.

## Submission / review flow (to get listed)

These steps require a **human browser login** and cannot be automated:

1. Sign in to the OpenAI developer console / Apps SDK dashboard at
   https://developers.openai.com/apps-sdk (or platform.openai.com — `# VERIFY`
   the current entry point).
2. Create a new App/connector, point it at the deployed MCP server URL, and
   upload/fill the metadata above (name, descriptions, icon, privacy/terms URLs,
   category, auth config). `manifest.example.json` in this folder is a starting
   point.
3. Test in ChatGPT developer mode end-to-end: the tool is discovered, a sample
   target produces a sourced dossier, and any UI component renders.
4. Submit for review. OpenAI reviews apps for policy, safety, data use, and
   functionality before they can be listed/discoverable. Expect a review turn.
5. On approval, the App becomes listable/discoverable in ChatGPT per the current
   distribution rules. Until then it can typically be used privately/by link.

Keep the brand consistent with the rest of the product: plain, confident, "field
intelligence." These are functional config files, not marketing copy.
