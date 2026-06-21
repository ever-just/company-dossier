import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

const quickStart = `<div class="term reveal" role="img" aria-label="Terminal showing npx company-dossier acme.com and a global install">
<span class="c"># fastest path — no install, one command</span>
<span class="p">$ <b>npx company-dossier acme.com</b></span>
<span class="c">› gathering public signals for acme.com …</span>
<span class="c">› overview · people · hiring · money · locations · tech · news · web · risk</span>
<span class="p">✓ dossier written — ./acme.com-dossier/ (9 sections + dossier.json)</span>
<span class="c"></span>
<span class="c"># prefer it on your PATH? install it globally</span>
<span class="p">$ <b>npm i -g company-dossier</b></span>
<span class="p">$ <b>company-dossier "Acme Corp"</b></span>
</div>`;

const libBlock = `<div class="term reveal" role="img" aria-label="Node code importing buildDossier from company-dossier">
<span class="c">// use it as a library inside your own tooling</span>
<span class="p"><b>import { buildDossier } from 'company-dossier'</b></span>
<span class="c"></span>
<span class="p">const dossier = await buildDossier('acme.com')</span>
<span class="p">console.log(dossier.sections.money)   <span class="c">// funding, filings, signals</span></span>
<span class="p">writeFileSync('acme.json', JSON.stringify(dossier))</span>
</div>`;

const outBlock = `<div class="term reveal" role="img" aria-label="The folder layout a dossier writes to disk">
<span class="c"># what lands on disk</span>
<span class="p">acme.com-dossier/</span>
<span class="p"> ├ 01-overview.md      <span class="c"># overview &amp; identity</span></span>
<span class="p"> ├ 02-people.md        <span class="c"># people &amp; org chart</span></span>
<span class="p"> ├ 03-hiring.md        <span class="c"># hiring radar</span></span>
<span class="p"> ├ 04-money.md         <span class="c"># money trail</span></span>
<span class="p"> ├ 05-locations.md     <span class="c"># locations</span></span>
<span class="p"> ├ 06-tech.md          <span class="c"># tech fingerprint</span></span>
<span class="p"> ├ 07-news.md          <span class="c"># news &amp; timeline</span></span>
<span class="p"> ├ 08-web.md           <span class="c"># relationship web</span></span>
<span class="p"> ├ 09-risk.md          <span class="c"># risk flags</span></span>
<span class="p"> └ dossier.json        <span class="c"># the whole file, machine-readable</span></span>
</div>`;

const ciBlock = `<div class="term reveal" role="img" aria-label="Using company-dossier inside a shell script or CI job">
<span class="c"># drop it into a pipeline, an agent, or a cron job</span>
<span class="p">$ <b>npx company-dossier $DOMAIN --json</b> > dossier.json</span>
<span class="p">$ <b>cat leads.txt | xargs -n1 npx company-dossier</b></span>
<span class="c">› one file per company, ready to ingest downstream</span>
</div>`;

const envBlock = `<div class="term reveal" role="img" aria-label="Optional environment variables for API keys">
<span class="c"># optional — keys only widen the public sources reached</span>
<span class="p">$ <b>export NEWS_API_KEY=…</b>    <span class="c"># richer news &amp; timeline</span></span>
<span class="p">$ <b>export SEARCH_API_KEY=…</b>  <span class="c"># deeper open-web sweep</span></span>
<span class="p">$ <b>npx company-dossier acme.com</b></span>
<span class="c">› runs fine with none set — keys just turn up the signal</span>
</div>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">get it — cli &amp; npm</span>
    <h1>Company research from the command line.</h1>
    <p class="lede">The <code>company-dossier</code> npm package is a company research CLI and library. Point it at a name or a domain and it writes a complete, sourced dossier — the same nine sections you get everywhere else — straight to disk, plus a machine-readable <code>dossier.json</code>. Free, public sources only, scriptable to the core.</p>
    <div class="cta-row" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:24px">
      <a class="btn solid" href="${SITE.repo}" target="_blank" rel="noopener">View on GitHub ${arrow}</a>
      <a class="btn" href="/sample/">See a sample file</a>
    </div>
    <div class="pubnote" style="font-family:var(--f-type);font-size:.82rem;color:var(--smudge);margin-top:16px">OSINT cli, public information only — nothing you couldn't find yourself, just gathered for you.</div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">quick start</span>
      <h2 class="marker">One command to a finished file</h2>
      <p style="margin-left:auto;margin-right:auto">No account, no config. Run it with <code>npx</code>, or install it globally if you'll reach for it often.</p>
    </div>
    ${quickStart}
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">as a library</span>
      <h2 class="marker">import { buildDossier }</h2>
      <p style="margin-left:auto;margin-right:auto">Need the data, not the terminal output? The package exports <code>buildDossier</code> so you can fold company research into your own tools, dashboards or agents.</p>
    </div>
    ${libBlock}
    <div class="prose reveal" style="margin-top:24px">
      <p><code>buildDossier(nameOrDomain)</code> resolves to a structured object — the same nine sections, each with its sourced claims — so you can render it, store it, or hand it to an LLM as context. The CLI is just a thin wrapper around this call.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">the output</span>
      <h2 class="marker">A markdown folder + dossier.json</h2>
      <p style="margin-left:auto;margin-right:auto">Every run produces two things: a folder of nine readable markdown sections, and one <code>dossier.json</code> that holds the whole file in a machine-readable shape.</p>
    </div>
    ${outBlock}
    <div class="prose reveal" style="margin-top:24px">
      <p>The markdown is for humans — open it in your editor, skim it, paste a section into a brief. The <code>dossier.json</code> is for everything else: diff two runs over time, feed it to a model, or load it into a database. Same nine sections, every claim pointed back to its public source.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">in the wild</span>
      <h2 class="marker">Use it in CI, agents &amp; scripts</h2>
      <p style="margin-left:auto;margin-right:auto">Because it's a single command that returns structured data, the company data npm package slots into whatever you've already built.</p>
    </div>
    ${ciBlock}
    <div class="prose reveal" style="margin-top:24px">
      <ul>
        <li><strong>CI / scheduled jobs</strong> — refresh a dossier on a cron and commit the diff.</li>
        <li><strong>AI agents</strong> — call the CLI or <code>buildDossier</code> as a tool and let the agent reason over the result. It's what powers the ChatGPT and Claude integrations.</li>
        <li><strong>Batch scripts</strong> — pipe a list of domains in, get one sourced file per company out.</li>
      </ul>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">configuration</span>
      <h2 class="marker">Optional API keys</h2>
      <p style="margin-left:auto;margin-right:auto">The CLI runs with zero configuration. Optional environment variables only widen the public sources it can reach — they never unlock anything private.</p>
    </div>
    ${envBlock}
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">good to know</span>
      <h2 class="marker">Questions, answered</h2>
    </div>
    <div class="faq">
      <article class="qa sk reveal"><h3><span class="marker">Q.</span> Do I need to install it?</h3><p>No. <code>npx company-dossier &lt;company-or-domain&gt;</code> runs it without a global install. If you'll use it daily, <code>npm i -g company-dossier</code> puts it on your PATH.</p></article>
      <article class="qa sk v2 reveal"><h3><span class="marker">Q.</span> Is the output the same as the web app?</h3><p>Same nine-section file. The <a href="/web-app/" style="text-decoration:none;border-bottom:2px solid var(--faint)">web app</a> renders it for the screen; the CLI writes it to disk as markdown plus a <code>dossier.json</code>.</p></article>
      <article class="qa sk v3 reveal"><h3><span class="marker">Q.</span> Where does the data come from?</h3><p>Public sources only — job boards, filings, news and the open web. No private data, no login bypass. Optional API keys just widen the sweep.</p></article>
    </div>
    <div style="text-align:center;margin-top:30px" class="reveal">
      <a class="btn solid" href="${SITE.repo}" target="_blank" rel="noopener">View on GitHub ${arrow}</a>
    </div>
  </div>
</section>

${ctaFinal('Run it on a real company.', 'npx company-dossier <name-or-domain> · sourced, in your terminal.')}
`;

export default {
  path: '/cli/',
  priority: '0.8',
  changefreq: 'monthly',
  active: '/get/',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }, { href: '/cli/', label: 'CLI & npm' }],
  title: 'Company Dossier CLI — company research npm package & OSINT cli',
  description: 'The company-dossier npm package is a free company research CLI and library. Run npx company-dossier <company-or-domain> to write a sourced, nine-section dossier plus dossier.json. OSINT cli for CI, agents and scripts. Public sources only.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Company Dossier (CLI & npm)',
      applicationCategory: 'DeveloperApplication', operatingSystem: 'Node.js / CLI',
      url: SITE.origin + '/cli/',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'A company research CLI and npm package that builds a complete, sourced, nine-section company dossier from public sources, plus a machine-readable dossier.json.',
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Get it', item: SITE.origin + '/get/' },
        { '@type': 'ListItem', position: 3, name: 'CLI & npm', item: SITE.origin + '/cli/' },
      ],
    },
  ],
  body,
};
