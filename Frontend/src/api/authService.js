// We're using mock data for now, but in a real app we would use the API
// import api from './api';
import { findUser, findUserByName } from '../utils/mockUsers';

// Login service
export const login = async (credentials) => {
  try {
    // For testing purposes, we'll use mock users instead of API call
    // In a real application, you would use the API call below
    // const response = await api.post('/login', credentials);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user by name or email
    const user = findUserByName(credentials.name, credentials.password) ||
                findUser(credentials.email, credentials.password);

    if (!user) {
      throw new Error('Invalid credentials. Please check your username and password.');
    }

    // Create a mock response
    const mockResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: `mock-token-${user.id}-${Date.now()}`
    };

    // Store token in localStorage
    localStorage.setItem('token', mockResponse.token);
    // Store user role
    localStorage.setItem('userRole', mockResponse.role);
    // Store user info
    localStorage.setItem('userInfo', JSON.stringify({
      id: mockResponse.id,
      name: mockResponse.name,
      email: mockResponse.email,
      role: mockResponse.role
    }));

    return mockResponse;
  } catch (error) {
    console.error('Login error:', error);
    throw error.message || 'Login failed';
  }
};

// Logout service
export const logout = () => {
  // Remove auth data from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userInfo');

  console.log('User logged out successfully');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Get user role
export const getUserRole = () => {
  return localStorage.getItem('userRole') || 'guest';
};

// Get current user info
export const getCurrentUser = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};
