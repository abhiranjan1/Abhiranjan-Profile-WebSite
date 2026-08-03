const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const menuBtn = document.querySelector(".menu-btn");
const mobileNav = document.getElementById("mobile-nav");

function setMenuOpen(open) {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") !== "true";
    setMenuOpen(open);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
}

const revealItems = document.querySelectorAll(
  ".timeline-item, .skill-list li, .edu-item, .about-grid p"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity 0.55s ease ${Math.min(index * 0.04, 0.35)}s, transform 0.55s ease ${Math.min(index * 0.04, 0.35)}s`;
    observer.observe(el);
  });
}

const style = document.createElement("style");
style.textContent = `
  .is-visible {
    opacity: 1 !important;
    transform: none !important;
  }
`;
document.head.appendChild(style);
