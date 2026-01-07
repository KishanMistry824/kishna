





// const express = require("express");
// const router = express.Router();
// const {
//   createJob,
//   updateJob,
//   getAllJobs,
//   getJobById,
//   deleteJob,
// } = require("../controllers/adminJobController");

// // =================== JOB ROUTES ===================

// // Create job
// router.post("/admin/job/", createJob);

// // Get all jobs
// router.get("/", getAllJobs);

// // Get job by ID
// router.get("/:id", getJobById);

// // Update job
// router.put("/:id", updateJob);

// // Delete   
// router.delete("/:id", deleteJob);

// module.exports = router;






const express = require("express");
const router = express.Router();
const {
  createJob,
  updateJob,
  getAllJobs,
  getJobById,
  deleteJob,
} = require("../controllers/adminJobController");

// Routes
router.post("/", createJob);        // POST /api/admin/job
router.get("/", getAllJobs);       // GET /api/admin/job
router.get("/:id", getJobById);    // GET /api/admin/job/:id
router.put("/:id", updateJob);     // PUT /api/admin/job/:id
router.delete("/:id", deleteJob);  // DELETE /api/admin/job/:id

module.exports = router;
