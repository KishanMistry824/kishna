// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const { registerUser } = require("../controllers/userController");

// router.post("/api/register", registerUser);

// // ✅ NEW: Get basic info from userId
// router.get("/basic-info", async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const user = await User.findById(userId).select("fullName email mobile");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { registerUser } = require("../controllers/userController");

// ✅ Only "/register" because we mount this under "/api/users" in server.js
router.post("/register", registerUser);

// ✅ NEW: Get basic info from userId
router.get("/basic-info/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("User ID" + userId);
  try {
    const user = await User.findById(userId).select("fullName email mobile");
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;
