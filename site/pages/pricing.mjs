import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

const included = [
  'All nine sections — overview, people, hiring, money, locations, tech, news, relationships and risk.',
  'Every channel — the web app, the VS Code extension, the npm CLI, the ChatGPT app and the Claude app and skill.',
  'Every line sourced — each claim links back to the public record it came from, at no extra cost.',
  'Unlimited companies — run a file on any business you like; there is no per-dossier charge.',
  'Export and share — read it, copy it, save it or drop it into your notes.',
];

const includedList = included.map(t => `<li>${t}</li>`).join('\n        ');

const freeCard = `<div class="sk reveal" style="padding:34px 30px;max-width:520px;margin:0 auto;position:relative;text-align:center">
  <span class="tape" style="left:50%;top:-13px;transform:translateX(-50%) rotate(-3deg);width:130px"></span>
  <span class="tab" style="margin-bottom:14px">the price</span>
  <div class="marker" style="font-size:clamp(3rem,9vw,4.6rem);line-height:1;margin:8px 0">$0</div>
  <p class="hand" style="font-size:1.4rem;color:var(--smudge);margin:0 0 18px">free, from public sources</p>
  <ul style="text-align:left;font-size:.98rem;line-height:1.7;padding-left:22px;margin:0 0 22px">
    ${included.map(t => `<li>${t}</li>`).join('\n    ')}
  </ul>
  <a class="btn solid" href="/get/">Open a dossier ${arrow}</a>
</div>`;

const faq = [
  { q: 'Is Company Dossier really free?', a: 'Yes. Company Dossier is free to use. A dossier is assembled entirely from public sources — job boards, filings, news and the open web — so there is no data licence to pass on and no per-report fee. There is no paywall on the sections, no credit-card wall to see your results, and no usage cap that flips you into a paid tier. The tooling is open, and you can run it on as many companies as you like.' },
  { q: 'Will anything ever cost money?', a: 'Nothing is required to get a complete dossier. The only thing that can cost money is optional: if you want deeper enrichment, you can bring your own third-party API keys (for example, a paid data or search provider you already pay for) and the tooling will use them. Those keys are billed by that provider, to you, on your own account — Company Dossier never charges you and never marks anything up. Out of the box, with no keys, you still get the full nine-section file for free.' },
];

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — the price</span>
    <h1>Pricing: Company Dossier is free.</h1>
    <p class="lede">Company Dossier is free to use. Every dossier is built from public sources, so there is no data licence to pay for and nothing behind a paywall. One price, no asterisk: zero.</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="wrap">
    ${freeCard}
  </div>
</section>

<section class="sec alt">
  <div class="narrow">
    <div class="prose">
      <h2>Why it's free</h2>
      <p>Most company-research tools charge because they license a proprietary database and resell access to it. Company Dossier works differently. It doesn't sell you a dataset — it reads the <strong>public record</strong> the same way a careful person would, then organizes what it finds into one file. Job listings, public filings, news, maps and a company's own website are all freely available; the value is in gathering, reconciling and laying them out, not in gatekeeping them. Because there's no data to license, there's nothing to bill you for. <a href="/what-is-a-company-dossier/">What a company dossier is →</a></p>
      <p>That's also why this isn't a "free trial" or a teaser. There's no premium tier hiding the good sections, no per-company charge, and no point where you're asked to upgrade to see your own results. If you're searching for whether there's a <em>company research tool that's free</em> — this is it, and it stays free.</p>

      <h2>What's included</h2>
      <p>The free plan is the whole product. Every dossier you run includes:</p>
      <ul>
        ${includedList}
      </ul>
      <p>And it runs wherever you work. The same free dossier is available through the <a href="/web-app/">web app</a>, the <a href="/vscode-extension/">VS Code extension</a>, the <a href="/cli/">npm CLI</a> (<code>company-dossier</code>), the <a href="/chatgpt/">ChatGPT app</a> and the <a href="/claude/">Claude app and skill</a>. Pick the channel that fits your workflow; the price is the same in all of them. <a href="/get/">See all the ways to run it →</a></p>

      <h2>What could cost money (nothing required)</h2>
      <p>To be completely honest about it: there is exactly one way money can enter the picture, and it's entirely optional. If you want to push a dossier further than public sources alone — say, by adding a paid search provider or a commercial data API you already subscribe to — you can supply your own API key, and the tooling will use it for deeper enrichment.</p>
      <p>Three things matter here. First, this is <strong>optional</strong>: with no keys at all, you still get the complete nine-section file. Second, any charge comes from that <strong>third-party provider</strong>, billed directly to you on your own account — Company Dossier doesn't resell it and doesn't take a cut. Third, you stay in control: it's your key, your provider, your spend. The default, free experience never asks for a card.</p>

      <h2>The honest limits</h2>
      <p>Free doesn't mean unlimited in every dimension — it means honest. A dossier is built from what the public record actually contains, so a company with little public footprint will produce a thinner file than a well-covered one. That's a limit of the source material, not a paywall. As always, treat a dossier as a fast, sourced starting map and <a href="/how-it-works/">verify the lines that matter</a> before you act on them.</p>

      <h2>Ready to run one?</h2>
      <p>There's nothing to buy and nothing to sign up for to find out. <a href="/sample/">Read a sample dossier</a> to see exactly what you get, then <a href="/get/">open a file on any company</a> — free.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="head center reveal"><span class="tab">the fine print</span><h2 class="marker">Pricing questions</h2></div>
    <div class="faq">
      ${faq.map((f, i) => {
        const v = ['', ' v2', ' v3'][i % 3];
        return `<article class="qa sk${v} reveal"><h3><span class="marker">Q.</span> ${f.q}</h3><p>${f.a}</p></article>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

${ctaFinal('Free, from the public record.', 'no paywall. no per-report fee. just open a file.')}
`;

export default {
  path: '/pricing/',
  priority: '0.7',
  changefreq: 'monthly',
  active: undefined,
  breadcrumbs: [{ href: '/pricing/', label: 'Pricing' }],
  title: 'Pricing — is Company Dossier free? Yes, from public sources',
  description: 'Company Dossier is free. Every dossier is built from public sources, with all nine sections and every channel — web app, VS Code, CLI, ChatGPT and Claude — included. The only optional cost is third-party API keys you bring yourself.',
  ogType: 'website',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Company Dossier',
      applicationCategory: 'BusinessApplication', operatingSystem: 'Web, VS Code, CLI',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: SITE.origin + '/pricing/',
      description: 'A free company research tool that compiles a complete, sourced dossier on any company from public sources.',
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Pricing', item: SITE.origin + '/pricing/' },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
  body,
};
