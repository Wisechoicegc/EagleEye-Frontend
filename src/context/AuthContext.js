// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', email, password);
      const response = await axiosInstance.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      setUser(response.data);
      console.log('User state after login:', response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/signup', { email, password });
      setUser(response.data);
      console.log('User state after signup:', response.data);
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const logout = () => {
    setUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
