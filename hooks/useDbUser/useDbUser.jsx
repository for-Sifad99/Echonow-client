import React from 'react';
import useAxiosPublic from '../useAxiosPublic/useAxios';
import useAuth from '../useAuth/useAuth';
import { useQuery } from '@tanstack/react-query';

const useDbUser = () => {
    const axiosPublic = useAxiosPublic();
    const { user: authUser } = useAuth();

    const {
        data: dbUser,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['user-info', authUser?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/users/${authUser?.email}`);
            return res.data;
        },
        enabled: !!authUser?.email,
    });

    return { dbUser, isLoading, isError, error, refetch };
};

export default useDbUser;