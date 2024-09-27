const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mongoose = require('mongoose');
const Certificate = require('./models/Certificate');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS

// Upload endpoint
app.post('/api/admin/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});
app.get('/api/student/certificate/:certificateId', async (req, res) => {
  try {
    const certificateId = req.params.certificateId;
    console.log('Searching for certificate ID:', certificateId);
    
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    

    res.json(certificate);
  } catch (error) {
    console.error('Error fetching certificate:', error); // Log the actual error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

mongoose.connect('mongodb://localhost:27017/certificateDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




// Simple test endpoint
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/ping', (req, res) => {
  res.send('Server is alive');
});
