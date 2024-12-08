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
            "Built a feature-packed social website for seamless community interaction, image sharing, and bookmarking.",
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
    const threejsModal = document.getElementById("threejs-modal");
    const closeThreeJS = document.getElementById("closeThreeJS");
    const threejsContainer = document.getElementById("threejs-container");
    const projectTitle = document.getElementById("project-title");

    const searchInput = document.getElementById("searchInput");
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");

    // Function to Observe Project Cards
    function observeProjectCards() {
        const projectCards = document.querySelectorAll(".project-card");

        projectCards.forEach((card) => observer.observe(card));
    }

    // Intersection Observer for Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    // Initial Observation of Project Cards
    observeProjectCards();

    let currentPage = 1;
    const itemsPerPage = 2; // Number of items per page
    let filteredProjects = projects; // To hold filtered projects

    // Add Three.js Scene for Dynamic Projects
    let scene, camera, renderer, cube;

    // Function to Initialize 3D Showcase
    function initThreeJS(project) {
        // Clean up previous scene
        if (renderer) {
            renderer.dispose();
            scene = null;
            camera = null;
            cube = null;
            threejsContainer.innerHTML = "";
        }

        // Create Three.js Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x212529);

        // Create Camera
        camera = new THREE.PerspectiveCamera(75, threejsContainer.offsetWidth / threejsContainer.offsetHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create Renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(threejsContainer.offsetWidth, threejsContainer.offsetHeight);
        threejsContainer.appendChild(renderer.domElement);

        // Create Cube with Project Images
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const materials = [
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(project.image_link) }),
            new THREE.MeshBasicMaterial({ color: 0xd4af37 }), // Accent gold for unused faces
            new THREE.MeshBasicMaterial({ color: 0x4169e1 }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(project.image_link) }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(project.image_link) }),
            new THREE.MeshBasicMaterial({ color: 0xdc143c }),
        ];

        cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    }

    // Function to Open 3D Showcase Modal
    function openThreeJSModal(project) {
        // Set the project title
        projectTitle.innerText = project.title;

        // Add project links
        const modalFooter = document.createElement("div");
        modalFooter.classList.add("project-card-footer");

        modalFooter.innerHTML = `
            <a href="${project.project_link}" target="_blank" class="project-link">Live Demo</a>
            <a href="${project.source_code_link}" target="_blank" class="source-code-link">Source Code</a>
        `;

        // Append footer links to modal content
        const modalContent = threejsModal.querySelector(".threejs-modal-content");
        
        // Remove any existing footer to avoid duplication
        const existingFooter = modalContent.querySelector(".project-card-footer");
        if (existingFooter) {
            existingFooter.remove();
        }
        
        modalContent.appendChild(modalFooter);

        // Show the modal
        threejsModal.style.display = "flex";

        // Initialize the 3D scene
        initThreeJS(project);
    }

    // Function to Close Modal
    closeThreeJS.addEventListener("click", () => {
        threejsModal.style.display = "none";
    });

    // Function to Render Projects
    function renderProjects(page = 1) {
        portfolioContainer.innerHTML = ""; // Clear container

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const projectsToShow = filteredProjects.slice(startIndex, endIndex);

        projectsToShow.forEach((project) => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card", "col-md-4");

            projectCard.innerHTML = `
                <img src="${project.image_link}" alt="${project.title}" />
                <div class="project-card-body">
                    <h3 class="project-card-title">${project.title}</h3>
                    <p class="project-card-description">${project.description}</p>
                    <div class="tech-stack">
                        ${project.tech_stack.map((tech) => `<span>${tech}</span>`).join("")}
                    </div>
                </div>
            `;
            projectCard.addEventListener("click", () => openThreeJSModal(project));
            portfolioContainer.appendChild(projectCard);
        });

        // Re-observe new project cards
        observeProjectCards();
    }

    // Function to Handle Search
    function handleSearch() {
        const query = searchInput.value.toLowerCase();
        filteredProjects = projects.filter((project) => 
            project.title.toLowerCase().includes(query) || 
            project.description.toLowerCase().includes(query) || 
            project.tech_stack.some((tech) => tech.toLowerCase().includes(query))
        );
        currentPage = 1; // Reset to first page
        renderProjects(currentPage);
        updatePaginationControls();
    }

    // Event Listeners
    searchInput.addEventListener("input", handleSearch);

    prevPage.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderProjects(currentPage);
            updatePaginationControls();
        }
    });

    nextPage.addEventListener("click", () => {
        if (currentPage < Math.ceil(filteredProjects.length / itemsPerPage)) {
            currentPage++;
            renderProjects(currentPage);
            updatePaginationControls();
        }
    });

    // Function to Update Pagination Controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPage.disabled = currentPage === 1;
        nextPage.disabled = currentPage === totalPages;
    }

    // Initial Render
    renderProjects(currentPage);
    updatePaginationControls();

    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach((btn) => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');

            // Filter projects based on the selected category
            const category = button.dataset.category;           
            filteredProjects = category !== "all" ? projects.filter((project) => 
                project.category.toLowerCase() === category
            ) : projects;
            currentPage = 1; // Reset to first page
            renderProjects(currentPage);
            updatePaginationControls();
        });
    });

    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer1 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
            }
        });
    }, {
        threshold: 0.3, // Trigger animation when 30% of the element is visible
    });

    timelineItems.forEach((item) => observer1.observe(item));

    // Set radial progress dynamically
    document.querySelectorAll(".radial-progress").forEach((progress) => {
        const value = progress.getAttribute("data-progress");
        progress.style.setProperty("--progress", value);
    });

    const skillsGraph = {
        nodes: [
            { id: "JavaScript", group: 1 },
            { id: "React", group: 1 },
            { id: "Node.js", group: 1 },
            { id: "HTML", group: 2 },
            { id: "CSS", group: 2 },
            { id: "Python", group: 3 },
            { id: "Django", group: 3 },
            { id: "Flask", group: 3 },
        ],
        links: [
            { source: "JavaScript", target: "React" },
            { source: "JavaScript", target: "Node.js" },
            { source: "HTML", target: "CSS" },
            { source: "Python", target: "Django" },
            { source: "Python", target: "Flask" },
        ],
    };

    // const svg = d3
    //     .select("#skill-graph-container")
    //     .append("svg")
    //     .attr("width", "100%")
    //     .attr("height", 400);

    // const width = document.getElementById("skill-graph-container").offsetWidth;
    // const height = 400;

    // const simulation = d3
    //     .forceSimulation(skillsGraph.nodes)
    //     .force("link", d3.forceLink(skillsGraph.links).distance(100).strength(1).id((d) => d.id))
    //     .force("charge", d3.forceManyBody().strength(-400))
    //     .force("center", d3.forceCenter(width / 2, height / 2));

    // const link = svg
    //     .append("g")
    //     .attr("class", "links")
    //     .selectAll("line")
    //     .data(skillsGraph.links)
    //     .enter()
    //     .append("line")
    //     .attr("stroke-width", 2)
    //     .attr("stroke", "#aaa");

    // const node = svg
    //     .append("g")
    //     .attr("class", "nodes")
    //     .selectAll("circle")
    //     .data(skillsGraph.nodes)
    //     .enter()
    //     .append("circle")
    //     .attr("r", 10)
    //     .attr("fill", (d) => (d.group === 1 ? "var(--accent-gold)" : d.group === 2 ? "var(--accent-blue)" : "var(--accent-crimson)"))
    //     .call(
    //         d3.drag()
    //             .on("start", (event, d) => {
    //                 if (!event.active) simulation.alphaTarget(0.3).restart();
    //                 d.fx = d.x;
    //                 d.fy = d.y;
    //             })
    //             .on("drag", (event, d) => {
    //                 d.fx = event.x;
    //                 d.fy = event.y;
    //             })
    //             .on("end", (event, d) => {
    //                 if (!event.active) simulation.alphaTarget(0);
    //                 d.fx = null;
    //                 d.fy = null;
    //             })
    //     );

    // const text = svg
    //     .append("g")
    //     .selectAll("text")
    //     .data(skillsGraph.nodes)
    //     .enter()
    //     .append("text")
    //     .attr("x", 12)
    //     .attr("y", ".31em")
    //     .text((d) => d.id)
    //     .style("font-size", "12px");

    // simulation.on("tick", () => {
    //     link.attr("x1", (d) => d.source.x)
    //         .attr("y1", (d) => d.source.y)
    //         .attr("x2", (d) => d.target.x)
    //         .attr("y2", (d) => d.target.y);

    //     node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    //     text.attr("x", (d) => d.x).attr("y", (d) => d.y);
    // });

    const contactForm = document.getElementById("contactForm");
    const thankYou = document.getElementById("thankYou");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

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
                // Simulate form submission
                contactForm.style.display = "none"; // Hide the form
                thankYou.classList.remove("hidden"); // Show the thank-you animation

                // Reset the form after submission (optional)
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = "block";
                    thankYou.classList.add("hidden");
                }, 5000); // Reset after 5 seconds
            })
            .catch((error) => {
            console.log("FAILED...", error);
            // Show error message
            document.getElementById("error-message").innerHTML =
                '<p style="color:red;">There was an error sending your message. Please try again later.</p>';
            });
    });

});
