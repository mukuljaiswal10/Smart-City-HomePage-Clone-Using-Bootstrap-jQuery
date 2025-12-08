/* Repeat counters on every scroll - robust version */

// pick all counters
const counters = document.querySelectorAll(".count");
const duration = 1200; // ms animation time
const active = new Map(); // to store active raf ids per element

function animateCounter(el, target, duration) {
  // cancel previous animation if exists
  if (active.has(el)) {
    cancelAnimationFrame(active.get(el).rafId);
    active.delete(el);
  }

  let startTime = null;
  target = +target;
  el.textContent = "0";

  function tick(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(ease * target);

    el.textContent = value;

    if (progress < 1) {
      const rafId = requestAnimationFrame(tick);
      active.set(el, { rafId });
    } else {
      el.textContent = target; // ensure exact final value
      active.delete(el);
    }
  }

  const rafId = requestAnimationFrame(tick);
  active.set(el, { rafId });
}

// Observer watches the parent row/container
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // start/reset all counters when visible
      counters.forEach(counter => {
        const target = counter.getAttribute("data-target") || "0";
        animateCounter(counter, target, duration);
      });
      // DO NOT disconnect if you want repeat on every scroll
    }
  });
}, { threshold: 0.4 });

// Change selector to your actual container if needed
const container = document.querySelector(".row.my-5");
if (container) observer.observe(container);
else console.warn("Observer error: container .row.my-5 not found.");




  const btn = document.getElementById("topBtn");

  window.addEventListener("scroll", () => {
    // 200px se zyada scroll kare to button show hoga
    if (window.scrollY >150) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  // Button click → smooth top scroll
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
