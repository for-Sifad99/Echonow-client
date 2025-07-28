import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { FaFaceGrinWide, FaEnvelope } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { FiSearch, FiMoon } from "react-icons/fi";
import { TiWeatherSunny } from "react-icons/ti";
import { VscMenu } from "react-icons/vsc";
import logo from "../../../../public/logo.png";
import {useTheme} from "../../../../hooks/themeContext/themeContext";
import SideNavbar from "./SideNavbar";

const ScrollNavbar = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [showNavbar, setShowNavbar] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef();

    const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

    useEffect(() => {
        const handleInteraction = (e) => {
            if (e.type === "mousedown" && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                closeSidebar();
            }
            if (e.type === "keydown" && e.key === "Escape") {
                closeSidebar();
            }
        };

        document.addEventListener("mousedown", handleInteraction);
        document.addEventListener("keydown", handleInteraction);

        return () => {
            document.removeEventListener("mousedown", handleInteraction);
            document.removeEventListener("keydown", handleInteraction);
        };
    }, [closeSidebar]);

    const mainNavLinkClass = useMemo(
        () => ({ isActive }) =>
            `text-[15px] xl:text-base text-[var(--dark)] dark:text-[var(--white)] relative after:absolute after:bottom-[-23px] after:left-0 after:h-[6px] after:w-full after:bg-[var(--primary)] after:transition-opacity after:duration-500 ${isActive ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-100"}`,
        []
    );

    const ArrowNav = ({ to, label, badge }) => (
        <NavLink to={to} className={mainNavLinkClass}>
            {({ isActive }) => (
                <span className='flex gap-1 items-center'>
                    {badge ? (
                        <span className='flex items-center gap-2'>
                            {label}
                            <span className='text-[11.9px] text-[var(--white)] bg-[#e57c69] px-2 rounded'>{badge}</span>
                        </span>
                    ) : (
                        label
                    )}
                    <IoIosArrowUp className={`${isActive ? "rotate-180" : ""}`} />
                </span>
            )}
        </NavLink>
    );

    const links = (
        <>
            <ArrowNav to="/" label="Home" />
            <ArrowNav to="/all-articles" label="All Articles" />
            {user && (
                <>
                    <ArrowNav to="/add-article" label="Add Article" />
                    <ArrowNav to="/my-articles" label="My Articles" />
                    <ArrowNav to="/premium-articles" label="Hot Articles" badge="fire" />
                </>
            )}
        </>
    );

    useEffect(() => {
        let ticking = false;

        const controlNavbar = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    if (scrollY > 300 && scrollY < lastScrollY) {
                        // Show navbar only if scrolled more than 50px and scrolling up
                        setShowNavbar(true);
                    } else {
                        setShowNavbar(false);
                    }

                    setLastScrollY(scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 transition-all duration-500 z-[999]  ${showNavbar ? !isSidebarOpen ? "translate-y-0" : "-translate-y-full" :"-translate-y-full"}`}>
                <div className="bg-[var(--secondary)] dark:bg-[var(--dark2-bg)] text-[var(--dark)] dark:text-[var(--white)] py-[19px] px-5 sm:px-6 xl:px-28 flex items-center justify-between">
                    {/* Left: Logo + Menu */}
                    <div className="flex items-center justify-center gap-4">
                        <VscMenu onClick={() => setIsSidebarOpen(true)} className="text-2xl cursor-pointer hover:text-[var(--primary)] transition-transform duration-300" />
                        <div className="flex flex-col justify-center -mt-3">
                            <Link to='/'>
                                <div className='flex items-center gap-1'>
                                    <img className='w-7 md:w-9 lg:w-8' src={logo} alt="Echo website logo" />
                                    <h1 className='text-lg sm:text-[22px] md:text-[28px] lg:text-2xl leading-9 font-medium font-oxygen'>EchoNow</h1>
                                </div>
                            </Link>
                            <p className="text-[6px] sm:text-[7px] md:text-[8px] leading-0 -mt-1 md:mt-0 lg:-mt-0.5 tracking-widest text-orange-400">SETTING YOU UP FOR SUCCESS</p>
                        </div>
                    </div>

                    {/* Middle: Nav Links */}
                    <nav className="hidden lg:flex justify-center gap-5 xl:gap-6 font-jost font-semibold xl:-ml-18">
                        {links}
                    </nav>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-2">
                        <label className="swap swap-rotate">
                            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                            <TiWeatherSunny className="swap-on text-xl" />
                            <FiMoon className="swap-off text-[19px]" />
                        </label>

                        <FiSearch className="cursor-pointer text-xl" />

                        <Link to={user ? '/subscription' : '/'}>
                            <div className="hidden sm:flex items-center group relative h-[32px] w-[110px] overflow-hidden rounded-full bg-[var(--primary)] text-[var(--white)] text-[13px] lg:text-sm font-semibold font-jost cursor-pointer">
                                <div className="absolute inset-0 flex items-center justify-center gap-2 transform transition-transform duration-500 group-hover:-translate-y-full">
                                    {user ? <><FaEnvelope className="-mr-0.5" /><span>Subscribe</span></> : <><FaFaceGrinWide className="-mr-0.5" /><span>Welcome</span></>}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center gap-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                    {user ? <><FaEnvelope className="-mr-0.5" /><span>Subscribe</span></> : <><FaFaceGrinWide className="-mr-0.5" /><span>Welcome</span></>}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className={`fixed z-[999] inset-0 bg-black/30 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <SideNavbar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} sidebarRef={sidebarRef} />
            </div>
        </>
    );
};

export default ScrollNavbar;
