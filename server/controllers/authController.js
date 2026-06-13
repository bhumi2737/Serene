// controllers/authController.js - Auth Logic
// This file handles what happens when user registers or logs in

const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { isConnected } = require("../config/db");
const fileStore = require("../services/fileUserStore");
const useFileStoreFlag = process.env.USE_FILE_DB === "true";

// Helper function to generate a JWT token
// JWT = JSON Web Token, used to keep user "logged in"
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },           // payload (what we store inside the token)
    process.env.JWT_SECRET,   // secret key from .env
    { expiresIn: "7d" }       // token expires in 7 days
  );
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public (anyone can access)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const useFile = useFileStoreFlag || !isConnected();
    if (!useFile) {
      // Use MongoDB
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: "User already exists" });
      const user = await User.create({ name, email, password });
      return res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    }

    // Fallback: file-backed store
    const userExists = await fileStore.findByEmail(email);
    if (userExists) return res.status(400).json({ message: "User already exists" });
    const user = await fileStore.createUser({ name, email, password });
    return res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   POST /api/auth/login
// @desc    Login user & return token
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Please fill all fields" });

    const useFile = useFileStoreFlag || !isConnected();
    if (!useFile) {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
      }
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Fallback: file store
    const user = await fileStore.findByEmail(email);
    if (user && (await fileStore.verifyPassword(user, password))) {
      return res.json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
    }
    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/auth/me
// @desc    Get current logged-in user's profile
// @access  Private (need token)
const getMe = async (req, res) => {
  try {
    if (isConnected()) {
      const user = await User.findById(req.user.id).select("-password");
      return res.json(user);
    }

    const user = await fileStore.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password, ...rest } = user;
    return res.json(rest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getMe };