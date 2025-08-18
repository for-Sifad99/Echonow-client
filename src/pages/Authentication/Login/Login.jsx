import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageHelmet from '../../shared/PageTitle/PageHelmet';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxios';
import useAuth from "../../../../hooks/useAuth/useAuth";
import SocialLogin from "../Social/SocialLogin";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from '../../../../public/logo.png';
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Login = () => {
    const { signInUser, forgotPassword } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const email = watch("email");

    // OnSubmit handler here
    const onSubmit = (data) => {
        const { email, password } = data;

        signInUser(email, password)
            .then(async (res) => {
                // Set user profile data:
                const userProfile = {
                    name: res.user.displayName,
                    email: email,
                    photo: res.user.photoURL,
                    isVerified: false,
                    role: "user",
                    premiumTaken: null,
                };

                // Send user profile data to the server:
                await axiosSecure.post('/users', userProfile);

                // Sweet Alert
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
                    title: "Now you can continue..."
                });
                setTimeout(() => {
                    navigate(location?.state || '/');
                }, 3000);
            })
            .catch(err => {
                toast.error(err.message === "Firebase: Error (auth/invalid-credential)." ? "Something went wrong! try again." : err.message);
            });
    };

    // Forgot password handler
    const handleForgotPassword = async () => {
        if (!email) {
            return toast.error("Please enter your email first!");
        } else {
            await forgotPassword(email);
            Swal.fire({
                icon: "success",
                title: "Done! Please check your email.",
                toast: true,
                timer: 3000,
                showConfirmButton: false,
                position: "top-end"
            });
        }
    };

    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title="Login"
                description="Login to EchoNow and access personalized news, saved articles, and exclusive content just for you."
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
                <h2 className="text-2xl font-bold -mb-1">Login</h2>
                <p className="mb-4 sm:mb-6 text-sm text-[var(--accent)] dark:text-[var(--accent-white)]">Welcome back</p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 lg:space-y-3">
                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Enter your email"
                            className="sm:mt-0.5 w-full px-4 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] focus:outline-none"
                        />
                        {errors.email && <p className="text-sm text-red-500 dark:text-red-400 leading-6 -mb-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-100">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                placeholder="Enter your password"
                                className="sm:mt-0.5 w-full px-4 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] focus:outline-none"
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
                        {errors.password && <p className="text-sm text-red-500 dark:text-red-400 leading-6 -mb-1">{errors.password.message}</p>}

                        {/* Forgot Password link */}
                        <p onClick={handleForgotPassword} className="text-sm text-blue-600 dark:text-blue-400 underline mt-2 md:mt-2.5 -mb-1 md:-mb-1.5 lg:-mb-2 cursor-pointer w-fit">
                            Forgot password?
                        </p>
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-[var(--white)] font-semibold py-2 transition duration-700 cursor-pointer"
                    >
                        Login
                    </button>

                    {/* Footer */}
                    <span className="text-sm mb-1">
                        Don’t have an account?{" "}
                        <Link to="/auth/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register</Link>
                    </span>
                </form>

                {/* Social login */}
                <div className="flex justify-start md:hidden">
                    <SocialLogin />
                </div>
            </div>
        </>
    );
};

export default Login;
