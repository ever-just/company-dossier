# Deploying the company-dossier remote MCP server

The remote server speaks the **MCP Streamable HTTP** transport and exposes the
same single tool as the stdio server: `build_dossier`.

Endpoints:

- `POST /mcp` — MCP requests (initialize, tool calls). Returns an
  `Mcp-Session-Id` header on initialize; send it back on subsequent requests.
- `GET /mcp` — server-to-client SSE stream for an existing session.
- `DELETE /mcp` — tear down a session.
- `GET /health` — returns `200 {"status":"ok"}` (used by platform health checks).

It listens on `process.env.PORT || 8787`.

All deploy files (`Dockerfile`, `render.yaml`, `fly.toml`, this `deploy/`
folder) live in `packages/company-dossier/` and are repo-only — they are **not**
published to npm (the package `files` allowlist ships only `dist` + `README.md`).

---

## 1. Render (one-click Blueprint)

The repo ships `render.yaml` (a Render Blueprint) that builds the Dockerfile.

1. Push this repo to GitHub.
2. In the Render dashboard: **New → Blueprint**, pick this repository.
   Render reads `packages/company-dossier/render.yaml` and creates a Docker web
   service named `company-dossier-mcp` with health check `/health`.
3. Click **Apply**. Render builds and deploys.

Or fully from the CLI:

```bash
# one-time
npm i -g @render/cli   # or: brew install render
render login

# from the repo root, deploy the blueprint
render blueprint launch
```

Your service URL will be `https://company-dossier-mcp.onrender.com`
(MCP endpoint: `https://company-dossier-mcp.onrender.com/mcp`).

---

## 2. Fly.io (one command)

The repo ships `fly.toml` (app `company-dossier-mcp`, `internal_port = 8787`).

```bash
# one-time
brew install flyctl        # or: curl -L https://fly.io/install.sh | sh
fly auth login

# from packages/company-dossier/
fly launch --no-deploy --copy-config --name company-dossier-mcp   # first time only
fly deploy
```

`fly deploy` builds the Dockerfile and rolls it out. The app is reachable at
`https://company-dossier-mcp.fly.dev` (MCP endpoint:
`https://company-dossier-mcp.fly.dev/mcp`).

---

## 3. Any Docker host (one command each)

```bash
# from packages/company-dossier/
docker build -t company-dossier-mcp .
docker run -d --restart unless-stopped -p 8787:8787 --name company-dossier-mcp company-dossier-mcp

# verify
curl -s http://localhost:8787/health      # -> {"status":"ok"}
```

Put it behind any reverse proxy (Caddy, nginx, Traefik) to add TLS.
Example Caddyfile:

```
mcp.companydossier.lol {
    reverse_proxy localhost:8787
}
```

---

## Pointing `mcp.companydossier.lol` at the server

Create one DNS record for the subdomain, then make sure the platform serves TLS
for it:

| Platform     | DNS record to add at your DNS provider                          | Then on the platform                                              |
|--------------|-----------------------------------------------------------------|------------------------------------------------------------------|
| **Render**   | `CNAME  mcp  company-dossier-mcp.onrender.com`                  | Service → **Settings → Custom Domains** → add `mcp.companydossier.lol`; Render auto-provisions a cert. |
| **Fly.io**   | `CNAME  mcp  company-dossier-mcp.fly.dev` (or A/AAAA to the app IPs) | `fly certs add mcp.companydossier.lol` — provisions a Let's Encrypt cert. |
| **Docker host** | `A  mcp  <server-public-IP>`                                 | Terminate TLS in your reverse proxy (the Caddy example above provisions a cert automatically). |

After DNS propagates, verify:

```bash
curl -s https://mcp.companydossier.lol/health   # -> {"status":"ok"}
```

The MCP endpoint clients connect to is then:

```
https://mcp.companydossier.lol/mcp
```
