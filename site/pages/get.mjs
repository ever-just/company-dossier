import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

const ways = `<div class="ways">
  <article class="way sk reveal">
    <span class="tape" style="left:18px;top:-12px"></span>
    ${icon('i-browser')}
    <h3>Web app</h3>
    <p>The fastest way in. Open a tab, type a company name or paste a domain, and read the finished dossier in your browser — nothing to install.</p>
    <ul>
      <li>Zero setup — works on any machine</li>
      <li>Charts, org sketch, map and timeline rendered for you</li>
      <li>Share or save the file when you're done</li>
    </ul>
    <a class="btn" href="/web-app/">Open the web app ${arrow}</a>
  </article>

  <article class="way sk v2 reveal">
    ${icon('i-code')}
    <h3>VS Code extension</h3>
    <p>For the people who live in their editor. Run company research from the command palette or ask the <code>@dossier</code> chat participant — the file lands beside your code.</p>
    <ul>
      <li>Sidebar view + <code>@dossier /research</code> chat</li>
      <li>Website analysis, Wayback history, DNS recon, tech stack</li>
      <li>Free and open source on GitHub</li>
    </ul>
    <a class="btn" href="/vscode-extension/">Get the extension ${arrow}</a>
  </article>

  <article class="way sk v3 reveal">
    ${icon('i-terminal')}
    <h3>CLI / npm</h3>
    <p>One command, no install. Point the <code>company-dossier</code> CLI at a name or domain and it prints a sourced profile straight to your terminal — perfect for scripts and pipelines.</p>
    <ul>
      <li>Run it with <code>npx</code> — nothing to install</li>
      <li>Package name <code>company-dossier</code> on npm</li>
      <li>Pipe the output anywhere you like</li>
    </ul>
    <a class="btn" href="/cli/">See the CLI ${arrow}</a>
  </article>

  <article class="way sk reveal">
    ${icon('i-bot')}
    <h3>AI apps</h3>
    <p>Already chatting with an assistant? Pull a dossier without leaving the conversation. There's a ChatGPT app and a Claude app &amp; skill — just name the company.</p>
    <ul>
      <li>ChatGPT app — ask inside the chat</li>
      <li>Claude app &amp; skill — research in the flow</li>
      <li>Same nine-section file, conversational</li>
    </ul>
    <div class="cta-row" style="display:flex;gap:12px;flex-wrap:wrap">
      <a class="btn" href="/chatgpt/">ChatGPT ${arrow}</a>
      <a class="btn" href="/claude/">Claude ${arrow}</a>
    </div>
  </article>
</div>`;

const termBlock = `<div class="term reveal" role="img" aria-label="Terminal running npx company-dossier acme.com">
<span class="c"># one command, no install</span>
<span class="p">$ <b>npx company-dossier acme.com</b></span>
<span class="c">› gathering public signals for acme.com …</span>
<span class="c">› people · hiring · money · locations · tech · news · web · risk</span>
<span class="p">✓ dossier assembled — 9 sections, every line sourced</span>
</div>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">section 06 — open a file</span>
    <h1>Four ways to open a dossier.</h1>
    <p class="lede">Pick the door you like. Browser, editor, terminal or chat — every route runs the same Company Dossier engine and hands you the same complete, sourced file on any company. Free, and built from public sources only.</p>
  </div>
</section>

<section class="sec" style="padding-top:22px">
  <div class="wrap">
    ${ways}
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow" style="text-align:center">
    <div class="head center reveal">
      <span class="tab">the short version</span>
      <h2 class="marker">Prefer the command line?</h2>
      <p style="margin-left:auto;margin-right:auto">Name a company or a domain. That's the whole brief — the same nine sections come back, sourced.</p>
    </div>
    <div style="max-width:560px;margin:0 auto;text-align:left">
      ${termBlock}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">same file, every route</span>
      <h2 class="marker">One company profile, four front doors</h2>
    </div>
    <div class="prose reveal">
      <p>It doesn't matter whether you open a dossier in the web app, the VS Code extension, the npm CLI, or an AI app — the output is identical: one comprehensive, sourced company profile broken into the same <strong>nine sections</strong>. Overview &amp; identity, people &amp; org chart, hiring radar, money trail, locations, tech fingerprint, news &amp; timeline, relationship web, and risk flags.</p>
      <p>So choose the route by your workflow, not by what you'll get. If you're doing sales research or competitive intelligence in a browser, the <a href="/web-app/">web app</a> is the quickest. If you're a developer who wants a VS Code OSINT extension that gathers company research without breaking flow, install the <a href="/vscode-extension/">extension</a>. If you script things, the <a href="/cli/">CLI</a> drops a profile straight into your pipeline. And if you'd rather just ask, the <a href="/chatgpt/">ChatGPT</a> and <a href="/claude/">Claude</a> apps research in the conversation.</p>
      <p>Whichever you pick, the rules are the same: public sources only, every claim pointed back to where it came from, and nothing the target company has to opt into. A dossier is a fast, honest starting map — built to be verified, not taken on faith.</p>
    </div>
  </div>
</section>

${ctaFinal('Pick a door. Open a file.', 'four routes, one sourced dossier on any company.')}
`;

export default {
  path: '/get/',
  priority: '0.9',
  changefreq: 'monthly',
  active: '/get/',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }],
  title: 'Get Company Dossier — web app, VS Code extension, CLI & AI apps',
  description: 'Four ways to open a company dossier: the companydossier.lol/generate web app, the VS Code extension, the company-dossier npm CLI, and AI apps for ChatGPT and Claude. Free, public sources only, same nine-section profile every time.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Get it', item: SITE.origin + '/get/' },
      ],
    },
  ],
  body,
};
