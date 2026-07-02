const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { chat } = require("../controllers/chatController");

// POST /api/chat - Empathetic chat companion check-in
router.post("/", protect, chat);

module.exports = router;
