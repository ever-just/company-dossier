import { SITE, icon } from '../lib.mjs';

const swatches = [
  { name: 'Ink', varn: '--ink', hex: '#15130f', role: 'Primary line, body text, all strokes', dark: true },
  { name: 'Paper', varn: '--paper', hex: '#f5f1e6', role: 'Page background' },
  { name: 'Paper 2', varn: '--paper-2', hex: '#fbf9f2', role: 'Cards and raised surfaces' },
  { name: 'Paper 3', varn: '--paper-3', hex: '#efe9da', role: 'Recessed / alternate sections', dark: false },
  { name: 'Smudge', varn: '--smudge', hex: '#574f3f', role: 'Secondary text', dark: true },
  { name: 'Flag', varn: '--flag', hex: '#7a1f12', role: 'Sparing alert / risk accent', dark: true },
];

const swatchHtml = swatches.map(s =>
  `<div class="bk-swatch sk">
    <div class="bk-chip" style="background:var(${s.varn});color:${s.dark ? 'var(--paper)' : 'var(--ink)'}">${s.hex}</div>
    <div class="bk-chip-meta">
      <b>${s.name}</b>
      <code>var(${s.varn})</code>
      <span>${s.role}</span>
    </div>
  </div>`).join('\n');

const types = [
  { name: 'Permanent Marker', cls: 'marker', role: 'Display', use: 'Big headlines, the marquee voice. Use sparingly — it shouts.', sample: 'Open a file on any company.' },
  { name: 'Architects Daughter', cls: 'draft', role: 'Headings & UI', use: 'Section titles, buttons, card headers — the workhorse hand.', sample: 'Anatomy of a dossier' },
  { name: 'Caveat', cls: 'hand', role: 'Accents', use: 'Margin notes, labels on diagrams, asides. The pencil scribble.', sample: 'seven streams in. one file out.' },
  { name: 'Courier Prime', cls: 'type', role: 'Body & mono', use: 'Body copy, code, meta lines, stamps. The case-file typewriter.', sample: 'Public information only — every line sourced.' },
];

const typeHtml = types.map(t =>
  `<div class="bk-type sk">
    <div class="bk-type-head">
      <span class="tab">${t.role}</span>
      <code>var(--f-${t.cls})</code>
    </div>
    <div class="bk-specimen ${t.cls}">${t.sample}</div>
    <div class="bk-type-meta"><b>${t.name}</b><span>${t.use}</span></div>
  </div>`).join('\n');

const voice = [
  { p: 'Lead with the outcome.', ex: '"Read the whole company in minutes" — not "a tool that aggregates data sources."' },
  { p: 'Plain and confident.', ex: 'Short sentences, no hedging, no jargon. Say what it does and stop.' },
  { p: 'Lightly noir.', ex: 'Case-file flavor — "open a file," "the money trail," "risk flags" — never cartoonish.' },
  { p: 'Sourced and honest.', ex: '"A starting map, not the last word. Verify before you act."' },
  { p: 'Public-record proud.', ex: '"Nothing you couldn\'t find yourself — just gathered for you."' },
];

const voiceHtml = voice.map(v =>
  `<article class="cell sk reveal"><h3>${v.p}</h3><p>${v.ex}</p></article>`).join('\n');

const lockup = `<svg class="bk-lockup-svg" viewBox="0 0 360 80" role="img" aria-label="Company Dossier logo lockup">
  <g color="var(--ink)" transform="translate(8 8) scale(1)">
    <svg x="0" y="0" width="64" height="64" viewBox="0 0 64 64"><use href="#i-logo"/></svg>
  </g>
  <text x="86" y="40" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="27" fill="var(--ink)">Company</text>
  <text x="86" y="68" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="27" fill="var(--ink)">Dossier</text>
</svg>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">brand kit</span>
    <h1>The Company Dossier brand.</h1>
    <p class="lede">The mark, the palette, the type and the voice — plus the source files to use them. Hand-drawn field-intelligence, kept consistent.</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="wrap">
    <div class="head reveal"><span class="tab">section 01 — the mark</span><h2 class="marker">The logo</h2><p>A case file with a magnifying glass: search any company's file. Monoline, drawn in ink, scales from a 16px favicon to a 512px tile.</p></div>
    <div class="bk-logo-row">
      <div class="bk-logo-cell sk">
        ${icon('i-logo', 'ic')}
        <div class="bk-cap">The mark</div>
      </div>
      <div class="bk-logo-cell sk bk-lockup">
        ${lockup}
        <div class="bk-cap">The lockup</div>
      </div>
    </div>
    <p class="bk-note"><b>Clear space:</b> keep at least the height of the magnifying-glass lens clear on every side. <b>Minimum size:</b> 24px for the mark, 120px wide for the lockup — below that the lens fill stops reading.</p>
    <div class="bk-do-grid">
      <div class="bk-do sk">
        <span class="tab">do</span>
        <ul>
          <li>Use the mark in ink on a paper background.</li>
          <li>Let it breathe — respect the clear space.</li>
          <li>Recolor as a single flat color when you must (it's one ink line).</li>
        </ul>
      </div>
      <div class="bk-do bk-dont sk">
        <span class="tab">don't</span>
        <ul>
          <li>Don't stretch, rotate or add drop shadows.</li>
          <li>Don't place it on a busy or low-contrast background.</li>
          <li>Don't recolor the wordmark or swap its serif.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="head reveal"><span class="tab">section 02 — the palette</span><h2 class="marker">Color</h2><p>Warm paper, near-black ink, one red flag for risk. That's the whole world.</p></div>
    <div class="bk-swatches">
      ${swatchHtml}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="head reveal"><span class="tab">section 03 — the type</span><h2 class="marker">Typography</h2><p>Four hands, four jobs. Marker shouts, draft works, caveat scribbles, courier files.</p></div>
    <div class="bk-types">
      ${typeHtml}
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="head reveal"><span class="tab">section 04 — the voice</span><h2 class="marker">Voice &amp; tone</h2><p>Field intelligence on paper: plain, confident, lightly noir, always sourced.</p></div>
    <div class="grid3" style="margin-top:30px">
      ${voiceHtml}
    </div>
  </div>
</section>

<section class="sec">
  <div class="narrow">
    <div class="head center reveal"><span class="tab fill">downloads</span><h2 class="marker">Take the source files</h2><p style="margin-left:auto;margin-right:auto">Standalone, scalable, ready to drop in.</p></div>
    <div class="bk-downloads">
      <a class="btn" href="/assets/brand/logo-mark.svg" download>Logo mark <span class="bk-ext">SVG</span></a>
      <a class="btn" href="/assets/brand/logo-lockup.svg" download>Logo lockup <span class="bk-ext">SVG</span></a>
      <a class="btn" href="/favicon.svg" download>Favicon <span class="bk-ext">SVG</span></a>
      <a class="btn" href="/og.png" download>Social card <span class="bk-ext">PNG</span></a>
    </div>
    <p class="bk-note" style="text-align:center">Public, free to use when referencing Company Dossier. Don't alter the mark or imply endorsement.</p>
  </div>
</section>
`;

export default {
  path: '/brand/',
  priority: '0.6',
  changefreq: 'yearly',
  breadcrumbs: [{ href: '/brand/', label: 'Brand' }],
  head: '<link rel="stylesheet" href="/assets/brandkit.css" />',
  title: 'Brand kit — Company Dossier logo, colors, type & voice',
  description: 'The Company Dossier brand kit: the logo mark and lockup, the case-file color palette with hex values, the four typefaces and their roles, the voice and tone, and downloadable SVG assets.',
  ogType: 'article',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Brand', item: SITE.origin + '/brand/' },
      ],
    },
  ],
  body,
};
