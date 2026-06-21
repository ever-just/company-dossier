import { SITE, icon, ctaFinal, FAQ } from '../lib.mjs';

// Reuse the shared FAQ, then add substantive page-specific Q&As.
const extra = [
  {
    q: 'What data sources does a dossier use?',
    a: 'Public signals only — seven streams gathered in one pass: job boards, public filings, news and press, the open web, maps and places, reviews, and the company\'s own website. Nothing is pulled from behind a login, and the target company doesn\'t need to be involved. Each section of the file is written from the source where the fact actually appears, and the link back to that source travels with it.',
  },
  {
    q: 'How accurate is a company dossier?',
    a: 'A dossier is as accurate as the public record it\'s built from — and it\'s honest about that. Every line points back to where it came from, so you can check a claim, judge the source, and dig deeper in seconds. Where the public record is thin or conflicting, the file reflects that rather than papering over it. Treat a dossier as a fast, sourced starting map, not the final word: verify anything you\'re about to act on.',
  },
  {
    q: 'Is building a company dossier legal?',
    a: 'Yes, when it\'s done the way Company Dossier does it: from public sources only. It gathers what anyone could find — published filings, posted job listings, news coverage, a company\'s own site — with no unauthorized access, no login bypass and no social engineering. It\'s the same information a diligent person could assemble by hand, just gathered faster and laid out better. This is general information, not legal advice; if you have a specific compliance question, check with your own counsel.',
  },
  {
    q: 'What about privacy — can a company opt out?',
    a: 'A dossier is about a business and the public record, not about surveilling individuals. It surfaces information that has already been made public — company filings, leadership listed on a company\'s own pages, press coverage — and it links to those originals rather than republishing private data. If something appears in a dossier, the place to address it is usually the public source it points to, since that\'s where the information actually lives. If you believe a file contains something that shouldn\'t be there, you can reach the team behind it through the project repository.',
  },
  {
    q: 'How long does a dossier take to generate?',
    a: 'Usually a few minutes. You provide the company name or domain — that\'s the whole brief — and the tooling pulls the public signals, reconciles them, and assembles the nine sections for you. The time saved is the point: instead of a week of open tabs, you get a readable, sourced file you can skim in minutes. See the full pipeline on how it works.',
  },
  {
    q: 'Can it research private companies, not just public ones?',
    a: 'Yes. Company Dossier is built precisely for companies that don\'t file the way public companies do. Because it reads the public footprint — hiring activity, news, the company site, maps and reviews — it can sketch a useful picture of a private business that has no investor relations page or annual report. Public companies will naturally have more on the record (filings, financials), but private companies are the core use case.',
  },
  {
    q: 'Can I export or share a dossier?',
    a: 'Yes. A finished dossier is meant to be used, not locked up: read it in your browser or editor, copy it, save it, share it with a colleague, or drop it into your notes ahead of a meeting. Because every line carries its source, the file stays useful — and checkable — wherever it travels.',
  },
  {
    q: 'How do I use it inside Claude, ChatGPT, VS Code or the CLI?',
    a: 'However you prefer to work. There\'s a web app for the browser, a VS Code extension so you can generate and read dossiers without leaving your editor, an npm CLI (company-dossier) for the terminal and scripts, a ChatGPT app, and a Claude app and skill so you can ask for a dossier right inside the assistant. Same free file, five front doors — see the Get it page for setup on each.',
  },
];

// Page-specific links woven into a few answers (kept out of JSON-LD text to stay clean).
const linked = extra.map(f => {
  let a = f.a;
  if (f.q.startsWith('How long')) a = a.replace('how it works', '<a href="/how-it-works/">how it works</a>');
  if (f.q.startsWith('How do I use')) a = a.replace('Get it page', '<a href="/get/">Get it page</a>')
    .replace('VS Code extension', '<a href="/vscode-extension/">VS Code extension</a>')
    .replace('npm CLI', '<a href="/cli/">npm CLI</a>')
    .replace('ChatGPT app', '<a href="/chatgpt/">ChatGPT app</a>')
    .replace('Claude app and skill', '<a href="/claude/">Claude app and skill</a>')
    .replace('web app', '<a href="/web-app/">web app</a>');
  return { q: f.q, a, plain: f.a };
});

// All questions on the page, in display order: shared FAQ first, then the extras.
const all = [
  ...FAQ.map(f => ({ q: f.q, a: f.a, plain: f.a })),
  ...linked,
];

const faqHtml = all.map((f, i) => {
  const v = ['', ' v2', ' v3'][i % 3];
  return `<article class="qa sk${v} reveal"><h3><span class="marker">Q.</span> ${f.q}</h3><p>${f.a}</p></article>`;
}).join('\n      ');

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — the fine print</span>
    <h1>Company Dossier: frequently asked questions</h1>
    <p class="lede">The honest answers — where the data comes from, how accurate it is, whether it's legal, what it costs, and how to run it inside your browser, your editor, the terminal, ChatGPT or Claude.</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="wrap">
    <div class="faq">
      ${faqHtml}
    </div>
  </div>
</section>

${ctaFinal('Still curious? Open a file.', 'the fastest way to understand a dossier is to read one.')}
`;

export default {
  path: '/faq/',
  priority: '0.7',
  changefreq: 'monthly',
  active: undefined,
  breadcrumbs: [{ href: '/faq/', label: 'FAQ' }],
  title: 'Company Dossier FAQ — sources, accuracy, legality & how to use it',
  description: 'Frequently asked questions about Company Dossier: what data sources it uses, how accurate it is, whether it is legal, privacy, how long it takes, private companies, exporting, pricing, and using it in the web app, VS Code, CLI, ChatGPT and Claude.',
  ogType: 'website',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: all.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.plain } })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: SITE.origin + '/faq/' },
      ],
    },
  ],
  body,
};
