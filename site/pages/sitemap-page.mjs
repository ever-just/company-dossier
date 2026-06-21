import { SITE, ctaFinal } from '../lib.mjs';

const GROUPS = [
  ['The file', [
    ['/', 'Home', 'The whole pitch on one page.'],
    ['/what-is-a-company-dossier/', 'What is a company dossier', 'Definition, contents and how it differs.'],
    ['/how-it-works/', 'How it works', 'The public-source research pipeline.'],
    ['/sample/', 'Sample dossier', 'A page from a finished file.'],
    ['/glossary/', 'Glossary', 'The vocabulary of company research.'],
  ]],
  ['Get it', [
    ['/get/', 'Get it', 'Every way to open a dossier.'],
    ['/web-app/', 'Web app', 'Run it in the browser at everjust.app.'],
    ['/vscode-extension/', 'VS Code extension', 'Generate dossiers inside your editor.'],
    ['/cli/', 'CLI & npm', 'The company-dossier command line tool.'],
    ['/chatgpt/', 'ChatGPT app', 'Use it from inside ChatGPT.'],
    ['/claude/', 'Claude app & skill', 'Use it as a Claude app and skill.'],
  ]],
  ['Use cases', [
    ['/use-cases/', 'All use cases', 'Who opens files, and why.'],
    ['/use-cases/sales/', 'Sales & BD', 'Brief the account before the call.'],
    ['/use-cases/recruiting/', 'Recruiting', 'Read a company before you pitch it.'],
    ['/use-cases/investors/', 'Investors', 'Size up a market or a target fast.'],
    ['/use-cases/founders/', 'Founders', 'Know the landscape you\'re building in.'],
    ['/use-cases/journalists/', 'Journalists', 'Start with a map, not a blank page.'],
    ['/use-cases/due-diligence/', 'Due diligence', 'The fast brief before the deep dive.'],
    ['/use-cases/procurement/', 'Procurement', 'Vet a vendor before you sign.'],
  ]],
  ['Compare', [
    ['/compare/', 'All comparisons', 'How Company Dossier stacks up.'],
  ]],
];

const groupHtml = GROUPS.map(([heading, links]) => {
  const cards = links.map((l, i) => {
    const v = ['', ' v2', ' v3'][i % 3];
    return `<a class="linkcard sk${v} reveal" href="${l[0]}"><h3>${l[1]}</h3><p>${l[2]}</p></a>`;
  }).join('\n');
  return `<div class="head reveal" style="margin-top:8px"><h2 class="marker">${heading}</h2></div>
    <div class="linkgrid" style="margin:18px 0 44px">${cards}</div>`;
}).join('\n');

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — the index</span>
    <h1>Sitemap</h1>
    <p class="lede">Every page in the file, grouped and linked. The machine-readable version lives at <a href="/sitemap.xml" class="prose" style="border-bottom:2px solid var(--faint);text-decoration:none">sitemap.xml</a>.</p>
  </div>
</section>

<section class="sec" style="padding-top:26px">
  <div class="wrap">
    ${groupHtml}
  </div>
</section>

${ctaFinal('Open your first file.', 'pick a company. read the whole story in minutes.')}
`;

export default {
  path: '/sitemap/',
  priority: '0.4',
  changefreq: 'monthly',
  breadcrumbs: [{ href: '/sitemap/', label: 'Sitemap' }],
  title: 'Sitemap — every page on Company Dossier',
  description: 'A human-readable sitemap of Company Dossier: the file, ways to get it, use cases by role, and comparisons. Every page, grouped and linked.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Sitemap', item: SITE.origin + '/sitemap/' },
      ],
    },
  ],
  body,
};
