const WorkExperience = require("../models/WorkExperience");

// POST: Create or update work experience
exports.createOrUpdateWork = async (req, res) => {
  const { userId, workExperiences } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (!Array.isArray(workExperiences) || !workExperiences.length) {
    return res.status(400).json({ message: "At least one work experience is required" });
  }

  try {
    // Remove existing experiences for the user
    await WorkExperience.deleteMany({ userId });

    // Map userId to each experience
    const experiencesToInsert = workExperiences.map((exp) => ({
      ...exp,
      userId,
    }));

    const savedExperiences = await WorkExperience.insertMany(experiencesToInsert);

    res.status(201).json(savedExperiences);
  } catch (err) {
    console.error("Error saving work experience:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET: Fetch work experience for a user
exports.getWork = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const experiences = await WorkExperience.find({ userId }).sort({ startDate: -1 });
    res.status(200).json(experiences);
  } catch (err) {
    console.error("Error fetching work experience:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
