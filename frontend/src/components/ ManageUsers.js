// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ManageUsers() {
//     const [users, setUsers] = useState([]);
//     const [mechanics, setMechanics] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState('');

//     useEffect(() => {
//         fetchUsers();
//         fetchMechanics();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No token found, please log in.');
//             }

//             const response = await axios.get('http://localhost:8000/api/admin/users', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUsers(response.data);
//         } catch (err) {
//             console.error('Error fetching users:', err);
//             setError(err.response?.data?.msg || err.message || 'Error fetching users');
//         }
//     };

//     const fetchMechanics = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No token found, please log in.');
//             }

//             const response = await axios.get('http://localhost:8000/api/admin/mechanics', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setMechanics(response.data);
//         } catch (err) {
//             console.error('Error fetching mechanics:', err);
//             setError(err.response?.data?.msg || err.message || 'Error fetching mechanics');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAction = async (action, id, isMechanic = false) => {
//         try {
//             setError(null);
//             setSuccessMessage('');
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No token found, please log in.');
//             }

//             const endpoint = isMechanic
//                 ? `http://localhost:8000/api/admin/mechanic/${id}/${action}`
//                 : `http://localhost:8000/api/admin/user/${id}/${action}`;

//             const response = await axios.patch(endpoint, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setSuccessMessage(response.data.msg);
//             if (isMechanic) {
//                 fetchMechanics(); // Refresh mechanic list
//             } else {
//                 fetchUsers(); // Refresh user list
//             }
//         } catch (err) {
//             console.error(`Error performing ${action}:`, err);
//             setError(err.response?.data?.msg || err.message || `Error performing ${action}`);
//         }
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div style={{ padding: '1rem' }}>
//             <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Manage Users and Mechanics</h2>
//             {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
//             {successMessage && (
//                 <p style={{
//                     backgroundColor: '#d4edda', border: '1px solid #c3e6cb', color: '#155724',
//                     padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem'
//                 }}>
//                     {successMessage}
//                 </p>
//             )}
            
//             <h3>Users</h3>
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//                 {users.length ? (
//                     users.map((user) => (
//                         <li key={user._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem' }}>
//                             <p style={{ fontWeight: 'bold' }}>{user.username} ({user.email})</p>
//                             <p>Role: {user.role}</p>
//                             <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
//                             <div style={{ marginTop: '0.5rem' }}>
//                                 <button onClick={() => handleAction(user.isActive ? 'deactivate' : 'activate', user._id)} style={{ marginRight: '0.5rem' }}>
//                                     {user.isActive ? 'Deactivate' : 'Activate'}
//                                 </button>
//                                 <button onClick={() => handleAction(user.role === 'admin' ? 'demote' : 'promote', user._id)} style={{ marginRight: '0.5rem' }}>
//                                     {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
//                                 </button>
//                             </div>
//                         </li>
//                     ))
//                 ) : (
//                     <p>No users found.</p>
//                 )}
//             </ul>

//             <h3>Mechanics</h3>
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//                 {mechanics.length ? (
//                     mechanics.map((mechanic) => (
//                         <li key={mechanic._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem' }}>
//                             <p style={{ fontWeight: 'bold' }}>{mechanic.username} ({mechanic.email})</p>
//                             <p>Status: {mechanic.mechanicStatus}</p>
//                             <div style={{ marginTop: '0.5rem' }}>
//                                 <button onClick={() => handleAction(mechanic.isActive ? 'deactivate' : 'activate', mechanic._id, true)} style={{ marginRight: '0.5rem' }}>
//                                     {mechanic.isActive ? 'Deactivate' : 'Activate'}
//                                 </button>
//                             </div>
//                         </li>
//                     ))
//                 ) : (
//                     <p>No mechanics found.</p>
//                 )}
//             </ul>
//         </div>
//     );
// }

// export default ManageUsers;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [mechanics, setMechanics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchMechanics();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found, please log in.');

            const response = await axios.get('http://localhost:8000/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.response?.data?.msg || err.message || 'Error fetching users');
        }
    };

    const fetchMechanics = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found, please log in.');

            const response = await axios.get('http://localhost:8000/api/admin/mechanics', {
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

    const handleAction = async (action, id, isMechanic = false) => {
        try {
            setError(null);
            setSuccessMessage('');
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found, please log in.');
    
            const endpoint = isMechanic
                ? `http://localhost:8000/api/admin/mechanic/${id}/${action}`
                : `http://localhost:8000/api/admin/user/${id}/${action}`;
    
            console.log(`Attempting to ${action} for ID: ${id} at endpoint: ${endpoint}`);
    
            const response = await axios.patch(endpoint, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            setSuccessMessage(response.data.msg);
            if (isMechanic) {
                fetchMechanics(); // Refresh mechanic list
            } else {
                fetchUsers(); // Refresh user list
            }
        } catch (err) {
            console.error(`Error performing ${action}:`, err);
            setError(err.response?.data?.msg || err.message || `Error performing ${action}`);
        }
    };
    

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Manage Users and mechanics</h2>
            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
            {successMessage && (
                <p style={{
                    backgroundColor: '#d4edda', border: '1px solid #c3e6cb', color: '#155724',
                    padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem'
                }}>
                    {successMessage}
                </p>
            )}
            
            <h3>Users</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {users.length ? (
                    users.map((user) => (
                        <li key={user._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem' }}>
                            <p style={{ fontWeight: 'bold' }}>{user.username} ({user.email})</p>
                            <p>Role: {user.role}</p>
                            <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
                            <div style={{ marginTop: '0.5rem' }}>
                                <button onClick={() => handleAction(user.isActive ? 'deactivate' : 'activate', user._id)} style={{ marginRight: '0.5rem' }}>
                                    {user.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button onClick={() => handleAction(user.role === 'admin' ? 'demote' : 'promote', user._id)} style={{ marginRight: '0.5rem' }}>
                                    {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>

            <h3>Mechanics</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {mechanics.length ? (
                    mechanics.map((mechanic) => (
                        <li key={mechanic._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem' }}>
                            <p style={{ fontWeight: 'bold' }}>{mechanic.username} ({mechanic.email})</p>
                            <p>Status: {mechanic.mechanicStatus}</p>
                            <div style={{ marginTop: '0.5rem' }}>
                                <button
                                    onClick={() => handleAction(mechanic.isActive ? 'deactivate' : 'activate', mechanic._id, true)}
                                    style={{ marginRight: '0.5rem' }}
                                >
                                    {mechanic.isActive ? 'Deactivate' : 'Activate'}
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

export default ManageUsers;

