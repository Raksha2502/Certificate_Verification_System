const express = require('express');
const router = express.Router();
const Certificate = require('../server/models/Certificate');
const PDFDocument = require('pdfkit');

// Route to create a new certificate
router.post('/admin/certificate', async (req, res) => {
  const { certificateId, studentName, internshipDomain, startDate, endDate } = req.body;
  
  try {
    const newCertificate = new Certificate({ certificateId, studentName, internshipDomain, startDate, endDate });
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({ message: 'Error creating certificate', error });
  }
});

// Route to fetch certificate by ID
router.get('/api/student/certificate/:id', async (req, res) => {
  console.log('Requested Certificate ID:', req.params.certificateId);
  try {
    const certificate = await CertificateModel.findOne({ certificateId: req.params.id });
    console.log('Certificate found:', certificate);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    console.error('Error retrieving certificate:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
