(function () {
  // Clickjacking mitigation (GitHub Pages can't send frame-ancestors/X-Frame-Options).
  try { if (window.top !== window.self) { window.top.location = window.self.location.href; } } catch (e) { /* framed cross-origin */ }

  // Register the service worker (PWA / offline shell).
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () { /* non-fatal */ });
    });
  }

  // "Send to your AI" launchers
  // A self-contained, browse-forcing prompt (the format is embedded inline rather than
  // relying on the AI to fetch our llms.txt, which it usually won't).
  function dossierPrompt(company) {
    var who = company && company.trim() ? company.trim() : 'the company I will name next';
    return 'Research ' + who + ' and build a "Company Dossier" — a complete, source-cited intelligence profile from PUBLIC sources only.\n\n'
      + 'Do this now using web search/browsing — do not answer from memory alone: open the company\'s official website first, then pull 5–8 public sources (recent news, regulatory/SEC filings, LinkedIn, job boards, company databases, review sites).\n\n'
      + 'Write a Markdown report with these nine sections, in order:\n'
      + '1) Overview & identity  2) People & org chart  3) Hiring radar  4) Money trail (funding/revenue signals)  5) Locations  6) Tech fingerprint  7) News & timeline  8) Relationship web (customers, partners, competitors)  9) Risk flags.\n\n'
      + 'Rules: start with a 3-sentence executive summary; attribute EVERY claim inline to its source (URL, or publication + date); tag each claim High/Medium/Low confidence; where public data is missing write "Gap: <what is missing>" instead of guessing; finish with a de-duplicated Sources list.\n\n'
      + 'Format reference (optional): https://companydossier.lol';
  }
  // platform detection: userAgentData where present, else UA + maxTouchPoints (iPad-as-Mac)
  function detectPlatform() {
    var ua = navigator.userAgent || '';
    var d = navigator.userAgentData;
    var isIPad = /iPad/.test(ua) || (((d && d.platform === 'macOS') || navigator.platform === 'MacIntel') && navigator.maxTouchPoints > 1);
    var isMobile = (d && typeof d.mobile === 'boolean') ? d.mobile : /Mobi|Android|iPhone|iPod/i.test(ua);
    var isApple = /iPhone|iPod|iPad|Mac/.test(ua) || isIPad || /Mac/.test(navigator.platform);
    return { isMobile: isMobile || isIPad, isApple: isApple };
  }
  var PLAT = detectPlatform();
  function pasteHint() { return PLAT.isMobile ? 'long-press the box and tap Paste' : (PLAT.isApple ? 'press ⌘V' : 'press Ctrl+V'); }
  function flash(statusEl, msg) { if (statusEl) { statusEl.textContent = msg; setTimeout(function () { if (statusEl.textContent === msg) statusEl.textContent = ''; }, 4000); } }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise(function (res, rej) {
      try { var t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); res(); } catch (e) { rej(e); }
    });
  }
  document.querySelectorAll('[data-ai-launcher]').forEach(function (root) {
    var input = root.querySelector('[data-ai-input]');
    var status = root.querySelector('[data-ai-status]');
    var promptbox = root.querySelector('[data-ai-promptbox]');
    var promptText = root.querySelector('[data-ai-prompt]');
    function showPrompt(p) { if (promptText) promptText.value = p; if (promptbox) promptbox.hidden = false; }
    root.querySelectorAll('[data-ai-go]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var company = input ? input.value.trim() : '';
        if (!company) { flash(status, 'Type a company or domain first.'); if (input) input.focus(); return; }
        var prompt = dossierPrompt(company);
        var name = btn.getAttribute('data-ai-name');
        var tpl = btn.getAttribute('data-ai-url');
        var copyfirst = btn.getAttribute('data-ai-copyfirst') === '1';
        var autorun = btn.getAttribute('data-ai-autorun') === '1';
        // Copy first, synchronously within the gesture (Safari drops activation after an await),
        // so the clipboard is a universal backup even if prefill fails.
        copyText(prompt).catch(function () {});
        showPrompt(prompt);
        // Prefill only if the encoded prompt fits safely in a URL; else open the bare app.
        var enc = encodeURIComponent(prompt);
        var hasFill = tpl.indexOf('{Q}') >= 0;
        var useFill = hasFill && enc.length <= 1800;
        var url = useFill ? tpl.replace('{Q}', enc) : (hasFill ? tpl.replace(/\?.*$/, '') : tpl);
        window.open(url, '_blank', 'noopener');
        var msg;
        if (copyfirst || !useFill) msg = 'Opening ' + name + ' — prompt copied, ' + pasteHint() + ' to run it.';
        else if (autorun) msg = 'Opening ' + name + ' — it runs automatically. (Prompt also copied.)';
        else msg = 'Opening ' + name + ' — prompt filled; press Enter. (Also copied as backup.)';
        flash(status, msg);
      });
    });
    var copyBtn = root.querySelector('[data-ai-copy]');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var company = input ? input.value.trim() : '';
      var p = dossierPrompt(company || 'the company I will name next');
      showPrompt(p);
      copyText(p).then(function () { flash(status, 'Prompt copied to clipboard.'); }).catch(function () { flash(status, 'Select the prompt below and copy it.'); });
    });
  });

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // mobile nav — toggle a class on the <nav>, CSS handles the dropdown
  var toggle = document.querySelector('[data-navtoggle]');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    // close when a link is tapped or on Escape / resize to desktop
    nav.querySelectorAll('.nav-links a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 820) setOpen(false); });
  }

  if (reduce) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('show'); });
    document.querySelectorAll('[data-draw]').forEach(function (el) { el.classList.add('drawn'); });
    return;
  }

  var revO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('show'); revO.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revO.observe(el); });

  var drawO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('drawn'); drawO.unobserve(e.target); }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('[data-draw]').forEach(function (el) { drawO.observe(el); });
})();
