
// MechanicDashboard.js
import React, { useState, useEffect } from 'react';
import CompletedRepairs from './CompletedRepairs'; // Correct component import
import MechanicRequests from './MechanicRequests'; // Correct component import
import PaymentInfo from './PaymentInfo';
import axios from 'axios';

const MechanicDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState('');

  const toggleAvailability = () => {
    if (!isAvailable) {
      getLiveLocation();
    } else {
      setLocation({ latitude: null, longitude: null });
    }
    setIsAvailable(!isAvailable);
  };

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLocationError('');
          updateMechanicStatus(latitude, longitude, true);
        },
        (error) => {
          setLocationError('Unable to retrieve your location.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  };

  const updateMechanicStatus = async (latitude, longitude, availability) => {
    try {
      const response = await axios.put('http://localhost:8000/api/mechanic/update-status', {
        isAvailable: availability,
        location: { latitude, longitude },
      });
      console.log('Mechanic status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating mechanic status:', error);
    }
  };

  useEffect(() => {
    if (!isAvailable) {
      updateMechanicStatus(null, null, false);
    }
  }, [isAvailable]);

  return (
    <div className="dashboard-container">
      <h1>Mechanic Dashboard</h1>

      <div className="availability-section">
        <h2>Availability Status</h2>
        <button
          onClick={toggleAvailability}
          className={`availability-button ${isAvailable ? 'available' : 'unavailable'}`}
        >
          {isAvailable ? 'Available for Services' : 'Unavailable for Services'}
        </button>
        {locationError && <p className="error-text">{locationError}</p>}
      </div>

      {/* Updated Section Names */}
      <MechanicRequests />
      <CompletedRepairs />
      <PaymentInfo />
    </div>
  );
};

export default MechanicDashboard;
