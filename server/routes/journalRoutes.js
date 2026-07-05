const express = require("express");
const router = express.Router();
const { getJournals, createJournal, deleteJournal } = require("../controllers/journalController");
const { analyseJournal } = require("../controllers/journalAnalyseController");
const protect = require("../middleware/authMiddleware");
const Journal = require("../models/Journal");

// GET /api/journals - Retrieve all journal entries for the authenticated user
router.get("/", protect, getJournals);

// POST /api/journals/analyse - Analyse the emotional tone of a journal entry
router.post("/analyse", protect, analyseJournal);

const { validateJournal } = require("../middleware/validateInput");

// POST /api/journals - Create a new journal entry
router.post("/", protect, validateJournal, createJournal);

// PATCH /api/journals/:id/analyse - Update an existing journal entry with analysis results
router.patch("/:id/analyse", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { emotions, summary } = req.body;

    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { emotions, summary },
      { new: true }
    );

    if (!updatedJournal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    return res.status(200).json(updatedJournal);
  } catch (error) {
    console.error("Error updating journal analysis:", error);
    return res.status(500).json({ message: "Server error updating journal analysis." });
  }
});

// DELETE /api/journals/:id - Delete a journal entry by ID
router.delete("/:id", protect, deleteJournal);

module.exports = router;
