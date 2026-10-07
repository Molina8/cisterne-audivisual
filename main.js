(function () {
  "use strict";

  window.__cisterneReveal = true;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(
    ".section__title, .work-item, .photo-card, .about__lead, .about__text, .about__services, .contact__list, .contact__legal"
  );

  function showAll() {
    for (var i = 0; i < targets.length; i++) {
      targets[i].classList.add("is-in");
    }
  }

  if (reduce || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  for (var i = 0; i < targets.length; i++) {
    io.observe(targets[i]);
  }

  var photos = document.querySelectorAll(".photo-card");
  var ticking = false;

  function parallax() {
    ticking = false;
    var vh = window.innerHeight || 1;
    for (var p = 0; p < photos.length; p++) {
      var card = photos[p];
      if (!card.classList.contains("is-in")) continue;
      var rect = card.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) continue;
      var mid = (rect.top + rect.height / 2 - vh / 2) / vh;
      var offset = mid * (p % 2 === 0 ? -14 : 12);
      card.style.setProperty("--parallax", offset.toFixed(1) + "px");
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(parallax);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
