


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginPage';
import RegisterForm from './components/RegistrationPage';
import LandingPage from './components/LandingPage';
import MechanicRegisterForm from './components/MechanicRegister';
import MechanicLoginForm from './components/MechanicLoginForm';
import UserDashboard from './components/NormalUserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ ManageUsers.js';
import ManageMechanics from './components/ManageMechanics';
import MechanicDashboard from './components/MechanicDashboard';
import CompletedRepairs from './components/CompletedRepairs';
import MechanicRequests from './components/MechanicRequests';
import PaymentPage from './components/PaymentPage.js';
import ContactForm from './components/contact.js';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/mechanic-register" element={<MechanicRegisterForm />} />
          <Route path="/mechanic-login" element={<MechanicLoginForm />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<ManageUsers />} />
          <Route path="/admin-mechanics" element={<ManageMechanics />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
          <Route path="/completed-repairs" element={<CompletedRepairs />} />
          <Route path="/mechanic-requests" element={<MechanicRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginForm from './components/LoginPage';
// import RegisterForm from './components/RegistrationPage';
// import LandingPage from './components/LandingPage';
// import MechanicRegisterForm from './components/MechanicRegister';
// import MechanicLoginForm from './components/MechanicLoginForm';
// import UserDashboard from './components/NormalUserDashboard';
// import AdminDashboard from './components/AdminDashboard';
// import ManageUsers from './components/ ManageUsers.js';
// import ManageMechanics from './components/ManageMechanics';
// import MechanicDashboard from './components/MechanicDashboard';
// import CompletedRepairs from './components/CompletedRepairs';
// import MechanicRequests from './components/MechanicRequests';
// import PaymentPage from './components/PaymentPage.js';
// import axios from 'axios';

// function App() {
//   // This state stores whether the mechanic has paid or not
//   const [hasPaid, setHasPaid] = useState(false);

//   // Check payment status whenever the mechanic logs in
//   useEffect(() => {
//     const checkPaymentStatus = async () => {
//       try {
//         const response = await axios.get('/api/mechanic/payment-status');
//         setHasPaid(response.data.hasPaid);
//       } catch (error) {
//         console.error('Error checking payment status', error);
//       }
//     };

//     checkPaymentStatus();
//   }, []);

//   // Route protection logic for MechanicDashboard
//   const ProtectedMechanicRoute = ({ children }) => {
//     if (!hasPaid) {
//       return <Navigate to="/payment" replace />;
//     }
//     return children;
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/register" element={<RegisterForm />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/mechanic-register" element={<MechanicRegisterForm />} />
//           <Route path="/mechanic-login" element={<MechanicLoginForm />} />
//           <Route path="/user-dashboard" element={<UserDashboard />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/admin-users" element={<ManageUsers />} />
//           <Route path="/admin-mechanics" element={<ManageMechanics />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route 
//             path="/mechanic-dashboard" 
//             element={
//               <ProtectedMechanicRoute>
//                 <MechanicDashboard />
//               </ProtectedMechanicRoute>
//             } 
//           />
//           <Route path="/completed-repairs" element={<CompletedRepairs />} />
//           <Route path="/mechanic-requests" element={<MechanicRequests />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
