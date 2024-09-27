import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    // Predefined list of valid users
    const validUsers = [
      { username: 'student1', password: 'password123' },
      { username: 'student2', password: 'password456' },
      { username: 'student3', password: 'password789' }
    ];

    const handleLogin = () => {
      const validUser = validUsers.find(
        (user) => user.username === credentials.username && user.password === credentials.password
      );

      if (validUser) {
         localStorage.setItem('username', credentials.username);
        navigate('/student');
      } else {
        alert('Invalid username or password');
      }
    };

    return (
      <div>
        <h2>Student Login</h2>
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

export default StudentLogin;
