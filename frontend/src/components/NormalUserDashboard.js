


// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/NormalUserDashboard.css';
// import {jwtDecode }from 'jwt-decode';
// import config from '../config';  // Import the config file

// // Fix for default marker icon issue with Leaflet and Webpack
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// // Custom hook for fetching user location
// const useUserLocation = (geocode, setLocation, setLocationCoords) => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUserLocation = async () => {
//       setLoading(true);
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const { latitude, longitude } = position.coords;
//             setUserLocation([latitude, longitude]);
//             const locationName = await geocode([latitude, longitude]);
//             setLocation(locationName.length > 0 ? locationName[0].formatted_address : 'Unknown Location');
//             setLocationCoords([latitude, longitude]);
//             setLoading(false);
//           },
//           (error) => {
//             setError('Error getting user location.');
//             setLoading(false);
//           }
//         );
//       } else {
//         setError('Geolocation is not supported by this browser.');
//         setLoading(false);
//       }
//     };

//     fetchUserLocation();
//   }, [geocode, setLocation, setLocationCoords]);

//   return { userLocation, loading, error };
// };

// const UserDashboard = () => {
//   const [location, setLocation] = useState('');
//   const [locationCoords, setLocationCoords] = useState(null);
//   const [mapCenter, setMapCenter] = useState([9.6615, 80.0255]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [activeInput, setActiveInput] = useState('');
//   const [vehicleType, setVehicleType] = useState('Car');
//   const [loadingSuggestions, setLoadingSuggestions] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const rapidApiKey = config.RAPIDAPI_KEY;

//   const requestOptions = useMemo(() => ({
//     method: "GET",
//     headers: new Headers({
//       "x-rapidapi-key": 'c0dad4acbcmshab04cbb39606fd6p1ebe1ejsn05362290914a',
//       "x-rapidapi-host": "map-geocoding.p.rapidapi.com",
//       "Accept": "application/json"
//     }),
//     redirect: "follow"
//   }), [rapidApiKey]);

//   const geocode = useCallback(async (latlng) => {
//     try {
//       const response = await fetch(
//         `https://map-geocoding.p.rapidapi.com/json?latlng=${latlng[0]},${latlng[1]}`,
//         requestOptions
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.results || [];
//     } catch (error) {
//       console.error('Error in geocoding:', error);
//       return [];
//     }
//   }, [requestOptions]);

//   const { userLocation, loading: loadingLocation, error: locationError } = useUserLocation(geocode, setLocation, setLocationCoords);

//   const fetchPlaceSuggestions = async (query) => {
//     setLoadingSuggestions(true);
//     try {
//       const response = await fetch(
//         `https://map-geocoding.p.rapidapi.com/json?address=${encodeURIComponent(query)}`,
//         requestOptions
//       );
//       const data = await response.json();
//       setSuggestions(data.results || []);
//     } catch (error) {
//       setErrorMessage('Error fetching location suggestions.');
//     } finally {
//       setLoadingSuggestions(false);
//     }
//   };

//   const handleInputChange = async (e, setter) => {
//     const value = e.target.value;
//     setter(value);
//     setActiveInput('location');
//     if (value.length > 2) {
//       await fetchPlaceSuggestions(value);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionSelect = (place, setter, coordsSetter) => {
//     setter(place.formatted_address);
//     coordsSetter([place.geometry.location.lat, place.geometry.location.lng]);
//     setSuggestions([]);
//     setActiveInput('');
//   };

//   const MapClickHandler = () => {
//     useMapEvents({
//       click: async (e) => {
//         const { lat, lng } = e.latlng;
//         const locationName = await geocode([lat, lng]);

//         if (!locationCoords) {
//           setLocationCoords([lat, lng]);
//           setLocation(locationName.length > 0 ? locationName[0].formatted_address : 'Unknown Location');
//         }
//       },
//     });
//     return null;
//   };

//   const validateInputs = () => {
//     if (!location) {
//       setErrorMessage('Please provide a service location.');
//       return false;
//     }
//     return true;
//   };

//   const handleRequestMechanic = async () => {
//     const token = localStorage.getItem('token'); 
//     if (!token) {
//       setErrorMessage('You must be logged in to request a mechanic.');
//       return;
//     }

//     if (!validateInputs()) {
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       const response = await fetch('http://localhost:8000/api/mechanic-request', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           location,
//           locationCoords,
//           vehicleType,
//         }),
//       });

//       if (!response.ok) {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.message || 'Failed to create mechanic request');
//       }

//       const data = await response.json();
//       alert('Mechanic request created successfully!');
//     } catch (error) {
//       setErrorMessage(`Error creating mechanic request: ${error.message || 'Please try again.'}`);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h2>Find a Mechanic</h2>
//       {loadingLocation && <p>Loading your location...</p>}
//       {locationError && <p className="error">{locationError}</p>}
//       {errorMessage && <p className="error">{errorMessage}</p>}
//       <div className="map-container">
//         <MapContainer center={mapCenter} zoom={13} style={{ width: '100%', height: '400px' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {userLocation && <Marker position={userLocation}><Popup>Your location</Popup></Marker>}
//           <MapClickHandler />
//         </MapContainer>
//       </div>
//       <input
//         type="text"
//         value={location}
//         onChange={(e) => handleInputChange(e, setLocation)}
//         placeholder="Enter service location"
//       />
//       {activeInput === 'location' && suggestions.length > 0 && (
//         <ul className="suggestions">
//           {suggestions.map((place, index) => (
//             <li key={index} onClick={() => handleSuggestionSelect(place, setLocation, setLocationCoords)}>
//               {place.formatted_address}
//             </li>
//           ))}
//         </ul>
//       )}
//       <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
//         <option value="Car">Car</option>
//         <option value="Motorcycle">Motorcycle</option>
//         <option value="Truck">Truck</option>
//       </select>
//       <button onClick={handleRequestMechanic}>Request Mechanic</button>
//     </div>
//   );
// };

// export default UserDashboard;





import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/NormalUserDashboard.css';
  import {jwtDecode} from 'jwt-decode';
import config from '../config';  // Import the config file

// Fix for default marker icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hook for fetching user location
const useUserLocation = (geocode, setLocation, setLocationCoords) => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserLocation = async () => {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            const locationName = await geocode([latitude, longitude]);
            setLocation(locationName.length > 0 ? locationName[0].formatted_address : 'Unknown Location');
            setLocationCoords([latitude, longitude]);
            setLoading(false);
          },
          (error) => {
            setError('Error getting user location.');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    fetchUserLocation();
  }, [geocode, setLocation, setLocationCoords]);

  return { userLocation, loading, error };
};

const UserDashboard = () => {
  const [location, setLocation] = useState('');
  const [locationCoords, setLocationCoords] = useState(null);
  const [mapCenter, setMapCenter] = useState([9.6615, 80.0255]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const rapidApiKey = config.RAPIDAPI_KEY;

  const requestOptions = useMemo(() => ({
    method: "GET",
    headers: new Headers({
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": "map-geocoding.p.rapidapi.com",
      "Accept": "application/json"
    }),
    redirect: "follow"
  }), [rapidApiKey]);

  const geocode = useCallback(async (latlng) => {
    try {
      const response = await fetch(
        `https://map-geocoding.p.rapidapi.com/json?latlng=${latlng[0]},${latlng[1]}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error in geocoding:', error);
      return [];
    }
  }, [requestOptions]);

  const { userLocation, loading: loadingLocation, error: locationError } = useUserLocation(geocode, setLocation, setLocationCoords);

  const fetchPlaceSuggestions = async (query) => {
    setLoadingSuggestions(true);
    try {
      const response = await fetch(
        `https://map-geocoding.p.rapidapi.com/json?address=${encodeURIComponent(query)}`,
        requestOptions
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      setErrorMessage('Error fetching location suggestions.');
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleInputChange = async (e, setter) => {
    const value = e.target.value;
    setter(value);
    setActiveInput('location');
    if (value.length > 2) {
      await fetchPlaceSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (place, setter, coordsSetter) => {
    setter(place.formatted_address);
    coordsSetter([place.geometry.location.lat, place.geometry.location.lng]);
    setSuggestions([]);
    setActiveInput('');
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const locationName = await geocode([lat, lng]);

        if (!locationCoords) {
          setLocationCoords([lat, lng]);
          setLocation(locationName.length > 0 ? locationName[0].formatted_address : 'Unknown Location');
        }
      },
    });
    return null;
  };

  const validateInputs = () => {
    if (!location) {
      setErrorMessage('Please provide a service location.');
      return false;
    }
    return true;
  };

  const handleRequestMechanic = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      setErrorMessage('You must be logged in to request a mechanic.');
      return;
    }

    if (!validateInputs()) {
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const response = await fetch('http://localhost:8000/api/mechanic-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location,
          locationCoords,
          vehicleType,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to create mechanic request');
      }

      const data = await response.json();
      alert('Mechanic request created successfully!');
    } catch (error) {
      setErrorMessage(`Error creating mechanic request: ${error.message || 'Please try again.'}`);
    }
  };

  return (
    <div className="dashboard">
      <h2>Find a Mechanic</h2>
      {loadingLocation && <p>Loading your location...</p>}
      {locationError && <p className="error">{locationError}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="map-container">
        <MapContainer center={mapCenter} zoom={13} style={{ width: '100%', height: '400px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && <Marker position={userLocation}><Popup>Your location</Popup></Marker>}
          <MapClickHandler />
        </MapContainer>
      </div>
      <input
        type="text"
        value={location}
        onChange={(e) => handleInputChange(e, setLocation)}
        placeholder="Enter service location"
      />
      {activeInput === 'location' && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((place, index) => (
            <li key={index} onClick={() => handleSuggestionSelect(place, setLocation, setLocationCoords)}>
              {place.formatted_address}
            </li>
          ))}
        </ul>
      )}
      <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
        <option value="Car">Car</option>
        <option value="Motorcycle">Motorcycle</option>
        <option value="Truck">Truck</option>
      </select>
      <button onClick={handleRequestMechanic}>Request Mechanic</button>
    </div>
  );
};

export default UserDashboard;
