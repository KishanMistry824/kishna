// const Resume = require("../models/Resume");
// //const path = rquire("path");


// exports.uploadResume = async (req, res) => {
//   try {
//     console.log("Uploaded File:", req.file);   // Debug line

//     if (!req.file) {
//       return res.status(400).json({ msg: "No file uploaded" });
//     }

//     const userId = req.body.userId  || "anonymous"; // Replace with actual user ID from auth in real app
//     const filePath = req.file.path;

//     const resume = new Resume({
//       userId,
//       resumePath: filePath,
//     });

//     await resume.save();

//     res.json({
//       msg: "Resume uploaded successfully",
//       resumePath: filePath,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Error uploading resume", error });
//   }
// };









const Resume = require("../models/Resume");
const path = require("path");
const fs = require("fs");

// ==========================
//  Upload / Replace Resume
// ==========================
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const userId = req.body.userId;
    const newPath = req.file.path; // uploads/xxx.pdf

    // 1️⃣ Check if user already has a resume
    const existingResume = await Resume.findOne({ userId });

    if (existingResume) {
      // 2️⃣ Delete old resume file if exists
      if (existingResume.resumePath && fs.existsSync(existingResume.resumePath)) {
        fs.unlinkSync(existingResume.resumePath);
      }

      // 3️⃣ Update existing record
      existingResume.resumePath = newPath;
      existingResume.uploadedAt = new Date();

      await existingResume.save();

      return res.json({
        msg: "Resume updated successfully",
        resumeId: existingResume._id,
        resumePath: existingResume.resumePath,
      });
    }

    // 4️⃣ If no previous resume → create new entry
    const newResume = await Resume.create({
      userId,
      resumePath: newPath,
    });

    return res.json({
      msg: "Resume uploaded successfully",
      resumeId: newResume._id,
      resumePath: newResume.resumePath,
    });

  } catch (error) {
    console.error("uploadResume error:", error);
    return res
      .status(500)
      .json({ msg: "Error uploading resume", error: error.message });
  }
};

// ==========================
//     GET RESUME DETAILS
// ==========================
exports.getResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id).lean();
    if (!resume) return res.status(404).json({ msg: "Resume not found" });

    return res.json({ resume });

  } catch (err) {
    console.error("getResume error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

// ==========================
//       VIEW RESUME
// ==========================
exports.viewResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) return res.status(404).json({ msg: "Resume not found" });

    const filePath = path.join(__dirname, "..", resume.resumePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: "File not found on server" });
    }

    return res.sendFile(filePath);

  } catch (err) {
    console.error("viewResume error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

// ==========================
//     DOWNLOAD RESUME
// ==========================
exports.downloadResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) return res.status(404).json({ msg: "Resume not found" });

    const filePath = path.join(__dirname, "..", resume.resumePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: "File not found on server" });
    }

    const downloadName = path.basename(filePath);

    return res.download(filePath, downloadName);

  } catch (err) {
    console.error("downloadResume error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};



exports.getResumeByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const resume = await Resume.findOne({ userId });

    if (!resume) return res.json({ resume: null });

    return res.json({ resume });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};


exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ msg: "Resume not found" });

    // Remove file
    if (fs.existsSync(resume.resumePath)) {
      fs.unlinkSync(resume.resumePath);
    }

    // Remove from DB
    await Resume.findByIdAndDelete(id);

    return res.json({ msg: "Resume deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

