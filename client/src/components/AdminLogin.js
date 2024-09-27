// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple login check (replace with real authentication)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div class="myDiv">
      <h2 class="h2colored">Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <br/>
      <br/>
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <br/>
      <br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;
