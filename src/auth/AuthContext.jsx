import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (form, isAdmin = false) => {
    const url = isAdmin ? '/admin/login' : '/auth/login';
    const res = await axios.post(url, form);
    const data = isAdmin ? { ...res.data, role: 'admin' } : res.data;
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    navigate('/profile');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
