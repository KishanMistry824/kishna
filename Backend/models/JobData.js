const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobCode: { type: String, required: true, unique: true }, 
  title: { type: String, required: true },

  company: {
    name: { type: String, required: true },
    logoUrl: { type: String },
    industry: { type: String },
    companyType: { type: String },
    website: { type: String },
    linkedin: { type: String },
    glassdoor: { type: String },
  },

  locations: [
    {
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
  ],

  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote", "Temporary"],
    required: true,
  },

  tags: [{ type: String }],

  salary: {
    min: { type: String },
    max: { type: String },
    currency: { type: String },
  },

  experienceLevel: { type: String },
  category: { type: String },

  // === Job Specific ===
  description: { type: String },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  education: [{ type: String }],
  skills: [{ type: String }],   

  benefits: [{ type: String }],
  perks: [{ type: String }],    

  isFeatured: { type: Boolean, default: false },
  applyUrl: { type: String },

  postedAt: { type: Date, default: Date.now },
  deadline: { type: Date },

  views: { type: Number, default: 0 },

  // User interactions
  savedBy: { type: [String], default: [] },
  likedBy: { type: [String], default: [] },

  // === Stats ===
  applicationStats: {
    applied: { type: Number, default: 0 },
    shortlisted: { type: Number, default: 0 },
    hired: { type: Number, default: 0 },
  },

  status: { type: String, default: "active" },

  remoteOptions: {
    type: String,
    enum: ["Onsite", "Remote", "Hybrid"],
  },

  attachments: [{ type: String }],

  // === Hiring team info ===
  hiringTeam: [
    {
      name: { type: String },
      role: { type: String },
      email: { type: String },
      phone: { type: String },
    },
  ],

  // === Company/job updates ===
  recentUpdates: [
    {
      message: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
});


module.exports = mongoose.model("Job", JobSchema);
