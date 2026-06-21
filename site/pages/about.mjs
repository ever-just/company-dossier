import { SITE, ctaFinal } from '../lib.mjs';

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — the origin</span>
    <h1>About Company Dossier</h1>
    <p class="lede">Researching a company used to take a war room and a week. We folded all of it into a single sourced file — so anyone can read a business the way a nation-state would.</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="narrow">
    <div class="prose">
      <h2>The work nobody wants to do</h2>
      <p>Pull up a company you've never heard of and try to actually understand it. You open the website, then a job board, then a filings portal, then a funding database, then a maps tab, then three news searches, then a stack-detection tool, then a spreadsheet to hold it all together. By tab nineteen you've lost the thread, half the data contradicts the other half, and you still can't say with confidence who runs the place or whether it's growing.</p>
      <p>That was the normal way to learn what a company really is: brutally manual, scattered across a dozen tools and databases, and measured in hours you didn't have. The information was public the whole time — it was just spread too thin and too wide for any one person to gather, reconcile and read before the meeting started.</p>
      <p>Company Dossier exists to collapse that. You name a company. We gather the public record on it in one pass, reconcile what we find, and assemble it into a single sourced file — its people, hiring, money, locations, tech, news, relationships and risk, laid out in order so you can read the whole company in minutes.</p>

      <h2>Why it matters</h2>
      <p>Here's the part we care about most. For a long time, the ability to research and analyze an organization at this depth belonged to people with resources — intelligence shops, the big banks, the firms who could put a team on it for a week. That capability had a price tag, and the price tag was the gate.</p>
      <p>A dossier removes the gate. It hands a non-technical person the research-and-analysis abilities of a nation-state: pull every public signal on any company, cross-check it, and read it as one coherent brief — no analyst team, no expensive datasets, no week of tabs. One name in, a complete sourced file out.</p>
      <p>And it gets sharper the more you feed it. A dossier is strong on the public record alone, but it's built to be supplemented. Drop in what you already know — a contact, an internal note, a paid dataset you have a seat for, a transcript from a call — and the file gets deeper and more specific to the exact question you're chasing. The public record is the floor, not the ceiling.</p>

      <h2>How we draw the line</h2>
      <p>The power only counts if it's used honestly, so the rules are simple and we don't bend them.</p>
      <p><strong>Public sources only.</strong> Everything in a dossier comes from places anyone could reach — published filings, posted job listings, news coverage, maps, reviews and the company's own site. No login bypass, no scraping behind walls, no social engineering, no harvesting private or personal data. It's the same material a diligent person could assemble by hand; we just reach all of it at once.</p>
      <p><strong>It's about businesses, not surveillance.</strong> A dossier maps organizations and the public record they leave behind. It is not a tool for tracking individuals, and we don't build it to be one.</p>
      <p><strong>Every line is sourced.</strong> A claim with no source is a rumor. Each section points back to where it came from, so you can verify a line, judge it, and dig further. That transparency is the whole point of a brief you can trust.</p>
      <p><strong>A map, not a verdict.</strong> A dossier is a fast, honest starting map — confident about what it found and clear about its limits. Treat it as the first hour of work, not the last word. Verify before you act on anything that matters.</p>

      <h2>What we believe</h2>
      <ul>
        <li><strong>Research leverage should be a utility, not a privilege.</strong> The cost of reading a company shouldn't decide who gets to.</li>
        <li><strong>Public information, gathered well, is enough to start.</strong> Most of what you need is already out there — the hard part is assembling it.</li>
        <li><strong>Sourcing is non-negotiable.</strong> If we can't point to where a fact came from, it doesn't belong in the file.</li>
        <li><strong>Speed and honesty aren't a trade-off.</strong> A brief can be fast and still tell you exactly how confident to be.</li>
        <li><strong>The best file is one you make your own.</strong> Supplement it with your own data and it becomes a tool nobody else has.</li>
      </ul>

      <h2>Start here</h2>
      <p>If you're new, the fastest way in is to see the idea and then run one. Read <a href="/what-is-a-company-dossier/">what a company dossier is</a> for the full definition and contents, walk through <a href="/how-it-works/">how it works</a> to see the public-source pipeline end to end, or just <a href="/get/">open your first file</a> and watch a name turn into a complete, sourced brief.</p>
      <p>It's free, it runs wherever you work, and it asks for nothing but a company name to begin.</p>
    </div>
  </div>
</section>

${ctaFinal('Read any company like a nation-state.', 'one name in. the whole public record out, sourced.')}
`;

export default {
  path: '/about/',
  priority: '0.7',
  changefreq: 'monthly',
  breadcrumbs: [{ href: '/about/', label: 'About' }],
  title: 'About Company Dossier — nation-state-grade company research for everyone',
  description: 'Company Dossier folds the slow, scattered work of researching a business into one sourced file — giving a non-technical person the research-and-analysis power of a nation-state, from public sources only. Read our origin story and what we believe.',
  ogType: 'article',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'AboutPage',
      name: 'About Company Dossier',
      description: 'The origin story and principles behind Company Dossier — nation-state-grade company research for everyone, from public sources only.',
      url: SITE.origin + '/about/',
      mainEntity: {
        '@type': 'Organization', name: 'Company Dossier', url: SITE.origin,
        description: 'Compiles a complete, sourced intelligence dossier on any company from public data sources.',
        sameAs: [SITE.repo, SITE.repoVscode],
      },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'About', item: SITE.origin + '/about/' },
      ],
    },
  ],
  body,
};
