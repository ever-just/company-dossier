import { SITE } from '../lib.mjs';

const UPDATED = '2026-06-21';

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab">section — legal</span>
    <h1>Privacy Policy</h1>
    <p class="lede">Company Dossier compiles intelligence dossiers from the public record. This is the short, honest version of what that means for your data.</p>
    <p style="font-family:var(--f-type);font-size:.9rem;color:var(--smudge);margin-top:8px">Last updated: ${UPDATED}</p>
  </div>
</section>

<section class="sec" style="padding-top:24px">
  <div class="narrow">
    <div class="prose">
      <h2>Who we are</h2>
      <p>Company Dossier is operated by <strong>EverJust</strong>. It compiles a sourced file on a company from <strong>public sources only</strong>. Questions, corrections and takedown requests go to <a href="mailto:company@everjust.co">company@everjust.co</a>.</p>

      <h2>What we process</h2>
      <p>The only data you give us is the <strong>company name or domain you submit</strong> — the target you want a dossier on. We use it to gather the public record on that company and assemble the file. We don't ask for an account, and we don't ask for personal information about you.</p>
      <p>The dossier itself is drawn from public sources: published filings, posted job listings, news coverage, maps, reviews and the company's own site. It covers businesses and the people who run them <strong>in their professional capacity</strong>. We do not compile private personal data.</p>

      <h2>The generator at /generate</h2>
      <p>When you generate a dossier at <a href="/generate/">/generate</a>, the <strong>company name or domain you enter</strong> is sent to our generator API (<code>api.companydossier.lol</code>), which fetches <strong>public sources only</strong> (the company's own website, DNS records, the open web) and streams back the assembled dossier. We don't require an account or an API key for this, and <strong>we don't store the query or the resulting dossier</strong> — it's generated on demand and returned to your browser. Standard transient server logs (e.g. IP address, kept briefly for rate-limiting and abuse prevention) may apply.</p>
      <p>The optional <strong>"polish with Claude"</strong> step is different: your Anthropic API key and the request go <strong>directly from your browser to Anthropic's API</strong> — never to us. Exporting (Markdown, ZIP, or a new GitHub repo) happens entirely in your browser; a GitHub token, if you use that export, goes only to GitHub. Anthropic's and GitHub's handling of those requests is governed by their own terms and privacy policies.</p>

      <h2>The CLI, library and MCP server</h2>
      <p>The command-line tool, the npm library and the MCP server run on <strong>your own machine or a host you choose</strong>. They talk to public sources and to your AI provider directly. We don't sit in the middle and we don't receive a copy of what you run.</p>

      <h2>What we don't do</h2>
      <ul>
        <li>We <strong>do not sell personal data</strong>, and we don't sell your activity to anyone.</li>
        <li>We don't compile dossiers on private individuals — the subject is businesses and people in their professional capacity, from public sources.</li>
        <li>We don't bypass logins, scrape behind walls, or harvest non-public data.</li>
      </ul>

      <h2>Accuracy</h2>
      <p>Dossiers are <strong>auto-generated from public sources and may be inaccurate, incomplete or out of date</strong>. Company Dossier is not affiliated with the companies it profiles. Treat a dossier as a starting map and <strong>verify before you act</strong> on anything that matters.</p>

      <h2>Corrections &amp; takedowns</h2>
      <p>If a dossier contains something wrong, or you want content about your company or about yourself removed, email <a href="mailto:company@everjust.co">company@everjust.co</a> and we'll address it.</p>

      <h2>Changes</h2>
      <p>If this policy changes, we'll update the date at the top of this page.</p>
    </div>
  </div>
</section>
`;

export default {
  path: '/privacy/',
  priority: '0.3',
  changefreq: 'yearly',
  breadcrumbs: [{ href: '/privacy/', label: 'Privacy Policy' }],
  title: 'Privacy Policy — Company Dossier',
  description: 'How Company Dossier handles data: we compile dossiers from public sources only, never sell personal data, and your Claude API key and output stay in your browser. Operated by EverJust.',
  ogType: 'article',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'WebPage',
      name: 'Privacy Policy — Company Dossier',
      description: 'How Company Dossier handles data: public sources only, no sale of personal data, in-browser API key handling. Operated by EverJust.',
      url: SITE.origin + '/privacy/',
      dateModified: UPDATED,
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: SITE.origin + '/privacy/' },
      ],
    },
  ],
  body,
};
