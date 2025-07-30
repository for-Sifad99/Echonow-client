import React from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../pages/shared/Loader/Loader';

const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    // set loading when user Null
    if(loading){
        return <Loader />
    };

    // navigate user where he/she want to go after login
    if(!user){
        return <Navigate to='/auth/login' state={location?.pathname} />
    };

    // return children 
    return children;
};

export default PrivetRoute; 

