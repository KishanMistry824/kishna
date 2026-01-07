// middleware/AdminAuthMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ===============================
// Verify JWT token
// ===============================
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // must have 'id' in payload
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ===============================
// Check if user is Admin
// ===============================
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID missing in token" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "admin") return res.status(403).json({ message: "Admins only" });

    // Attach full user object for convenience
    req.userFull = user;
    next();
  } catch (err) {
    console.error("Admin check error:", err);
    return res.status(500).json({ message: "Server error during admin check" });
  }
};

module.exports = { verifyToken, isAdmin };
