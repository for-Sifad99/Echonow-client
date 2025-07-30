import React from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import useRole from '../../hooks/useUserRole/useRole';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../pages/shared/Loader/Loader';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, loading: roleLoading } = useRole();
    const location = useLocation();

    // set loading when user and user role Null
    if (loading || roleLoading) {
        return <Loader />
    };

    // navigate user to forbidden page
    if (!user || role !== 'admin') {
        return <Navigate to='/status/forbidden' state={location?.pathname} />
    };

    // return children 
    return children;
};

export default PrivetRoute;

