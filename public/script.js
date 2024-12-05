document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const breadcrumbNav = document.querySelector(".breadcrumb-nav");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    // Change Navbar Background on Scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Update Active Link and Breadcrumbs on Scroll
    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 80;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });

        // Show Breadcrumbs for Active Section
        if (currentSection === "portfolio") {
            breadcrumbNav.classList.remove("d-none");
        } else {
            breadcrumbNav.classList.add("d-none");
        }
    });

    const hamburgerMenuToggle = document.getElementById("hamburgerMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    // Toggle mobile menu
    hamburgerMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        hamburgerMenuToggle.querySelector(".navbar-toggler-icon").classList.toggle("rotate");
    });

    // Close menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            hamburgerMenuToggle.querySelector(".navbar-toggler-icon").classList.remove("rotate");
        });
    });

    const rotatingLogo = document.querySelector(".rotating-logo");

    document.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const rotateX = (clientY / innerHeight - 0.5) * 20;
        const rotateY = (clientX / innerWidth - 0.5) * 20;

        gsap.to(rotatingLogo, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power1.out"
        });
    });

    const typewriterText = document.querySelector(".typewriter-text");
    const textArray = ["Curating Innovative Code Solutions for a Better Tomorrow", "Creating Digital Masterpieces, One Line of Code at a Time"];
    let textIndex = 0;
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < textArray[textIndex].length) {
            typewriterText.textContent += textArray[textIndex][charIndex];
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(() => {
                typewriterText.textContent = "";
                charIndex = 0;
                textIndex = (textIndex + 1) % textArray.length;
                typeEffect();
            }, 2000);
        }
    }

    typeEffect();

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const parallaxBg = document.querySelector(".parallax-bg");
    
        // Adjust parallax speed
        parallaxBg.style.transform = `translateY(${scrollY * 0.2}px)`;
    });

    const projects = [
        {
          image_link: "./images/image_link.jpg",
          title: "Image-Link",
          description:
            "Built a feature-packed social website with Django, PostgreSQL, and Redis for seamless community interaction, image sharing, and bookmarking.",
          category: "web",
          tech_stack: ["Django", "PostgreSQL", "Redis"],
          project_link: "https://web-production-a127.up.railway.app/",
          source_code_link: "https://github.com/thapelomagqazana/social_media_app",
        },
        {
          image_link: "./images/pig_game.jpg",
          title: "Pig Game",
          description:
            "Developed a two-player Pig Game using dice rolls, where strategy and luck combine to reach the target score first without rolling a 1.",
          category: "design",
          tech_stack: ["HTML", "CSS", "JavaScript"],
          project_link: "https://thapelomagqazana.github.io/pigGame/",
          source_code_link: "https://github.com/thapelomagqazana/pigGame",
        },
        {
          image_link: "./images/guess_the_number_game.jpg",
          title: "Guess the Number Game",
          description:
            "A number guessing game where players try to guess a randomly generated number between 1 and 20, with feedback on each guess and score tracking, including a high score feature.",
          category: "design",
          tech_stack: ["HTML", "CSS", "JavaScript"],
          project_link: "https://thapelomagqazana.github.io/guessTheNumberGame/",
          source_code_link: "https://github.com/thapelomagqazana/guessTheNumberGame",
        },
        {
          image_link: "./images/cashflow_manager.jpg",
          title: "CashFlow Manager",
          description: "Track and organize transactions with ease.",
          category: "design",
          tech_stack: ["HTML", "CSS", "JavaScript"],
          project_link: "https://cashflow-manger.netlify.app/",
          source_code_link: "https://github.com/thapelomagqazana/budget_tracker",
        },
    ];
      
    const portfolioContainer = document.getElementById("portfolioContainer");
      
    // Dynamically Render Projects
    projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
    
        projectCard.innerHTML = `
        <img src="${project.image_link}" alt="${project.title}" />
        <div class="project-card-body">
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-description">${project.description}</p>
            <div class="tech-stack">
                ${project.tech_stack.map((tech) => `<span>${tech}</span>`).join("")}
            </div>
        </div>
        <div class="project-card-footer">
            <a href="${project.project_link}" target="_blank" class="project-link">Live Demo</a>
            <a href="${project.source_code_link}" target="_blank" class="source-code-link">Source Code</a>
        </div>
        `;
    
        portfolioContainer.appendChild(projectCard);
    });
      
});
