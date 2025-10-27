import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import useAuth from '../useAuth/useAuth';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
     baseURL: `${import.meta.env.VITE_server_url}`
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();
    const shouldNavigateRef = useRef(false);

    useEffect(() => {
        if (shouldNavigateRef.current) {
            shouldNavigateRef.current = false;
            navigate('/auth/login');
        }
    }, [navigate]);

    useEffect(() => {
        // request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // response interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => response,
            error => {
                const status = error.response?.status;

                if (status === 401) {
                    signOutUser()
                        .then(() => {
                            console.warn(`401 on ${error.config?.url}`);
                            console.log(`Signed out user due to 401 Unauthorized!`);
                            shouldNavigateRef.current = true;
                        })
                        .catch(err => console.log(err));

                } else if (status === 403) {
                    console.log(`403 Forbidden Access!`);
                    navigate('/status/forbidden');
                    
                } else if (status === 402) {
                    console.log('402 received, ignoring...');
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, signOutUser]);

    return axiosInstance;
};

export default useAxiosSecure;
