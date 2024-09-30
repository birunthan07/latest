// src/components/MechanicRequests.js
import React, { useState } from 'react';

const MechanicRequests = () => {
  const [mechanicRequests, setMechanicRequests] = useState([
    { id: 1, customer: 'Alice Johnson', service: 'Oil Change', location: '123 Elm St' },
    { id: 2, customer: 'Bob Brown', service: 'Tire Rotation', location: '456 Maple Ave' },
    { id: 3, customer: 'Charlie Green', service: 'Brake Replacement', location: '789 Oak Dr' }
  ]);

  const handleAccept = (id) => {
    // Logic to accept the service request (e.g., API call)
    alert(`Service request with ID ${id} accepted`);
    setMechanicRequests(mechanicRequests.filter((request) => request.id !== id)); // Remove after accepting
  };

  const handleReject = (id) => {
    // Logic to reject the service request (e.g., API call)
    alert(`Service request with ID ${id} rejected`);
    setMechanicRequests(mechanicRequests.filter((request) => request.id !== id)); // Remove after rejecting
  };

  return (
    <div className="mechanic-requests-section">
      <h2>Service Requests</h2>
      <ul>
        {mechanicRequests.map((request) => (
          <li key={request.id}>
            Customer: {request.customer}, Service: {request.service}, Location: {request.location}
            <button onClick={() => handleAccept(request.id)}>Accept</button>
            <button onClick={() => handleReject(request.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MechanicRequests;
