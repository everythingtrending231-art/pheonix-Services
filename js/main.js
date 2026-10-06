var ENERGY_FLOW_SVG = [
  '<svg viewBox="0 0 1000 450" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" focusable="false">',
    '<circle class="energy-glow" cx="620" cy="120" r="105" fill="#E3A438" opacity="0.18"/>',
    '<circle class="energy-glow" cx="620" cy="120" r="56" fill="#E3A438" opacity="0.28" style="animation-delay:0.6s"/>',
    '<g stroke="#3E8A78" stroke-width="1.2" fill="none" opacity="0.5">',
      '<path class="energy-line" d="M 120 380 L 880 300"/>',
      '<path class="energy-line energy-line--slow" d="M 80 420 L 920 340"/>',
    '</g>',
    '<g stroke="#E3A438" stroke-width="1" fill="none" opacity="0.4">',
      '<path class="energy-line energy-line--slow" d="M 150 400 L 850 60"/>',
    '</g>',
    '<g stroke="#EEF1EA" stroke-width="1" fill="none" opacity="0.22">',
      '<path class="energy-wind" d="M -100 90 Q 90 60 260 90 T 610 90 T 960 90 T 1310 90"/>',
      '<path class="energy-wind" d="M -100 170 Q 100 200 300 170 T 650 170 T 1000 170" style="animation-delay:2s"/>',
    '</g>',
    '<g fill="#E3A438">',
      '<circle class="energy-particle" cx="400" cy="360" r="3" style="--drift:14px; animation-delay:0s"/>',
      '<circle class="energy-particle" cx="480" cy="320" r="2.4" style="--drift:-10px; animation-delay:1.2s"/>',
      '<circle class="energy-particle" cx="560" cy="370" r="3" style="--drift:8px; animation-delay:2.4s"/>',
      '<circle class="energy-particle" cx="640" cy="310" r="2.2" style="--drift:-12px; animation-delay:3.6s"/>',
      '<circle class="energy-particle" cx="720" cy="350" r="2.8" style="--drift:10px; animation-delay:4.8s"/>',
    '</g>',
  '</svg>'
].join('');

function injectEnergyFlow() {
  document.querySelectorAll('.hero-graphic').forEach(function (el) {
    var overlay = document.createElement('div');
    overlay.className = 'energy-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = ENERGY_FLOW_SVG;
    el.appendChild(overlay);
  });

  document.querySelectorAll('.section--navy').forEach(function (el) {
    if (el.classList.contains('hero')) return;
    var overlay = document.createElement('div');
    overlay.className = 'energy-overlay energy-overlay--subtle';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = ENERGY_FLOW_SVG;
    el.insertBefore(overlay, el.firstElementChild);
  });
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function hasFinePointer() {
  return window.matchMedia && window.matchMedia('(pointer: fine)').matches;
}

/* A soft radial highlight that follows the cursor inside the hero banner. */
function setupHeroGlow() {
  if (prefersReducedMotion() || !hasFinePointer()) return;
  document.querySelectorAll('.hero').forEach(function (hero) {
    var glow = document.createElement('div');
    glow.className = 'hero-glow';
    glow.setAttribute('aria-hidden', 'true');
    hero.appendChild(glow);
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mx', x + '%');
      hero.style.setProperty('--my', y + '%');
    });
  });
}

/* Slow, subtle parallax drift on the hero artwork as the page scrolls. */
function setupParallax() {
  if (prefersReducedMotion()) return;
  var targets = Array.prototype.slice.call(document.querySelectorAll('.hero-graphic'));
  if (!targets.length) return;
  var ticking = false;
  function update() {
    var y = window.scrollY || window.pageYOffset;
    targets.forEach(function (el) {
      el.style.transform = 'translateY(' + Math.min(y * 0.12, 60) + 'px)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* Thin progress bar under the header that fills as the reader scrolls the page. */
function setupScrollProgress() {
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var ticking = false;
  function update() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = pct + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

/* Gives the sticky header a condensed, elevated look once the page has scrolled. */
function setupHeaderScrollState() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function update() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* Fades section content in as it enters the viewport. */
function setupScrollReveal() {
  var selector = '.card, .section-head, .pull-quote, .notice, .table-wrap, .roadmap-item, .factband';
  var items = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!items.length) return;

  var seenPerParent = new Map();
  items.forEach(function (el) {
    el.classList.add('observe-reveal');
    var parent = el.parentElement;
    var siblingsSeen = seenPerParent.get(parent) || 0;
    el.style.transitionDelay = Math.min(siblingsSeen * 70, 350) + 'ms';
    seenPerParent.set(parent, siblingsSeen + 1);
  });

  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
}

/* A small circular button that appears after scrolling, for quick return to the top. */
function setupBackToTop() {
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
  document.body.appendChild(btn);

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });

  function update() {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('.year-now').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  injectEnergyFlow();
  setupHeroGlow();
  setupParallax();
  setupScrollProgress();
  setupHeaderScrollState();
  setupScrollReveal();
  setupBackToTop();
});
