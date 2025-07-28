// import React, { useEffect, useState, useContext } from 'react';
// import axios from '../api/axios';
// import { AuthContext } from '../auth/AuthContext';
// import RoleDropdown from '../components/RoleDropdown';

// const AdminPanel = () => {
//   const { authToken } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState('');

//   // Fetch all registered users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get('/admin/users', {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });
//         setUsers(res.data);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//       }
//     };

//     fetchUsers();
//   }, [authToken]);

//   // Handle role change
//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       await axios.patch(
//         `/admin/users/${userId}/role`,
//         { role: newRole },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       setMessage('Role updated successfully.');
//       // Refresh user list
//       setUsers((prevUsers) =>
//         prevUsers.map((u) =>
//           u.id === userId ? { ...u, role: newRole } : u
//         )
//       );
//     } catch (err) {
//       console.error('Failed to update role:', err);
//       setMessage('Failed to update role.');
//     }
//   };

//   return (
//     <div className="admin-panel">
//       <h2>Admin Panel - Manage User Roles</h2>
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Role</th>
//             <th>Update Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td>{u.id}</td>
//               <td>{u.username}</td>
//               <td>{u.role}</td>
//               <td>
//                 <RoleDropdown
//                   currentRole={u.role}
//                   onChange={(newRole) => handleRoleChange(u.id, newRole)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPanel;

import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../auth/AuthContext';
import RoleDropdown from '../components/RoleDropdown';

const AdminPanel = () => {
  const { authToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    age: '',
   
  });

  // Fetch all registered users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [authToken]);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(
        `/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setMessage('Role updated successfully.');
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error('Failed to update role:', err);
      setMessage('Failed to update role.');
    }
  };

  // Handle delete user (soft delete)
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/soft-delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMessage('User deleted (soft delete).');
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setMessage('Failed to delete user.');
    }
  };

  // Handle admin registration of user
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/register', form, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMessage('User registered successfully.');
      setForm({
        username: '',
        email: '',
        password: '',
        gender: '',
        age: '',
       
      });
      fetchUsers();
    } catch (err) {
      console.error('Error registering user:', err);
      setMessage('Failed to register user.');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel - Manage Users</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <h3>Add New User</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Gender"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        {/* <input
          type="text"
          placeholder="Profession"
          value={form.profession}
          onChange={(e) => setForm({ ...form, profession: e.target.value })}
          required
        /> */}
        <button type="submit">Register User</button>
      </form>

      <h3>All Users</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Update Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <RoleDropdown
                  currentRole={u.role}
                  onChange={(newRole) => handleRoleChange(u.id, newRole)}
                />
              </td>
              <td>
                <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

