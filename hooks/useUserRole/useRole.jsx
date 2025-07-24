import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth/useAuth';
import useAxiosSecure from '../useAxiosSecure/useAxios';

const useRole = () => {
    const { user, loading: userLoading } = useAuth(); 
    const axiosSecure = useAxiosSecure();

    const {
        data: roleData = {},
        isLoading: roleLoading,
        refetch
    } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.post('http://localhost:3000/get-role', {
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
