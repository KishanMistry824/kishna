// const Education = require("../models/Education");

// // POST - Create new education info
// exports.createEducation = async (req, res) => {
//   const { userId, ...data } = req.body;

//   try {
//     const existing = await Education.findOne({ userId });
//     if (existing) {
//       return res.status(400).json({ message: "Education already exists" });
//     }

//     const newEdu = new Education({
//       userId,
//       secondary: {
//         tenth: {
//           score: data.tenthScore,
//           year: data.tenthYear,
//         },
//         twelfth: {
//           score: data.twelfthScore,
//           year: data.twelfthYear,
//         },
//       },
//       graduation: {
//         degree: data.gradDegree,
//         institute: data.gradInstitute,
//         score: data.gradScore,
//         startYear: data.gradStartYear,
//         endYear: data.gradEndYear,
//       },
//       postGraduation: {
//         degree: data.postGradDegree,
//         institute: data.postGradInstitute,
//         score: data.postGradScore,
//         startYear: data.postGradStartYear,
//         endYear: data.postGradEndYear,
//       },
//     });

//     await newEdu.save();
//     res.status(201).json(newEdu);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // GET - Fetch education by userId
// exports.getEducation = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const edu = await Education.findOne({ userId });

//     if (!edu) return res.status(404).json({ message: "No education found" });
//     res.status(200).json(edu);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // PUT - Update education by userId
// exports.updateEducation = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const data = req.body;

//     const updated = await Education.findOneAndUpdate(
//       { userId },
//       {
//         secondary: {
//           tenth: {
//             score: data.tenthScore,
//             year: data.tenthYear,
//           },
//           twelfth: {
//             score: data.twelfthScore,
//             year: data.twelfthYear,
//           },
//         },
//         graduation: {
//           degree: data.gradDegree,
//           institute: data.gradInstitute,
//           score: data.gradScore,
//           startYear: data.gradStartYear,
//           endYear: data.gradEndYear,
//         },
//         postGraduation: {
//           degree: data.postGradDegree,
//           institute: data.postGradInstitute,
//           score: data.postGradScore,
//           startYear: data.postGradStartYear,
//           endYear: data.postGradEndYear,
//         },
//       },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "Education not found" });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Update failed" });
//   }
// };







const Education = require("../models/Education");

// POST - Create new education info
exports.createEducation = async (req, res) => {
  try {
    const { userId, ...data } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const existing = await Education.findOne({ userId });
    if (existing) {
      return res.status(409).json({ message: "Education already exists" });
    }

    const newEdu = new Education({
      userId,
      secondary: {
        tenth: { score: data.tenthScore, year: data.tenthYear },
        twelfth: { score: data.twelfthScore, year: data.twelfthYear },
      },
      graduation: {
        degree: data.gradDegree,
        institute: data.gradInstitute,
        score: data.gradScore,
        startYear: data.gradStartYear,
        endYear: data.gradEndYear,
      },
      postGraduation: {
        degree: data.postGradDegree,
        institute: data.postGradInstitute,
        score: data.postGradScore,
        startYear: data.postGradStartYear,
        endYear: data.postGradEndYear,
      },
    });

    const saved = await newEdu.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("CreateEducation Error:", err);
    res.status(500).json({ error: "Server error while creating education." });
  }
};

// GET - Fetch education by userId
exports.getEducation = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const edu = await Education.findOne({ userId });
    if (!edu) return res.status(404).json({ message: "No education found" });

    res.status(200).json(edu);
  } catch (err) {
    console.error("GetEducation Error:", err);
    res.status(500).json({ error: "Server error while fetching education." });
  }
};

// PUT - Update education by userId
exports.updateEducation = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const data = req.body;
    const updated = await Education.findOneAndUpdate(
      { userId },
      {
        $set: {
          secondary: {
            tenth: { score: data.tenthScore, year: data.tenthYear },
            twelfth: { score: data.twelfthScore, year: data.twelfthYear },
          },
          graduation: {
            degree: data.gradDegree,
            institute: data.gradInstitute,
            score: data.gradScore,
            startYear: data.gradStartYear,
            endYear: data.gradEndYear,
          },
          postGraduation: {
            degree: data.postGradDegree,
            institute: data.postGradInstitute,
            score: data.postGradScore,
            startYear: data.postGradStartYear,
            endYear: data.postGradEndYear,
          },
        },
      },
      { new: true, upsert: false }
    );

    if (!updated)
      return res.status(404).json({ message: "Education not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("UpdateEducation Error:", err);
    res.status(500).json({ error: "Server error while updating education." });
  }
};
