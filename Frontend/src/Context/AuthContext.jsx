import React, { createContext, useState, useEffect, useContext } from 'react';
import { isAuthenticated, getUserRole, logout, getCurrentUser } from '../api/authService';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('guest');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      // Authentication flow
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        const role = getUserRole();
        const user = getCurrentUser();

        setUserRole(role || 'guest');
        setCurrentUser(user || { role: role || 'guest' });

        console.log('User authenticated:', { role, user });
      } else {
        setUserRole('guest');
        setCurrentUser(null);
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = (userData) => {
    // This would typically store the token in localStorage
    // The actual API call is handled in authService.js
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setUserRole(userData.role || 'guest');
  };

  // Logout function
  const handleLogout = () => {
    logout(); // This clears the token from localStorage
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserRole('guest');
  };

  // Check if user has required role
  const hasRole = (requiredRoles) => {
    if (!isLoggedIn) return false;
    if (!requiredRoles || requiredRoles.length === 0) return true;

    // If requiredRoles is a string, convert to array
    const roles = typeof requiredRoles === 'string' ? [requiredRoles] : requiredRoles;

    return roles.includes(userRole);
  };

  // Value object that will be passed to consumers of this context
  const value = {
    currentUser,
    isLoggedIn,
    userRole,
    loading,
    login,
    logout: handleLogout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
