const axios = require("axios");

const chat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "Messages are required." });
    }

    const groqMessages = [
      {
        role: "system",
        content: "You are Serene, a calm and gentle mental wellness companion. You listen with empathy, reflect feelings back without judgment, and ask one thoughtful question at a time. You never give medical advice. You always encourage professional help for serious concerns. Keep all responses to 2-4 sentences maximum. Use warm, simple language."
      },
      ...messages.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      }))
    ];

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        max_tokens: 300,
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.GROQ_API_KEY
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Groq Chat Error:", error.response?.data || error.message);
    return res.status(500).json({ message: "AI service error. Please try again." });
  }
};

module.exports = { chat };