import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageMechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const response = await axios.get('http://localhost:8000/api/admin/mechanic', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMechanics(response.data);
    } catch (err) {
      console.error('Error fetching mechanics:', err);
      setError(err.response?.data?.msg || err.message || 'Error fetching mechanics');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, mechanicId) => {
    try {
      setError(null);
      setSuccessMessage('');
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      console.log(`Attempting ${action} for mechanic ${mechanicId}`);

      let response;
      if (action === 'delete') {
        response = await axios.delete(
          `http://localhost:8000/api/admin/mechanic/${mechanicId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.patch(
          `http://localhost:8000/api/admin/mechanic/${mechanicId}/${action}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      console.log('Action response:', response.data);
      setSuccessMessage(response.data.msg);
      fetchMechanics(); // Refresh mechanic list
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
      setError(err.response?.data?.msg || err.message || `Error performing ${action}`);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Manage Mechanics</h2>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      {successMessage && (
        <p style={{
          backgroundColor: '#d4edda', border: '1px solid #c3e6cb', color: '#155724',
          padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem'
        }}>
          {successMessage}
        </p>
      )}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {mechanics.length ? (
          mechanics.map((mechanic) => (
            <li key={mechanic._id} style={{
              border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem',
              borderRadius: '0.25rem'
            }}>
              <p style={{ fontWeight: 'bold' }}>{mechanic.name} ({mechanic.email})</p>
              <p>Vehicle Type: {mechanic.vehicleType || 'N/A'}</p>
              <p>License Number: {mechanic.licenseNumber || 'N/A'}</p>
              <p>Documents: {Array.isArray(mechanic.verificationCertificate) ? mechanic.verificationCertificate.join(', ') : 'None'}</p>
              <p>Status: {mechanic.isApproved ? 'Approved' : 'Pending'}</p>
              <p>Created At: {new Date(mechanic.createdAt).toLocaleString()}</p>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={() => handleAction(mechanic.isApproved ? 'reject' : 'approve', mechanic._id)} style={{ marginRight: '0.5rem' }}>
                  {mechanic.isApproved ? 'Reject' : 'Approve'}
                </button>
                <button onClick={() => handleAction('delete', mechanic._id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No mechanics found.</p>
        )}
      </ul>
    </div>
  );
}

export default ManageMechanics;
