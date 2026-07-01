const Gratitude = require("../models/Gratitude");

// @desc    Get user's gratitude logs
// @route   GET /api/gratitude
// @access  Private
const getGratitude = async (req, res) => {
  try {
    const logs = await Gratitude.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update a gratitude log
// @route   POST /api/gratitude
// @access  Private
const saveGratitude = async (req, res) => {
  try {
    const { date, items } = req.body;

    const isDateValid = typeof date === "string" && date.trim() !== "";
    const isItemsValid =
      Array.isArray(items) &&
      items.length > 0 &&
      items.some((item) => typeof item === "string" && item.trim() !== "");

    if (!isDateValid || !isItemsValid) {
      return res.status(400).json({
        message: "Date must be a non-empty string and items must contain at least one non-empty string.",
      });
    }

    const savedLog = await Gratitude.findOneAndUpdate(
      { userId: req.user.id, date },
      { items },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json(savedLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGratitude,
  saveGratitude,
};
