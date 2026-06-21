# Per-company subdomains — `<slug>.companydossier.lol`

Live infrastructure that hosts each generated dossier as an **unlisted, noindex** static
site at its own subdomain. Built on AWS S3 + CloudFront + ACM, with the wildcard DNS on
GoDaddy. **No secrets live in this repo** — operators supply AWS credentials via the
environment at deploy time.

## Architecture
```
<slug>.companydossier.lol
        │  (DNS: *.companydossier.lol  CNAME → CloudFront)
        ▼
   CloudFront distribution  ── viewer-request ──▶ CloudFront Function (cd-subdomain-router)
   (wildcard *.companydossier.lol,                rewrites Host "<slug>.…" → S3 key "/<slug>/…"
    ACM wildcard cert, HTTP/3)                    + serves index.html for dir requests
        │  (Origin Access Control, signed)
        ▼
   S3 bucket  companydossier-dossier-sites   (private; objects under  <slug>/…)
        ▲
   Response Headers Policy (cd-noindex-secure):
   X-Robots-Tag: noindex,nofollow · HSTS · nosniff · Referrer-Policy no-referrer · X-Frame-Options DENY
```

## Live resource inventory (account 678806349176, us-east-1)
| Resource | Identifier |
|--|--|
| S3 bucket | `companydossier-dossier-sites` (private, OAC-only) |
| ACM cert | `*.companydossier.lol` (DNS-validated, ISSUED) |
| CloudFront function | `cd-subdomain-router` (cloudfront-js-2.0) — see `cloudfront-router.js` |
| Response headers policy | `cd-noindex-secure` |
| CloudFront distribution | `E3P0P0EP27SOZC` → `d1lp33kl5s3dig.cloudfront.net` |
| DNS (GoDaddy) | `* CNAME → d1lp33kl5s3dig.cloudfront.net` (apex + `www` left on GitHub Pages) |

## Guardrails (why "unlisted + noindex")
Auto-publishing pages about real, named companies carries defamation/privacy exposure.
Every dossier site is therefore:
- **noindex / nofollow** (response header *and* per-page meta) and **robots Disallow: /** — shared by link only, never search-indexed;
- carries an **"auto-generated from public sources, may be inaccurate, not affiliated"** disclaimer + a **takedown** contact (`company@everjust.co`);
- routed through a reserved-word denylist so infrastructure labels (`www`, `api`, …) can't be claimed.
Treat a live, public deployment as needing a takedown process and (recommended) legal review of the content model.

## Operator runbook — publish a generated dossier
Generate a docs-site build with the npm package, then deploy it:
```bash
# 1) generate the dossier as an Astro site and build it
npx company-dossier "Acme Corp" acme.com --format site
cd "Acme Corp DOSSIER/site" && npm install && npm run build   # → ./dist

# 2) publish to acme.companydossier.lol  (requires AWS creds in env)
cd /path/to/company-dossier/infrastructure && npm install
AWS_ACCESS_KEY_ID=… AWS_SECRET_ACCESS_KEY=… \
  node deploy-dossier.mjs "/path/to/Acme Corp DOSSIER/site/dist" acme
# → https://acme.companydossier.lol  (live within seconds; unlisted + noindex)
```

## Re-provisioning
The one-time AWS setup (bucket, ACM cert, CloudFront function, response-headers policy,
distribution, OAC, bucket policy) plus the GoDaddy wildcard + validation records was
provisioned via the AWS API. `cloudfront-router.js` is the source of the routing function.
To rebuild from scratch, recreate the resources in the inventory above (cert in us-east-1
for CloudFront) and point `* CNAME` at the distribution.
