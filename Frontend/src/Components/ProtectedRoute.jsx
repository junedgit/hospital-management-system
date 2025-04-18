import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ requiredRoles }) => {
  const { isLoggedIn, hasRole } = useAuth();
  const location = useLocation();

  // If not logged in, redirect to login page with return URL
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If roles are specified and user doesn't have required role, redirect to unauthorized page
  if (requiredRoles && !hasRole(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If user is logged in and has required role (or no role is required), render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
