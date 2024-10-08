import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/ MechanicRegisterForm.css'; // Fixed the import path

function MechanicRegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    verificationCertificate: null,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.verificationCertificate) {
      newErrors.verificationCertificate = 'Verification certificate is required';
    }

    return newErrors;
  };

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('verificationCertificate', formData.verificationCertificate);

    try {
      const response = await axios.post('http://localhost:8000/api/mechanic/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Mechanic Registration Successful:', response.data);

      // Set success message and clear the form
      setSuccessMessage('Registration successful! Your profile is under review.');
      setFormData({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        verificationCertificate: null,
      });
      setErrors({});
      setServerError('');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-container bg-light p-4 rounded shadow">
        <h2 className="text-center mb-4 text-dark">Mechanic Registration</h2>
        {serverError && <p className="text-danger text-center">{serverError}</p>}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="text-danger">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <p className="text-danger">{errors.address}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="verificationCertificate">Verification Certificate</label>
            <input
              type="file"
              id="verificationCertificate"
              name="verificationCertificate"
              className="form-control-file"
              onChange={handleChange}
              required
            />
            {errors.verificationCertificate && <p className="text-danger">{errors.verificationCertificate}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Register as Mechanic</button>
          <p className="text-center mt-3">
            <Link to="/mechanic-login" className="text-primary">Already registered? Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default MechanicRegisterForm;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/ MechanicRegisterForm.css';

// function MechanicRegisterForm() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     address: '',
//     verificationCertificate: null
//   });
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.verificationCertificate) newErrors.verificationCertificate = 'Verification certificate is required';
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     if (e.target.files) {
//       setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));

//     setLoading(true);
//     try {
//       await axios.post('http://localhost:8000/api/mechanic/register', formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       setSuccessMessage('Registration successful! Your profile is under review.');
//       setFormData({ username: '', email: '', password: '', phoneNumber: '', address: '', verificationCertificate: null });
//       setErrors({});
//       setServerError('');
//     } catch (error) {
//       setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
//       setSuccessMessage('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="form-container bg-light p-4 rounded shadow">
//         <h2 className="text-center mb-4 text-dark">Mechanic Registration</h2>
//         {serverError && <p className="text-danger text-center">{serverError}</p>}
//         {successMessage && <p className="text-success text-center">{successMessage}</p>}
//         <form onSubmit={handleSubmit}>
//           {Object.entries(formData).map(([key, value]) => (
//             <div className="form-group" key={key}>
//               <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
//               <input
//                 type={key === 'password' ? 'password' : key === 'verificationCertificate' ? 'file' : 'text'}
//                 id={key}
//                 name={key}
//                 className="form-control"
//                 placeholder={`Enter your ${key}`}
//                 value={typeof value === 'string' ? value : ''}
//                 onChange={handleChange}
//                 required
//               />
//               {errors[key] && <p className="text-danger">{errors[key]}</p>}
//             </div>
//           ))}
//           <button type="submit" className="btn w-100 mt-3" disabled={loading}>
//             {loading ? 'Registering...' : 'Register as Mechanic'}
//           </button>
//           <p className="text-center mt-3">
//             <Link to="/mechanic-login" className="text-orange">Already have an account? Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default MechanicRegisterForm;
