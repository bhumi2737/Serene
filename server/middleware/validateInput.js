// middleware/validateInput.js - Request validation helper

const validateMood = (req, res, next) => {
  const { mood, date } = req.body;
  const validMoods = ["Low", "Okay", "Good", "Great", "Amazing"];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!mood || !validMoods.includes(mood) || !date || !dateRegex.test(date)) {
    return res.status(400).json({ message: "Invalid mood or date." });
  }
  next();
};

const validateJournal = (req, res, next) => {
  const { title, body } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    title.length > 200 ||
    typeof body !== "string" ||
    !body.trim() ||
    body.length > 10000
  ) {
    return res.status(400).json({ message: "Invalid journal entry." });
  }
  next();
};

const validateGratitude = (req, res, next) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Invalid gratitude entry." });
  }

  // Check each item is a string and max 500 characters
  const allItemsValid = items.every(item => typeof item === "string" && item.length <= 500);
  if (!allItemsValid) {
    return res.status(400).json({ message: "Invalid gratitude entry." });
  }

  // Check that at least one item is not empty
  const hasNonEmptyItem = items.some(item => item.trim() !== "");
  if (!hasNonEmptyItem) {
    return res.status(400).json({ message: "Invalid gratitude entry." });
  }

  next();
};

module.exports = {
  validateMood,
  validateJournal,
  validateGratitude
};
