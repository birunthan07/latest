

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/AdminDashboard.css';
import PackageManagement from './PackageManagement'; // Import the PackageManagement component

const AdminDashboard = () => {
  const [mechanics, setMechanics] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch all mechanics and users
  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/mechanics')
      .then(response => setMechanics(response.data))
      .catch(error => console.error('Error fetching mechanics:', error));

    axios.get('http://localhost:8000/api/admin/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Approve mechanic
  const approveMechanic = (mechanicId) => {
    axios.patch(`http://localhost:8000/api/admin/mechanic/${mechanicId}/approve`)
      .then(response => {
        setMechanics(mechanics.map(mechanic =>
          mechanic._id === mechanicId ? { ...mechanic, isApproved: true } : mechanic
        ));
        alert('Mechanic approved successfully!');
      })
      .catch(error => console.error('Error approving mechanic:', error));
  };

  // Ban/unban user
  const toggleBanUser = (userId) => {
    axios.patch(`http://localhost:8000/api/admin/user/${userId}/ban`)
      .then(response => {
        setUsers(users.map(user =>
          user._id === userId ? { ...user, isBanned: !user.isBanned } : user
        ));
        alert(response.data.msg);
      })
      .catch(error => console.error('Error toggling ban:', error));
  };

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <ul>
          <li><Link to="/admin-users">Manage Users</Link></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>

        {/* Package Management Section */}
        <PackageManagement />

        <h3>Pending Mechanics</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mechanics.map((mechanic) => (
              <tr key={mechanic._id}>
                <td>{mechanic.name}</td>
                <td>{mechanic.email}</td>
                <td>{mechanic.isApproved ? 'Approved' : 'Pending'}</td>
                <td>
                  {!mechanic.isApproved && (
                    <button onClick={() => approveMechanic(mechanic._id)}>
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Registered Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isBanned ? 'Banned' : 'Active'}</td>
                <td>
                  <button onClick={() => toggleBanUser(user._id)}>
                    {user.isBanned ? 'Unban' : 'Ban'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
