const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // optional reference to User
  },
  role: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("WorkExperience", workExperienceSchema);
