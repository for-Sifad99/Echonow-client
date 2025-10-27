import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHelmet from '../../shared/PageTitle/PageHelmet';
import useAuth from '../../../../hooks/useAuth/useAuth';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxios';
import EmailVerificationModal from '../../shared/EmailVerification/EmailVerificationModal';

const EmailVerification = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        if (!user?.email) {
            navigate('/auth/login');
            return;
        }
        
        setUserEmail(user.email);
    }, [user, navigate]);

    const handleVerificationComplete = () => {
        // Redirect to home page after successful verification
        navigate('/', { replace: true });
    };

    const handleSkipVerification = () => {
        // Redirect to home page without verification
        navigate('/', { replace: true });
    };

    return (
        <>
            <PageHelmet
                title="Email Verification"
                description="Verify your email address to complete your EchoNow account setup."
            />
            
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            Email Verification
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Please verify your email address to complete your account setup.
                        </p>
                        
                        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
                            <p className="text-blue-800 dark:text-blue-200">
                                A verification code has been sent to:
                            </p>
                            <p className="font-semibold text-blue-900 dark:text-blue-100 mt-1">
                                {userEmail}
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                            >
                                Enter Verification Code
                            </button>
                            
                            <button
                                onClick={handleSkipVerification}
                                className="w-full text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 font-medium py-2 px-4 rounded-md transition duration-300"
                            >
                                Skip for Now
                            </button>
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                            You can verify your email later from your profile page.
                        </p>
                    </div>
                </div>
            </div>
            
            <EmailVerificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onVerified={handleVerificationComplete}
            />
        </>
    );
};

export default EmailVerification;