// src/components/MechanicLoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '/home/uki-jaffna/latest/frontend/src/css/MechanicLoginForm.css';

function MechanicLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/mechanic/login', formData);
      setSuccessMessage('Login successful!');
      setFormData({ email: '', password: '' });
      setErrors({});
      setServerError('');
      navigate('/mechanic-dashboard');
    } catch (error) {
      setServerError(error.response?.status === 403 ? 'Your account is not approved yet.' : 'An unexpected error occurred.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">Mechanic Login</h2>
      {serverError && <p className="text-danger">{serverError}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        {errors.email && <p className="text-danger">{errors.email}</p>}
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        {errors.password && <p className="text-danger">{errors.password}</p>}
        <button type="submit">Login as Mechanic</button>
        <p>
          <Link to="/mechanic-register">Don't have an account? Register</Link>
        </p>
      </form>
    </div>
  );
}

export default MechanicLoginForm;
