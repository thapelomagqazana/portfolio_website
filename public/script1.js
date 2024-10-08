// Project data
const projects = [
  {
    image_link: "cashflow_manager",
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
const parallaxSection = document.querySelector("#parallax-section");

const currentHour = new Date().getHours();

if (currentHour >= 18 || currentHour < 6) {
  heroSection.style.background = "linear-gradient(to right, #1a1a1a, #333)";
} else {
  heroSection.style.background = "linear-gradient(to right, #007bff, #00c6ff)";
}

if (currentHour < 12) {
  parallaxSection.style.background =
    "linear-gradient(to right, #ffcc33, #ff9966)";
} else if (currentHour < 18) {
  parallaxSection.style.background =
    "linear-gradient(to right, #3399ff, #33ccff)";
} else {
  parallaxSection.style.background =
    "linear-gradient(to right, #002244, #334466)";
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
          <picture>
            <!-- WebP format for modern browsers -->
            <source srcset="images/${project.image_link}.webp" type="image/webp">
            <!-- Fallback to JPEG/PNG for browsers that don't support WebP -->
            <source srcset="images/${project.image_link}.jpg" type="image/jpeg">
            <!-- Image with lazy loading -->
            <img src="images/${project.image_link}.jpg" alt="${project.title}" loading="lazy" />
          </picture>
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

// Show or hide the "Back to Top" button when the user scrolls
window.onscroll = function () {
  const backToTopBtn = document.getElementById("back-to-top");
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// Scroll smoothly to the top when the button is clicked
document.getElementById("back-to-top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
  const milestones = document.querySelectorAll(".milestone-header");

  milestones.forEach((milestone) => {
    milestone.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const details = document.querySelector(targetId);

      // Toggle visibility
      if (details.style.display === "block") {
        details.style.display = "none";
      } else {
        details.style.display = "block";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const milestones = document.querySelectorAll(".milestone");

  const observerOptions = {
    root: null, // Use the viewport as the container
    threshold: 0.2, // Trigger animation when 20% of the milestone is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view"); // Add the class to trigger animations
      } else {
        entry.target.classList.remove("in-view"); // Remove class if out of view
      }
    });
  }, observerOptions);

  milestones.forEach((milestone) => {
    observer.observe(milestone); // Observe each milestone
  });
});

/* JavaScript to update progress bar width based on scroll */
window.addEventListener("scroll", function () {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalHeight) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
});

function submitForm() {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  document.getElementById("confirmation-message").innerHTML = "";

  // Capture the inputs
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Create an object with the captured data
  const formData = {
    name: name,
    email: email,
    message: message,
  };

  // Make an AJAX request
  fetch("https://portfoliowebsite-production-74a1.up.railway.app/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("SUCCESS!", data);
      // Display confirmation message
      document.getElementById("confirmation-message").innerHTML =
        '<p style="color:green;">Your message has been sent successfully!</p>';

      // Clear the form after a delay
      setTimeout(function () {
        document.getElementById("contactForm").reset();
        document.getElementById("confirmation-message").innerHTML = ""; // Clear the confirmation message
      }, 2000); // Set the delay in milliseconds
    })
    .catch((error) => {
      console.log("FAILED...", error);
      // Show error message
      document.getElementById("confirmation-message").innerHTML =
        '<p style="color:red;">There was an error sending your message. Please try again later.</p>';
    });
}
