const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, 
  },
  resumePath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
