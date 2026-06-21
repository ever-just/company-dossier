import { SITE, icon, SECTIONS, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

// The nine sections, drawn into the empty results outline so the panel reads
// like a case file even before anything is generated.
const sectionList = SECTIONS.map((s, i) =>
  `<li><span class="cdw-n">${i + 1}</span>${icon(s.id, 'ic rough-s cdw-sec-ic')}<span>${s.t}</span></li>`
).join('\n        ');

const modelOptions = `
        <option value="claude-opus-4-8">Claude Opus 4.8 — deepest</option>
        <option value="claude-sonnet-4-6" selected>Claude Sonnet 4.6 — balanced (default)</option>
        <option value="claude-haiku-4-5-20251001">Claude Haiku 4.5 — fastest</option>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">generate — in your browser</span>
    <h1>Open a file on any company, right here.</h1>
    <p class="lede">Type a name or domain, paste your Anthropic API key, and this page assembles a complete, sourced dossier — the same nine sections you get everywhere else — entirely in your browser. Nothing is sent to us. There is no us to send it to: this is a static page, your key talks straight to Anthropic and never leaves the tab.</p>
    <div class="pubnote" style="font-family:var(--f-type);font-size:.82rem;color:var(--smudge);margin-top:16px">Public sources only · your keys stay on this device · bring your own API key.</div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow cdw">
    <div class="head center reveal">
      <span class="tab fill">the brief</span>
      <h2 class="marker">Name the company</h2>
      <p style="margin-left:auto;margin-right:auto">That, plus a key, is the whole brief. The model does the rest and shows the file below.</p>
    </div>

    <form class="cdw-card sk reveal" id="cdw-form" autocomplete="off" novalidate>
      <span class="tape" style="left:24px;top:-12px"></span>

      <div class="cdw-field">
        <label for="cdw-company">Company name <span class="cdw-or">or</span> domain</label>
        <input id="cdw-company" name="company" type="text" inputmode="text"
          placeholder="Acme Corp · or · acme.com" required />
      </div>

      <div class="cdw-row2">
        <div class="cdw-field">
          <label for="cdw-key">Anthropic API key</label>
          <input id="cdw-key" name="key" type="password" autocomplete="off"
            placeholder="sk-ant-…" spellcheck="false" />
        </div>
        <div class="cdw-field">
          <label for="cdw-model">Model</label>
          <select id="cdw-model" name="model">${modelOptions}
          </select>
        </div>
      </div>

      <div class="cdw-remember">
        <label class="cdw-check">
          <input type="checkbox" id="cdw-remember" name="remember" />
          <span>Remember key on this device</span>
        </label>
        <button type="button" class="cdw-link" id="cdw-forget" hidden>Forget saved key</button>
        <p class="cdw-remember-warn" id="cdw-remember-warn" hidden>
          Heads up: the key will be stored in this browser's localStorage in plain text until you forget it. Only do this on a device you trust.
        </p>
      </div>

      <div class="cdw-privacy" role="note">
        ${icon('i-shield', 'ic rough-s cdw-shield')}
        <div>
          <b>Your keys stay in your browser.</b>
          The Anthropic key is sent only to <code>api.anthropic.com</code>; a GitHub token (if you use export) only to <code>api.github.com</code>. Nothing is ever sent to this site — it's a static page with no backend, no logging, no analytics on your inputs. By default keys live in memory and vanish when you close the tab.
        </div>
      </div>

      <div class="cdw-actions">
        <button type="submit" class="btn solid" id="cdw-go">Generate the dossier ${arrow}</button>
        <button type="button" class="btn" id="cdw-clear" hidden>Clear</button>
      </div>

      <p class="cdw-status" id="cdw-status" role="status" aria-live="polite" hidden></p>
    </form>

    <!-- Results panel: starts as the empty file outline, fills in on generate -->
    <div class="cdw-results" id="cdw-results" aria-live="polite">
      <div class="cdw-empty" id="cdw-empty">
        <div class="cdw-file-head">
          <div>
            <div class="cdw-stamp-row"><span class="cdw-conf">confidential // case file</span></div>
            <div class="cdw-file-title marker">Awaiting subject</div>
            <div class="cdw-file-meta">nine sections · public record · sourced · drafted by Claude</div>
          </div>
          ${icon('i-folder', 'ic rough cdw-folder')}
        </div>
        <ol class="cdw-outline">
        ${sectionList}
        </ol>
      </div>
    </div>

    <!-- Export bar: hidden until a dossier exists -->
    <div class="cdw-export sk" id="cdw-export" hidden>
      <div class="cdw-export-label">Export this file</div>
      <div class="cdw-export-row">
        <button type="button" class="btn small" id="cdw-dl-md">Download .md</button>
        <button type="button" class="btn small" id="cdw-dl-zip">Download .zip</button>
        <button type="button" class="btn small" id="cdw-gh">Create GitHub repo</button>
      </div>
      <p class="cdw-export-note" id="cdw-export-note" hidden></p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">prefer no key?</span>
      <h2 class="marker">Other ways to run it</h2>
      <p style="margin-left:auto;margin-right:auto">This in-browser widget needs your own API key. If you'd rather not bring one, every other path builds the same nine-section file.</p>
    </div>
    <div class="grid4 cdw-ways">
      <a class="card sk reveal linkcard" href="/cli/">${icon('i-terminal')}<h3>CLI &amp; npm</h3><p>One command, sourced to disk. <code>npx company-dossier</code></p></a>
      <a class="card sk v2 reveal linkcard" href="/vscode-extension/">${icon('i-code')}<h3>VS Code</h3><p>Generate and read dossiers without leaving your editor.</p></a>
      <a class="card sk v3 reveal linkcard" href="/claude/">${icon('i-bot')}<h3>Claude</h3><p>Run it as a Claude app &amp; skill, in plain conversation.</p></a>
      <a class="card sk reveal linkcard" href="/chatgpt/">${icon('i-bot')}<h3>ChatGPT</h3><p>The ChatGPT app builds the same file from a name.</p></a>
    </div>
  </div>
</section>

${ctaFinal('Bring a key. Open a file.', 'paste a company, paste your key — read the whole story in minutes.')}
`;

export default {
  path: '/generate/',
  active: '/get/',
  priority: '0.9',
  changefreq: 'monthly',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }, { href: '/generate/', label: 'Generate' }],
  title: 'Generate a company dossier in your browser — Company Dossier',
  description: 'Generate a complete, sourced company dossier right in your browser with your own Anthropic API key. Nine sections, public sources, export to Markdown, ZIP or a new GitHub repo. No backend — your keys never leave your device.',
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
      '@context': 'https://schema.org', '@type': 'SoftwareApplication',
      name: 'Company Dossier — in-browser generator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web browser',
      url: SITE.origin + '/generate/',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'A fully client-side tool that generates a complete, sourced, nine-section company dossier in the browser using your own Anthropic API key, with export to Markdown, ZIP or a new GitHub repository.',
    },
  ],
  body,
};
