import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MUIButton } from '../pages/shared/MUIButton/MUIButton';
import DashboardAdmin from '../pages/Dashboard/DashboardAdmin';
import DasSidebar from '../pages/Dashboard/DasSidebar';
import useTheme from '../../hooks/themeContext';
import logo from '/logo.png';
import { RiMenuUnfold2Fill, RiMenuFold2Fill } from "react-icons/ri";
import { IoSunnyOutline } from "react-icons/io5";
import { FiSearch, FiMoon } from "react-icons/fi";


const DashboardRoot = () => {
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <section className="flex flex-col min-h-screen">
            {/* Header */}
            <header className='relative flex justify-between items-center w-full h-16 px-4 bg-[var(--white)]'>
                <div className="absolute right-0 md:left-[300px] lg:left-[400px] xl:left-[600px] -top-20 z-40 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
                    <div className="mx-auto aspect-1000/600 h-20 w-52 sm:w-96 bg-linear-to-tr from-[var(--primary)] to-[var(--secondary)]" ></div>
                </div>

                <div className='flex items-center w-fit gap-[37px]'>
                    <Link to='/'>
                        <div className='flex items-center mr-auto gap-1'>
                            <img className='w-10 sm:w-11' src={logo} alt="Echo website logo" />
                            <h1 className='text-[27px] sm:text-3xl text-[var(--dark)] font-bold font-jost'>EchoNow</h1>
                        </div>
                    </Link>
                    <div className={`${isSidebarOpen ? 'flex' : 'hidden'} ml-auto`}>
                        <MUIButton
                            radius={'50%'}
                            icon={<RiMenuUnfold2Fill size={14} />}
                            onClick={toggleSidebar}
                        />
                    </div>
                    <div className={`${isSidebarOpen ? 'hidden' : 'flex'} ml-auto`}>
                        <MUIButton
                            radius={'50%'}
                            icon={<RiMenuFold2Fill size={14} />}
                            onClick={toggleSidebar}
                        />
                    </div>
                </div>

                <div className='hidden md:flex items-center gap-2.5 lg:gap-3.5'>
                    <div className='font-oxygen flex items-center justify-between text-sm pl-4 pr-1 w-[240px] h-10 bg-[var(--white)] rounded-xl shadow-[2px_2px_16px] shadow-[#fcf1f2] z-50' >
                        <input type="text" placeholder='Search Here...' className='ml-2 bg-transparent border-none outline-none' />
                        <MUIButton
                            size={'33px'}
                            radius={'30%'}
                            icon={<FiSearch />}
                        />
                    </div>

                    <label className="swap swap-rotate md:-mr-1.5 cursor-pointer text-[var(--dark)]">
                        <input
                            type="checkbox"
                            onChange={toggleTheme}
                            checked={theme === 'dark'}
                        />
                        <FiMoon className="stroke-[var(--primary)] bg-[var(--secondary)] p-[12px] h-10 w-10 rounded-full swap-off" />
                        <IoSunnyOutline className="stroke-[var(--primary)] bg-[var(--secondary)] p-[12px] h-10 w-10 rounded-full swap-on" />
                    </label>

                    <div className='ml-[6px] flex-1'>
                        <DashboardAdmin />
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className='bg-[#ebe9e9] flex-1'>
                <section className='w-full flex items-start justify-start transition-all duration-300 ease-in-out'>
                    {/* Sidebar */}
                    <div
                        className={`${ isSidebarOpen ? 'md:w-[260px]' : 'w-0 overflow-hidden' } transition-all duration-300 ease-in-out`}
                        
                    >
                        <DasSidebar isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} />
                    </div>

                    {/* Main Content */}
                    <div
                        className={`${isSidebarOpen ? 'w-[calc(100% - 260px)]' : 'w-full' } transition-all duration-400 ease-in-out p-4`}
                    >
                        <Outlet />
                    </div>
                </section>
            </main>
        </section>
    );
};

export default DashboardRoot;
