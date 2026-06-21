import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;
const yes = `<span class="checkmark">✓</span>`;
const no = `<span class="checkmark">—</span>`;

// ---- competitor definitions (fair, accurate, no invented prices/features) ----
const COMPETITORS = [
  {
    slug: 'crunchbase-alternative',
    name: 'Crunchbase',
    label: 'Crunchbase alternative',
    kind: 'a funding & company database',
    blurb: 'funding rounds, investors and company profiles',
    intro: `Crunchbase is one of the best-known company and funding databases. It tracks companies, the rounds they've raised, the investors behind them and the people who run them, and it's a go-to reference for venture and startup activity. Most teams reach for it to answer "who funded whom, and when" — investors mapping a market, founders sizing up peers, and sales teams qualifying startups by stage.`,
    paid: `Crunchbase offers a free tier with limited views, but its useful search, exports and full profiles sit behind paid Pro and enterprise plans.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Curated funding database + community and partner contributions',
    bestThem: 'Funding history, investor mapping and startup deal tracking',
    whenThem: [
      'You need structured, curated funding-round data across many companies at once.',
      'You want to filter and export a large list of companies by stage, investor or sector.',
      'You\'re tracking the venture market and want a maintained, comparable dataset.',
    ],
    whenUs: [
      'You want a fast, free first-pass profile of one company — not just its funding.',
      'You need people, hiring, tech, locations and risk in the same file, all sourced.',
      'You\'d rather have one readable file you can verify than a database subscription.',
    ],
    faq: [
      { q: 'Is there a free alternative to Crunchbase?', a: 'Yes. Company Dossier is free and builds a sourced, nine-section profile of any company from public sources — including funding signals — without a paid plan. It isn\'t a curated deal database, but it\'s a strong free first pass.' },
      { q: 'Does Company Dossier replace Crunchbase?', a: 'Not for systematic funding research across thousands of companies — that\'s where a curated database earns its keep. Company Dossier is best when you want one company\'s whole story, fast and free, with every claim sourced.' },
      { q: 'Where does Company Dossier get funding data?', a: 'From public sources — filings, news and the open web — and every line points back to where it came from, so you can verify before you act.' },
    ],
  },
  {
    slug: 'zoominfo-alternative',
    name: 'ZoomInfo',
    label: 'ZoomInfo alternative',
    kind: 'a sales intelligence & contact database',
    blurb: 'contact data and B2B sales intelligence',
    intro: `ZoomInfo is a sales-focused B2B intelligence platform built around contact and company data. Its core value is reach: phone numbers, email addresses, org charts and intent signals for go-to-market teams. Sales and marketing orgs use it to build target lists, enrich their CRM and find the right person to call.`,
    paid: `ZoomInfo is a paid, enterprise-priced platform. Its contact database and workflow tools are sold by seat and tier.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Proprietary contact & company database with enrichment',
    bestThem: 'Finding and reaching specific people at scale (sales prospecting)',
    whenThem: [
      'You need direct contact details — emails and phone numbers — at volume.',
      'You\'re building and enriching large prospect lists inside a CRM.',
      'Your go-to-market motion depends on verified contact reach.',
    ],
    whenUs: [
      'You want to understand a company before the call, not just get a phone number.',
      'You need a sourced overview — people, money, tech, news, risk — in one file.',
      'You want a free, public-source briefing rather than a contact-data contract.',
    ],
    faq: [
      { q: 'Is there a free alternative to ZoomInfo?', a: 'Yes — for company research. Company Dossier is free and assembles a sourced profile of any company from public data. It is not a contact database, so it won\'t hand you bulk emails or phone numbers; it gives you context to research a company well.' },
      { q: 'Does Company Dossier give you contact details?', a: 'No. It deliberately uses public sources only and is not a contact or lead database. It surfaces leadership and org structure from the public record, not personal contact data.' },
      { q: 'Why use Company Dossier alongside ZoomInfo?', a: 'Use ZoomInfo to reach people; use Company Dossier to understand the company first — its money trail, hiring, tech and risk — so your outreach lands with context.' },
    ],
  },
  {
    slug: 'apollo-alternative',
    name: 'Apollo',
    label: 'Apollo alternative',
    kind: 'a sales engagement & prospecting platform',
    blurb: 'contact data plus sales engagement and sequences',
    intro: `Apollo (Apollo.io) pairs a B2B contact database with sales-engagement tooling — sequences, dialers and CRM-style workflows. It's popular with smaller and mid-market sales teams who want prospecting data and the outreach machinery in one place.`,
    paid: `Apollo has a free starter tier, but its credits, exports and engagement features scale through paid plans aimed at sales teams.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Proprietary contact database + sales-engagement tools',
    bestThem: 'Prospecting contacts and running outbound sequences in one tool',
    whenThem: [
      'You\'re running outbound and want contacts plus sequencing together.',
      'You need email/phone data and credits to enrich and reach prospects.',
      'Your team works lead lists daily and wants engagement built in.',
    ],
    whenUs: [
      'You want a deep, sourced read on a company, not a list of contacts to email.',
      'You need overview, hiring, money, tech, news and risk in one verifiable file.',
      'You want a free first-pass intelligence file you can run anywhere.',
    ],
    faq: [
      { q: 'Is there a free alternative to Apollo?', a: 'Yes, for the research side. Company Dossier is free and builds a sourced, nine-section company profile from public sources. It isn\'t a contact database or a sequencing tool, so it complements outbound rather than replacing Apollo\'s engagement features.' },
      { q: 'Can Company Dossier replace Apollo for sales?', a: 'Not for prospecting and outreach — Apollo is built for that. Company Dossier is the research step before outreach: know the company, its people, its money and its risks, with everything sourced.' },
      { q: 'Does Company Dossier do email sequences?', a: 'No. It produces a single sourced company file. It has no contact database and no engagement tooling by design.' },
    ],
  },
  {
    slug: 'pitchbook-alternative',
    name: 'PitchBook',
    label: 'PitchBook alternative',
    kind: 'a private-markets & deal database',
    blurb: 'private-market, deal and financials data',
    intro: `PitchBook is a deep private-capital and deal database used by investors, bankers and corporate-development teams. It tracks private companies, funds, deals, valuations and financials with a level of curation built for diligence and market analysis. It's a professional research terminal, priced accordingly.`,
    paid: `PitchBook is a paid, enterprise platform. Access is sold through subscriptions aimed at finance and investment professionals.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Curated private-markets database (deals, funds, financials)',
    bestThem: 'Deal sourcing, diligence and private-market analysis',
    whenThem: [
      'You\'re doing investment diligence and need curated deal and valuation data.',
      'You compare funds, sponsors and transactions across the private market.',
      'You need a maintained dataset rigorous enough to underwrite decisions.',
    ],
    whenUs: [
      'You want a quick, free company briefing before committing to deep diligence.',
      'You need the public picture — people, hiring, tech, news, risk — in one file.',
      'You want a sourced starting map, not an enterprise data terminal.',
    ],
    faq: [
      { q: 'Is there a free alternative to PitchBook?', a: 'Yes, for a first pass. Company Dossier is free and compiles a sourced company profile from public sources. It is not a curated private-markets dataset, so it doesn\'t replace PitchBook for diligence — but it\'s a fast, free way to get oriented on a company.' },
      { q: 'Does Company Dossier have valuations and deal data?', a: 'Only what shows up in the public record — filings, news and the open web — and always sourced. For curated valuations and comparable deals across the private market, a paid database like PitchBook is the right tool.' },
      { q: 'When is Company Dossier enough?', a: 'When you need to understand a single company quickly and cheaply, with every claim verifiable, before deciding whether deeper paid research is warranted.' },
    ],
  },
  {
    slug: 'owler-alternative',
    name: 'Owler',
    label: 'Owler alternative',
    kind: 'a community company-news service',
    blurb: 'company news, alerts and competitive snapshots',
    intro: `Owler is a community-driven company-tracking service. It surfaces company snapshots, news alerts and crowd-sourced estimates, and people use it to follow competitors and accounts and get a feel for what's happening at a company. Its strength is lightweight, ongoing awareness rather than deep structured data.`,
    paid: `Owler has free and paid tiers; alerts and richer features scale with the paid plans.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Aggregated news + community-contributed company snapshots',
    bestThem: 'Ongoing news alerts and lightweight competitor tracking',
    whenThem: [
      'You want a steady feed of news alerts on companies you follow.',
      'You\'re keeping loose tabs on competitors over time.',
      'You want quick snapshots without assembling a full profile.',
    ],
    whenUs: [
      'You want a complete profile in one pass, not a stream of alerts.',
      'You need people, hiring, money, tech, locations and risk together, all sourced.',
      'You want a verifiable file you can run in a browser, editor, CLI or AI app.',
    ],
    faq: [
      { q: 'Is there a free alternative to Owler?', a: 'Yes. Company Dossier is free and builds a complete, sourced company profile from public sources in one pass — a deeper one-time briefing rather than an ongoing alert feed.' },
      { q: 'Does Company Dossier track news over time?', a: 'It includes a news-and-timeline section built from public press, sourced. For continuous alerting on companies you follow, a tracker like Owler is purpose-built for that.' },
      { q: 'How is Company Dossier different from Owler?', a: 'Owler is about lightweight, ongoing awareness; Company Dossier is about a thorough, sourced, single-file snapshot you can verify and act on.' },
    ],
  },
  {
    slug: 'clearbit-alternative',
    name: 'Clearbit',
    label: 'Clearbit alternative',
    kind: 'a data-enrichment & API platform',
    blurb: 'company and contact data enrichment via API',
    intro: `Clearbit (now part of HubSpot's Breeze Intelligence) is a data-enrichment platform. It enriches records — companies and contacts — through APIs and integrations so marketing and sales systems can fill in firmographics and route leads. It's infrastructure that lives inside other tools rather than a research view you read.`,
    paid: `Clearbit is a paid, enrichment-oriented product sold through plans and platform bundling, geared to go-to-market systems.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Proprietary enrichment dataset delivered via API/integrations',
    bestThem: 'Programmatic enrichment of CRM and marketing records',
    whenThem: [
      'You need to enrich records automatically inside your CRM or marketing stack.',
      'You want firmographic fields filled in at scale via API.',
      'Your lead routing and scoring depend on enriched data fields.',
    ],
    whenUs: [
      'You want to read a company\'s whole story, not enrich a database field.',
      'You need a sourced narrative file — people, money, tech, news, risk — to act on.',
      'You want a free, public-source briefing you can verify line by line.',
    ],
    faq: [
      { q: 'Is there a free alternative to Clearbit?', a: 'Yes, for research. Company Dossier is free and produces a sourced, nine-section company profile from public data. It is not an enrichment API, so it won\'t fill CRM fields automatically — it gives you a readable, verifiable file instead.' },
      { q: 'Does Company Dossier have an enrichment API?', a: 'It ships a CLI and library (buildDossier) you can script, which returns structured data including a dossier.json. That\'s useful for agents and pipelines, but it\'s a research tool, not a record-enrichment service like Clearbit.' },
      { q: 'Why use Company Dossier instead of Clearbit?', a: 'When you want to understand a single company deeply and for free — with sources you can check — rather than enrich many records with firmographic fields.' },
    ],
  },
];

function bc(crumbsArr) {
  return [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
    ...crumbsArr.map((c, i) => ({ '@type': 'ListItem', position: i + 2, name: c.label, item: SITE.origin + c.href })),
  ];
}

// ===================== INDEX HUB =====================
const masterRows = [
  ['Price', `<strong>Free</strong>`, 'Paid (tiers / enterprise) for full use'],
  ['Data sources', 'Public web only, every claim sourced', 'Proprietary or curated datasets'],
  ['Source attribution', `${yes} every line links back`, 'Varies; often unattributed'],
  ['Single-file output', `${yes} one readable dossier`, 'Dashboards, exports or API fields'],
  ['Works in editor / CLI', `${yes} web, VS Code, npm CLI`, 'Mostly web app / API'],
  ['AI-agent native', `${yes} ChatGPT, Claude, MCP`, 'Rarely'],
  ['Best for', 'Fast, free first-pass company intelligence', 'Their specialty (contacts, deals, enrichment, alerts)'],
];

const masterTable = `<div class="tbl-wrap reveal">
  <table class="cmp">
    <thead>
      <tr><th>&nbsp;</th><th class="col-us">Company Dossier</th><th>Typical alternative</th></tr>
    </thead>
    <tbody>
      ${masterRows.map(r => `<tr><th>${r[0]}</th><td class="col-us">${r[1]}</td><td>${r[2]}</td></tr>`).join('\n      ')}
    </tbody>
  </table>
</div>`;

// extra comparison pages (defined in compare-extra.mjs) — linked here so the hub is complete
const EXTRA_COMPETITORS = [
  { slug: 'cognism-alternative', name: 'Cognism', blurb: 'GDPR-focused B2B contact data and sales intelligence' },
  { slug: 'lusha-alternative', name: 'Lusha', blurb: 'contact and prospecting data with a freemium model' },
  { slug: 'cb-insights-alternative', name: 'CB Insights', blurb: 'market and startup intelligence with analyst research' },
  { slug: 'rocketreach-alternative', name: 'RocketReach', blurb: 'contact lookup and email finding for individuals' },
  { slug: 'seamless-ai-alternative', name: 'Seamless.AI', blurb: 'real-time search for sales leads and contacts' },
  { slug: 'linkedin-sales-navigator-alternative', name: 'LinkedIn Sales Navigator', blurb: 'LinkedIn-native sales prospecting and lead search' },
];

const linkCards = [...COMPETITORS, ...EXTRA_COMPETITORS].map((c, i) => {
  const v = ['', ' v2', ' v3'][i % 3];
  return `<a class="linkcard sk${v} reveal" href="/compare/${c.slug}/">
    <h3>${c.name} alternative</h3>
    <p>Company Dossier vs ${c.name} — ${c.blurb}. Free, public-source, fully sourced.</p>
  </a>`;
}).join('\n');

const indexBody = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">compare</span>
    <h1>Company Dossier vs the alternatives.</h1>
    <p class="lede">There are a lot of company-research tools — paid contact databases, funding terminals, enrichment APIs and news trackers. Here's an honest map of where Company Dossier fits: a free, public-source, fully-sourced first-pass intelligence file. Not a contact database, not a substitute for paid datasets — a fast way to read any company's whole story.</p>
  </div>
</section>

<section class="sec" style="padding-top:22px">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">the master table</span>
      <h2 class="marker">How it stacks up</h2>
      <p style="margin-left:auto;margin-right:auto">A fair, general comparison — the alternatives are excellent at their specialty, and Company Dossier is built for a different job.</p>
    </div>
    ${masterTable}
    <div class="prose reveal" style="margin-top:24px">
      <p>The short version: if you need <strong>contact data at scale</strong>, a <strong>curated deal database</strong>, or <strong>automated record enrichment</strong>, the paid tools below are purpose-built and worth it. If you want to <strong>understand a single company quickly and for free</strong> — its people, hiring, money, locations, tech, news and risk, every claim sourced — that's Company Dossier.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="head center reveal">
      <span class="tab">head to head</span>
      <h2 class="marker">Pick a comparison</h2>
      <p style="margin-left:auto;margin-right:auto">An honest, side-by-side look at Company Dossier against each well-known alternative.</p>
    </div>
    <div class="linkgrid" style="margin-top:30px">
      ${linkCards}
    </div>
  </div>
</section>

${ctaFinal('See it for yourself.', 'open a free, sourced file on any company in minutes.')}
`;

const indexPage = {
  path: '/compare/',
  priority: '0.9',
  changefreq: 'monthly',
  active: '/compare/',
  breadcrumbs: [{ href: '/compare/', label: 'Compare' }],
  title: 'Compare Company Dossier vs Crunchbase, ZoomInfo, Apollo, PitchBook & more',
  description: 'How Company Dossier compares to Crunchbase, ZoomInfo, Apollo, PitchBook, Owler and Clearbit. A free, public-source, fully-sourced company research tool vs paid contact, deal and enrichment platforms. Honest, side-by-side.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: bc([{ href: '/compare/', label: 'Compare' }]),
    },
  ],
  body: indexBody,
};

// ===================== COMPARISON PAGE BUILDER =====================
function comparePage(c) {
  const path = `/compare/${c.slug}/`;
  const cmpRows = [
    ['Price', `<strong>Free</strong>`, c.paid.replace(/\.$/, '')],
    ['Type', 'Public-source company research', c.kind.replace(/^a /, '').replace(/^an /, '')],
    ['Data sources', c.sourcesUs, c.sourcesThem],
    ['Source attribution', `${yes} every line linked`, 'Varies'],
    ['Single readable file', `${yes} one dossier`, 'Dashboard / database / API'],
    ['Runs in editor, CLI & AI', `${yes} web, VS Code, npm, ChatGPT, Claude`, 'Mostly web / API'],
    ['Best for', 'Fast, free first-pass company intelligence', c.bestThem],
  ];
  const table = `<div class="tbl-wrap reveal">
  <table class="cmp">
    <thead>
      <tr><th>&nbsp;</th><th class="col-us">Company Dossier</th><th>${c.name}</th></tr>
    </thead>
    <tbody>
      ${cmpRows.map(r => `<tr><th>${r[0]}</th><td class="col-us">${r[1]}</td><td>${r[2]}</td></tr>`).join('\n      ')}
    </tbody>
  </table>
</div>`;

  const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">compare — ${c.name}</span>
    <h1>The free ${c.name} alternative.</h1>
    <p class="lede">Looking for a ${c.name} alternative — or weighing ${c.name} vs Company Dossier? Here's a fair, accurate read on what each tool does best, so you can pick the right one. Company Dossier is free, built from public sources, and every claim is sourced.</p>
    <div class="cta-row" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:24px">
      <a class="btn solid" href="/get/">Open a free dossier ${arrow}</a>
      <a class="btn" href="/sample/">See a sample file</a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">first, fairly</span>
      <h2 class="marker">What ${c.name} is</h2>
    </div>
    <div class="prose reveal">
      <p>${c.intro}</p>
      <p>${c.paid} It's a strong tool for what it's built to do — and that focus is exactly what makes a comparison useful, because Company Dossier is built for a different job.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">side by side</span>
      <h2 class="marker">${c.name} vs Company Dossier</h2>
      <p style="margin-left:auto;margin-right:auto">A general, honest comparison — no invented prices, no straw men.</p>
    </div>
    ${table}
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">be honest</span>
      <h2 class="marker">When to use ${c.name}</h2>
    </div>
    <div class="prose reveal">
      <p>Reach for ${c.name} when its specialty — ${c.bestThem.toLowerCase()} — is the actual job:</p>
      <ul>
        ${c.whenThem.map(x => `<li>${x}</li>`).join('\n        ')}
      </ul>
      <p>For those jobs, a paid, purpose-built platform is the right call and Company Dossier is not a substitute. We'd rather tell you that than pretend otherwise.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">the other side</span>
      <h2 class="marker">When Company Dossier fits better</h2>
    </div>
    <div class="prose reveal">
      <p>Company Dossier is a fast first-pass intelligence file — free, public-source, fully attributed, and readable in one place. It fits better when:</p>
      <ul>
        ${c.whenUs.map(x => `<li>${x}</li>`).join('\n        ')}
      </ul>
      <p>It's not a contact database and not a replacement for curated paid datasets. It's the step you take first: open a free, sourced file on a company, read its whole story in minutes — overview, people, hiring, money, locations, tech, news, relationships and risk — and decide from there whether deeper paid tools are worth it. And it runs wherever you work: the <a href="/web-app/">web app</a>, the <a href="/vscode-extension/">VS Code extension</a>, the <a href="/cli/">npm CLI</a>, and inside <a href="/chatgpt/">ChatGPT</a> and <a href="/claude/">Claude</a>.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">the fine print</span>
      <h2 class="marker">Questions, answered</h2>
    </div>
    <div class="faq">
      ${c.faq.map((f, i) => {
        const v = ['', ' v2', ' v3'][i % 3];
        return `<article class="qa sk${v} reveal"><h3><span class="marker">Q.</span> ${f.q}</h3><p>${f.a}</p></article>`;
      }).join('\n      ')}
    </div>
    <div style="text-align:center;margin-top:30px" class="reveal">
      <a class="btn solid" href="/get/">Open a free dossier ${arrow}</a>
    </div>
  </div>
</section>

${ctaFinal(`A free first pass before ${c.name}.`, 'open a sourced file on any company in minutes.')}
`;

  return {
    path,
    priority: '0.8',
    changefreq: 'monthly',
    active: '/compare/',
    breadcrumbs: [{ href: '/compare/', label: 'Compare' }, { href: path, label: c.label }],
    title: `${c.name} alternative — free ${c.name} vs Company Dossier`,
    description: `A free ${c.name} alternative: how Company Dossier (public-source, fully-sourced company research) compares to ${c.name}. ${c.name} vs Company Dossier — when to use each, honestly.`,
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: bc([{ href: '/compare/', label: 'Compare' }, { href: path, label: c.label }]),
      },
      {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: c.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
    body,
  };
}

export default [indexPage, ...COMPETITORS.map(comparePage)];
