document.addEventListener("DOMContentLoaded", () => {
    // Smooth scroll to projects section
    // document.querySelectorAll('.btn[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const target = document.querySelector(this.getAttribute('href'));
    //         target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //     });
    // });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Smooth Scrolling
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Typing Effect
    const roles = ["Software Developer", "Problem Solver", "Creative Coder"];
    let roleIndex = 0;
    let charIndex = 0;

    const dynamicRoleElement = document.getElementById("dynamic-role");

    function typeRole() {
        // Get the current role
        const currentRole = roles[roleIndex];
        
        // Add the next character of the current role
        dynamicRoleElement.textContent = currentRole.substring(0, charIndex);
        charIndex++;

        // If the current role is fully typed
        if (charIndex > currentRole.length) {
            setTimeout(() => {
                deleteRole(); // Start deleting after a short pause
            }, 1000);
        } else {
            setTimeout(typeRole, 100); // Type next character
        }
    }

    function deleteRole() {
        // Remove the last character
        const currentRole = roles[roleIndex];
        dynamicRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        // If the role is fully deleted
        if (charIndex === 0) {
            roleIndex = (roleIndex + 1) % roles.length; // Move to the next role
            setTimeout(typeRole, 200); // Start typing the next role
        } else {
            setTimeout(deleteRole, 50); // Delete next character
        }
    }

    // Start the typing effect
    typeRole();

    // Scroll Cue Click Event
    document.querySelector('.scroll-cue span').addEventListener('click', () => {
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('.scroll-container').forEach((container) => {
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            container.scrollBy({
                left: e.deltaY > 0 ? 100 : -100, // Horizontal scroll based on wheel direction
                behavior: 'smooth',
            });
        });
    });

    // List of Projects with Categories
    const projects = [
        {
            name: "CaloriSee",
            description:
                "An AI-powered meal tracking app that simplifies logging meals by detecting food items from uploaded images using YOLOv5. It provides instant nutritional information and helps users maintain daily calorie goals through intuitive logs.",
            techStack: "YOLOv5, Flask, Python",
            category: "AI",
            github: "https://github.com/thapelomagqazana/food-snap",
            liveDemo: "https://calorisee.up.railway.app/",
        },
        {
            name: "WeatherNow",
            description:
                "A simple weather app that provides real-time weather updates using OpenWeatherMap API.",
            techStack: "JavaScript, HTML, CSS",
            category: "Frontend",
            github: "https://github.com/example/weather-now",
            liveDemo: "https://weathernow.example.com",
        },
        {
            name: "TaskFlow",
            description:
                "An intuitive task management app to organize your daily work efficiently.",
            techStack: "React, Node.js, MongoDB",
            category: "Full Stack",
            github: "https://github.com/example/taskflow",
            liveDemo: "https://taskflow.example.com",
        },
        {
            name: "ShopEase",
            description:
                "A minimalistic e-commerce platform with secure payment integration.",
            techStack: "Django, PostgreSQL, Bootstrap",
            category: "Full Stack",
            github: "https://github.com/example/shopease",
            liveDemo: "https://shopease.example.com",
        },
    ];

    // Function to Render Filter Options
    const renderFilters = () => {
        const categories = ["All", ...new Set(projects.map((project) => project.category))];
        const filterContainer = document.querySelector(".filter-container");
        filterContainer.innerHTML = categories
            .map(
                (category) =>
                    `<button class="filter-btn" data-category="${category}">${category}</button>`
            )
            .join("");
    };

    // Function to Render Projects
    const renderProjects = (filteredProjects) => {
        const portfolioContainer = document.querySelector(".portfolio-container");
        const projectCardsHTML = filteredProjects
            .map(
                (project) => `
                <div class="project-card">
                    <div class="project-card-inner">
                        <!-- Front Face -->
                        <div class="project-card-front">
                            <div class="project-title">${project.name}</div>
                        </div>
                        <!-- Back Face -->
                        <div class="project-card-back">
                            <h4>${project.name}</h4>
                            <p>${project.description}</p>
                            <p><span class="highlight">Tech Stack:</span> ${project.techStack}</p>
                            <div class="project-links">
                                <a href="${project.github}" target="_blank">GitHub</a>
                                <a href="${project.liveDemo}" target="_blank">Live Demo</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            )
            .join("");
        portfolioContainer.innerHTML = `
            <div class="other-projects">
                ${projectCardsHTML}
            </div>
        `;
    };

    // Pagination Variables
    const projectsPerPage = 2; // Number of projects per page
    let currentPage = 1; // Track the current page

    // Function to Paginate Projects
    const paginateProjects = (projects, page) => {
        const startIndex = (page - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        return projects.slice(startIndex, endIndex);
    };

    // Function to Render Pagination Controls
    const renderPagination = (totalProjects) => {
        const totalPages = Math.ceil(totalProjects / projectsPerPage);
        const paginationContainer = document.querySelector(".pagination-container");
        paginationContainer.innerHTML = Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return `
                <button class="pagination-btn ${pageNumber === currentPage ? "active" : ""}" data-page="${pageNumber}">
                    ${pageNumber}
                </button>
            `;
        }).join("");
    };

    // Function to Update Projects and Pagination
    const updateProjects = () => {
        const filteredProjects =
            currentFilter === "All"
                ? projects
                : projects.filter((p) => p.category === currentFilter);
        const paginatedProjects = paginateProjects(filteredProjects, currentPage);
        renderProjects(paginatedProjects);
        renderPagination(filteredProjects.length);
    };

    // Function to Filter Projects
    let currentFilter = "All"; // Track the current filter
    const filterProjects = (category) => {
        currentFilter = category;
        currentPage = 1; // Reset to the first page on filter change
        updateProjects();
    };

    // Initialize Portfolio with Pagination
    const initPortfolio = () => {
        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination-container");
        document.querySelector(".portfolio-projects").appendChild(paginationContainer);

        renderFilters();
        updateProjects();

        // Add Event Listeners for Filters
        document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const category = e.target.getAttribute("data-category");
                filterProjects(category);
            });
        });

        // Add Event Listener for Pagination
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("pagination-btn")) {
                currentPage = parseInt(e.target.getAttribute("data-page"), 10);
                updateProjects();
            }
        });
    };

    initPortfolio();

    const skillBars = document.querySelectorAll(".progress");

    const handleScroll = () => {
        skillBars.forEach((bar) => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (barPosition < screenPosition) {
                bar.style.width = bar.dataset.skillLevel || bar.style.width;
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on load in case section is visible

    function submitForm() {
        event.preventDefault(); // Prevent traditional form submission
      
        document.getElementById("confirmation-message").innerHTML = ""; // Clear previous message
      
        // Capture inputs
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
      
        // Create data object
        const formData = {
          name: name,
          email: email,
          message: message,
        };
      
        // AJAX request
        fetch("https://portfoliowebsite-production-74a1.up.railway.app/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.text())
          .then((data) => {
            document.getElementById("confirmation-message").innerHTML =
              "Message sent successfully!";
            setTimeout(() => {
              document.getElementById("contactForm").reset(); // Clear the form
              document.getElementById("confirmation-message").innerHTML = ""; // Clear message
            }, 2000);
          })
          .catch((error) => {
            document.getElementById("confirmation-message").innerHTML =
              "Failed to send message. Please try again.";
          });
    }
      
    
});
  