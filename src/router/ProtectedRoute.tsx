import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/users/login" />;
};

export default ProtectedRoute;
