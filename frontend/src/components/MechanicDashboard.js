

// import React, { useState, useEffect } from 'react';
// import CompletedRepairs from './CompletedRepairs';
// import MechanicRequests from './MechanicRequests';
// import PaymentInfo from './PaymentInfo';
// import axios from 'axios';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000');

// const MechanicDashboard = () => {
//   const [isAvailable, setIsAvailable] = useState(false);
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [locationError, setLocationError] = useState('');
//   const [packages, setPackages] = useState([]);

//   const toggleAvailability = () => {
//     if (!isAvailable) {
//       getLiveLocation();
//     } else {
//       setLocation({ latitude: null, longitude: null });
//       updateMechanicStatus(null, null, false);
//     }
//     setIsAvailable(!isAvailable);
//   };

//   const getLiveLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//           setLocationError('');
//           updateMechanicStatus(latitude, longitude, true);
//         },
//         (error) => {
//           setLocationError('Unable to retrieve location. Please enable location services.');
//           console.error('Geolocation error:', error);
//         }
//       );
//     } else {
//       setLocationError('Geolocation is not supported by this browser.');
//     }
//   };

//   const updateMechanicStatus = async (latitude, longitude, availability) => {
//     try {
//       await axios.post('http://localhost:8000/api/mechanics/status', {
//         latitude,
//         longitude,
//         availability,
//       });
//     } catch (error) {
//       console.error('Error updating mechanic status:', error);
//     }
//   };

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('Socket connected:', socket.id);
//     });

//     axios.get('http://localhost:8000/api/packages')
//       .then(response => setPackages(response.data))
//       .catch(error => console.error('Error fetching packages:', error));

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Mechanic Dashboard</h1>
//       <button onClick={toggleAvailability}>
//         {isAvailable ? 'Set as Unavailable' : 'Set as Available'}
//       </button>
//       {locationError && <p style={{ color: 'red' }}>{locationError}</p>}
//       {isAvailable && location.latitude && location.longitude && (
//         <p>Current Location: Latitude {location.latitude}, Longitude {location.longitude}</p>
//       )}
//       <CompletedRepairs />
//       <MechanicRequests />
//       <PaymentInfo />

//       <h3>Available Packages</h3>
//       <ul>
//         {packages.map(pkg => (
//           <li key={pkg._id}>
//             <strong>{pkg.name}</strong>: {pkg.description} - ${pkg.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MechanicDashboard;


import React, { useState, useEffect } from 'react';
import CompletedRepairs from './CompletedRepairs';
import MechanicRequests from './MechanicRequests';
import PaymentInfo from './PaymentInfo';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');  // Match with the backend port

const MechanicDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState('');
  const [packages, setPackages] = useState([]);

  const toggleAvailability = () => {
    if (!isAvailable) {
      getLiveLocation();
    } else {
      setLocation({ latitude: null, longitude: null });
      updateMechanicStatus(null, null, false);
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
          setLocationError('Unable to retrieve location. Please enable location services.');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  const updateMechanicStatus = async (latitude, longitude, availability) => {
    try {
      await axios.post('http://localhost:8000/api/mechanic/status', {
        latitude,
        longitude,
        availability,
      });
    } catch (error) {
      console.error('Error updating mechanic status:', error);
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    axios.get('http://localhost:8000/api/packages')
      .then(response => setPackages(response.data))
      .catch(error => console.error('Error fetching packages:', error));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Mechanic Dashboard</h1>
      <button onClick={toggleAvailability}>
        {isAvailable ? 'Set as Unavailable' : 'Set as Available'}
      </button>
      {locationError && <p style={{ color: 'red' }}>{locationError}</p>}
      {isAvailable && location.latitude && location.longitude && (
        <p>Current Location: Latitude {location.latitude}, Longitude {location.longitude}</p>
      )}
      <CompletedRepairs />
      <MechanicRequests />
      <PaymentInfo />

      <h3>Available Packages</h3>
      <ul>
        {packages.map(pkg => (
          <li key={pkg._id}>
            <strong>{pkg.name}</strong>: {pkg.description} - ${pkg.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MechanicDashboard;
