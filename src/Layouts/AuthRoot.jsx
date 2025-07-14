import React from 'react';
import { Link, Outlet } from "react-router-dom";
import authPic from "../assets/auth-pic.png";
import logo from '/logo.png';

const AuthRoot = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Image as Background */}
            <div
                className="hidden md:flex items-center justify-center bg-cover bg-center  font-oxygen"
                style={{ backgroundImage: `url(${authPic})` }}
            >
                <div className="flex flex-col items-center justify-center text-[var(--white)] text-center px-6">
                    <Link to='/' className="w-24 h-24 p-2 flex items-center justify-center bg-[var(--white)] rounded-full">
                        <img src={logo} className="w-full" alt="website logo image" />
                    </Link>
                    <h2 className="text-[40px] font-bold">Welcome to</h2>
                    <p className="text-xl">Bangladesh EchoNow Library System</p>
                    <p className="mt-2 text-sm">Sign in to Continue Access</p>
                </div>
                
            </div>

            {/* Right Side - Form Area */}
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[var(--white)]">
                <div className="max-w-md w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthRoot;
