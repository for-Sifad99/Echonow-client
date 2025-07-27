import { useEffect, useRef, useState } from "react";
import { FaFeatherPointed } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from '../../../hooks/useAuth/useAuth';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


const AccountAuthor = () => {
    const { signOutUser, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [clickedOpen, setClickedOpen] = useState(false);
    const modalRef = useRef(null);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                signOutUser()
                    .then(() => {
                        toast.success('You are successfully logged out!')
                        navigate('/')
                    })
                    .catch(() => toast.error('Sorry! Logout failed.'));
            }
        });
    };

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !profileRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setClickedOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMouseLeave = () => {
        if (!clickedOpen) {
            setIsOpen(false);
        }
    };

    const handleProfileClick = () => {
        setClickedOpen(!clickedOpen);
        setIsOpen(!clickedOpen);
    };

    return (
        <div
            className="relative"
            onMouseLeave={handleMouseLeave}
        >
            {/* Profile Picture */}
            <img
                ref={profileRef}
                src={user?.photoURL || "/default-user.png"}
                alt="User"
                onClick={handleProfileClick}
                className="w-[24px] h-[24px] sm:w-[25px] sm:h-[h-25px] md:w-[27px] md:h-[27px] lg:w-[29px] lg:h-[29px] rounded-full cursor-pointer"
            />

            {/* Modal */}
            {isOpen && (
                <div
                    ref={modalRef}
                    className="absolute top-10 md:top-13 sm:top-11 right-0 w-54 bg-white dark:bg-[#343a46] shadow-sm rounded-md p-4 z-50"
                >
                    <div className="flex items-center gap-2">
                        <img
                            src={user?.photoURL || "/default-user.png"}
                            alt="Large User"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <h2 className="text-base font-semibold text-[var(--color-dark-primary)] dark:text-white">
                                {user?.displayName || "User Name"}
                            </h2>
                            <h2 className="text-xs text-gray-600 dark:text-gray-300">
                                {user?.email || "User Email"}
                            </h2>
                        </div>
                    </div>
                    <hr className="text-gray-300 dark:text-gray-600 mt-3 mb-2" />
                    <Link to='/my-profile'>
                        <button
                            onClick={() => {
                                setClickedOpen(false);
                                setIsOpen(false);
                            }}
                            className="text-sm w-full flex gap-2 items-center text-gray-500 dark:text-gray-300 py-1 pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                            <FaFeatherPointed />  Edit Profile
                        </button></Link>
                    <button
                        onClick={handleSignOut}
                        className="text-sm w-full flex gap-2 items-center text-gray-500 dark:text-gray-300 py-1 pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                        <MdLogout />  Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default AccountAuthor;
