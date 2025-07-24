import React from 'react';
import { useEffect, useRef, useState } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { VscMenu } from "react-icons/vsc";
import { FiSearch, FiMoon } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";
import { BiLogoFacebook } from "react-icons/bi";
import { RiTwitterLine } from "react-icons/ri";
import { IoLogoInstagram, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
import { SlSocialPintarest } from "react-icons/sl";
import { LiaGithub } from "react-icons/lia";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { FaFaceGrinWide } from "react-icons/fa6";
import logo from '/logo.png';
import EchoLogo from "../EchoLogo/EchoLogo";
import { Link, NavLink } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth/useAuth';
import useTheme from '../../../../hooks/themeContext/themeContext';
import AccountAuthor from '../../MyProfile/AccountAuthor';
import useRole from '../../../../hooks/useUserRole/useRole';

const Navbar = () => {
    const { user } = useAuth();
    const { role, loading } = useRole();
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef();

    const closeSidebar = () => setIsSidebarOpen(false);

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

    const mainNavLinkClass = ({ isActive }) =>
        `${user ? 'text-sm' : 'text-base'} relative after:absolute after:bottom-[-15px] after:left-0 after:h-[4px] after:w-full after:bg-[var(--primary)] after:transition-opacity after:duration-500 ${isActive ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-100"
        }`;

    const sideNavLinkClass = () =>
        'block px-1 py-2 text-[var(--dark)] hover:text-[var(--accent)] border-t border-gray-200 font-semibold rounded-md transition-all duration-300';

    const links = (
        <>
            <NavLink to="/" className={mainNavLinkClass}>
                {({ isActive }) => (
                    <span className='flex gap-1 items-center'>
                        Home
                        {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </span>
                )}
            </NavLink>
            <NavLink to="/all-articles" className={mainNavLinkClass}>
                {({ isActive }) => (
                    <span className='flex gap-1 items-center'>
                        All Articles
                        {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </span>
                )}
            </NavLink>
            {user &&
                <>
                    <NavLink to="/add-article" className={mainNavLinkClass}>
                        {({ isActive }) => (
                            <span className='flex gap-1 items-center'>
                                Add Article
                                {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                            </span>
                        )}
                    </NavLink>
                    <NavLink to="/subscription" className={`${mainNavLinkClass} lg:hidden`}>
                        {({ isActive }) => (
                            <span className='flex gap-1 items-center'>
                                Subscription
                                {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                            </span>
                        )}
                    </NavLink>
                    {
                        !loading && role === 'admin' &&
                        <NavLink to="/dashboard" className={mainNavLinkClass}>
                            {({ isActive }) => (
                                <span className='flex gap-1 items-center'>
                                    Dashboard
                                    {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                </span>
                            )}
                        </NavLink>
                    }
                    <NavLink to="/my-articles" className={mainNavLinkClass}>
                        {({ isActive }) => (
                            <span className='flex gap-1 items-center'>
                                My Articles
                                {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                            </span>
                        )}
                    </NavLink>
                    <NavLink to="/premium-articles" className={mainNavLinkClass}>
                        {({ isActive }) => (
                            <span className='flex gap-1 items-center'>
                                Premium Articles
                                {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                            </span>
                        )}
                    </NavLink>
                    <NavLink to="/my-profile" className={mainNavLinkClass}>
                        {({ isActive }) => (
                            <span className='flex gap-1 items-center'>
                                User Profile
                                {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
                            </span>
                        )}
                    </NavLink></>
            }
        </>
    );

    const sidebarLinks = (
        <>
            <NavLink
                to="/"
                onClick={closeSidebar}
                className={
                    `${sideNavLinkClass} border-none`
                }
            >
                {({ isActive }) => (
                    <span className='flex justify-between items-center'>
                        Home
                        {isActive ? <IoIosArrowDown /> : <MdKeyboardArrowRight size={28} className="-mr-1.5" />}
                    </span>
                )}
            </NavLink>
            <NavLink to="/all-articles" className={sideNavLinkClass}
                onClick={closeSidebar}>
                {({ isActive }) => (
                    <span className='flex justify-between items-center'>
                        All Articles
                        {isActive ? <IoIosArrowDown /> : <MdKeyboardArrowRight size={28} className="-mr-1.5" />}
                    </span>
                )}</NavLink>
            {user &&
                <><NavLink to="/add-article" className={sideNavLinkClass} onClick={closeSidebar}>
                    {({ isActive }) => (

                        <span className='flex justify-between items-center'>
                            Add Article
                            {isActive ? <IoIosArrowDown /> : <MdKeyboardArrowRight size={28} className="-mr-1.5" />}
                        </span>
                    )}</NavLink>
                    <NavLink to="/subscription" className={sideNavLinkClass} onClick={closeSidebar}>
                        {({ isActive }) => (
                            <span className='flex justify-between items-center'>
                                Subscription
                                {isActive ? <IoIosArrowDown /> : <MdKeyboardArrowRight size={28} className="-mr-1.5" />}
                            </span>
                        )}</NavLink>
                    <NavLink to="/dashboard" className={sideNavLinkClass} onClick={closeSidebar}>
                        {({ isActive }) => (
                            <span className='flex justify-between items-center'>
                                Dashboard
                                {isActive ? <IoIosArrowDown /> : <MdKeyboardArrowRight size={28} className="-mr-1.5" />}
                            </span>
                        )}</NavLink>
                    <NavLink to="/my-articles" className={sideNavLinkClass} onClick={closeSidebar}>
                        {({ isActive }) => (
                            <span className='flex justify-between items-center'>
                                My Articles
                                {isActive ? <IoIosArrowDown /> : <MdKeyboardArrowRight size={28} className="-mr-1.5" />}
                            </span>
                        )}</NavLink>
                    <NavLink to="/premium-articles" className={sideNavLinkClass} onClick={closeSidebar}>
                        {({ isActive }) => (
                            <span className='flex justify-between items-center'>
                                Premium Articles
                                {isActive ? <IoIosArrowDown /> : <MdKeyboardArrowRight size={28} className="-mr-1.5" />}
                            </span>
                        )}</NavLink>
                    <NavLink to="/my-profile" className={sideNavLinkClass} onClick={closeSidebar}>
                        {({ isActive }) => (
                            <span className='flex justify-between items-center'>
                                User Profile
                                {isActive ? <IoIosArrowDown /> : <MdKeyboardArrowRight size={28} className="-mr-1.5" />}
                            </span>
                        )}</NavLink></>}
        </>
    );

    return (
        <header className="bg-[var(--secondary)] text-[var(--dark)] relative z-50">
            {/* Top Row */}
            <div className="flex justify-between items-center px-3 pt-3 pb-4 sm:px-6 lg:pt-6 lg:pb-7">
                {/* Left: Hamburger + Subscribe */}
                <div className="flex items-center gap-4">
                    <VscMenu className="text-2xl sm:text-3xl cursor-pointer hover:text-[var(--primary)] transition-transform duration-300" onClick={() => setIsSidebarOpen(true)} />
                    <Link to={`${user ? '/subscription' : '/'}`}>
                        <div className="hidden md:flex items-center group relative h-8 w-30 overflow-hidden rounded-full bg-[var(--primary)] text-white cursor-pointer">
                            <div className="absolute inset-0 flex items-center justify-center gap-2 transform transition-transform duration-500 group-hover:-translate-y-full">
                                {user ? <><FaEnvelope className="text-white -mr-0.5" />
                                    <span className="text-sm font-semibold font-jost">Subscribe</span></> : <><FaFaceGrinWide className="text-white -mr-0.5" />
                                    <span className="text-sm font-semibold font-jost">Welcome</span></>}
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center gap-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                {user ? <><FaEnvelope className="text-white -mr-0.5" />
                                    <span className="text-sm font-semibold font-jost">Subscribe</span></> : <><FaFaceGrinWide className="text-white -mr-0.5" />
                                    <span className="text-sm font-semibold font-jost">Welcome</span></>}
                            </div>
                        </div></Link>
                </div>

                {/* Center: Logo */}
                <div className="flex flex-col items-center justify-center">
                    <EchoLogo />
                    <p className="text-[8px] text-center sm:text-xs tracking-widest text-orange-400 -mt-1 sm:-mt-0">
                        SETTING YOU UP FOR SUCCESS
                    </p>
                </div>

                {/* Right: Search + Cart */}
                <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4">
                    {/* Theme */}
                    <label className="swap swap-rotate md:-mr-1.5">
                        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />

                        {/* sun icon */}
                        <TiWeatherSunny className="swap-on sm:text-[26px] text-[22px]" />

                        {/* moon icon */}
                        <FiMoon className="swap-off sm:text-[23px] text-xl" />
                    </label>
                    <FiSearch className="text-xl sm:text-2xl cursor-pointer" />
                    {
                        user ? <AccountAuthor /> : <Link to="/auth/login">
                            <button className="hidden md:flex items-center gap-1.5 py-2 text-[var(--primary)] font-bold font-libreBas rounded-md cursor-pointer">Sign In <PiSignInBold />
                            </button>
                        </Link>
                    }
                </div>
            </div>

            {/* Bottom Nav */}
            <nav className="hidden lg:flex justify-center gap-6 border-t border-red-200 py-4 text-base xl:text-lg font-jost font-semibold">
                {links}
            </nav>

            {/* Sidebar */}
            <div className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <aside
                    ref={sidebarRef}
                    className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } flex flex-col gap-4`}
                >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                        <Link to='/'>
                            <div className='flex items-center justify-center gap-1'>
                                <img className='-ml-6 w-9' src={logo} alt="Echo website logo" />
                                <h1 className='text-[27px] font-normal font-oxygen'>EchoNow</h1>
                            </div>
                            <p className="pl-1 text-[11px] tracking-widest text-orange-400 -mt-1">
                                SETTING YOU UP FOR SUCCESS
                            </p>
                        </Link>
                        <AiOutlineClose
                            className="text-2xl cursor-pointer hover:text-[var(--primary)] hover:rotate-90 transition-transform duration-400"
                            onClick={closeSidebar}
                        />
                    </div>

                    {/* Sidebar Links */}
                    <nav className="flex flex-col px-4 text-lg font-jost font-semibold">{sidebarLinks}</nav>

                    <div className='flex flex-col justify-end mt-auto'>
                        {/* Sidebar Conditional Buttons */}
                        {user ? (
                            <Link to='/all-articles'>
                                <button
                                    onClick={closeSidebar}
                                    type="submit"
                                    className="mx-4 w-[250px] bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white font-oxygen font-semibold py-2 rounded-md transition duration-700 cursor-pointer"
                                >
                                    Explore Articles
                                </button>
                            </Link>
                        ) : <Link to='/auth/login'>
                            <button
                                onClick={closeSidebar}
                                type="submit"
                                className="mx-4 w-[250px] bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white font-oxygen font-semibold py-2 rounded-md transition duration-700 cursor-pointer"
                            >
                                Sign In
                            </button>
                        </Link>
                        }

                        {/* Sidebar Footer */}
                        <footer className="px-4.5 pt-5 pb-5 font-jost">
                            <div className="flex items-center -ml-1 gap-3 text-xl mb-2">
                                <a href="#" className=" hover:text-blue-600"><BiLogoFacebook /></a>
                                <a href="#" className="hover:text-blue-400"><RiTwitterLine /></a>
                                <a href="#" className="hover:text-pink-500"><IoLogoInstagram /></a>
                                <a href="#" className="hover:text-[var(--primary)]"><AiOutlineYoutube /></a>
                                <a href="#" className="text-base hover:text-[var(--primary)]"><SlSocialPintarest /></a>
                                <a href="#" className="hover:text-gray-700"><LiaGithub /></a>
                            </div>
                            <p className="text-xs">
                                © Copyright {new Date().getFullYear()} EchoNow. All rights reserved<br />
                                powered by echonow.netlify.app
                            </p>
                        </footer>
                    </div>
                </aside>
            </div>
        </header>
    );
};

export default Navbar;
