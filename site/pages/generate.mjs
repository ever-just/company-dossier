import { SITE, icon, SECTIONS, ctaFinal, aiLauncher } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

const sectionList = SECTIONS.map((s, i) =>
  `<li><span class="cdw-n">${i + 1}</span>${icon(s.id, 'ic rough-s cdw-sec-ic')}<span>${s.t}</span></li>`
).join('\n        ');

const modelOptions = `
          <option value="claude-opus-4-8">Claude Opus 4.8 — deepest</option>
          <option value="claude-sonnet-4-6" selected>Claude Sonnet 4.6 — balanced</option>
          <option value="claude-haiku-4-5-20251001">Claude Haiku 4.5 — fastest</option>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">generate — free, in your browser</span>
    <h1>Open a real file on any company.</h1>
    <p class="lede">Type a name or domain and hit generate. Our engine pulls the public record live — the website, DNS &amp; email, the open web, tech stack and history — and assembles a complete, sourced, nine-section dossier right here. <strong>No API key. No install.</strong></p>
    <div class="pubnote" style="font-family:var(--f-type);font-size:.82rem;color:var(--smudge);margin-top:16px">Public sources only · free · the same engine behind the CLI and the apps.</div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow cdw">
    <div class="head center reveal">
      <span class="badge-run">▶ runs here · web app</span>
      <h2 class="marker">Name the company</h2>
      <p style="margin-left:auto;margin-right:auto">That's the whole brief. Watch the file build, then read or export it below.</p>
    </div>

    <form class="cdw-card sk reveal" id="cdw-form" autocomplete="off" novalidate>
      <span class="tape" style="left:24px;top:-12px"></span>
      <div class="cdw-field cdw-field-main">
        <label for="cdw-company">Company name <span class="cdw-or">or</span> domain</label>
        <div class="cdw-input-go">
          <input id="cdw-company" name="company" type="text" inputmode="text"
            placeholder="Stripe · or · stripe.com" required autocomplete="organization" />
          <button type="submit" class="btn solid" id="cdw-go">Generate ${arrow}</button>
        </div>
        <p class="cdw-hint">Tip: a domain (like <code>stripe.com</code>) gives the richest, fastest result.</p>
      </div>
      <div class="cdw-actions">
        <button type="button" class="btn" id="cdw-clear" hidden>Clear</button>
      </div>
      <p class="cdw-status" id="cdw-status" role="status" aria-live="polite" hidden></p>
    </form>

    <div class="cdw-results" id="cdw-results" aria-live="polite">
      <div class="cdw-empty" id="cdw-empty">
        <div class="cdw-file-head">
          <div>
            <div class="cdw-stamp-row"><span class="cdw-conf">confidential // case file</span></div>
            <div class="cdw-file-title marker">Awaiting subject</div>
            <div class="cdw-file-meta">nine sections · public record · sourced</div>
          </div>
          ${icon('i-folder', 'ic rough cdw-folder')}
        </div>
        <ol class="cdw-outline">
        ${sectionList}
        </ol>
      </div>
    </div>

    <div class="cdw-export sk" id="cdw-export" hidden>
      <div class="cdw-export-label">Export this file</div>
      <div class="cdw-export-row">
        <button type="button" class="btn small" id="cdw-dl-md">Download .md</button>
        <button type="button" class="btn small" id="cdw-dl-zip">Download .zip</button>
        <button type="button" class="btn small" id="cdw-gh">Create GitHub repo</button>
      </div>
      <p class="cdw-export-note" id="cdw-export-note" hidden></p>

      <!-- optional: polish with Claude (revealed after a dossier exists) -->
      <div class="cdw-polish" id="cdw-polish-wrap" hidden>
        <details class="cdw-polish-d">
          <summary>${icon('i-bot', 'ic rough-s')} Polish with Claude <span class="cdw-opt">optional</span></summary>
          <div class="cdw-polish-body">
            <p>Already-collected, sourced data only — sent straight to Anthropic with <em>your</em> key, so nothing is invented. Adds an executive summary and tightens the prose.</p>
            <div class="cdw-row2">
              <div class="cdw-field">
                <label for="cdw-key">Anthropic API key
                  <a class="cdw-link" href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">get a key →</a>
                </label>
                <input id="cdw-key" name="key" type="password" autocomplete="off" placeholder="sk-ant-…" spellcheck="false" />
                <p class="cdw-hint">Sign in at console.anthropic.com → <b>API Keys</b> → <b>Create Key</b> → copy the <code>sk-ant-…</code> value. Add a little credit under <b>Billing</b> if it's a new account. The key is sent only to <code>api.anthropic.com</code> and never to us.</p>
              </div>
              <div class="cdw-field">
                <label for="cdw-model">Model</label>
                <select id="cdw-model" name="model">${modelOptions}
                </select>
                <label class="cdw-check"><input type="checkbox" id="cdw-remember" name="remember" /> <span>Remember key on this device</span></label>
              </div>
            </div>
            <div class="cdw-actions">
              <button type="button" class="btn solid small" id="cdw-enhance">Polish the dossier</button>
              <button type="button" class="cdw-link" id="cdw-forget" hidden>Forget saved key</button>
            </div>
          </div>
        </details>
      </div>
    </div>

    <p class="cdw-privacy-note" role="note">${icon('i-shield', 'ic rough-s cdw-shield')}
      <span>The company name you enter is sent to our generator API (<code>api.companydossier.lol</code>) to fetch public data and build the file; we don't store it. The optional polish step sends the dossier to <code>api.anthropic.com</code> with your key. Export runs entirely in your browser. <a href="/privacy/">Privacy</a>.</span>
    </p>
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="badge-open">↗ opens your AI · new tab</span>
      <h2 class="marker">Or run it in your own AI</h2>
      <p style="margin-left:auto;margin-right:auto">Rather use ChatGPT, Claude, Perplexity, Gemini or Grok? Pick one — it opens in a new tab with a ready-to-run dossier prompt. This is different from the generator above: the work happens in <em>your</em> AI, not here.</p>
    </div>
    ${aiLauncher({ heading: 'Open in your AI', sub: 'One tap — opens with the dossier prompt loaded.', compact: true })}
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">more ways</span>
      <h2 class="marker">Build it anywhere</h2>
    </div>
    <div class="grid4 cdw-ways">
      <a class="card sk reveal linkcard" href="/cli/">${icon('i-terminal')}<h3>CLI &amp; npm</h3><p>One command, sourced to disk. <code>npx company-dossier</code></p></a>
      <a class="card sk v2 reveal linkcard" href="/vscode-extension/">${icon('i-code')}<h3>VS Code</h3><p>Generate and read dossiers without leaving your editor.</p></a>
      <a class="card sk v3 reveal linkcard" href="/mcp/">${icon('i-bot')}<h3>MCP server / API</h3><p>Wire <code>build_dossier</code> into any AI agent.</p></a>
      <a class="card sk reveal linkcard" href="/chatgpt/">${icon('i-bot')}<h3>ChatGPT &amp; Claude</h3><p>Run it as an app from a plain sentence.</p></a>
    </div>
  </div>
</section>

${ctaFinal('Name a company. Open the file.', 'free, in your browser, from the public record — read the whole story in minutes.')}
`;

export default {
  path: '/generate/',
  active: '/get/',
  priority: '0.9',
  changefreq: 'monthly',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }, { href: '/generate/', label: 'Generate' }],
  title: 'Generate a company dossier in your browser — free, no API key',
  description: 'Generate a complete, sourced company dossier right in your browser — free, no API key. Our engine pulls the public record live (website, DNS, search, tech, history) into nine sections. Export to Markdown, ZIP or a new GitHub repo, or open it in your own AI.',
  head: '<link rel="stylesheet" href="/assets/widget.css" />',
  bodyEnd: '<script type="module" src="/assets/widget.js"></script>',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Get it', item: SITE.origin + '/get/' },
        { '@type': 'ListItem', position: 3, name: 'Generate', item: SITE.origin + '/generate/' },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'WebApplication',
      name: 'Company Dossier — in-browser generator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web browser',
      url: SITE.origin + '/generate/',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'A free in-browser tool that generates a complete, sourced, nine-section company dossier from the public record (no API key), with export to Markdown, ZIP or a new GitHub repository.',
    },
  ],
  body,
};
