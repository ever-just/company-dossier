import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;
const ext = `<svg aria-hidden="true" viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;vertical-align:-3px"><path d="M14 4h6v6M20 4l-9 9M18 13v5a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h5"/></svg>`;

const steps = `<div class="steps">
  <article class="step sk reveal"><div class="big">1</div>${icon('i-glass')}<h3>Open everjust.app</h3><p>Load the web app in any browser — desktop or phone. Nothing to install.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v2 reveal"><div class="big">2</div>${icon('i-building')}<h3>Name the company</h3><p>Type a company name or paste its domain, then hit search.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v3 reveal"><div class="big">3</div>${icon('i-globe')}<h3>Signals get pulled</h3><p>Public sources are gathered and sorted into nine sourced sections.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v2 reveal"><div class="big">4</div>${icon('i-doc')}<h3>Read it in the tab</h3><p>Charts, an org sketch, a map and a timeline render right in the browser.</p></article>
</div>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">get it — web app</span>
    <h1>Company research in your browser.</h1>
    <p class="lede">The Company Dossier web app at <strong>everjust.app</strong> turns a company name into a complete, sourced profile — people, hiring, money, locations, tech, news and risk — without a single install. Open a tab, name a business, read the file. Free, public sources only.</p>
    <div class="cta-row" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:24px">
      <a class="btn solid" href="${SITE.webapp}" target="_blank" rel="noopener">Open everjust.app ${ext}</a>
      <a class="btn" href="/sample/">See a sample file</a>
    </div>
    <div class="pubnote" style="font-family:var(--f-type);font-size:.82rem;color:var(--smudge);margin-top:16px">Public information only — gathered for you, never bought or breached.</div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="head reveal">
      <span class="tab">how it works in the browser</span>
      <h2 class="marker">From a name to a finished file</h2>
      <p>No accounts to wire up, no CLI to learn. The web app is the path of least resistance for company research and competitive intelligence — open it and go.</p>
    </div>
    ${steps}
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">what you get</span>
      <h2 class="marker">A full company profile, rendered</h2>
    </div>
    <div class="prose reveal">
      <p>Every dossier the web app produces is the same comprehensive, nine-section file you'd get from the CLI or the VS Code extension — just drawn for the screen. You don't read a wall of links; you read a profile.</p>
      <ul>
        <li><strong>Overview &amp; identity</strong> — what the company does, when it started, who owns it, and how big it is.</li>
        <li><strong>People &amp; org chart</strong> — leadership and a sketch of how the org is shaped.</li>
        <li><strong>Hiring radar</strong> — open roles and where headcount is quietly growing.</li>
        <li><strong>Money trail</strong> — funding, investors, filings and revenue signals.</li>
        <li><strong>Locations</strong> — headquarters and offices, plotted on a map.</li>
        <li><strong>Tech fingerprint</strong> — the stack they build on and the tools they run.</li>
        <li><strong>News &amp; timeline</strong> — press and milestones as a dated story.</li>
        <li><strong>Relationship web</strong> — customers, partners and rivals as a network.</li>
        <li><strong>Risk flags</strong> — lawsuits, layoffs and reputation notes worth a second look.</li>
      </ul>
      <p>Because it runs in the browser, the web app is the easiest way to share a finding with a teammate, pull up a company profile before a sales call, or do quick competitive intelligence from a Chromebook, a borrowed laptop or your phone. There's nothing to maintain and nothing to update — you always get the current engine.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">good to know</span>
      <h2 class="marker">Questions, answered</h2>
    </div>
    <div class="faq">
      <article class="qa sk reveal"><h3><span class="marker">Q.</span> Do I need to install anything?</h3><p>No. The web app runs entirely in your browser at everjust.app. There's nothing to download, no extension to add, and no command line involved.</p></article>
      <article class="qa sk v2 reveal"><h3><span class="marker">Q.</span> Is the web app really free?</h3><p>Yes. Company Dossier is free and built from public sources. The web app is just the most convenient front door to the same engine.</p></article>
      <article class="qa sk v3 reveal"><h3><span class="marker">Q.</span> Where does the data come from?</h3><p>Public sources only — job boards, filings, news and the open web. The target company doesn't need to be involved, logged in, or aware.</p></article>
      <article class="qa sk reveal"><h3><span class="marker">Q.</span> Is it the same as the CLI and extension?</h3><p>Same nine-section file, every route. If you'd rather work in your editor or a terminal, the <a href="/vscode-extension/" style="text-decoration:none;border-bottom:2px solid var(--faint)">VS Code extension</a> and <a href="/cli/" style="text-decoration:none;border-bottom:2px solid var(--faint)">npm CLI</a> produce identical dossiers.</p></article>
    </div>
    <div style="text-align:center;margin-top:30px" class="reveal">
      <a class="btn solid" href="${SITE.webapp}" target="_blank" rel="noopener">Open everjust.app ${ext}</a>
    </div>
  </div>
</section>

${ctaFinal('Open a file in your browser.', 'everjust.app · one search, the whole story, sourced.')}
`;

export default {
  path: '/web-app/',
  priority: '0.8',
  changefreq: 'monthly',
  active: '/get/',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }, { href: '/web-app/', label: 'Web app' }],
  title: 'Company Dossier web app — company research in your browser (everjust.app)',
  description: 'The Company Dossier web app at everjust.app builds a complete, sourced company profile in your browser — people, hiring, money, locations, tech, news and risk. Free, no install, public sources only.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Company Dossier (Web app)',
      applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
      url: SITE.webapp,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Browser-based company research tool that compiles a complete, sourced company profile from public sources into nine sections.',
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Get it', item: SITE.origin + '/get/' },
        { '@type': 'ListItem', position: 3, name: 'Web app', item: SITE.origin + '/web-app/' },
      ],
    },
  ],
  body,
};
