/* Cobble Stones WSMBA — site behaviour (no dependencies) */
(function () {
  'use strict';

  /* ----- Mobile menu ----- */
  var btn = document.querySelector('.menubtn');
  var list = document.querySelector('.navlist');
  function setMenu(open) {
    if (!btn || !list) return;
    list.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (btn && list) {
    btn.addEventListener('click', function () { setMenu(!list.classList.contains('open')); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', function (e) {
      if (list.classList.contains('open') && !e.target.closest('.nav')) setMenu(false);
    });
  }

  /* ----- Contact modal (home page only) ----- */
  var modal = document.getElementById('contact-modal');
  var lastFocus = null;
  function openContact() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setMenu(false);
    var close = modal.querySelector('.modalclose');
    if (close) close.focus();
  }
  function closeContact() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (modal) {
    document.querySelectorAll('a[href="#contact"]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); openContact(); });
    });
    modal.addEventListener('click', function (e) { if (e.target === modal) closeContact(); });
    modal.querySelectorAll('.modalclose').forEach(function (b) { b.addEventListener('click', closeContact); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeContact(); });
    if (location.hash === '#contact') {
      openContact();
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    }

    /* Copy buttons */
    modal.querySelectorAll('.copybtn').forEach(function (b) {
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-copy') || '';
        var done = function () {
          b.textContent = 'Copied';
          clearTimeout(b._t);
          b._t = setTimeout(function () { b.textContent = 'Copy'; }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, done);
        } else {
          var ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch (err) {}
          ta.remove(); done();
        }
      });
    });
  }

  /* ----- Reveal on scroll ----- */
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (nodes.length) {
    var reveal = function (n) { n.classList.add('in'); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px' });
      nodes.forEach(function (n) { io.observe(n); });
    } else {
      nodes.forEach(reveal);
    }
    setTimeout(function () { nodes.forEach(reveal); }, 3000);
  }

  /* ----- Cursor-reactive tilt on the crests (pointer devices only) ----- */
  var wrap = document.querySelector('.tiltwrap');
  var tilts = Array.prototype.slice.call(document.querySelectorAll('.tilt'));
  if (wrap && tilts.length && window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    wrap.addEventListener('mousemove', function (ev) {
      var r = wrap.getBoundingClientRect();
      var px = (ev.clientX - r.left) / r.width - 0.5;
      var py = (ev.clientY - r.top) / r.height - 0.5;
      tilts.forEach(function (t, i) {
        var depth = i === 0 ? 1 : 1.6;
        t.style.transform = 'rotateY(' + (px * 14 * depth).toFixed(2) + 'deg) rotateX(' + (-py * 14 * depth).toFixed(2) + 'deg) translateZ(0)';
      });
    });
    wrap.addEventListener('mouseleave', function () {
      tilts.forEach(function (t) { t.style.transform = 'rotateY(0deg) rotateX(0deg)'; });
    });
  }
})();
