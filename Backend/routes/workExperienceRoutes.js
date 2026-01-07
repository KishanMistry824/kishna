const express = require("express");
const router = express.Router();
const { createOrUpdateWork, getWork } = require("../controllers/workExperienceController");

router.post("/", createOrUpdateWork);      // create/update
router.get("/:userId", getWork);           // fetch

module.exports = router;
