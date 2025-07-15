import React from 'react';
import axios from 'axios';
import useAuth from '../useAuth/useAuth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});
const useAxiosSecure = () => {
    const { signOutUser } = useAuth();

    // request interceptor
    axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // response interceptor 
    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.status === 401) {
            signOutUser()
                .then(() => {
                    console.log('Sign out user for 401 status code!');
                })
                .catch(err => {
                    console.log(err);
                });
        }
        return Promise.reject(error);
    });

    return axiosInstance;
};

export default useAxiosSecure;