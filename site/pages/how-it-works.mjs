import { SITE, icon, ctaFinal } from '../lib.mjs';

const steps = `<div class="steps">
  <article class="step sk reveal"><div class="big">1</div>${icon('i-glass')}<h3>Plan the file</h3><p>You name the company or paste a domain. The dossier resolves which entity you mean.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v2 reveal"><div class="big">2</div>${icon('i-globe')}<h3>Gather public signals</h3><p>Seven public streams get pulled in one pass — jobs, filings, news, the open web and more.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v3 reveal"><div class="big">3</div>${icon('i-bolt')}<h3>Assemble &amp; de-dupe</h3><p>Signals are reconciled, conflicts resolved, and facts sorted into nine clean sections.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v2 reveal"><div class="big">4</div>${icon('i-doc')}<h3>Source every claim</h3><p>Each line is pinned to where it came from, with a confidence read on what's solid.</p><svg class="arrow" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h22M17 5l8 7-8 7"/></svg></article>
  <article class="step sk v3 reveal"><div class="big">5</div>${icon('i-folder')}<h3>Read or export</h3><p>Skim in minutes, then share it, save it, or drop it into your notes.</p></article>
</div>`;

const streams = [
  ['i-radar', 'Job boards', 'Open roles reveal what a company is building, where headcount is growing, and which teams are under pressure — often the earliest signal of where a business is headed.'],
  ['i-doc', 'Public filings', 'Registrations, funding records and regulatory documents give the financial and legal skeleton, straight from the official record.'],
  ['i-news', 'News & press', 'Coverage, launches and announcements supply the timeline — the dated story of what happened and when.'],
  ['i-web', 'The open web', 'The broad public web fills in context, cross-references and the long tail of mentions that no single source carries.'],
  ['i-map', 'Maps & places', 'Public map and place data locates offices and footprint, so locations are plotted instead of buried in addresses.'],
  ['i-people', 'Reviews', 'Public reviews add an outside read on reputation, culture and customer experience — useful color the company can\'t edit.'],
  ['i-building', 'The company site', "The company's own pages anchor identity, product and positioning — the story it tells about itself, checked against everything else."],
];

const streamCards = streams.map((s, i) => {
  const v = ['', ' v2', ' v3'][i % 3];
  return `<article class="cell sk${v} reveal">${icon(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p></article>`;
}).join('\n');

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — the method</span>
    <h1>How a company dossier is built</h1>
    <p class="lede">Every dossier follows the same pipeline: plan the file, gather public signals, assemble and de-dupe, source every claim, then read or export. Here's each step, in depth, and exactly where the facts come from.</p>
  </div>
</section>

<section class="sec" style="padding-top:26px">
  <div class="wrap">
    <div class="head reveal">
      <span class="tab">the pipeline</span>
      <h2 class="marker">From a name to a finished file</h2>
      <p>Five steps. You do the first one. The dossier does the rest — and shows its work at every stage.</p>
    </div>
    ${steps}
  </div>
</section>

<section class="sec alt">
  <div class="narrow">
    <div class="prose">
      <h2>1 — Plan the file</h2>
      <p>The brief is one line: a company name or a domain. That sounds trivial, but the first real job is <strong>resolution</strong> — making sure the file is about the company you actually mean. Names collide, brands differ from legal entities, and subsidiaries hide under parents. The pipeline pins down a single entity first, so everything that follows attaches to the right company instead of smearing two of them together.</p>

      <h2>2 — Gather the public signals</h2>
      <p>With the target fixed, the dossier reaches out to its source streams in a single pass. Nothing here is private — these are all sources anyone could open in a browser. We just open all of them at once. The seven streams below each answer a different part of the story; read more about what each one contributes in the next section.</p>
      <p>Gathering in parallel is what turns a week of tabs into a few minutes. It also means the file is a snapshot in time: it reflects what the public record showed when it was built, which is why a dossier always carries the moment it was assembled.</p>

      <h2>3 — Assemble &amp; de-dupe</h2>
      <p>Raw signals are messy. The same office shows up with three different addresses; a funding round appears in two articles with slightly different numbers; an executive's title changed last quarter and both versions are floating around. The assembly step <strong>reconciles</strong> all of it: it merges duplicates, resolves conflicts toward the most authoritative source, and drops what can't be tied to the target with confidence.</p>
      <p>What survives is sorted into the <a href="/what-is-a-company-dossier/">nine standard sections</a> — overview, people, hiring, money, locations, tech, news, relationships and risk. Same shape every time, so a dossier on a company you've never heard of reads exactly like one you have.</p>

      <h2>4 — Source every claim</h2>
      <p>This is the step that separates a dossier from a guess. Every fact in the file is <strong>pinned to where it came from</strong>, so you can click through, verify a line, and dig deeper on anything that matters. A claim without a source doesn't make the file.</p>
      <p>Sourcing also drives <strong>confidence</strong>. Not every signal is equally solid — a number from an official filing is firmer than a figure inferred from a job posting. The dossier is honest about that distinction, surfacing how well-supported a claim is rather than presenting everything with the same false certainty. The guidance is simple and runs through the whole product: a dossier is a fast, sourced <em>starting map</em>, and you should always verify before you act.</p>

      <h2>5 — Read it or export it</h2>
      <p>The finished file is built to be skimmed. Charts, an org sketch, a map and a timeline carry the things that read faster as pictures; sourced prose carries the rest. From there it's yours — read it in place, share it, save it, or drop it into your notes and your own workflow. However you opened it, the file is the same.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="head center reveal">
      <span class="tab fill">the evidence</span>
      <h2 class="marker">Seven public streams in</h2>
      <p style="margin-left:auto;margin-right:auto">Each stream answers a different question. Together they make one file — and every claim points back to the stream it came from.</p>
    </div>
    <div class="grid3" style="margin-top:34px">
      ${streamCards}
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="narrow">
    <div class="prose">
      <h2>Where you can run it</h2>
      <p>The pipeline is the same wherever you start it. Open the <a href="/web-app/">web app</a> at <a href="${SITE.webapp}" target="_blank" rel="noopener">companydossier.lol/generate</a>, install the <a href="/vscode-extension/">VS Code extension</a>, run the <a href="/cli/">npm CLI</a> (<code>company-dossier</code>), or use it through the <a href="/chatgpt/">ChatGPT app</a> or as a <a href="/claude/">Claude app and skill</a>. It's free, and it uses public sources only.</p>
      <p>Want to see the output before you run it? <a href="/sample/">Open the sample dossier</a>, or read <a href="/what-is-a-company-dossier/">what a company dossier is</a> for the bigger picture.</p>
    </div>
  </div>
</section>

${ctaFinal('Watch the file assemble.', 'name a company. the pipeline does the rest.')}
`;

const howToSteps = [
  ['Plan the file', 'Name a company or paste a domain. The dossier resolves which exact entity you mean before gathering anything.'],
  ['Gather public signals', 'Seven public streams are pulled in one pass: job boards, public filings, news and press, the open web, maps and places, reviews, and the company site.'],
  ['Assemble and de-dupe', 'Signals are reconciled, duplicates merged and conflicts resolved, then sorted into nine standard sections.'],
  ['Source every claim', 'Each fact is pinned to its public source and carries a confidence read on how well-supported it is.'],
  ['Read or export', 'Skim the finished file in minutes, then share it, save it, or drop it into your notes.'],
];

export default {
  path: '/how-it-works/',
  active: '/how-it-works/',
  priority: '0.8',
  changefreq: 'monthly',
  breadcrumbs: [{ href: '/how-it-works/', label: 'How it works' }],
  title: 'How Company Dossier works — the public-source research pipeline',
  description: 'How a company dossier is built: plan the file, gather seven public signal streams, assemble and de-dupe, source every claim with a confidence read, then read or export. Free, public sources only.',
  ogType: 'article',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'HowTo',
      name: 'How a company dossier is built',
      description: 'The pipeline that turns a company name into a complete, sourced dossier from public data.',
      totalTime: 'PT5M',
      step: howToSteps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s[0], text: s[1] })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'How it works', item: SITE.origin + '/how-it-works/' },
      ],
    },
  ],
  body,
};
