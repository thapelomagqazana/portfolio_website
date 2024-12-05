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
});
