import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxios";
import { useTheme } from '../../../../hooks/themeContext/themeContext';
import useAuth from '../../../../hooks/useAuth/useAuth';
import EchoLogo from "../EchoLogo/EchoLogo";
import { LuLogOut } from "react-icons/lu";
import { TiWeatherSunny } from "react-icons/ti";
import { VscMenu } from "react-icons/vsc";
import { FiSearch, FiMoon } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { FaFaceGrinWide } from "react-icons/fa6";
import SideNavbar from './SideNavbar';

const Navbar = () => {
    const { user } = useAuth();
    const [dbUser, setDbUser] = useState(null);
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const closeSidebar = () => setIsSidebarOpen(false);
    const sidebarRef = useRef();
    const axiosPublic = useAxiosPublic();

    // Fetch user profile using useEffect and axiosPublic
    useEffect(() => {
        if (!user?.email) return;

        const fetchUser = async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            setDbUser(res.data);
        };

        fetchUser();
    }, [user?.email, axiosPublic]);

    // Close sidebar when clicking outside or pressing Escape
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                closeSidebar();
            }
        };

        const handleEscape = (e) => {
            if (e.key === "Escape") closeSidebar();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    // NavLinks styles
    const mainNavLinkClass = ({ isActive }) =>
        `text-[17px] font-medium text-[var(--dark)] dark:text-[var(--white)] relative after:absolute after:bottom-[-16px] after:left-0 after:h-[6px] after:w-full after:bg-[var(--primary)] after:transition-opacity after:duration-500 ${isActive ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-100"
        }`;

    // Links data
    const links = (
        <>
            <NavLink to="/" className={mainNavLinkClass}>
                {({ isActive }) => (
                    <span className='flex gap-1 items-center'>
                        Home
                        <IoIosArrowUp className={`${isActive ? 'rotate-180' : ' '}`} />
                    </span>
                )}
            </NavLink>
            <NavLink to="/all-articles" className={mainNavLinkClass}>
                {({ isActive }) => (
                    <span className='flex gap-1 items-center'>
                        All Articles
                        <IoIosArrowUp className={`${isActive ? 'rotate-180' : ' '}`} />
                    </span>
                )}
            </NavLink>
            {user ?
                <>
                    <NavLink to="/add-article" className={mainNavLinkClass}>
                        {({ isActive }) => (
                            <span className='flex gap-1 items-center'>
                                Add Article
                                <IoIosArrowUp className={`${isActive ? 'rotate-180' : ' '}`} />
                            </span>
                        )}
                    </NavLink>
                    <NavLink to="/my-articles" className={mainNavLinkClass}>
                        {({ isActive }) => (
                            <span className='flex gap-1 items-center'>
                                My Articles
                                <IoIosArrowUp className={`${isActive ? 'rotate-180' : ' '}`} />
                            </span>
                        )}
                    </NavLink>
                    <NavLink to="/premium-articles" className={mainNavLinkClass}>
                        {({ isActive }) => (
                            <div className='flex gap-1 items-center'>
                                <h3 className='flex items-center gap-2'>
                                    <p>Premium Articles</p> <p className='text-[11.9px] text-[var(--white)] bg-[#e57c69] px-2 rounded'>fire</p>
                                </h3>
                                <IoIosArrowUp className={`${isActive ? 'rotate-180' : ' '}`} />
                            </div>
                        )}
                    </NavLink>
                </> :
                <NavLink to="/our-blogs" className={mainNavLinkClass}>
                    {({ isActive }) => (
                        <span className='flex gap-1 items-center'>
                            Our Blogs
                            <IoIosArrowUp className={`${isActive ? 'rotate-180' : ' '}`} />
                        </span>
                    )}
                </NavLink>
            }
        </>
    );

    return (
        <header className={`overflow-hidden bg-[var(--secondary)] dark:bg-[#212227] text-[var(--dark)] dark:text-[var(--white)] relative z-[99]`}>
            {/* Top Row */}
            <div className="flex justify-between items-center px-2 sm:px-6 py-[19px] lg:py-8">
                {/* Left: Hamburger + Subscribe */}
                <div className="flex items-center gap-4">
                    <VscMenu className="text-xl sm:text-2xl md:text-2xl cursor-pointer hover:text-[var(--primary)] transition-transform duration-300" onClick={() => setIsSidebarOpen(true)} />

                    <Link to={`${user ? '/subscription' : '/'}`}>
                        <div className="hidden md:flex items-center group relative md:h-[28px] md:w-[104px] lg:h-[30px] lg:w-28 overflow-hidden rounded-full bg-[var(--primary)] text-[var(--white)] text-[13px] lg:text-sm font-semibold font-jost cursor-pointer">
                            <div className="absolute inset-0 flex items-center justify-center gap-2 transform transition-transform duration-500 group-hover:-translate-y-full">
                                {user ? <><FaEnvelope className="-mr-0.5" />
                                    <span>Subscribe</span></> : <><FaFaceGrinWide className="-mr-0.5" />
                                    <span>Welcome</span></>}
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center gap-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                {user ? <><FaEnvelope className="-mr-0.5" />
                                    <span>Subscribe</span></> : <><FaFaceGrinWide className="-mr-0.5" />
                                    <span>Welcome</span></>}
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Center: Logo */}
                <div className="flex flex-col items-center justify-center">
                    <div className='-mt-3'>
                        <EchoLogo />
                    </div>

                    {/* Title */}
                    <p className="text-[8px] md:text-[11px] lg:text-xs text-center  tracking-widest text-orange-400 font-medium dark:text-orange-300 leading-0 sm:leading-1 lg:leading-4">
                        SETTING YOU UP FOR SUCCESS
                    </p>
                </div>

                {/* Right: Search + Cart */}
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
                    {/* Theme */}
                    <label className="swap swap-rotate">
                        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />

                        {/* sun icon */}
                        <TiWeatherSunny className="swap-on text-xl md:text-[22px]" />

                        {/* moon icon */}
                        <FiMoon className="swap-off text-[19px] md:text-[21px]" />
                    </label>

                    {/* Search box */}
                    <div className="relative inline-block text-left">
                        {/* Search Icon */}
                        <FiSearch
                            className="text-xl cursor-pointer"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        />

                        {/* Dropdown input */}
                        <div
                            className={`absolute -left-61.5 sm:-left-68 md:-left-76 -top-3.5 lg:-left-68 lg:top-8.5 dark:bg-[var(--dark-bg)] bg-[var(--white)] text-[var(--dark)] shadow-sm ${isSearchOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                }`}
                        >
                            <div className='relative font-jost w-full'>
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="w-60 sm:w-66 md:w-74 p-4 text-xs bg-[var(--white)] text-[var(--dark)] placeholder-[var(--dark)] dark:placeholder-[var(--white)] dark:bg-[var(--dark-bg)] dark:text-[var(--white)] focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2.5 top-2.5 bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-sm text-[var(--white)] px-3 py-1 font-medium transition duration-700 cursor-pointer"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* User Profile */}
                    {user ?
                        <Link to='/my-profile' className='ml-1'>
                            <img 
                                src={dbUser?.photo || user?.photoURL || '/default-user.png'} 
                                alt="User profile" 
                                className="w-[25px] h-[25px] md:w-[27px] md:h-[27px] lg:w-[29px] lg:h-[29px] rounded-full object-cover cursor-pointer"
                                onError={(e) => {
                                    e.target.src = '/default-user.png';
                                }}
                            />
                        </Link> :
                        <Link to='/auth/login'>
                            <button className='flex justify-center items-center gap-2 font-libreBas text-[var(--primary)] dark:text-red-300'>Sign In <LuLogOut /></button>
                        </Link>
                    }
                </div>
            </div>

            {/* Bottom Nav */}
            <nav className="hidden lg:flex justify-center gap-6 border-t border-red-200 dark:border-[var(--accent)] py-4 font-jost font-semibold">
                {links}
            </nav>

            {/* Sidebar */}
            <div className={`fixed inset-0 z-[999] bg-black/30 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <SideNavbar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} sidebarRef={sidebarRef} />
            </div>
        </header>
    );
};

export default Navbar;
