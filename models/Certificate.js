const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true },
  studentName: { type: String, required: true },
  internshipDomain: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
