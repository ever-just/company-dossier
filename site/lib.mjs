// Shared site library: layout, SEO head, header, footer, icon defs, helpers.
import { LOGO_SYMBOL } from './brand.mjs';
import { AI_ICON_DEFS, AI_ICON } from './ai-icons.mjs';
import { AI_ICON_COLOR_DEFS, AI_ICON_COLOR } from './ai-icons-color.mjs';

export const SITE = {
  origin: 'https://companydossier.lol',
  name: 'Company Dossier',
  tagline: 'a field intelligence tool',
  webapp: '/generate/',
  repo: 'https://github.com/ever-just/company-dossier',
  repoVscode: 'https://github.com/ever-just/company-dossier-vscode',
  ogImage: 'https://companydossier.lol/og.png',
};

// IndexNow key (public, not secret) — must match the hosted key file + the ping payload.
export const INDEXNOW_KEY = '8b1c4f7a9d2e4063b5a8c0e1f3d6a92b';

export const NAV = [
  { href: '/what-is-a-company-dossier/', label: 'What it is' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/features/', label: 'Features' },
  { href: '/use-cases/', label: 'Use cases' },
  { href: '/docs/', label: 'Docs' },
  { href: '/compare/', label: 'Compare' },
  { href: '/get/', label: 'Get it' },
];

// ---- icon symbol defs + rough filters (included on every page) ----
export const DEFS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <filter id="f-rough" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="turbulence" baseFrequency="0.016" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="f-rough-s" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" seed="4" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    ${LOGO_SYMBOL}
    ${AI_ICON_DEFS}
    ${AI_ICON_COLOR_DEFS}
    <symbol id="i-folder" viewBox="0 0 64 64"><path d="M8 18 h14 a4 4 0 0 1 3 1.6 l2.4 3.4 H54 a3 3 0 0 1 3 3 V50 a3 3 0 0 1 -3 3 H10 a3 3 0 0 1 -3 -3 V21 a3 3 0 0 1 1-3z"/><path d="M8 28 H56"/></symbol>
    <symbol id="i-building" viewBox="0 0 64 64"><path d="M14 54 V16 a2 2 0 0 1 2-2 h20 a2 2 0 0 1 2 2 V54"/><path d="M38 54 V26 h10 a2 2 0 0 1 2 2 V54"/><path d="M9 54 H55"/><path d="M20 22h4M28 22h4M20 30h4M28 30h4M20 38h4M28 38h4M43 32h3M43 40h3"/></symbol>
    <symbol id="i-org" viewBox="0 0 64 64"><rect x="25" y="9" width="14" height="9" rx="2"/><rect x="9" y="44" width="14" height="9" rx="2"/><rect x="25" y="44" width="14" height="9" rx="2"/><rect x="41" y="44" width="14" height="9" rx="2"/><path d="M32 18 V31 M16 44 V31 H48 V44 M32 31 V44"/></symbol>
    <symbol id="i-radar" viewBox="0 0 64 64"><path d="M32 32 m-22 0 a22 22 0 1 0 44 0"/><path d="M32 32 m-14 0 a14 14 0 0 1 28 0"/><path d="M32 32 m-7 0 a7 7 0 0 1 14 0"/><path d="M32 32 L52 18"/><circle cx="44" cy="22" r="3" fill="currentColor" stroke="none"/></symbol>
    <symbol id="i-coins" viewBox="0 0 64 64"><ellipse cx="28" cy="20" rx="16" ry="7"/><path d="M12 20 V32 a16 7 0 0 0 32 0 V20"/><path d="M12 32 v8 a16 7 0 0 0 32 0 v-8"/><path d="M40 44 a14 6 0 1 0 14 -10"/></symbol>
    <symbol id="i-pin" viewBox="0 0 64 64"><path d="M32 56 C20 40 16 33 16 25 a16 16 0 0 1 32 0 C48 33 44 40 32 56 Z"/><circle cx="32" cy="25" r="6"/></symbol>
    <symbol id="i-chip" viewBox="0 0 64 64"><rect x="18" y="18" width="28" height="28" rx="3"/><rect x="26" y="26" width="12" height="12" rx="2"/><path d="M26 18 V10 M38 18 V10 M26 54 V46 M38 54 V46 M18 26 H10 M18 38 H10 M54 26 H46 M54 38 H46"/></symbol>
    <symbol id="i-news" viewBox="0 0 64 64"><path d="M12 16 h32 a2 2 0 0 1 2 2 V48 a4 4 0 0 0 4 4 H16 a4 4 0 0 1 -4 -4 Z"/><path d="M46 24 h4 a2 2 0 0 1 2 2 V48 a4 4 0 0 1 -4 4"/><path d="M18 24 h12 v10 h-12 z M34 24 h6 M34 30 h6 M18 40 h22 M18 46 h22"/></symbol>
    <symbol id="i-web" viewBox="0 0 64 64"><circle cx="32" cy="14" r="5"/><circle cx="14" cy="40" r="5"/><circle cx="50" cy="40" r="5"/><circle cx="32" cy="52" r="5"/><path d="M32 19 L16 36 M32 19 L48 36 M18 42 L46 42 M17 44 L30 49 M47 44 L34 49"/></symbol>
    <symbol id="i-flag" viewBox="0 0 64 64"><path d="M18 54 V12"/><path d="M18 14 h26 l-6 8 l6 8 H18"/></symbol>
    <symbol id="i-glass" viewBox="0 0 64 64"><circle cx="28" cy="28" r="16"/><path d="M40 40 L54 54"/><path d="M22 28 a6 6 0 0 1 6 -6"/></symbol>
    <symbol id="i-doc" viewBox="0 0 64 64"><path d="M18 8 h20 l12 12 V54 a2 2 0 0 1 -2 2 H18 a2 2 0 0 1 -2 -2 V10 a2 2 0 0 1 2 -2z"/><path d="M38 8 V20 h12"/><path d="M24 30 h16 M24 38 h16 M24 46 h10"/></symbol>
    <symbol id="i-globe" viewBox="0 0 64 64"><circle cx="32" cy="32" r="22"/><path d="M10 32 H54 M32 10 V54"/><path d="M32 10 C18 22 18 42 32 54 M32 10 C46 22 46 42 32 54"/></symbol>
    <symbol id="i-bag" viewBox="0 0 64 64"><path d="M14 24 h36 l-3 28 a2 2 0 0 1 -2 2 H19 a2 2 0 0 1 -2 -2 Z"/><path d="M24 24 V18 a8 8 0 0 1 16 0 V24"/></symbol>
    <symbol id="i-code" viewBox="0 0 64 64"><rect x="8" y="14" width="48" height="36" rx="3"/><path d="M8 24 H56"/><path d="M24 33 l-6 6 l6 6 M40 33 l6 6 l-6 6 M34 30 l-4 18"/></symbol>
    <symbol id="i-browser" viewBox="0 0 64 64"><rect x="8" y="12" width="48" height="40" rx="3"/><path d="M8 24 H56"/><circle cx="15" cy="18" r="1.6" fill="currentColor" stroke="none"/><circle cx="21" cy="18" r="1.6" fill="currentColor" stroke="none"/><circle cx="27" cy="18" r="1.6" fill="currentColor" stroke="none"/><path d="M18 34 h28 M18 42 h20"/></symbol>
    <symbol id="i-people" viewBox="0 0 64 64"><circle cx="24" cy="22" r="8"/><path d="M10 50 a14 14 0 0 1 28 0"/><circle cx="44" cy="24" r="6"/><path d="M40 33 a12 12 0 0 1 14 13"/></symbol>
    <symbol id="i-check" viewBox="0 0 64 64"><path d="M14 34 l12 12 l24 -28"/></symbol>
    <symbol id="i-terminal" viewBox="0 0 64 64"><rect x="8" y="12" width="48" height="40" rx="3"/><path d="M18 26 l8 8 l-8 8 M32 42 h14"/></symbol>
    <symbol id="i-bot" viewBox="0 0 64 64"><rect x="14" y="20" width="36" height="28" rx="6"/><circle cx="26" cy="34" r="3" fill="currentColor" stroke="none"/><circle cx="38" cy="34" r="3" fill="currentColor" stroke="none"/><path d="M32 12 V20 M22 48 v6 M42 48 v6 M8 30 v8 M56 30 v8"/></symbol>
    <symbol id="i-scale" viewBox="0 0 64 64"><path d="M32 10 V52 M18 52 h28 M12 22 h40 M12 22 l-6 14 a8 8 0 0 0 12 0 z M52 22 l-6 14 a8 8 0 0 0 12 0 z M32 14 h0"/></symbol>
    <symbol id="i-map" viewBox="0 0 64 64"><path d="M24 12 L8 18 V52 l16 -6 16 6 16 -6 V12 l-16 6 z M24 12 v34 M40 18 v34"/></symbol>
    <symbol id="i-megaphone" viewBox="0 0 64 64"><path d="M10 28 v8 a3 3 0 0 0 3 3 h6 l4 12 h6 l-4 -12 L48 48 V16 L25 28 z M48 22 a8 8 0 0 1 0 20"/></symbol>
    <symbol id="i-shield" viewBox="0 0 64 64"><path d="M32 8 L52 16 v14 c0 14 -9 22 -20 26 -11 -4 -20 -12 -20 -26 V16 z"/><path d="M23 32 l6 6 l12 -14"/></symbol>
    <symbol id="i-book" viewBox="0 0 64 64"><path d="M32 16 C26 11 16 11 10 14 V50 c6 -3 16 -3 22 2 6 -5 16 -5 22 -2 V14 c-6 -3 -16 -3 -22 2z M32 18 V52"/></symbol>
    <symbol id="i-bolt" viewBox="0 0 64 64"><path d="M36 8 L18 36 h14 l-4 20 l18 -28 H46 z"/></symbol>
    <symbol id="i-lens-doc" viewBox="0 0 64 64"><path d="M16 10 h22 l10 10 V54 a2 2 0 0 1 -2 2 H16 a2 2 0 0 1 -2 -2 V12 a2 2 0 0 1 2 -2z"/><circle cx="30" cy="34" r="9"/><path d="M37 41 l8 8"/></symbol>
  </defs>
</svg>`;

export function icon(id, cls = 'ic rough-s') {
  return `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
}

export function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function arrowSvg() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;
}

function header(active) {
  const links = NAV.map(n =>
    `<a href="${n.href}"${active === n.href ? ' aria-current="page"' : ''}>${n.label}</a>`).join('\n      ');
  return `<header>
  <div class="strip">confidential&nbsp;//&nbsp;case file&nbsp;//&nbsp;field intelligence&nbsp;//&nbsp;do not redistribute</div>
  <nav class="nav">
    <a class="brand" href="/" aria-label="Company Dossier home">
      ${icon('i-logo', 'ic rough-s')}
      <span><b>Company Dossier</b><small>a field intelligence tool</small></span>
    </a>
    <div class="nav-links" id="primary-nav">
      ${links}
    </div>
    <div class="nav-actions">
      <a class="btn solid small" href="/generate/">Generate ${arrowSvg()}</a>
      <button class="nav-toggle" type="button" data-navtoggle aria-label="Toggle menu" aria-expanded="false" aria-controls="primary-nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
</header>`;
}

function footer() {
  return `<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-col" style="max-width:300px">
        <a class="brand" href="/" style="margin-bottom:10px">
          ${icon('i-logo', 'ic rough-s')}
          <span><b style="font-size:1.1rem">Company Dossier</b><small>a field intelligence tool</small></span>
        </a>
        <p style="font-family:var(--f-type);font-size:.86rem;color:var(--smudge);margin:8px 0 0">A complete, sourced file on any company — from the public record, in one place.</p>
        <div class="repo">
          <a href="${SITE.repo}" target="_blank" rel="noopener"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-1-2.6c3.1-.4 6.4-1.6 6.4-7A5.4 5.4 0 0020 4.8 5 5 0 0019.9 1S18.7.6 16 2.5a13.4 13.4 0 00-7 0C6.3.6 5.1 1 5.1 1A5 5 0 005 4.8 5.4 5.4 0 003.6 8.5c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 00-1 2.6V22"/></svg>core repo</a>
          <a href="${SITE.repoVscode}" target="_blank" rel="noopener"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-1-2.6c3.1-.4 6.4-1.6 6.4-7A5.4 5.4 0 0020 4.8 5 5 0 0019.9 1S18.7.6 16 2.5a13.4 13.4 0 00-7 0C6.3.6 5.1 1 5.1 1A5 5 0 005 4.8 5.4 5.4 0 003.6 8.5c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 00-1 2.6V22"/></svg>vs code repo</a>
        </div>
      </div>
      <div class="foot-col">
        <h4>The file</h4>
        <a href="/what-is-a-company-dossier/">What is a dossier</a>
        <a href="/how-it-works/">How it works</a>
        <a href="/features/">Features</a>
        <a href="/sample/">Sample dossier</a>
        <a href="/about/">About</a>
      </div>
      <div class="foot-col">
        <h4>Get it</h4>
        <a href="/generate/">Generate in browser</a>
        <a href="/use-in-ai/">Use in your AI</a>
        <a href="/web-app/">Web app</a>
        <a href="/vscode-extension/">VS Code extension</a>
        <a href="/cli/">CLI &amp; npm</a>
        <a href="/chatgpt/">ChatGPT app</a>
        <a href="/claude/">Claude app &amp; skill</a>
        <a href="/pricing/">Pricing</a>
      </div>
      <div class="foot-col">
        <h4>Learn</h4>
        <a href="/docs/">Documentation</a>
        <a href="/blog/">Blog</a>
        <a href="/use-cases/">Use cases</a>
        <a href="/glossary/">Glossary</a>
        <a href="/faq/">FAQ</a>
        <a href="/knowledge/index.md">Knowledge (OKF)</a>
        <a href="/brand/">Brand kit</a>
      </div>
      <div class="foot-col">
        <h4>Compare</h4>
        <a href="/compare/">All comparisons</a>
        <a href="/sitemap/">Sitemap</a>
        <a href="/generate/">Generate a dossier</a>
      </div>
    </div>
    <div class="foot-fine">Public information only · A dossier is a starting map — always verify before you act. · <a href="/sitemap.xml" style="border-bottom:1px solid var(--faint);text-decoration:none">sitemap.xml</a> · <a href="/llms.txt" style="border-bottom:1px solid var(--faint);text-decoration:none">llms.txt</a></div>
    <div class="foot-fine">Operated by EverJust · <a href="/privacy/" style="border-bottom:1px solid var(--faint);text-decoration:none">Privacy Policy</a> · <a href="/terms/" style="border-bottom:1px solid var(--faint);text-decoration:none">Terms of Service</a> · <a href="mailto:company@everjust.co" style="border-bottom:1px solid var(--faint);text-decoration:none">company@everjust.co</a></div>
  </div>
</footer>`;
}

function crumbs(items) {
  if (!items || !items.length) return '';
  const parts = [`<a href="/">Home</a>`];
  items.forEach((c, i) => {
    parts.push('<span>/</span>');
    if (i === items.length - 1) parts.push(c.label);
    else parts.push(`<a href="${c.href}">${c.label}</a>`);
  });
  return `<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb">${parts.join('')}</nav></div>`;
}

// Build full page HTML.
// opts: {path, title, description, body, active, breadcrumbs, jsonld[], ogType}
export function page(opts) {
  const url = SITE.origin + opts.path;
  const title = opts.title;
  const desc = opts.description;
  const ld = (opts.jsonld || []).map(jsonLd).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="color-scheme" content="light" />
<meta name="referrer" content="no-referrer" />
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; connect-src 'self' https://api.anthropic.com https://api.github.com; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" />
<meta name="theme-color" content="#f5f1e6" />
<title>${title}</title>
<meta name="description" content="${desc}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="${opts.ogType || 'website'}" />
<meta property="og:site_name" content="Company Dossier" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${SITE.ogImage}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${SITE.ogImage}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<link rel="alternate" type="application/rss+xml" title="Company Dossier — Blog" href="/feed.xml" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Architects+Daughter&family=Caveat:wght@500;600;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/assets/styles.css" />
${opts.head || ''}
${ld}
</head>
<body>
${DEFS}
${header(opts.active)}
${crumbs(opts.breadcrumbs)}
${opts.body}
${footer()}
<script src="/assets/main.js" defer></script>
${opts.bodyEnd || ''}
</body>
</html>`;
}

// Reusable content blocks ------------------------------------------------
export function ctaFinal(heading, sub) {
  return `<section class="sec cta-final">
  <div class="wrap">
    <div class="cta-card sk reveal">
      <span class="tape" style="left:50%;top:-13px;transform:translateX(-50%) rotate(-3deg);width:140px"></span>
      <div class="stamp" style="position:absolute;left:24px;bottom:18px;transform:rotate(-8deg)">Open me</div>
      <h2 class="marker">${heading}</h2>
      <p class="hand" style="font-size:1.5rem;color:var(--smudge);margin-top:10px">${sub}</p>
      <div class="cta-row">
        <a class="btn solid" href="/get/">Open a dossier ${arrowSvg()}</a>
        <a class="btn" href="/sample/">Read a real dossier</a>
      </div>
    </div>
  </div>
</section>`;
}

// "Send to your AI" launcher — opens a top model with a ready-to-run dossier prompt.
// URL templates use {Q} for the encoded prompt. autorun = the tool runs the query
// itself on open (Perplexity, Grok). copyfirst = no reliable prefill, so we copy the
// prompt and open the bare app for the user to paste (Claude's web ?q= was removed
// Oct 2025; Gemini has no param). ChatGPT prefills but no longer auto-submits external
// clicks (anti-injection, Jul 2025) — the user presses Enter. Verified June 2026.
export const AI_MODELS = [
  { name: 'ChatGPT', url: 'https://chatgpt.com/?q={Q}&hints=search', copyfirst: false, autorun: false, hint: 'fills the prompt — press Enter' },
  { name: 'Claude', url: 'https://claude.ai/new', copyfirst: true, autorun: false, hint: 'opens Claude — paste & send' },
  { name: 'Perplexity', url: 'https://www.perplexity.ai/search?q={Q}', copyfirst: false, autorun: true, hint: 'runs automatically' },
  { name: 'Gemini', url: 'https://gemini.google.com/app', copyfirst: true, autorun: false, hint: 'opens Gemini — paste & send' },
  { name: 'Grok', url: 'https://grok.com/?q={Q}', copyfirst: false, autorun: true, hint: 'runs automatically' },
];

export function aiLauncher({ heading = 'Use Company Dossier in your favorite AI', sub = 'Pick a model — it opens with a ready-to-run dossier prompt. No key, no install.', compact = false } = {}) {
  const btns = AI_MODELS.map(m =>
    `<button class="ai-btn" type="button" data-ai-go data-ai-name="${m.name}" data-ai-url="${m.url}" data-ai-copyfirst="${m.copyfirst ? '1' : '0'}" data-ai-autorun="${m.autorun ? '1' : '0'}" title="${m.name} — ${m.hint}">
      <svg class="ai-btn-ic ai-btn-ic-color" viewBox="0 0 24 24" aria-hidden="true"><use href="#${AI_ICON_COLOR[m.name]}"/></svg>
      <span class="ai-btn-name">${m.name}</span>
    </button>`).join('\n      ');
  const devPrompt = encodeURIComponent('Read this repo and explain how the Company Dossier engine and the build_dossier MCP tool work, then help me run it.');
  return `<div class="ai-launch sk${compact ? ' compact' : ''}" data-ai-launcher>
    ${compact ? '' : `<div class="ai-launch-head"><span class="tab">zero setup</span><h3 class="draft">${heading}</h3><p>${sub}</p></div>`}
    <label class="ai-input-wrap">
      <span class="ai-input-label">Company name or domain</span>
      <input type="text" data-ai-input placeholder="e.g. Stripe or stripe.com" autocomplete="organization" spellcheck="false" />
    </label>
    <div class="ai-models">
      ${btns}
    </div>
    <div class="ai-launch-foot">
      <button class="btn small" type="button" data-ai-copy>Copy the prompt</button>
      <span class="ai-status" data-ai-status role="status" aria-live="polite"></span>
    </div>
    <div class="ai-promptbox" data-ai-promptbox hidden>
      <div class="ai-promptbox-head">The exact prompt <span>— if it didn't auto-fill, paste this</span></div>
      <textarea class="ai-promptbox-text" data-ai-prompt rows="6" readonly aria-label="The dossier prompt"></textarea>
    </div>
    <p class="ai-note">Opens your chosen AI in a new tab. <b>Perplexity</b> &amp; <b>Grok</b> run it automatically; <b>ChatGPT</b> fills the prompt (press Enter); <b>Claude</b> &amp; <b>Gemini</b> open with the prompt copied — just paste. The full prompt is always copied to your clipboard as a backup, and shown above after you click.</p>
    ${compact ? '' : `<div class="ai-dev">
      <span class="ai-dev-label">On your computer:</span>
      <button class="ai-dev-btn" type="button" data-ai-go data-ai-name="Claude Code" data-ai-url="claude-cli://open?q={Q}" data-ai-copyfirst="0" data-ai-autorun="0" title="Open the local Claude Code CLI with the prompt prefilled">Claude&nbsp;Code</button>
      <button class="ai-dev-btn" type="button" data-ai-go data-ai-name="Codex" data-ai-url="codex://new?prompt={Q}" data-ai-copyfirst="0" data-ai-autorun="0" title="Open the local Codex app with the prompt prefilled">Codex</button>
      <a class="ai-dev-link" href="https://claude.ai/code?repositories=ever-just/company-dossier&amp;prompt=${devPrompt}" target="_blank" rel="noopener">repo in Claude&nbsp;Code (web) →</a>
    </div>
    <p class="ai-note ai-note-sub">Claude&nbsp;Code &amp; Codex open the agent installed on your machine with the prompt ready — press Enter to run. (Requires them installed; the prompt is copied as a backup.)</p>`}
  </div>`;
}

export const SECTIONS = [
  { id: 'i-building', t: 'Overview & identity', d: 'What the company does, when it started, who owns it, how big it is, and the brand it goes to market under.' },
  { id: 'i-org', t: 'People & org chart', d: 'Leadership, notable hires and a sketch of how the org is shaped — who reports into whom, and where the depth is.' },
  { id: 'i-radar', t: 'Hiring radar', d: "Open roles pulled from the job boards, what they're hiring for, and where headcount is quietly growing." },
  { id: 'i-coins', t: 'Money trail', d: 'Funding rounds, investors, public filings and revenue signals — the financial shape, as far as the record shows.' },
  { id: 'i-pin', t: 'Locations', d: 'Headquarters and offices, plotted on a map, so you can see the footprint at a glance instead of reading addresses.' },
  { id: 'i-chip', t: 'Tech fingerprint', d: 'The stack they build on and the tools they run — useful for a pitch, a partnership, or sizing up a competitor.' },
  { id: 'i-news', t: 'News & timeline', d: "Press, launches and milestones laid out as a dated timeline — the company's story, in order." },
  { id: 'i-web', t: 'Relationship web', d: 'Customers, partners and rivals drawn as a network, so you can read the company by the company it keeps.' },
  { id: 'i-flag', t: 'Risk flags', d: 'Lawsuits, layoffs and reputation notes worth a second look — surfaced, not buried, so nothing surprises you later.' },
];

export const FAQ = [
  { q: 'Where does the data come from?', a: 'Public sources only — job boards, filings, news and the open web. No private data, and the target company doesn\'t need to be logged in or involved.' },
  { q: 'How accurate is it?', a: 'Every section points back to where it came from, so you can verify a line and dig deeper. Treat a dossier as a fast, honest starting map — not the last word.' },
  { q: 'Is it free?', a: 'Yes. The methodology and tooling are open and free to use, and the dossier itself is built from public sources at no cost.' },
  { q: 'Can I use it inside my editor?', a: 'Yes. There\'s a VS Code extension and an npm CLI, so you can generate and read dossiers without leaving your code. The web app is there when you\'d rather stay in the browser.' },
  { q: 'Is it legal?', a: 'Yes. Public sources only — no unauthorized access, no login bypass, no social engineering. It gathers what anyone could find, just faster.' },
];
