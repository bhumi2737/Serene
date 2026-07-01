const Journal = require("../models/Journal");

// @desc    Get user's journal entries
// @route   GET /api/journals
// @access  Private
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new journal entry
// @route   POST /api/journals
// @access  Private
const createJournal = async (req, res) => {
  try {
    const { date, title, body } = req.body;

    if (!date || !title || !body || !title.trim() || !body.trim()) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const journal = await Journal.create({
      userId: req.user.id,
      date,
      title: title.trim(),
      body: body.trim(),
    });

    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a journal entry
// @route   DELETE /api/journals/:id
// @access  Private
const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;

    const journal = await Journal.findOne({ _id: id, userId: req.user.id });

    if (!journal) {
      return res.status(404).json({ message: "Entry not found." });
    }

    await journal.deleteOne();

    res.status(200).json({ message: "Deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJournals,
  createJournal,
  deleteJournal,
};
