import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth/useAuth';
import { FaFeatherPointed } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";

const DashboardAdmin = () => {
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
                        navigate('/');
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
            {/* user info*/}
            <div
                onClick={handleProfileClick}
                className="flex items-center gap-2 cursor-pointer">
                <img
                    ref={profileRef}
                    src={user?.photoURL || "/default-user.png"}
                    alt="User"
                    className="w-[40px] h-[40px] p-0.5  border border-blue-500  dark:border-blue-400  rounded-full"
                />
                <div className="font-jost">
                    <h2 className="flex justify-between items-center text-base uppercase font-bold leading-4 dark:text-[var(--white)] text-[var(--dark)]">
                        {user?.displayName || "User Name"}
                        {
                            isOpen ? <FaCaretDown /> : <FaCaretUp />
                        }
                    </h2>

                    <h2 className="text-xs dark:text-[var(--accent-white)] text-[var(--dark-bg)]">
                        {user?.email || "User Email"}
                    </h2>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    ref={modalRef}
                    className="absolute top-10 md:top-13 sm:top-11 right-0 text-sm -[var(--accent)] dark:text-[var(--accent-white)] font-oxygen w-44 bg-[var(--white)] dark:bg-[var(--accent)] shadow-sm rounded-md p-4 z-50"
                >
                    <Link to='/my-profile'>
                        <button
                            onClick={() => {
                                setClickedOpen(false);
                                setIsOpen(false);
                            }}
                            className="w-full flex gap-2 items-center py-1 px-3 rounded hover:bg-[var(--accent-white)] dark:hover:bg-gray-700 hover:translate-x-1 transition-all duration-300 cursor-pointer"
                        >
                            <FaFeatherPointed />  Edit Profile
                        </button></Link>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex gap-2 items-center py-1 px-3 rounded hover:bg-[var(--accent-white)] dark:hover:bg-gray-700 hover:translate-x-1 transition-all duration-300 cursor-pointer"
                    >
                        <MdLogout />  Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardAdmin;