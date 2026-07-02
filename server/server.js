// server.js - Main entry point for Serene backend
// This file starts the Express server and connects everything together

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allows frontend (React) to talk to backend
app.use(express.json()); // Allows backend to read JSON from requests

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

const moodRoutes = require("./routes/moodRoutes");
const journalRoutes = require("./routes/journalRoutes");
const gratitudeRoutes = require("./routes/gratitudeRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/moods", moodRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/journal", journalRoutes); // Support singular fallback requested by frontend
app.use("/api/gratitude", gratitudeRoutes);
app.use("/api/chat", chatRoutes);

const reportRoutes = require("./routes/reportRoutes");
app.use("/api/report", reportRoutes);

// Test route - just to check if server is running
app.get("/", (req, res) => {
  res.send("Serene API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});