// config/db.js - MongoDB Connection
// This file connects our app to MongoDB Atlas (cloud database)

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MONGO_URI comes from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Warning: MongoDB connection failed: ${error.message}`);
    // Don't exit the process — allow the server to run without DB for development
    return false;
  }
};

// Helper to check current connection state (1 = connected)
const isConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

module.exports = connectDB;
module.exports.isConnected = isConnected;