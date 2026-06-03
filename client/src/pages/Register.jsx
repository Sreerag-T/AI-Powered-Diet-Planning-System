import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import './Register.css';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});  // To store validation errors
  const navigate = useNavigate();

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Minimum 6 characters, at least 1 letter and 1 number

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password || !passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters, and contain at least one letter and one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return;  // Stop submission if there are validation errors
    }

    try {
      // Send registration request
      const res = await axios.post('/auth/register', { name, email, password, role: 'user' });

      // Store the token in localStorage
      localStorage.setItem('token', res.data.token);

      // Navigate to the dashboard and refresh the page
      navigate('/dashboard');
      window.location.reload();  // Refresh the dashboard page
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="lux-register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="lux-form-label">Name</label>
          <input
            type="text"
            className={`lux-form-control ${errors.name ? 'lux-is-invalid' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <div className="lux-invalid-feedback">{errors.name}</div>}
        </div>
        <div>
          <label className="lux-form-label">Email</label>
          <input
            type="email"
            className={`lux-form-control ${errors.email ? 'lux-is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="lux-invalid-feedback">{errors.email}</div>}
        </div>
        <div>
          <label className="lux-form-label">Password</label>
          <input
            type="password"
            className={`lux-form-control ${errors.password ? 'lux-is-invalid' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <div className="lux-invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="lux-btn-primary">Register</button>
      </form>
      <div>
        <a href="/register-trainer" className="lux-btn-secondary">Register as Trainer</a>
      </div>
    </div>

  );
};

export default Register;
