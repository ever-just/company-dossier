import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

const skillBlock = `<div class="term reveal" role="img" aria-label="A Claude prompt invoking the company-dossier skill">
<span class="c"># the skill is named</span>
<span class="p"><b>company-dossier</b></span>
<span class="c"></span>
<span class="c"># a sample prompt, in plain language</span>
<span class="p">You: <b>Build a dossier on Stripe.</b></span>
<span class="c">› Claude runs the company-dossier skill …</span>
<span class="p">Claude: Here's the file — nine sourced sections,</span>
<span class="p">each claim pointed back to its public source.</span>
</div>`;

const mcpBlock = `<div class="term reveal" role="img" aria-label="Adding the Company Dossier MCP connector to Claude Code">
<span class="c"># add the MCP connector (Claude Code shown)</span>
<span class="p">$ <b>claude mcp add company-dossier -- npx company-dossier --mcp</b></span>
<span class="c">› connector registered — Claude can now call it as a tool</span>
<span class="p">You: <b>Give me the money trail and risk flags for acme.com.</b></span>
</div>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">get it — claude app</span>
    <h1>Company Dossier for Claude.</h1>
    <p class="lede">Research a company without leaving Claude. There's a Claude Agent Skill you can drop in, and an MCP connector you can add to Claude or Claude Code — then just ask Claude to build a dossier. Both run the same engine and return the same complete, sourced, nine-section file. Free, public sources only.</p>
    <div class="cta-row" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:24px">
      <a class="btn solid" href="/get/">Get Company Dossier ${arrow}</a>
      <a class="btn" href="/sample/">See a sample file</a>
    </div>
    <div class="pubnote" style="font-family:var(--f-type);font-size:.82rem;color:var(--smudge);margin-top:16px">Public information only — gathered for you, never bought or breached.</div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">the skill</span>
      <h2 class="marker">A Claude Agent Skill</h2>
      <p style="margin-left:auto;margin-right:auto">Add the <code>company-dossier</code> skill to Claude, then ask in plain language. Claude knows how to run the research and lay the file out for you.</p>
    </div>
    ${skillBlock}
    <div class="prose reveal" style="margin-top:24px">
      <p>The skill teaches Claude the method behind a dossier — what the nine sections are, where to pull each one from the public record, and how to keep every claim sourced. You don't have to spell out the steps; name the company and ask for the file.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">the connector</span>
      <h2 class="marker">An MCP connector</h2>
      <p style="margin-left:auto;margin-right:auto">Prefer to wire it in as a tool? Add the Company Dossier MCP connector to Claude or Claude Code and the assistant can call the engine directly while you talk.</p>
    </div>
    ${mcpBlock}
    <div class="prose reveal" style="margin-top:24px">
      <p>The <abbr title="Model Context Protocol">MCP</abbr> connector exposes Company Dossier as a tool Claude can invoke mid-conversation. Behind it, the work is the same research that <code>npx company-dossier</code> performs — <strong>that's what powers it</strong> — so you get an identical sourced file, driven by the model and surfaced right in your Claude session.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">what it returns</span>
      <h2 class="marker">The same nine-section file</h2>
      <p style="margin-left:auto;margin-right:auto">Conversational on the outside, the same complete dossier underneath.</p>
    </div>
    <div class="prose reveal">
      <ul>
        <li><strong>Overview &amp; identity</strong> — what the company does, when it started, who owns it.</li>
        <li><strong>People &amp; org chart</strong> — leadership and how the org is shaped.</li>
        <li><strong>Hiring radar</strong> — open roles and where headcount is growing.</li>
        <li><strong>Money trail</strong> — funding, investors, filings and revenue signals.</li>
        <li><strong>Locations</strong> — headquarters and offices.</li>
        <li><strong>Tech fingerprint</strong> — the stack they build on.</li>
        <li><strong>News &amp; timeline</strong> — press and milestones in order.</li>
        <li><strong>Relationship web</strong> — customers, partners and rivals.</li>
        <li><strong>Risk flags</strong> — lawsuits, layoffs and reputation notes.</li>
      </ul>
      <p>It all comes from <strong>public sources only</strong>, and every claim points back to where it came from. The target company doesn't need to be involved or aware. A dossier is a fast, honest starting map — built to be verified, not taken on faith.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">good to know</span>
      <h2 class="marker">Questions, answered</h2>
    </div>
    <div class="faq">
      <article class="qa sk reveal"><h3><span class="marker">Q.</span> Skill or connector — which do I use?</h3><p>Either. The skill is the quickest drop-in for the Claude app; the MCP connector is ideal in Claude Code and other MCP-aware clients where you want it as a callable tool.</p></article>
      <article class="qa sk v2 reveal"><h3><span class="marker">Q.</span> What's actually doing the research?</h3><p>The same engine as everywhere else — <code>npx company-dossier</code> powers both the skill and the connector. The <a href="/cli/" style="text-decoration:none;border-bottom:2px solid var(--faint)">CLI</a> page covers it in full.</p></article>
      <article class="qa sk v3 reveal"><h3><span class="marker">Q.</span> Where does the data come from?</h3><p>Public sources only — job boards, filings, news and the open web. No private data, no login bypass.</p></article>
    </div>
    <div style="text-align:center;margin-top:30px" class="reveal">
      <a class="btn solid" href="/get/">Get Company Dossier ${arrow}</a>
    </div>
  </div>
</section>

${ctaFinal('Ask Claude for a dossier.', 'name a company. read the whole story, sourced, in the chat.')}
`;

export default {
  path: '/claude/',
  priority: '0.8',
  changefreq: 'monthly',
  active: '/get/',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }, { href: '/claude/', label: 'Claude app' }],
  title: 'Company Dossier for Claude — company research skill & MCP connector',
  description: 'Company Dossier for Claude: a Claude Agent Skill plus an MCP connector for Claude and Claude Code. Add it, then ask Claude to build a dossier — a sourced, nine-section company profile. Powered by npx company-dossier. Free, public sources only.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Company Dossier for Claude',
      applicationCategory: 'BusinessApplication', operatingSystem: 'Claude',
      url: SITE.origin + '/claude/',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'A Claude Agent Skill and MCP connector that lets Claude build a complete, sourced, nine-section company dossier from public sources inside the conversation. Powered by the company-dossier CLI.',
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Get it', item: SITE.origin + '/get/' },
        { '@type': 'ListItem', position: 3, name: 'Claude app', item: SITE.origin + '/claude/' },
      ],
    },
  ],
  body,
};
