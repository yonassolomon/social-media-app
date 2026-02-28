import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (username, password) => {
    setLoading(true);
    setError('');
    
    try {
      console.log('1. Sending login request...');
      const response = await api.post('/token/', { username, password });
      console.log('2. Response received:', response.data);
      
      const { access, refresh } = response.data;
      
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      
      setUser({ username });
      console.log('3. User set in state');
      
      navigate('/'); // Redirect to home page
      return true;
      
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error - is Django running?');
      } else {
        setError('Login failed. Please try again.');
      }
      
      return false;
      
    } finally {
      setLoading(false);
      console.log('4. Loading set to false');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    window.location.href = '/login'; // Force redirect to login page
  };

  // Check if user is already logged in on page load
  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // You could decode token to get username, but for now just set a flag
      setUser({ username: 'User' });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};