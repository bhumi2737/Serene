// server.js - Main entry point for Serene backend
// This file starts the Express server and connects everything together

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

app.use(helmet());

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
})); // Allows frontend (React) to talk to backend
app.use(express.json()); // Allows backend to read JSON from requests
app.use(mongoSanitize());

// Rate Limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: "Too many requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false
});
app.use("/api", generalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false
});
app.use("/api/auth", authLimiter);

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

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    database: require("./config/db").isConnected() ? "connected" : "disconnected"
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});