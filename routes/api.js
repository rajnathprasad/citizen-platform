const express = require('express');
const router = express.Router();
require('dotenv').config(); // Make sure .env variables are loaded

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let model;
try {
  model = genAI.getGenerativeModel({ model: "gemini-pro" });
} catch (err) {
  console.error("❌ Error initializing Gemini model:", err.message);
}

router.post('/gemini-chat', async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!model) {
      throw new Error("Gemini model not initialized.");
    }

    console.log('📩 Message received:', message);
    console.log('📜 Chat history:', chatHistory);

    const chat = model.startChat({ history: chatHistory || [] });
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    console.log('🤖 Gemini replied:', reply);
    res.json({ reply });

  } catch (err) {
    console.error('❌ Gemini API error:', err);
    res.status(500).json({ reply: "Sorry, something went wrong with Gemini." });
  }
});

module.exports = router;
