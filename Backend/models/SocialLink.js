const mongoose = require("mongoose");

const SocialLinkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  platform: { type: String, required: true },
  url: { type: String, required: true },
  isConnected: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("SocialLink", SocialLinkSchema);
