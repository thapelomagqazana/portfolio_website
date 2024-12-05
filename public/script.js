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
});
