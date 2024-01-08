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
        fetch('http://localhost:3000/send-email', {
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