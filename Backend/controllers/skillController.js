 const Skill = require("../models/Skill");

// Create new skill
exports.createSkill = async (req, res) => {
  try {
    const { name, userId } = req.body;

    const existing = await Skill.findOne({ name, userId });
    if (existing) return res.status(400).json({ message: "Skill already exists" });

    const newSkill = await Skill.create({ name, userId });
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all skills for a user
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.params.userId });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete skill
exports.deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};







// // Get all skills for a user
// export const getSkills = async (req, res) => {
// const { userId } = req.params;
// try {
// const skills = await Skill.find({ userId });
// res.status(200).json(skills);
// } catch (error) {
// res.status(500).json({ message: 'Failed to fetch skills' });
// }
// };


// // Add a new skill
// export const addSkill = async (req, res) => {
// const { userId, name, category, proficiency, experience } = req.body;
// try {
// const existing = await Skill.findOne({ name, userId });
// if (existing) return res.status(400).json({ message: 'Skill already exists' });


// const newSkill = await Skill.create({ userId, name, category, proficiency, experience, endorsements: 0 });
// res.status(201).json(newSkill);
// } catch (error) {
// res.status(500).json({ message: 'Failed to add skill' });
// }
// };


// // Delete a skill
// export const deleteSkill = async (req, res) => {
// const { id } = req.params;
// try {
// await Skill.findByIdAndDelete(id);
// res.status(200).json({ message: 'Skill deleted' });
// } catch (error) {
// res.status(500).json({ message: 'Failed to delete skill' });
// }
// };


// // Endorse a skill
// export const endorseSkill = async (req, res) => {
// const { id } = req.params;
// try {
// const skill = await Skill.findById(id);
// if (!skill) return res.status(404).json({ message: 'Skill not found' });


// skill.endorsements = (skill.endorsements || 0) + 1;
// await skill.save();
// res.status(200).json(skill);
// } catch (error) {
// res.status(500).json({ message: 'Failed to endorse skill' });
// }
// };