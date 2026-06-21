import { SITE } from '../lib.mjs';

const UPDATED = '2026-06-21';

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — legal</span>
    <h1>Terms of Service</h1>
    <p class="lede">Plain rules for using Company Dossier. It's a tool for reading businesses from the public record — use it honestly and it stays useful for everyone.</p>
    <p style="font-family:var(--f-type);font-size:.9rem;color:var(--smudge);margin-top:8px">Last updated: ${UPDATED}</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="narrow">
    <div class="prose">
      <h2>The deal</h2>
      <p>Company Dossier is operated by <strong>EverJust</strong> and compiles sourced dossiers on companies from <strong>public sources only</strong>. By using the web app, CLI, library, MCP server or any other part of the product, you agree to these terms. Contact: <a href="mailto:company@everjust.co">company@everjust.co</a>.</p>

      <h2>Provided as-is</h2>
      <p>Company Dossier is provided <strong>"as is", with no warranty</strong> of any kind. Dossiers are auto-generated from public sources and <strong>may be inaccurate, incomplete or out of date</strong>. Company Dossier is not affiliated with the companies it profiles. Treat any dossier as a starting map and <strong>verify before you act</strong> on it. To the extent permitted by law, EverJust is not liable for how you use the tool or its output.</p>

      <h2>Acceptable use</h2>
      <p>Use Company Dossier <strong>lawfully and against public data only</strong>. You agree not to use it to:</p>
      <ul>
        <li>harass, stalk, threaten or surveil individuals;</li>
        <li>harvest, infer or assemble <strong>non-public or private personal data</strong>;</li>
        <li>bypass logins, paywalls or access controls, or otherwise reach data you aren't allowed to;</li>
        <li>break any applicable law, or anyone's rights.</li>
      </ul>
      <p>You're also responsible for <strong>respecting the terms of third-party sites and services</strong> the tool reaches, and for using your own AI provider (e.g. Anthropic) under that provider's terms.</p>

      <h2>The dossiers</h2>
      <p>Dossiers cover businesses and the people who run them in their professional capacity, from the public record. They are not verdicts, credit decisions, background checks or legal advice, and must not be used as such. If a dossier contains something wrong, or you want content removed, email <a href="mailto:company@everjust.co">company@everjust.co</a>.</p>

      <h2>The code</h2>
      <p>The Company Dossier code is open source under the <strong>MIT license</strong>. The MIT license covers your use of the code; these terms cover your use of the hosted product and its output.</p>

      <h2>Changes</h2>
      <p>If these terms change, we'll update the date at the top of this page. Continued use after a change means you accept the updated terms.</p>
    </div>
  </div>
</section>
`;

export default {
  path: '/terms/',
  priority: '0.3',
  changefreq: 'yearly',
  breadcrumbs: [{ href: '/terms/', label: 'Terms of Service' }],
  title: 'Terms of Service — Company Dossier',
  description: 'The terms for using Company Dossier: provided as-is with no warranty, public-data and lawful use only, no harassment or harvesting of non-public data. Code is MIT licensed. Operated by EverJust.',
  ogType: 'article',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'WebPage',
      name: 'Terms of Service — Company Dossier',
      description: 'Terms for using Company Dossier: as-is, lawful public-data use only, no harassment or harvesting of non-public data, MIT-licensed code. Operated by EverJust.',
      url: SITE.origin + '/terms/',
      dateModified: UPDATED,
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: SITE.origin + '/terms/' },
      ],
    },
  ],
  body,
};
