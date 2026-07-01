const express = require("express");
const router = express.Router();
const { getJournals, createJournal, deleteJournal } = require("../controllers/journalController");
const protect = require("../middleware/authMiddleware");

// GET /api/journals - Retrieve all journal entries for the authenticated user
router.get("/", protect, getJournals);

// POST /api/journals - Create a new journal entry
router.post("/", protect, createJournal);

// DELETE /api/journals/:id - Delete a journal entry by ID
router.delete("/:id", protect, deleteJournal);

module.exports = router;
