(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // mobile nav
  var toggle = document.querySelector('[data-navtoggle]');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.getAttribute('data-open') === '1';
      links.setAttribute('data-open', open ? '0' : '1');
      links.style.display = open ? '' : 'flex';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
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
