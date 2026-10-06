// Automatic footer year
document.getElementById("year").textContent = new Date().getFullYear();


// Elements
const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");


// Mobile navigation
function setMenu(open) {
  navLinks.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => {
  setMenu(!navLinks.classList.contains("active"));
});

// Close menu when a link is clicked
navAnchors.forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

// Close menu with Escape or a click outside
document.addEventListener("keydown", event => {
  if (event.key === "Escape") setMenu(false);
});

document.addEventListener("click", event => {
  if (!navbar.contains(event.target)) setMenu(false);
});

// Reset navigation when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 700) setMenu(false);
});


// Navbar border appears after scrolling
function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
}

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });


// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}


// Highlight the nav link of the section in view
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navAnchors.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach(section => sectionObserver.observe(section));
}