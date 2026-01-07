const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },

  username: { type: String, unique: true }, // Auto-generated from fullName
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  block: { type: Boolean, default: false },

  workStatus: {
    type: String,
    enum: ["fresher", "experienced"],
    required: true
  },
  promotions: { type: Boolean, default: false },

  // Optional: For future dashboard expansion
  role: {
    type: String,
    enum: ["candidate", "employer", "admin"],
    default: "candidate"
  },
  company: { type: String },
  resume: { type: String },
  gender: { type: String }
}, { timestamps: true });

// 🔐 Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🧠 Auto-generate username from fullName
userSchema.pre("save", function (next) {
  if (!this.username && this.fullName) {
    const name = this.fullName.replace(/\s+/g, "").toLowerCase();
    this.username = `${name}@${uuidv4().slice(0, 6)}`;
  }
  next();
});

// 🔁 Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
