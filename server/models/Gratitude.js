const mongoose = require("mongoose");

const gratitudeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    items: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to make sure a user can only have one gratitude entry logged per date
gratitudeSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Gratitude", gratitudeSchema);
