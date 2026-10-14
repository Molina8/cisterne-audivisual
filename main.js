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

/* ---- Photo lightbox — Zara-style fullscreen viewer (index.html) ---- */
(function () {
  "use strict";

  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  var lbImg = lightbox.querySelector(".lightbox__img");
  var lbClose = lightbox.querySelector(".lightbox__close");
  var triggers = document.querySelectorAll(".photo-card__trigger");
  var lastTrigger = null;

  function openLightbox(trigger) {
    var img = trigger.querySelector(".photo-card__img");
    if (!img) return;
    lastTrigger = trigger;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.hidden = false;
    document.documentElement.classList.add("lightbox-open");
    lbClose.focus();
  }

  function closeLightbox() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    lbImg.src = "";
    document.documentElement.classList.remove("lightbox-open");
    if (lastTrigger) lastTrigger.focus();
    lastTrigger = null;
  }

  function onTriggerClick(e) {
    openLightbox(e.currentTarget);
  }

  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener("click", onTriggerClick);
  }

  lbClose.addEventListener("click", closeLightbox);

  /* Click anywhere outside the photo closes it (backdrop + figure padding). */
  lightbox.addEventListener("click", function (e) {
    if (e.target === lbImg) return;
    closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === "Tab") {
      /* Single focusable element: keep focus trapped on the close button. */
      e.preventDefault();
      lbClose.focus();
    }
  });
})();
