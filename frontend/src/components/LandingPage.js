


// import React from 'react';
// import  { useNavigate } from 'react-router-dom';
// import '/home/uki-jaffna/latest/frontend/src/css/LandingPage.css';
// import logo from '/home/uki-jaffna/latest/frontend/src/components/Blue White and Black Simple Car Repair Shop Logo.png';
// import heroimg from '/home/uki-jaffna/latest/frontend/src/components/images (1).jpeg';
// ;

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
//         <div className="container">
//           <div className="hero-content">
//             <h1>"Your Next Mechanic is Just a Tap Away – Let’s Get Started!"</h1>
//             <p>Find a mechanic . It's easy and quick! Join us and make your vehicle maintenance hassle-free.</p>
//           </div>
//           <div className="hero-image">
//             <img src={heroimg} alt="hero" />
//           </div>
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


// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/LandingPage.css'; 
// // import logo from '/home/uki-jaffna/Documents/mechanic/frontend/src/components/Blue White and Black Simple Car Repair Shop Logo.png';
// // import heroimg from '/home/uki-jaffna/Documents/mechanic/frontend/src/components/LandingPage.js'; 

// // const LandingPage = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="landing-page">
// //       <nav className="navbar">
// //         <div className="container">
// //           <a className="navbar-brand" href="/">
// //             <img src={logo} alt="Logo" className="logo" />
// //           </a>
// //           <ul className="nav-links">
// //             <li><a href="#about">About</a></li>
// //             <li><a href="#services">Services</a></li>
// //             <li><a href="#contact">Contact</a></li>
// //             <li><a href="/login" className="btn btn-primary btn-small">Login</a></li>
// //             <li><a href="/register" className="btn btn-secondary btn-small">Register</a></li>
// //             <li><a href="/mechanic-register" className="btn btn-tertiary btn-small">Register as a Mechanic</a></li>
// //           </ul>
// //         </div>
// //       </nav>

// //       <header className="hero">
// //         <div className="hero-content">
// //           <h1>Your Next Mechanic is Just a Tap Away</h1>
// //           <p>Find a mechanic. It's easy and quick! Join us and make your vehicle maintenance hassle-free.</p>
// //           <button className="btn" onClick={() => navigate('/quote')}>
// //             Get a Quote
// //           </button>
// //         </div>
// //         <div className="hero-image">
// //           <img src={heroimg} alt="hero" style={{display: 'none'}} /> {/* Hidden for styling */}
// //         </div>
// //       </header>

// //       <footer>
// //         <div className="container">
// //           <p>&copy; 2024 Your Mechanic Finder App. All rights reserved.</p>
// //           <a href="#contact">Contact Us</a>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default LandingPage;
import React from 'react';
import { Link } from 'react-router-dom'; // Change to react-router-dom for routing
import { MapPin, Search, Star, Phone, Mail, Car, UserCog, Wrench } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="bg-primary text-white shadow">
        <div className="container py-3">
          <nav className="navbar navbar-expand-md navbar-dark">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img src="/fixigo-logo.png" alt="FIXIGO" className="me-2" height="30" />
              {/* <span className="fw-bold">FIXIGO</span> */}
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
                <li className="nav-item"><a href="#services" className="nav-link">Services</a></li>
                <li className="nav-item"><a href="#how-it-works" className="nav-link">How It Works</a></li>
                <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                <li className="nav-item"><Link to="/register" className="btn btn-outline-light me-2">Register</Link></li>
                <li className="nav-item"><Link to="/mechanic-register" className="btn btn-secondary">Register as Mechanic</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-4 fw-bold mb-3">Your Next Mechanic is Just a Tap Away</h1>
              <p className="lead mb-4">Find a reliable mechanic quickly and easily. Join us and make your vehicle maintenance hassle-free.</p>
              <Link to="/search" className="btn btn-light btn-lg">Find a Mechanic</Link>
            </div>
            <div className="col-md-6">
              <img src="/hero-image.jpg" alt="Mechanic working on a car" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">About FIXIGO</h2>
          <p className="text-center lead mx-auto" style={{ maxWidth: '800px' }}>
            FIXIGO is your go-to platform for connecting with skilled mechanics in your area. We simplify the process of finding and booking automotive services, ensuring your vehicle gets the care it deserves.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Services</h2>
          <div className="row">
            {[
              { icon: Search, title: "Find Mechanics", description: "Easily search for qualified mechanics in your area based on your specific needs and location." },
              { icon: Wrench, title: "Book Services", description: "Schedule appointments for various automotive services with just a few clicks, saving you time and hassle." },
              { icon: Car, title: "Emergency Assistance", description: "Get quick help for unexpected breakdowns with our network of reliable emergency service providers." },
              { icon: UserCog, title: "Mechanic Profiles", description: "View detailed profiles and ratings of mechanics to make informed decisions about your car's maintenance." }
            ].map((service, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <service.icon className="mb-3" size={48} />
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row">
            {[
              { number: 1, title: "Search", description: "Enter your location and the service you need to find nearby mechanics." },
              { number: 2, title: "Compare", description: "View profiles, ratings, and prices of nearby mechanics to make the best choice." },
              { number: 3, title: "Book", description: "Select a mechanic and schedule your appointment at a time that suits you." },
              { number: 4, title: "Service", description: "Get your vehicle serviced by a professional mechanic and enjoy peace of mind." }
            ].map((step, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div className="text-center">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <span className="fw-bold">{step.number}</span>
                  </div>
                  <h5>{step.title}</h5>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <div className="row">
            {[
              { quote: "FIXIGO saved me so much time and hassle. I found a great mechanic in minutes!", author: "John D.", rating: 5 },
              { quote: "The mechanics on this platform are truly professional. I'm a satisfied repeat customer!", author: "Sarah M.", rating: 5 }
            ].map((testimonial, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <blockquote className="blockquote mb-0">
                      <p>"{testimonial.quote}"</p>
                      <footer className="blockquote-footer">{testimonial.author}</footer>
                    </blockquote>
                    <div className="mt-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-warning" size={20} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Find Your Mechanic?</h2>
          <p className="lead mb-4">Join thousands of satisfied customers who have found reliable mechanics through our platform.</p>
          <Link to="/register" className="btn btn-light btn-lg">Get Started</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3 mb-md-0">
              <h5>FIXIGO</h5>
              <p className="small">Connecting you with the best mechanics in your area.</p>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#about" className="text-white">About</a></li>
                <li><a href="#services" className="text-white">Services</a></li>
                <li><a href="#how-it-works" className="text-white">How It Works</a></li>
                <li><a href="#contact" className="text-white">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li><Mail size={16} className="me-2" /> info@fixigo.com</li>
                <li><Phone size={16} className="me-2" /> (123) 456-7890</li>
                <li><MapPin size={16} className="me-2" /> 123 Mechanic Street, Auto City, AC 12345</li>
              </ul>
            </div>
          </div>
          <hr className="my-4" />
          <p className="text-center small mb-0">&copy; 2024 FIXIGO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
