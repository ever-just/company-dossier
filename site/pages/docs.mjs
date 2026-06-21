import { SITE, ctaFinal } from '../lib.mjs';

// [href, title, blurb, external?]
const GROUPS = [
  ['Start here', [
    ['/what-is-a-company-dossier/', 'What is a company dossier', 'The definition, the nine sections, and how it differs from a search.'],
    ['/how-it-works/', 'How it works', 'The public-source research pipeline, end to end.'],
    ['/sample/', 'Sample dossier', 'A page from a finished, sourced file.'],
    ['/glossary/', 'Glossary', 'The vocabulary of company research.'],
    ['/faq/', 'FAQ', 'Common questions, answered plainly.'],
  ]],
  ['Generate one', [
    ['/generate/', 'In your browser', 'Free, no key — our engine builds the file live and you export it.'],
    ['/use-in-ai/', 'In your own AI', 'Open the dossier prompt in ChatGPT, Claude, Perplexity, Gemini or Grok.'],
    ['/web-app/', 'Web app', 'What the in-browser generator does and how.'],
  ]],
  ['Build with it (developers)', [
    ['/cli/', 'CLI & npm', 'npx company-dossier <company> — the command-line tool & library.'],
    ['/mcp/', 'MCP server & API', 'Wire the build_dossier tool into any AI agent. Endpoint, auth, schema, connect snippets.'],
    ['/vscode-extension/', 'VS Code extension', 'Generate and read dossiers inside your editor.'],
    ['/knowledge/index.md', 'Knowledge base (OKF)', 'Open Knowledge Format docs for agent consumption.'],
  ]],
  ['Run it in an AI app', [
    ['/chatgpt/', 'ChatGPT app', 'Use Company Dossier from inside ChatGPT.'],
    ['/claude/', 'Claude app & skill', 'Use it as a Claude app and an agent skill.'],
  ]],
  ['Reference', [
    ['https://github.com/ever-just/company-dossier/blob/main/methodology/OVERVIEW.md', 'Methodology', 'The full reproducible research playbook (on GitHub).', true],
    ['/brand/', 'Brand kit', 'Logo, colors and usage.'],
    ['/privacy/', 'Privacy', 'What data is processed, and how.'],
    ['/terms/', 'Terms', 'The terms of use.'],
  ]],
  ['Code & package', [
    [SITE.repo, 'Core repo', 'Source for the engine, site, methodology and integrations.', true],
    [SITE.repoVscode, 'VS Code repo', 'Source for the editor extension.', true],
    ['https://www.npmjs.com/package/company-dossier', 'npm package', 'company-dossier — CLI, library and MCP server.', true],
  ]],
];

const groupHtml = GROUPS.map(([heading, links]) => {
  const cards = links.map((l, i) => {
    const v = ['', ' v2', ' v3'][i % 3];
    const ext = l[3] ? ' target="_blank" rel="noopener"' : '';
    const mark = l[3] ? ' ↗' : '';
    return `<a class="linkcard sk${v} reveal" href="${l[0]}"${ext}><h3>${l[1]}${mark}</h3><p>${l[2]}</p></a>`;
  }).join('\n');
  return `<div class="head reveal" style="margin-top:8px"><h2 class="marker">${heading}</h2></div>
    <div class="linkgrid" style="margin:18px 0 44px">${cards}</div>`;
}).join('\n');

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">documentation</span>
    <h1>Docs</h1>
    <p class="lede">Everything for using and building on Company Dossier — generate a file in the browser, run it from the CLI, or call the <a href="/mcp/" class="prose" style="border-bottom:2px solid var(--ink);text-decoration:none">MCP server</a> from your own AI agent. Public sources only; every claim sourced.</p>
    <div class="pubnote" style="font-family:var(--f-type);font-size:.82rem;color:var(--smudge);margin-top:14px">For machines: <a href="/llms.txt" style="border-bottom:1px solid var(--faint);text-decoration:none">llms.txt</a> · <a href="/sitemap.xml" style="border-bottom:1px solid var(--faint);text-decoration:none">sitemap.xml</a> · <a href="/mcp/" style="border-bottom:1px solid var(--faint);text-decoration:none">MCP / build_dossier</a></div>
  </div>
</section>

<section class="sec" style="padding-top:26px">
  <div class="wrap">
    ${groupHtml}
  </div>
</section>

${ctaFinal('Open your first file.', 'pick a company — read the whole story in minutes.')}
`;

export default {
  path: '/docs/',
  priority: '0.7',
  changefreq: 'monthly',
  breadcrumbs: [{ href: '/docs/', label: 'Docs' }],
  title: 'Documentation — Company Dossier',
  description: 'Company Dossier documentation: generate a dossier in the browser, from the CLI, or via the MCP server/API; run it in ChatGPT or Claude; methodology, knowledge base, and developer reference.',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Docs', item: SITE.origin + '/docs/' },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'CollectionPage',
      name: 'Company Dossier Documentation',
      url: SITE.origin + '/docs/',
      description: 'Guides and references for generating company dossiers and building on the Company Dossier engine and MCP server.',
    },
  ],
  body,
};
