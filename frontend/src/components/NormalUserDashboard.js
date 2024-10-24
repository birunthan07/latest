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
//     try {
//       const response = await fetch(
//         `https://google-map-places.p.rapidapi.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&language=en&region=en`,
//         requestOptions
//       );
//       const result = await response.json();
//       if (result?.results?.length > 0) {
//         setLocation(result.results[0].formatted_address);
//       }
//     } catch (error) {
//       console.error("Error geocoding location:", error);
//       setErrorMessage("Failed to fetch location.");
//     }
//   }, [requestOptions]);

//   const useUserLocation = (geocodeFn, setLocationFn, setLocationCoordsFn) => {
//     useEffect(() => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
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
      
//       const response = await fetch(
//         `https://your-api-url/api/mechanics/search?lat=${locationCoords[0]}&lng=${locationCoords[1]}&vehicleType=${vehicleType}`,
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
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import config from '../config';
import 'leaflet/dist/leaflet.css';
  // Import Leaflet CSS

// Fix for default marker icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const UserDashboard = () => {
  const [location, setLocation] = useState('');
  const [locationCoords, setLocationCoords] = useState(null);
  const [mapCenter, setMapCenter] = useState([9.6615, 80.0255]);  // Default center
  const [suggestions, setSuggestions] = useState([]);
  const [vehicleType, setVehicleType] = useState('Car');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const rapidApiKey = config.RAPIDAPI_KEY;

  const requestOptions = useMemo(() => ({
    method: "GET",
    headers: new Headers({
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": "google-map-places.p.rapidapi.com",
      "Accept": "application/json"
    }),
    redirect: "follow"
  }), [rapidApiKey]);

  // const geocode = useCallback(async (latlng) => {
  //   try {
  //     const response = await fetch(
  //       `https://google-map-places.p.rapidapi.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&language=en&region=en`,
  //       requestOptions
  //     );
  
  //     if (!response.ok) {
  //       if (response.status === 403) {
  //         throw new Error("API key is invalid or not authorized.");
  //       }
  //       if (response.status === 429) {
  //         throw new Error("Too many requests. Please try again later.");
  //       }
  //       throw new Error(`Error geocoding location: ${response.statusText}`);
  //     }
  
  //     const result = await response.json();
  //     if (result?.results?.length > 0) {
  //       setLocation(result.results[0].formatted_address);
  //     }
  //   } catch (error) {
  //     console.error("Error geocoding location:", error);
  //     setErrorMessage(error.message); // Set the error message based on the caught error
  //   }
  // }, [requestOptions]);  

  const geocode = useCallback(async (latlng) => {
    const throttleDelay = 1000;
  
    try {
      await new Promise((resolve) => setTimeout(resolve, throttleDelay)); // Throttle
  
      const response = await fetch(
        `https://google-map-places.p.rapidapi.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&language=en&region=en`,
         requestOptions,  {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${rapidApiKey}`, // Replace with your new API key
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }
        throw new Error(`Error geocoding location: ${response.statusText}`);
      }
  
      const result = await response.json();
      if (result?.data?.length > 0) {
        setLocation(result.data[0].formatted_address);
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
      setErrorMessage(error.message); // Show the error message to the user
    }
  }, []);
  

  const useUserLocation = (geocodeFn, setLocationFn, setLocationCoordsFn) => {
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const latlng = [latitude, longitude];
            setLocationCoordsFn(latlng);
            geocodeFn(latlng);
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLocationFn('Unable to fetch location.');
          }
        );
      }
    }, [geocodeFn, setLocationCoordsFn, setLocationFn]);
  };

  useUserLocation(geocode, setLocation, setLocationCoords);

  const handleSearchMechanics = async () => {
    if (!locationCoords) {
      setErrorMessage("Please allow location access to search for nearby mechanics.");
      return;
    }

    try {
      const mechanicsApiUrl = `http://localhost:5000/api/mechanics/search`; // Change this to your actual API URL

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
      console.error("Error searching mechanics:", error);
      setErrorMessage("Failed to search for mechanics.");
    }
  };

  useEffect(() => {
    if (locationCoords) {
      setMapCenter(locationCoords);
    }
  }, [locationCoords]);

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <div className="search-section">
        <label>
          Location: {location || 'Fetching your location...'}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </label>
        <label>
          Vehicle Type:
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option value="Car">Car</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Truck">Truck</option>
          </select>
        </label>
        <button onClick={handleSearchMechanics} disabled={!locationCoords}>
          Search Mechanics
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      <div className="map-container" style={{ height: "400px", width: "100%" }}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
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

      {loadingSuggestions && <p>Loading mechanics...</p>}
      {suggestions.length === 0 && !loadingSuggestions && <p>No mechanics found nearby.</p>}
    </div>
  );
};

export default UserDashboard;




