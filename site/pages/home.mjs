import { SITE, icon, SECTIONS, FAQ, ctaFinal, aiLauncher } from '../lib.mjs';

const sectionCards = SECTIONS.map((s, i) => {
  const v = ['', ' v2', ' v3'][i % 3];
  return `<article class="cell sk${v} reveal">
    ${i === 0 ? '<span class="tape" style="left:18px;top:-12px"></span>' : ''}
    ${icon(s.id)}
    <h3><span class="n">${i + 1}</span>${s.t}</h3>
    <p>${s.d}</p>
  </article>`;
}).join('\n');

const faqHtml = FAQ.map((f, i) => {
  const v = ['', ' v2', ' v3'][i % 3];
  return `<article class="qa sk${v} reveal"><h3><span class="marker">Q.</span> ${f.q}</h3><p>${f.a}</p></article>`;
}).join('\n');

const heroFig = `<div class="hero-fig ink-fig">
  <svg viewBox="0 0 560 460" role="img" aria-label="Hand-drawn open dossier folder with a magnifying glass over a building and a small network diagram" data-draw>
    <g class="rough" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <g>
        <circle class="dr" pathLength="1" cx="470" cy="58" r="9"/>
        <circle class="dr" pathLength="1" cx="430" cy="110" r="7"/>
        <circle class="dr" pathLength="1" cx="510" cy="116" r="7"/>
        <circle class="dr" pathLength="1" cx="472" cy="150" r="6"/>
        <path class="dr d2" pathLength="1" d="M463 66 L435 103 M477 66 L504 110 M436 116 L466 146 M504 122 L478 146"/>
      </g>
      <path class="dr" pathLength="1" d="M70 168 h78 a6 6 0 0 1 5 3 l9 15 H452 a10 10 0 0 1 10 10 v210 a10 10 0 0 1 -10 10 H78 a10 10 0 0 1 -10 -10 V178 a10 10 0 0 1 2 -10z"/>
      <g transform="rotate(-4 250 250)">
        <path class="dr d2" pathLength="1" d="M120 150 h190 a6 6 0 0 1 6 6 v150 h-202 v-150 a6 6 0 0 1 6 -6z"/>
        <path class="dr d2" d="M150 182 h120 M150 200 h150 M150 218 h96"/>
        <path class="dr d3" d="M156 290 v-40 M156 290 h120"/>
        <path class="dr d3" d="M172 290 v-16 M196 290 v-26 M220 290 v-20 M244 290 v-34 M268 290 v-28"/>
      </g>
      <path class="dr" pathLength="1" d="M70 300 L250 286 q8 -0.6 12 5 l10 16 q4 6 12 5 L462 300 v118 a10 10 0 0 1 -10 10 H80 a10 10 0 0 1 -10 -10 z"/>
      <path class="dr d3" pathLength="1" d="M250 270 l-30 30 a10 10 0 0 0 14 14 l28 -28 a16 16 0 0 0 -22 -22 l-26 26 a22 22 0 0 0 0 6"/>
      <g>
        <circle class="dr d2" pathLength="1" cx="150" cy="372" r="60" fill="var(--paper-2)"/>
        <path class="dr d3" pathLength="1" d="M193 415 L236 456"/>
        <g stroke-width="2.4">
          <path class="dr d4" d="M132 402 V352 a2 2 0 0 1 2 -2 h22 a2 2 0 0 1 2 2 V402"/>
          <path class="dr d4" d="M158 402 V366 h14 a2 2 0 0 1 2 2 V402"/>
          <path class="dr d4" d="M118 402 H184"/>
          <path d="M139 360h4 M150 360h4 M139 372h4 M150 372h4 M139 384h4 M150 384h4 M164 372h3 M164 384h3"/>
        </g>
      </g>
      <g transform="rotate(-13 380 250)" opacity="0.6">
        <rect class="dr d4" pathLength="1" x="320" y="226" width="120" height="46" rx="8" stroke-width="3"/>
      </g>
    </g>
  </svg>
  <div class="stamp" style="position:absolute;right:6%;top:40%;">Confidential</div>
</div>`;

const corkboard = `<div class="board ink-fig reveal">
  <svg viewBox="0 0 760 360" role="img" aria-label="A corkboard string diagram connecting public sources to a central dossier" data-draw>
    <g class="rough" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path class="dr d2" pathLength="1" d="M380 180 C300 120 230 110 150 92"/>
      <path class="dr d2" pathLength="1" d="M380 180 C320 100 360 70 380 56"/>
      <path class="dr d2" pathLength="1" d="M380 180 C460 116 540 110 610 92"/>
      <path class="dr d3" pathLength="1" d="M380 180 C300 220 220 250 140 270"/>
      <path class="dr d3" pathLength="1" d="M380 180 C380 250 380 280 380 300"/>
      <path class="dr d3" pathLength="1" d="M380 180 C460 220 540 250 620 270"/>
      <path class="dr d4" pathLength="1" d="M380 180 C470 200 560 196 640 186"/>
      <g>
        <circle class="dr" pathLength="1" cx="150" cy="92"  r="6" fill="currentColor"/>
        <circle class="dr" pathLength="1" cx="380" cy="56"  r="6" fill="currentColor"/>
        <circle class="dr" pathLength="1" cx="610" cy="92"  r="6" fill="currentColor"/>
        <circle class="dr" pathLength="1" cx="140" cy="270" r="6" fill="currentColor"/>
        <circle class="dr" pathLength="1" cx="380" cy="300" r="6" fill="currentColor"/>
        <circle class="dr" pathLength="1" cx="620" cy="270" r="6" fill="currentColor"/>
        <circle class="dr" pathLength="1" cx="640" cy="186" r="6" fill="currentColor"/>
      </g>
      <circle class="dr" pathLength="1" cx="380" cy="180" r="44" fill="var(--paper-2)" stroke-width="3"/>
      <path class="dr d2" pathLength="1" d="M356 166 h22 a3 3 0 0 1 2 1 l3 4 h22 a4 4 0 0 1 4 4 v22 a4 4 0 0 1 -4 4 h-50 a4 4 0 0 1 -4 -4 v-23 a4 4 0 0 1 3 -4z"/>
    </g>
    <g font-family="'Caveat',cursive" font-size="20" fill="currentColor" text-anchor="middle">
      <text x="150" y="80">job boards</text>
      <text x="380" y="42">public filings</text>
      <text x="610" y="80">news &amp; press</text>
      <text x="118" y="290">the open web</text>
      <text x="380" y="324">maps &amp; places</text>
      <text x="630" y="290">reviews</text>
      <text x="678" y="180">company site</text>
    </g>
    <g font-family="'Courier Prime',monospace" font-size="11" fill="currentColor" text-anchor="middle" font-weight="700" letter-spacing="1">
      <text x="380" y="236">DOSSIER</text>
    </g>
  </svg>
  <div class="src-note">seven streams in. one file out.</div>
</div>`;

const body = `
<section class="sec hero">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <div class="eyebrow">a complete file on any company —</div>
        <h1 class="hero-h">Open a file on<br>any company.</h1>
        <p class="lede">Company Dossier gathers the public record on a business — its people, hiring, money, locations, tech and headlines — and assembles it into one comprehensive, sourced dossier you can read in minutes.</p>
        <div class="cta-row">
          <a class="btn solid" href="/get/">Open a dossier <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg></a>
          <a class="btn" href="/sample/">See a sample file</a>
        </div>
        <div class="pubnote">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3l8 4v5c0 4-3 7-8 9-5-2-8-5-8-9V7z"/></svg>
          Public information only — nothing you couldn't find yourself, just gathered for you.
        </div>
      </div>
      ${heroFig}
    </div>
    <div class="scrollnote">
      <svg aria-hidden="true" viewBox="0 0 24 40"><path d="M12 4 V32 M5 25 l7 9 l7 -9"/></svg>
      everything below is in the file
    </div>
  </div>
</section>

<section class="sec" id="file">
  <div class="wrap">
    <div class="head center reveal">
      <span class="tab">section 01 — the file</span>
      <h2 class="marker">Anatomy of a dossier</h2>
      <p>Nine sections. One comprehensive file. Every line sourced. <a href="/what-is-a-company-dossier/" style="text-decoration:none;border-bottom:2px solid var(--ink)">What goes in a dossier →</a></p>
    </div>
    <div class="grid3" style="margin-top:34px">
      ${sectionCards}
    </div>
  </div>
</section>

<section class="sec alt" id="how">
  <div class="wrap">
    <div class="head reveal">
      <span class="tab">section 02 — the method</span>
      <h2 class="marker">From a name to a finished file</h2>
      <p>Four steps. You do the first one. The dossier does the rest. <a href="/how-it-works/" style="text-decoration:none;border-bottom:2px solid var(--ink)">See the full method →</a></p>
    </div>
    <div class="steps">
      <article class="step sk reveal"><div class="big">1</div>${icon('i-glass')}<h3>Name the company</h3><p>Type a company name or paste a domain. That's the whole brief.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
      <article class="step sk v2 reveal"><div class="big">2</div>${icon('i-globe')}<h3>We pull the signals</h3><p>Job boards, filings, news and the open web get gathered in one pass.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
      <article class="step sk v3 reveal"><div class="big">3</div>${icon('i-bolt')}<h3>The file assembles</h3><p>Everything is sorted, de-duped and sourced into nine clean sections.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
      <article class="step sk v2 reveal"><div class="big">4</div>${icon('i-doc')}<h3>Read it or export it</h3><p>Skim in minutes, then share it, save it, or drop it into your notes.</p></article>
    </div>
  </div>
</section>

<section class="sec" id="sample-teaser">
  <div class="wrap">
    <div class="head center reveal">
      <span class="tab fill">exhibit a — sample</span>
      <h2 class="marker">A page from the file</h2>
      <p style="margin-left:auto;margin-right:auto">Charts, an org sketch, a map and a timeline — all on one page, every claim sourced.</p>
    </div>
    <div style="text-align:center" class="reveal">
      <a class="btn solid" href="/sample/">Open the sample dossier <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg></a>
    </div>
  </div>
</section>

<section class="sec alt" id="sources">
  <div class="wrap">
    <div class="head center reveal">
      <span class="tab">section 04 — the evidence</span>
      <h2 class="marker">Pinned to the public record</h2>
      <p style="margin-left:auto;margin-right:auto">Nothing here is private. Each dossier is stitched together from sources anyone can reach — we just reach all of them at once.</p>
    </div>
    ${corkboard}
  </div>
</section>

<section class="tally">
  <div class="tally-grid">
    <div class="t reveal"><div class="num marker">9</div><div class="lab">sections per file</div></div>
    <div class="t reveal"><div class="num marker">1</div><div class="lab">search to begin</div></div>
    <div class="t reveal"><div class="num marker">100%</div><div class="lab">public sources</div></div>
    <div class="t reveal"><div class="num marker">4</div><div class="lab">ways to run it</div></div>
  </div>
</section>

<section class="sec" id="who">
  <div class="wrap">
    <div class="head center reveal">
      <span class="tab fill">section 05 — who opens files</span>
      <h2 class="marker">Built for anyone doing their homework</h2>
      <p style="margin-left:auto;margin-right:auto"><a href="/use-cases/" style="text-decoration:none;border-bottom:2px solid var(--ink)">See every use case →</a></p>
    </div>
    <div class="who">
      <a class="card sk reveal linkcard" href="/use-cases/sales/">${icon('i-bag')}<h3>Sales &amp; BD</h3><p>Walk into the call already knowing the room — and exactly where you fit.</p></a>
      <a class="card sk v2 reveal linkcard" href="/use-cases/recruiting/">${icon('i-people')}<h3>Recruiters</h3><p>Read a company end to end before you pitch it to a candidate.</p></a>
      <a class="card sk v3 reveal linkcard" href="/use-cases/investors/">${icon('i-coins')}<h3>Investors &amp; founders</h3><p>Size up a market, a target or a competitor without a week of tabs.</p></a>
      <a class="card sk reveal linkcard" href="/use-cases/journalists/">${icon('i-glass')}<h3>Journalists &amp; research</h3><p>Start an investigation with a map instead of a blank page.</p></a>
    </div>
  </div>
</section>

<section class="sec alt" id="faq">
  <div class="wrap">
    <div class="head center reveal"><span class="tab">the fine print</span><h2 class="marker">Questions, answered</h2></div>
    <div class="faq">${faqHtml}</div>
  </div>
</section>

<section class="sec" id="use-in-ai">
  <div class="wrap narrow">
    <div class="head center reveal" style="margin-bottom:24px">
      <span class="tab fill">section 06 — your ai, your file</span>
      <h2 class="marker">Run it in the AI you already use</h2>
      <p style="margin-left:auto;margin-right:auto">No key, no install — fire the dossier brief straight into ChatGPT, Claude, Perplexity, Gemini or Grok. <a href="/use-in-ai/" style="text-decoration:none;border-bottom:2px solid var(--ink)">More ways to use it →</a></p>
    </div>
    <div class="reveal">${aiLauncher()}</div>
  </div>
</section>

${ctaFinal('Open your first file.', 'pick a company. read the whole story in minutes.')}
`;

export default {
  path: '/',
  priority: '1.0',
  changefreq: 'weekly',
  active: '/',
  title: 'Company Dossier — open a complete, sourced file on any company',
  description: 'Company Dossier compiles a complete, sourced profile of any business — people, hiring, money, locations, tech, news and risk — from public signals into one file. Free. Web app, VS Code extension, CLI, and AI apps.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'Organization', name: 'EVERJUST', url: 'https://everjust.org',
      brand: { '@type': 'Brand', name: 'Company Dossier' },
      sameAs: [SITE.repo, SITE.repoVscode],
    },
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Company Dossier',
      applicationCategory: 'BusinessApplication', operatingSystem: 'Web, VS Code, CLI',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: SITE.origin,
      description: 'Compiles a complete, sourced intelligence dossier on any private company from public data sources.',
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
  body,
};
