import React from 'react';
import logo from '/logo.png';
import { Link } from 'react-router-dom';

const EchoLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center justify-center gap-1'>
                <img className='w-5 sm:w-6 md:w-9 lg:w-15' src={logo} alt="Echo website logo" />
                <h1 className='text-base sm:text-xl md:text-[28px] lg:text-5xl font-medium font-oxygen'>EchoNow</h1>
            </div>
        </Link>
    );
};

export default EchoLogo;