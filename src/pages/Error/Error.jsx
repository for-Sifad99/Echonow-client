import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/error404.png';
import SubLoader from '../shared/Loader/SubLoader';
import { useTheme } from '../../../hooks/themeContext/themeContext';

const Forbidden = () => {
    const { theme } = useTheme();
    return (
        <div className="min-h-screen flex flex-col md:flex-row xl:gap-12 items-center justify-center sm:px-4 py-8 bg-[var(--white)] dark:bg-[var(--dark-bg)]">
            {
                theme === 'dark' ?
                    <img
                        src={errorImage}
                        alt="Forbidden Access"
                        className="bg-[var(--dark-bg)] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                    /> :
                    <img
                        src={errorImage}
                        alt="Forbidden Access"
                        className="bg-[var(--white)] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                    />
            }
            <div className='px-4 sm:px-0 flex flex-col sm:items-center md:items-start'>
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-2 mb-2 md:hidden">
                    <SubLoader size="text-3xl" text="404" className='-mb-1.5' />
                    <SubLoader size="text-3xl" text="Not Found" />
                </div>
                <div className="mb-5 md:mb-5 xl:mb-6 hidden md:block">
                    <SubLoader size="text-5xl" text="404" />
                    <SubLoader size="text-5xl" text="Not Found" />
                </div>

                <p className="max-w-lg text-center md:text-start font-jost text-base sm:text-lg md:text-lg lg:text-xl leading-3.5 sm:leading-4.5 lg:leading-5.5 text-[var(--accent)] dark:text-[var(--base-100)] mb-4 md:mb-3">
                    Oops! Seems like this page lost its way in the great internet cosmos. Let’s take you home, safe and sound.
                </p>
                <Link to="/" className="mx-auto sm:mx-0 w-fit text-sm sm:text-base xl:text-xl inline-block bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-[var(--white)] px-4 py-1.5 sm:px-5 sm:py-2 xl:px-7 xl:py-2.5 transition duration-700 cursor-pointer">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;
