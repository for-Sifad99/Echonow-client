import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../../hooks/useAuth/useAuth';
import { FaGoogle } from "react-icons/fa";
import { toast } from 'sonner';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"; 
    const axiosSecure = useAxiosSecure();
    const [isSigningIn, setIsSigningIn] = useState(false);

    // OnSubmit handler
    const handleSubmit = async () => {
        // Prevent multiple clicks
        if (isSigningIn) return;
        
        setIsSigningIn(true);
        
        try {
            const result = await googleSignIn();
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
                isEmailVerified: true, // For social login, we can consider the email as verified since it's from Google
                role: "user",
                premiumTaken: null,
            };

            await axiosSecure.post('/api/users', userProfile);

            // Update the user document to reflect email verification
            await axiosSecure.patch(`/api/users/${email}`, { isEmailVerified: true, emailVerifiedAt: new Date() });
            
            toast.success('Now you can continue...', {
                duration: 3000,
                position: 'top-right'
            });
            
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 3000);
        } catch (error) {
            console.error("❌ Google Sign-In Error:", error);
            setIsSigningIn(false);
            
            // Show user-friendly error message
            let errorMessage = 'Failed to sign in with Google. Please try again.';
            
            if (error.message === 'Login popup was closed or cancelled') {
                errorMessage = 'Login was cancelled. Please try again and complete the login process.';
            } else if (error.message === 'Popup was blocked by browser. Please allow popups for this site.') {
                errorMessage = 'Popup was blocked. Please allow popups for this site and try again.';
            } else if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Login popup was closed. Please try again and complete the login process.';
            }
            
            toast.error(errorMessage, {
                duration: 5000,
                position: 'top-right'
            });
        }
    };

    return (
        <section className="font-jost flex flex-col items-center gap-1">
            <button
                onClick={handleSubmit}
                disabled={isSigningIn}
                className={`text-lg w-46 flex items-center justify-center gap-2 bg-[var(--accent-white)] dark:bg-[var(--dark-bg)] text-gray-700 dark:text-gray-300 font-medium py-1.5 transition duration-700 cursor-pointer ${isSigningIn ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
                <p className="flex items-center gap-1 text-sm">
                    {isSigningIn ? 'Signing in...' : 'Continue with'} <FaGoogle className='text-[10px]' />
                </p>
            </button>
        </section>
    );
};

export default SocialLogin;