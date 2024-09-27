import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import StudentPortal from './components/StudentPortal';
import './App.css';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';

function App() {
  return (
    <Router>
      <div class="mydiv">
        <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route path="/" element={
            <div >
              <h2 class="h2">Certificate Verification System</h2>
              <nav>
                    <a href="/admin-login">Admin Portal</a>
                    <br/>
                    <br/>
                    <a href="/student-login">Student Portal</a>
              </nav>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
