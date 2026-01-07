const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // link to User collection
    required: true,
    unique: true, // one personal info per user
  },
  dob: Date,
  gender: String,
  nationality: String,
  address: String,
  linkedin: String,
  profileImage: String, // store filename or URL
}, { timestamps: true });

module.exports = mongoose.model("PersonalInfo", personalInfoSchema);
