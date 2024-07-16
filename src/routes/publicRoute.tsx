import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

const PublicRoute: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return token === '' ? <Outlet /> : <Navigate to="/dashboard/main" />;
};

export default PublicRoute;
