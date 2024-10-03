// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/AdminDashboard.css';

// const AdminDashboard = () => {
//   // const [mechanics, setMechanics] = useState([]);
//   // const [users, setUsers] = useState([]);
//   const [setMechanics] = useState([]);
//   const [setUsers] = useState([]);

//   const approveMechanic = (mechanicId) => {
//     // Functionality to approve a mechanic
//   };

//   const banUser = (userId) => {
//     // Functionality to ban/unban a user
//   };

//   return (
//     <div className="admin-dashboard">
//       <nav className="navbar">
//         <ul>
//           <li><Link to="/mechanics">Manage Mechanics</Link></li>
//           <li><Link to="/users">Manage Users</Link></li>
//           <li><Link to="/bookings">Manage Bookings</Link></li>
//           <li><Link to="/logout">Logout</Link></li>
//         </ul>
//       </nav>

//       <div className="dashboard-content">
//         <h2>Admin Dashboard</h2>
//         <h3>Pending Mechanics</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mechanic.map((mechanic) => (
//               <tr key={mechanic.id}>
//                 <td>{mechanic.name}</td>
//                 <td>{mechanic.email}</td>
//                 <td>
//                   <button onClick={() => approveMechanic(mechanic.id)}>Approve</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <h3>Registered Users</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button onClick={() => banUser(user.id)}>Ban</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '/home/uki-jaffna/Documents/mechanic/frontend/src/css/AdminDashboard.css';

const AdminDashboard = () => {
  const [mechanics, setMechanics] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    // Fetch mechanics
    axios.get('http://localhost:8000/api/mechanics')
      .then(response => setMechanics(response.data))
      .catch(error => console.error('Error fetching mechanics:', error));

    // Fetch users
    axios.get('http://localhost:8000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const approveMechanic = (mechanicId) => {
    // Functionality to approve a mechanic
    // Update mechanic status in the backend
    axios.post(`http://localhost:8000/api/mechanics/approve/${mechanicId}`)
      .then(() => {
        setMechanics(mechanics.map(mechanic => 
          mechanic.id === mechanicId ? { ...mechanic, status: 'approved' } : mechanic
        ));
      })
      .catch(error => console.error('Error approving mechanic:', error));
  };

  const banUser = (userId) => {
    // Functionality to ban/unban a user
    // Toggle user ban status in the backend
    axios.post(`http://localhost:8000/api/users/ban/${userId}`)
      .then(() => {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, isBanned: !user.isBanned } : user
        ));
      })
      .catch(error => console.error('Error banning user:', error));
  };

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <ul>
          <li><Link to="/admin-mechanics">Manage Mechanics</Link></li>
          <li><Link to="/admin-users">Manage Users</Link></li>
          <li><Link to="/bookings">Manage Bookings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>
        
        <h3>Pending Mechanics</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mechanics.filter(mechanic => mechanic.status === 'pending').map((mechanic) => (
              <tr key={mechanic.id}>
                <td>{mechanic.name}</td>
                <td>{mechanic.email}</td>
                <td>
                  <button onClick={() => approveMechanic(mechanic.id)}>Approve</button>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => banUser(user.id)}>
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
