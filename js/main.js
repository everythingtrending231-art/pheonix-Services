var ENERGY_FLOW_SVG = [
  '<svg viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" focusable="false">',
    '<circle class="energy-glow" cx="1180" cy="140" r="130" fill="#E3A438" opacity="0.18"/>',
    '<circle class="energy-glow" cx="1180" cy="140" r="70" fill="#E3A438" opacity="0.28" style="animation-delay:0.6s"/>',
    '<g stroke="#3E8A78" stroke-width="1.2" fill="none" opacity="0.5">',
      '<path class="energy-line" d="M 60 480 L 1340 380"/>',
      '<path class="energy-line energy-line--slow" d="M 40 540 L 1360 460"/>',
    '</g>',
    '<g stroke="#E3A438" stroke-width="1" fill="none" opacity="0.4">',
      '<path class="energy-line energy-line--slow" d="M 100 560 L 1300 60"/>',
    '</g>',
    '<g stroke="#EEF1EA" stroke-width="1" fill="none" opacity="0.22">',
      '<path class="energy-wind" d="M -100 120 Q 100 90 300 120 T 700 120 T 1100 120 T 1500 120"/>',
      '<path class="energy-wind" d="M -100 200 Q 120 230 340 200 T 780 200 T 1220 200" style="animation-delay:2s"/>',
    '</g>',
    '<g fill="#E3A438">',
      '<circle class="energy-particle" cx="260" cy="480" r="3" style="--drift:14px; animation-delay:0s"/>',
      '<circle class="energy-particle" cx="520" cy="440" r="2.4" style="--drift:-10px; animation-delay:1.2s"/>',
      '<circle class="energy-particle" cx="780" cy="500" r="3" style="--drift:8px; animation-delay:2.4s"/>',
      '<circle class="energy-particle" cx="1020" cy="420" r="2.2" style="--drift:-12px; animation-delay:3.6s"/>',
      '<circle class="energy-particle" cx="1240" cy="470" r="2.8" style="--drift:10px; animation-delay:4.8s"/>',
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
