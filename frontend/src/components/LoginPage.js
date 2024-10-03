

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/LoginPage.css';
// import { jwtDecode } from 'jwt-decode';

// function LoginForm() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   // Validation function
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     return newErrors;
//   };

//   // Handle change in input fields
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       console.log('Form data being sent:', formData); // Log form data for debugging

//       // Making request to the login endpoint
//       const response = await axios.post('http://localhost:8000/api/auth/login', formData, {
//         headers: {
//           'Content-Type': 'application/json', // Ensure correct content type
//         },
//       });

//       const { token } = response.data;

//       if (!token) {
//         throw new Error('Token not received');
//       }

//       // Store the token
//       localStorage.setItem('token', token);
//       console.log('Token stored:', token);

//       // Decode the token
//       const decodedToken = jwtDecode(token);
//       const role = decodedToken.user?.role; // Adjust this based on token payload

//       if (!role) {
//         throw new Error('Role not found in token');
//       }

//       // Store the role
//       localStorage.setItem('userRole', role);

//       setSuccessMessage('Login successful!');
//       setFormData({ email: '', password: '' });
//       setErrors({});
//       setServerError('');

//       // Redirect based on role
//       if (role === 'admin') {
//         navigate('/admin-dashboard');
//       } else if (role === 'user') {
//         navigate('/user-dashboard');
//       } else if (role === 'mechanic') {
//         navigate('/mechanic-dashboard'); // Redirect for mechanics
//       }

//     } catch (error) {
//       console.error('Login Error:', error);

//       if (error.response) {
//         console.error('Error response:', error.response.data); // Log error response for debugging
//         if (error.response.status === 400) {
//           setServerError('Invalid email or password. Please try again.');
//         } else {
//           setServerError('Unexpected error occurred. Please try again later.');
//         }
//       } else if (error.request) {
//         setServerError('Network error. Please check your connection.');
//       } else {
//         setServerError(error.message || 'Request error');
//       }

//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="form-container bg-white p-5 rounded shadow">
//         <h2 className="text-center mb-4 text-dark-red">Welcome Back, User!</h2>
//         {serverError && <p className="text-danger text-center">{serverError}</p>}
//         {successMessage && <p className="text-success text-center">{successMessage}</p>}
//         <form onSubmit={handleSubmit}>
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
//           <button type="submit" className="btn w-100 mt-3">Login</button>
//           <p className="text-center mt-3">
//             <Link to="/register" className="text-orange">Don't have an account? Register</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/LoginPage.css';
import { jwtDecode } from 'jwt-decode';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  // Handle change in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log('Form data being sent:', formData); // Log form data for debugging

      // Making request to the login endpoint
      const response = await axios.post('http://localhost:8000/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json', // Ensure correct content type
        },
      });

      const { token } = response.data;

      if (!token) {
        throw new Error('Token not received');
      }

      // Decode the token
      const decodedToken = jwtDecode(token);
      const role = decodedToken.user?.role; // Adjust this based on token payload
      const name = decodedToken.user?.username; // Assuming 'username' is part of the payload

      if (!role) {
        throw new Error('Role not found in token');
      }

      // Store the token, role, and name
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', name); // Store user name
      sessionStorage.setItem('token', token); // Optionally store in session storage
      sessionStorage.setItem('userRole', role); // Optionally store role in session storage
      sessionStorage.setItem('userName', name); // Optionally store name in session storage

      console.log('Token stored:', token);
      console.log('Role stored:', role);
      console.log('Name stored:', name);

      setSuccessMessage('Login successful!');
      setFormData({ email: '', password: '' });
      setErrors({});
      setServerError('');

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'user') {
        navigate('/user-dashboard');
      } else if (role === 'mechanic') {
        navigate('/mechanic-dashboard'); // Redirect for mechanics
      }

    } catch (error) {
      console.error('Login Error:', error);

      if (error.response) {
        console.error('Error response:', error.response.data); // Log error response for debugging
        if (error.response.status === 400) {
          setServerError('Invalid email or password. Please try again.');
        } else {
          setServerError('Unexpected error occurred. Please try again later.');
        }
      } else if (error.request) {
        setServerError('Network error. Please check your connection.');
      } else {
        setServerError(error.message || 'Request error');
      }

      setSuccessMessage('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-container bg-white p-5 rounded shadow">
        <h2 className="text-center mb-4 text-dark-red">Welcome Back, User!</h2>
        {serverError && <p className="text-danger text-center">{serverError}</p>}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn w-100 mt-3">Login</button>
          <p className="text-center mt-3">
            <Link to="/register" className="text-orange">Don't have an account? Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
