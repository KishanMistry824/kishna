const User = require("../models/User");
const bcrypt = require("bcryptjs");

// 🔐 Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const emailTrimmed = email.trim();
    const roleLower = role.toLowerCase();

    // 🔎 Find user by email and role
    const user = await User.findOne({ email: emailTrimmed, role: roleLower });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials or role mismatch" });
    }

    // 🔑 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ Success — respond with user details (omit password)
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      message: "Login successful",
      user: userData, // includes _id
      token: "dummy-token-if-not-using-JWT"
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
