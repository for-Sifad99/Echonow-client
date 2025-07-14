import React from 'react';
import useAuth from '../../../hooks/useAuth/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);

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
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="font-jost flex flex-col items-center gap-1 mt-4">
            <div className="w-full relative flex items-center">
                <div className="w-20 flex-grow border-t border-gray-300" />
                <span className="mx-4 text-sm text-[var(--white)]">or</span>
                <div className="w-20 flex-grow border-t border-gray-300" />
            </div>

            <button
                onClick={handleSubmit}
                className="group w-34 flex items-center justify-center gap-2 bg-[var(--white)] hover:bg-gradient-to-r hover:from-[#ebf4f5]  hover:to-[#b5c6e0]  text-gray-700 font-medium py-1 rounded-md hover:shadow-md transition duration-300 cursor-pointer"
            >
                <p className="flex items-center gap-1 text-sm">Continue with <FaGoogle className='text-[10px] group-hover:rotate-360 transition duration-700 ' /></p>
            </button>
        </div>
    );
};

export default SocialLogin;
