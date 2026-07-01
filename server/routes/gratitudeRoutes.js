const express = require("express");
const router = express.Router();
const { getGratitude, saveGratitude } = require("../controllers/gratitudeController");
const protect = require("../middleware/authMiddleware");

// GET /api/gratitude - Retrieve all gratitude entries for the authenticated user
router.get("/", protect, getGratitude);

// POST /api/gratitude - Save or update a gratitude entry for a specific date
router.post("/", protect, saveGratitude);

module.exports = router;
