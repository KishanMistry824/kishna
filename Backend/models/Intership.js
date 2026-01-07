const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
