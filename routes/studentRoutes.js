const express = require('express');
const pdfkit = require('pdfkit');
const Certificate = require('../models/Certificate');
const router = express.Router();

// Retrieve certificate by ID
router.get('/certificate/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });

    // Generate PDF
    const doc = new pdfkit();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${req.params.id}.pdf`);
    
    doc.pipe(res);
    doc.fontSize(16).text(`Certificate ID: ${certificate.certificateId}`, { align: 'center' });
    doc.fontSize(12).text(`Student Name: ${certificate.studentName}`);
    doc.text(`Internship Domain: ${certificate.internshipDomain}`);
    doc.text(`Start Date: ${certificate.startDate.toDateString()}`);
    doc.text(`End Date: ${certificate.endDate.toDateString()}`);
    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
