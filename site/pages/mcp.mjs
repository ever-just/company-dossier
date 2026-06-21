import { SITE, icon, ctaFinal } from '../lib.mjs';

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;

const ENDPOINT = 'https://mcp.companydossier.lol/mcp';
const HEALTH = 'https://mcp.companydossier.lol/health';

const healthBlock = `<div class="term reveal" role="img" aria-label="Health check returning status ok">
<span class="c"># is the server up?</span>
<span class="p">$ <b>curl ${HEALTH}</b></span>
<span class="p">{"status":"ok"}</span>
</div>`;

const curlBlock = `<div class="term reveal" role="img" aria-label="A raw curl session doing MCP initialize and tools/list">
<span class="c"># 1 — initialize the session (Streamable HTTP)</span>
<span class="p">$ <b>curl -s ${ENDPOINT} \\</b></span>
<span class="p">    <b>-H 'Authorization: Bearer &lt;token&gt;' \\</b></span>
<span class="p">    <b>-H 'Content-Type: application/json' \\</b></span>
<span class="p">    <b>-H 'Accept: application/json, text/event-stream' \\</b></span>
<span class="p">    <b>-d '{"jsonrpc":"2.0","id":1,"method":"initialize",</b></span>
<span class="p">         <b>"params":{"protocolVersion":"2025-06-18",</b></span>
<span class="p">         <b>"capabilities":{},"clientInfo":{"name":"curl","version":"1"}}}'</b></span>
<span class="c"></span>
<span class="c"># 2 — list the tools the server exposes</span>
<span class="p">$ <b>curl -s ${ENDPOINT} \\</b></span>
<span class="p">    <b>-H 'Authorization: Bearer &lt;token&gt;' \\</b></span>
<span class="p">    <b>-H 'Content-Type: application/json' \\</b></span>
<span class="p">    <b>-H 'Accept: application/json, text/event-stream' \\</b></span>
<span class="p">    <b>-d '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'</b></span>
<span class="c">› { "tools": [ { "name": "build_dossier", … } ] }</span>
</div>`;

const callBlock = `<div class="term reveal" role="img" aria-label="Calling the build_dossier tool over MCP">
<span class="c"># call the tool — one company in, the nine-section file out</span>
<span class="p">$ <b>curl -s ${ENDPOINT} \\</b></span>
<span class="p">    <b>-H 'Authorization: Bearer &lt;token&gt;' \\</b></span>
<span class="p">    <b>-H 'Content-Type: application/json' \\</b></span>
<span class="p">    <b>-H 'Accept: application/json, text/event-stream' \\</b></span>
<span class="p">    <b>-d '{"jsonrpc":"2.0","id":3,"method":"tools/call",</b></span>
<span class="p">         <b>"params":{"name":"build_dossier",</b></span>
<span class="p">         <b>"arguments":{"target":"stripe.com",</b></span>
<span class="p">         <b>"sections":"overview,money,people,risk"}}}'</b></span>
<span class="c">› sourced dossier — markdown + structured JSON, no API keys required</span>
</div>`;

const chatgptBlock = `<div class="term reveal" role="img" aria-label="Connecting the MCP server in ChatGPT developer mode">
<span class="c"># ChatGPT — Settings › Connectors › Advanced › Developer mode</span>
<span class="c"># add a custom connector (MCP server):</span>
<span class="p">  Name           Company Dossier</span>
<span class="p">  MCP Server URL ${ENDPOINT}</span>
<span class="p">  Authentication Bearer / Access token</span>
<span class="p">  Token          &lt;token from the operator&gt;</span>
<span class="c">› the build_dossier tool now shows up in the composer</span>
</div>`;

const claudeBlock = `<div class="term reveal" role="img" aria-label="Adding the MCP server to claude_desktop_config.json">
<span class="c">// Claude Desktop — claude_desktop_config.json</span>
<span class="p">{</span>
<span class="p">  "mcpServers": {</span>
<span class="p">    "company-dossier": {</span>
<span class="p">      "type": "http",</span>
<span class="p">      "url": "${ENDPOINT}",</span>
<span class="p">      "headers": {</span>
<span class="p">        "Authorization": "Bearer &lt;token&gt;"</span>
<span class="p">      }</span>
<span class="p">    }</span>
<span class="p">  }</span>
<span class="p">}</span>
<span class="c">// or, in Claude.ai → Settings → Connectors → add a custom</span>
<span class="c">// connector with the same URL + bearer token.</span>
</div>`;

const genericBlock = `<div class="term reveal" role="img" aria-label="A generic MCP client mcp.json entry">
<span class="c">// any MCP client — mcp.json</span>
<span class="p">{</span>
<span class="p">  "mcpServers": {</span>
<span class="p">    "company-dossier": {</span>
<span class="p">      "transport": "http",</span>
<span class="p">      "url": "${ENDPOINT}",</span>
<span class="p">      "headers": { "Authorization": "Bearer &lt;token&gt;" }</span>
<span class="p">    }</span>
<span class="p">  }</span>
<span class="p">}</span>
</div>`;

const npxBlock = `<div class="term reveal" role="img" aria-label="Running the MCP server from npm with npx">
<span class="c"># the same server ships in the npm package — run it yourself</span>
<span class="p">$ <b>npx company-dossier-mcp</b>        <span class="c"># stdio transport (for desktop clients)</span></span>
<span class="p">$ <b>npx company-dossier-mcp-http</b>   <span class="c"># HTTP transport (Streamable HTTP)</span></span>
<span class="c">› both expose the build_dossier tool — no API keys required</span>
</div>`;

const body = `
<section class="sec phero tight">
  <div class="wrap">
    <span class="tab fill">get it — mcp server &amp; api</span>
    <h1>The dossier, wired into your agent.</h1>
    <p class="lede">Company Dossier runs as a live <strong>MCP server</strong>. Connect ChatGPT, Claude or any MCP client to one endpoint and your agent gains a single tool — <code>build_dossier</code> — that turns a company name or domain into a complete, sourced, nine-section dossier (markdown <em>and</em> structured JSON). Public sources only. No API keys needed by the tool.</p>
    <div class="cta-row" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:24px">
      <a class="btn solid" href="#connect">Connect it ${arrow}</a>
      <a class="btn" href="/sample/">See a sample file</a>
    </div>
    <div class="pubnote" style="font-family:var(--f-type);font-size:.82rem;color:var(--smudge);margin-top:16px">Endpoint: <code>${ENDPOINT}</code> · transport: MCP Streamable HTTP · auth: bearer token.</div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">the endpoint</span>
      <h2 class="marker">One URL, one tool</h2>
      <p style="margin-left:auto;margin-right:auto">The hosted server speaks the Model Context Protocol over Streamable HTTP. Point a client at it, pass a bearer token, and the <code>build_dossier</code> tool appears.</p>
    </div>
    <div class="prose reveal">
      <ul>
        <li>${icon('i-globe')} <strong>Endpoint</strong> — <code>${ENDPOINT}</code> (MCP Streamable HTTP).</li>
        <li>${icon('i-check')} <strong>Health</strong> — <code>${HEALTH}</code> returns <code>{"status":"ok"}</code>.</li>
        <li>${icon('i-shield')} <strong>Auth</strong> — bearer token: <code>Authorization: Bearer &lt;token&gt;</code>. The token is provided by the operator and is not public.</li>
        <li>${icon('i-bolt')} <strong>Tool</strong> — <code>build_dossier</code>. No third-party API keys required by the tool itself.</li>
      </ul>
    </div>
    ${healthBlock}
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">the tool</span>
      <h2 class="marker">build_dossier</h2>
      <p style="margin-left:auto;margin-right:auto">A single tool that does the whole job. Give it a target; get back the same nine-section sourced file you get everywhere else.</p>
    </div>
    <div class="prose reveal">
      <p><strong>Input</strong></p>
      <ul>
        <li><code>target</code> <em>(required)</em> — the company name or domain, e.g. <code>"Stripe"</code> or <code>"stripe.com"</code>.</li>
        <li><code>sections</code> <em>(optional)</em> — a comma-separated subset of: <code>overview</code>, <code>people</code>, <code>hiring</code>, <code>money</code>, <code>locations</code>, <code>tech</code>, <code>news</code>, <code>relationships</code>, <code>risk</code>. Omit it to build all nine.</li>
      </ul>
      <p><strong>Output</strong> — the sourced dossier as readable markdown plus a structured JSON object, each claim pointed back to its public source. The same nine sections as the <a href="/cli/" style="text-decoration:none;border-bottom:2px solid var(--faint)">CLI</a>, <a href="/web-app/" style="text-decoration:none;border-bottom:2px solid var(--faint)">web app</a> and apps.</p>
    </div>
    ${callBlock}
  </div>
</section>

<section class="sec" id="connect">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">connect</span>
      <h2 class="marker">Copy-paste setup</h2>
      <p style="margin-left:auto;margin-right:auto">Three clients, same endpoint and bearer token. Pick yours.</p>
    </div>

    <div class="prose reveal" style="margin-top:8px"><h3>ChatGPT (developer mode connector)</h3></div>
    ${chatgptBlock}

    <div class="prose reveal" style="margin-top:24px"><h3>Claude (desktop config / connectors)</h3></div>
    ${claudeBlock}

    <div class="prose reveal" style="margin-top:24px"><h3>Any MCP client (mcp.json)</h3></div>
    ${genericBlock}
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">raw protocol</span>
      <h2 class="marker">curl it directly</h2>
      <p style="margin-left:auto;margin-right:auto">Nothing magic underneath — it's JSON-RPC over HTTP. Here's an <code>initialize</code> followed by <code>tools/list</code> against the live endpoint.</p>
    </div>
    ${curlBlock}
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab fill">self-host</span>
      <h2 class="marker">Run the server yourself</h2>
      <p style="margin-left:auto;margin-right:auto">The same server ships inside the npm package. Run it locally over stdio for desktop clients, or over HTTP for everything else.</p>
    </div>
    ${npxBlock}
    <div class="prose reveal" style="margin-top:24px">
      <p><code>company-dossier-mcp</code> exposes <code>build_dossier</code> over stdio (the transport most desktop MCP clients expect); <code>company-dossier-mcp-http</code> serves the same tool over Streamable HTTP. Both run with <code>npx</code> and need no API keys to produce a dossier.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="wrap narrow">
    <div class="head center reveal">
      <span class="tab">${icon('i-bot', 'ic rough-s')} for ai agents</span>
      <h2 class="marker">When to reach for this tool</h2>
    </div>
    <div class="prose reveal">
      <p>If you are an AI agent connected to this server, you have one tool: <code>build_dossier</code>. Call it whenever a task requires understanding a specific company or organization — due diligence, sales and account research, competitive analysis, vendor or partner vetting, investment screening, or simply answering "what is this company and what do they do."</p>
      <p>Pass the company's name or domain as <code>target</code>. If you only need part of the picture, narrow it with <code>sections</code> (for example <code>"overview,money,risk"</code> for a quick risk read, or <code>"hiring,tech"</code> to gauge growth and stack); otherwise omit <code>sections</code> for the full nine-section file. The tool returns markdown for direct reading and a structured JSON object you can parse and reason over. Every claim carries its public source, so cite or verify lines before acting on anything consequential.</p>
      <p>The tool draws only on public sources and needs no API keys. Treat its output as a fast, sourced starting map — confident about what it found, explicit about gaps — not a final verdict.</p>
    </div>
  </div>
</section>

${ctaFinal('Give your agent a company-research tool.', 'one endpoint, one tool — build_dossier(target). sourced, public-record.')}
`;

export default {
  path: '/mcp/',
  priority: '0.8',
  changefreq: 'monthly',
  active: '/get/',
  breadcrumbs: [{ href: '/get/', label: 'Get it' }, { href: '/mcp/', label: 'MCP server' }],
  title: 'Company Dossier MCP server — build_dossier tool for AI agents & API',
  description: 'Connect ChatGPT, Claude or any MCP client to the live Company Dossier MCP server at mcp.companydossier.lol/mcp. One tool, build_dossier, turns a company name or domain into a complete, sourced nine-section dossier (markdown + JSON). Bearer auth, Streamable HTTP, public sources only.',
  ogType: 'article',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'TechArticle',
      headline: 'Company Dossier MCP server — connect build_dossier to your AI agent',
      description: 'How to connect the live Company Dossier MCP server (Streamable HTTP, bearer auth) and call the build_dossier tool from ChatGPT, Claude or any MCP client to generate a sourced, nine-section company dossier.',
      url: SITE.origin + '/mcp/',
      author: { '@type': 'Organization', name: 'Company Dossier', url: SITE.origin },
      publisher: { '@type': 'Organization', name: 'Company Dossier', url: SITE.origin },
      about: { '@type': 'Thing', name: 'Model Context Protocol' },
    },
    {
      '@context': 'https://schema.org', '@type': 'WebAPI',
      name: 'Company Dossier MCP server',
      description: 'A Model Context Protocol server exposing the build_dossier tool, which builds a complete, sourced, nine-section company dossier (markdown + structured JSON) from public sources for a given company name or domain.',
      url: SITE.origin + '/mcp/',
      documentation: SITE.origin + '/mcp/',
      endpointUrl: ENDPOINT,
      provider: { '@type': 'Organization', name: 'Company Dossier', url: SITE.origin },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      potentialAction: {
        '@type': 'Action',
        name: 'build_dossier',
        description: 'Build a complete, sourced nine-section dossier for a company. Input: target (company name or domain) and optional sections (comma list of overview, people, hiring, money, locations, tech, news, relationships, risk).',
        target: ENDPOINT,
      },
    },
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication',
      name: 'company-dossier-mcp',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Node.js',
      url: SITE.origin + '/mcp/',
      downloadUrl: 'https://www.npmjs.com/package/company-dossier',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'An MCP server (stdio via company-dossier-mcp, HTTP via company-dossier-mcp-http) exposing the build_dossier tool that generates a sourced, nine-section company dossier from public sources. Run with npx company-dossier-mcp.',
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Get it', item: SITE.origin + '/get/' },
        { '@type': 'ListItem', position: 3, name: 'MCP server', item: SITE.origin + '/mcp/' },
      ],
    },
  ],
  body,
};
