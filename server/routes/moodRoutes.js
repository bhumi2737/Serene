const express = require("express");
const router = express.Router();
const { getMoods, saveMood } = require("../controllers/moodController");
const protect = require("../middleware/authMiddleware");

// GET /api/moods - Retrieve all mood logs for the authenticated user
router.get("/", protect, getMoods);

// POST /api/moods - Save or update a mood log for a specific date
router.post("/", protect, saveMood);

module.exports = router;
