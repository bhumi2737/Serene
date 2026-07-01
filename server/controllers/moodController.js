const Mood = require("../models/Mood");

// @desc    Get user's logged moods
// @route   GET /api/moods
// @access  Private
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update a mood log for a specific date
// @route   POST /api/moods
// @access  Private
const saveMood = async (req, res) => {
  try {
    const { date, mood } = req.body;

    if (!date || !mood) {
      return res.status(400).json({ message: "Date and mood are required." });
    }

    const savedMood = await Mood.findOneAndUpdate(
      { userId: req.user.id, date },
      { mood },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json(savedMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMoods,
  saveMood,
};
