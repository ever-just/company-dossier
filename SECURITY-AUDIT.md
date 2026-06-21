# Company Dossier — Security Audit

**Scope:** `companydossier.lol` static site (`site/` → `docs/`, GitHub Pages), the
client-side in-browser generator widget (`/generate/`), the npm package
`packages/company-dossier` (CLI / library / MCP server), and `integrations/`.

**Date:** 2026-06-21
**Auditor:** automated tooling + manual source review
**Live target:** https://companydossier.lol (static; client-side widget posts a
user-supplied Anthropic key + optional GitHub token directly to `api.anthropic.com`
and `api.github.com` from the browser — there is no first-party backend).

---

## 1. Executive summary

The project has a **strong baseline security posture**. The most sensitive
surface — the in-browser widget that handles a user's Anthropic API key and
GitHub token — is implemented carefully: keys are never logged, never sent
anywhere except the two whitelisted API origins, default to memory/sessionStorage,
persistent storage is strictly opt-in with a visible warning and a working
"Forget saved key" control, and a meta-CSP `connect-src` allowlist
technically enforces that no third origin can be reached. A clickjacking
frame-buster compensates for GitHub Pages' inability to send `X-Frame-Options`.

No secrets were found anywhere in the working tree (the GoDaddy / npm / GitHub
tokens that were pasted into the chat session are **not** present in the repo —
verified clean). No vulnerable client-side JS libraries. The custom Markdown
renderer escapes HTML and restricts link schemes, mitigating the main XSS risk
from model output.

Findings are mostly **Low / Informational** and are largely inherent to the
GitHub Pages hosting model (no custom HTTP response headers possible). The two
findings worth real attention are: (a) **SSRF in the server-side collectors**
of the npm package / remote MCP server (no internal-address blocking), and
(b) **dependency hygiene** (one Low `esbuild` dev advisory here; the **HIGH
undici advisory called out in the task belongs to the separate
`company-dossier-vscode` repository, not this one** — see §3).

### Findings at a glance

| # | Finding | Severity | OWASP 2021 |
|---|---------|----------|------------|
| F1 | SSRF in server-side website/DNS collectors (no internal-IP/metadata blocking) | **Medium** | A10 SSRF |
| F2 | Remote MCP HTTP server: no auth + reflect-any-Origin CORS + binds 0.0.0.0 | **Medium** | A05 / A01 |
| F3 | `esbuild` ≤0.28.0 dev-server advisory (npm package, dev dependency) | **Low** | A06 |
| F4 | undici HIGH advisory — **in the separate VS Code extension repo**, not this repo | **High (other repo)** | A06 |
| F5 | No HSTS / `X-Content-Type-Options` / header-level CSP on live responses (GitHub Pages limitation) | **Low / Info** | A05 |
| F6 | `connect-src` allows entire `api.github.com` (token exfil bounded but not minimized) | **Info** | A05 |
| F7 | Client persists API key in `localStorage` when user opts in | **Info / Low** | A02 |
| F8 | GitHub repos created by the widget are forced `private:false` (public) | **Low** | A04 |
| F9 | CSP relies on `style-src 'unsafe-inline'` | **Info** | A05 |

No Critical findings.

---

## 2. Tools actually run (in this sandbox)

| Tool | Target | Result |
|------|--------|--------|
| `npm audit` (npm 10.9.7 / Node 22) | `packages/company-dossier` | **1 low** (`esbuild`), 0 high/critical |
| `npm audit` | `site/` | **0 vulnerabilities** |
| `npx retire` (retire.js v5.4.3) | `packages/company-dossier/dist` | **clean** — no known-vulnerable JS libraries |
| `npx @secretlint/quick-start` | whole tree + `site/`, `dist/`, `integrations/` | **no secrets reported** |
| heuristic secret regex (`sk-ant-`, `ghp_`, `github_pat_`, `AKIA`, PEM keys, `xox`, `AIza…`) | full tree (excl. `node_modules`/`.git`) | **0 matches** |
| generic `api_key/secret/token/password = "…"` grep | source + configs + `.env*` | **0 real matches** (only DOM ids / header names) |
| `curl -sSI` | `https://companydossier.lol/` and `/generate/` | headers captured (see §5) |
| `openssl s_client` | `companydossier.lol:443` | cert chain inspected (sandbox egress proxy — see caveat §5) |
| `grep` HTML scans | `docs/**.html` | `target=_blank` w/o `rel`: **0 of 118**; mixed `http://`: **0**; external `<script>`: **0**; inline `on*=` handlers: **0** |
| manual review | `widget.js`, `main.js`, `lib.mjs`, `sw.js`, `mcp-http.ts`, collectors, `utils.ts`, workflow, Dockerfile/fly/render | see §4–§7 |

> **`gitleaks` / `trufflehog` were not installable** in this sandbox; secretlint
> + targeted regex heuristics were used instead and corroborate a clean tree.
> This audit reviews the **working tree only** (git was intentionally not run);
> a full `git log -p` / `gitleaks --log-opts` history scan is recommended as a
> follow-up to confirm no secret was ever committed and later removed.

### Output highlights

`npm audit` (package):
```
esbuild  0.27.3 - 0.28.0   (severity: low)
esbuild allows arbitrary file read when running the development server on Windows
  GHSA-g7r4-m6w7-qqqr
fix available via `npm audit fix`
1 low severity vulnerability   (installed: esbuild 0.27.7, transitive via tsup)
```

`npm audit` (site): `found 0 vulnerabilities`
`retire.js` (dist): completed with no findings.
Secret scans: empty output (no findings).

---

## 3. Note on the undici "HIGH" advisory (F4)

The task flagged a known **HIGH undici advisory with `npm audit fix` available
for the VS Code extension.** Verified in this repo:

* This repo's installed dependency tree contains **only `undici-types@6.21.0`**
  (a TypeScript types-only package, pulled in by `@types/node` — **not the
  vulnerable runtime library**) plus the Low `esbuild`. `npm audit` here reports
  **0 high / 0 critical.**
* The server-side collectors (`utils.ts → fetchText`) use Node's **global
  `fetch`**, which embeds undici inside the Node runtime rather than as an npm
  dependency — so an undici advisory there is remediated by upgrading Node, not
  by `npm audit fix`.
* The site `lib.mjs` references a **separate repository**,
  `https://github.com/ever-just/company-dossier-vscode` (`SITE.repoVscode`).
  That VS Code extension repo is **not checked out here**, so its lockfile could
  not be audited in this sandbox.

**Conclusion:** the HIGH undici advisory applies to the **`company-dossier-vscode`
repo**, which is out of scope of this checkout. **Action:** in that repo run
`npm audit` and `npm audit fix` (or bump the dependency that pulls undici, e.g.
`@vscode/test-electron` / any HTTP client), then re-publish the extension.
**Severity: High — in that repo.** Nothing to fix for undici in *this* repo.

---

## 4. Client-side secret handling review (`site/assets/widget.js`)

**Verdict: well designed.** Verified against each requested criterion:

* **Never logged.** No `console.*` of the key/token anywhere; error messages
  surface API status codes only (`anthropicError`, `ghError`), never the key.
* **Only sent to the two allowed origins.** The Anthropic key goes solely to
  `https://api.anthropic.com/v1/messages` via the `x-api-key` header
  (`anthropic-dangerous-direct-browser-access: true`); the GitHub token goes
  solely to `https://api.github.com/*` via `Authorization: Bearer`. There is no
  other `fetch`/`XHR`/`sendBeacon`/`Image()` exfil path, and there is no
  first-party server to receive anything. The meta-CSP `connect-src 'self'
  https://api.anthropic.com https://api.github.com` enforces this at the browser
  level — a compromised/injected script cannot POST the key to a third origin.
* **Default in-memory + sessionStorage.** `STORE_KEY = 'cdw.anthropic.key'`;
  default path writes to `sessionStorage` (cleared on tab close). `localStorage`
  is used **only** when the user ticks "remember" (`$remember.checked`), which
  also reveals a visible warning (`$rememberWarn`).
* **"Forget key" works.** `forgetKey()` clears both `localStorage` and
  `sessionStorage`, empties the field, unticks remember, and hides the warning.
* **GitHub token is ephemeral.** Entered in a dynamically created
  `type="password"` field with `autocomplete="off"`, used in-memory for the repo
  flow, and never persisted.

**Output XSS hardening (good).** Model output is rendered by a hand-written
Markdown renderer that HTML-escapes all text first (`escapeHtml`), restricts
link `href` to `http(s):`/`mailto:` (drops `javascript:`/`data:` and relative
schemes), and adds `rel="noopener nofollow"` to generated links. All
`innerHTML` sinks (`renderDossier`, status, export note) are fed escaped or
renderer-produced HTML. This effectively mitigates A03-Injection from untrusted
LLM/GitHub content.

**Clickjacking frame-buster (`main.js`).** Confirmed:
`if (window.top !== window.self) { window.top.location = window.self.location.href; }`
wrapped in try/catch — a reasonable JS fallback given GitHub Pages cannot send
`X-Frame-Options` / `frame-ancestors` as a real header (the meta-CSP
`frame-ancestors 'none'` is **ignored by browsers** in meta form, so the JS is
load-bearing). Note: a JS frame-buster can be weakened by a framing parent using
the `sandbox` attribute without `allow-top-navigation`; this is a minor residual
limitation, not a fix-needed item for a static host.

---

## 5. HTTP headers / TLS (live site)

`curl -sSI https://companydossier.lol/` and `/generate/` returned (highlights):

```
HTTP/2 200
server: GitHub.com
content-type: text/html; charset=utf-8
access-control-allow-origin: *
cache-control: max-age=600
vary: Accept-Encoding
(via Fastly / x-served-by / x-cache present)
```

**Absent from the HTTP response:** `Strict-Transport-Security`,
`X-Content-Type-Options`, `X-Frame-Options`, header-level
`Content-Security-Policy`, header-level `Referrer-Policy`.

This is **expected and largely unavoidable on GitHub Pages**, which does not let
you set custom response headers. Mitigations the project already applies via
`<meta>` in `site/lib.mjs` (confirmed present in the served `docs/index.html`):

* `<meta http-equiv="Content-Security-Policy" content="default-src 'self';
  base-uri 'self'; object-src 'none'; img-src 'self' data:; style-src 'self'
  'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;
  script-src 'self'; connect-src 'self' https://api.anthropic.com
  https://api.github.com; form-action 'self'; frame-ancestors 'none';
  upgrade-insecure-requests">`
* `<meta name="referrer" content="no-referrer">`

**CSP assessment (Google CSP Evaluator / Mozilla Observatory criteria):**
- `script-src 'self'` — **strong**; no `'unsafe-inline'`, no `'unsafe-eval'`,
  no wildcard, no CDN. This is the single most important control and it's right.
- `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` — all present
  (Evaluator's recommended hardening). Good.
- `connect-src` correctly limited to the two API origins (see F6).
- `upgrade-insecure-requests` present; no mixed content found (verified §2).
- **`style-src 'unsafe-inline'` (F9)** — flagged by Observatory; here it is
  justified by the heavy use of inline `style="…"` attributes in the generated
  HTML and is **not** script execution, so the practical risk is cosmetic/CSS
  injection only. Acceptable; could be tightened later with hashed styles.
- `frame-ancestors 'none'` in a **meta** tag is **ignored by browsers** — the
  real anti-framing control is the JS frame-buster (§4), which is in place.

**HSTS:** GitHub Pages serves custom domains with HSTS at the edge once
"Enforce HTTPS" is enabled in repo settings; confirm that toggle is on. It does
not appear as an HSTS header in this sandbox's egress path.

> **TLS caveat:** `openssl s_client` in this sandbox terminated against the
> Anthropic egress gateway (`issuer=O=Anthropic, Egress Gateway …`), **not** the
> site's real Let's Encrypt/GitHub cert. So the cert details observed here are
> the proxy's, not production's. Re-verify TLS from an unproxied host (e.g.
> SSL Labs / `testssl.sh`) — production should show GitHub Pages' managed cert.

---

## 6. Static / HTML checks (built `docs/`)

* **`target="_blank"` without `rel`:** 0 of 118 links — every one carries `rel`
  (`noopener` / `noopener nofollow`). No reverse-tabnabbing.
* **Mixed content:** 0 `http://` resource references (only schema.org/w3.org
  namespace URIs, which are not fetched). Good.
* **External scripts:** none — all JS is first-party (`/assets/*.js`),
  consistent with `script-src 'self'`. No third-party analytics/CDN.
* **Inline event handlers (`onclick=` etc.):** none.
* **Service worker (`docs/sw.js`):** correctly returns early for cross-origin
  requests (`if (url.origin !== location.origin) return;`) — it never intercepts
  or caches the Anthropic/GitHub API calls, so it cannot leak or replay keys.
  Cache-first for assets, network-first for navigation with offline fallback —
  no security concern.
* **IndexNow key** (`8b1c…92b`, in `lib.mjs` and as a hosted `.txt`): this is a
  **public, by-design** verification token, not a secret. Correct usage.

---

## 7. npm package / server-side (`packages/company-dossier`)

### F1 — SSRF in collectors (Medium, OWASP A10)
`collectors/website.ts` and the DNS/search collectors fetch **user-supplied
domains/URLs** server-side via `utils.ts → fetchText(url)`, which calls Node's
global `fetch` with **no allow/deny list, no DNS/IP filtering, and default
redirect-following**. When the package is run as the **remote MCP HTTP server**
(`dist/mcp-http.js`, deployed via the included `Dockerfile`/`fly.toml`/`render.yaml`),
an attacker can pass a domain that resolves to internal addresses —
`http://169.254.169.254/…` (cloud metadata), `http://127.0.0.1`, RFC-1918
ranges, or a public host that 30x-redirects to them — and have the server fetch
them and return the body. The homepage fetch in particular accepts an arbitrary
`baseUrl`.
*Fix:* before fetching, resolve the hostname and **reject** loopback,
link-local (`169.254.0.0/16`, `fd00::/8`, `::1`), and RFC-1918/ULA addresses;
disable or manually validate redirects (`redirect: 'manual'` and re-check each
hop); enforce `http(s)` scheme and a response size cap. Apply in `fetchText`
so every collector benefits. (Risk is lower for the local CLI, which runs as the
user, but the hosted MCP server is internet-reachable.)

### F2 — Remote MCP HTTP server exposure (Medium, A05/A01)
`mcp-http.ts` binds `0.0.0.0`, has **no authentication**, and sets
`Access-Control-Allow-Origin` to the **reflected request Origin** (effectively
allow-any). For a read-only public-data tool this is a deliberate design choice,
but combined with F1 it means any internet client can drive the server's
outbound fetches. *Fix:* if it stays public, ship the SSRF guard (F1), add a
per-deployment rate limit, and consider an optional shared-secret/header or an
Origin allowlist for production deployments. Document that operators run it
behind their own auth/proxy.

### F3 — `esbuild` dev advisory (Low, A06)
`esbuild@0.27.7` (transitive via `tsup`, devDependency) matches
GHSA-g7r4-m6w7-qqqr (dev server arbitrary file read on Windows). Build-time only,
not shipped in `dist/`. *Fix:* `npm audit fix` in `packages/company-dossier`
(bumps esbuild). Low urgency.

### Positives
* Only two runtime deps (`@modelcontextprotocol/sdk@1.29.0`, `zod`) — small
  attack surface; MCP tool input is validated with `zod` schemas.
* `fetchText` sets a timeout via `AbortController` (DoS mitigation, partial).
* CI workflow (`.github/workflows/pages.yml`) uses **pinned major-version
  actions**, **least-privilege `permissions:`** (`contents: read`, plus
  `pages: write` / `id-token: write` only where needed), and contains **no
  hardcoded secrets**. Dockerfile uses `npm ci`, multi-stage build,
  `--omit=dev` runtime, `NODE_ENV=production` — good hygiene. `fly.toml` sets
  `force_https = true`.

---

## 8. Prioritized remediation

1. **(External repo, High)** Run `npm audit fix` for the **undici** advisory in
   `company-dossier-vscode` and re-publish the extension (F4). Nothing to do for
   undici in this repo.
2. **(Medium)** Add SSRF protection in `utils.ts:fetchText` — block internal/
   metadata IPs, validate redirects, cap response size (F1); harden the public
   MCP server (rate limit / optional auth) (F2).
3. **(Low)** `npm audit fix` in `packages/company-dossier` for `esbuild` (F3).
4. **(Low/Info)** Confirm "Enforce HTTPS" (HSTS) is enabled in GitHub Pages
   settings (F5). Re-verify production TLS from an unproxied host.
5. **(Info, optional UX)** Consider defaulting the widget's GitHub repo creation
   to `private: true` or making it a user choice (F8); keep the existing
   localStorage opt-in warning (F7); long-term, replace `style-src
   'unsafe-inline'` with hashed styles (F9).
6. **(Follow-up)** Run a git-history secret scan (`gitleaks`/`trufflehog` over
   full history) to confirm no token was ever committed and later removed —
   this audit covered the working tree only.

---

*Methodology: OWASP Top 10 (2021) mapping, OWASP Secure Headers Project
baseline, Google CSP Evaluator + Mozilla Observatory CSP criteria, npm audit,
retire.js, secretlint + regex secret heuristics, and manual source review.
git commands were intentionally not run; source files were not modified.*
