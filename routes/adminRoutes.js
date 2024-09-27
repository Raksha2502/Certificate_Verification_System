const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const Certificate = require('../models/Certificate');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload Excel file and process data
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Process the uploaded file...
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const row of data) {
      const { certificateId, studentName, internshipDomain, startDate, endDate } = row;
      await Certificate.updateOne(
        { certificateId },
        { studentName, internshipDomain, startDate, endDate },
        { upsert: true }
      );
    }

    res.status(200).json({ message: 'Data processed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
