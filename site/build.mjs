// Static site generator — no dependencies. Emits /docs from site/pages/*.mjs
import { readdir, mkdir, writeFile, rm, cp, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { page, SITE } from './lib.mjs';

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
- Canonical site: ${SITE.origin}
`;
}
  return `User-agent: *
Allow: /

# AI crawlers welcome — this site is meant to be cited.
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`;
}

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="#f5f1e6"/><g fill="none" stroke="#15130f" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 22 h16 a4 4 0 0 1 3 1.6 l2.4 3.4 H54 a3 3 0 0 1 3 3 V50 a3 3 0 0 1 -3 3 H10 a3 3 0 0 1 -3 -3 V25 a3 3 0 0 1 3 -3z"/><path d="M8 32 H56"/></g></svg>`;

const OG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#d9d2c1"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="#f5f1e6"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect x="40" y="40" width="1120" height="550" rx="22" fill="none" stroke="#15130f" stroke-width="6"/>
  <rect x="40" y="40" width="1120" height="64" rx="22" fill="#15130f"/>
  <text x="70" y="82" font-family="'Courier New',monospace" font-size="26" letter-spacing="8" fill="#f5f1e6">CONFIDENTIAL // CASE FILE // EVERJUST FIELD INTELLIGENCE</text>
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

  // machine files
  await writeFile(join(OUT, 'sitemap.xml'), sitemapXml(pages), 'utf8');
  await writeFile(join(OUT, 'robots.txt'), robotsTxt(), 'utf8');
  await writeFile(join(OUT, 'CNAME'), 'companydossier.lol\n', 'utf8');
  await writeFile(join(OUT, 'favicon.svg'), FAVICON, 'utf8');
  await writeFile(join(OUT, 'og.svg'), OG_SVG, 'utf8');
  await writeFile(join(OUT, '.nojekyll'), '', 'utf8');

  // llms.txt — site-specific, generated from the page list (GEO/AI discoverability)
  await writeFile(join(OUT, 'llms.txt'), llmsTxt(pages), 'utf8');

  console.log(`Built ${pages.length} pages -> docs/`);
  for (const p of pages) console.log('  ' + p.path);
}

main().catch(e => { console.error(e); process.exit(1); });
