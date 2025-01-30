// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai'); // Import OpenAI package
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON bodies
app.use(bodyParser.json());

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for OpenAI API key
});
const openai = new OpenAIApi(configuration);

// Route for handling WhatsApp webhooks
app.post('/webhook', async (req, res) => {
  console.log('Received webhook:', req.body);
  
  // Example: Check if the message is from WhatsApp
  if (req.body && req.body.messages) {
    req.body.messages.forEach(async (message) => {
      console.log(`Message received from ${message.from}:`, message.text);
      
      // Send the message to ChatGPT using OpenAI package
      try {
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo', // or the model you want to use
          messages: [{ role: 'user', content: message.text }],
        });

        const chatGptResponse = response.data.choices[0].message.content;

        // Here you would send the response back to the user via WhatsApp API
        console.log(`Response from ChatGPT: ${chatGptResponse}`);
        // Send chatGptResponse back to the user using your WhatsApp API integration

      } catch (error) {
        console.error('Error communicating with ChatGPT:', error);
      }
    });
  }

  // Respond with a 200 status to acknowledge receipt
  res.status(200).send('Webhook received');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
