// Project data
const projects = [
  {
    image_link: "image_link",
    title: "Image-Link",
    description:
      "Built a feature-packed social website with Django, PostgreSQL, and Redis for seamless community interaction, image sharing, and bookmarking.",
    category: "web",
    project_link: "https://web-production-a127.up.railway.app/",
    source_code_link: "https://github.com/thapelomagqazana/social_media_app",
  },
  {
    image_link: "pig_game",
    title: "Pig Game",
    description:
      "Developed a two-player Pig Game using dice rolls, where strategy and luck combine to reach the target score first without rolling a 1.",
    category: "design",
    project_link: "https://thapelomagqazana.github.io/pigGame/",
    source_code_link: "https://github.com/thapelomagqazana/pigGame",
  },
  {
    image_link: "guess_the_number_game",
    title: "Guess the Number Game",
    description:
      "A number guessing game where players try to guess a randomly generated number between 1 and 20, with feedback on each guess and score tracking, including a high score feature.",
    category: "design",
    project_link: "https://thapelomagqazana.github.io/guessTheNumberGame/",
    source_code_link: "https://github.com/thapelomagqazana/guessTheNumberGame",
  },
  {
    image_link: "cashflow_manager",
    title: "CashFlow Manager",
    description: "Track and organize transactions with ease.",
    category: "design",
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

// Variables for pagination
let currentPage = 1;
const projectsPerPage = 2; // Adjust the number of projects per page

// Function to render the projects based on the selected filter and current page
function renderProjects(filteredCategory = "all") {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = ""; // Clear current projects

  // Filter the projects based on the selected category
  const filteredProjects = projects.filter((project) =>
    filteredCategory === "all" ? true : project.category === filteredCategory
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Display the paginated projects
  paginatedProjects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.setAttribute("data-category", project.category);
    projectCard.innerHTML = `
      <picture>
        <!-- WebP format for modern browsers -->
        <source srcset="images/${project.image_link}.webp" type="image/webp">
        <!-- Fallback to JPEG for browsers that don't support WebP -->
        <source srcset="images/${project.image_link}.jpg" type="image/jpeg">
        <!-- Fallback image with lazy loading -->
        <img src="images/${project.image_link}.jpg" alt="${project.title}" loading="lazy">
      </picture>
      <h3>${project.title}</h3>
    `;

    // Event listener to open modal on click
    projectCard.addEventListener("click", () => {
      openModal(project);
    });

    projectsGrid.appendChild(projectCard);
  });

  // Update pagination details
  document.getElementById("current-page").textContent = currentPage;
  document.getElementById("total-pages").textContent = Math.ceil(
    filteredProjects.length / projectsPerPage
  );

  // Disable pagination buttons if necessary
  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled =
    currentPage === Math.ceil(filteredProjects.length / projectsPerPage);
}

// Function to open the modal with project details
function openModal(project) {
  const modal = document.getElementById("project-modal");
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-description").textContent =
    project.description;
  document.getElementById("modal-project-link").href = project.project_link;
  document.getElementById("modal-source-code-link").href =
    project.source_code_link;

  modal.style.display = "flex"; // Show the modal
}

// Close modal when the "X" is clicked
document.querySelector(".close-modal").addEventListener("click", () => {
  document.getElementById("project-modal").style.display = "none";
});

// Event listener for the filter dropdown
document.getElementById("filter").addEventListener("change", function () {
  const selectedCategory = this.value;
  currentPage = 1; // Reset to the first page when the filter changes
  renderProjects(selectedCategory);
});

// Pagination event listeners
document.getElementById("prev-page").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    const selectedCategory = document.getElementById("filter").value;
    renderProjects(selectedCategory);
  }
});

document.getElementById("next-page").addEventListener("click", function () {
  currentPage++;
  const selectedCategory = document.getElementById("filter").value;
  renderProjects(selectedCategory);
});

// Initial render of all projects
document.addEventListener("DOMContentLoaded", function () {
  renderProjects(); // Render all projects initially
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
