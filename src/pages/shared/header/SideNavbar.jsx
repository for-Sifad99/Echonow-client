import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth/useAuth';
import useRole from '../../../../hooks/useUserRole/useRole';
import SideArticle from '../SideArticles/SideArticle';
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiLogoFacebook } from "react-icons/bi";
import { RiTwitterLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
import { SlSocialPintarest } from "react-icons/sl";
import { LiaGithub } from "react-icons/lia";
import logo from '/logo.png';

const SideNavbar = ({ sidebarRef, isSidebarOpen, closeSidebar }) => {
    const { user } = useAuth();
    const { role, loading } = useRole();

    // NavLinks styles
    const sideNavLinkClass = () =>
        'block text-base font-medium hover:text-gray-500 dark:hover:text-gray-400 rounded-md transition-all duration-300';

    // Sidebar links data
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
                    <span className='border-b border-gray-200 dark:border-gray-600 py-[9px] flex justify-between items-center'>
                        Home
                        <MdKeyboardArrowRight className={`${isActive ? 'rotate-90' : ' '}`} size={22} />
                    </span>
                )}
            </NavLink>
            <NavLink to="/all-articles" className={sideNavLinkClass}
                onClick={closeSidebar}>
                {({ isActive }) => (
                    <span className='border-b border-gray-200 dark:border-gray-600 py-[9px] flex justify-between items-center'>
                        All Articles
                        <MdKeyboardArrowRight className={`${isActive ? 'rotate-90' : ' '}`} size={22} />
                    </span>
                )}</NavLink>
            {user &&
                <><NavLink to="/add-article" className={sideNavLinkClass} onClick={closeSidebar}>
                    {({ isActive }) => (

                        <span className='border-b border-gray-200 dark:border-gray-600 py-[9px] flex justify-between items-center'>
                            Add Article
                            <MdKeyboardArrowRight className={`${isActive ? 'rotate-90' : ' '}`} size={22} />
                        </span>
                    )}</NavLink>
                    {
                        !user &&
                        <NavLink to="/subscription" className={sideNavLinkClass} onClick={closeSidebar}>
                            {({ isActive }) => (
                                <span className='border-b border-gray-200 dark:border-gray-600 py-[9px] flex justify-between items-center'>
                                    Subscription
                                    <MdKeyboardArrowRight className={`${isActive ? 'rotate-90' : ' '}`} size={22} />
                                </span>
                            )}</NavLink>
                    }
                    {
                        !loading && role === 'admin' &&
                    <NavLink to="/dashboard" className={sideNavLinkClass} onClick={closeSidebar}>
                        {({ isActive }) => (
                            <span className='border-b border-gray-200 dark:border-gray-600 py-[9px] flex justify-between items-center'>
                                Dashboard
                                <MdKeyboardArrowRight className={`${isActive ? 'rotate-90' : ' '}`} size={22} />
                            </span>
                        )}</NavLink>
                    }
                    <NavLink to="/my-articles" className={sideNavLinkClass} onClick={closeSidebar}>
                        {({ isActive }) => (
                            <span className='border-b border-gray-200 dark:border-gray-600 py-[9px] flex justify-between items-center'>
                                My Articles
                                <MdKeyboardArrowRight className={`${isActive ? 'rotate-90' : ' '}`} size={22} />
                            </span>
                        )}</NavLink>
                    <NavLink to="/premium-articles" className={sideNavLinkClass} onClick={closeSidebar}>
                        {({ isActive }) => (
                            <div className='border-b border-gray-200 dark:border-gray-600 py-[9px] flex justify-between items-center'>
                                <h3 className='flex items-center gap-2'>
                                    <p>Premium Articles</p> <p className='text-[11.9px] text-[var(--white)]  bg-[#e57c69] px-2 rounded'>fire</p>
                                </h3>
                                <MdKeyboardArrowRight className={`${isActive ? 'rotate-90' : ' '}`} size={22} />
                            </div>
                        )}</NavLink>
                    <NavLink to="/my-profile" className={sideNavLinkClass} onClick={closeSidebar}>
                        {({ isActive }) => (
                            <span className='py-[9px] flex justify-between items-center'>
                                My Profile
                                <MdKeyboardArrowRight className={`${isActive ? 'rotate-90' : ' '}`} size={22} />
                            </span>
                        )}</NavLink></>}
        </>
    );

    return (
        <aside
            ref={sidebarRef}
            className={`sidebar fixed top-0 left-0 h-full w-full max-w-[310px] flex flex-col gap-6 bg-[var(--white)] dark:bg-[var(--dark2-bg)] text-[var(--dark)] dark:text-[var(--white)] shadow-lg transform transition-transform duration-300 overflow-x-hidden overflow-y-visible ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 dark:border-gray-500">
                {/* Logo */}
                <Link to='/'>
                    <div className='flex items-center justify-center gap-1 -mt-[7px]'>
                        <img className='-ml-8 w-9' src={logo} alt="Echo website logo" />
                        <h1 className='text-[27px] font-normal font-oxygen'>EchoNow</h1>
                    </div>

                    {/* Title */}
                    <p className="text-[11px] tracking-widest text-orange-400 dark:text-orange-300 font-medium -mt-2">
                        SETTING YOU UP FOR SUCCESS
                    </p>
                </Link>

                {/* Sidebar close button */}
                <AiOutlineClose
                    className="text-2xl cursor-pointer hover:text-[var(--primary)] hover:rotate-90 transition-transform duration-400"
                    onClick={closeSidebar}
                />
            </div>

            {/* Sidebar Links */}
            <nav className="flex flex-col px-5 font-jost font-medium">
                {sidebarLinks}
            </nav>

            {/* Side articles */}
            <div className='px-5 dark:bg-[var(--dark2-bg)] '>
                <SideArticle
                    closeSidebar={closeSidebar}
                />
            </div>

            {/* Action buttons */}
            <div className='px-5 -mb-2'>
                {user ? (
                    <Link to='/all-articles'>
                        <button
                            onClick={closeSidebar}
                            type="submit"
                            className="w-full bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white font-oxygen font-semibold py-2 rounded-md transition duration-700 cursor-pointer"
                        >
                            Explore Articles
                        </button>
                    </Link>
                ) : <Link to='/auth/login'>
                    <button
                        onClick={closeSidebar}
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white font-oxygen font-semibold py-2 rounded-md transition duration-700 cursor-pointer"
                    >
                        Sign In
                    </button>
                </Link>
                }
            </div>

            {/* Sidebar Footer */}
            <footer className="px-5 pb-4 font-jost">
                <div className="flex items-center -ml-1 gap-3 text-xl mb-2">
                    <a href="#" className=" hover:text-blue-500"><BiLogoFacebook /></a>
                    <a href="#" className="hover:text-pink-500"><RiTwitterLine /></a>
                    <a href="#" className="hover:text-violet-900"><IoLogoInstagram /></a>
                    <a href="#" className="hover:text-[var(--primary)]"><AiOutlineYoutube /></a>
                    <a href="#" className="text-base hover:text-[var(--primary)]"><SlSocialPintarest /></a>
                    <a href="#" className="hover:text-gray-700 dark:hover:text-gray-400"><LiaGithub /></a>
                </div>
                <p className="text-xs">
                    © Copyright {new Date().getFullYear()} EchoNow. All rights reserved<br />
                    powered by <span className='text-[var(--primary)] dark:text-red-400'>echonow.netlify.app</span>
                </p>
            </footer>
        </aside>
    );
};

export default SideNavbar;