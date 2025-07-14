import React from 'react';
import logo from '/logo.png';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import toast from 'react-hot-toast';

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [photo, setPhoto] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false); 

    const onSubmit = data => {
        const { name, email, password } = data;
        createUser(email, password)
            .then(() => {
                // Update user profile in firebase:
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        console.log('User profile updated successfully!');
                    })
                    .catch(error => {
                        console.log('Error updating user profile:', error);
                    });

                // Sweet Alert:
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Successfully account created!"
                });

                setTimeout(async () => {
                    navigate(location?.state?.from?.pathname || '/');
                }, 3000);
            }).catch(err => {
                toast.error(err.message === "Firebase: Error (auth/email-already-in-use)." ? "Email already in use" : err.message);
            });
    };

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
        <div className="font-jost">
            <div className="flex justify-baseline items-center md:mb-2">
                <Link to='/'>
                    <div className='flex items-center justify-center gap-1'>
                        <img className='w-10 lg:w-15' src={logo} alt="Echo website logo" />
                        <h1 className='text-4xl lg:text-5xl font-light font-oxygen'>EchoNow</h1>
                    </div>
                </Link>
            </div>
            <h2 className="text-2xl font-bold text-[var(--dark)] -mb-1">Register</h2>
            <p className="mb-4 sm:mb-6 text-sm text-[var(--accent)]">Create your account below</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 lg:space-y-3">
                {/* Name */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Your Name</label>
                    <input
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
                        className="sm:mt-0.5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500 leading-6 -mb-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>


                {/* Email */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        placeholder="Email address"
                        className="sm:mt-0.5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    {errors.email && <p className="text-sm text-red-500 leading-6 -mb-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <input
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
                            className="sm:mt-0.5 w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
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
                        <p className="text-sm text-red-500 leading-6 -mb-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Photo (file input) */}
                <div>
                    <label className="relative text-sm font-medium text-gray-700 flex items-center gap-1">
                        Profile Photo
                        {uploadSuccess && (
                            <FiCheckCircle className="text-[var(--primary)] text-sm sm:text-base" />
                        )}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name="photo"
                        onChange={handleImgUpload}
                        className="sm:mt-0.5 w-full px-3 py-1.5 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="flex items-center justify-start gap-2 mb-0">
                    <input
                        type="checkbox"
                        {...register("terms", { required: "You must accept the terms & conditions" })}
                    />
                    <label className={`text-sm ${errors.terms ? "text-red-600 font-semibold" : "text-gray-700"}`}>
                        I accept the terms & conditions
                    </label>
                </div>
             

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500  hover:to-red-400 text-white font-semibold py-2 rounded-md transition duration-700 cursor-pointer"
                >
                    Register
                </button>

                {/* Footer */}
                <div className="flex justify-between text-sm mt-1.5 sm:mt-3">
                    <span>
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-blue-600 hover:underline">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Register;
