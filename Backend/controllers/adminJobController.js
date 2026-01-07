
const Job = require("../models/JobData");

// ===== Create Job =====
const createJob = async (req,res) => {
  try {
    const newjob = new Job(req.body);
    const saveJob = await newjob.save();
    res.status(201).json(saveJob);
  }catch (err) {
    console.log("Create Job Error: ",err);
    res.status(400).json({ message: err.message, code: err.code});
  }
};

// ===== Update Job =====

const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ===== Get All Jobs =====
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ===== Get Job by ID =====
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    console.error("Error fetching job:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ===== Delete Job =====
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createJob,
  updateJob,
  getAllJobs,
  getJobById,
  deleteJob,
};
