// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import L from 'leaflet';
// // import axios from 'axios';
// // import jwtDecode from 'jwt-decode';
// // import config from '../config';
// // import 'leaflet/dist/leaflet.css';
// //   // Import Leaflet CSS

// // // Fix for default marker icon issue with Leaflet and Webpack
// // delete L.Icon.Default.prototype._getIconUrl;
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
// //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
// //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// // });

// // const UserDashboard = () => {
// //   const [location, setLocation] = useState('');
// //   const [locationCoords, setLocationCoords] = useState(null);
// //   const [mapCenter, setMapCenter] = useState([9.6615, 80.0255]);  // Default center
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [vehicleType, setVehicleType] = useState('Car');
// //   const [loadingSuggestions, setLoadingSuggestions] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const rapidApiKey = config.RAPIDAPI_KEY;

// //   const requestOptions = useMemo(() => ({
// //     method: "GET",
// //     headers: new Headers({
// //       "x-rapidapi-key": rapidApiKey,
// //       "x-rapidapi-host": "google-map-places.p.rapidapi.com",
// //       "Accept": "application/json"
// //     }),
// //     redirect: "follow"
// //   }), [rapidApiKey]);

// //   const geocode = useCallback(async (latlng) => {
// //     try {
// //       const response = await fetch(
// //         `https://google-map-places.p.rapidapi.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&language=en&region=en`,
// //         requestOptions
// //       );
// //       const result = await response.json();
// //       if (result?.results?.length > 0) {
// //         setLocation(result.results[0].formatted_address);
// //       }
// //     } catch (error) {
// //       console.error("Error geocoding location:", error);
// //       setErrorMessage("Failed to fetch location.");
// //     }
// //   }, [requestOptions]);

// //   const useUserLocation = (geocodeFn, setLocationFn, setLocationCoordsFn) => {
// //     useEffect(() => {
// //       if (navigator.geolocation) {
// //         navigator.geolocation.getCurrentPosition(
// //           (position) => {
// //             const { latitude, longitude } = position.coords;
// //             const latlng = [latitude, longitude];
// //             setLocationCoordsFn(latlng);
// //             geocodeFn(latlng);
// //           },
// //           (error) => {
// //             console.error("Error fetching location:", error);
// //             setLocationFn('Unable to fetch location.');
// //           }
// //         );
// //       }
// //     }, [geocodeFn, setLocationCoordsFn, setLocationFn]);
// //   };

// //   useUserLocation(geocode, setLocation, setLocationCoords);

// //   const handleSearchMechanics = async () => {
// //     if (!locationCoords) {
// //       setErrorMessage("Please allow location access to search for nearby mechanics.");
// //       return;
// //     }

// //     try {
      
// //       const response = await fetch(
// //         `https://your-api-url/api/mechanics/search?lat=${locationCoords[0]}&lng=${locationCoords[1]}&vehicleType=${vehicleType}`,
// //         {
// //           method: 'GET',
// //           headers: {
// //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //           },
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`Error fetching mechanics: ${response.statusText}`);
// //       }

// //       const data = await response.json();
// //       setSuggestions(data.mechanics);
// //     } catch (error) {
// //       console.error("Error searching mechanics:", error);
// //       setErrorMessage("Failed to search for mechanics.");
// //     }
// //   };

// //   useEffect(() => {
// //     if (locationCoords) {
// //       setMapCenter(locationCoords);
// //     }
// //   }, [locationCoords]);

// //   return (
// //     <div className="user-dashboard">
// //       <h1>User Dashboard</h1>
// //       <div className="search-section">
// //         <label>
// //           Location: {location || 'Fetching your location...'}
// //           {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
// //         </label>
// //         <label>
// //           Vehicle Type:
// //           <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
// //             <option value="Car">Car</option>
// //             <option value="Motorcycle">Motorcycle</option>
// //             <option value="Truck">Truck</option>
// //           </select>
// //         </label>
// //         <button onClick={handleSearchMechanics} disabled={!locationCoords}>
// //           Search Mechanics
// //         </button>
// //         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
// //       </div>

// //       <div className="map-container" style={{ height: "400px", width: "100%" }}>
// //         <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
// //           <TileLayer
// //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //           />
// //           {suggestions.map((mechanic) => (
// //             <Marker key={mechanic._id} position={[mechanic.location.latitude, mechanic.location.longitude]}>
// //               <Popup>{mechanic.name} - {mechanic.serviceType}</Popup>
// //             </Marker>
// //           ))}
// //         </MapContainer>
// //       </div>

// //       {loadingSuggestions && <p>Loading mechanics...</p>}
// //       {suggestions.length === 0 && !loadingSuggestions && <p>No mechanics found nearby.</p>}
// //     </div>
// //   );
// // };

// // export default UserDashboard;


// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';
// import config from '../config';
// import 'leaflet/dist/leaflet.css';
//   // Import Leaflet CSS

// // Fix for default marker icon issue with Leaflet and Webpack
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const UserDashboard = () => {
//   const [location, setLocation] = useState('');
//   const [locationCoords, setLocationCoords] = useState(null);
//   const [mapCenter, setMapCenter] = useState([9.6615, 80.0255]);  // Default center
//   const [suggestions, setSuggestions] = useState([]);
//   const [vehicleType, setVehicleType] = useState('Car');
//   const [loadingSuggestions, setLoadingSuggestions] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const rapidApiKey = config.RAPIDAPI_KEY;

//   const requestOptions = useMemo(() => ({
//     method: "GET",
//     headers: new Headers({
//       "x-rapidapi-key": rapidApiKey,
//       "x-rapidapi-host": "google-map-places.p.rapidapi.com",
//       "Accept": "application/json"
//     }),
//     redirect: "follow"
//   }), [rapidApiKey]);

  
//   const geocode = useCallback(async (latlng) => {
//     const throttleDelay = 2000; // Increase throttle delay
  
//     console.log("Using RapidAPI key:", rapidApiKey);
//     console.log("Request options:", requestOptions);
  
//     for (let attempt = 0; attempt < 3; attempt++) { // Try 3 times
//       try {
//         await new Promise((resolve) => setTimeout(resolve, throttleDelay)); // Throttle
  
//         const response = await fetch(
//           `https://google-map-places.p.rapidapi.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&language=en&region=en`,
//           requestOptions
//         );
  
//         if (!response.ok) {
//           if (response.status === 429) {
//             console.warn("Too many requests. Retrying...");
//             continue; // Retry the request
//           } else if (response.status === 403) {
//             throw new Error("Access forbidden. Check API key or RapidAPI subscription.");
//           }
//           throw new Error(`Error geocoding location: ${response.statusText}`);
//         }
  
//         const result = await response.json();
//         if (result?.data?.length > 0) {
//           setLocation(result.data[0].formatted_address);
//         }
//         break; // Exit the loop if successful
//       } catch (error) {
//         console.error("Error geocoding location:", error);
//         setErrorMessage(error.message);
//         break; // Exit the loop on error
//       }
//     }
//   }, [rapidApiKey, requestOptions]);
  
  
  

//   const useUserLocation = (geocodeFn, setLocationFn, setLocationCoordsFn) => {
//     useEffect(() => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             console.log("Fetched location:", { latitude, longitude }); // Debugging log
//             const latlng = [latitude, longitude];
//             setLocationCoordsFn(latlng);
//             geocodeFn(latlng);
//           },
//           (error) => {
//             console.error("Error fetching location:", error);
//             setLocationFn('Unable to fetch location.');
//           }
//         );        
//       }
//     }, [geocodeFn, setLocationCoordsFn, setLocationFn]);
//   };

//   useUserLocation(geocode, setLocation, setLocationCoords);

//   const handleSearchMechanics = async () => {
//     if (!locationCoords) {
//       setErrorMessage("Please allow location access to search for nearby mechanics.");
//       return;
//     }

//     try {
//       const mechanicsApiUrl = `http://localhost:5000/api/mechanics/search`; // Change this to your actual API URL

//       const response = await fetch(
//         `${mechanicsApiUrl}?lat=${locationCoords[0]}&lng=${locationCoords[1]}&vehicleType=${vehicleType}`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Error fetching mechanics: ${response.statusText}`);
//       }
//       console.log(`Fetching mechanics from: ${mechanicsApiUrl}?lat=${locationCoords[0]}&lng=${locationCoords[1]}&vehicleType=${vehicleType}`);

//       const data = await response.json();
//       setSuggestions(data.mechanics);
//     } catch (error) {
//       console.error("Error searching mechanics:", error);
//       setErrorMessage("Failed to search for mechanics.");
//     }
//   };

//   useEffect(() => {
//     if (locationCoords) {
//       setMapCenter(locationCoords);
//     }
//   }, [locationCoords]);

//   return (
//     <div className="user-dashboard">
//       <h1>User Dashboard</h1>
//       <div className="search-section">
//         <label>
//           Location: {location || 'Fetching your location...'}
//           {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         </label>
//         <label>
//           Vehicle Type:
//           <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
//             <option value="Car">Car</option>
//             <option value="Motorcycle">Motorcycle</option>
//             <option value="Truck">Truck</option>
//           </select>
//         </label>
//         <button onClick={handleSearchMechanics} disabled={!locationCoords}>
//           Search Mechanics
//         </button>
//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       </div>

//       <div className="map-container" style={{ height: "400px", width: "100%" }}>
//         <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {suggestions.map((mechanic) => (
//             <Marker key={mechanic._id} position={[mechanic.location.latitude, mechanic.location.longitude]}>
//               <Popup>{mechanic.name} - {mechanic.serviceType}</Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>

//       {loadingSuggestions && <p>Loading mechanics...</p>}
//       {suggestions.length === 0 && !loadingSuggestions && <p>No mechanics found nearby.</p>}
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import config from '../config';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaCar, FaMotorcycle, FaTruck, FaSearch, FaSpinner } from 'react-icons/fa';

// Fix for default marker icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function UserDashboard() {
  const [location, setLocation] = useState('');
  const [locationCoords, setLocationCoords] = useState(null);
  const [mapCenter, setMapCenter] = useState([9.6615, 80.0255]); // Default center
  const [suggestions, setSuggestions] = useState([]);
  const [vehicleType, setVehicleType] = useState('Car');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const rapidApiKey = config.RAPIDAPI_KEY;

  const requestOptions = useMemo(() => ({
    method: 'GET',
    headers: new Headers({
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
      'Accept': 'application/json',
    }),
    redirect: 'follow',
  }), [rapidApiKey]);

  const geocode = useCallback(async (latlng) => {
    const url = `https://google-map-places.p.rapidapi.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&language=en&region=en`;
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch error:", errorText);
        if (response.status === 403) {
          throw new Error("Access forbidden. Check API key or RapidAPI subscription.");
        }
        throw new Error(`Error geocoding location: ${response.statusText}`);
      }
  
      const result = await response.json();
      if (result?.results?.length > 0) {
        setLocation(result.results[0].formatted_address);
      } else {
        setErrorMessage("No results found for the location.");
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
      setErrorMessage(error.message);
    }
  }, [requestOptions]);

  const useUserLocation = (geocodeFn, setLocationFn, setLocationCoordsFn) => {
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Fetched location:', { latitude, longitude });
            const latlng = [latitude, longitude];
            setLocationCoordsFn(latlng);
            geocodeFn(latlng);
          },
          (error) => {
            console.error('Error fetching location:', error);
            setLocationFn('Unable to fetch location.');
          }
        );
      }
    }, [geocodeFn, setLocationCoordsFn, setLocationFn]);
  };

  useUserLocation(geocode, setLocation, setLocationCoords);

  const handleSearchMechanics = async () => {
    if (!locationCoords) {
      setErrorMessage('Please allow location access to search for nearby mechanics.');
      return;
    }

    setLoadingSuggestions(true);
    setErrorMessage('');

    try {
      const mechanicsApiUrl = `http://localhost:8000/api/mechanics/`;

      const response = await fetch(
        `${mechanicsApiUrl}?lat=${locationCoords[0]}&lng=${locationCoords[1]}&vehicleType=${vehicleType}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching mechanics: ${response.statusText}`);
      }
      console.log(`Fetching mechanics from: ${mechanicsApiUrl}?lat=${locationCoords[0]}&lng=${locationCoords[1]}&vehicleType=${vehicleType}`);

      const data = await response.json();
      setSuggestions(data.mechanics);
    } catch (error) {
      console.error('Error searching mechanics:', error);
      setErrorMessage('Failed to search for mechanics.');
    } finally {
      setLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    if (locationCoords) {
      setMapCenter(locationCoords);
    }
  }, [locationCoords]);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f4f8',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
      fontSize: '2.5rem',
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '30px',
    },
    searchSection: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      color: '#34495e',
      fontWeight: 'bold',
    },
    select: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #bdc3c7',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#2980b9',
    },
    mapContainer: {
      height: '400px',
      width: '100%',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    errorMessage: {
      color: '#e74c3c',
      marginTop: '10px',
    },
    loadingMessage: {
      textAlign: 'center',
      color: '#3498db',
      marginTop: '20px',
      fontSize: '18px',
    },
    noMechanicsMessage: {
      textAlign: 'center',
      color: '#7f8c8d',
      marginTop: '20px',
      fontSize: '18px',
    },
    icon: {
      marginRight: '8px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Dashboard</h1>
      <div style={styles.searchSection}>
        <label style={styles.label}>
          <FaMapMarkerAlt style={styles.icon} />
          Location: {location || 'Fetching your location...'}
        </label>
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        <label style={styles.label}>
          Vehicle Type:
          <select 
            value={vehicleType} 
            onChange={(e) => setVehicleType(e.target.value)}
            style={styles.select}
          >
            <option value="Car">Car</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Truck">Truck</option>
          </select>
        </label>
        <button 
          onClick={handleSearchMechanics} 
          disabled={!locationCoords}
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          <FaSearch style={styles.icon} />
          Search Mechanics
        </button>
      </div>

      <div style={styles.mapContainer}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {suggestions.map((mechanic) => (
            <Marker key={mechanic._id} position={[mechanic.location.latitude, mechanic.location.longitude]}>
              <Popup>{mechanic.name} - {mechanic.serviceType}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {loadingSuggestions && (
        <p style={styles.loadingMessage}>
          <FaSpinner style={{ ...styles.icon, animation: 'spin 1s linear infinite' }} />
          Loading mechanics...
        </p>
      )}
      {suggestions.length === 0 && !loadingSuggestions && (
        <p style={styles.noMechanicsMessage}>No mechanics found nearby.</p>
      )}
    </div>
  );
}