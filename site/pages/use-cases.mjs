import { SITE, icon, ctaFinal, SECTIONS } from '../lib.mjs';

// ---- helpers ----------------------------------------------------------
const SEC = {};
for (const s of SECTIONS) SEC[s.id] = s;

const ld = (obj) => obj; // jsonld entries are passed through the page builder

function crumbList(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' }].concat(
      items.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.label,
        item: SITE.origin + c.href,
      }))
    ),
  };
}

function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function faqBlock(faqs) {
  const items = faqs
    .map((f, i) => {
      const v = ['', ' v2', ' v3'][i % 3];
      return `<article class="qa sk${v} reveal"><h3><span class="marker">Q.</span> ${f.q}</h3><p>${f.a}</p></article>`;
    })
    .join('\n');
  return `<div class="faq">${items}</div>`;
}

// "what you get" — tie chosen SECTIONS to a persona-specific reason
function getBlock(rows) {
  const cards = rows
    .map((r, i) => {
      const v = ['', ' v2', ' v3'][i % 3];
      const s = SEC[r.id];
      return `<article class="cell sk${v} reveal">${icon(s.id)}<h3>${s.t}</h3><p>${r.why}</p></article>`;
    })
    .join('\n');
  return `<div class="grid3" style="margin-top:30px">${cards}</div>`;
}

function steps(rows) {
  const cards = rows
    .map((r, i) => {
      const v = ['', ' v2', ' v3', ' v2'][i % 4];
      const arrow =
        i < rows.length - 1
          ? `<svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg>`
          : '';
      return `<article class="step sk${v} reveal"><div class="big">${i + 1}</div>${icon(
        r.id
      )}<h3>${r.t}</h3><p>${r.d}</p>${arrow}</article>`;
    })
    .join('\n');
  return `<div class="steps">${cards}</div>`;
}

// =======================================================================
// A) INDEX HUB
// =======================================================================
const PERSONAS = [
  {
    href: '/use-cases/sales/',
    icon: 'i-bag',
    label: 'Sales & BD',
    hook: 'Walk into the call already knowing the room — and exactly where you fit.',
  },
  {
    href: '/use-cases/recruiting/',
    icon: 'i-people',
    label: 'Recruiters & talent',
    hook: 'Vet an employer and sketch the org chart before you pitch a candidate.',
  },
  {
    href: '/use-cases/investors/',
    icon: 'i-coins',
    label: 'Investors & VC',
    hook: 'Source, screen and map a private company without a week of open tabs.',
  },
  {
    href: '/use-cases/founders/',
    icon: 'i-radar',
    label: 'Founders & strategy',
    hook: 'Size a competitor, map the market and scout partners on one page.',
  },
  {
    href: '/use-cases/journalists/',
    icon: 'i-glass',
    label: 'Journalists & researchers',
    hook: 'Start an investigation with a map of the company instead of a blank page.',
  },
  {
    href: '/use-cases/due-diligence/',
    icon: 'i-shield',
    label: 'Due diligence & M&A',
    hook: 'Run a fast first-pass file on a target before the real diligence begins.',
  },
  {
    href: '/use-cases/procurement/',
    icon: 'i-scale',
    label: 'Procurement & vendor vetting',
    hook: 'Do a KYB-style check on a supplier and surface the risk flags early.',
  },
];

const linkgrid = `<div class="linkgrid">
${PERSONAS.map((p, i) => {
  const v = ['', ' v2', ' v3'][i % 3];
  return `  <a class="linkcard sk${v} reveal" href="${p.href}">${icon(
    p.icon
  )}<h3>${p.label}</h3><p>${p.hook}</p></a>`;
}).join('\n')}
</div>`;

const indexBody = `
<section class="sec phero">
  <div class="wrap">
    <span class="tab fill">section 05 — who opens files</span>
    <h1>Who opens a dossier</h1>
    <p class="lede">Different jobs, one habit: doing your homework on a company before you act. Here is who reaches for a dossier, why, and what they pull out of it.</p>
  </div>
</section>

<section class="sec" style="padding-top:18px">
  <div class="wrap narrow prose">
    <p>A dossier is a fast, sourced map of a company built entirely from the public record — its people, hiring, money, locations, tech, news, relationships and risk, all in one file. That map means different things depending on the chair you sit in.</p>
    <p>A salesperson reads it for the angle: who runs the place, what they are hiring for, where the budget might be moving. A recruiter reads the same file for the org chart and the headcount curve — is this a healthy place to send a candidate, and who would they report to. An investor reads it to screen a deal in minutes instead of a morning. A founder reads it to size a competitor or scout a partner. A journalist reads it to find the thread worth pulling. And the diligence and procurement crowd read it as a first-pass risk file — a fast way to know whether a target or a supplier deserves a deeper look.</p>
    <p>The point is not that a dossier replaces your judgement. It does the legwork — the forty tabs, the cross-referencing, the "where did I read that" — so the first ninety seconds of your research are already done. Every line points back to where it came from, so you can verify anything before you lean on it. Treat it as a starting map, not a verdict.</p>
    <p>Same nine sections every time. What changes is which sections you read first, and what you do with them. Pick the chair that fits the work in front of you:</p>
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="head center reveal">
      <span class="tab">pick a chair</span>
      <h2 class="marker">Seven ways people read the file</h2>
      <p style="margin-left:auto;margin-right:auto">Each page below is written for one job — the searches, the workflow and the sections that matter to it.</p>
    </div>
    ${linkgrid}
  </div>
</section>

<section class="sec">
  <div class="wrap narrow prose">
    <p>Don't see your exact role? The file is the same regardless. If your week involves figuring out a company you don't already know — to sell to it, hire from it, fund it, compete with it, report on it or buy from it — a dossier saves you the first hour. Start anywhere above, or just <a href="/get/">open a file</a> on a company you already have an opinion about and see how much the public record agrees with you.</p>
  </div>
</section>

${ctaFinal('Open a file on anyone.', 'pick a company. read the whole story in minutes.')}
`;

const indexPage = {
  path: '/use-cases/',
  active: '/use-cases/',
  priority: '0.9',
  changefreq: 'monthly',
  breadcrumbs: [{ href: '/use-cases/', label: 'Use cases' }],
  title: 'Use cases — who opens a company dossier and why',
  description:
    'Who uses Company Dossier: sales, recruiting, investors, founders, journalists, due diligence and procurement. One sourced file from public data, read seven different ways.',
  jsonld: [
    crumbList([{ href: '/use-cases/', label: 'Use cases' }]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: PERSONAS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.label,
        url: SITE.origin + p.href,
      })),
    },
  ],
  body: indexBody,
};

// =======================================================================
// Persona page factory
// =======================================================================
function persona({ slug, name, tab, h1, lede, intro, get, work, faqs, cta }) {
  const path = `/use-cases/${slug}/`;
  const body = `
<section class="sec phero">
  <div class="wrap">
    <span class="tab fill">${tab}</span>
    <h1>${h1}</h1>
    <p class="lede">${lede}</p>
  </div>
</section>

<section class="sec" style="padding-top:18px">
  <div class="wrap narrow prose">
    ${intro}
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="head reveal">
      <span class="tab">what you get</span>
      <h2 class="marker">${get.heading}</h2>
      <p>${get.sub}</p>
    </div>
    ${getBlock(get.rows)}
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="head reveal">
      <span class="tab">the workflow</span>
      <h2 class="marker">${work.heading}</h2>
      <p>${work.sub}</p>
    </div>
    ${work.steps ? steps(work.steps) : ''}
    ${work.after ? `<div class="narrow prose" style="margin-top:30px">${work.after}</div>` : ''}
  </div>
</section>

<section class="sec alt">
  <div class="wrap">
    <div class="head center reveal"><span class="tab">straight answers</span><h2 class="marker">Questions, answered</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>

${ctaFinal(cta.h, cta.s)}
`;

  return {
    path,
    active: '/use-cases/',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumbs: [
      { href: '/use-cases/', label: 'Use cases' },
      { href: path, label: name },
    ],
    title: get.title,
    description: get.desc,
    jsonld: [
      crumbList([
        { href: '/use-cases/', label: 'Use cases' },
        { href: path, label: name },
      ]),
      faqPage(faqs),
    ],
    body,
  };
}

// =======================================================================
// 1. SALES & BD
// =======================================================================
const salesPage = persona({
  slug: 'sales',
  name: 'Sales & BD',
  tab: 'use case — sales & bd',
  h1: 'Pre-call research that finds the angle',
  lede:
    'Sales prospect research without the tab graveyard. A dossier hands you the account on one page — who runs it, what they are buying for, and where you fit — so you walk into the call with a point of view.',
  intro: `
    <p>Every rep knows the rule and skips it anyway: research the account before the call. Not because it doesn't help — because doing it properly means a LinkedIn dive, a funding lookup, a careers-page skim and a news search, and you have eleven other accounts to touch today. So the call happens cold, you spend the first ten minutes asking questions you could have answered yourself, and the prospect can tell.</p>
    <p>A company dossier is the account-research tool that closes that gap. Type the company name and you get back a sourced brief: leadership and reporting lines, the hiring radar that hints at where budget is moving, recent funding and revenue signals, the tech they already run, and the headlines you should reference but pretend you didn't have to look up. It is the pre-call company research you'd do if you had an hour — done in two minutes.</p>`,
  get: {
    title: 'Sales prospect research & account research tool | Company Dossier',
    desc:
      'Pre-call company research and account planning in one sourced file: leadership, hiring signals, funding, tech stack and news. The account research tool for sales and BD.',
    heading: 'The account, on one page',
    sub: 'Four of the nine sections do most of the work for a sales call. Read these first.',
    rows: [
      { id: 'i-org', why: 'See who actually runs the account and who reports to whom — so you target the economic buyer, not the gatekeeper, and name-check the right people on the call.' },
      { id: 'i-radar', why: 'Open roles are the loudest budget signal a private company gives off. A burst of hiring in a team is a department that just got funded — and a reason for your call.' },
      { id: 'i-coins', why: 'A fresh raise or a strong revenue signal tells you the deal size to aim for and whether now is the moment. Walk in knowing if they can afford you.' },
      { id: 'i-chip', why: 'The tech fingerprint shows what they already run, so you can frame your pitch around fit and integration instead of guessing at their stack live on the call.' },
    ],
  },
  work: {
    heading: 'From cold name to warm call',
    sub: 'A repeatable pre-call ritual you can actually run between meetings.',
    steps: [
      { id: 'i-glass', t: 'Pull the file', d: 'Drop the company name in before the call. The dossier assembles the public record while you finish your coffee.' },
      { id: 'i-org', t: 'Find the room', d: 'Scan the org sketch and locate your buyer and the people around them. Note one name to reference.' },
      { id: 'i-radar', t: 'Spot the trigger', d: 'Read hiring and money for the reason to call now — a new team, a raise, a market push you can hang the conversation on.' },
      { id: 'i-doc', t: 'Open with a point of view', d: 'Lead with what you saw, not a discovery quiz. "Looks like you are scaling the ops team — most teams hit X about then." ' },
    ],
    after: `<p>For account planning across a book of business, run the file on every logo in your territory and you have a stack of briefs you can prioritise — the accounts with hiring and funding momentum rise to the top. It is also the fastest way to prep a renewal or an expansion: pull the dossier again and see what changed since you last spoke.</p>`,
  },
  faqs: [
    { q: 'How is this different from LinkedIn Sales Navigator or my CRM?', a: 'Those are great for contacts and for what your team already knows. A dossier is the outside view — it assembles the full public picture of the company itself (hiring, money, tech, news, risk), sourced, in one pass, so you are not stitching ten tabs together by hand.' },
    { q: 'Is the data current enough to reference on a call?', a: 'It is built fresh from live public sources each time you run it, and every line points back to where it came from. Skim the source before you quote a number on a call — treat the file as a fast, honest starting map, not gospel.' },
    { q: 'Can I run this on a whole target list?', a: 'Yes. Run a file per account and prioritise by the signals that matter to you — recent funding, a hiring spike, a fresh launch. It turns a flat list into a ranked one in an afternoon.' },
  ],
  cta: { h: 'Stop calling in cold.', s: 'pull the account file before the next meeting.' },
});

// =======================================================================
// 2. RECRUITERS & TALENT
// =======================================================================
const recruitingPage = persona({
  slug: 'recruiting',
  name: 'Recruiters & talent',
  tab: 'use case — recruiters & talent',
  h1: 'Vet the employer before you pitch it',
  lede:
    'Company research for recruiters: map the org chart, read the headcount curve and do quick employer due diligence — so when you sell a candidate on a company, you actually know the place.',
  intro: `
    <p>A recruiter's credibility lives or dies on one question from a candidate: "so what's it actually like there?" If the answer is a careers-page paraphrase, the candidate hears it. Real company research for recruiters means knowing how the team is shaped, whether the company is growing or quietly shrinking, who the new hire would sit next to, and whether there are any flags a sharp candidate would find on their own and hold against you for not mentioning.</p>
    <p>A dossier does that employer due diligence in one pass. It sketches the org so you can see the reporting lines, reads the hiring radar to show whether headcount is climbing or stalling, surfaces funding and news that tell you if the company is on the way up, and flags the layoffs, suits or reputation notes worth knowing before you put your name behind the pitch.</p>`,
  get: {
    title: 'Company research for recruiters — employer due diligence | Company Dossier',
    desc:
      'Company research for recruiters and talent teams: org-chart mapping, headcount and hiring signals, and employer due diligence flags — sourced from public data in one file.',
    heading: 'The employer, end to end',
    sub: 'Recruiters live in four of the nine sections. These tell you whether a place is worth a candidate.',
    rows: [
      { id: 'i-org', why: 'A sketched org chart and reporting lines show exactly where a candidate would land, who they would report to, and how deep the team around them is. The single most useful thing to know before a pitch.' },
      { id: 'i-radar', why: 'The hiring radar is your headcount read: a wave of open roles means a team scaling up; a hiring freeze tells a different story. It also shows what else they are recruiting for, so you can spot competing offers.' },
      { id: 'i-coins', why: 'Funding and revenue signals answer the candidate question you can never quite dodge — is this place stable, and is it on the way up. A recent raise is a strong story to sell with.' },
      { id: 'i-flag', why: 'Risk flags surface layoffs, lawsuits and reputation notes before a candidate Googles them. Knowing about a recent round of cuts changes how you pitch — and protects your relationship.' },
    ],
  },
  work: {
    heading: 'From a job order to a confident pitch',
    sub: 'Run it on the hiring company, and run it on the competitors you are poaching from.',
    steps: [
      { id: 'i-glass', t: 'File the employer', d: 'Pull the dossier on the company you are recruiting for — or the one a candidate is asking you about.' },
      { id: 'i-org', t: 'Map the seat', d: 'Trace the org sketch to the team and level the role sits in. Now you can describe the actual reporting line.' },
      { id: 'i-flag', t: 'Check for flags', d: 'Scan risk and news for layoffs, suits or churn. Better you raise it than the candidate finds it.' },
      { id: 'i-doc', t: 'Pitch with proof', d: 'Sell with specifics — the team is scaling, the raise was recent, the leader is credible — instead of brochure language.' },
    ],
    after: `<p>It works the other direction too. Building a sourcing map of a market? Run a file on each competitor to read their org and hiring radar — that's where the candidates are, and which teams are growing tells you who might be ready to move. For executive search, the leadership and news sections give you the relationship context to approach a passive candidate intelligently.</p>`,
  },
  faqs: [
    { q: 'Where does the org-chart data come from — is it accurate?', a: 'It is assembled from public signals (company sites, job posts, public profiles, news), so think of the org sketch as a well-informed approximation, not an HR export. Every section is sourced so you can verify a reporting line before you describe it to a candidate.' },
    { q: 'Can I use it to research competitors I source candidates from?', a: 'Yes — that is one of the best uses. A file per competitor gives you their team shape and hiring radar, which is effectively a sourcing map of where the talent is and which teams are growing or contracting.' },
    { q: 'Does the company know I ran a dossier on them?', a: 'No. It only uses public information and the company is not involved or notified. It gathers what any candidate could find for themselves — just faster and in one place.' },
  ],
  cta: { h: 'Know the place before you pitch it.', s: 'pull the employer file in one search.' },
});

// =======================================================================
// 3. INVESTORS & VC
// =======================================================================
const investorsPage = persona({
  slug: 'investors',
  name: 'Investors & VC',
  tab: 'use case — investors & vc',
  h1: 'Private company research at sourcing speed',
  lede:
    'VC deal sourcing and screening on one page. A dossier gives you private company research, light diligence and competitor analysis — fast enough to triage a pipeline, sourced enough to trust.',
  intro: `
    <p>The hard part of early-stage investing isn't the deep diligence — it's everything before it. You see far more companies than you can fund, and most of the work is triage: figuring out, quickly, whether a private company is worth a real conversation. Private company research is genuinely hard because the data is scattered and the company has no obligation to publish it. So screening either eats a morning per name, or it doesn't happen and you fly on the deck alone.</p>
    <p>A dossier is the screening layer. Point it at a private company and you get a sourced snapshot: what they do, who's behind it, the funding history and investors on the cap table as far as the public record shows, the hiring radar as a growth proxy, the tech they're building on, and the relationship web of customers, partners and rivals. It's the VC deal sourcing research you'd assign to an analyst — without the wait.</p>`,
  get: {
    title: 'Private company research & VC deal sourcing | Company Dossier',
    desc:
      'Private company research for investors and VCs: sourcing, screening, market mapping and competitor analysis with light diligence — funding, team and traction signals in one sourced file.',
    heading: 'A screen, not a maybe',
    sub: 'Five sections do the screening work. Read them in order and you have a first opinion in minutes.',
    rows: [
      { id: 'i-building', why: 'Overview and identity gives you the one-paragraph version — what they do, when they started, who owns it and how big it is — so you can decide in seconds whether it even fits the thesis.' },
      { id: 'i-coins', why: 'The money trail is the heart of the screen: funding rounds, investors, filings and revenue signals. It tells you the stage, who is already in, and whether the round in front of you makes sense.' },
      { id: 'i-radar', why: 'For a private company with no public revenue, the hiring radar is the best growth proxy you have. Accelerating headcount in product and sales is traction you can read without an NDA.' },
      { id: 'i-web', why: 'The relationship web maps customers, partners and competitors — instant competitor analysis and the start of your market map. You read a company by the company it keeps.' },
      { id: 'i-flag', why: 'Risk flags surface litigation, layoffs and reputation notes early, so a problem shows up at the screening stage instead of two weeks into diligence.' },
    ],
  },
  work: {
    heading: 'From inbox to investment memo',
    sub: 'A screening pass you can run on every name that crosses your desk.',
    steps: [
      { id: 'i-glass', t: 'File the company', d: 'Run a dossier the moment a deck or a referral lands. The brief is ready before you finish reading the email.' },
      { id: 'i-coins', t: 'Read the money', d: 'Check stage, prior investors and revenue signals against your thesis. Most names get a fast, well-reasoned pass right here.' },
      { id: 'i-web', t: 'Map the market', d: 'Use the relationship web to place the company among its rivals and partners — and to find the next three companies to source.' },
      { id: 'i-doc', t: 'Decide or dig', d: 'Promote the survivors into real diligence with the public picture already written up as your first memo section.' },
    ],
    after: `<p>For market mapping, run a file on each player in a category and the relationship webs start to overlap — you can see the leaders, the up-and-comers and the white space without buying a research report. For sourcing, every competitor and partner a dossier surfaces is a new name to investigate. And when you do reach real diligence, the dossier becomes your fact-check baseline against what the founder told you.</p>`,
  },
  faqs: [
    { q: 'Is this a replacement for full diligence?', a: 'No — it is the layer before it. A dossier is fast, public, light diligence: enough to screen, prioritise and write a first memo. Real diligence (data room, references, legal, financials) still happens; this just makes sure you only do it on the names worth it.' },
    { q: 'How good is the funding data on private companies?', a: 'It pulls funding rounds, investors and filings from the public record, which is strong for anything that has been announced or filed and naturally thinner for unannounced rounds. Everything is sourced, so you can see exactly what is confirmed versus inferred.' },
    { q: 'Can I use it for competitor analysis and market maps?', a: 'Yes. The relationship web plus a file per competitor is effectively a build-it-yourself market map — leaders, challengers and adjacencies, drawn from public signals and sourced line by line.' },
  ],
  cta: { h: 'Screen the whole pipeline.', s: 'one file per name. a first opinion in minutes.' },
});

// =======================================================================
// 4. FOUNDERS & STRATEGY
// =======================================================================
const foundersPage = persona({
  slug: 'founders',
  name: 'Founders & strategy',
  tab: 'use case — founders & strategy',
  h1: 'Size your competitors without the consultants',
  lede:
    'A competitor research tool and market research for startups in one file. Size a rival, map the landscape and scout partners from the public record — no $20k report, no week of tabs.',
  intro: `
    <p>Founders need competitive and market intelligence constantly and can almost never justify the cost of buying it. You're asked the "how big is the market and who else is in it" question by every investor, you need to know what a competitor just shipped, and you have to decide which partnership is worth chasing — all while building the actual product. The classic competitor research tool is a paid analyst report that's stale on arrival, or a junior teammate burning a week in browser tabs.</p>
    <p>A dossier is market research for startups that you run yourself, in minutes. Point it at a competitor and read their team shape, hiring momentum, funding, tech stack and the customers and partners they've announced. Run it across a category and you've built a market map. Point it at a potential partner and you've scouted them before the first call. It's the strategy work you keep meaning to do, made cheap enough to actually do.</p>`,
  get: {
    title: 'Competitor research tool & market research for startups | Company Dossier',
    desc:
      'A competitor research tool and market research for startups: size rivals, map the market and scout partnerships from public data — team, funding, tech and traction signals in one file.',
    heading: 'Competitive intel you can self-serve',
    sub: 'These five sections turn a competitor name into a strategy input you can act on.',
    rows: [
      { id: 'i-radar', why: 'A competitor\'s hiring radar is a roadmap leak. A surge of engineering roles in one area is a product bet; a sales-team build-out is a go-to-market push. You read their strategy by what they staff for.' },
      { id: 'i-coins', why: 'Their money trail tells you how much runway they are playing with and what they will be expected to do with it. A rival\'s fresh raise changes how aggressively you should move.' },
      { id: 'i-chip', why: 'The tech fingerprint shows what a competitor or a prospective partner is built on — useful for sizing their capabilities, finding integration angles, and judging whether a partnership is technically realistic.' },
      { id: 'i-web', why: 'The relationship web names their customers, partners and rivals — the fastest way to map a market, find unclaimed segments, and spot partners who already work with companies like yours.' },
      { id: 'i-news', why: 'The news timeline lays out launches and milestones in order, so you can see a competitor\'s trajectory at a glance and time your own moves against theirs.' },
    ],
  },
  work: {
    heading: 'From a hunch to a market map',
    sub: 'The same file works for sizing one rival or charting a whole category.',
    steps: [
      { id: 'i-glass', t: 'Name a rival', d: 'Start with the competitor that keeps coming up in sales calls. Pull their file and read it end to end.' },
      { id: 'i-web', t: 'Follow the web', d: 'Their relationship web names the next companies to look at — adjacent players, shared customers, partners. Run files on those too.' },
      { id: 'i-radar', t: 'Read the bets', d: 'Compare hiring and news across the set. Where everyone is staffing up is where the market is heading.' },
      { id: 'i-doc', t: 'Write the map', d: 'You now have a sourced landscape — leaders, challengers, white space — to put in a deck or a board update without paying for a report.' },
    ],
    after: `<p>For partnership scouting, the workflow inverts: pull a dossier on a potential partner and you walk into the conversation knowing their stack, their customers and whether they are growing — so you can frame the partnership around something real. And when you are fundraising, running a file on yourself is a sharp way to see exactly what an investor will find when they screen you.</p>`,
  },
  faqs: [
    { q: 'Is this good enough to put in an investor deck or a board update?', a: 'For the market-landscape and competitor slides, yes — it is sourced public data you can cite. Treat figures like market size as directional and verify the load-bearing numbers, but the team, funding and positioning picture is solid first-draft material.' },
    { q: 'How is this different from a paid analyst report?', a: 'It is fresh on demand instead of stale on arrival, it is free, and you can run it on any company you want — including the niche rivals no analyst covers. You give up a polished narrative; you gain speed, breadth and the ability to re-run it whenever something changes.' },
    { q: 'Can I use it to vet a potential partner?', a: 'Yes. Run the file before the first call to read their tech stack, customer base and growth. You will know whether the partnership is technically realistic and worth your time before you spend any of it.' },
  ],
  cta: { h: 'Map your market this afternoon.', s: 'one file per rival. the landscape, sourced.' },
});

// =======================================================================
// 5. JOURNALISTS & RESEARCHERS
// =======================================================================
const journalistsPage = persona({
  slug: 'journalists',
  name: 'Journalists & researchers',
  tab: 'use case — journalists & researchers',
  h1: 'Start the investigation with a map',
  lede:
    'Company background research and OSINT, assembled from the public record. A dossier draws the company and its relationships on one page — so an investigation starts with a thread to pull, not a blank one.',
  intro: `
    <p>Every investigation into a company starts the same slow way: who runs this, who owns it, who do they do business with, and what has been written about them. That groundwork — the company background research — is hours of open-record digging before you reach a single question worth asking. The blank page is the enemy, and the public record is vast but scattered across filings, job boards, news archives and the company's own footprint.</p>
    <p>A dossier is OSINT company research with the assembly already done. Give it a name and it draws the company from the open record: leadership and ownership, the relationship web of partners, customers and rivals, the dated news timeline, locations, hiring patterns and any risk flags already on the record. It won't write the story — but it hands you the map, with every line pointing back to its source so you can chase the ones that matter.</p>`,
  get: {
    title: 'Company background research & OSINT company research | Company Dossier',
    desc:
      'Company background research and OSINT for journalists and researchers: map a company, its people, ownership, relationships and timeline from public sources — every line sourced.',
    heading: 'The public record, assembled',
    sub: 'These five sections are where an investigation usually begins. Read them as leads, not conclusions.',
    rows: [
      { id: 'i-building', why: 'Overview and identity establishes the basics fast — what the company is, when it formed, and who owns it. The skeleton every story hangs on, and often the first thing you need to confirm.' },
      { id: 'i-org', why: 'People and leadership give you the names: who runs it, who joined recently, and how the org is shaped. Names are leads — each one is a profile to check, a person to call, a connection to trace.' },
      { id: 'i-web', why: 'The relationship web is the heart of an investigation: the customers, partners and rivals a company is tied to. Following these edges is how you find the story that isn\'t in the press release.' },
      { id: 'i-news', why: 'The dated news timeline reconstructs the company\'s public story in order, so you can spot the gaps, the pivots and the moments that don\'t add up — and find the original reporting to build on.' },
      { id: 'i-flag', why: 'Risk flags surface lawsuits, layoffs and reputation notes already on the public record — exactly the threads an investigation tends to pull, handed to you up front instead of buried.' },
    ],
  },
  work: {
    heading: 'From a name to a line of inquiry',
    sub: 'Use the file to orient, then leave it for the primary sources.',
    steps: [
      { id: 'i-glass', t: 'File the subject', d: 'Pull the dossier on the company or person at the centre of the story. Read it once, top to bottom, to get oriented.' },
      { id: 'i-web', t: 'Trace the edges', d: 'Follow the relationship web outward. Run files on the connected entities — partners, owners, rivals — to widen the picture.' },
      { id: 'i-news', t: 'Build the timeline', d: 'Lay the dated events against your own notes. Gaps and contradictions are where the questions live.' },
      { id: 'i-doc', t: 'Go to the source', d: 'Every claim links back to a public document. Open the originals, verify independently, and report from primary material — not the summary.' },
    ],
    after: `<p>For academic and policy researchers, the same workflow builds a structured baseline on a company or sector quickly, with citations you can follow — a head start on a literature-and-record review rather than a substitute for it. The cardinal rule holds across both: a dossier is a starting map drawn from public sources. Verify everything against the primary record before you publish a word.</p>`,
  },
  faqs: [
    { q: 'Can I publish from a dossier directly?', a: 'No — and you should not want to. A dossier is a research aid that points you to public sources; it is not itself a citable primary source. Use it to find and orient, then verify every fact against the original documents and report from those.' },
    { q: 'What exactly is in scope — is this real OSINT?', a: 'It is open-source intelligence in the literal sense: it gathers and structures only public, openly available information — filings, news, job posts, the open web. No private data, no access bypass, no anything you could not legally find yourself. It just does the gathering for you.' },
    { q: 'Will the subject know I researched them?', a: 'No. The company is never involved or notified, because nothing here touches private systems. It assembles what is already public, which is exactly what makes it safe to use early in an investigation.' },
  ],
  cta: { h: 'Never start from a blank page.', s: 'pull the map, then chase the sources.' },
});

// =======================================================================
// 6. DUE DILIGENCE & M&A
// =======================================================================
const dueDiligencePage = persona({
  slug: 'due-diligence',
  name: 'Due diligence & M&A',
  tab: 'use case — due diligence & m&a',
  h1: 'A fast first-pass diligence file',
  lede:
    'A due diligence report you can run before the real one starts. Vet a target or vendor, surface risk flags, and work a due diligence checklist against the public record — in minutes, not weeks.',
  intro: `
    <p>Real due diligence is slow, expensive and necessary — which is exactly why you don't want to spend it on the wrong target. The problem is the order of operations: the deep review happens after you've already committed time, money and lawyers, so by the time a red flag surfaces you've sunk a fortnight into it. What's missing is a fast, cheap first pass — a way to work the obvious items on a due diligence checklist before anyone opens a data room.</p>
    <p>A dossier is that first pass. Run it on a target or a third party and it assembles a structured public-record file: the corporate basics, ownership and leadership, the financial and funding picture as far as the record shows, the relationship web, and a dedicated risk section pulling litigation, layoffs and reputation notes to the surface. It's not a substitute for the formal due diligence report — it's the triage that tells you whether to commission one, and the head start when you do.</p>`,
  get: {
    title: 'Due diligence report & company due diligence checklist | Company Dossier',
    desc:
      'A fast first-pass due diligence report on any company: ownership, financials, relationships and risk flags from public data. Work your due diligence checklist before the data room opens.',
    heading: 'A risk file before the data room',
    sub: 'Five sections cover the public-record items most diligence checklists open with.',
    rows: [
      { id: 'i-building', why: 'Overview and identity confirms the corporate basics — legal shape, age, ownership and scale. The first boxes on any diligence checklist, and an early chance to catch a story that does not match the pitch.' },
      { id: 'i-coins', why: 'The money trail assembles funding, filings and revenue signals into a public financial picture. It frames what to ask for in the data room and flags when the public numbers and the claimed ones diverge.' },
      { id: 'i-org', why: 'People and leadership show who is actually in charge and how stable the team is. Founder departures, thin benches and recent churn are exactly the management-risk items diligence is meant to catch.' },
      { id: 'i-web', why: 'The relationship web exposes customer concentration, key partners and competitive exposure — dependency risks that are easy to miss in a deck but obvious once the connections are drawn.' },
      { id: 'i-flag', why: 'The risk section is the headline: lawsuits, regulatory trouble, layoffs and reputation notes pulled forward instead of buried. This is where a first-pass file earns its keep — by surfacing a dealbreaker on day one.' },
    ],
  },
  work: {
    heading: 'From target name to go / no-go',
    sub: 'A triage step that protects your expensive diligence hours.',
    steps: [
      { id: 'i-glass', t: 'File the target', d: 'Run a dossier the moment a target or counterparty is named — before the NDAs, before the meetings, before the spend.' },
      { id: 'i-flag', t: 'Hunt the flags', d: 'Go straight to risk. Litigation, regulatory issues or sudden layoffs here can end a process before it begins — cheaply.' },
      { id: 'i-doc', t: 'Build the checklist', d: 'Map the public picture against your diligence checklist. The gaps become your request list for the data room.' },
      { id: 'i-check', t: 'Decide and hand off', d: 'Go or no-go on a sound first read — and if it is go, the dossier is the opening section of your formal diligence file.' },
    ],
    after: `<p>For M&A teams screening multiple targets, a file per candidate makes the shortlist defensible: you can show why each name advanced or dropped, sourced. The same routine works for ongoing third-party risk — re-run the file on key counterparties periodically and you catch the new lawsuit or the leadership exit before it becomes your problem. Always remember the file is a starting map: confirm every material flag against the primary record before it shapes a decision.</p>`,
  },
  faqs: [
    { q: 'Does this replace a formal due diligence report?', a: 'No. It is the first-pass triage that comes before formal diligence — public-record only, fast and cheap. It tells you whether a target is worth the expensive review and gives you a head start on the checklist; the formal report, with data-room access and legal review, still has to happen.' },
    { q: 'How thorough is the risk section?', a: 'It surfaces what is on the public record — litigation, regulatory matters, layoffs and reputation notes — with sources you can open. It will not find what has never been disclosed publicly, so treat a clean file as "nothing surfaced yet," not "all clear," and verify any flag before acting on it.' },
    { q: 'Can I use it for third-party and ongoing risk, not just M&A?', a: 'Yes. The same first-pass file works for vetting any counterparty, and because you can re-run it on demand it doubles as a lightweight ongoing-monitoring step — pull it again on key partners to catch new flags between formal reviews.' },
  ],
  cta: { h: 'Triage before you commit.', s: 'a first-pass risk file in one search.' },
});

// =======================================================================
// 7. PROCUREMENT & VENDOR VETTING
// =======================================================================
const procurementPage = persona({
  slug: 'procurement',
  name: 'Procurement & vendor vetting',
  tab: 'use case — procurement & vendor vetting',
  h1: 'KYB-style vendor checks, fast',
  lede:
    'Vendor vetting and supplier due diligence from the public record. Run a know-your-business (KYB) style check on a supplier, surface risk flags, and know who you are buying from before you sign.',
  intro: `
    <p>Procurement is asked to move fast and to be careful, which are usually opposites. Every new supplier needs vetting — is this a real, stable business, who is behind it, and is there anything that should give us pause — but the volume of vendors means proper checks are the first thing to get cut. So a supplier gets onboarded on the strength of a slick website and a reference they chose themselves, and the risk only shows up later, when it is expensive.</p>
    <p>A dossier is a fast know-your-business check you can run on every vendor. Point it at a supplier and it builds a public-record profile: corporate basics and ownership, the financial picture as far as the record shows, locations and footprint, the relationship web of who they work with, and a risk section pulling litigation, layoffs and reputation notes to the front. It is the supplier due diligence you'd run on every vendor if you had the hours — compressed into one search.</p>`,
  get: {
    title: 'Vendor vetting & supplier due diligence (KYB) | Company Dossier',
    desc:
      'Vendor vetting and supplier due diligence from public data: run a know-your-business (KYB) style check on any supplier — ownership, stability, footprint and risk flags in one file.',
    heading: 'Know your business, fast',
    sub: 'Five sections cover the questions a KYB-style vendor check needs to answer.',
    rows: [
      { id: 'i-building', why: 'Overview and identity is the core KYB check: is this a real, established business, what is its legal shape, how big is it, and who owns it. The difference between a credible supplier and a logo on a landing page.' },
      { id: 'i-coins', why: 'The money trail signals financial stability — funding, filings and revenue indicators that hint at whether a supplier can actually deliver and stay solvent through the contract. Vendor failure is a supply-chain risk you want to price in early.' },
      { id: 'i-pin', why: 'Locations map the supplier\'s real footprint — where they operate and concentrate. It matters for jurisdiction, for logistics, and for spotting a "global" vendor that turns out to be one address.' },
      { id: 'i-web', why: 'The relationship web shows who the supplier already works with — reference customers you did not have to ask for, plus any concentration or fourth-party dependencies that become your risk once you sign.' },
      { id: 'i-flag', why: 'Risk flags pull litigation, regulatory issues, layoffs and reputation notes forward — the third-party risk a vendor will never volunteer in a pitch, surfaced before it lands in your supply chain.' },
    ],
  },
  work: {
    heading: 'From new vendor to approved supplier',
    sub: 'A check fast enough to run on every supplier, not just the big ones.',
    steps: [
      { id: 'i-glass', t: 'File the supplier', d: 'Run a dossier the moment a vendor enters the pipeline — before onboarding, before the contract, before the dependency exists.' },
      { id: 'i-building', t: 'Confirm they are real', d: 'Check identity, ownership and scale. A KYB-style read here weeds out shells and over-stated startups before they get further.' },
      { id: 'i-flag', t: 'Screen for risk', d: 'Go to the risk section for litigation, sanctions-adjacent issues, layoffs and reputation problems. This is the third-party risk you are signing up to inherit.' },
      { id: 'i-check', t: 'Approve with a record', d: 'Approve, reject or escalate on a sourced first read — and keep the file as documentation of the check you ran.' },
    ],
    after: `<p>For supplier-base management, the same file works on renewal and on your existing critical vendors: re-run it periodically and you catch a supplier\'s new lawsuit, ownership change or financial wobble before it disrupts your supply chain. A dossier covers the public-record layer of vendor vetting cleanly — for regulated KYB/AML obligations, pair it with your formal screening tools, and verify any material flag against primary sources before it changes a sourcing decision.</p>`,
  },
  faqs: [
    { q: 'Is this a full KYB / AML compliance tool?', a: 'It is a fast public-record vendor check that covers the "is this a real, stable, clean-looking business" layer extremely well. For formal KYB/AML obligations — sanctions lists, beneficial-ownership verification, regulated record-keeping — pair it with your dedicated compliance tooling; the dossier is the fast first read, not the regulatory filing.' },
    { q: 'Can I run it on every supplier, including small ones?', a: 'Yes — that is the point. Because it is fast and free and works on any company, you can vet the long tail of small vendors that normally skip checks entirely, which is often exactly where the unmanaged third-party risk hides.' },
    { q: 'What if a supplier comes back with no risk flags?', a: 'Read that as "nothing surfaced in the public record," not a guarantee. A clean file is a good sign and a fast green light for low-stakes vendors; for critical suppliers, treat it as the start of the check and verify the important points against primary sources.' },
  ],
  cta: { h: 'Vet every vendor, not just the big ones.', s: 'a know-your-business check in one search.' },
});

// =======================================================================
export default [
  indexPage,
  salesPage,
  recruitingPage,
  investorsPage,
  foundersPage,
  journalistsPage,
  dueDiligencePage,
  procurementPage,
];
