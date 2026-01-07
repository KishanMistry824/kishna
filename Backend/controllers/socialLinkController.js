// const SocialLink = require("../models/SocialLink");

// // GET all links for a user
// exports.getLinksByUser = async (req, res) => {
//   try {
//     const links = await SocialLink.find({ userId: req.params.userId });
//     res.json(links);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // POST new social link
// exports.createLink = async (req, res) => {
//   const { userId, platform, url } = req.body;
//   if (!userId || !platform || !url) {
//     return res.status(400).json({ error: "All fields are required" });
//   }
//   try {
//     const existing = await SocialLink.find({ userId });
//     if (existing.length >= 5)
//       return res.status(400).json({ error: "Max 5 links allowed" });

//     // Prevent duplicate platform for the same user
//     if (existing.some(link => link.platform === platform)) {
//       return res.status(400).json({ error: "Platform already added" });
//     }

//     const newLink = new SocialLink({ userId, platform, url });
//     const saved = await newLink.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to create link" });
//   }
// };

// // PUT update a link
// exports.updateLink = async (req, res) => {
//   try {
//     const updated = await SocialLink.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updated) {
//       return res.status(404).json({ error: "Link not found" });
//     }
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update link" });
//   }
// };

// // DELETE a link
// exports.deleteLink = async (req, res) => {
//   try {
//     const deleted = await SocialLink.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ error: "Link not found" });
//     }
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete link" });
//   }
// }


const SocialLink = require("../models/SocialLink");

// GET all links for user
exports.getLinks = async (req, res) => {
  try {
    const links = await SocialLink.find({ userId: req.params.userId });
    res.json(links);
  } catch {
    res.status(500).json({ message: "Failed to fetch links" });
  }
};

// POST create a new link
exports.createLink = async (req, res) => {
  const { userId, platform, url } = req.body;
  if (!userId || !platform || !url) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const newLink = new SocialLink({ userId, platform, url });
    const saved = await newLink.save();
    res.status(201).json(saved);
  } catch {
    res.status(500).json({ message: "Failed to create link" });
  }
};

// PUT update URL or toggle connection
exports.updateLink = async (req, res) => {
  try {
    const updated = await SocialLink.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE a link
exports.deleteLink = async (req, res) => {
  try {
    await SocialLink.findByIdAndDelete(req.params.id);
    res.json({ message: "Link deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
