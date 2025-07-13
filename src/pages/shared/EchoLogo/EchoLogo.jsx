import React from 'react';
import logo from '/logo.png';
import { Link } from 'react-router-dom';

const EchoLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center justify-center gap-1'>
                <img className='w-6 sm:w-10 lg:w-15' src={logo} alt="Echo website logo" />
                <h1 className='sm:text-3xl lg:text-5xl font-light font-oxygen'>EchoNow</h1>
            </div>
        </Link>
    );
};

export default EchoLogo;