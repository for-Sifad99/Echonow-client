import React from 'react';
import logo from '/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-[#212227] text-[var(--white)] p-10">
            <div>
                <Link to='/'>
                    <img className='w-6 sm:w-10 lg:w-15' src={logo} alt="Echo website logo" />
                </Link>
                <p className="font-bold">
                    EchoNow.
                    <br />
                    Providing reliable news since 1990
                </p>
                <p> © Copyright {new Date().getFullYear()} EchoNow. All rights reserved.</p>

            </div>
        </footer>
    );
};

export default Footer;