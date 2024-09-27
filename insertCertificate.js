const mongoose = require('mongoose');
const Certificate = require('./models/Certificate'); // Ensure this path is correct
const fs = require('fs');

// Check if the model file exists
const modelPath = './models/Certificate.js';
fs.access(modelPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`${modelPath} does not exist`);
  } else {
    console.log(`${modelPath} exists`);
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/certificateDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Function to insert data
const insertCertificate = async () => {
  const newCertificate = new Certificate({
    certificateId: 'CERT123',
    studentName: 'Jane Smith',
    internshipDomain: 'Data Science',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-09-01'),
  });

  try {
    const result = await newCertificate.save();
    console.log('Certificate inserted:', result);
  } catch (error) {
    console.error('Error inserting certificate:', error);
  } finally {
    mongoose.connection.close(); // Close the connection after inserting
  }
};

// Call the function to insert data
insertCertificate();
