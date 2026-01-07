// const express = require("express");
// const router = express.Router();
// const { submitContactForm } = require("../controllers/contactController");

// router.post("/contact", submitContactForm);

// module.exports = router;
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    res.status(200).json({ success: true, msg: "Message sent!" });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
