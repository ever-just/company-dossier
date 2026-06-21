import { SITE, aiLauncher, ctaFinal } from '../lib.mjs';

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">your ai, your file</span>
    <h1>Use Company Dossier in any AI</h1>
    <p class="lede">Pick the assistant you already pay for — ChatGPT, Claude, Perplexity, Gemini or Grok — and send it a ready-to-run brief that builds a complete, sourced company dossier. No key, no install: the model does the work in its own tab, guided by the Company Dossier method.</p>
  </div>
</section>

<section class="sec" style="padding-top:14px">
  <div class="wrap narrow">
    ${aiLauncher({ heading: 'Send a dossier brief to your AI', sub: 'Type a company, choose a model. We open it with the nine-section prompt — and copy it as a fallback.' })}
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="prose">
      <h2>How it works</h2>
      <p>Every button builds the same brief: it tells your assistant to produce a Markdown dossier across the nine Company Dossier sections — overview &amp; identity, people &amp; org chart, hiring radar, money trail, locations, tech fingerprint, news &amp; timeline, relationship web, and risk flags — using <strong>public sources only</strong>, attributing every claim, and marking gaps. The prompt points the model at <code>${SITE.origin}/llms.txt</code> and the open-source method so it follows the same playbook the CLI and VS Code extension use.</p>
      <h2>Which model should I pick?</h2>
      <ul>
        <li><strong>ChatGPT &amp; Claude</strong> — open a fresh chat with the brief pre-filled; best when you want a long, structured write-up.</li>
        <li><strong>Perplexity</strong> — runs the brief as a live, cited web search; great for fresh public signals.</li>
        <li><strong>Gemini &amp; Grok</strong> — we copy the prompt to your clipboard and open the app; just paste.</li>
      </ul>
      <h2>Want a deeper, automated build?</h2>
      <p>For a structured file with no copy-paste, use the <a href="/generate/">in-browser generator</a> (bring your Claude key), the <a href="/cli/">npm CLI</a> (<code>npx company-dossier &lt;company&gt;</code>), the <a href="/vscode-extension/">VS Code extension</a>, the <a href="/mcp/">MCP server / API</a> (connect any agent to <code>build_dossier</code>), or wire the <a href="/claude/">Claude</a> / <a href="/chatgpt/">ChatGPT</a> apps via the built-in MCP server (tool <code>build_dossier</code>).</p>
    </div>
  </div>
</section>

${ctaFinal('Send your first brief.', 'pick a company, pick a model, read the file.')}
`;

export default {
  path: '/use-in-ai/',
  active: '/get/',
  priority: '0.8',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }, { href: '/use-in-ai/', label: 'Use in your AI' }],
  title: 'Use Company Dossier in any AI — ChatGPT, Claude, Perplexity, Gemini, Grok',
  description: 'One click sends a company-research brief to ChatGPT, Claude, Perplexity, Gemini or Grok — building a complete, sourced company dossier in the AI you already use. Free, no install.',
  jsonld: [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Get it', item: SITE.origin + '/get/' },
      { '@type': 'ListItem', position: 2, name: 'Use in your AI', item: SITE.origin + '/use-in-ai/' },
    ] },
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Company Dossier — AI launcher', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: SITE.origin + '/use-in-ai/' },
  ],
  body,
};
