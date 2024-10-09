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

// Select all expand buttons
document.querySelectorAll(".expand-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Get the related content using the data-target attribute
    const target = document.querySelector(button.getAttribute("data-target"));

    // Check if the target is currently visible
    if (target.style.display === "block") {
      target.style.display = "none"; // Collapse the content
      button.textContent = "Read More"; // Change button text to "Read More"
    } else {
      // Collapse all other milestones
      document.querySelectorAll(".more-text").forEach((moreText) => {
        moreText.style.display = "none";
      });

      // Update all buttons back to "Read More"
      document.querySelectorAll(".expand-btn").forEach((btn) => {
        btn.textContent = "Read More";
      });

      // Expand the current milestone content
      target.style.display = "block"; // Show the content
      button.textContent = "Read Less"; // Change button text to "Read Less"
    }
  });
});
