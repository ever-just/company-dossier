import { SITE, ctaFinal } from '../lib.mjs';

const TERMS = [
  ['OSINT', 'Open-source intelligence — gathering and analyzing information from publicly available sources. It\'s the discipline behind a <a href="/what-is-a-company-dossier/">company dossier</a>: public record only, no privileged access.'],
  ['Competitive intelligence', 'The practice of researching competitors and a market to inform strategy. A dossier on a rival is a fast way to start.'],
  ['Due diligence', 'The investigation a buyer, investor or partner runs before committing to a deal. A dossier is the lightweight, public-source brief that usually comes first. See the <a href="/use-cases/due-diligence/">due-diligence use case</a>.'],
  ['Firmographics', 'The descriptive attributes of a company — industry, size, location, revenue band, ownership. The "demographics" of a business, and the backbone of the overview section.'],
  ['Technographics', 'Data about the technology a company uses — its languages, frameworks, vendors and tools. Read as the <strong>tech fingerprint</strong> in a dossier.'],
  ['Tech stack', 'The specific set of technologies a company builds and runs on, from databases to analytics tools. Useful for a pitch, a partnership, or sizing up a competitor.'],
  ['Org chart', 'A map of how a company is structured — who leads, who reports to whom, and where the depth sits. A dossier renders a sketch of it from public signals.'],
  ['Wayback Machine', 'A public archive of historical web pages. It lets researchers see how a company\'s site, claims and positioning have changed over time.'],
  ['DNS recon', 'Inspecting a domain\'s public DNS records to learn about a company\'s web infrastructure and online footprint — a standard OSINT technique.'],
  ['ICP', 'Ideal Customer Profile — the type of company a business sells to best. Dossiers help sales teams confirm whether a target fits the ICP. See the <a href="/use-cases/sales/">sales use case</a>.'],
  ['TAM / SAM / SOM', 'Total, Serviceable, and Serviceable Obtainable Market — nested estimates of market size, from everyone who could buy to the slice you can realistically win.'],
  ['Data room', 'A secure, private repository of documents shared during a deal for formal due diligence. The opposite of a dossier, which is built entirely from public sources.'],
  ['KYB', 'Know Your Business — the compliance process of verifying the identity and legitimacy of a business entity, the corporate cousin of KYC.'],
  ['UBO', 'Ultimate Beneficial Owner — the real person who ultimately owns or controls a company, even through layers of holding entities. A key target of ownership research.'],
  ['SIC / NAICS code', 'Standard industry classification codes (US and international) that label what a business does. They make firmographic data sortable and comparable.'],
  ['Headcount signal', 'An inferred read on a company\'s size and growth, drawn from public traces like job postings and team pages, when an exact employee count isn\'t published.'],
  ['Hiring velocity', 'The rate at which a company is opening roles and growing teams — an early indicator of momentum, direction and funding, surfaced by the <strong>hiring radar</strong>.'],
  ['Sourcing / attribution', 'Pinning each claim to the public source it came from. In a dossier, every line is sourced so you can verify it and dig deeper. Central to <a href="/how-it-works/">how it works</a>.'],
  ['Confidence tagging', 'Flagging how well-supported a claim is — an official filing is firmer than a figure inferred from a job ad. It keeps a dossier honest about its own certainty.'],
  ['Relationship graph', 'A network view of a company\'s customers, partners and rivals — reading a business by the company it keeps. The <strong>relationship web</strong> in a dossier.'],
  ['Risk flag', 'A surfaced item worth a second look — a lawsuit, layoffs or a reputation note. A dossier surfaces these rather than burying them, so nothing surprises you later.'],
  ['Public record', 'The body of information anyone can lawfully access — filings, news, posted jobs, company sites. A dossier is built from the public record only.'],
  ['Entity resolution', 'Determining that scattered references all point to one real company, and not two with similar names. The first step in building a clean dossier.'],
  ['Footprint', 'A company\'s physical and operational presence — its offices and locations, plotted on a map rather than listed as addresses.'],
];

const cards = TERMS.map((t, i) => {
  const v = ['', ' v2', ' v3'][i % 3];
  return `<article class="cell sk${v} reveal"><h3>${t[0]}</h3><p>${t[1]}</p></article>`;
}).join('\n');

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — the field guide</span>
    <h1>Glossary of company research</h1>
    <p class="lede">The working vocabulary of company research, OSINT and due diligence — defined plainly, with links into the file where each term comes to life.</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="wrap">
    <div class="grid3">
      ${cards}
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="narrow">
    <div class="prose">
      <h2>Start with the basics</h2>
      <p>New to all this? Read <a href="/what-is-a-company-dossier/">what a company dossier is</a>, see <a href="/how-it-works/">how one is built</a>, or <a href="/sample/">open a sample file</a> to watch these terms in context.</p>
    </div>
  </div>
</section>

${ctaFinal('Put the vocabulary to work.', 'open a file. read a whole company in minutes.')}
`;

export default {
  path: '/glossary/',
  priority: '0.6',
  changefreq: 'monthly',
  breadcrumbs: [{ href: '/glossary/', label: 'Glossary' }],
  title: 'Glossary — company research, OSINT & due diligence terms',
  description: 'Plain-language definitions of the terms behind company research: OSINT, due diligence, firmographics, technographics, org chart, KYB, UBO, hiring velocity, relationship graph, risk flags and more.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'DefinedTermSet',
      name: 'Company Dossier glossary',
      url: SITE.origin + '/glossary/',
      hasDefinedTerm: TERMS.map(t => ({
        '@type': 'DefinedTerm',
        name: t[0],
        description: t[1].replace(/<[^>]+>/g, ''),
        inDefinedTermSet: SITE.origin + '/glossary/',
      })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Glossary', item: SITE.origin + '/glossary/' },
      ],
    },
  ],
  body,
};
