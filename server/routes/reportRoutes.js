const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Register POST /generate route to call generateReport controller
router.post("/generate", reportController.generateReport);

module.exports = router;
