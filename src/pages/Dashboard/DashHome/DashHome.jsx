import React from 'react';
import { Navigate } from 'react-router-dom';
import useRole from '../../../../hooks/useUserRole/useRole'

const DashHome = () => {
  const { role, loading } = useRole();
  if (loading && role !== 'admin') {
    return <Navigate to='/dashboard/dashboard' />
  };

  return <Navigate to='/dashboard/dashboard' />
};

export default DashHome;