import React from 'react';
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxios";
import useHandle from "../../../../hooks/useHandle/useHandle";
import { useQuery } from "@tanstack/react-query";
import { SlSocialPintarest } from "react-icons/sl";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { BiLogoFacebook } from "react-icons/bi";
import { RiTwitterLine } from "react-icons/ri";
import { LiaGithub } from "react-icons/lia";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Social links data
const socialLinks = [
    {
        id: 1,
        icon: <BiLogoFacebook />,
        label: 'Facebook',
        value: 'Likes',
        bg: 'bg-blue-500',
        href: '#'
    },
    {
        id: 2,
        icon: <RiTwitterLine />,
        label: 'Twitter',
        value: 'Followers',
        bg: 'bg-pink-500',
        href: '#'
    },
    {
        id: 3,
        icon: <IoLogoInstagram />,
        label: 'Instagram',
        value: 'Followers',
        bg: 'bg-violet-900',
        href: '#'
    },
    {
        id: 4,
        icon: <AiOutlineYoutube />,
        label: 'Youtube',
        value: 'Subscribes',
        bg: 'bg-[var(--primary)]',
        href: '#'
    },
    {
        id: 5,
        icon: <SlSocialPintarest />,
        label: 'Pintarest',
        value: 'Pin',
        bg: 'bg-red-700',
        href: '#'
    },
    {
        id: 6,
        icon: <LiaGithub />,
        label: 'Github',
        value: 'Stars',
        bg: 'bg-gray-700 dark:bg-gray-900',
        href: '#'
    }
];

const CommonSidebar = () => {
    const axiosPublic = useAxiosPublic();
    const handleNavigate = useHandle();

    // Fetching top fashion data
    const { data: topFashion = [], isLoading } = useQuery({
        queryKey: ["top-fashion"],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/articles/top-fashion");
            return res.data;
        },
    });

    return (
        <aside className="w-full md:w-[260px] lg:w-[350px] xl:w-sm md:sticky top-4 h-fit">
            {/* Social Icons */ }
            <div className="pb-1.5 sm:pb-4 rounded-md">
                <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-1 text-base text-[var(--white)] font-jost">
                    {socialLinks.map((item) => (
                        <div key={item.id} className="group flex items-center justify-between hover:bg-[var(--accent)] dark:hover:bg-[var(--accent-white)] border border-[#e0e0e0] dark:border-[#3f3f3f] py-2 px-3 transition duration-500">
                            <div className="flex items-center gap-2">
                                <p className={`h-7 w-7 rounded-full flex items-center justify-center ${item.bg}`}>
                                    <a href={item.href}>{item.icon}</a>
                                </p>
                                <h3 className="text-xs group-hover:text-[var(--white)] dark:group-hover:text-[var(--dark)] text-[var(--dark)] dark:text-[var(--white)] transition duration-500">{item.label}</h3>
                            </div>
                            <h3 className="text-[11px] group-hover:text-[var(--white)] dark:group-hover:text-[var(--dark)] text-[var(--dark)] dark:text-[var(--white)] opacity-80 dark:opacity-60 transition duration-500">{item.value}</h3>
                        </div>
                    ))}
                </div>
            </div>
   
            {/* Explore More Section */ }
            {isLoading ? (
                <div className="py-1 sm:py-4 rounded-md">
                    {/* Title skeleton */}
                    <Skeleton width={150} height={25} className="mb-3" />
                    
                    {/* Big article skeleton */}
                    <div className="group relative flex flex-col">
                        <Skeleton className="w-full h-60" />
                        <div className="text-[var(--dark)] dark:text-[var(--white)] md:mt-3 space-y-1 sm:space-y-2 py-1 sm:py-3 pr-3 md:p-0 md:pr-3 md:pt-2 md:pb-3 lg:pb-0">
                            <Skeleton width={80} height={20} />
                            <Skeleton width={200} height={25} />
                            <Skeleton width={150} height={20} />
                            <div className='mt-0 xl:mt-2 flex items-center justify-between gap-2'>
                                <Skeleton width={120} height={15} />
                                <Skeleton width={20} height={20} circle={true} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Three articles skeleton */}
                    <div className="sm:py-1.5 mt-4 space-y-3">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="group flex gap-3 w-full h-24 dark:text-[var(--white)] transition">
                                <Skeleton width={84} height={80} />
                                <div className='flex flex-col gap-2 flex-1'>
                                    <div className="flex items-center gap-1">
                                        <Skeleton width={60} height={20} />
                                        <Skeleton width={20} height={20} />
                                    </div>
                                    <Skeleton width={150} height={20} />
                                    <Skeleton width={100} height={15} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {/* Big one article */ }
                    <div className="py-1 sm:py-4 rounded-md">
                        {/* Title */ }
                        <h3 className="text-lg font-bold font-libreBas mb-1 sm:mb-3 text-[var(--dark)] dark:text-[var(--white)]">Explore More</h3>

                        {/* Main content */ }
                        {topFashion.slice(0, 1).map((article, idx) => (
                            <div
                                onClick={() => handleNavigate(article, article._id)}
                                key={idx}
                                className="group relative flex flex-col"
                            >
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-60 object-cover blur-sm transition-all duration-500"
                                    onLoad={(e) => e.target.classList.remove('blur-sm')}
                                    onError={(e) => (e.target.src = '/default-article.png')}
                                />

                                <div className="text-[var(--dark)] dark:text-[var(--white)] md:mt-3 space-y-1 sm:space-y-2 py-1 sm:py-3 pr-3 md:p-0 md:pr-3 md:pt-2 md:pb-3 lg:pb-0">
                                    <span className="font-jost px-3 py-[3px] text-[10px] uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">
                                        Featured
                                    </span>

                                    <h3 className="text-xl sm:text-base xl:text-xl font-bold font-libreBas leading-6 sm:leading-5 lg:leading-6 group-hover:underline">
                                        "{article.title.slice(0, 50)}..."
                                    </h3>

                                    <h4 className="mt-1 sm:mt-4 text-xs font-oxygen leading-4 text-[ar(--base-200)] opacity-70 dark:opacity-90">
                                        {article.description.slice(0, 100)}...
                                    </h4>

                                    <div className='mt-0 xl:mt-2 flex items-center justify-between gap-2 text-xs sm:text-[10px] lg:text-xs font-jost'>
                                        <p>
                                            <span className="opacity-90">By</span> <span className='opacity-70 font-bold dark:font-semibold'>{article.authorName}</span> • <span className="opacity-70"> {new Date(article.postedDate).toDateString()}</span>
                                        </p>
                                        <span className='opacity-60 cursor-pointer'> <FaRegShareSquare /></span>
                                    </div>
                                </div>

                                {/* isPremium logic */ }
                                {article.isPremium && (
                                    <div className='absolute top-[27px] -left-5.5 rotate-270 transition duration-500'>
                                        <span className="font-jost px-3 py-[3px] text-[10px] uppercase font-semibold bg-orange-400 text-[var(--white)] inline-block">Premium</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Three articles */ }
                    <div className="sm:py-1.5">
                        {topFashion.slice(1, 4).map((article, idx) => (
                            <div
                                onClick={() => handleNavigate(article, article._id)}
                                key={idx}
                                className="group flex gap-3 w-full h-24 dark:text-[var(--white)] transition"
                            >
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="min-w-[84px] max-w-[84px] min-h-[80px] max-h-[80px] object-cover rounded blur-sm transition-all duration-500"
                                    onLoad={(e) => e.target.classList.remove('blur-sm')}
                                    onError={(e) => (e.target.src = '/default-article.png')}
                                />

                                <div className='flex flex-col gap-2'>
                                    <div className="flex items-center gap-1">
                                        <span className="font-jost text-[10px] px-3 py-0.5 uppercase font-semibold bg-[var(--primary)] text-[var(--white)]">
                                            Featured
                                        </span>

                                        {article.isPremium && (
                                            <span className="font-jost text-[10px] px-1 py-0.5 uppercase font-semibold bg-orange-400 text-[var(--white)]">P</span>
                                        )}
                                    </div>

                                    <h3 className="mt-1 group-hover:underline text-[13px] sm:text-[15px] md:text-[13px] font-bold font-libreBas leading-3.5 sm:leading-4 md:leading-3.5">
                                        <span className="sm:hidden">
                                            {article.title.slice(0, 35)}...
                                        </span>

                                        <span className="hidden sm:block md:hidden">{article.title}...
                                        </span>

                                        <span className="hidden md:block lg:hidden">{article.title.slice(0, 35)}...
                                        </span>

                                        <span className="hidden lg:block">
                                            {article.title.slice(0, 60)}...
                                        </span>
                                    </h3>
                                    <span className='font-jost text-[10px] sm:text-[13px] md:text[8px] lg:text-[13px] opacity-70'>
                                        {new Date(article.postedDate).toDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </aside>
    );
};

export default CommonSidebar;