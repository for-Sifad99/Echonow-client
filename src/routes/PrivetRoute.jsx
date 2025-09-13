import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import Loader from '../pages/shared/Loader/Loader';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Set loading when user Null
    if (loading) {
        return <Loader />
    };

    // Navigate user where he/she want to go after login
    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    };

    // Return children 
    return children;
};

export default PrivetRoute;

