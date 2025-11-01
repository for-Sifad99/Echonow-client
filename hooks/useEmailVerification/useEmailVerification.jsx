import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxios';

const useEmailVerification = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Request OTP
    const requestOTPMutation = useMutation({
        mutationFn: async (email) => {
            const res = await axiosSecure.post('/api/request-otp', { email });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['email-verification-status']);
        }
    });

    // Verify OTP
    const verifyOTPMutation = useMutation({
        mutationFn: async ({ email, otp }) => {
            const res = await axiosSecure.post('/api/verify-otp', { email, otp });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['email-verification-status']);
        }
    });

    // Check verification status
    const useVerificationStatus = (email) => {
        return useQuery({
            queryKey: ['email-verification-status', email],
            queryFn: async () => {
                if (!email) return { isEmailVerified: false };
                const res = await axiosSecure.get(`/api/verification-status/${email}`);
                return res.data;
            },
            enabled: !!email,
            staleTime: 5 * 60 * 1000, // 5 minutes
        });
    };

    return {
        requestOTP: requestOTPMutation.mutateAsync,
        isRequestingOTP: requestOTPMutation.isPending,
        verifyOTP: verifyOTPMutation.mutateAsync,
        isVerifyingOTP: verifyOTPMutation.isPending,
        useVerificationStatus
    };
};

export default useEmailVerification;