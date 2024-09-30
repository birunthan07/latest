


import React from 'react';
import { useNavigate } from 'react-router-dom';
import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/LandingPage.css';
import logo from '/home/uki-jaffna/Documents/mechanic/frontend/src/components/Blue White and Black Simple Car Repair Shop Logo.png';
import heroimg from '/home/uki-jaffna/Documents/mechanic/frontend/src/components/images (1).jpeg';
import mechanic from '/home/uki-jaffna/Documents/mechanic/frontend/src/components/images.jpeg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handlePublishJob = () => {
    const isMechanicRegistered = localStorage.getItem('userRole') === 'mechanic';
    navigate(isMechanicRegistered ? '/post-job' : '/mechanic-register');
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" className="logo" />
          </a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/login" className="btn btn-primary btn-small">Login</a></li>
            <li><a href="/register" className="btn btn-secondary btn-small">Register</a></li>
            <li><a href="/mechanic-register" className="btn btn-tertiary btn-small">Register as a Mechanic</a></li>
          </ul>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>"Your Next Mechanic is Just a Tap Away – Let’s Get Started!"</h1>
            <p>Find a mechanic . It's easy and quick! Join us and make your vehicle maintenance hassle-free.</p>
          </div>
          <div className="hero-image">
            <img src={heroimg} alt="hero" />
          </div>
        </div>
      </header>

      {/* <section className="features">
        <div className="container">
          <div className="feature-card mechanic">
            <img src={mechanic} alt="Mechanic" />
            <h2>For Mechanics</h2>
            <p>Become a mechanic and start earning money by providing services. It's simple and rewarding!</p>
            <button onClick={handlePublishJob} className="btn btn-primary">register as mechanic</button>
          </div>
        </div>
      </section> */}

      <footer>
        <div className="container">
          <p>&copy; 2024 Your Mechanic Finder App. All rights reserved.</p>
          <a href="#contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

// // src/components/LandingPage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../CSS/Landing.css';
// import logo from '../Images/logo.png';
// import heroimg from '../Images/hero.webp';
// import driver from '../Images/driver.jpg';
// import MechanicLoginForm from './MechanicLoginForm';
// import MechanicRegisterForm from './MechanicRegister';

// const LandingPage = () => {
//   const [showMechanicForms, setShowMechanicForms] = useState(false);
//   const navigate = useNavigate();

//   const handleToggleMechanicForms = () => {
//     setShowMechanicForms(!showMechanicForms);
//   };

//   return (
//     <div className="landing-page">
//       <nav className="navbar">
//         <div className="container">
//           <a className="navbar-brand" href="/">
//             <img src={logo} alt="Logo" className="logo" />
//           </a>
//           <ul className="nav-links">
//             <li><a href="#about">About</a></li>
//             <li><a href="#services">Services</a></li>
//             <li><a href="#contact">Contact</a></li>
//             <li><a href="/login" className="btn btn-primary btn-small">Login</a></li>
//             <li><a href="/register" className="btn btn-secondary btn-small">Register</a></li>
//             <li>
//               <button onClick={handleToggleMechanicForms} className="btn btn-secondary btn-small">
//                 {showMechanicForms ? 'Close Mechanic Forms' : 'Register as Mechanic'}
//               </button>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <header className="hero">
//         <div className="container">
//           <div className="hero-content">
//             <h1>"Your Next Ride is Just a Tap Away – Let’s Get Going!"</h1>
//             <p>Find a ride or publish one. It's easy and quick! Join us and make your commute hassle-free.</p>
//           </div>
//           <div className="hero-image">
//             <img src={heroimg} alt="hero" />
//           </div>
//         </div>
//       </header>

//       <section className="features">
//         <div className="container">
//           <div className="feature-card driver">
//             <img src={driver} alt="Driver" />
//             <h2>For Drivers</h2>
//             <p>Become a driver and start earning money by providing rides. It's simple and rewarding!</p>
//             <button onClick={() => navigate('/go-ride')} className="btn btn-primary">Publish Ride</button>
//           </div>
//         </div>
//       </section>

//       {showMechanicForms && (
//         <section className="mechanic-forms">
//           <div className="container">
//             <MechanicLoginForm />
//             <MechanicRegisterForm />
//           </div>
//         </section>
//       )}

//       <footer>
//         <div className="container">
//           <p>&copy; 2024 Your Ride Sharing App. All rights reserved.</p>
//           <a href="#contact">Contact Us</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

