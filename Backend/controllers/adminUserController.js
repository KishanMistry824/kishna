const User = require('../models/User');

// ===============================
// Fetch single user by ID
// ===============================
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "User Not Found" });

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// Get all users for admin
// ===============================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// Block / Unblock user
// ===============================
exports.blockUnblockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.json({ success: true, isBlocked: user.isBlocked });
  } catch (error) {
    console.error("Error blocking/unblocking user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// Delete user
// ===============================
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    return res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
