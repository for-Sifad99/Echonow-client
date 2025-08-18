import React, { useEffect, useState } from 'react'
import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'

const Loader = ({ speed = 2.5 }) => {
    const [size, setSize] = useState(45);

    // Responsive logic in useEffect
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1536) {
                setSize(80);
            }
            if (window.innerWidth >= 1024) {
                setSize(70);
            }
            if (window.innerWidth >= 768) {
                setSize(65);
            }
            else if (window.innerWidth >= 640) {
                setSize(60);
            } else {
                setSize(45);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-red-100 dark:bg-[var(--dark2-bg)]">
            <div className='flex flex-col items-center gap-3 sm:gap-2'>
                <Helix size={size} speed={speed} color={'#f22d3a'} />
                <h1 className='text-base sm:text-xl lg:text-2xl text-[var(--dark)] dark:text-[var(--white)] font-medium font-oxygen'>EchoNow</h1>
            </div>
        </div>
    )
}

export default Loader
