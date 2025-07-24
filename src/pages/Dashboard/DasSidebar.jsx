import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Dashboard.css'
import { MUILink } from '../shared/MUIButton/MUIButton';
import { FiSearch, FiMoon } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { RiDashboardFill, RiStickyNoteAddFill, RiSettings3Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { MdArticle, MdLogout } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import { FaFeatherPointed } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth/useAuth';
import useTheme from '../../../hooks/themeContext/themeContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import DashSideArticle from './DashSideArticle';
import useRole from '../../../hooks/useUserRole/useRole';


const DasSidebar = ({ isSidebarOpen }) => {
    const { signOutUser, user } = useAuth();
    const { role, loading } = useRole();
    const { theme, toggleTheme } = useTheme();
    const [openStg, setOpenStg] = useState(false);
    const [openPro, setOpenPro] = useState(false);
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
    return (
        <nav className={`sidebar h-[100vh] overflow-x-hidden fixed top-16 left-0 pb-16 sm:pb-18 dark:bg-[var(--dark-bg)] bg-[var(--white)] transition-transform duration-300 ease-in-out w-[288px] z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <h1 className='w-40 mx-4 mt-1 sm:mt-0 text-xs opacity-50 font-bold dark:text-red-100 text-[var(--primary)] uppercase font-libreBas border-b-2'>main pages</h1>

            <div className='mx-auto font-oxygen flex md:hidden items-center bg-[var(--accent-white)] dark:bg-[var(--accent)] justify-between text-sm pl-4 pr-1 w-[250.19px] h-10 rounded-xl z-50 mt-6 sm:mt-8 -mb-5' >
                <input type="text" placeholder='Search Here...' className='ml-2 dark:text-[var(--white)] bg-[var(--accent-white)] dark:bg-[var(--accent)] border-none outline-none' />
                <FiSearch className="stroke-[var(--primary)] dark:stroke-[var(--dark)] bg-[var(--secondary)] text-[var(--dark)] dark:bg-[var(--white)] p-[12px] h-[34px] w-[34px] rounded-xl cursor-pointer" />
            </div>
            <ul className='flex flex-col gap-1 font-jost mt-6 md:mt-8' >
                {
                    !loading && role === 'admin' &&
                    <>
                        <li>
                            <NavLink
                                className='flex justify-center items-center'
                                to="/dashboard/dashboard"
                            >
                                {({ isActive }) => (
                                    <MUILink
                                        size={'90%'}
                                        text={'Dashboard'}
                                        icon1={<RiDashboardFill />}
                                        icon2={<IoIosArrowForward />}
                                        active={isActive}
                                    />
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='flex justify-center items-center'
                                to="/dashboard/all-users"
                            >
                                {({ isActive }) => (
                                    <MUILink
                                        size={'90%'}
                                        text={'All Users'}
                                        icon1={<HiUsers />}
                                        icon2={<IoIosArrowForward />}
                                        active={isActive} // Pass isActive to MUILink
                                    />
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='flex justify-center items-center'
                                to="/dashboard/all-articles"
                            >
                                {({ isActive }) => (
                                    <MUILink
                                        size={'90%'}
                                        text={'All Articles'}
                                        icon1={<MdArticle />}
                                        icon2={<IoIosArrowForward />}
                                        active={isActive} // Pass isActive to MUILink
                                    />
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='flex justify-center items-center'
                                to="/dashboard/add-publisher"
                            >
                                {({ isActive }) => (
                                    <MUILink
                                        size={'90%'}
                                        text={'Add Publisher'}
                                        icon1={<RiStickyNoteAddFill />}
                                        icon2={<IoIosArrowForward />}
                                        active={isActive} // Pass isActive to MUILink
                                    />
                                )}
                            </NavLink>
                        </li>
                    </>
                }
                <li className='md:hidden'>
                    <div onClick={() => setOpenStg(!openStg)} className="w-full flex flex-col justify-center items-center">
                        <MUILink
                            size={'90%'}
                            text={'Mode Settings'}
                            icon1={<RiSettings3Fill />}
                            icon2={<IoIosArrowForward className={`transform transition-transform duration-300 ${openStg ? 'rotate-90' : ''}`} />}
                        />
                    </div>
                    <label
                        className={`relative swap transition-all duration-300 ease-in-out
        ${openStg ? 'block' : 'hidden'}  text-[var(--dark-bg)] dark:text-[var(--base-100)] font-semibold`}
                    >
                        {/* Theme */}
                        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                        <p className='swap-off absolute top-0 left-8 pl-4 border-l  border-gray-400 flex items-center gap-1 cursor-pointer'><FiMoon />Dark Mode</p>
                        <p className='swap-on absolute top-0 left-8 pl-4 opacity-70 border-l border-gray-400 flex items-center gap-1  cursor-pointer'><IoSunnyOutline />Light Mode</p>
                    </label>
                </li>
                <li className='md:hidden'>
                    <div onClick={() => setOpenPro(!openPro)} className="w-full flex flex-col justify-center items-center">
                        <Button
                            sx={{
                                width: '90%',
                                minWidth: '90%',
                                height: 'auto',
                                justifyContent: 'flex-start',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <div className="flex items-center py-1 w-full">
                                <img src={user?.photoURL} className='rounded-full w-8 p-0.5 border border-blue-600 dark:border-blue-400  ' alt="" />
                                <div className="flex flex-col items-start justify-start opacity-90 ml-2 mr-auto">
                                    <p className='font-bold font-oxygen leading-2 mt-1 dark:text-[var(--white)] text-[var(--dark)]'>
                                        {user?.displayName}
                                    </p>
                                    <p className='text-xs font-jost dark:text-[var(--accent-white)] text-[var(--dark-secondary)]'>
                                        {user?.email}
                                    </p>
                                </div>
                                <IoIosArrowForward className={`text-[var(--accent)] transform transition-transform duration-300 ${openPro ? 'rotate-90' : ''}`} />
                            </div>
                        </Button>
                    </div>
                    <div
                        className={`ml-10 mr-auto overflow-hidden transition-all duration-300 ease-in-out
        ${openPro ? 'max-h-[300px]' : 'max-h-0'} flex flex-col text-[var(--accent)] dark:text-[var(--base-100)] font-semibold gap-1.5 pl-4 border-l border-gray-400`}
                    >
                        <Link to='/my-profile'
                            className='flex items-center gap-1 pt-1 hover:text-[var(--primary)]  dark:hover:text-[var(--secondary)] cursor-pointer'>
                            <FaFeatherPointed />Edit Profile
                        </Link>
                        <p
                            onClick={handleSignOut}
                            className='flex items-center gap-1 pb-1 hover:text-[var(--primary)]  dark:hover:text-[var(--secondary)] cursor-pointer'>
                            <MdLogout />Sign Out
                        </p>
                    </div>
                </li>
            </ul>
            <div className='mx-4 mt-6'>
                <DashSideArticle />
            </div>
        </nav>
    );
};

export default DasSidebar;
