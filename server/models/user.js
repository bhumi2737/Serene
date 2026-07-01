// models/User.js - cross-platform re-export for model filename casing
// On case-sensitive filesystems some imports use "../models/User".
// Re-export the canonical implementation in ./user.js
module.exports = require("./user");
// models/User.js - User Schema
// This defines what a "User" looks like in our MongoDB database

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true, // removes extra spaces
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true, // no two users can have same email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Hash password BEFORE saving to database
// This runs automatically whenever a user is saved
userSchema.pre("save", async function () {
  // Only hash if password was changed (not on other updates)
  if (!this.isModified("password")) return;

  // If password is already hashed, skip hashing it again
  if (this.password && (this.password.startsWith("$2a$") || this.password.startsWith("$2b$") || this.password.startsWith("$2y$"))) {
    return;
  }

  // "salt" makes hashing more secure (10 = complexity level)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password in DB
// Used during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);