import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageHelmet from '../../shared/PageTitle/PageHelmet';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxios';
import useAuth from "../../../../hooks/useAuth/useAuth";
import SocialLogin from '../Social/SocialLogin';
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
// Using public directory asset with proper URL reference
import logo from '/logo.png';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; 
    const [photo, setPhoto] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    // OnSubmit handler here
    const onSubmit = data => {
        const { name, email, password } = data;
        createUser(email, password)
            .then(async (userCredential) => {
                // Wait a bit for the auth state to update and token to be set
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Set user profile data:
                const userProfile = {
                    name,
                    email,
                    photo: photo,
                    isVerified: false,
                    isEmailVerified: false, // Add email verification status
                    role: "user",
                    premiumTaken: null,
                };
                await axiosSecure.post('/api/users', userProfile);

                // Update user profile in firebase:
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        console.log('User profile updated successfully!');
                    })
                    .catch(error => {
                        console.log('Error updating user profile:', error);
                    });

                // Success toast notification
                toast.success("Successfully account created!", {
                    duration: 4000,
                    position: 'top-right'
                });

                // For email/password users, redirect to verification page
                setTimeout(async () => {
                    navigate('/verify-email', { replace: true });
                }, 3000);
            }).catch(err => {
                toast.error(err.message === "Firebase: Error (auth/email-already-in-use)." ? "Email already in use" : err.message);
            });
    };

    // Image upload handler
    const handleImgUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
        try {
            const res = await axios.post(url, formData);
            const photoUrl = res.data.data.url;
            setPhoto(photoUrl);
            setUploadSuccess(true);
        } catch (error) {
            console.error("Image upload failed:", error);
            setUploadSuccess(false);
        }
    };

    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title="Register"
                description="Join EchoNow today and become a part of the modern news revolution. Get news your way."
            />

            {/* Content */}
            <div className="font-jost">
                {/* Logo */}
                <div className="flex justify-baseline items-center md:hidden">
                    <Link to='/'>
                        <div className='flex items-center justify-center gap-1'>
                            <img className='w-10 lg:w-15' src={logo} alt="Echo website logo" />
                            <h1 className='text-4xl lg:text-5xl font-light font-oxygen'>EchoNow</h1>
                        </div>
                    </Link>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold -mb-1">Register</h2>
                <p className="mb-4 sm:mb-6 text-sm text-[var(--accent)] dark:text-[var(--accent-white)]">Create your account below</p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 lg:space-y-3">
                    {/* Name */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-100">Your Name</Label>
                        <Input
                            type="text"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Name can’t be more than 50 characters"
                                },
                                pattern: {
                                    value: /^[a-zA-Z\s'-]+$/, // only letters, spaces, ' and -
                                    message: "Only letters and spaces are allowed"
                                }
                            })}
                            placeholder="Enter your full name"
                            className="sm:mt-0.5 w-full px-4 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] focus:outline-none"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 dark:text-red-400 leading-6 -mb-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-100">Email Address</Label>
                        <Input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Email address"
                            className="sm:mt-0.5 w-full px-4 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] focus:outline-none"
                        />
                        {errors.email && <p className="text-sm text-red-500 dark:text-red-400 leading-6 -mb-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-100">Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                    validate: {
                                        hasCapital: (value) =>
                                            /[A-Z]/.test(value) || "Must contain at least one capital letter",
                                        hasSpecial: (value) =>
                                            /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Must contain a special character",
                                        hasNumber: (value) =>
                                            /\d/.test(value) || "Must contain a numeric character",
                                    },
                                })}
                                placeholder="Password"
                                className="sm:mt-0.5 w-full px-4 py-2 pr-10 border border-[#e0e0e0] dark:border-[#3f3f3f] focus:outline-none"
                            />
                            {showPassword ? (
                                <FiEyeOff
                                    onClick={() => setShowPassword(false)}
                                    className="absolute right-3 top-4 text-gray-500 cursor-pointer"
                                />
                            ) : (
                                <FiEye
                                    onClick={() => setShowPassword(true)}
                                    className="absolute right-3 top-4 text-gray-500 cursor-pointer"
                                />
                            )}
                        </div>

                        {/* Error message */}
                        {errors.password && (
                            <p className="text-sm text-red-500 dark:text-red-400 leading-6 -mb-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Photo (file input) */}
                    <div className='mt-4'>
                        <Label className="relative text-sm font-medium text-gray-700 dark:text-gray-100 flex items-center gap-1">
                            Profile Photo
                            {uploadSuccess && (
                                <FiCheckCircle className="text-[var(--primary)] text-sm sm:text-base" />
                            )}
                        </Label>
                        <Input
                            type="file"
                            accept="image/*"
                            name="photo"
                            onChange={handleImgUpload}
                            className="sm:mt-0.5 w-full px-3 py-1.5 border border-[#e0e0e0] dark:border-[#3f3f3f] focus:outline-none"
                        />
                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="flex items-center justify-start gap-2 mt-4">
                        <input
                            type="checkbox"
                            id="terms"
                            {...register("terms", { required: "You must agree to the terms and conditions" })}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                            I agree to the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms & Conditions</a>
                        </label>
                    </div>
                    {errors.terms && <p className="text-sm text-red-500 dark:text-red-400 -mt-2">{errors.terms.message}</p>}

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-[var(--white)] font-semibold py-2 transition duration-700 cursor-pointer"
                    >
                        Register
                    </Button>

                    {/* Footer */}
                    <span className="text-sm">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</Link>
                    </span>
                </form>

                {/* Social login */}
                <div className="flex mt-2">
                    <SocialLogin />
                </div>
            </div>
        </>
    );
};

export default Register;