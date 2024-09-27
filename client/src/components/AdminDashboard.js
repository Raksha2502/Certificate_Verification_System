import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Your CSS file

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log("Selected file:", e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true); 

    try {
      await axios.post('http://localhost:5000/api/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error.response?.data||error.message);
      alert('Error uploading file'+(error.response?.data?.message||'Unknown error'));
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="myDiv">
      <h2 className="h2colored">Admin Dashboard</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default AdminDashboard;
