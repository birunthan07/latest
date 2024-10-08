
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginPage';
import RegisterForm from './components/RegistrationPage';
import LandingPage from './components/LandingPage';
import MechanicRegisterForm from './components/MechanicRegister'; // Ensure this component exists
import MechanicLoginForm from './components/MechanicLoginForm'; // Ensure this component exists
import UserDashboard from './components/NormalUserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ ManageUsers';
import ManageMechanics from './components/ManageMechanics'; 
import MechanicDashboard from './components/MechanicDashboard'; 
import CompletedRepairs from './components/CompletedRepairs';
import MechanicRequests from './components/MechanicRequests'; // Ensure this component exists
// import PaymentInfo from './components/PaymentInfo'; // Ensure this component exists

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/mechanic-register" element={<MechanicRegisterForm />} />
          <Route path="/mechanic-login" element={<MechanicLoginForm />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<ManageUsers />} />
          <Route path="/admin-mechanics" element={<ManageMechanics />} />
          <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
          <Route path="/completed-repairs" element={<CompletedRepairs />} />
          <Route path="/mechanic-requests" element={<MechanicRequests />} />
          {/* <Route path="/payment-info" element={<PaymentInfo />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

