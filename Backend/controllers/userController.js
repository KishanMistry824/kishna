const path = require("path");
const User = require(path.resolve(__dirname, "../models/User"));

// 📩 Register Controller
const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      mobile,
      workStatus,
      promotions,
      username // This is auto-generated in frontend and saved here
    } = req.body;

    // Role is always candidate
    const role = "candidate";

    // Create new user object
    const newUser = new User({
      fullName,
      username,
      email,
      password,
      mobile,
      workStatus,
      promotions,
      role
    });

    await newUser.save();

    res.status(201).json({
      message: "✅ User registered successfully!",
      user: newUser,
    });

  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ error: error.message || "❌ Registration failed!" });
  }
};

module.exports = { registerUser };
