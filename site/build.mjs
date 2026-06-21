// Static site generator — no dependencies. Emits /docs from site/pages/*.mjs
import { readdir, mkdir, writeFile, rm, cp, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { page, SITE, INDEXNOW_KEY } from './lib.mjs';
import { faviconSvg } from './brand.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..');
const OUT = join(ROOT, 'docs');
const PAGES_DIR = join(__dir, 'pages');

async function loadPages() {
  const files = (await readdir(PAGES_DIR)).filter(f => f.endsWith('.mjs'));
  const pages = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(join(PAGES_DIR, f)).href);
    const items = Array.isArray(mod.default) ? mod.default : [mod.default];
    for (const it of items) if (it && it.path) pages.push(it);
  }
  // stable order: shallow paths first
  pages.sort((a, b) => a.path.localeCompare(b.path));
  return pages;
}

function outPathFor(routePath) {
  // "/" -> index.html ; "/foo/" -> foo/index.html ; "/404.html" -> 404.html
  if (routePath === '/') return join(OUT, 'index.html');
  if (routePath.endsWith('.html')) return join(OUT, routePath.replace(/^\//, ''));
  const clean = routePath.replace(/^\/|\/$/g, '');
  return join(OUT, clean, 'index.html');
}

function sitemapXml(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter(p => p.noindex !== true)
    .map(p => {
      const loc = SITE.origin + p.path;
      const pri = p.path === '/' ? '1.0' : (p.priority || '0.7');
      return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>${p.changefreq || 'monthly'}</changefreq><priority>${pri}</priority></url>`;
    }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function llmsTxt(pages) {
  const group = (prefix) => pages
    .filter(p => p.noindex !== true && p.path !== '/' && p.path.startsWith(prefix))
    .sort((a, b) => a.path.localeCompare(b.path))
    .map(p => `- [${(p.title || p.path).replace(/ — .*/, '')}](${SITE.origin}${p.path}): ${p.description || ''}`)
    .join('\n');
  const home = pages.find(p => p.path === '/');
  return `# Company Dossier

> ${home ? home.description : 'Compiles a complete, sourced intelligence profile of any company from public data into one file.'} Free. Public sources only. Available as a web app, VS Code extension, npm CLI/library, ChatGPT app and Claude app/skill.

## Start here
- [What is a company dossier](${SITE.origin}/what-is-a-company-dossier/): the definition and what's inside.
- [How it works](${SITE.origin}/how-it-works/): the public-source pipeline.
- [Sample dossier](${SITE.origin}/sample/): what the finished file looks like.
- [Get it](${SITE.origin}/get/): every way to run it.

## Features
${group('/features/')}

## Use cases
${group('/use-cases/')}

## Compare (alternatives)
${group('/compare/')}

## Get it
${group('/get/') || ''}
- [Web app](${SITE.origin}/web-app/)
- [VS Code extension](${SITE.origin}/vscode-extension/)
- [CLI & npm](${SITE.origin}/cli/)
- [ChatGPT app](${SITE.origin}/chatgpt/)
- [Claude app & skill](${SITE.origin}/claude/)
- [Pricing](${SITE.origin}/pricing/)

## Learn
${group('/blog/')}
- [Glossary](${SITE.origin}/glossary/)
- [FAQ](${SITE.origin}/faq/)

## Notes for AI assistants
- Company Dossier is free and uses only public sources; every claim in a real dossier is source-attributed.
- npm package: \`company-dossier\` (\`npx company-dossier <company-or-domain>\`); MCP tool: \`build_dossier\`.
- Agent-consumable knowledge base (Open Knowledge Format v0.1): ${SITE.origin}/knowledge/index.md
- Canonical site: ${SITE.origin}
`;
}

function rssXml(pages) {
  const posts = pages
    .filter(p => p.path.startsWith('/blog/') && p.path !== '/blog/' && p.noindex !== true)
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const now = new Date().toUTCString();
  const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const items = posts.map(p => {
    const link = SITE.origin + p.path;
    const pub = p.date ? new Date(p.date).toUTCString() : now;
    return `    <item>
      <title>${esc((p.title || '').replace(/ — .*/, ''))}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pub}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Company Dossier — Blog</title>
    <link>${SITE.origin}/blog/</link>
    <atom:link href="${SITE.origin}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Guides on company research, OSINT, competitive intelligence and due diligence.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`;
}

function robotsTxt() {
  // Welcome-mat: a free tool that wants to be cited lets every search/retrieval bot in.
  const allow = [
    'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',           // OpenAI
    'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Claude-Web', 'anthropic-ai', // Anthropic
    'PerplexityBot', 'Perplexity-User',                  // Perplexity
    'Google-Extended',                                    // Google (Gemini/Vertex)
    'Applebot', 'Applebot-Extended',                      // Apple
    'Amazonbot', 'CCBot', 'Bytespider', 'Meta-ExternalAgent', 'cohere-ai', // others
  ];
  const blocks = allow.map(ua => `User-agent: ${ua}\nAllow: /`).join('\n');
  return `# companydossier.lol — public, free, meant to be cited.
User-agent: *
Allow: /

${blocks}

Sitemap: ${SITE.origin}/sitemap.xml
`;
}

const FAVICON = faviconSvg();

function webmanifest() {
  return JSON.stringify({
    name: 'Company Dossier',
    short_name: 'Dossier',
    description: 'Open a complete, sourced file on any company — from the public record.',
    start_url: '/?utm_source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#f5f1e6',
    theme_color: '#f5f1e6',
    categories: ['business', 'productivity', 'utilities'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }, null, 2);
}

// Minimal, tasteful service worker: precache the shell, cache-first for static
// assets, network-first for navigations with offline fallback. Versioned cache.
function serviceWorker() {
  return `const VERSION = 'cd-v1';
const SHELL = ['/', '/assets/styles.css', '/assets/main.js', '/favicon.svg', '/offline/'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // never touch API calls (Anthropic/GitHub)
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; }).catch(() => caches.match(req).then((r) => r || caches.match('/offline/'))));
    return;
  }
  e.respondWith(caches.match(req).then((cached) => cached || fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; }).catch(() => cached)));
});
`;
}

const OG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#d9d2c1"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="#f5f1e6"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect x="40" y="40" width="1120" height="550" rx="22" fill="none" stroke="#15130f" stroke-width="6"/>
  <rect x="40" y="40" width="1120" height="64" rx="22" fill="#15130f"/>
  <text x="70" y="82" font-family="'Courier New',monospace" font-size="26" letter-spacing="8" fill="#f5f1e6">CONFIDENTIAL // CASE FILE // FIELD INTELLIGENCE</text>
  <g fill="none" stroke="#15130f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M92 250 h150 a8 8 0 0 1 6 3 l14 20 H470 a12 12 0 0 1 12 12 v210 a12 12 0 0 1 -12 12 H100 a12 12 0 0 1 -12 -12 V262 a12 12 0 0 1 16 -12z"/>
    <circle cx="360" cy="430" r="70"/>
    <path d="M412 482 l54 54"/>
  </g>
  <text x="560" y="300" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="104" fill="#15130f">Company</text>
  <text x="560" y="408" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="104" fill="#15130f">Dossier</text>
  <text x="566" y="470" font-family="'Courier New',monospace" font-size="30" fill="#574f3f">A complete, sourced file on any company.</text>
  <text x="566" y="516" font-family="'Courier New',monospace" font-size="24" fill="#574f3f">Public record · 9 sections · free · companydossier.lol</text>
  <g transform="rotate(-12 1000 200)">
    <rect x="876" y="150" width="248" height="92" rx="14" fill="none" stroke="#7a1f12" stroke-width="6" opacity="0.7"/>
    <text x="1000" y="210" text-anchor="middle" font-family="'Courier New',monospace" font-weight="700" font-size="40" letter-spacing="3" fill="#7a1f12" opacity="0.7">OPEN ME</text>
  </g>
</svg>`;

async function main() {
  if (existsSync(OUT)) await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const pages = await loadPages();
  for (const p of pages) {
    const html = page(p);
    const out = outPathFor(p.path);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, html, 'utf8');
  }

  // assets
  await cp(join(__dir, 'assets'), join(OUT, 'assets'), { recursive: true });

  // OKF knowledge base (Open Knowledge Format v0.1) — served for AI agents at /knowledge/
  if (existsSync(join(ROOT, 'knowledge'))) await cp(join(ROOT, 'knowledge'), join(OUT, 'knowledge'), { recursive: true });

  // machine files
  await writeFile(join(OUT, 'sitemap.xml'), sitemapXml(pages), 'utf8');
  await writeFile(join(OUT, 'robots.txt'), robotsTxt(), 'utf8');
  await writeFile(join(OUT, 'CNAME'), 'companydossier.lol\n', 'utf8');
  await writeFile(join(OUT, 'favicon.svg'), FAVICON, 'utf8');
  await writeFile(join(OUT, 'og.svg'), OG_SVG, 'utf8');
  await writeFile(join(OUT, '.nojekyll'), '', 'utf8');

  // llms.txt — site-specific, generated from the page list (GEO/AI discoverability)
  await writeFile(join(OUT, 'llms.txt'), llmsTxt(pages), 'utf8');

  // PWA: manifest + service worker
  await writeFile(join(OUT, 'site.webmanifest'), webmanifest(), 'utf8');
  await writeFile(join(OUT, 'sw.js'), serviceWorker(), 'utf8');

  // RSS feed (blog) + IndexNow key file
  await writeFile(join(OUT, 'feed.xml'), rssXml(pages), 'utf8');
  await writeFile(join(OUT, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY, 'utf8');

  // security.txt (RFC 9116)
  const secDir = join(OUT, '.well-known');
  await mkdir(secDir, { recursive: true });
  const oneYear = new Date(Date.now() + 365 * 864e5).toISOString().slice(0, 10);
  await writeFile(join(secDir, 'security.txt'),
    `Contact: https://github.com/ever-just/company-dossier/security/advisories/new\nExpires: ${oneYear}T00:00:00.000Z\nPreferred-Languages: en\nCanonical: ${SITE.origin}/.well-known/security.txt\nPolicy: ${SITE.origin}/security/\n`, 'utf8');

  // icons dir (PNGs are rasterized in CI by render-og.mjs; ensure dir exists)
  await mkdir(join(OUT, 'icons'), { recursive: true });

  console.log(`Built ${pages.length} pages -> docs/`);
  for (const p of pages) console.log('  ' + p.path);
}

main().catch(e => { console.error(e); process.exit(1); });
