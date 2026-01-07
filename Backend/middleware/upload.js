const multer = require('multer');
const path = require('path');
const fs = require("fs");

// Create uploads folder if missing
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

// File Filter
const fileFilter = (req, file, cb) => {
    const allowed = [".pdf", ".docx", ".doc"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowed.includes(ext)) {
        return cb(new Error("Only .pdf, .docx, .doc files are allowed"), false);
    }
    cb(null, true);
};

// Upload middleware
const upload = multer({
    storage,                     // ✅ FIXED
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter,
});

module.exports = upload;
