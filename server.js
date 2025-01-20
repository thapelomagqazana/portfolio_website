const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
  origin: ["http://localhost:5000", "https://thapelo-magqazana-portfolio.up.railway.app", "http://127.0.0.1:8080"], // Allow both local and production domains
  methods: "GET,POST,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static("public"));

// Handle form submission
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: `${email}`,
    to: "tapsmcgzee8@gmail.com", // Receiver's email address
    subject: `Message from ${name}`,
    text: `Message: ${message}\n\nBest Regards,\n${name}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }

    console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
