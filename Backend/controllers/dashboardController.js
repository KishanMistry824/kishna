const User = require("../models/User");
const PersonalInfo = require("../models/PersonalInfo");

// ✅ POST /personal-info → Save or update personal info
exports.savePersonalInfo = async (req, res) => {
  try {
    const {
      userId,
      dob,
      gender,
      nationality,
      address,
      linkedin
    } = req.body;

    console.log("📥 Saving personal info for userId:", userId);
    console.log("Received data:", {
      dob,
      gender,
      nationality,
      address,
      linkedin,
    });

    const profileImage = req.file ? req.file.filename : null;

    // ✅ Validate userId presence
    if (!userId || userId.length !== 24) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    // ✅ Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Check for existing personal info
    let existing = await PersonalInfo.findOne({ userId });

    if (existing) {
      existing.dob = dob;
      existing.gender = gender;
      existing.nationality = nationality;
      existing.address = address;
      existing.linkedin = linkedin;
      if (profileImage) existing.profileImage = profileImage;

      await existing.save();
      return res.status(200).json({ message: "Personal Info updated successfully" });
    }

    // ✅ Create new record
    const newInfo = new PersonalInfo({
      userId,
      dob,
      gender,
      nationality,
      address,
      linkedin,
      profileImage,
    });

    await newInfo.save();
    res.status(201).json({ message: "Personal Info saved successfully" });

  } catch (err) {
    console.error("❌ Error saving personal info:", err.message);
    res.status(500).json({
      message: "Failed to save personal info",
      error: err.message,
    });
  }
};

// ✅ GET /personal-info/:userId → Fetch personal info
exports.getPersonalInfo = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("📤 Fetching personal info for userId:", userId);

    if (!userId || userId.length !== 24) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // ✅ Fetch user basic details
    const user = await User.findById(userId).select("fullName email mobile");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Fetch personal info
    const personal = await PersonalInfo.findOne({ userId });

    res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      dob: personal?.dob || "",
      gender: personal?.gender || "",
      address: personal?.address || "",
      nationality: personal?.nationality || "",
      linkedin: personal?.linkedin || "",
      profileImage: personal?.profileImage || "",
    });

  } catch (err) {
    console.error("❌ Error fetching personal info:", err.message);
    res.status(500).json({
      message: "Error fetching personal info",
      error: err.message,
    });
  }
};
