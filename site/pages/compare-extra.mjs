import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;
const yes = `<span class="checkmark">✓</span>`;
const no = `<span class="checkmark">—</span>`;

// ---- competitor definitions (fair, accurate, no invented prices/features) ----
const COMPETITORS = [
  {
    slug: 'cognism-alternative',
    name: 'Cognism',
    label: 'Cognism alternative',
    kind: 'a B2B sales-intelligence & contact-data platform',
    blurb: 'GDPR-focused B2B contact data and sales intelligence',
    intro: `Cognism is a B2B sales-intelligence platform built around contact and company data, with a strong emphasis on compliance — it's known for GDPR-aware data and good coverage across Europe. Sales and marketing teams use it to find verified phone numbers and emails, build target lists and enrich their CRM, with privacy regulation front of mind. Its core promise is reachable, compliant contact data for go-to-market motions.`,
    paid: `Cognism is a paid, subscription platform aimed at sales and marketing teams; its contact database and compliance tooling are sold by plan and seat.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Proprietary, compliance-focused B2B contact & company database',
    bestThem: 'Compliant contact data and prospecting across Europe',
    whenThem: [
      'You need verified, GDPR-aware contact details — emails and phone numbers — to do outreach.',
      'Your go-to-market motion targets European markets where compliant data matters.',
      'You\'re building and enriching prospect lists inside a CRM at scale.',
    ],
    whenUs: [
      'You want to understand a company before the call, not just obtain a contact record.',
      'You need a sourced overview — people, money, tech, news, risk — in one readable file.',
      'You want a free, public-source briefing rather than a contact-data subscription.',
    ],
    faq: [
      { q: 'Is there a free alternative to Cognism?', a: 'Yes — for company research. Company Dossier is free and assembles a sourced profile of any company from public sources. It is not a contact database, so it won\'t hand you compliant bulk emails or phone numbers; it gives you the context to research a company well, with every claim attributed.' },
      { q: 'Does Company Dossier give you GDPR-compliant contact data?', a: 'No. Company Dossier uses public sources only and is not a contact or lead database. It surfaces leadership and org structure from the public record, not personal contact details, so it serves a different need than a compliance-focused data provider.' },
      { q: 'Why use Company Dossier alongside Cognism?', a: 'Use Cognism to reach the right people with compliant data; use Company Dossier to understand the company first — its money trail, hiring, tech and risk — so your outreach lands with context.' },
    ],
  },
  {
    slug: 'lusha-alternative',
    name: 'Lusha',
    label: 'Lusha alternative',
    kind: 'a contact & prospecting-data tool',
    blurb: 'contact and prospecting data with a freemium model',
    intro: `Lusha is a contact and prospecting-data tool popular with salespeople who want quick access to business emails and phone numbers. It's known for a freemium model and a browser extension that surfaces contact details as you browse, making it a fast, lightweight way to find a person's details. Smaller sales teams and individual reps reach for it to grab a number and move on.`,
    paid: `Lusha offers a free tier with limited credits, but its useful volume of lookups, exports and team features sit behind paid plans.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Proprietary contact database + browser extension lookups',
    bestThem: 'Quickly finding a specific person\'s business contact details',
    whenThem: [
      'You want fast, on-the-fly contact lookups while browsing prospects.',
      'You need business emails and phone numbers for individual outreach.',
      'You\'re a rep who wants a lightweight tool to grab a contact and go.',
    ],
    whenUs: [
      'You want a deep, sourced read on a company, not a single contact\'s details.',
      'You need overview, hiring, money, tech, news and risk in one verifiable file.',
      'You want a free first-pass intelligence file you can run anywhere.',
    ],
    faq: [
      { q: 'Is there a free alternative to Lusha?', a: 'Yes, for the research side. Company Dossier is free and builds a sourced, nine-section company profile from public sources. It isn\'t a contact-lookup tool, so it won\'t pull a person\'s email or phone — it gives you a readable, verifiable company file instead.' },
      { q: 'Does Company Dossier find phone numbers and emails?', a: 'No. It deliberately uses public sources only and is not a contact database. It surfaces leadership and org structure from the public record, not personal contact data like emails or phone numbers.' },
      { q: 'Why use Company Dossier instead of Lusha?', a: 'When you want to understand a company deeply and for free — its money, hiring, tech, news and risk, every claim sourced — rather than grab one person\'s contact details to reach out.' },
    ],
  },
  {
    slug: 'cb-insights-alternative',
    name: 'CB Insights',
    label: 'CB Insights alternative',
    kind: 'a market & startup-intelligence research platform',
    blurb: 'market and startup intelligence with analyst research',
    intro: `CB Insights is a market- and startup-intelligence platform built for analysts and strategy teams. It pairs structured data on private companies, funding and industries with analyst research, market maps and trend reports, helping organizations track emerging technologies and the startup landscape. It's a professional research platform used to inform strategy, and it's priced accordingly.`,
    paid: `CB Insights is a paid, enterprise-priced research platform; its data, market maps and analyst research are sold by subscription to corporate strategy and investment teams.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Curated market dataset + analyst research and market maps',
    bestThem: 'Market trend analysis and startup-landscape intelligence',
    whenThem: [
      'You need curated market maps and analyst research across industries and trends.',
      'You\'re tracking emerging technologies and the broader startup landscape.',
      'You want a maintained, comparable dataset to inform strategy decisions.',
    ],
    whenUs: [
      'You want a quick, free briefing on one company before committing to deep research.',
      'You need the public picture — people, hiring, money, tech, news, risk — in one file.',
      'You want a sourced starting map, not an enterprise research terminal.',
    ],
    faq: [
      { q: 'Is there a free alternative to CB Insights?', a: 'Yes, for a first pass on a single company. Company Dossier is free and compiles a sourced company profile from public sources. It is not a curated market-intelligence dataset and has no analyst research, so it doesn\'t replace CB Insights for market analysis — but it\'s a fast, free way to get oriented on a specific company.' },
      { q: 'Does Company Dossier do market maps and trend analysis?', a: 'No. It builds a single, sourced file on one company at a time. For market maps, analyst reports and trend intelligence across industries, a curated platform like CB Insights is purpose-built for that work.' },
      { q: 'When is Company Dossier enough?', a: 'When you need to understand a single company quickly and cheaply, with every claim verifiable, before deciding whether deeper, paid market research is warranted.' },
    ],
  },
  {
    slug: 'rocketreach-alternative',
    name: 'RocketReach',
    label: 'RocketReach alternative',
    kind: 'a contact-lookup & email-finder tool',
    blurb: 'contact lookup and email finding for individuals',
    intro: `RocketReach is a contact-lookup and email-finder tool. Give it a name and a company and it tries to surface that person's professional email, phone number and social profiles, which makes it handy for recruiters, salespeople and anyone who needs to reach a specific individual. Its focus is narrow and useful: turning a name into a way to make contact.`,
    paid: `RocketReach offers limited free lookups, but meaningful volume, exports and bulk features sit behind paid plans.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Proprietary contact database + email/phone lookup engine',
    bestThem: 'Finding a specific person\'s email, phone and social profiles',
    whenThem: [
      'You need to find a named individual\'s professional email or phone number.',
      'You\'re recruiting or prospecting and need a way to reach specific people.',
      'You want to look up contact details one person at a time, or in bulk.',
    ],
    whenUs: [
      'You want to understand a company, not locate one person\'s contact details.',
      'You need a sourced overview — people, money, tech, news, risk — in one file.',
      'You want a free, public-source briefing rather than a lookup subscription.',
    ],
    faq: [
      { q: 'Is there a free alternative to RocketReach?', a: 'Yes, for company research. Company Dossier is free and builds a sourced, nine-section company profile from public sources. It is not an email finder or contact-lookup tool, so it won\'t turn a name into an email — it gives you a readable, verifiable company file instead.' },
      { q: 'Does Company Dossier find a person\'s email or phone number?', a: 'No. It uses public sources only and is not a contact database or email finder. It surfaces leadership and org structure from the public record, not personal contact details.' },
      { q: 'Why use Company Dossier alongside RocketReach?', a: 'Use RocketReach to find a way to reach a specific person; use Company Dossier to understand the company first — its money, hiring, tech and risk — so your outreach lands with context.' },
    ],
  },
  {
    slug: 'seamless-ai-alternative',
    name: 'Seamless.AI',
    label: 'Seamless.AI alternative',
    kind: 'a real-time sales-lead & contact-search engine',
    blurb: 'real-time search for sales leads and contacts',
    intro: `Seamless.AI is a sales-lead and contact-search engine built around finding prospect contact details in real time. It pitches itself as a live search for verified emails and phone numbers, so reps can build lists and reach decision-makers quickly. It's aimed squarely at outbound sales teams who want fresh contact data to fuel prospecting.`,
    paid: `Seamless.AI has a limited free entry point, but its useful search volume, credits and team features are sold through paid plans.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'Real-time contact-search engine + proprietary lead database',
    bestThem: 'Building sales lead lists with real-time contact data',
    whenThem: [
      'You need fresh contact details — emails and phone numbers — for outbound sales.',
      'You\'re building prospect lists and want real-time search to fill them.',
      'Your team works lead lists daily and depends on contact reach.',
    ],
    whenUs: [
      'You want a deep, sourced read on a company, not a list of leads to call.',
      'You need overview, hiring, money, tech, news and risk in one verifiable file.',
      'You want a free first-pass intelligence file you can run anywhere.',
    ],
    faq: [
      { q: 'Is there a free alternative to Seamless.AI?', a: 'Yes, for the research side. Company Dossier is free and builds a sourced, nine-section company profile from public sources. It isn\'t a contact-search engine, so it won\'t generate lead lists with emails and phone numbers — it gives you a readable, verifiable company file instead.' },
      { q: 'Does Company Dossier generate sales leads?', a: 'No. It uses public sources only and is not a lead or contact database. It produces a single sourced company file — context for research, not a list of prospects to reach.' },
      { q: 'Why use Company Dossier instead of Seamless.AI?', a: 'When you want to understand a company deeply and for free — its money, hiring, tech, news and risk, every claim sourced — rather than build a list of contacts to email or call.' },
    ],
  },
  {
    slug: 'linkedin-sales-navigator-alternative',
    name: 'LinkedIn Sales Navigator',
    label: 'LinkedIn Sales Navigator alternative',
    kind: 'a sales-prospecting tool built on LinkedIn',
    blurb: 'LinkedIn-native sales prospecting and lead search',
    intro: `LinkedIn Sales Navigator is LinkedIn's sales-prospecting tool. It layers advanced search, lead and account lists, and relationship insights on top of LinkedIn's professional network, letting sales teams find decision-makers, track accounts and reach out where buyers already are. Its advantage is the network itself: up-to-date professional profiles and warm paths to people, native to LinkedIn.`,
    paid: `LinkedIn Sales Navigator is a paid subscription on top of LinkedIn, sold in tiers for individuals and teams.`,
    sourcesUs: 'Public web (job boards, filings, news, company sites, maps)',
    sourcesThem: 'LinkedIn\'s professional network + advanced search and insights',
    bestThem: 'Finding and reaching decision-makers through LinkedIn',
    whenThem: [
      'You prospect on LinkedIn and want advanced search, lead lists and InMail.',
      'You rely on up-to-date professional profiles and warm network paths.',
      'Your outreach happens where buyers already are — inside LinkedIn.',
    ],
    whenUs: [
      'You want a company\'s whole story in one place, not a network of profiles to work.',
      'You need overview, hiring, money, tech, news and risk together, all sourced.',
      'You want a free, public-source briefing you can verify line by line.',
    ],
    faq: [
      { q: 'Is there a free alternative to LinkedIn Sales Navigator?', a: 'Yes, for company research. Company Dossier is free and builds a sourced, nine-section company profile from public sources. It is not a LinkedIn prospecting tool, so it won\'t give you network search or InMail — it gives you a readable, verifiable company file instead.' },
      { q: 'Does Company Dossier use LinkedIn data?', a: 'It draws only on public sources across the open web. It is not built on LinkedIn\'s network and has no profile search, lead lists or messaging — it surfaces leadership and org structure from the public record.' },
      { q: 'Why use Company Dossier alongside Sales Navigator?', a: 'Use Sales Navigator to find and reach people through LinkedIn; use Company Dossier to understand the company first — its money, hiring, tech and risk — so your outreach lands with context.' },
    ],
  },
];

function bc(crumbsArr) {
  return [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
    ...crumbsArr.map((c, i) => ({ '@type': 'ListItem', position: i + 2, name: c.label, item: SITE.origin + c.href })),
  ];
}

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

export default COMPETITORS.map(comparePage);
