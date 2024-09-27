import React, { useState } from 'react';
import axios from 'axios';
import './StudentPortal.css';

function StudentPortal() {
  const [certificateId, setCertificateId] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSearch = async () => {
    if (!certificateId.trim()) {
      alert('Please enter a valid Certificate ID.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/student/certificate/${certificateId}`);
      setCertificateData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Certificate not found. Response:', error.response.data);
        alert('Certificate not found. Please check the ID and try again.');
      } else {
        console.error('Error retrieving certificate:', error);
        alert('Error retrieving certificate: ' + (error.response?.data?.message || 'Unknown error'));
      }
    }
    
  };

  const onDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/certificate/${certificateId}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up the DOM
    } catch (error) {
      if (error.response) {
        alert('Error downloading certificate: ' + (error.response?.data?.message || 'Unknown error'));
      } else {
        alert('Error downloading certificate');
      }
    }
  };

  // Ensure this return statement is within the functional component
  return (
    <div className="student-portal">
      <h2>Student Portal</h2>
      <input
        type="text"
        value={certificateId}
        onChange={(e) => setCertificateId(e.target.value)}
        placeholder="Enter Certificate ID"
      />
      <br />
      <br />
      <button onClick={onSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {certificateData && (
        <div className="certificate">
          <h1>Certificate of Completion of Internship</h1>
          <hr />
          <p>This is to certify that</p>
          <h2 className="student-name">{certificateData.studentName}</h2>
          <p>
            has successfully completed an internship in the field of <span className="domain">{certificateData.internshipDomain}</span>
          </p>
          <p className="dates">
            Start Date: <span className="start-date">{new Date(certificateData.startDate).toLocaleDateString()}</span><br />
            End Date: <span className="end-date">{new Date(certificateData.endDate).toLocaleDateString()}</span>
          </p>
          <button onClick={onDownload}>Download PDF</button>
        </div>
      )}
    </div>
  );
}

export default StudentPortal;
