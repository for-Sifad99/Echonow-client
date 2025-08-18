import React from 'react';
import { Link } from 'react-router-dom';
import PageHelmet from '../shared/PageTitle/PageHelmet';
import { useTheme } from '../../../hooks/themeContext/themeContext';
import SubLoader from '../shared/Loader/subLoader';
import forbiddenImage from '../../assets/forbidden.png';

const Forbidden = () => {
    const { theme } = useTheme();

    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title="Access Denied"
                description="You are not authorized to access this page. Please login with the correct role."
            />

            {/* Content */}
            <div className="min-h-screen flex flex-col md:flex-row xl:gap-12 items-center justify-center sm:px-4 py-8 bg-[var(--white)] dark:bg-[var(--dark-bg)]">
                {/* Left Image */}
                {
                    theme === 'dark' ?
                        <img
                            src={forbiddenImage}
                            alt="Forbidden Access"
                            className="bg-[var(--dark-bg)] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                        /> :
                        <img
                            src={forbiddenImage}
                            alt="Forbidden Access"
                            className="bg-[var(--white)] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                        />
                }

                {/* Right content */}
                <div className='px-4 sm:px-0 flex flex-col sm:items-center md:items-start'>
                    <div className="flex flex-col sm:flex-row sm:gap-2 mb-2 md:hidden">
                        <SubLoader size="text-3xl" text="403" className='-mb-1.5' />
                        <SubLoader size="text-3xl" text="Forbidden" />
                    </div>
                    <div className="mb-5 md:mb-6 xl:mb-8 hidden md:block">
                        <SubLoader size="text-5xl" text="403" />
                        <SubLoader size="text-5xl" text="Forbidden" />
                    </div>

                    <p className="font-jost text-base sm:text-lg md:text-base lg:text-xl xl:text-2xl leading-4 text-[var(--accent)] dark:text-[var(--base-100)] mb-4 md:mb-3 lg:mb-4 xl:mb-5">
                        You don’t have permission to access this page.
                    </p>
                    
                    <Link to="/" className="w-fit text-sm sm:text-base xl:text-xl inline-block bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-[var(--white)] px-4 py-1.5 sm:px-5 sm:py-2 xl:px-7 xl:py-2.5 transition duration-700 cursor-pointer">
                        Back to Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Forbidden;
