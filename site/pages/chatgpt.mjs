import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

const askBlock = `<div class="term reveal" role="img" aria-label="A ChatGPT prompt asking for a dossier on Stripe">
<span class="c"># just ask, in plain language</span>
<span class="p">You: <b>Build a dossier on Stripe.</b></span>
<span class="c">› gathering public signals for stripe.com …</span>
<span class="p">ChatGPT: Here's the file — overview, people, hiring,</span>
<span class="p">money, locations, tech, news, web and risk. Each</span>
<span class="p">claim links back to its public source.</span>
</div>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">get it — chatgpt app</span>
    <h1>Company Dossier for ChatGPT.</h1>
    <p class="lede">Already living in ChatGPT? Pull a complete, sourced company profile without leaving the chat. There's a custom GPT in the GPT Store and a ChatGPT app powered by an MCP connector — both run the same Company Dossier engine and return the same nine-section file. Free, public sources only.</p>
    <div class="cta-row" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:24px">
      <a class="btn solid" href="/get/">Get Company Dossier ${arrow}</a>
      <a class="btn" href="/sample/">See a sample file</a>
    </div>
    <div class="pubnote" style="font-family:var(--f-type);font-size:.82rem;color:var(--smudge);margin-top:16px">GPT Store link coming soon — meanwhile, see all four ways to run it on the <a href="/get/" style="border-bottom:1px solid var(--faint);text-decoration:none">Get it</a> page.</div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">how it works</span>
      <h2 class="marker">A GPT and an app, two ways in</h2>
      <p style="margin-left:auto;margin-right:auto">Same engine, two front doors inside ChatGPT.</p>
    </div>
    <div class="prose reveal">
      <p><strong>The custom GPT</strong> lives in the GPT Store. Open it, name a company, and it walks the public record for you and hands back a structured dossier in the conversation — no setup beyond opening the chat.</p>
      <p><strong>The ChatGPT app</strong> is powered by an <abbr title="Model Context Protocol">MCP</abbr> connector, so the assistant can call the Company Dossier engine directly as a tool while you talk. Under the hood it's the same research that <code>npx company-dossier</code> runs — just driven by the model and surfaced inside ChatGPT.</p>
      <p>Either way you stay in one window. Ask a follow-up, drill into a section, or have ChatGPT summarise the money trail for a brief — the file is right there in the thread.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">try it</span>
      <h2 class="marker">What you can ask</h2>
      <p style="margin-left:auto;margin-right:auto">Plain language is the whole brief. Name the company and ask for the file.</p>
    </div>
    ${askBlock}
    <div class="prose reveal" style="margin-top:24px">
      <p>Good prompts to start with:</p>
      <ul>
        <li><em>"Build a dossier on Stripe."</em></li>
        <li><em>"Give me the money trail and risk flags for acme.com."</em></li>
        <li><em>"Who runs this company and where are their offices?"</em></li>
      </ul>
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
      <p>It all comes from <strong>public sources only</strong> — job boards, filings, news and the open web — and every claim points back to where it came from. The target company doesn't need to be involved or aware. A dossier is a fast, honest starting map, built to be verified.</p>
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
      <article class="qa sk reveal"><h3><span class="marker">Q.</span> Is this an official OpenAI feature?</h3><p>No — Company Dossier is a third-party GPT and app you add inside ChatGPT. It runs the same engine as the web app, CLI and editor extension.</p></article>
      <article class="qa sk v2 reveal"><h3><span class="marker">Q.</span> Where's the GPT Store link?</h3><p>It's coming. In the meantime, every route is on the <a href="/get/" style="text-decoration:none;border-bottom:2px solid var(--faint)">Get it</a> page, and you can run the same research today with <a href="/cli/" style="text-decoration:none;border-bottom:2px solid var(--faint)">npx company-dossier</a>.</p></article>
      <article class="qa sk v3 reveal"><h3><span class="marker">Q.</span> Where does the data come from?</h3><p>Public sources only — job boards, filings, news and the open web. No private data, no login bypass.</p></article>
    </div>
    <div style="text-align:center;margin-top:30px" class="reveal">
      <a class="btn solid" href="/get/">Get Company Dossier ${arrow}</a>
    </div>
  </div>
</section>

${ctaFinal('Ask for a dossier in ChatGPT.', 'name a company. read the whole story, sourced, in the chat.')}
`;

export default {
  path: '/chatgpt/',
  priority: '0.8',
  changefreq: 'monthly',
  active: '/get/',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }, { href: '/chatgpt/', label: 'ChatGPT app' }],
  title: 'Company Dossier for ChatGPT — company research GPT & app',
  description: 'Company Dossier for ChatGPT: a company research GPT in the GPT Store plus a ChatGPT app powered by an MCP connector. Ask "Build a dossier on Stripe" and get a sourced, nine-section profile. Free, public sources only.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Company Dossier for ChatGPT',
      applicationCategory: 'BusinessApplication', operatingSystem: 'ChatGPT',
      url: SITE.origin + '/chatgpt/',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'A company research GPT and ChatGPT app, powered by an MCP connector, that builds a complete, sourced nine-section company dossier from public sources inside the chat.',
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Get it', item: SITE.origin + '/get/' },
        { '@type': 'ListItem', position: 3, name: 'ChatGPT app', item: SITE.origin + '/chatgpt/' },
      ],
    },
  ],
  body,
};
