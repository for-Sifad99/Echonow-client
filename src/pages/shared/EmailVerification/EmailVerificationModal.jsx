import React, { useState, useEffect, useRef } from 'react';
import useEmailVerification from '../../../../hooks/useEmailVerification/useEmailVerification';
import useAuth from '../../../../hooks/useAuth/useAuth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EmailVerificationModal = ({ isOpen, onClose, onVerified }) => {
    const { user } = useAuth();
    const { requestOTP, isRequestingOTP, verifyOTP, isVerifyingOTP } = useEmailVerification();
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [countdown, setCountdown] = useState(0);
    const [canResend, setCanResend] = useState(true);
    const inputRefs = React.useRef([]);

    // Countdown timer for resend OTP
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    // Request OTP when modal opens
    useEffect(() => {
        if (isOpen && user?.email && canResend) {
            handleRequestOTP();
        }
    }, [isOpen, user?.email]);

    const handleRequestOTP = async () => {
        if (!user?.email) return;
        
        try {
            await requestOTP(user.email);
            toast.success("Verification code sent to your email!");
            setCountdown(60);
            setCanResend(false);
            // Clear OTP fields
            setOtp(Array(6).fill(''));
            // Focus first input
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to send verification code');
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (!user?.email || otpString.length !== 6) return;

        try {
            await verifyOTP({ email: user.email, otp: otpString });
            toast.success("Email verified successfully!");
            if (onVerified) onVerified();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Invalid verification code');
        }
    };

    const handleOtpChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        // Move to next input if value is entered
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = Array(6).fill('');
        for (let i = 0; i < pasteData.length; i++) {
            newOtp[i] = pasteData[i];
        }
        setOtp(newOtp);
        
        // Focus the last filled input or the first empty one
        const lastIndex = pasteData.length > 0 ? Math.min(pasteData.length, 6) - 1 : 0;
        if (inputRefs.current[lastIndex]) {
            inputRefs.current[lastIndex].focus();
        }
    };

    // Focus first input when modal opens
    useEffect(() => {
        if (isOpen && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Email Verification</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Please enter the 6-digit verification code sent to <strong>{user?.email}</strong>
                </p>
                
                <form onSubmit={handleVerifyOTP} onPaste={handlePaste}>
                    <div className="mb-4">
                        <Label className="block text-gray-700 dark:text-gray-300 mb-2">Verification Code</Label>
                        <div className="flex justify-between space-x-2">
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    maxLength={1}
                                />
                            ))}
                        </div>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Enter the 6-digit code sent to your email
                        </p>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                        <Button
                            type="button"
                            onClick={handleRequestOTP}
                            disabled={!canResend || isRequestingOTP}
                            variant={canResend && !isRequestingOTP ? "default" : "secondary"}
                        >
                            {isRequestingOTP ? 'Sending...' : countdown > 0 ? `Resend (${countdown}s)` : 'Resend Code'}
                        </Button>
                        
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Code expires in 1 minute
                        </span>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={otp.join('').length !== 6 || isVerifyingOTP}
                            variant={otp.join('').length === 6 && !isVerifyingOTP ? "default" : "secondary"}
                        >
                            {isVerifyingOTP ? 'Verifying...' : 'Verify'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailVerificationModal;