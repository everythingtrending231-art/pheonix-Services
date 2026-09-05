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
});
