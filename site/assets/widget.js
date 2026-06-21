/* ============================================================
   Company Dossier — in-browser generator (vanilla ES module)
   Fully client-side. No external/CDN libraries (CSP blocks them).

   SECURITY MODEL
   - The Anthropic API key is only ever sent to https://api.anthropic.com.
   - A GitHub token is only ever sent to https://api.github.com.
   - Nothing is ever sent to any first-party server (there is none —
     this is a static page). No analytics, no logging of keys.
   - By default the key lives only in memory + sessionStorage (cleared
     when the tab closes). localStorage is used ONLY if the user opts in,
     with a visible warning, and can be wiped via "Forget saved key".
   ============================================================ */

(function () {
  'use strict';

  var SECTIONS = [
    { slug: 'overview', name: 'Overview & identity', file: '1_overview.md' },
    { slug: 'people', name: 'People & org chart', file: '2_people.md' },
    { slug: 'hiring', name: 'Hiring radar', file: '3_hiring.md' },
    { slug: 'money', name: 'Money trail', file: '4_money.md' },
    { slug: 'locations', name: 'Locations', file: '5_locations.md' },
    { slug: 'tech', name: 'Tech fingerprint', file: '6_tech.md' },
    { slug: 'news', name: 'News & timeline', file: '7_news.md' },
    { slug: 'web', name: 'Relationship web', file: '8_web.md' },
    { slug: 'risk', name: 'Risk flags', file: '9_risk.md' }
  ];

  var STORE_KEY = 'cdw.anthropic.key';

  // ---- DOM ----
  var form = document.getElementById('cdw-form');
  if (!form) return; // not the generate page

  var $company = document.getElementById('cdw-company');
  var $key = document.getElementById('cdw-key');
  var $model = document.getElementById('cdw-model');
  var $remember = document.getElementById('cdw-remember');
  var $rememberWarn = document.getElementById('cdw-remember-warn');
  var $forget = document.getElementById('cdw-forget');
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

  // ---- in-memory state (never persisted except key, opt-in) ----
  var state = {
    markdown: '',     // raw markdown of the latest dossier
    company: '',      // subject name as entered
    sections: [],     // [{name, slug, file, body}]
    busy: false
  };

  // ================= helpers =================
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function slugify(s) {
    return String(s).toLowerCase().trim()
      .replace(/^https?:\/\//, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'company';
  }

  function setStatus(msg, kind) {
    if (!msg) { $status.hidden = true; $status.textContent = ''; return; }
    $status.hidden = false;
    $status.className = 'cdw-status' + (kind ? ' cdw-' + kind : '');
    if (kind === 'busy') {
      $status.innerHTML = '<span class="cdw-spin" aria-hidden="true"></span>' + escapeHtml(msg);
    } else {
      $status.textContent = msg;
    }
  }

  function setExportNote(html, isErr) {
    if (!html) { $exportNote.hidden = true; $exportNote.innerHTML = ''; return; }
    $exportNote.hidden = false;
    $exportNote.className = 'cdw-export-note' + (isErr ? ' cdw-err' : '');
    $exportNote.innerHTML = html;
  }

  // ================= storage (opt-in) =================
  function loadStoredKey() {
    try {
      var v = sessionStorage.getItem(STORE_KEY);
      if (v) { $key.value = v; return; }
      v = localStorage.getItem(STORE_KEY);
      if (v) {
        $key.value = v;
        $remember.checked = true;
        $rememberWarn.hidden = false;
        $forget.hidden = false;
      }
    } catch (e) { /* storage unavailable — fine, memory only */ }
  }

  function persistKey() {
    var k = $key.value.trim();
    try {
      if ($remember.checked) {
        // user opted in: persist across sessions (with the visible warning)
        if (k) localStorage.setItem(STORE_KEY, k);
        sessionStorage.removeItem(STORE_KEY);
      } else {
        // default: session only, gone when the tab closes
        if (k) sessionStorage.setItem(STORE_KEY, k);
        localStorage.removeItem(STORE_KEY);
      }
    } catch (e) { /* ignore */ }
  }

  function forgetKey() {
    try {
      localStorage.removeItem(STORE_KEY);
      sessionStorage.removeItem(STORE_KEY);
    } catch (e) { /* ignore */ }
    $key.value = '';
    $remember.checked = false;
    $rememberWarn.hidden = true;
    $forget.hidden = true;
  }

  $remember.addEventListener('change', function () {
    $rememberWarn.hidden = !$remember.checked;
    $forget.hidden = !($remember.checked || $key.value);
    persistKey();
  });
  $key.addEventListener('input', function () {
    $forget.hidden = !($remember.checked || $key.value);
  });
  $forget.addEventListener('click', forgetKey);

  // ================= prompt =================
  function buildPrompt(subject) {
    var list = SECTIONS.map(function (s, i) {
      return (i + 1) + '. ' + s.name;
    }).join('\n');
    return [
      'You are a meticulous OSINT analyst. Produce a COMPLETE, sourced company dossier on the subject below, written in GitHub-Flavored Markdown.',
      '',
      'SUBJECT: ' + subject,
      '',
      'Use PUBLIC SOURCES ONLY (company site, job boards, public filings, news/press, maps, reviews, the open web). No private data, no login bypass, no speculation presented as fact.',
      '',
      'Output EXACTLY these nine sections, in this order. Start each section with a heading of the form "## <n>. <name>" (e.g. "## 1. Overview & identity"):',
      '',
      list,
      '',
      'RULES:',
      '- Attribute every factual claim inline, e.g. "(source: example.com/about)" or a Markdown link.',
      '- Where information is unknown or unavailable from public sources, write "**Gap:** <what is missing>" rather than guessing.',
      '- Be concrete and specific; prefer dated facts. Use bullet lists and short paragraphs.',
      '- For "News & timeline", present a dated, chronological timeline.',
      '- Begin the response with a single top-level title line "# <Company> — Company Dossier", then the nine "## " sections.',
      '- Do not wrap the whole response in a code fence. Output Markdown directly.'
    ].join('\n');
  }

  // ================= Anthropic call =================
  function callAnthropic(key, model, prompt) {
    return fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 8000,
        messages: [{ role: 'user', content: prompt }]
      })
    }).then(function (res) {
      return res.text().then(function (text) {
        var data = null;
        try { data = JSON.parse(text); } catch (e) { /* leave null */ }
        if (!res.ok) {
          throw new Error(anthropicError(res.status, data));
        }
        if (!data || !data.content || !data.content[0] || typeof data.content[0].text !== 'string') {
          throw new Error('Unexpected response from Anthropic (no text content returned).');
        }
        return data.content[0].text;
      });
    }, function () {
      // network/CORS-level failure
      throw new Error('Network error reaching api.anthropic.com. Check your connection and that the key is valid.');
    });
  }

  function anthropicError(status, data) {
    var detail = (data && data.error && data.error.message) ? ' — ' + data.error.message : '';
    if (status === 401) return 'Authentication failed (401): the Anthropic API key looks invalid or revoked.' + detail;
    if (status === 403) return 'Forbidden (403): this key is not permitted to use this model.' + detail;
    if (status === 404) return 'Not found (404): the selected model may be unavailable to this account.' + detail;
    if (status === 429) return 'Rate limited (429): too many requests or quota exceeded. Wait a moment and try again.' + detail;
    if (status === 400) return 'Bad request (400): Anthropic rejected the request.' + detail;
    if (status === 529) return 'Anthropic is overloaded (529). Try again shortly.' + detail;
    if (status >= 500) return 'Anthropic server error (' + status + '). Try again shortly.' + detail;
    return 'Request failed (' + status + ').' + detail;
  }

  // ================= split markdown into the nine sections =================
  function splitSections(md) {
    // Each section starts at a heading "## <n>. ..." (allow 1-3 #).
    var lines = md.split('\n');
    var out = [];
    for (var i = 0; i < SECTIONS.length; i++) {
      out.push({ name: SECTIONS[i].name, slug: SECTIONS[i].slug, file: SECTIONS[i].file, body: '' });
    }
    var cur = -1; // -1 = preamble (title), 0..8 = sections
    var preamble = [];
    for (var li = 0; li < lines.length; li++) {
      var line = lines[li];
      var m = /^#{1,3}\s*(\d+)\s*[.)—-]?\s*/.exec(line);
      if (m) {
        var n = parseInt(m[1], 10);
        if (n >= 1 && n <= SECTIONS.length) {
          cur = n - 1;
          // keep the heading text but normalize to "## n. Name"
          out[cur].body = '## ' + n + '. ' + SECTIONS[cur].name + '\n';
          continue;
        }
      }
      if (cur === -1) { preamble.push(line); }
      else { out[cur].body += line + '\n'; }
    }
    // trim
    for (var k = 0; k < out.length; k++) out[k].body = out[k].body.trim() + '\n';
    return out;
  }

  // ================= minimal Markdown -> HTML (safe) =================
  // Supports: headings, bold/italic, inline code, links, fenced + indented
  // code blocks, unordered/ordered lists, hr, paragraphs. Escapes all HTML.
  function renderInline(text) {
    // text is RAW markdown for one line/segment. Escape first, then apply
    // formatting on the escaped string using markers that can't appear in
    // escaped HTML for the delimiter chars we use.
    var out = escapeHtml(text);

    // inline code `...`  (do first so its contents aren't further formatted)
    var codes = [];
    out = out.replace(/`([^`]+)`/g, function (_, c) {
      codes.push(c);
      return ' CODE' + (codes.length - 1) + ' ';
    });

    // links [label](url) — url already escaped; only allow http(s)/mailto
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, label, url) {
      var safe = /^(https?:|mailto:)/i.test(url) || /^(https?:|mailto:)/i.test(url.replace(/&amp;/g, '&'));
      // url is already HTML-escaped; restore & for the href but keep it safe
      var href = url;
      if (!safe) return label; // drop unsafe/relative-scheme links, keep text
      return '<a href="' + href + '" target="_blank" rel="noopener nofollow">' + label + '</a>';
    });

    // bold **...** / __...__
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    // italic *...* / _..._
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    out = out.replace(/(^|[\s(])_([^_]+)_(?=[\s).,!?]|$)/g, '$1<em>$2</em>');

    // "**Gap:** ..." style — also catch a bare "Gap:" badge
    out = out.replace(/<strong>Gap:?<\/strong>/g, '<span class="cdw-gap">Gap</span>');

    // restore inline code
    out = out.replace(/ CODE(\d+) /g, function (_, idx) {
      return '<code>' + escapeHtml(codes[+idx]) + '</code>';
    });
    return out;
  }

  function renderMarkdown(md) {
    var lines = md.replace(/\r\n?/g, '\n').split('\n');
    var html = [];
    var i = 0;
    var listType = null; // 'ul' | 'ol' | null
    var para = [];

    function flushPara() {
      if (para.length) {
        html.push('<p>' + renderInline(para.join(' ')) + '</p>');
        para = [];
      }
    }
    function closeList() {
      if (listType) { html.push('</' + listType + '>'); listType = null; }
    }

    while (i < lines.length) {
      var line = lines[i];

      // fenced code block
      var fence = /^\s*```(.*)$/.exec(line);
      if (fence) {
        flushPara(); closeList();
        var buf = [];
        i++;
        while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++; // skip closing fence
        html.push('<pre><code>' + escapeHtml(buf.join('\n')) + '</code></pre>');
        continue;
      }

      // blank line
      if (/^\s*$/.test(line)) { flushPara(); closeList(); i++; continue; }

      // horizontal rule
      if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
        flushPara(); closeList(); html.push('<hr/>'); i++; continue;
      }

      // heading
      var h = /^(#{1,6})\s+(.*)$/.exec(line);
      if (h) {
        flushPara(); closeList();
        var level = Math.min(h[1].length, 4); // cap at h4 for the panel
        html.push('<h' + level + '>' + renderInline(h[2].trim()) + '</h' + level + '>');
        i++; continue;
      }

      // unordered list item
      var ul = /^\s*[-*+]\s+(.*)$/.exec(line);
      if (ul) {
        flushPara();
        if (listType !== 'ul') { closeList(); html.push('<ul>'); listType = 'ul'; }
        html.push('<li>' + renderInline(ul[1]) + '</li>');
        i++; continue;
      }

      // ordered list item
      var ol = /^\s*\d+[.)]\s+(.*)$/.exec(line);
      if (ol) {
        flushPara();
        if (listType !== 'ol') { closeList(); html.push('<ol>'); listType = 'ol'; }
        html.push('<li>' + renderInline(ol[1]) + '</li>');
        i++; continue;
      }

      // paragraph text
      closeList();
      para.push(line.trim());
      i++;
    }
    flushPara(); closeList();
    return html.join('\n');
  }

  // ================= render the dossier panel =================
  function renderDossier() {
    var headerHtml =
      '<div class="cdw-file-head">' +
        '<div>' +
          '<div class="cdw-stamp-row"><span class="cdw-conf">confidential // case file</span></div>' +
          '<div class="cdw-file-title marker">' + escapeHtml(state.company) + '</div>' +
          '<div class="cdw-file-meta">nine sections · public record · sourced · drafted by Claude</div>' +
        '</div>' +
      '</div>';

    var sectionsHtml = state.sections.map(function (s, idx) {
      // strip the leading "## n. Name" heading from the body so it isn't doubled
      var body = s.body.replace(/^##\s*\d+\.\s*[^\n]*\n/, '');
      var open = idx === 0 ? ' open' : '';
      return '<details class="cdw-section"' + open + '>' +
        '<summary><span class="cdw-n">' + (idx + 1) + '</span>' + escapeHtml(s.name) + '</summary>' +
        '<div class="cdw-section-body">' + (body.trim() ? renderMarkdown(body) : '<p><span class="cdw-gap">Gap</span> No content returned for this section.</p>') + '</div>' +
      '</details>';
    }).join('');

    var panel = document.createElement('div');
    panel.className = 'cdw-dossier';
    panel.innerHTML = headerHtml + sectionsHtml;

    $results.innerHTML = '';
    $results.appendChild(panel);
    $export.hidden = false;
  }

  // ================= CRC32 + STORE-only ZIP writer =================
  // Builds a byte-correct .zip with STORE (no compression): local file
  // headers + central directory + end-of-central-directory.
  var CRC_TABLE = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      t[n] = c >>> 0;
    }
    return t;
  })();

  function crc32(bytes) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) {
      c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    }
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function utf8(str) { return new TextEncoder().encode(str); }

  // DOS time/date for a fixed timestamp (stable, valid).
  function dosDateTime() {
    var d = new Date();
    var time = ((d.getHours() & 0x1F) << 11) | ((d.getMinutes() & 0x3F) << 5) | ((Math.floor(d.getSeconds() / 2)) & 0x1F);
    var date = (((d.getFullYear() - 1980) & 0x7F) << 9) | (((d.getMonth() + 1) & 0x0F) << 5) | (d.getDate() & 0x1F);
    return { time: time & 0xFFFF, date: date & 0xFFFF };
  }

  function makeZip(files) {
    // files: [{name, data: Uint8Array}]
    var dt = dosDateTime();
    var chunks = [];      // body chunks (local headers + data)
    var central = [];     // central directory chunks
    var offset = 0;

    function u16(v) { return [v & 0xFF, (v >>> 8) & 0xFF]; }
    function u32(v) { return [v & 0xFF, (v >>> 8) & 0xFF, (v >>> 16) & 0xFF, (v >>> 24) & 0xFF]; }

    files.forEach(function (f) {
      var nameBytes = utf8(f.name);
      var data = f.data;
      var crc = crc32(data);
      var size = data.length;

      // ---- local file header (sig 0x04034b50) ----
      var lfh = [].concat(
        u32(0x04034b50),
        u16(20),          // version needed
        u16(0x0800),      // general purpose flag: bit 11 = UTF-8 filename
        u16(0),           // compression: 0 = store
        u16(dt.time),
        u16(dt.date),
        u32(crc),
        u32(size),        // compressed size (== size for store)
        u32(size),        // uncompressed size
        u16(nameBytes.length),
        u16(0)            // extra length
      );
      var lfhBytes = new Uint8Array(lfh.length + nameBytes.length);
      lfhBytes.set(lfh, 0);
      lfhBytes.set(nameBytes, lfh.length);

      chunks.push(lfhBytes);
      chunks.push(data);

      // ---- central directory header (sig 0x02014b50) ----
      var cdh = [].concat(
        u32(0x02014b50),
        u16(20),          // version made by
        u16(20),          // version needed
        u16(0x0800),      // flags (UTF-8)
        u16(0),           // compression store
        u16(dt.time),
        u16(dt.date),
        u32(crc),
        u32(size),
        u32(size),
        u16(nameBytes.length),
        u16(0),           // extra
        u16(0),           // comment
        u16(0),           // disk number start
        u16(0),           // internal attrs
        u32(0),           // external attrs
        u32(offset)       // local header offset
      );
      var cdhBytes = new Uint8Array(cdh.length + nameBytes.length);
      cdhBytes.set(cdh, 0);
      cdhBytes.set(nameBytes, cdh.length);
      central.push(cdhBytes);

      offset += lfhBytes.length + data.length;
    });

    var centralSize = central.reduce(function (a, c) { return a + c.length; }, 0);
    var centralOffset = offset;

    // ---- end of central directory (sig 0x06054b50) ----
    var eocd = [].concat(
      u32(0x06054b50),
      u16(0),                 // disk number
      u16(0),                 // disk with central dir
      u16(files.length),      // entries on this disk
      u16(files.length),      // total entries
      u32(centralSize),
      u32(centralOffset),
      u16(0)                  // comment length
    );

    var all = chunks.concat(central, [new Uint8Array(eocd)]);
    var total = all.reduce(function (a, c) { return a + c.length; }, 0);
    var buf = new Uint8Array(total);
    var p = 0;
    all.forEach(function (c) { buf.set(c, p); p += c.length; });
    return buf;
  }

  // ================= export files (README + per section) =================
  function exportFiles() {
    var slug = slugify(state.company);
    var readme = '# ' + state.company + ' — Company Dossier\n\n' +
      'A complete, sourced dossier compiled from public sources, generated in the browser with Company Dossier (companydossier.lol/generate/).\n\n' +
      '_Public information only. A dossier is a starting map — always verify before you act._\n\n' +
      '## Sections\n\n' +
      SECTIONS.map(function (s, i) { return (i + 1) + '. [' + s.name + '](' + s.file + ')'; }).join('\n') +
      '\n';
    var files = [{ name: 'README.md', text: readme }];
    state.sections.forEach(function (s) {
      files.push({ name: s.file, text: s.body });
    });
    return files;
  }

  function downloadBlob(name, blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  // ================= GitHub flow =================
  function b64(str) {
    var bytes = utf8(str);
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function ghHeaders(token) {
    return {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    };
  }

  function ghError(status, data, fallback) {
    var msg = (data && data.message) ? data.message : (fallback || ('GitHub request failed (' + status + ').'));
    if (status === 401) return 'GitHub auth failed (401): the token is invalid or expired. It needs the "repo" scope (classic) or Contents read/write (fine-grained).';
    if (status === 403) return 'GitHub forbidden (403): ' + msg;
    if (status === 422) return 'GitHub could not create that (422): ' + msg + ' (a repo with this name may already exist).';
    return msg + ' (' + status + ')';
  }

  function ghJson(url, opts) {
    return fetch(url, opts).then(function (res) {
      return res.text().then(function (t) {
        var data = null; try { data = JSON.parse(t); } catch (e) {}
        if (!res.ok) throw new Error(ghError(res.status, data));
        return data;
      });
    }, function () { throw new Error('Network error reaching api.github.com.'); });
  }

  function createGithubRepo(token, repoName) {
    var owner;
    setExportNote('Creating repository on GitHub…', false);
    return ghJson('https://api.github.com/user', { headers: ghHeaders(token) })
      .then(function (user) {
        owner = user && user.login;
        if (!owner) throw new Error('Could not read your GitHub login from the token.');
        return ghJson('https://api.github.com/user/repos', {
          method: 'POST',
          headers: ghHeaders(token),
          body: JSON.stringify({
            name: repoName,
            description: 'Company Dossier for ' + state.company + ' — public sources, generated in the browser.',
            private: false,
            auto_init: true
          })
        });
      })
      .then(function (repo) {
        var files = exportFiles();
        // PUT contents sequentially to avoid racing the default-branch ref.
        var chain = Promise.resolve();
        files.forEach(function (f) {
          chain = chain.then(function () {
            return ghJson('https://api.github.com/repos/' + owner + '/' + repoName + '/contents/' + encodeURIComponent(f.name), {
              method: 'PUT',
              headers: ghHeaders(token),
              body: JSON.stringify({
                message: 'Add dossier',
                content: b64(f.text)
              })
            });
          });
        });
        return chain.then(function () { return repo; });
      })
      .then(function (repo) {
        var url = repo && repo.html_url;
        setExportNote('Done. Repository created: <a href="' + escapeHtml(url) + '" target="_blank" rel="noopener">' + escapeHtml(url) + '</a>', false);
      });
  }

  function openGithubForm() {
    if (document.getElementById('cdw-gh-form')) {
      document.getElementById('cdw-gh-form').scrollIntoView({ block: 'nearest' });
      return;
    }
    var wrap = document.createElement('div');
    wrap.className = 'cdw-gh-form';
    wrap.id = 'cdw-gh-form';
    wrap.innerHTML =
      '<div class="cdw-field"><label for="cdw-gh-token">GitHub token</label>' +
      '<input id="cdw-gh-token" type="password" autocomplete="off" spellcheck="false" placeholder="ghp_… (sent only to api.github.com)" /></div>' +
      '<div class="cdw-field"><label for="cdw-gh-name">Repository name</label>' +
      '<input id="cdw-gh-name" type="text" spellcheck="false" value="' + escapeHtml(slugify(state.company) + '-dossier') + '" /></div>' +
      '<div class="cdw-actions">' +
      '<button type="button" class="btn solid" id="cdw-gh-create">Create repo &amp; push</button>' +
      '<button type="button" class="btn" id="cdw-gh-cancel">Cancel</button>' +
      '</div>';
    $export.appendChild(wrap);

    document.getElementById('cdw-gh-cancel').addEventListener('click', function () {
      wrap.parentNode.removeChild(wrap);
    });
    document.getElementById('cdw-gh-create').addEventListener('click', function () {
      var token = document.getElementById('cdw-gh-token').value.trim();
      var name = document.getElementById('cdw-gh-name').value.trim();
      if (!token) { setExportNote('Enter a GitHub token first.', true); return; }
      if (!name) { setExportNote('Enter a repository name.', true); return; }
      var btn = document.getElementById('cdw-gh-create');
      btn.disabled = true;
      createGithubRepo(token, name)
        .catch(function (err) { setExportNote(escapeHtml(err.message || String(err)), true); })
        .then(function () { btn.disabled = false; });
    });
  }

  // ================= wire export buttons =================
  $dlMd.addEventListener('click', function () {
    if (!state.markdown) return;
    var name = slugify(state.company) + '-dossier.md';
    downloadBlob(name, new Blob([state.markdown], { type: 'text/markdown;charset=utf-8' }));
  });

  $dlZip.addEventListener('click', function () {
    if (!state.sections.length) return;
    try {
      var files = exportFiles().map(function (f) { return { name: f.name, data: utf8(f.text) }; });
      var zip = makeZip(files);
      downloadBlob(slugify(state.company) + '-dossier.zip', new Blob([zip], { type: 'application/zip' }));
      setExportNote('Downloaded a .zip with README.md + one file per section.', false);
    } catch (e) {
      setExportNote('Could not build the zip: ' + escapeHtml(e.message || String(e)), true);
    }
  });

  $gh.addEventListener('click', openGithubForm);

  // ================= main generate flow =================
  function generate(e) {
    e.preventDefault();
    if (state.busy) return;

    var company = $company.value.trim();
    var key = $key.value.trim();
    var model = $model.value;

    if (!company) { setStatus('Enter a company name or domain first.', 'err'); $company.focus(); return; }
    if (!key) { setStatus('Paste an Anthropic API key (sent only to api.anthropic.com).', 'err'); $key.focus(); return; }

    persistKey();

    state.busy = true;
    $go.disabled = true;
    $clear.hidden = false;
    $export.hidden = true;
    setExportNote('');
    setStatus('Compiling the dossier with ' + model + '… this can take 20–60 seconds.', 'busy');

    callAnthropic(key, model, buildPrompt(company))
      .then(function (text) {
        state.markdown = text;
        state.company = company;
        state.sections = splitSections(text);
        renderDossier();
        setStatus('Done. ' + state.sections.length + ' sections compiled for "' + company + '".', null);
        $results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(function (err) {
        setStatus(err && err.message ? err.message : 'Something went wrong.', 'err');
      })
      .then(function () {
        state.busy = false;
        $go.disabled = false;
      });
  }

  form.addEventListener('submit', generate);

  $clear.addEventListener('click', function () {
    state.markdown = ''; state.company = ''; state.sections = [];
    $export.hidden = true;
    setExportNote('');
    setStatus('', null);
    $clear.hidden = true;
    // restore the empty outline
    $results.innerHTML = '';
    if ($empty) $results.appendChild($empty);
  });

  // init
  loadStoredKey();
})();
