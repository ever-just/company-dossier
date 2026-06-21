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
  function dossierPrompt(company) {
    var who = company && company.trim() ? company.trim() : 'the company I will name next';
    return 'Build a "Company Dossier" — a complete, source-attributed intelligence profile on ' + who +
      ' using PUBLIC sources only. Produce a Markdown report with these nine sections: ' +
      '1) Overview & identity 2) People & org chart 3) Hiring radar 4) Money trail 5) Locations ' +
      '6) Tech fingerprint 7) News & timeline 8) Relationship web 9) Risk flags. ' +
      'Attribute every claim to its source and mark unknowns as gaps. Use web browsing if available. ' +
      'Method & guidance: https://companydossier.lol/llms.txt and https://github.com/ever-just/company-dossier';
  }
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
    root.querySelectorAll('[data-ai-go]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var prompt = dossierPrompt(input ? input.value : '');
        var tpl = btn.getAttribute('data-ai-url');
        var copyfirst = btn.getAttribute('data-ai-copyfirst') === '1';
        var name = btn.getAttribute('data-ai-name');
        var url = tpl.indexOf('{Q}') >= 0 ? tpl.replace('{Q}', encodeURIComponent(prompt)) : tpl;
        if (copyfirst) {
          copyText(prompt).then(function () { flash(status, 'Prompt copied — paste it into ' + name + '.'); }).catch(function () {});
        }
        window.open(url, '_blank', 'noopener');
        if (!copyfirst) flash(status, 'Opening ' + name + '…');
      });
    });
    var copyBtn = root.querySelector('[data-ai-copy]');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      copyText(dossierPrompt(input ? input.value : '')).then(function () { flash(status, 'Prompt copied to clipboard.'); }).catch(function () { flash(status, 'Copy failed — select and copy manually.'); });
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
