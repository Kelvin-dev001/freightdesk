/* Hornbill Freight Desk: tabs, module checklist, sticky CTA, demo-click tracking, scroll reveals. No dependencies. */
(function () {
  'use strict';

  var WA = 'https://wa.me/254759293030?text=';
  var DEFAULT_MSG = "Hi Hornbill, I'd like a demo of Freight Desk. Company: ";
  var MODULES_MSG = "Hi Hornbill, I'd like a demo of Freight Desk. Modules: ";
  var toArray = function (list) { return Array.prototype.slice.call(list); };

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
    var tabs = toArray(tablist.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) {
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
      // Number the panel's lines so a tab switch can write them in one after another.
      toArray(panel.querySelectorAll('li')).forEach(function (li, n) { li.style.setProperty('--n', n); });
      return panel;
    });
    var current = -1;
    var select = function (index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (current !== -1 && index !== current) {
        var panel = panels[index];
        panel.classList.remove('is-entering');
        void panel.offsetWidth; // restart the animation
        panel.classList.add('is-entering');
      }
      current = index;
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
      var list = picked.join(', ');
      cta.href = WA + encodeURIComponent(picked.length ? MODULES_MSG + list + '. Company: ' : DEFAULT_MSG);
      // Same text as the link; the module list gets its own span so it can flash when it changes.
      preview.textContent = '';
      if (picked.length) {
        var mods = document.createElement('span');
        mods.className = 'msg-mods';
        mods.textContent = list;
        preview.append(MODULES_MSG, mods, '. Company: ');
      } else {
        preview.textContent = DEFAULT_MSG;
      }
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

  /* Scroll reveals: stamps land and the job track lights up as they come into view.
     Without IntersectionObserver everything is simply shown; CSS skips it all under reduced motion. */
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    var markIn = function (el) { el.classList.add('is-in'); };
    var reveal = function (targets, onIn, threshold) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          onIn(entry.target);
          io.unobserve(entry.target);
        });
      }, { threshold: threshold, rootMargin: '0px 0px -10% 0px' });
      targets.forEach(function (el) { io.observe(el); });
    };

    reveal(toArray(document.querySelectorAll('[data-reveal]')), markIn, 0.6);

    var trackList = document.querySelector('.track');
    if (trackList) {
      var steps = toArray(trackList.children);
      steps.forEach(function (li, i) { li.style.setProperty('--i', i); });
      // Side by side (tablet up) the steps run in order once the band is in view; stacked, each lights as it scrolls in.
      if (window.matchMedia('(min-width: 768px)').matches) reveal([trackList], function () { steps.forEach(markIn); }, 0.4);
      else reveal(steps, markIn, 0.6);
    }
  }
})();
