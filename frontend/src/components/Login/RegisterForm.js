import React, { useState } from 'react';
import './LoginForm.css';

const RegisterForm = ({ onLogin }) => {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Simple authentication
    // if (email === 'admin@healthcare.com' && password === 'admin123') {
    //   onLogin();
    // } else {
    //   setError('Invalid credentials');
    // }

  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@healthcare.com"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
            />
          </div>

          <button type="submit" className="login-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;