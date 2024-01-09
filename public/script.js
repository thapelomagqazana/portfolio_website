document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Capture the inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Create an object with the captured data
        const formData = {
            name: name,
            email: email,
            message: message
        };

        // Make an AJAX request
        fetch('http://localhost:6662/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.text())
            .then(data => {
                console.log(data); // Log the response from the server
                // You can add further actions based on the server response
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors if any
            });
    });
});

// Optional smooth scrolling for browsers that don't support "scroll-behavior: smooth"
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
});

// Check for user's dark mode preference in local storage
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// Set initial dark mode state
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').checked = true;
}

// Toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');

    // Save user's dark mode preference in local storage
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// {/* <nav class="fixed-nav">
//       <a href="#intro">Intro</a>
//       <a href="#about">About</a>
//       <a href="#projects">Projects</a>
//       <a href="#skills">Skills</a>
//       <a href="#blog">Blog</a>
//       <a href="#contact">Contact</a>
//     </nav> */}