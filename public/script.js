function submitForm() {
    // Display a loading message
    document.getElementById('confirmation-message').innerHTML = 'Sending...';
  
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
    fetch('https://portfoliowebsite-production-74a1.up.railway.app/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.text())
      .then(data => {
        // Display confirmation message
        document.getElementById('confirmation-message').innerHTML = data;
  
        // Clear the form after a delay
        setTimeout(function() {
          document.getElementById('contactForm').reset();
          document.getElementById('confirmation-message').innerHTML = ''; // Clear the confirmation message
        }, 2000); // Set the delay in milliseconds
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors if any
        document.getElementById('confirmation-message').innerHTML = 'Error occurred. Please try again later.';
      });
}

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
