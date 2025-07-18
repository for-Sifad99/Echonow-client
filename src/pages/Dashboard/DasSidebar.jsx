import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Dashboard.css'
import { MUIButton, MUILink } from '../shared/MUIButton/MUIButton';
import { FiSearch, FiMoon } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { RiDashboardFill, RiStickyNoteAddFill, RiSettings3Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { MdArticle, MdLogout } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import { FaFeatherPointed } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth/useAuth';
import useTheme from '../../../hooks/themeContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';



const DasSidebar = ({ isSidebarOpen }) => {
    const { signOutUser, user } = useAuth();
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
        <nav className={`sidebar h-[100vh] max-h-[calc(100%-64px)] pb-20 overflow-y-scroll overflow-x-hidden fixed top-[64px] left-0 bg-[var(--white)] z-50 transition-transform duration-300 ease-in-out w-[260px] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <h1 className='w-40 mx-4 mt-1 sm:mt-0 text-xs opacity-50 font-bold text-[var(--primary)] uppercase font-libreBas border-b-2'>main pages</h1>

            <div className='mx-auto font-oxygen flex md:hidden items-center justify-between text-sm pl-4 pr-1 w-[226px] h-10 bg-[#f0f5ff]  rounded-xl z-50 mt-6 sm:mt-8 -mb-5' >
                <input type="text" placeholder='Search Here...' className='ml-2 bg-transparent border-none outline-none' />
                <MUIButton
                    bgColor={'#fff'}
                    size={'33px'}
                    radius={'30%'}
                    icon={<FiSearch />}
                />
            </div>
            <ul className='flex flex-col gap-1 font-jost text-[#045ccf] mt-6 md:mt-8' >
                <li>
                    <NavLink
                        className='flex justify-center items-center'
                        to="/dashboard"
                    >
                        {({ isActive }) => (
                            <MUILink
                                size={'90%'}
                                text={'Dashboard'}
                                icon1={<RiDashboardFill />}
                                icon2={<IoIosArrowForward />}
                                active={isActive} // Pass isActive to MUILink
                            />
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className='flex justify-center items-center'
                        to="/all-users"
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
                        to="/all-users"
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
                        to="/all-users"
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
        ${openStg ? 'hidden' : 'block'} text-[#5e5d72] font-semibold`}
                    >
                        {/* Theme */}
                        <input type="checkbox" onChange={toggleTheme} defaultChecked={theme === 'dark'} />
                        <p className='swap-off absolute top-0 left-8 pl-4 border-l border-gray-400 flex items-center gap-1 cursor-pointer'><FiMoon />Dark Mode</p>
                        <p className='swap-on absolute top-0 left-8 pl-4 border-l border-gray-400 flex items-center gap-1  cursor-pointer'><IoSunnyOutline />Light Mode</p>
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
                                backgroundColor: '#fff',
                                color: '#000',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#fff',
                                },
                            }}
                        >
                            <div className="flex items-center px-2 py-1 w-full">
                                <img src={user?.photoURL} className='rounded-full w-8 p-0.5 border border-blue-600' alt="" />
                                <div className="flex flex-col items-start justify-start opacity-90 ml-2 mr-auto">
                                    <p className='font-bold font-oxygen leading-2 mt-1'>
                                        {user?.displayName}
                                    </p>
                                    <p className='text-xs font-jost'>
                                        {user?.email}
                                    </p>
                                </div>
                                <IoIosArrowForward className={`text-[#5e5d72] transform transition-transform duration-300 ${openPro ? 'rotate-90' : ''}`} />
                            </div>
                        </Button>
                    </div>
                    <div
                        className={`ml-10 mr-auto overflow-hidden transition-all duration-300 ease-in-out
        ${openPro ? 'max-h-[300px]' : 'max-h-0'} flex flex-col text-[#5e5d72] font-semibold gap-1.5 pl-4 border-l border-gray-400`}
                    >
                        <Link to='/my-profile'
                            className='flex items-center gap-1 pt-1 hover:text-[var(--primary)] cursor-pointer'>
                            <FaFeatherPointed />Edit Profile
                        </Link>
                        <p
                            onClick={handleSignOut}
                            className='flex items-center gap-1 pb-1 hover:text-[var(--primary)] cursor-pointer'>
                            <MdLogout />Sign Out
                        </p>
                    </div>
                </li>
                <li className='h-[400px]'></li>
            </ul>
        </nav>
    );
};

export default DasSidebar;
