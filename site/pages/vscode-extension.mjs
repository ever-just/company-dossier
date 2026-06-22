import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;
const ghIcon = `<svg aria-hidden="true" viewBox="0 0 24 24" style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2.2;vertical-align:-3px"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-1-2.6c3.1-.4 6.4-1.6 6.4-7A5.4 5.4 0 0020 4.8 5 5 0 0019.9 1S18.7.6 16 2.5a13.4 13.4 0 00-7 0C6.3.6 5.1 1 5.1 1A5 5 0 005 4.8 5.4 5.4 0 003.6 8.5c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 00-1 2.6V22"/></svg>`;

const termBlock = `<div class="term reveal" role="img" aria-label="Terminal cloning the Company Dossier VS Code extension and running it from the command palette">
<span class="c"># one-click: VS Code Quick Open (⌘P / Ctrl+P)</span>
<span class="p"><b>ext install EVERJUSTs.company-dossier</b></span>
<span class="c"># …or install from source</span>
<span class="p">$ <b>git clone https://github.com/ever-just/company-dossier-vscode</b></span>
<span class="p">$ <b>cd company-dossier-vscode && npm install</b></span>
<span class="p">$ <b>code .</b>  <span class="c"># then press F5 to launch the extension host</span></span>
<span class="c"># or, once installed, in any VS Code window:</span>
<span class="p"><b>⌘⇧P</b> › <b>Company Dossier: Research a company…</b></span>
<span class="p"><b>@dossier /research acme.com</b>  <span class="c"># in the chat view</span></span>
</div>`;

const steps = `<div class="steps">
  <article class="step sk reveal"><div class="big">1</div>${icon('i-glass')}<h3>Install it</h3><p>Open it on the <a href="${SITE.marketplace}" target="_blank" rel="noopener">VS Code Marketplace</a> and click <strong>Install</strong>, or search "Company Dossier" in the Extensions panel (<code>ext install EVERJUSTs.company-dossier</code>).</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v2 reveal"><div class="big">2</div>${icon('i-terminal')}<h3>Open the palette</h3><p>Hit the command palette and run <code>Company Dossier: Research a company…</code>.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v3 reveal"><div class="big">3</div>${icon('i-bot')}<h3>Or ask in chat</h3><p>Use the chat participant: <code>@dossier /research acme.com</code> and watch it work.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v2 reveal"><div class="big">4</div>${icon('i-doc')}<h3>Read it in the sidebar</h3><p>A structured, multi-section dossier opens beside your code — no context switch.</p></article>
</div>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">get it — vs code extension</span>
    <h1>A VS Code OSINT extension for company research.</h1>
    <p class="lede">The Company Dossier extension brings competitive intelligence into your editor. Run it from the command palette or talk to the <code>@dossier</code> chat participant, and a complete, sourced company profile assembles right in the sidebar — website analysis, Wayback history, DNS recon and tech-stack detection included. Free and open source.</p>
    <div class="cta-row" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:24px">
      <a class="btn solid" href="${SITE.marketplace}" target="_blank" rel="noopener">Install from the VS Code Marketplace ${arrow}</a>
      <a class="btn" href="${SITE.repoVscode}" target="_blank" rel="noopener">View source ${ghIcon}</a>
    </div>
    <div class="pubnote" style="font-family:var(--f-type);font-size:.82rem;color:var(--smudge);margin-top:16px">Public sources only — no login bypass, no private data, no surprises.</div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="head reveal">
      <span class="tab">how to install</span>
      <h2 class="marker">Two ways to add it</h2>
      <p>Search the marketplace, or clone the source if you want to read or extend it. Either way you're up and running in a couple of minutes.</p>
    </div>
    ${steps}
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">install from source</span>
      <h2 class="marker">Clone, build, research</h2>
      <p style="margin-left:auto;margin-right:auto">Open in VS Code, then drive it from the command palette or the chat participant.</p>
    </div>
    <div style="max-width:640px;margin:0 auto">
      ${termBlock}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">what it does</span>
      <h2 class="marker">Recon, without leaving your editor</h2>
    </div>
    <div class="prose reveal">
      <p>This is more than a wrapper around a search box. The extension runs real reconnaissance against the public record and folds the results into a structured, multi-section dossier you can read inline:</p>
      <ul>
        <li><strong>Website analysis</strong> — reads the company's live site to understand what they do, who they sell to, and how they position themselves.</li>
        <li><strong>Wayback history</strong> — pulls archived snapshots so you can see how the business and its messaging changed over time.</li>
        <li><strong>DNS recon</strong> — inspects domains and records to map infrastructure and surface related properties.</li>
        <li><strong>Tech-stack detection</strong> — fingerprints the frameworks, platforms and tools the company builds and runs on.</li>
      </ul>
      <p>All of it rolls up into the same nine-section company profile you get everywhere else — overview, people, hiring, money, locations, tech, news, relationships and risk — so a developer doing due diligence, a founder sizing up a competitor, or an engineer prepping for a partnership gets the full picture without ever leaving the workspace.</p>
      <h3>The chat participant</h3>
      <p>If you use VS Code's chat, you can summon the dossier conversationally. Type <code>@dossier /research</code> followed by a company name or domain and the participant gathers the signals, then streams back a sourced profile you can ask follow-up questions about. It's company research at the speed of thought — and it keeps your hands on the keyboard.</p>
      <h3>The command palette flow</h3>
      <p>Prefer menus? Open the command palette, run <code>Company Dossier: Research a company…</code>, type the target, and the structured dossier opens in the sidebar view. Same engine, same nine sections, same public-sources-only discipline as the <a href="/web-app/" style="text-decoration:none;border-bottom:2px solid var(--faint)">web app</a> and <a href="/cli/" style="text-decoration:none;border-bottom:2px solid var(--faint)">CLI</a>.</p>
    </div>
    <div style="text-align:center;margin-top:30px" class="reveal">
      <a class="btn solid" href="${SITE.repoVscode}" target="_blank" rel="noopener">Get it on GitHub ${ghIcon}</a>
    </div>
  </div>
</section>

${ctaFinal('Research a company from your editor.', '@dossier /research · the whole story, sourced, inline.')}
`;

export default {
  path: '/vscode-extension/',
  priority: '0.8',
  changefreq: 'monthly',
  active: '/get/',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }, { href: '/vscode-extension/', label: 'VS Code extension' }],
  title: 'Company Dossier VS Code extension — OSINT & company research in your editor',
  description: 'A VS Code OSINT extension for company research and competitive intelligence. Run it from the command palette or the @dossier /research chat participant for website analysis, Wayback history, DNS recon and tech-stack detection — a complete, sourced company profile in your sidebar. Free, open source.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Company Dossier (VS Code extension)',
      applicationCategory: 'DeveloperApplication', operatingSystem: 'Visual Studio Code',
      url: SITE.repoVscode,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'VS Code extension that runs company research and OSINT — website analysis, Wayback history, DNS recon and tech-stack detection — into a structured, sourced company dossier.',
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Get it', item: SITE.origin + '/get/' },
        { '@type': 'ListItem', position: 3, name: 'VS Code extension', item: SITE.origin + '/vscode-extension/' },
      ],
    },
  ],
  body,
};
