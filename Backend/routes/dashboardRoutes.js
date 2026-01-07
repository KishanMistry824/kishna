// routes/dashboardRoutes.js

const express = require("express");
const router = express.Router();
//const upload = require("../middleware/upload");
const { savePersonalInfo, getPersonalInfo } = require("../controllers/dashboardController");

// ✅ Middleware: Confirm route hit for debugging
router.use((req, res, next) => {
  console.log(`📥 [${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ POST: Save or Update Personal Info (One-time entry)
//router.post("/personal-info", upload.single("profileImage"), savePersonalInfo);

// ✅ GET: Fetch Personal Info by User ID
router.get("/personal-info/:userId", getPersonalInfo);

// ✅ Test Route (optional, for connectivity test)
router.get("/test", (req, res) => {
  console.log("✅ /api/test route hit");
  res.send("Test route working!");
});

module.exports = router;
