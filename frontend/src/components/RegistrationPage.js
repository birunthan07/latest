


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom'; 
// // import '../CSS/FormStyle.css';

// function RegisterForm() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate(); 

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/api/auth/register', formData);
//       console.log('Registration Successful:', response.data);

//       // Set success message and clear the form
//       setSuccessMessage('Registration successful! Redirecting to your dashboard...');
//       setFormData({
//         username: '',
//         email: '',
//         password: ''
//       });
//       setErrors({});
//       setServerError('');

//       // Redirect to mechanic dashboard
//       navigate('/mechanic-dashboard'); // Navigate to the mechanic dashboard after successful registration

//     } catch (error) {
//       if (error.response && error.response.data) {
//         console.log('Detailed Error:', error.response.data);
//         setServerError(error.response.data.message || 'Registration failed. Please try again.');
//       } else {
//         setServerError('An unexpected error occurred. Please try again.');
//       }
//       console.error('Registration Error:', error);
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="form-container bg-white p-5 rounded shadow">
//         <h2 className="text-center mb-4 text-dark-red">Join Us Today!</h2>
//         {serverError && <p className="text-danger text-center">{serverError}</p>}
//         {successMessage && <p className="text-success text-center">{successMessage}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="text"
//               name="username"
//               className="form-control"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//             {errors.username && <p className="text-danger">{errors.username}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             {errors.email && <p className="text-danger">{errors.email}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             {errors.password && <p className="text-danger">{errors.password}</p>}
//           </div>
//           <button type="submit" className="btn w-100 mt-3">Register</button>
//           <p className="text-center mt-3">
//             <Link to="/login" className="text-orange">Already have an account? Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegisterForm;


import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 

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
      const response = await axios.post('http://localhost:8000/api/auth/register', formData);
      console.log('Registration Successful:', response.data);

      // Set success message and clear the form
      setSuccessMessage('Registration successful! Redirecting to your dashboard...');
      setFormData({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
      });
      setErrors({});
      setServerError('');

      // Redirect to mechanic dashboard
      navigate('/mechanic-dashboard'); // Navigate to the mechanic dashboard after successful registration

    } catch (error) {
      if (error.response && error.response.data) {
        console.log('Detailed Error:', error.response.data);
        setServerError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setServerError('An unexpected error occurred. Please try again.');
      }
      console.error('Registration Error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-container bg-white p-5 rounded shadow">
        <h2 className="text-center mb-4 text-dark-red">Join Us Today!</h2>
        {serverError && <p className="text-danger text-center">{serverError}</p>}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="text-danger">{errors.username}</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <p className="text-danger">{errors.address}</p>}
          </div>
          <button type="submit" className="btn w-100 mt-3">Register</button>
          <p className="text-center mt-3">
            <Link to="/login" className="text-orange">Already have an account? Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// function RegisterForm() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     address: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!formData.phoneNumber.trim()) {
//       newErrors.phoneNumber = 'Phone number is required';
//     }

//     if (!formData.address.trim()) {
//       newErrors.address = 'Address is required';
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setServerError('');
//     try {
//       const response = await axios.post('http://localhost:8000/api/auth/register', formData);
//       console.log('Registration Successful:', response.data);

//       // Set success message and clear the form
//       setSuccessMessage('Registration successful! Redirecting to your dashboard...');
//       setFormData({
//         username: '',
//         email: '',
//         password: '',
//         // phoneNumber: '',
//         // address: ''
//       });
//       setErrors({});

//       // Redirect to mechanic dashboard after a short delay
//       setTimeout(() => {
//         navigate('/user-dashboard');
//       }, 2000);
//     } catch (error) {
//       if (error.response) {
//         // The server responded with a status other than 2xx
//         console.log('Detailed Error:', error.response.data);
//         setServerError(error.response.data.message || 'Registration failed. Please try again.');
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('No response received:', error.request);
//         setServerError('No response from server. Please try again later.');
//       } else {
//         // Something else happened in setting up the request
//         console.error('Error setting up request:', error.message);
//         setServerError('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="form-container bg-white p-5 rounded shadow">
//         <h2 className="text-center mb-4 text-dark-red">Join Us Today!</h2>
//         {serverError && <p className="text-danger text-center">{serverError}</p>}
//         {successMessage && <p className="text-success text-center">{successMessage}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="text"
//               name="username"
//               className="form-control"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//             {errors.username && <p className="text-danger">{errors.username}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             {errors.email && <p className="text-danger">{errors.email}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             {errors.password && <p className="text-danger">{errors.password}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               name="phoneNumber"
//               className="form-control"
//               placeholder="Phone Number"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               required
//             />
//             {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               name="address"
//               className="form-control"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//             {errors.address && <p className="text-danger">{errors.address}</p>}
//           </div>
//           <button type="submit" className="btn w-100 mt-3" disabled={isSubmitting}>
//             {isSubmitting ? 'Registering...' : 'Register'}
//           </button>
//           <p className="text-center mt-3">
//             <Link to="/login" className="text-orange">Already have an account? Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegisterForm;
