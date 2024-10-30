


import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaStar, FaPhone, FaEnvelope, FaCar, FaUserCog, FaWrench } from 'react-icons/fa';

const colors = {
  primary: '#4A90E2',
  secondary: '#50E3C2',
  accent: '#F5A623',
  dark: '#2C3E50',
  light: '#ECF0F1',
  white: '#FFFFFF',
};

export default function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      color: colors.dark,
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: colors.primary,
        color: colors.white,
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: colors.white
          }}>
            <img src="/home/uki-jaffna/latest final/frontend/src/components/Blue White and Black Simple Car Repair Shop Logo.png" alt="FIXIGO" style={{ height: '30px', marginRight: '0.5rem' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>FIXIGO</span>
          </Link>
          <nav>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {['About', 'Services', 'Contact'].map((item, index) => (
                <li key={index} style={{ marginLeft: '1.5rem' }}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} style={{
                    color: colors.white,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'opacity 0.3s'
                  }}>
                    {item}
                  </a>
                </li>
              ))}
              <li style={{ marginLeft: '1.5rem' }}>
                <Link to="/login" style={{
                  color: colors.white,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'opacity 0.3s'
                }}>
                  Login
                </Link>
              </li>
              <li style={{ marginLeft: '1.5rem' }}>
                <Link to="/register" style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s'
                }}>
                  Register
                </Link>
              </li>
              <li style={{ marginLeft: '1rem' }}>
                <Link to="/mechanic-register" style={{
                  backgroundColor: colors.accent,
                  color: colors.white,
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s'
                }}>
                  Mechanic
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        color: colors.white,
        padding: '4rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              Your Next Mechanic is Just a Tap Away
            </h1>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem'
            }}>
              Find a reliable mechanic quickly and easily. Join us and make your vehicle maintenance hassle-free.
            </p>
            <Link to="/user-dashboard" style={{
              backgroundColor: colors.accent,
              color: colors.white,
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}>
              Find a Mechanic
            </Link>
          </div>
          <div style={{ flex: 1, marginLeft: '2rem' }}>
            <img src="/home/uki-jaffna/latest final/frontend/src/components/DALL·E 2024-10-29 12.27.33 - A mechanic working in a modern repair shop, focused on fixing a car engine. The mechanic is wearing a blue uniform and safety goggles, surrounded by v.webp" alt="Mechanic working on a car" style={{
              maxWidth: '100%',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About FIXIGO</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            FIXIGO is your go-to platform for connecting with skilled mechanics in your area. We simplify the process of finding and booking automotive services, ensuring your vehicle gets the care it deserves.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '4rem 0', backgroundColor: colors.light }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Our Services</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {[
              { icon: FaSearch, title: "Find Mechanics", description: "Easily search for qualified mechanics in your area based on your specific needs and location." },
              { icon: FaWrench, title: "Book Services", description: "Schedule appointments for various automotive services with just a few clicks, saving you time and hassle." },
              { icon: FaCar, title: "Emergency Assistance", description: "Get quick help for unexpected breakdowns with our network of reliable emergency service providers." },
              { icon: FaUserCog, title: "Mechanic Profiles", description: "View detailed profiles and ratings of mechanics to make informed decisions about your car's maintenance." }
            ].map((service, index) => (
              <div key={index} style={{
                flex: '1 1 250px',
                maxWidth: '300px',
                backgroundColor: colors.white,
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s'
              }}>
                <service.icon style={{ fontSize: '3rem', color: colors.primary, marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>How It Works</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {[
              { number: 1, title: "Search", description: "Enter your location and the service you need to find nearby mechanics." },
              { number: 2, title: "Compare", description: "View profiles, ratings, and prices of nearby mechanics to make the best choice." },
              { number: 3, title: "Book", description: "Select a mechanic and schedule your appointment at a time that suits you." },
              { number: 4, title: "Service", description: "Get your vehicle serviced by a professional mechanic and enjoy peace of mind." }
            ].map((step, index) => (
              <div key={index} style={{ flex: '1 1 250px', maxWidth: '250px', textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: colors.primary,
                  color: colors.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  margin: '0 auto 1rem'
                }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ padding: '4rem 0', backgroundColor: colors.light }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>What Our Customers Say</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {[
              { quote: "FIXIGO saved me so much time and hassle. I found a great mechanic in minutes!", author: "John D.", rating: 5 },
              { quote: "The mechanics on this platform are truly professional. I'm a satisfied repeat customer!", author: "Sarah M.", rating: 5 }
            ].map((testimonial, index) => (
              <div key={index} style={{
                flex: '1 1 300px',
                maxWidth: '400px',
                backgroundColor: colors.white,
                borderRadius: '8px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1rem' }}>"{testimonial.quote}"</p>
                <p style={{ fontWeight: 'bold' }}>{testimonial.author}</p>
                <div style={{ color: colors.accent, marginTop: '0.5rem' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} style={{ marginRight: '0.25rem' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" style={{
        padding: '4rem 0',
        backgroundColor: colors.primary,
        color: colors.white,
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Find Your Mechanic?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Join thousands of satisfied customers who have found reliable mechanics through our platform.
          </p>
          <Link to="/register" style={{
            backgroundColor: colors.accent,
            color: colors.white,
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}>
            Get Started
          </Link>
        </div>
      </section>

     

      {/* Footer */}
      <footer style={{
        backgroundColor: colors.dark,
        color: colors.light,
        padding: '3rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          <div style={{ flex: '1 1 300px', marginBottom: '2rem' }}>
            <h5 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>FIXIGO</h5>
            <p style={{ fontSize: '0.9rem' }}>Connecting you with the best mechanics in your area.</p>
          </div>
          <div style={{ flex: '1 1 300px', marginBottom: '2rem' }}>
            <h5 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Quick Links</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['About', 'Services', 'How It Works', 'Contact'].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} style={{
                    color: colors.light,
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>

          </div>
          <div style={{ flex: '1 1 300px', marginBottom: '2rem' }}>
            <h5 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Us</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <FaEnvelope style={{ marginRight: '0.5rem' }} /> info@fixigo.com
              </li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <FaPhone style={{ marginRight: '0.5rem' }} /> (123) 456-7890
              </li>
              <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} /> 123 Mechanic Street, Auto City, AC 12345
              </li>
            </ul>
          </div>
        </div>
        <div style={{
          borderTop: `1px solid ${colors.light}`,
          marginTop: '2rem',
          paddingTop: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.9rem' }}>&copy; 2024 FIXIGO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}