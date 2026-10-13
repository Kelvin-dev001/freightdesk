/* Hornbill Freight Desk: tabs, module checklist, sticky CTA, demo-click tracking. No dependencies. */
(function () {
  'use strict';

  var WA = 'https://wa.me/254759293030?text=';
  var DEFAULT_MSG = "Hi Hornbill, I'd like a demo of Freight Desk. Company: ";

  /* book_demo_click → dataLayer (GA4 via GTM/gtag) and Meta Pixel, if present */
  window.dataLayer = window.dataLayer || [];
  function track(segment) {
    window.dataLayer.push({ event: 'book_demo_click', segment: segment });
    if (typeof window.gtag === 'function') window.gtag('event', 'book_demo_click', { segment: segment });
    if (typeof window.fbq === 'function') window.fbq('trackCustom', 'book_demo_click', { segment: segment });
  }
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[data-segment]');
    if (link) track(link.getAttribute('data-segment'));
  });

  /* Who it's for: ARIA tabs. Without JS every panel stays visible. */
  var tablist = document.querySelector('.who__tabs');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) {
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
      return panel;
    });
    var select = function (index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });
      tab.addEventListener('keydown', function (e) {
        var n = tabs.length, to = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') to = (i + 1) % n;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') to = (i - 1 + n) % n;
        else if (e.key === 'Home') to = 0;
        else if (e.key === 'End') to = n - 1;
        if (to !== null) { e.preventDefault(); select(to, true); }
      });
    });
    tablist.hidden = false;
    document.documentElement.classList.add('js-tabs');
    select(0, false);
  }

  /* Modules: ticked list goes into the WhatsApp message. Visual only, no maths. */
  var sheet = document.getElementById('modules-sheet');
  if (sheet) {
    var boxes = sheet.querySelectorAll('input[type="checkbox"]');
    var cta = document.getElementById('modules-cta');
    var preview = document.getElementById('modules-msg');
    var update = function () {
      var picked = [];
      for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) picked.push(boxes[i].value);
      var msg = picked.length
        ? "Hi Hornbill, I'd like a demo of Freight Desk. Modules: " + picked.join(', ') + '. Company: '
        : DEFAULT_MSG;
      cta.href = WA + encodeURIComponent(msg);
      preview.textContent = msg;
    };
    sheet.addEventListener('change', update);
    update();
  }

  /* Mobile sticky CTA: shows once the hero has scrolled out of view (hidden on desktop by CSS). */
  var bar = document.getElementById('stickybar');
  var hero = document.querySelector('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    bar.hidden = false;
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-on', !entries[0].isIntersecting);
    }).observe(hero);
  }
})();
