// Project data
const projects = [
  {
    image_link: "cashflow_manager.png",
    title: "CashFlow Manager",
    description: "Track and organize transactions with ease.",
    category: "web",
    project_link: "https://cashflow-manger.netlify.app/",
    source_code_link: "https://github.com/thapelomagqazana/budget_tracker",
  },
  // { id: 2, title: "Project 2", description: "Description 2", category: "app" },
  // Add more projects as needed
];

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

document.getElementById("filter").addEventListener("change", function () {
  const category = this.value;
  const projects = document.querySelectorAll(".project-card");

  projects.forEach((project) => {
    if (
      category === "all" ||
      project.getAttribute("data-category") === category
    ) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
});

const projectsPerPage = 6; // Number of projects per page
let currentPage = 1;

function renderProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = ""; // Clear current projects

  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedProjects = projects.slice(startIndex, endIndex);

  paginatedProjects.forEach((project) => {
    const projectCard = `
      <div class="project-card" data-category="${project.category}">
        <div class="project-image">
          <img src="images/${project.image_link}" alt="${project.title}" loading="lazy" />
        </div>
        <div class="project-overlay">
          <div class="overlay-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href=${project.project_link} class="project-link" target="_blank" >View Project</a>
            <a href=${project.source_code_link} class="source-code-link" target="_blank" >View Source Code</a>
          </div>
        </div>
      </div>
    `;
    projectsGrid.innerHTML += projectCard;
  });

  // Update pagination details
  document.getElementById("current-page").textContent = currentPage;
  document.getElementById("total-pages").textContent = Math.ceil(
    projects.length / projectsPerPage
  );
}

function handlePagination() {
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProjects();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(projects.length / projectsPerPage)) {
      currentPage++;
      renderProjects();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects(); // Initial render
  handlePagination(); // Handle pagination clicks
});

// Parallax Effect
window.addEventListener("scroll", function () {
  const layers = document.querySelectorAll(".parallax-layer");
  const scrollY = window.scrollY;

  layers.forEach((layer) => {
    const depth = layer.getAttribute("data-depth");
    const movement = -(scrollY * depth);
    layer.style.transform = `translateY(${movement}px)`;
  });
});

// Interactive Quotes
const quotes = [
  {
    text: "“Everyone should learn how to program a computer because it teaches you how to think.”",
    cite: "- Steve Jobs",
  },
  {
    text: "“The best way to predict the future is to invent it.”",
    cite: "- Alan Kay",
  },
  {
    text: "“First, solve the problem. Then, write the code.”",
    cite: "- John Johnson",
  },
  {
    text: "“Code is like humor. When you have to explain it, it’s bad.”",
    cite: "- Cory House",
  },
];

let currentQuoteIndex = 0;
const quoteText = document.querySelector("#quote");
const nextQuoteButton = document.querySelector("#next-quote");

function displayQuote(index) {
  quoteText.innerHTML = `
    <blockquote>
      ${quotes[index].text}
      <cite>${quotes[index].cite}</cite>
    </blockquote>
  `;
}

nextQuoteButton.addEventListener("click", function () {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  displayQuote(currentQuoteIndex);
});

// Initial Quote Display
document.addEventListener("DOMContentLoaded", function () {
  displayQuote(currentQuoteIndex);
});
