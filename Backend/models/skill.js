


const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// This line prevents OverwriteModelError
module.exports = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);







// import mongoose from 'mongoose';


// const SkillSchema = new mongoose.Schema({
// userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// name: { type: String, required: true, trim: true },
// category: { type: String, required: true },
// proficiency: { type: String, required: true },
// experience: { type: Number, required: true },
// endorsements: { type: Number, default: 0 },
// }, { timestamps: true });


// export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);