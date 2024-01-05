<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Your email address where you want to receive messages
    $to = "tapsmcgzee8@gmail.com";

    // Subject of the email
    $subject = "New Contact Form Submission";

    // Compose the email message
    $email_message = "Name: $name\n";
    $email_message .= "Email: $email\n\n";
    $email_message .= "Message:\n$message";

    // Set headers
    $headers = "From: $email";

    // Attempt to send the email
    if (mail($to, $subject, $email_message, $headers)) {
        // Email sent successfully
        echo "Thank you for contacting me! I will get back to you soon.";
    } else {
        // Email failed to send
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // If the form is not submitted, redirect to the homepage or display an error message
    header("Location: /portfolio_website");
    exit();
}
?>
