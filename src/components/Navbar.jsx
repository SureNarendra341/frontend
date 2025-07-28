import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/add">Add Data</Link>
          <Link to="/view">View Data</Link>
          {user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;