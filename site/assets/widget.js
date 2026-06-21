/* ============================================================
   Company Dossier — in-browser generator (vanilla ES module)
   No external/CDN libraries (CSP blocks them).

   HOW IT WORKS
   - The hard part of a dossier (crawling the site, DNS, search, history)
     cannot be done from a browser (CORS). So this page calls the Company
     Dossier engine running on our server and streams back a REAL, sourced
     dossier — no API key required.
       POST https://api.companydossier.lol/generate  -> Server-Sent Events
   - Optional: "polish with Claude" sends the already-collected, sourced
     dossier to api.anthropic.com using YOUR key (grounded — no hallucinating).
   - Export (Markdown / ZIP / new GitHub repo) runs entirely in your browser.
   ============================================================ */

(function () {
  'use strict';

  var API = 'https://api.companydossier.lol/generate';

  var SECTIONS = [
    { slug: 'overview', name: 'Overview & identity' },
    { slug: 'people', name: 'People & org chart' },
    { slug: 'hiring', name: 'Hiring radar' },
    { slug: 'money', name: 'Money trail' },
    { slug: 'locations', name: 'Locations' },
    { slug: 'tech', name: 'Tech fingerprint' },
    { slug: 'news', name: 'News & timeline' },
    { slug: 'web', name: 'Relationship web' },
    { slug: 'risk', name: 'Risk flags' }
  ];

  // live phases mapped from the engine's progress messages
  var PHASES = [
    { key: 'website', label: 'Reading the website', re: /website/i },
    { key: 'dns', label: 'Mapping DNS & email', re: /dns/i },
    { key: 'wayback', label: 'Tracing history', re: /wayback/i },
    { key: 'search', label: 'Searching the open web', re: /search/i },
    { key: 'assemble', label: 'Compiling the file', re: /assembl/i }
  ];

  var STORE_KEY = 'cdw.anthropic.key';

  var form = document.getElementById('cdw-form');
  if (!form) return;

  var $company = document.getElementById('cdw-company');
  var $go = document.getElementById('cdw-go');
  var $clear = document.getElementById('cdw-clear');
  var $status = document.getElementById('cdw-status');
  var $results = document.getElementById('cdw-results');
  var $empty = document.getElementById('cdw-empty');
  var $export = document.getElementById('cdw-export');
  var $dlMd = document.getElementById('cdw-dl-md');
  var $dlZip = document.getElementById('cdw-dl-zip');
  var $gh = document.getElementById('cdw-gh');
  var $exportNote = document.getElementById('cdw-export-note');
  // optional AI polish
  var $key = document.getElementById('cdw-key');
  var $model = document.getElementById('cdw-model');
  var $enhance = document.getElementById('cdw-enhance');
  var $remember = document.getElementById('cdw-remember');
  var $forget = document.getElementById('cdw-forget');

  var state = { markdown: '', company: '', json: null, files: [], sections: [], sources: [], busy: false, polished: false };

  // ================= helpers =================
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function slugify(s) {
    return String(s).toLowerCase().trim().replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'company';
  }
  function setStatus(msg, kind) {
    if (!msg) { $status.hidden = true; $status.textContent = ''; return; }
    $status.hidden = false;
    $status.className = 'cdw-status' + (kind ? ' cdw-' + kind : '');
    $status.textContent = msg;
  }
  function setExportNote(html, isErr) {
    if (!$exportNote) return;
    if (!html) { $exportNote.hidden = true; $exportNote.innerHTML = ''; return; }
    $exportNote.hidden = false;
    $exportNote.className = 'cdw-export-note' + (isErr ? ' cdw-err' : '');
    $exportNote.innerHTML = html;
  }
  function utf8(str) { return new TextEncoder().encode(str); }

  // ================= markdown -> safe HTML (unchanged, battle-tested) =================
  function renderInline(text) {
    var out = escapeHtml(text);
    var codes = [];
    out = out.replace(/`([^`]+)`/g, function (_, c) { codes.push(c); return ' CODE' + (codes.length - 1) + ' '; });
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, label, url) {
      var safe = /^(https?:|mailto:)/i.test(url.replace(/&amp;/g, '&'));
      if (!safe) return label;
      return '<a href="' + url + '" target="_blank" rel="noopener nofollow">' + label + '</a>';
    });
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/__([^_]+)__/g, '<strong>$1</strong>');
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    out = out.replace(/(^|[\s(])_([^_]+)_(?=[\s).,!?]|$)/g, '$1<em>$2</em>');
    out = out.replace(/<strong>Gap:?<\/strong>/g, '<span class="cdw-gap">Gap</span>');
    out = out.replace(/&gt;\s*Source:/g, '<span class="cdw-src">Source:</span>');
    out = out.replace(/ CODE(\d+) /g, function (_, idx) { return '<code>' + escapeHtml(codes[+idx]) + '</code>'; });
    return out;
  }
  function renderMarkdown(md) {
    var lines = String(md).replace(/\r\n?/g, '\n').split('\n');
    var html = [], i = 0, listType = null, para = [];
    function flushPara() { if (para.length) { html.push('<p>' + renderInline(para.join(' ')) + '</p>'); para = []; } }
    function closeList() { if (listType) { html.push('</' + listType + '>'); listType = null; } }
    while (i < lines.length) {
      var line = lines[i];
      var fence = /^\s*```(.*)$/.exec(line);
      if (fence) { flushPara(); closeList(); var buf = []; i++; while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i++; } i++; html.push('<pre><code>' + escapeHtml(buf.join('\n')) + '</code></pre>'); continue; }
      if (/^\s*$/.test(line)) { flushPara(); closeList(); i++; continue; }
      if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { flushPara(); closeList(); html.push('<hr/>'); i++; continue; }
      if (/^\s*>\s?/.test(line)) { flushPara(); closeList(); html.push('<blockquote>' + renderInline(line.replace(/^\s*>\s?/, '')) + '</blockquote>'); i++; continue; }
      var h = /^(#{1,6})\s+(.*)$/.exec(line);
      if (h) { flushPara(); closeList(); var level = Math.min(h[1].length, 4); html.push('<h' + level + '>' + renderInline(h[2].trim()) + '</h' + level + '>'); i++; continue; }
      var ul = /^\s*[-*+]\s+(.*)$/.exec(line);
      if (ul) { flushPara(); if (listType !== 'ul') { closeList(); html.push('<ul>'); listType = 'ul'; } html.push('<li>' + renderInline(ul[1]) + '</li>'); i++; continue; }
      var ol = /^\s*\d+[.)]\s+(.*)$/.exec(line);
      if (ol) { flushPara(); if (listType !== 'ol') { closeList(); html.push('<ol>'); listType = 'ol'; } html.push('<li>' + renderInline(ol[1]) + '</li>'); i++; continue; }
      closeList(); para.push(line.trim()); i++;
    }
    flushPara(); closeList();
    return html.join('\n');
  }

  // ================= live loader =================
  function buildLoader(company) {
    var phaseHtml = PHASES.map(function (p, i) {
      return '<li class="cdw-ph" data-ph="' + p.key + '"><span class="cdw-ph-dot"></span><span class="cdw-ph-label">' + escapeHtml(p.label) + '</span><span class="cdw-ph-tick" aria-hidden="true">✓</span></li>';
    }).join('');
    return '<div class="cdw-loader" role="status" aria-live="polite">' +
      '<div class="cdw-scan"><div class="cdw-scanbar"></div>' +
        '<div class="cdw-loader-head"><span class="cdw-conf">compiling // case file</span>' +
        '<div class="cdw-file-title marker">' + escapeHtml(company) + '</div></div>' +
      '</div>' +
      '<div class="cdw-bar"><div class="cdw-bar-fill" id="cdw-bar-fill"></div></div>' +
      '<ul class="cdw-phases">' + phaseHtml + '</ul>' +
      '<p class="cdw-loader-msg" id="cdw-loader-msg">Opening the file…</p>' +
    '</div>';
  }
  function updateLoader(message) {
    var msgEl = document.getElementById('cdw-loader-msg');
    if (msgEl && message) msgEl.textContent = message;
    var idx = -1;
    for (var i = 0; i < PHASES.length; i++) { if (PHASES[i].re.test(message || '')) { idx = i; break; } }
    if (idx < 0) return;
    var fill = document.getElementById('cdw-bar-fill');
    if (fill) fill.style.width = Math.round(((idx + 1) / PHASES.length) * 100) + '%';
    var lis = document.querySelectorAll('.cdw-ph');
    for (var j = 0; j < lis.length; j++) {
      lis[j].classList.toggle('done', j < idx);
      lis[j].classList.toggle('active', j === idx);
    }
  }

  // ================= render the finished dossier =================
  function sectionsFromFiles(files) {
    var secs = files.filter(function (f) { return /(^|\/)\d+[_-].+\.md$/i.test(f.path); })
      .sort(function (a, b) { return a.path.localeCompare(b.path); });
    return secs.map(function (f, idx) {
      var name = (SECTIONS[idx] && SECTIONS[idx].name) || f.path.replace(/^.*?\d+[_-]/, '').replace(/\.md$/, '').replace(/[_-]/g, ' ');
      // drop a leading "# .." / "## n. .." title line so we don't double the heading
      var body = f.content.replace(/^#{1,3}\s*\d*\.?\s*[^\n]*\n/, '');
      return { name: name, slug: (SECTIONS[idx] && SECTIONS[idx].slug) || ('s' + idx), body: body };
    });
  }
  function sourcesStrip() {
    if (!state.sources.length) return '';
    var pills = state.sources.map(function (s) {
      var ok = s.status === 'ok';
      return '<span class="cdw-source ' + (ok ? 'ok' : 'miss') + '" title="' + escapeHtml(s.note || '') + '">' + escapeHtml(s.name) + '</span>';
    }).join('');
    return '<div class="cdw-sources"><span class="cdw-sources-label">Sources pulled:</span>' + pills + '</div>';
  }
  function renderDossier() {
    var headerHtml = '<div class="cdw-file-head"><div>' +
      '<div class="cdw-stamp-row"><span class="cdw-conf">' + (state.polished ? 'confidential // AI-polished' : 'confidential // case file') + '</span></div>' +
      '<div class="cdw-file-title marker">' + escapeHtml(state.company) + '</div>' +
      '<div class="cdw-file-meta">nine sections · public record · sourced' + (state.polished ? ' · polished by Claude' : '') + '</div>' +
      '</div>' + '</div>';
    var sectionsHtml = state.sections.map(function (s, idx) {
      var open = idx === 0 ? ' open' : '';
      return '<details class="cdw-section"' + open + '><summary><span class="cdw-n">' + (idx + 1) + '</span>' + escapeHtml(s.name) + '</summary>' +
        '<div class="cdw-section-body">' + (s.body.trim() ? renderMarkdown(s.body) : '<p><span class="cdw-gap">Gap</span> No public data found for this section.</p>') + '</div></details>';
    }).join('');
    var panel = document.createElement('div');
    panel.className = 'cdw-dossier reveal-now';
    panel.innerHTML = headerHtml + sourcesStrip() + sectionsHtml;
    $results.innerHTML = '';
    $results.appendChild(panel);
    if ($export) $export.hidden = false;
  }

  // ================= ZIP (STORE) writer — unchanged, byte-correct =================
  var CRC_TABLE = (function () { var t = new Uint32Array(256); for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; } return t; })();
  function crc32(b) { var c = 0xFFFFFFFF; for (var i = 0; i < b.length; i++) c = CRC_TABLE[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  function dosDateTime() { var d = new Date(); return { time: (((d.getHours() & 31) << 11) | ((d.getMinutes() & 63) << 5) | ((d.getSeconds() / 2) & 31)) & 0xFFFF, date: ((((d.getFullYear() - 1980) & 127) << 9) | (((d.getMonth() + 1) & 15) << 5) | (d.getDate() & 31)) & 0xFFFF }; }
  function makeZip(files) {
    var dt = dosDateTime(), chunks = [], central = [], offset = 0;
    function u16(v) { return [v & 255, (v >>> 8) & 255]; }
    function u32(v) { return [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255]; }
    files.forEach(function (f) {
      var nb = utf8(f.name), data = f.data, crc = crc32(data), size = data.length;
      var lfh = [].concat(u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(dt.time), u16(dt.date), u32(crc), u32(size), u32(size), u16(nb.length), u16(0));
      var lb = new Uint8Array(lfh.length + nb.length); lb.set(lfh, 0); lb.set(nb, lfh.length);
      chunks.push(lb); chunks.push(data);
      var cdh = [].concat(u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(dt.time), u16(dt.date), u32(crc), u32(size), u32(size), u16(nb.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset));
      var cb = new Uint8Array(cdh.length + nb.length); cb.set(cdh, 0); cb.set(nb, cdh.length); central.push(cb);
      offset += lb.length + data.length;
    });
    var cs = central.reduce(function (a, c) { return a + c.length; }, 0);
    var eocd = [].concat(u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(cs), u32(offset), u16(0));
    var all = chunks.concat(central, [new Uint8Array(eocd)]);
    var total = all.reduce(function (a, c) { return a + c.length; }, 0), buf = new Uint8Array(total), p = 0;
    all.forEach(function (c) { buf.set(c, p); p += c.length; });
    return buf;
  }
  function exportFiles() {
    if (state.files && state.files.length) return state.files.map(function (f) { return { name: f.path, text: f.content }; });
    return [{ name: slugify(state.company) + '.md', text: state.markdown }];
  }
  function downloadBlob(name, blob) {
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  // ================= GitHub export (unchanged) =================
  function b64(str) { var b = utf8(str), s = ''; for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s); }
  function ghHeaders(t) { return { 'Authorization': 'Bearer ' + t, 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' }; }
  function ghError(status, data, fb) {
    var msg = (data && data.message) ? data.message : (fb || ('GitHub request failed (' + status + ').'));
    if (status === 401) return 'GitHub auth failed (401): token invalid/expired. Needs "repo" (classic) or Contents read/write (fine-grained).';
    if (status === 422) return 'GitHub 422: ' + msg + ' (a repo with this name may already exist).';
    return msg + ' (' + status + ')';
  }
  function ghJson(url, opts) { return fetch(url, opts).then(function (res) { return res.text().then(function (t) { var d = null; try { d = JSON.parse(t); } catch (e) {} if (!res.ok) throw new Error(ghError(res.status, d)); return d; }); }, function () { throw new Error('Network error reaching api.github.com.'); }); }
  function createGithubRepo(token, repoName) {
    var owner; setExportNote('Creating repository on GitHub…', false);
    return ghJson('https://api.github.com/user', { headers: ghHeaders(token) }).then(function (user) {
      owner = user && user.login; if (!owner) throw new Error('Could not read your GitHub login from the token.');
      return ghJson('https://api.github.com/user/repos', { method: 'POST', headers: ghHeaders(token), body: JSON.stringify({ name: repoName, description: 'Company Dossier for ' + state.company + ' — public sources.', private: false, auto_init: true }) });
    }).then(function (repo) {
      var files = exportFiles(), chain = Promise.resolve();
      files.forEach(function (f) { chain = chain.then(function () { return ghJson('https://api.github.com/repos/' + owner + '/' + repoName + '/contents/' + encodeURIComponent(f.name), { method: 'PUT', headers: ghHeaders(token), body: JSON.stringify({ message: 'Add dossier', content: b64(f.text) }) }); }); });
      return chain.then(function () { return repo; });
    }).then(function (repo) { var url = repo && repo.html_url; setExportNote('Done. Repository created: <a href="' + escapeHtml(url) + '" target="_blank" rel="noopener">' + escapeHtml(url) + '</a>', false); });
  }
  function openGithubForm() {
    if (document.getElementById('cdw-gh-form')) { document.getElementById('cdw-gh-form').scrollIntoView({ block: 'nearest' }); return; }
    var wrap = document.createElement('div'); wrap.className = 'cdw-gh-form'; wrap.id = 'cdw-gh-form';
    wrap.innerHTML = '<div class="cdw-field"><label for="cdw-gh-token">GitHub token <a href="https://github.com/settings/tokens/new?scopes=repo&description=Company%20Dossier" target="_blank" rel="noopener" class="cdw-link">get one →</a></label>' +
      '<input id="cdw-gh-token" type="password" autocomplete="off" spellcheck="false" placeholder="ghp_… (sent only to api.github.com)" /></div>' +
      '<div class="cdw-field"><label for="cdw-gh-name">Repository name</label><input id="cdw-gh-name" type="text" spellcheck="false" value="' + escapeHtml(slugify(state.company) + '-dossier') + '" /></div>' +
      '<div class="cdw-actions"><button type="button" class="btn solid" id="cdw-gh-create">Create repo &amp; push</button><button type="button" class="btn" id="cdw-gh-cancel">Cancel</button></div>';
    $export.appendChild(wrap);
    document.getElementById('cdw-gh-cancel').addEventListener('click', function () { wrap.parentNode.removeChild(wrap); });
    document.getElementById('cdw-gh-create').addEventListener('click', function () {
      var token = document.getElementById('cdw-gh-token').value.trim(), name = document.getElementById('cdw-gh-name').value.trim();
      if (!token) { setExportNote('Enter a GitHub token first.', true); return; }
      if (!name) { setExportNote('Enter a repository name.', true); return; }
      var btn = document.getElementById('cdw-gh-create'); btn.disabled = true;
      createGithubRepo(token, name).catch(function (err) { setExportNote(escapeHtml(err.message || String(err)), true); }).then(function () { btn.disabled = false; });
    });
  }

  // ================= optional: polish with Claude (grounded) =================
  function anthropicError(status, data) {
    var d = (data && data.error && data.error.message) ? ' — ' + data.error.message : '';
    if (status === 401) return 'Anthropic auth failed (401): the API key looks invalid or revoked.' + d;
    if (status === 429) return 'Anthropic rate limited (429): wait a moment and retry.' + d;
    if (status >= 500) return 'Anthropic server error (' + status + '). Try again shortly.' + d;
    return 'Anthropic request failed (' + status + ').' + d;
  }
  function callAnthropic(key, model, prompt) {
    return fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: model, max_tokens: 8000, messages: [{ role: 'user', content: prompt }] })
    }).then(function (res) { return res.text().then(function (t) { var d = null; try { d = JSON.parse(t); } catch (e) {} if (!res.ok) throw new Error(anthropicError(res.status, d)); if (!d || !d.content || !d.content[0] || typeof d.content[0].text !== 'string') throw new Error('Unexpected response from Anthropic.'); return d.content[0].text; }); }, function () { throw new Error('Network error reaching api.anthropic.com.'); });
  }
  function enhancePrompt(md) {
    return 'Below is a company dossier compiled from PUBLIC sources, with citations. Rewrite it to be sharper and more readable WITHOUT inventing anything: keep every cited fact and its source, keep the nine "## n. Name" section headings exactly, add a one-paragraph executive summary at the top under a "# <Company> — Company Dossier" title, and mark unknowns as "**Gap:** ...". Do not add facts that are not in the text.\n\n----\n\n' + md;
  }
  function splitEnhanced(md) {
    var lines = md.split('\n'), out = SECTIONS.map(function (s) { return { name: s.name, slug: s.slug, body: '' }; }), cur = -1;
    for (var li = 0; li < lines.length; li++) {
      var m = /^#{1,3}\s*(\d+)\s*[.)—-]?\s*/.exec(lines[li]);
      if (m) { var n = parseInt(m[1], 10); if (n >= 1 && n <= 9) { cur = n - 1; continue; } }
      if (cur >= 0) out[cur].body += lines[li] + '\n';
    }
    return out;
  }

  // ================= storage for optional key =================
  function loadStoredKey() { try { var v = sessionStorage.getItem(STORE_KEY) || localStorage.getItem(STORE_KEY); if (v && $key) { $key.value = v; if (localStorage.getItem(STORE_KEY) && $remember) $remember.checked = true; if ($forget) $forget.hidden = false; } } catch (e) {} }
  function persistKey() { if (!$key) return; try { var k = $key.value.trim(); if ($remember && $remember.checked) { if (k) localStorage.setItem(STORE_KEY, k); sessionStorage.removeItem(STORE_KEY); } else { if (k) sessionStorage.setItem(STORE_KEY, k); localStorage.removeItem(STORE_KEY); } } catch (e) {} }
  function forgetKey() { try { localStorage.removeItem(STORE_KEY); sessionStorage.removeItem(STORE_KEY); } catch (e) {} if ($key) $key.value = ''; if ($remember) $remember.checked = false; if ($forget) $forget.hidden = true; }

  // ================= SSE stream =================
  function streamGenerate(target, cb) {
    return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' }, body: JSON.stringify({ target: target }) })
      .then(function (res) {
        if (!res.ok) { return res.text().then(function (t) { var j = null; try { j = JSON.parse(t); } catch (e) {} cb.error((j && j.error) || ('Server error ' + res.status + '.')); }); }
        if (!res.body || !res.body.getReader) { return res.text().then(function (t) { parseBlocks(t, cb); }); }
        var reader = res.body.getReader(), dec = new TextDecoder(), buf = '';
        function pump() {
          return reader.read().then(function (r) {
            if (r.done) return;
            buf += dec.decode(r.value, { stream: true });
            var parts = buf.split('\n\n'); buf = parts.pop();
            parts.forEach(function (b) { parseBlocks(b, cb); });
            return pump();
          });
        }
        return pump();
      }, function () { cb.error('Could not reach the generator. Check your connection and try again.'); });
  }
  function parseBlocks(block, cb) {
    var ev = 'message', data = '';
    block.split('\n').forEach(function (l) { if (l.indexOf('event:') === 0) ev = l.slice(6).trim(); else if (l.indexOf('data:') === 0) data += l.slice(5).trim(); });
    if (!data) return;
    var p; try { p = JSON.parse(data); } catch (e) { return; }
    if (ev === 'progress') cb.progress(p); else if (ev === 'result') cb.result(p); else if (ev === 'error') cb.error(p.message || 'Generation failed.');
  }

  // ================= main flow =================
  function generate(e) {
    e.preventDefault();
    if (state.busy) return;
    var company = $company.value.trim();
    if (!company) { setStatus('Enter a company name or domain first.', 'err'); $company.focus(); return; }

    state.busy = true; state.polished = false;
    $go.disabled = true; $go.classList.add('loading');
    if ($clear) $clear.hidden = false;
    if ($export) $export.hidden = true;
    setExportNote('');
    setStatus('Working on ' + company + '… public sources are being pulled live.', 'busy');
    $results.innerHTML = buildLoader(company);
    $results.scrollIntoView({ behavior: 'smooth', block: 'start' });

    var got = false;
    streamGenerate(company, {
      progress: function (p) { updateLoader(p.message || ''); },
      result: function (data) {
        got = true;
        state.company = (data.meta && data.meta.companyName) || company;
        state.markdown = data.markdown || '';
        state.json = data.json || null;
        state.files = data.files || [];
        state.sources = (data.meta && data.meta.sources) || [];
        state.sections = sectionsFromFiles(state.files);
        var fill = document.getElementById('cdw-bar-fill'); if (fill) fill.style.width = '100%';
        setTimeout(renderDossier, 220);
        var okCount = state.sources.filter(function (s) { return s.status === 'ok'; }).length;
        setStatus('Done — ' + state.sections.length + ' sections for "' + state.company + '" from ' + okCount + ' live sources.', 'ok');
        if ($enhance) document.getElementById('cdw-polish-wrap').hidden = false;
      },
      error: function (msg) { if (!got) { $results.innerHTML = ''; if ($empty) $results.appendChild($empty); } setStatus(msg, 'err'); }
    }).then(function () { state.busy = false; $go.disabled = false; $go.classList.remove('loading'); });
  }
  form.addEventListener('submit', generate);

  // input glow
  $company.addEventListener('input', function () { $company.classList.toggle('cdw-filled', !!$company.value.trim()); });

  if ($clear) $clear.addEventListener('click', function () {
    state = { markdown: '', company: '', json: null, files: [], sections: [], sources: [], busy: false, polished: false };
    if ($export) $export.hidden = true; setExportNote(''); setStatus('', null); $clear.hidden = true;
    var pw = document.getElementById('cdw-polish-wrap'); if (pw) pw.hidden = true;
    $results.innerHTML = ''; if ($empty) $results.appendChild($empty);
  });

  // exports
  if ($dlMd) $dlMd.addEventListener('click', function () { if (!state.markdown) return; downloadBlob(slugify(state.company) + '-dossier.md', new Blob([state.markdown], { type: 'text/markdown;charset=utf-8' })); });
  if ($dlZip) $dlZip.addEventListener('click', function () { if (!state.files.length && !state.markdown) return; try { var files = exportFiles().map(function (f) { return { name: f.name, data: utf8(f.text) }; }); downloadBlob(slugify(state.company) + '-dossier.zip', new Blob([makeZip(files)], { type: 'application/zip' })); setExportNote('Downloaded a .zip — one file per section plus README.', false); } catch (e) { setExportNote('Could not build the zip: ' + escapeHtml(e.message || String(e)), true); } });
  if ($gh) $gh.addEventListener('click', openGithubForm);

  // optional polish
  if ($enhance) {
    $enhance.addEventListener('click', function () {
      if (!state.markdown) { setExportNote('Generate a dossier first, then polish it.', true); return; }
      var key = $key ? $key.value.trim() : ''; var model = $model ? $model.value : 'claude-sonnet-4-6';
      if (!key) { setExportNote('Paste an Anthropic API key to polish (sent only to api.anthropic.com).', true); if ($key) $key.focus(); return; }
      persistKey(); $enhance.disabled = true; setExportNote('Polishing with ' + model + '… (your dossier data, your key, straight to Anthropic).', false);
      callAnthropic(key, model, enhancePrompt(state.markdown)).then(function (text) {
        state.markdown = text; state.polished = true; state.sections = splitEnhanced(text); renderDossier();
        setExportNote('Polished. Downloads now use the AI-tightened version.', false);
      }).catch(function (err) { setExportNote(escapeHtml(err.message || String(err)), true); }).then(function () { $enhance.disabled = false; });
    });
    if ($forget) $forget.addEventListener('click', forgetKey);
    loadStoredKey();
  }
})();
