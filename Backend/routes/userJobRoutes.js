

// const express = require("express");
// const { getJobs, getJobById } = require("../controllers/userJobController");
// //const { getJobs, getJobById, toggleLike, toggleSave } = require("../controllers/userJobController");
// // const { protect } = require("../middleware/AdminauthMiddleware");

// const router = express.Router();

// router.get("/", getJobs);         // Public: fetch all jobs
// router.get("/:id", getJobById);   // Public: fetch single job

// // Auth needed
// // router.put("/:id/like", protect, toggleLike);
// // router.put("/:id/save", protect, toggleSave);

// module.exports = router;

const express = require("express");
const {
  getJobs,
  getJobById,
  toggleLike,
  toggleSave,
  incrementjobView,
  getJobByCode,
  getSaveedJobsbyUser
} = require("../controllers/userJobController");

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.put("/code/:jobCode/like", toggleLike);
router.put("/code/:jobCode/save", toggleSave);
router.put("/code/:jobCode/view", incrementjobView);
router.get("/code/:jobCode", getJobByCode);
router.get("/saved/:userId", getSaveedJobsbyUser);

module.exports = router;
