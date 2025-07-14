import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "/logo.png";
import useAuth from "../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Login = () => {
    const { signInUser, forgotPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const email = watch("email");

    const onSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Logged in successfully!",
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
                    position: "top-end"
                });
                navigate(location?.state?.from?.pathname || '/');
            })
            .catch(err => {
                toast.error(err.message === "Firebase: Error (auth/invalid-credential)." ? "Email or password wrong!" : err.message);
            });
    };

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
        <div className="font-jost">
            <div className="flex justify-baseline items-center md:mb-2">
                <Link to='/'>
                    <div className='flex items-center justify-center gap-1'>
                        <img className='w-10 lg:w-15' src={logo} alt="Echo website logo" />
                        <h1 className='text-4xl lg:text-5xl font-light font-oxygen'>EchoNow</h1>
                    </div>
                </Link>
            </div>

            <h2 className="text-2xl font-bold text-[var(--dark)] -mb-1">Login</h2>
            <p className="mb-4 sm:mb-6 text-sm text-[var(--accent)]">Welcome back</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 lg:space-y-3">
                {/* Email */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        placeholder="Enter your email"
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
                            {...register("password", { required: "Password is required" })}
                            placeholder="Enter your password"
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
                    {errors.password && <p className="text-sm text-red-500 leading-6 -mb-1">{errors.password.message}</p>}

                    {/* Forgot Password link */}
                    <p onClick={handleForgotPassword} className="text-sm text-blue-600 underline mt-2 -mb-2 cursor-pointer w-fit">
                        Forgot password?
                    </p>
                </div>


                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white font-semibold py-2 rounded-md transition duration-700 cursor-pointer"
                >
                    Login
                </button>

                {/* Footer */}
                <div className="flex justify-between text-sm mt-1.5 sm:mt-3">
                    <span>
                        Don’t have an account?{" "}
                        <Link to="/auth/register" className="text-blue-600 hover:underline">Register</Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
