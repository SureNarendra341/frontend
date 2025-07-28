import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddData from './pages/AddData';
import ViewData from './pages/ViewData';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './auth/ProtectedRoute';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddData /></ProtectedRoute>} />
      <Route path="/view" element={<ProtectedRoute><ViewData /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
    </Routes>
  </>
);

export default App;
