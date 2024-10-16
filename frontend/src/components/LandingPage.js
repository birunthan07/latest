


import React from 'react';
import  { useNavigate } from 'react-router-dom';
import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/LandingPage.css';
import logo from '/home/uki-jaffna/Documents/mechanic/frontend/src/components/Blue White and Black Simple Car Repair Shop Logo.png';
import heroimg from '/home/uki-jaffna/Documents/mechanic/frontend/src/components/images (1).jpeg';
;

const LandingPage = () => {
  const navigate = useNavigate();



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


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/LandingPage.css'; 
// import logo from '/home/uki-jaffna/Documents/mechanic/frontend/src/components/Blue White and Black Simple Car Repair Shop Logo.png';
// import heroimg from '/home/uki-jaffna/Documents/mechanic/frontend/src/components/LandingPage.js'; 

// const LandingPage = () => {
//   const navigate = useNavigate();

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
//             <li><a href="/mechanic-register" className="btn btn-tertiary btn-small">Register as a Mechanic</a></li>
//           </ul>
//         </div>
//       </nav>

//       <header className="hero">
//         <div className="hero-content">
//           <h1>Your Next Mechanic is Just a Tap Away</h1>
//           <p>Find a mechanic. It's easy and quick! Join us and make your vehicle maintenance hassle-free.</p>
//           <button className="btn" onClick={() => navigate('/quote')}>
//             Get a Quote
//           </button>
//         </div>
//         <div className="hero-image">
//           <img src={heroimg} alt="hero" style={{display: 'none'}} /> {/* Hidden for styling */}
//         </div>
//       </header>

//       <footer>
//         <div className="container">
//           <p>&copy; 2024 Your Mechanic Finder App. All rights reserved.</p>
//           <a href="#contact">Contact Us</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
