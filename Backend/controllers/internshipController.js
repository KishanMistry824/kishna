const Internship = require("../models/Intership"); // ✅ fixed filename typo

// Create or Replace internships for a user
exports.createOrUpdateInternships = async (req, res) => {
  try {
    const { userId, internshipExperiences } = req.body;
    if (!userId || !Array.isArray(internshipExperiences)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Remove existing data for user
    await Internship.deleteMany({ userId });

    // Insert new data
    const insertedData = await Internship.insertMany(
      internshipExperiences.map(item => ({ ...item, userId }))
    );

    res.status(200).json({ message: "Internship data saved", data: insertedData });
  } catch (err) {
    console.error("❌ Error saving internship data:", err);
    res.status(500).json({ message: "Error saving data", error: err.message });
  }
};

// Get internships for a user
exports.getInternships = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Internship.find({ userId }).sort({ startDate: -1 });
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching internships:", err);
    res.status(500).json({ message: "Error fetching data", error: err.message });
  }
};

// Delete a single internship by ID
exports.deleteInternship = async (req, res) => {
  try {
    const internshipId = req.params.id;
    const deleted = await Internship.findByIdAndDelete(internshipId);
    if (!deleted) return res.status(404).json({ message: "Internship not found" });

    res.status(200).json({ message: "Internship deleted", deleted });
  } catch (err) {
    console.error("❌ Error deleting internship:", err);
    res.status(500).json({ message: "Error deleting data", error: err.message });
  }
};
