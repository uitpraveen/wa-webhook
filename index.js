// index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON bodies
app.use(bodyParser.json());

// Route for handling WhatsApp webhooks
app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  
  // Example: Check if the message is from WhatsApp
  if (req.body && req.body.messages) {
    req.body.messages.forEach(message => {
      console.log(`Message received from ${message.from}:`, message.text);
      // Handle the message as needed, e.g., store it, process it, etc.
    });
  }

  // Respond with a 200 status to acknowledge receipt
  res.status(200).send('Webhook received');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
