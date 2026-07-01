const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    mood: {
      type: String,
      required: true,
      enum: ["Low", "Okay", "Good", "Great", "Amazing"],
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to make sure a user can only have one mood logged per date
moodSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Mood", moodSchema);
