const axios = require("axios");

const analyseJournal = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Journal text is required." });
    }

    const prompt = `Analyse the following journal entry and respond ONLY with a valid JSON object. No markdown, no backticks, no extra text — just raw JSON. The JSON must have exactly two fields: 'emotions' (an array of 3-5 lowercase single-word emotion strings like 'calm', 'anxious', 'hopeful', 'grateful', 'sad', 'excited', 'overwhelmed', 'content') and 'summary' (one sentence of max 20 words summarising the emotional tone). Journal entry: ${text}`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.3
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.GROQ_API_KEY
        }
      }
    );

    let reply = response.data.choices[0].message.content;
    reply = reply.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(reply);
    return res.status(200).json({ emotions: parsed.emotions, summary: parsed.summary });

  } catch (error) {
    console.error("Journal Analyse Error:", error.response?.data || error.message);
    return res.status(200).json({ emotions: ["reflective"], summary: "A personal journal entry." });
  }
};

module.exports = { analyseJournal };