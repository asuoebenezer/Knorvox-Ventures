/* The Knorvox Ventures — main script */
document.addEventListener('DOMContentLoaded', function () {

  // Sticky navbar shrink + back-to-top button
  var nav = document.querySelector('.kv-nav');
  var backTop = document.getElementById('backTop');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 60);
    if (backTop) backTop.style.display = y > 400 ? 'block' : 'none';
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
  if (backTop) backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll reveal animation
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // Animated counters
  var counters = document.querySelectorAll('.counter');
  function runCounter(el) {
    var target = +el.getAttribute('data-target');
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(p * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  // Project filter
  var filterBtns = document.querySelectorAll('.filter-btns .btn');
  var items = document.querySelectorAll('.project-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      items.forEach(function (it) {
        var show = f === 'all' || it.getAttribute('data-cat') === f;
        it.classList.toggle('hide', !show);
      });
    });
  });

  // Project image lightbox (Bootstrap modal)
  var modalEl = document.getElementById('imgModal');
  if (modalEl && window.bootstrap) {
    var modal = new bootstrap.Modal(modalEl);
    var modalImg = document.getElementById('imgModalSrc');
    var modalTitle = document.getElementById('imgModalTitle');
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('click', function () {
        modalImg.src = card.querySelector('img').src;
        modalTitle.textContent = card.querySelector('h5').textContent;
        modal.show();
      });
    });
  }

  // Contact form (front-end demo — connect to your backend / Formspree / EmailJS)
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
      var alertBox = document.getElementById('formAlert');
      alertBox.classList.remove('d-none');
      form.reset();
      form.classList.remove('was-validated');
      setTimeout(function () { alertBox.classList.add('d-none'); }, 6000);
    });
  }

  // Footer year
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
