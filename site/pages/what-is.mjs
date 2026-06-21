import { SITE, icon, SECTIONS, ctaFinal } from '../lib.mjs';

const toc = `<nav class="sk reveal" aria-label="On this page" style="padding:22px 24px;margin:0 0 34px">
  <div class="panel-label">On this page</div>
  <ul style="margin:0;padding-left:20px;font-size:.98rem;line-height:1.9">
    <li><a href="#definition">A plain definition</a></li>
    <li><a href="#inside">What's inside a company dossier</a></li>
    <li><a href="#vs">Dossier vs. company profile, credit report &amp; due-diligence report</a></li>
    <li><a href="#who">Who uses a company dossier</a></li>
    <li><a href="#built">How a dossier is built from public data</a></li>
    <li><a href="#ethics">Ethics &amp; legality</a></li>
    <li><a href="#get">How to get one</a></li>
  </ul>
</nav>`;

const sectionList = SECTIONS.map((s, i) =>
  `<li><strong>${s.t}.</strong> ${s.d}</li>`).join('\n');

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — the definition</span>
    <h1>What is a company dossier?</h1>
    <p class="lede">A company dossier is a single, sourced file that gathers everything the public record knows about a business — its people, hiring, money, locations, tech, news and risk — and lays it out so you can read the whole company in minutes instead of weeks of open tabs.</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="narrow">
    ${toc}
    <div class="prose">
      <h2 id="definition">A plain definition</h2>
      <p>The word <em>dossier</em> comes from the French for a bundle of papers tied together — a case file. A <strong>company dossier</strong> is exactly that, for a business: a structured collection of facts about a single company, drawn from the public record and organized into one document you can actually use.</p>
      <p>It is not a marketing page and not a database dump. A good dossier reads like an intelligence brief. It tells you what the company does, who runs it, whether it's growing, where the money comes from, what it's building on, and what's worth a second look — and it tells you where every one of those claims came from. The phrase <strong>"company dossier meaning"</strong> really comes down to one idea: a fast, honest, sourced starting map of a business.</p>
      <p>The point of a dossier is leverage. Anyone can find a company's website, a few news articles and a LinkedIn page. The work is gathering all of it, cross-checking it, and laying it out in an order that tells a story. A dossier does that work once and hands you the result.</p>

      <h2 id="inside">What's inside a company dossier</h2>
      <p>A Company Dossier file is built from <a href="/how-it-works/">nine standard sections</a>. Each one answers a different question you'd otherwise have to chase across a dozen sources:</p>
      <ol>
        ${sectionList}
      </ol>
      <p>Together those nine sections cover the four questions most research actually comes down to: <strong>what is this company, is it healthy, what is it doing now, and what should I be careful about?</strong> Because each section is built the same way every time, you can read a dossier on a company you've never heard of and know exactly where to look. <a href="/sample/">See a sample dossier</a> to get a feel for the format before you run one yourself.</p>

      <h2 id="vs">Dossier vs. company profile, credit report &amp; due-diligence report</h2>
      <p>People reach for several different documents when they research a company, and they're easy to confuse. The short version: a <strong>company profile vs. a dossier</strong> is the difference between a summary and an investigation.</p>
      <h3>Company profile</h3>
      <p>A <strong>company profile</strong> is a short, often self-published snapshot — a paragraph of description, an industry tag, a headcount band, maybe a logo. You find profiles on directory sites and on a company's own "About" page. They're useful as a label, but they're shallow, rarely sourced, and usually written by the company itself. A dossier goes wider (nine sections, not one) and deeper (every claim pinned to where it came from), and it draws on outside signals the company doesn't control, like hiring data and news.</p>
      <h3>Credit report</h3>
      <p>A <strong>credit report</strong> is a narrow financial instrument from a bureau, focused on one question: will this business pay its bills? It scores payment history and credit risk and is typically paid and privacy-regulated. A dossier is broader and qualitative — it sketches the financial <em>shape</em> (funding, investors, public filings, revenue signals) alongside people, tech and risk, but it is not a credit score and shouldn't be used as one.</p>
      <h3>Due-diligence report</h3>
      <p>A formal <strong>due-diligence report</strong> is the heavyweight version, produced during a deal — exhaustive, often involving the target's cooperation, private data rooms, legal review and a hefty bill. A dossier is the lightweight cousin that comes <em>first</em>: it's the fast public-source brief you build before a meeting, a pitch or a deeper diligence process, so you know which questions are worth the expensive answers. Many people use a dossier to decide whether full due diligence is even warranted.</p>

      <h2 id="who">Who uses a company dossier</h2>
      <p>Anyone whose job involves walking into a room already knowing the company on the other side of the table:</p>
      <ul>
        <li><strong>Sales and business development</strong> brief an account before a call — its size, its stack, its recent moves — so the pitch lands. (<a href="/use-cases/sales/">Sales use case →</a>)</li>
        <li><strong>Recruiters</strong> read a company end to end before pitching it to a candidate, and watch hiring signals to time outreach. (<a href="/use-cases/recruiting/">Recruiting use case →</a>)</li>
        <li><strong>Investors and founders</strong> size up a market, a target or a competitor without losing a week to research. (<a href="/use-cases/investors/">Investors use case →</a>)</li>
        <li><strong>Journalists and researchers</strong> start an investigation with a map and a list of sources instead of a blank page. (<a href="/use-cases/journalists/">Journalists use case →</a>)</li>
        <li><strong>Procurement and partnerships</strong> vet a vendor or a partner before signing. (<a href="/use-cases/procurement/">Procurement use case →</a>)</li>
      </ul>
      <p>See the full list on the <a href="/use-cases/">use cases page</a>.</p>

      <h2 id="built">How a dossier is built from public data</h2>
      <p>A dossier is only as trustworthy as its sources, so the build process is the whole game. Company Dossier assembles a file from public signals only — seven streams that anyone could reach on their own: job boards, public filings, news and press, the open web, maps and places, reviews, and the company's own site. It gathers them in one pass, de-duplicates and reconciles what it finds, and writes each fact into the section where it belongs — with a link back to the source.</p>
      <p>That last part matters. A claim with no source is a rumor. Every line in a finished dossier points back to where it came from, so you can verify it, judge it, and dig deeper. Treat the file as a starting map, not the last word — confident, fast, and honest about its own limits. The full pipeline is laid out on <a href="/how-it-works/">how it works</a>.</p>

      <h2 id="ethics">Ethics &amp; legality</h2>
      <p>Is building a company dossier legal? Yes — when it's done the way it should be. A dossier built from <strong>public sources only</strong> gathers what anyone could find: published filings, posted job listings, news coverage, the company's own website. There's no unauthorized access, no login bypass, no social engineering, and no private or personal data harvested in violation of anyone's expectations. It's the same information a diligent person could assemble by hand — just gathered faster and laid out better.</p>
      <p>The ethics follow the same line. Company Dossier is about businesses and the public record, not about surveilling individuals. Because everything is sourced, the file is transparent about what it knows and where it learned it, which is exactly what an honest brief should be. And because a dossier is a <em>map</em>, not a verdict, the responsible way to use one is to verify before you act on anything that matters.</p>

      <h2 id="get">How to get a company dossier</h2>
      <p>Company Dossier is <strong>free</strong> and runs wherever you work. You can open the <a href="/web-app/">web app</a> at <a href="${SITE.webapp}" target="_blank" rel="noopener">everjust.app</a>, install the <a href="/vscode-extension/">VS Code extension</a>, run the <a href="/cli/">npm CLI</a> (<code>company-dossier</code>), or use it inside the <a href="/chatgpt/">ChatGPT app</a> or as a <a href="/claude/">Claude app and skill</a>. Type a company name or paste a domain, and the file assembles itself.</p>
      <p>If you'd rather look before you run, <a href="/sample/">read the sample dossier</a> first, or walk through <a href="/how-it-works/">how it works</a> to see exactly how the file comes together.</p>
    </div>
  </div>
</section>

${ctaFinal('Open a file on any company.', 'one search. nine sections. every line sourced.')}
`;

const faq = [
  { q: 'What is a company dossier?', a: 'A company dossier is a single, sourced file that gathers what the public record knows about a business — its people, hiring, money, locations, tech, news and risk — organized into nine standard sections so you can read the whole company in minutes.' },
  { q: "What's the difference between a dossier and a company profile?", a: 'A company profile is a short, often self-published snapshot — a description, an industry tag, a headcount band. A dossier goes far wider and deeper: nine sections drawn from outside signals the company does not control, with every claim pinned to its public source.' },
  { q: 'How is a company dossier different from a credit report or a due-diligence report?', a: 'A credit report is a narrow financial score about whether a business pays its bills. A formal due-diligence report is the exhaustive version built during a deal, often with the target\'s cooperation. A dossier is the fast, broad, public-source brief you build first — before the expensive work.' },
  { q: 'Is building a company dossier legal?', a: 'Yes. A dossier built from public sources only gathers what anyone could find — published filings, posted jobs, news, the company website. No unauthorized access, no login bypass, no social engineering. It is the same information a diligent person could assemble by hand, just faster.' },
];

export default {
  path: '/what-is-a-company-dossier/',
  active: '/what-is-a-company-dossier/',
  priority: '0.9',
  changefreq: 'monthly',
  breadcrumbs: [{ href: '/what-is-a-company-dossier/', label: 'What is a company dossier' }],
  title: 'What is a company dossier? Meaning, contents & how it differs',
  description: 'A company dossier is a single, sourced file on a business — people, hiring, money, locations, tech, news and risk, from public data. Learn what it contains, how it differs from a company profile or credit report, and how to get one for free.',
  ogType: 'article',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: 'What is a company dossier? Meaning, contents and how it differs',
      description: 'A definition of a company dossier — what it contains, how it differs from a company profile, credit report and due-diligence report, who uses one, how it is built from public data, and how to get one.',
      author: { '@type': 'Organization', name: 'EVERJUST' },
      publisher: { '@type': 'Organization', name: 'EVERJUST', url: 'https://everjust.org' },
      mainEntityOfPage: SITE.origin + '/what-is-a-company-dossier/',
      image: SITE.ogImage,
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'What is a company dossier', item: SITE.origin + '/what-is-a-company-dossier/' },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
  body,
};
