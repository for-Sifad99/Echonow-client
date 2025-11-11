import React, { useEffect, useState, useRef } from 'react';
import { Helix } from 'ldrs/react';
import 'ldrs/react/Helix.css';

const Loader = ({ speed = 2.5, minDisplayTime = 3000 }) => {
    const [size, setSize] = useState(45);
    const [isVisible, setIsVisible] = useState(true);
    const startTimeRef = useRef(Date.now());

    // Responsive logic in useEffect
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1536) {
                setSize(80);
            } else if (window.innerWidth >= 1024) {
                setSize(70);
            } else if (window.innerWidth >= 768) {
                setSize(65);
            } else if (window.innerWidth >= 640) {
                setSize(60);
            } else {
                setSize(45);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ensure minimum display time
    useEffect(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, remainingTime);

        return () => clearTimeout(timer);
    }, [minDisplayTime]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[var(--white)] dark:bg-[var(--dark2-bg)]">
            <div className='flex flex-col items-center gap-3 sm:gap-2'>
                <Helix size={size} speed={speed} color={'#f22d3a'} />
                <h1 className='text-base sm:text-xl lg:text-2xl text-[var(--dark)] dark:text-[var(--white)] font-medium font-oxygen animate-pulse'>EchoNow</h1>
            </div>
        </div>
    )
}

export default Loader;