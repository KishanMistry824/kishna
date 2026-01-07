const Contact = require("../models/Contact");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { submitContactForm };
