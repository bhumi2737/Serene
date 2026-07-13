// routes/authRoutes.js - Auth Routes
// This file defines the URL paths for auth-related requests

const express = require("express");
const router = express.Router();
const { registerUser, loginUser, googleLogin, getMe } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

// POST /api/auth/register  → Register new user
router.post("/register", registerUser);

// POST /api/auth/login  → Login user
router.post("/login", loginUser);

// POST /api/auth/google  → Authenticate via Google
router.post("/google", googleLogin);

// GET /api/auth/me  → Get logged-in user's profile (protected route)
// "protect" middleware runs first to verify the token
router.get("/me", protect, getMe);

module.exports = router;