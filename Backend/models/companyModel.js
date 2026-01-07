import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  openJobs: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  industry: { type: String, required: true },
  url: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Company", companySchema);
