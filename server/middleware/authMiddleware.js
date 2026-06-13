// middleware/authMiddleware.js - Protect Routes
// This runs BEFORE protected route handlers to verify the user is logged in

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { isConnected } = require("../config/db");
const fileStore = require("../services/fileUserStore");
const useFileStoreFlag = process.env.USE_FILE_DB === "true";

const protect = async (req, res, next) => {
  let token;

  // Check if token is present in the Authorization header
  // Token format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract just the token part (remove "Bearer ")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const useFile = useFileStoreFlag || !isConnected();
      if (!useFile) {
        // Find the user from MongoDB and attach to request
        req.user = await User.findById(decoded.id).select("-password");
      } else {
        // Fallback: load user from file store
        const u = await fileStore.findById(decoded.id);
        if (u) {
          const { password, ...rest } = u;
          req.user = rest;
        } else {
          req.user = null;
        }
      }

      return next(); // Move on to the actual route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;