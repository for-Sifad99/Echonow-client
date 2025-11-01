import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth/useAuth';
import useAxiosPublic from '../useAxiosPublic/useAxios';

const useRole = () => {
    const { user, loading: userLoading } = useAuth(); 
    const axiosPublic = useAxiosPublic();

    const {
        data: roleData = {},
        isLoading: roleLoading,
        refetch
    } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.post('/api/get-role', {
                email: user.email,
            });
            return res.data;
        },
    });

    return {
        role: roleData.role || null,
        loading: userLoading || roleLoading,
        refetch,
    };
};

export default useRole;