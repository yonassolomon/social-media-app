import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  
  // Validation
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  if (formData.password.length < 8) {
    setError('Password must be at least 8 characters');
    return;
  }

  setLoading(true);

  try {
    // Register user
    const response = await api.post('/users/', {
      username: formData.username,
      password: formData.password,
      email: formData.email
    });

    console.log('Registration response:', response.data);
    setSuccess('✅ Registration successful! Logging you in...');

    // Auto login after registration - FIXED VERSION
    try {
      const loginResponse = await api.post('/token/', {
        username: formData.username,
        password: formData.password
      });
      
      if (loginResponse.data.access) {
        localStorage.setItem('accessToken', loginResponse.data.access);
        localStorage.setItem('refreshToken', loginResponse.data.refresh);
        window.location.href = '/';
      } else {
        setError('Registration succeeded but auto-login failed. Please login manually.');
      }
    } catch (loginErr) {
      console.error('Auto-login error:', loginErr);
      setError('Registration succeeded but auto-login failed. Please login manually.');
    }
    
  } catch (err) {
    console.error('Registration error:', err.response?.data);
    
    if (err.response?.data?.username) {
      setError(`Username error: ${err.response.data.username[0]}`);
    } else if (err.response?.data?.email) {
      setError(`Email error: ${err.response.data.email[0]}`);
    } else if (err.response?.data?.password) {
      setError(`Password error: ${err.response.data.password[0]}`);
    } else if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError('Registration failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            ❌ {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;