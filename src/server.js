const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

// configure body-parser middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // replace with your email address
    pass: 'your-email-password' // replace with your email password
  }
});

// define endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // create email message
  const mailOptions = {
    from: 'your-email@gmail.com', // replace with your email address
    to: 'recipient-email@example.com', // replace with the recipient email address
    subject: 'New form submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Form submission successful');
    }
  });
});

// start server
app.listen(port, () => console.log(`Server started on port ${port}`));
