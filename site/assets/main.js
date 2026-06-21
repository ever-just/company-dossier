(function () {
  // Clickjacking mitigation (GitHub Pages can't send frame-ancestors/X-Frame-Options).
  try { if (window.top !== window.self) { window.top.location = window.self.location.href; } } catch (e) { /* framed cross-origin */ }

  // Register the service worker (PWA / offline shell).
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () { /* non-fatal */ });
    });
  }

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
