import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../../hooks/useAuth/useAuth';
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2';


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"; 
    const axiosSecure = useAxiosSecure();

    // OnSubmit handler
    const handleSubmit = () => {
        googleSignIn()
            .then(async (result) => {
                const { displayName, email, photoURL } = result.user;

                // 🔑 Ensure token saved
                const token = await result.user.getIdToken();
                localStorage.setItem('access-token', token);
                
                // Wait a bit for the auth state to update
                await new Promise(resolve => setTimeout(resolve, 1000));

                const userProfile = {
                    name: displayName,
                    email,
                    photo: photoURL,
                    isVerified: false,
                    isEmailVerified: false, // Add email verification status
                    role: "user",
                    premiumTaken: null,
                };

                await axiosSecure.post('/users', userProfile);

                // For social login, we can consider the email as verified since it's from Google
                // But we still update the user document to reflect this
                await axiosSecure.patch(`/users/${email}`, { isEmailVerified: true, emailVerifiedAt: new Date() });
                
                Swal.fire({
                    toast: true,
                    icon: 'success',
                    title: 'Now you can continue...',
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    navigate(from, { replace: true });
                }, 3000);
            })
            .catch(error => {
                console.error("❌ Google Sign-In Error:", error);
            });
    };

    return (
        <section className="font-jost flex flex-col items-center gap-1">
            <button
                onClick={handleSubmit}
                className="text-lg w-46 flex items-center justify-center gap-2 bg-[var(--accent-white)] dark:bg-[var(--dark-bg)] text-gray-700   dark:text-gray-300 font-medium py-1.5 transition duration-700 cursor-pointer"
            >
                <p className="flex items-center gap-1 text-sm">Continue with <FaGoogle className='text-[10px]' /></p>
            </button>
        </section>
    );
};

export default SocialLogin;
