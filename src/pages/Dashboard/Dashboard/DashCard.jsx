import React, { useState } from 'react';
import { FaUsers, FaCrown, FaNewspaper, FaUserTie } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdOutlineShowChart } from "react-icons/md";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxios';

const fetchDashboardStats = async (axiosSecure) => {
    const [userRes, articleRes, publisherRes] = await Promise.all([
        axiosSecure.get('/all-users'),
        axiosSecure.get('/all-articles'),
        axiosSecure.get('/publisher'),
    ]);

    return {
        totalUsers: userRes.data.totalUsers,
        premiumUsers: userRes.data.premiumUsers,
        articleCount: articleRes.data.total,
        publisherCount: publisherRes.data.count,
    };
};

const DashCard = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: () => fetchDashboardStats(axiosSecure),
    });

    const cardData = [
        { title: 'Total Users', total: data?.totalUsers || 0, icon: <FaUsers className="text-4xl" /> },
        { title: 'Premium Users', total: data?.premiumUsers || 0, icon: <FaCrown className="text-4xl" /> },
        { title: 'Total Articles', total: data?.articleCount || 0, icon: <FaNewspaper className="text-4xl" /> },
        { title: 'Total Publishers', total: data?.publisherCount || 0, icon: <FaUserTie className="text-4xl" /> }, // Still static
    ];

    const options = [
        'Every Time', 'Today', 'Yesterday', 'Last Week', 'Last Month'
    ];

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeCardIndex, setActiveCardIndex] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(
        Array(cardData.length).fill('Every Time')
    );

    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setActiveCardIndex(index);
    };

    const handleClose = (option) => {
        if (option && activeCardIndex !== null) {
            const updatedOptions = [...selectedOptions];
            updatedOptions[activeCardIndex] = option;
            setSelectedOptions(updatedOptions);
        }
        setAnchorEl(null);
        setActiveCardIndex(null);
    };

    return (
        <>
            {cardData.map((card, index) => (
                <div
                    key={index}
                    className="relative group flex flex-col items-center justify-center md:justify-between mx-auto bg-linear-to-tr from-[var(--secondary)] to-[var(--white)] hover:from-[#fff0f0] hover:to-[var(--secondary)] dark:from-[var(--color-bg)] dark:to-[#464553] dark:hover:from-[#27272e] dark:hover:to-[#4d4c5c] shadow-md rounded-xl w-full max-w-[440px] h-[150px] xl:max-w-[340px] 2xl:h-[180px] 2xl:max-w-full p-5 transition duration-600"
                >
                    <div className='dark:text-[var(--white)] text-[var(--dark)] font-oxygen w-full flex items-start justify-center'>
                        <div className='mr-auto'>
                            <p className="text-base lg:text-[13px] xl:text-base text-[var(--accent)] dark:text-[var(--accent-white)] font-medium">
                                {card.title}
                            </p>
                            <h2 className="text-3xl lg:text-2xl xl:text-3xl font-bold font-libreBas">
                                {card.total < 10 ? '0' : ' '}{isLoading ? '...' : card.total}
                            </h2>
                        </div>
                        <div className='w-11 h-11 lg:w-9 lg:h-9 xl:w-11 xl:h-11 p-2 opacity-[0.1] bg-linear-to-tl from-gray-400 group-hover:from-gray-600  to-[var(--white)] dark:from-gray-200 dark:group-hover:from-gray-100 dark:to-[var(--color-bg)] rounded-md flex items-center justify-center transition duration-600'>
                            {card.icon}
                        </div>
                    </div>

                    <div className='absolute top-9 left-14 sm:top-6 sm:left-18 md:top-4 md:left-16 lg:top-9 lg:left-6 xl:left-12'>
                        <MdOutlineShowChart className='text-gray-400 opacity-[0.1] group-hover:opacity-[0.2] text-[80px] sm:text-[100px] md:text-[120px] lg:text-[90px] xl:text-[90px] 2xl:text-[120px] transition duration-600' />
                    </div>

                    <div className='relative flex justify-between items-center w-full -mb-2'>
                        <p className="dark:text-[var(--accent-white)] text-[var(--accent)] font-jost dark:font-normal font-semibold opacity-65">
                            {selectedOptions[index]}
                        </p>

                        <div>
                            <IconButton
                                aria-label="more"
                                aria-controls={anchorEl ? 'long-menu' : undefined}
                                aria-haspopup="true"
                                onClick={(e) => handleClick(e, index)}
                                className='dark:stroke-[#f3f4f6]'
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            ))}

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose()}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        selected={selectedOptions[activeCardIndex] === option}
                        onClick={() => handleClose(option)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default DashCard;
