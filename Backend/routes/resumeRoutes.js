// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const upload = require("../middleware/upload");
// const { uploadResume } = require("../controllers/resumeController");

// router.post(
//   "/upload",
//   (req, res, next) => {
//     upload.single("resume")(req, res, function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ msg: err.message });
//       } else if (err) {
//         return res.status(400).json({ msg: err.message });
//       }
//       next();
//     });
//   },
//   uploadResume
// );





// module.exports = router;




const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const resumeController = require("../controllers/resumeController");
const multer = require("multer");

// Upload (uses multer middleware)
router.post("/upload", upload.single("resume"), resumeController.uploadResume);

// Optional: get resume metadata
router.get("/:id", resumeController.getResume);

// View (in browser)
router.get("/:id/view", resumeController.viewResume);

// Download (force download)
router.get("/:id/download", resumeController.downloadResume);

// Delete resume
router.delete("/:id", resumeController.deleteResume);

// Get resume by userId
router.get("/user/:userId", resumeController.getResumeByUser);



module.exports = router;
