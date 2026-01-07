// const mongoose = require("mongoose");
// const Job = require("../models/JobData");

// // Build filters from query params
// const buildFilters = (query) => {
//   const filters = {};

//   if (query.keyword) {
//     filters.$or = [
//       { title: { $regex: query.keyword, $options: "i" } },
//       { "company.name": { $regex: query.keyword, $options: "i" } },
//       { tags: { $regex: query.keyword, $options: "i" } }, // ✅ tag search
//     ];
//   }

//   if (query.experience) filters.experience = query.experience;
//   if (query.companyType?.length) filters["company.companyType"] = { $in: [].concat(query.companyType) };
//   if (query.category?.length) filters.category = { $in: [].concat(query.category) };
//   if (query.city?.length) filters["locations.city"] = { $in: [].concat(query.city) };
//   if (query.education?.length) filters.education = { $in: [].concat(query.education) };
//   if (query.type?.length) filters.type = { $in: [].concat(query.type) };
//   if (query.salaryRange?.length) filters.salaryRange = { $in: [].concat(query.salaryRange) };

//   return filters;
// };

// // GET /api/jobs
// const getJobs = async (req, res) => {
//   try {
//     const filters = buildFilters(req.query);
//     const jobs = await Job.find(filters).sort({ postedAt: -1 });
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET /api/jobs/:id
// const getJobById = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).json({ error: "Job not found" });
//     res.json(job);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// module.exports = { getJobs, getJobById};





const mongoose = require("mongoose");
const Job = require("../models/JobData");

// Helper: Build filters
const buildFilters = (query) => {
  const filters = {};
  if (query.keyword) {
    filters.$or = [
      { title: { $regex: query.keyword, $options: "i" } },
      { "company.name": { $regex: query.keyword, $options: "i" } },
      { tags: { $regex: query.keyword, $options: "i" } },
    ];
  }
  if (query.experience) filters.experienceLevel = query.experience;
  if (query.companyType?.length) filters["company.companyType"] = { $in: [].concat(query.companyType) };
  if (query.category?.length) filters.category = { $in: [].concat(query.category) };
  if (query.city?.length) filters["locations.city"] = { $in: [].concat(query.city) };
  if (query.education?.length) filters.education = { $in: [].concat(query.education) };
  if (query.type?.length) filters.type = { $in: [].concat(query.type) };
  return filters;
};

// GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const filters = buildFilters(req.query);
    const jobs = await Job.find(filters).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/jobs/:id/like  OR  /api/jobs/code/:jobCode/like
const toggleLike = async (req, res) => {
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

    const job = isValidObjectId
      ? await Job.findById(req.params.id)
      : req.params.jobCode
      ? await Job.findOne({ jobCode: req.params.jobCode })
      : null;

    if (!job) return res.status(404).json({ error: "Job not found" });

    const userId = req.user?._id || req.body.userId;
    if (!userId) return res.status(400).json({ error: "UserId required" });

    if (job.likedBy.some((id) => id.toString() === userId.toString())) {
      job.likedBy = job.likedBy.filter((id) => id.toString() !== userId.toString());
    } else {
      job.likedBy.push(userId);
    }

    await job.save();
    res.json({
      liked: job.likedBy.some((id) => id.toString() === userId.toString()),
      likedBy: job.likedBy,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/jobs/:id/save  OR  /api/jobs/code/:jobCode/save
const toggleSave = async (req, res) => {
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

    const job = isValidObjectId
      ? await Job.findById(req.params.id)
      : req.params.jobCode
      ? await Job.findOne({ jobCode: req.params.jobCode })
      : null;

    if (!job) return res.status(404).json({ error: "Job not found" });

    const userId = req.user?._id || req.body.userId;
    if (!userId) return res.status(400).json({ error: "UserId required" });

    if (job.savedBy.some((id) => id.toString() === userId.toString())) {
      job.savedBy = job.savedBy.filter((id) => id.toString() !== userId.toString());
    } else {
      job.savedBy.push(userId);
    }

    await job.save();
    res.json({
      saved: job.savedBy.some((id) => id.toString() === userId.toString()),
      savedBy: job.savedBy,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const incrementjobView = async (req,res) => {
  try{
    const job =await Job.findOneAndUpdate(
      { jobCode : req.params.jobCode },
      { $inc: {view: 1 } },
      { new:true }
    );

    if(!job) {
      return res.status(404).json({ error: "Job Not Found" });
    }

    res.json({ success: true, view: job.views });
  } catch (error){
    console.log("Error Incrementing job View:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET Job Detalis

const getJobByCode = async (req,res) => {
  try{
    const { jobCode } = req.params;

    const job = await Job.findOne({ jobCode });

    if(!job){
      return res.status(404).json({ error: "Job Not Found" });
    }

    res.status(200).json(job);
  } catch (error){
    console.log("Error Fetching Job by Code:", error);
    res.status(500).json({ message: "Internal Server Error", error:error.message });
  }
};

const getSaveedJobsbyUser = async (req,res) => {
  try{
    const { userId } = req.params;

    if(!userId){
      return res.status(400).json({ error: "UserId required"});
    }

    const savedJobs = await Job.find({ savedBy: userId }).sort({ postedAt: -1 });

    res.json(savedJobs);
  } catch(error){
    console.log("error fetching saved jobs:", error);
    res.status(500).json({ error: "Internal Server Error"});
  }
};


module.exports = { getJobs, getJobById, toggleLike, toggleSave, incrementjobView, getJobByCode, getSaveedJobsbyUser };

