(function () {
  'use strict';

  // Paw print SVG path (bear paw: 4 toes + main pad)
  var PAW_PATH =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" aria-hidden="true">' +
      '<ellipse cx="50"  cy="83" rx="28" ry="23"/>' +
      '<ellipse cx="22"  cy="50" rx="11" ry="9"  transform="rotate(-20 22 50)"/>' +
      '<ellipse cx="40"  cy="40" rx="11" ry="9"  transform="rotate(-7  40 40)"/>' +
      '<ellipse cx="60"  cy="40" rx="11" ry="9"  transform="rotate(7   60 40)"/>' +
      '<ellipse cx="78"  cy="50" rx="11" ry="9"  transform="rotate(20  78 50)"/>' +
    '</svg>';

  // ---- Scroll-based reveal (paw dividers + .scroll-fade elements) ----
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.paw-divider, .scroll-fade').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: immediately show everything
    document.querySelectorAll('.paw-divider, .scroll-fade').forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  // ---- Logo entrance animation ----
  var logoImg = document.querySelector('.navbar-brand img');
  if (logoImg) {
    logoImg.classList.add('logo-animated');
  }

  // ---- Paw cursor trail (desktop, no reduced-motion) ----
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile       = window.matchMedia('(max-width: 768px)').matches;

  if (!prefersReduced && !isMobile) {
    var trailTimer = null;
    var spawnCount = 0;

    document.addEventListener('mousemove', function (e) {
      // Throttle: one paw every ~100ms
      if (trailTimer) return;
      trailTimer = setTimeout(function () {
        trailTimer = null;
        spawnCount++;
        // Only spawn every other move to keep it subtle
        if (spawnCount % 2 === 0) spawnPaw(e.clientX, e.clientY);
      }, 100);
    });

    function spawnPaw(x, y) {
      var el = document.createElement('div');
      el.className = 'paw-trail-dot';
      var rot = (Math.random() * 50 - 25).toFixed(1) + 'deg';
      el.style.cssText =
        'left:' + (x - 11) + 'px;' +
        'top:'  + (y - 11) + 'px;';
      el.style.setProperty('--paw-rot', rot);
      el.innerHTML = PAW_PATH;
      document.body.appendChild(el);
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 1000);
    }
  }
})();
