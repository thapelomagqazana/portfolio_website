// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const heroSection = document.getElementById("hero");
const currentHour = new Date().getHours();

if (currentHour >= 18 || currentHour < 6) {
  heroSection.style.background = "linear-gradient(to right, #1a1a1a, #333)";
} else {
  heroSection.style.background = "linear-gradient(to right, #007bff, #00c6ff)";
}

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active"); // Show/Hide nav-links on click
  hamburger.classList.toggle("open"); // Animate hamburger icon
});

// Sticky Navbar on Scroll Down/Up
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-80px"; // Hide on scroll down
  } else {
    navbar.style.top = "0"; // Show on scroll up
  }
  lastScrollTop = scrollTop;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
