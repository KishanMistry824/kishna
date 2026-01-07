const express = require("express");
const router = express.Router();
const educationController = require("../controllers/educationController");

// Routes
router.post("/", educationController.createEducation);
router.get("/:userId", educationController.getEducation);
router.put("/:userId", educationController.updateEducation);

module.exports = router;
