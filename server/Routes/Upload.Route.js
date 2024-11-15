const express = require('express');
const Image = require('../models/Image');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'No file uploaded' });
  }

  const imageName = req.file.filename;

  try {
    // Save image name to the database
    await Image.create({ image: imageName });
    res.json({ status: "ok", message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ status: 'error', message: 'Failed to save image to the database' });
  }
});

module.exports = router;
