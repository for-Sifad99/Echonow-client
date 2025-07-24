import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MUIButton } from '../pages/shared/MUIButton/MUIButton';
import DashboardAdmin from '../pages/Dashboard/DashboardAdmin';
import DasSidebar from '../pages/Dashboard/DasSidebar';
import useTheme from '../../hooks/themeContext/themeContext';
import logo from '/logo.png';
import { RiMenuUnfold2Fill, RiMenuFold2Fill } from "react-icons/ri";
import { IoSunnyOutline } from "react-icons/io5";
import { FiSearch, FiMoon } from "react-icons/fi";


const DashboardRoot = () => {
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };


    useEffect(() => {
        const handleResize = () => {
            // Responsive logic
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false); // Small device
            } else {
                setIsSidebarOpen(true); // Large device
            }
        };

        // Initial check
        handleResize();

        // Optional: auto update on resize
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="flex flex-col min-h-screen overflow-y-hidden">
            {/* Header */}
            <header className='fixed top-0 left-0 flex justify-between items-center w-full h-16 px-2 sm:px-4 dark:bg-[var(--dark-bg)] bg-[var(--white)] z-50'>
                <div className="dark:hidden absolute left-0 md:left-[300px] lg:left-[400px] xl:left-[600px] -top-20 z-40 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
                    <div className="mx-auto aspect-1000/600 h-20 w-52 sm:w-96 bg-linear-to-tr from-[var(--primary)] to-[var(--secondary)]" ></div>
                </div>

                <div className='flex items-center justify-between md:justify-center min-w-full md:min-w-fit md:gap-[37px]'>
                    <Link to='/'>
                        <div className='flex items-center mr-auto gap-1'>
                            <img className='w-10 sm:w-11' src={logo} alt="Echo website logo" />
                            <h1 className='text-[27px] sm:text-3xl dark:text-[var(--white)] text-[var(--dark)] font-bold font-jost'>EchoNow</h1>
                        </div>
                    </Link>
                    <div className={`${isSidebarOpen ? 'flex' : 'hidden'} ml-auto -mr-2`}>
                        <MUIButton
                            icon={<RiMenuUnfold2Fill size={12} />}
                            onClick={toggleSidebar}
                        />
                    </div>
                    <div className={`${isSidebarOpen ? 'hidden' : 'flex'} ml-auto -mr-2`}>
                        <MUIButton
                            icon={<RiMenuFold2Fill size={12} />}
                            onClick={toggleSidebar}
                        />
                    </div>
                </div>

                <div className='hidden md:flex items-center gap-2.5 lg:gap-3.5'>
                    <div className='font-oxygen flex items-center justify-between text-sm pl-4 pr-[3.4px] w-[240px] h-[38px] dark:text-[var(--white)] bg-[var(--white)] dark:bg-[var(--accent)] rounded-xl shadow-[2px_2px_16px] dark:shadow-none shadow-[#fcf1f2] z-50' >
                        <input type="text" placeholder='Search Here...' className='ml-2 bg-transparent border-none outline-none' />
                        <FiSearch className=" stroke-[var(--primary)] dark:stroke-[var(--dark)] bg-[var(--secondary)] text-[var(--dark)] dark:bg-[var(--accent-white)] p-[9px] h-[31px] w-[32px] rounded-[10px]  cursor-pointer" />
                    </div>

                    <label className="swap swap-rotate md:-mr-1.5 cursor-pointer text-[var(--dark)]">
                        <input
                            type="checkbox"
                            onChange={toggleTheme}
                            checked={theme === 'dark'}
                        />
                        <FiMoon className="stroke-[var(--primary)] bg-[var(--secondary)] p-[10px] h-[34px] w-[34px] rounded-full swap-off" />
                        <IoSunnyOutline className="stroke-[var(--dark)] bg-[var(--accent-white)] p-[10px] h-[34px] w-[34px] rounded-full swap-on" />
                    </label>

                    <div className='ml-[6px] flex-1'>
                        <DashboardAdmin />
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className='bg-[#ebe9e9] dark:bg-[#292831] flex-1'>
                <section className='w-full flex items-center  transition-all duration-300 ease-in-out'>
                    {/* Sidebar */}
                    <div
                        className={`${isSidebarOpen ? 'lg:w-[288px]' : 'w-0 overflow-hidden'} transition-all duration-300 ease-in-out`}

                    >
                        <DasSidebar isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} />
                    </div>

                    {/* Main Content */}
                    <div
                        className={`${isSidebarOpen ? 'w-full lg:w-[calc(100% - 288px)]' : 'w-full md:px-8 lg:px-12 xl:px-24'} py-8 px-2 sm:px-4 mt-15 flex-1 transition-all duration-400 ease-in-out z-10`}
                    >
                        <Outlet isSidebarOpen={isSidebarOpen} />
                    </div>
                </section>
            </main>
        </section>
    );
};

export default DashboardRoot;
