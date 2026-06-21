import { SITE, icon, ctaFinal, SECTIONS } from '../lib.mjs';

// Slugs for the nine feature pages, in SECTIONS order.
const SLUGS = [
  'overview-and-identity',
  'people-and-org-chart',
  'hiring-radar',
  'money-trail',
  'locations',
  'tech-fingerprint',
  'news-and-timeline',
  'relationship-web',
  'risk-flags',
];

const featPath = (i) => `/features/${SLUGS[i]}/`;

function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
      ...items.map((c, i) => ({
        '@type': 'ListItem', position: i + 2, name: c.label, item: SITE.origin + c.href,
      })),
    ],
  };
}

function faqLd(faq) {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

function faqBlock(faq) {
  const items = faq.map((f, i) => {
    const v = ['', ' v2', ' v3'][i % 3];
    return `<article class="qa sk${v} reveal"><h3><span class="marker">Q.</span> ${f.q}</h3><p>${f.a}</p></article>`;
  }).join('\n');
  return `<section class="sec alt">
  <div class="wrap">
    <div class="head center reveal"><span class="tab">the fine print</span><h2 class="marker">Two quick questions</h2></div>
    <div class="faq">${items}</div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// A) INDEX / HUB
// ---------------------------------------------------------------------------
const hubCards = SECTIONS.map((s, i) => {
  const v = ['', ' v2', ' v3'][i % 3];
  return `<a class="linkcard sk${v} reveal" href="${featPath(i)}">
    ${icon(s.id)}
    <h3>${s.t}</h3>
    <p>${s.d}</p>
  </a>`;
}).join('\n');

const hubBody = `
<section class="sec phero">
  <div class="wrap">
    <span class="tab">the features — nine sections</span>
    <h1>What's in a dossier</h1>
    <p class="lede">Every Company Dossier is built from the same nine sections, each one answering a different question you'd otherwise chase across a dozen tabs. Here's what each section does, where its facts come from, and who leans on it most.</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="wrap">
    <div class="narrow" style="padding:0;max-width:760px;margin:0 auto 38px">
      <div class="prose">
        <p>A dossier isn't a single report so much as nine short investigations stacked into one file. Read top to bottom and you move from <em>what is this company</em> through <em>is it healthy</em> and <em>what is it doing now</em> to <em>what should I watch out for</em> — the four questions almost every piece of company research comes down to. Because the structure never changes, you can open a file on a business you've never heard of and know exactly where to look.</p>
        <p>Each section is assembled the same way: gathered from public sources, de-duplicated, reconciled, and written down with a link back to where every claim came from. That sourcing is the whole point. A line with no source is a rumor; a line you can click through to is something you can act on. The pages below break down each of the nine sections — the concrete data points it surfaces, how those facts are sourced and confidence-rated, and which kinds of readers rely on it most.</p>
        <p>Nothing here requires the target company's cooperation, a login, or a paid data feed. It's all drawn from the open record — job boards, public filings, news, maps, reviews and company sites — which is exactly why a dossier is free and why you can run one on anyone. The nine sections are listed in reading order; start anywhere, but most people read straight down. When you want to see them rendered on a real company rather than described, the <a href="/sample/">sample dossier</a> shows all nine on one page.</p>
        <p>Pick a section to go deep, or open the <a href="/sample/">sample</a> to see them working together.</p>
      </div>
    </div>
    <div class="linkgrid">
      ${hubCards}
    </div>
  </div>
</section>

${ctaFinal('See all nine, on one company.', 'pick a business. read the whole file in minutes.')}
`;

const hub = {
  path: '/features/',
  priority: '0.8',
  changefreq: 'monthly',
  active: undefined,
  breadcrumbs: [{ href: '/features/', label: 'Features' }],
  title: 'Features — the nine sections of a company dossier',
  description: 'Every company dossier is built from nine sourced sections: overview, people, hiring, money, locations, tech, news, relationships and risk. See what each one reveals and how it is sourced.',
  jsonld: [
    breadcrumbLd([{ href: '/features/', label: 'Features' }]),
    {
      '@context': 'https://schema.org', '@type': 'ItemList',
      name: 'The nine sections of a company dossier',
      itemListElement: SECTIONS.map((s, i) => ({
        '@type': 'ListItem', position: i + 1, name: s.t, url: SITE.origin + featPath(i),
      })),
    },
  ],
  body: hubBody,
};

// ---------------------------------------------------------------------------
// B) NINE FEATURE PAGES — distinct copy per section
// ---------------------------------------------------------------------------

// Per-section content. Each entry supplies the bespoke prose blocks.
const FEATURES = [
  // 0 — Overview & identity
  {
    tab: 'section 01 — identity',
    lede: 'The first page of the file: what the company actually does, when it began, who owns it, how big it is, and the brand it goes to market under — the facts that frame everything else.',
    reveals: [
      'A plain-English description of what the company does and the market it sells into — not the slogan, the substance.',
      'Founding year, legal name and any trading or brand names, so the entity you\'re reading about is unambiguous.',
      'Ownership and structure: independent, subsidiary, or part of a group — and the parent or holding company where there is one.',
      'Size signals — employee headcount band, rough scale, and whether the company is public, private or venture-backed.',
      'Industry and sector tags, plus the website and primary domain the rest of the dossier is anchored to.',
    ],
    sourcing: 'Identity facts come from the company\'s own site and registration records first — the most authoritative place to learn a legal name, founding year and what a business says it does. Ownership and structure are cross-checked against public filings and reputable business directories; headcount bands are triangulated from professional networks and hiring footprints rather than taken from any single number. Where two sources disagree, the dossier keeps the better-attributed one and marks the rest as lower confidence, and every claim links back to the page it came from so you can confirm the entity is the one you mean.',
    relies: [
      { href: '/use-cases/sales/', label: 'Sales & BD', why: 'open a call already knowing who they are and how big' },
      { href: '/use-cases/investors/', label: 'Investors', why: 'confirm the entity and its structure before anything else' },
      { href: '/use-cases/procurement/', label: 'Procurement', why: 'make sure you\'re vetting the right legal entity' },
    ],
    cta: ['Start with who they are.', 'one name in. a full identity out.'],
    faq: [
      { q: 'How do you confirm it\'s the right company?', a: 'The dossier anchors to a domain and legal name, then cross-checks the founding year, brand names and ownership against filings and the company\'s own site — so you can be sure you\'re reading about the entity you meant, not a similarly named one.' },
      { q: 'Where does the headcount number come from?', a: 'It\'s a band, not a precise figure, triangulated from professional networks and the company\'s hiring footprint rather than a single self-reported number — and it links back to its sources so you can judge it.' },
    ],
  },
  // 1 — People & org chart
  {
    tab: 'section 02 — people',
    lede: 'Who runs the company and how it\'s shaped: leadership, notable hires, and a sketch of who reports into whom — so you know the room before you walk into it.',
    reveals: [
      'Named leadership — founders, C-suite and key executives — with titles and, where public, how long they\'ve been there.',
      'Notable or senior recent hires that signal where the company is investing in its bench.',
      'A sketch of the org shape: which functions are deep, which are thin, and roughly how reporting lines run.',
      'Departures and tenure patterns at the top, which often say as much as the arrivals.',
      'Public profiles and links for the people who matter, so you can go straight to the source on anyone.',
    ],
    sourcing: 'People data is drawn from public professional profiles, the company\'s own leadership and team pages, press releases announcing appointments, and conference or interview appearances. The org sketch is inferred — reconstructed from titles and reporting hints in public bios, never presented as an internal chart the company published. Because roles change and titles get stale, each name links to where it was found and carries a freshness signal; the dossier favors recently confirmed positions and flags anything it can only partially verify, so you can tell a confirmed CFO from a best-guess one.',
    relies: [
      { href: '/use-cases/recruiting/', label: 'Recruiters', why: 'know the team and reporting lines before you pitch a role' },
      { href: '/use-cases/sales/', label: 'Sales & BD', why: 'find the real decision-maker, not just a name on a page' },
      { href: '/use-cases/journalists/', label: 'Journalists', why: 'map who\'s accountable for what before you reach out' },
    ],
    cta: ['Know the room first.', 'see the people and the shape behind them.'],
    faq: [
      { q: 'Is the org chart official?', a: 'No — it\'s a sketch reconstructed from public titles and bios, not an internal chart the company released. It shows you roughly where the depth and the reporting lines are, with every name linked to its source.' },
      { q: 'How current are the people listed?', a: 'Each role carries a freshness signal and links back to where it was found. The dossier favors recently confirmed positions and flags anything it can only partially verify, since titles go stale fast.' },
    ],
  },
  // 2 — Hiring radar
  {
    tab: 'section 03 — hiring',
    lede: 'The clearest public signal of where a company is heading: the roles it\'s posting right now, what it\'s building, and where headcount is quietly growing.',
    reveals: [
      'Open roles pulled from the job boards, grouped by function so you can see where the company is staffing up.',
      'What the postings imply about priorities — a wave of sales hires, a new platform team, a first compliance role.',
      'Locations and remote policy revealed by where the jobs are based.',
      'Seniority mix, which hints at whether they\'re building a layer or back-filling one.',
      'Tooling and stack mentions buried in job descriptions — often the earliest signal of a new direction.',
    ],
    sourcing: 'Hiring data is gathered straight from public job boards and the company\'s own careers page — postings a business publishes precisely so the world will read them. The dossier de-duplicates the same role listed in several places, normalizes titles, and dates each posting so you can tell a fresh push from a stale evergreen ad. Because boards lag and cache, listings carry a recency note and link back to the original posting; volume and trend matter more than any single role, so the section leans on the pattern across postings rather than over-reading one ambiguous title.',
    relies: [
      { href: '/use-cases/recruiting/', label: 'Recruiters', why: 'time outreach to the moment a team is staffing up' },
      { href: '/use-cases/sales/', label: 'Sales & BD', why: 'spot budget and new initiatives before they\'re announced' },
      { href: '/use-cases/investors/', label: 'Investors', why: 'read growth and direction from where headcount is moving' },
    ],
    cta: ['Read where they\'re going.', 'the jobs they post tell you first.'],
    faq: [
      { q: 'Where do the job listings come from?', a: 'Public job boards and the company\'s own careers page — postings published for the world to read. The dossier de-duplicates, normalizes titles and dates each one, with a link back to the original.' },
      { q: 'How do you know a posting is still open?', a: 'Each listing carries a recency note and links to the source so you can confirm it\'s live. Boards lag and cache, so the section weighs the overall trend more than any single role.' },
    ],
  },
  // 3 — Money trail
  {
    tab: 'section 04 — money',
    lede: 'The financial shape of the business, as far as the public record shows: funding rounds, investors, filings and revenue signals — assembled, not guessed.',
    reveals: [
      'Funding rounds with dates, stages and amounts where they\'ve been disclosed.',
      'Named investors and backers, and the syndicate behind the company.',
      'Public filings and any disclosed financials for companies that report them.',
      'Revenue and traction signals — pricing, customer counts, public metrics — where the company has put them on record.',
      'A read on financial posture: well-capitalized, raising, bootstrapped or quiet.',
    ],
    sourcing: 'Money facts are the most carefully hedged in the dossier, because the public record is patchy for private companies. Disclosed rounds and investors come from press releases, regulatory filings and reputable funding databases; revenue signals are inferred from public statements, pricing and proxies, never invented. The section is explicit about what\'s confirmed versus estimated, dates every figure, and links to the filing or article behind it. Where there\'s no public number, it says so rather than filling the gap — a dossier sketches financial shape, it is not an audited statement or a substitute for due diligence.',
    relies: [
      { href: '/use-cases/investors/', label: 'Investors', why: 'size up funding, backers and runway at a glance' },
      { href: '/use-cases/due-diligence/', label: 'Due diligence', why: 'see the financial shape before commissioning the deep dive' },
      { href: '/use-cases/founders/', label: 'Founders', why: 'benchmark a competitor\'s raise and backers' },
    ],
    cta: ['Follow the money trail.', 'funding, backers and signals, all sourced.'],
    faq: [
      { q: 'Can I trust the revenue figures?', a: 'Treat them as signals, not statements. Disclosed rounds and investors are sourced from filings and press; revenue is inferred from public proxies and clearly marked as estimated. The section says when a number is confirmed versus a best read.' },
      { q: 'What if a company hasn\'t disclosed its finances?', a: 'Then the section says so rather than guessing. For private companies the record is patchy, and a dossier sketches financial shape — it is not an audited statement or a replacement for formal due diligence.' },
    ],
  },
  // 4 — Locations
  {
    tab: 'section 05 — locations',
    lede: 'The company\'s physical footprint, plotted on a map: headquarters and offices at a glance, so you read the geography instead of parsing a list of addresses.',
    reveals: [
      'Headquarters location and any additional offices or sites, pinned on a map.',
      'The geographic spread — single-city, national or international — visible in one look.',
      'Which markets the company has a real on-the-ground presence in versus where it\'s only remote.',
      'Clusters that hint at where engineering, sales or operations actually sit.',
      'Address-level detail where it\'s public, linked back to its source.',
    ],
    sourcing: 'Location data is assembled from the company\'s own contact and office pages, public map and places listings, business registrations, and the office locations attached to job postings. The dossier reconciles the same site listed across sources and plots it, distinguishing a confirmed office from a single unverified mention. Map and places data can go stale when a company moves, so each pin links to its source and the section notes how recently it was seen — and it\'s careful not to mistake a registered agent\'s address or a coworking mailbox for a genuine office.',
    relies: [
      { href: '/use-cases/sales/', label: 'Sales & BD', why: 'know which territory and timezone you\'re really selling into' },
      { href: '/use-cases/procurement/', label: 'Procurement', why: 'confirm a vendor\'s real operating locations' },
      { href: '/use-cases/recruiting/', label: 'Recruiters', why: 'see where teams actually sit before you pitch a role' },
    ],
    cta: ['See the whole footprint.', 'every office, pinned on one map.'],
    faq: [
      { q: 'Are the office locations verified?', a: 'The section distinguishes a confirmed office from a single unverified mention, and each pin links to its source. It\'s careful not to count a registered-agent address or a coworking mailbox as a real office.' },
      { q: 'What if the company has moved?', a: 'Map and places data can lag a move, so each location notes how recently it was seen and links back to the source, letting you confirm anything that matters before you act on it.' },
    ],
  },
  // 5 — Tech fingerprint
  {
    tab: 'section 06 — tech',
    lede: 'The stack the company builds on and the tools it runs — useful for a pitch, a partnership, or sizing up a competitor without a single call.',
    reveals: [
      'Front-end and back-end technologies detectable from the public-facing product and site.',
      'Infrastructure and hosting signals — where and how the product appears to run.',
      'Marketing, analytics and sales tools loaded on the site, which reveal how they go to market.',
      'Tooling named in job postings and engineering content, often ahead of anything on the site.',
      'A read on technical maturity and direction from the mix of what\'s in use.',
    ],
    sourcing: 'Tech signals are detected from publicly observable surfaces only — the technologies a site loads in any visitor\'s browser, public DNS and infrastructure records, open engineering blogs and conference talks, and the stack named in job descriptions. Nothing here involves probing private systems or unauthorized access; it\'s the same fingerprint anyone viewing the public site could read. Detection is best-effort, so the section separates confidently identified tools from likely ones, links the evidence, and notes that the public surface can lag the internal reality — a company may have migrated off something still visible at the edge.',
    relies: [
      { href: '/use-cases/sales/', label: 'Sales & BD', why: 'tailor a pitch to the exact stack they already run' },
      { href: '/use-cases/founders/', label: 'Founders', why: 'see how a competitor builds and where they\'ve invested' },
      { href: '/use-cases/investors/', label: 'Investors', why: 'gauge technical maturity from the tools in use' },
    ],
    cta: ['Read their stack.', 'the tools they build on, without a call.'],
    faq: [
      { q: 'Is detecting the tech stack invasive?', a: 'No. It reads only publicly observable surfaces — the technologies a site loads for any visitor, public infrastructure records, open engineering content and job descriptions. The same fingerprint anyone viewing the public site could read.' },
      { q: 'How accurate is the stack detection?', a: 'Best-effort. The section separates confidently identified tools from likely ones and links the evidence. The public surface can lag the internal reality, so a migrated-off tool may still show at the edge.' },
    ],
  },
  // 6 — News & timeline
  {
    tab: 'section 07 — news',
    lede: 'The company\'s story in order: press, launches and milestones laid out as a dated timeline, so you catch up on years of moves in a couple of minutes.',
    reveals: [
      'Recent press and coverage, dated and summarized so you can skim the headlines that matter.',
      'Product launches, major releases and announcements on a single timeline.',
      'Milestones — raises, acquisitions, partnerships, expansions — in the order they happened.',
      'Momentum signals: a flurry of news versus a long quiet stretch.',
      'Links to every original article and release so you can read the full story behind any entry.',
    ],
    sourcing: 'The timeline is built from public news coverage, the company\'s own press releases and blog, and reputable industry outlets. Each entry is dated, attributed to its outlet, and linked to the original so you can weigh the source — a self-published release reads differently from independent coverage, and the section makes that distinction visible. It favors reputable outlets, notes when an item is the company\'s own announcement versus third-party reporting, and orders everything chronologically so the arc of the company\'s story is the thing you see first, not a pile of disconnected headlines.',
    relies: [
      { href: '/use-cases/journalists/', label: 'Journalists', why: 'get the chronology and sources before you start digging' },
      { href: '/use-cases/sales/', label: 'Sales & BD', why: 'open with a relevant, recent moment instead of a cold line' },
      { href: '/use-cases/investors/', label: 'Investors', why: 'trace momentum and milestones in one pass' },
    ],
    cta: ['Catch up in two minutes.', 'the whole story, dated and in order.'],
    faq: [
      { q: 'Does the timeline tell company news from press coverage?', a: 'Yes. Each entry is attributed to its outlet and notes whether it\'s the company\'s own announcement or third-party reporting, with a link to the original so you can weigh the source yourself.' },
      { q: 'How far back does it go?', a: 'It captures the milestones and coverage the public record holds, ordered chronologically so the arc of the company\'s story is what you see first — with links to read the full piece behind any entry.' },
    ],
  },
  // 7 — Relationship web
  {
    tab: 'section 08 — relationships',
    lede: 'The company read by the company it keeps: customers, partners and rivals drawn as a network, so the ecosystem around a business becomes something you can see.',
    reveals: [
      'Named customers and case studies the company has made public.',
      'Partners, integrations and resellers that show how it plugs into a wider ecosystem.',
      'Competitors and the rivals it positions itself against.',
      'Investors and advisors that connect it into a broader network.',
      'The shape of the web — densely connected and central, or off on its own edge.',
    ],
    sourcing: 'Relationships are mapped from public sources: customer logos and case studies on the company\'s site, partnership and integration announcements, press naming customers or rivals, and directory listings. Edges in the web are only as good as their evidence, so each connection links to where it was found and is typed by what it is — a published customer is firmer than an inferred competitor. The section is careful to mark inferred or one-directional links as such, and not to overstate a relationship that rests on a single mention, so the network you read is one you can defend.',
    relies: [
      { href: '/use-cases/sales/', label: 'Sales & BD', why: 'find warm paths and see who they already work with' },
      { href: '/use-cases/founders/', label: 'Founders', why: 'map the competitive and partner landscape at a glance' },
      { href: '/use-cases/journalists/', label: 'Journalists', why: 'follow the connections between companies and people' },
    ],
    cta: ['Read the company it keeps.', 'customers, partners and rivals, mapped.'],
    faq: [
      { q: 'How solid are the connections in the web?', a: 'Each edge links to its evidence and is typed by what it is — a published customer logo is firmer than an inferred competitor. Inferred or one-sided links are marked as such so you can tell a fact from a guess.' },
      { q: 'Where do the relationships come from?', a: 'Public sources only: customer logos and case studies, partnership and integration announcements, press, and directory listings — never private CRM or contract data.' },
    ],
  },
  // 8 — Risk flags
  {
    tab: 'section 09 — risk',
    lede: 'The things worth a second look, surfaced rather than buried: lawsuits, layoffs and reputation notes — so nothing about a company catches you off guard later.',
    reveals: [
      'Litigation and legal disputes that have surfaced in the public record.',
      'Layoffs, restructurings and other distress signals reported publicly.',
      'Reputation notes — recurring complaints, controversies or negative coverage worth weighing.',
      'Regulatory or compliance issues where they\'ve been reported.',
      'Volatility signals — leadership churn, abrupt pivots — that suggest a closer look.',
    ],
    sourcing: 'Risk items come strictly from the public record — court and regulatory filings, credible news reporting, and widely documented accounts — and the section holds them to a higher bar than the rest of the dossier, because a flag carries weight. Each item is attributed and linked, dated, and framed as something to verify rather than a verdict; the dossier surfaces what\'s on the record and points you to it, but does not adjudicate or conclude. It deliberately avoids unsourced rumor and single-source allegations dressed as fact, so a flag is a prompt to look closer, never an accusation.',
    relies: [
      { href: '/use-cases/due-diligence/', label: 'Due diligence', why: 'surface red flags before the expensive deep dive' },
      { href: '/use-cases/procurement/', label: 'Procurement', why: 'vet a vendor for trouble before you sign' },
      { href: '/use-cases/investors/', label: 'Investors', why: 'know what to ask about before you commit' },
    ],
    cta: ['No surprises later.', 'the second-look items, surfaced not buried.'],
    faq: [
      { q: 'Is a risk flag an accusation?', a: 'No. A flag is a prompt to look closer — something on the public record, attributed and linked, that\'s worth verifying. The dossier surfaces what\'s reported and points you to it; it does not adjudicate or conclude.' },
      { q: 'How do you keep risk items fair?', a: 'They\'re held to a higher bar than the rest of the file — drawn from court and regulatory filings and credible reporting, dated and sourced, with unsourced rumor and single-source allegations deliberately left out.' },
    ],
  },
];

function featureBody(s, f, i) {
  const reveals = f.reveals.map(r => `<li>${r}</li>`).join('\n        ');
  const relies = f.relies.map(r =>
    `<li><strong><a href="${r.href}">${r.label}</a></strong> — ${r.why}.</li>`).join('\n        ');
  return `
<section class="sec phero">
  <div class="wrap">
    <span class="tab">${f.tab}</span>
    <h1>${s.t}</h1>
    <p class="lede">${f.lede}</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="narrow">
    <div class="prose">
      <p>${s.d} It\'s one of the <a href="/features/">nine sections</a> in every dossier, and below is exactly what this one does — what it surfaces, where those facts come from, and who leans on it.</p>

      <h2>What this section reveals</h2>
      <p>Concretely, the ${s.t.toLowerCase()} section gathers:</p>
      <ul>
        ${reveals}
      </ul>
      <p>None of it requires the company's cooperation — it's all there in the open record, just scattered until the dossier pulls it into one place. You can see it rendered on a real business in the <a href="/sample/">sample dossier</a>.</p>

      <h2>How it's sourced</h2>
      <p>${f.sourcing}</p>

      <h2>Who relies on it</h2>
      <p>This section earns its keep for anyone whose work turns on it:</p>
      <ul>
        ${relies}
      </ul>
      <p>See how the whole file fits together on <a href="/how-it-works/">how it works</a>, browse the other <a href="/features/">eight sections</a>, or <a href="/get/">open a dossier</a> and read this section on a company that matters to you.</p>
    </div>
  </div>
</section>

${faqBlock(f.faq)}

${ctaFinal(f.cta[0], f.cta[1])}
`;
}

const featurePages = SECTIONS.map((s, i) => {
  const f = FEATURES[i];
  const path = featPath(i);
  const crumbs = [
    { href: '/features/', label: 'Features' },
    { href: path, label: s.t },
  ];
  return {
    path,
    priority: '0.7',
    changefreq: 'monthly',
    active: undefined,
    breadcrumbs: crumbs,
    title: `${s.t} — what this dossier section reveals`,
    description: `${s.d} See what the ${s.t.toLowerCase()} section of a company dossier reveals, how it's sourced from public data, and who relies on it.`,
    ogType: 'article',
    jsonld: [
      breadcrumbLd(crumbs),
      faqLd(f.faq),
    ],
    body: featureBody(s, f, i),
  };
});

export default [hub, ...featurePages];
