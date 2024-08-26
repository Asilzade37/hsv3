import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;