import React from 'react';
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxios";
import useHandle from '../../../../hooks/useHandle/useHandle';
import { useQuery } from "@tanstack/react-query";
import { FaRegShareSquare } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Celebrity = () => {
    const axiosPublic = useAxiosPublic();
    const handleNavigate = useHandle();

    // Fetching all celebrity articles
    const { data: celebrityArticles = [], isPending } = useQuery({
        queryKey: ["celebrityArticles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/articles", {
                params: {
                    tags: "celebrity",
                    limit: 10
                }
            });
            // Return articles from the response
            return res.data?.articles || [];
        },
    });

    // Pending Loader with skeleton
    if (isPending) {
        return (
            <div className="max-w-[1200px] text-[var(--dark)] dark:text-[var(--white)] mx-auto sm:px-4 px-2 py-7 sm:py-9 md:py-11 lg:py-12 mt-2 sm:mt-4 md:mt-6 lg:mt-7 xl:mt-8">
                {/* Title */}
                <div className="text-center mb-5 sm:mb-6 md:mb-8">
                    <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                        <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                        <Skeleton width={200} height={30} />
                        <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    </div>
                    <Skeleton width={150} height={20} className="mt-2 mx-auto" />
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                    {[...Array(4)].map((_, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col md:flex-row justify-center md:gap-4 border border-[#e0e0e0] dark:border-[#3f3f3f]"
                        >
                            <Skeleton width={220} height={150} className="md:w-56 md:h-full" />
                            <div className="md:mt-3 space-y-2 p-3 md:p-0 md:pr-3 md:pt-2 md:pb-3 lg:pb-0">
                                <Skeleton width={80} height={20} />
                                <Skeleton width={180} height={25} />
                                <Skeleton width={220} height={20} count={2} />
                                <div className='mt-2 sm:mt-0 xl:mt-2 flex items-center justify-between gap-2 text-xs sm:text-[10px] lg:text-xs font-jost'>
                                    <Skeleton width={150} height={15} />
                                    <Skeleton circle width={15} height={15} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-[1200px] text-[var(--dark)] dark:text-[var(--white)] mx-auto sm:px-4 px-2 py-7 sm:py-9 md:py-11 lg:py-12 mt-2 sm:mt-4 md:mt-6 lg:mt-7 xl:mt-8">
            {/* Title */}
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
                <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                    <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    <h2 className="text-xl sm:text-3xl font-libreBas font-bold">
                        Quick News
                    </h2>
                    <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                </div>
                <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
                    Let's know our celebrities current situation
                </p>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {celebrityArticles?.map((article) => (
                    <div
                        onClick={() => handleNavigate(article, article._id)}
                        key={article._id}
                        className="group relative flex flex-col md:flex-row justify-center md:gap-4 border border-[#e0e0e0] dark:border-[#3f3f3f]"
                    >
                        {/* Left image with blur effect loader - even wider on md screens and no rounded corners */}
                        <div className="relative">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="h-44 w-full sm:h-48 md:w-72 object-cover blur-sm"
                                onLoad={(e) => e.target.classList.remove('blur-sm')}
                            />
                        </div>

                        {/* Right content */}
                        <div className="md:mt-3 space-y-2 p-3 md:p-0 md:pr-3 md:pt-2 md:pb-3 lg:pb-0">
                            <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">
                                {article.tags[0]}
                                
                            </span>

                            <h3 className="text-xl sm:text-base xl:text-xl font-bold font-libreBas leading-6 sm:leading-5 lg:leading-6 group-hover:underline">
                                <span className="sm:hidden"> ''{article.title.slice(0, 50)}..''</span>
                                <span className="hidden sm:block md:hidden"> ''{article.title.slice(0, 50)}..''</span>
                                <span className="hidden md:block lg:hidden"> ''{article.title.slice(0, 30)}..''</span>
                                <span className="hidden lg:block"> ''{article.title.slice(0, 50)}..''</span>
                            </h3>

                            <h4 className="mt-0 lg:mt-4 text-xs font-oxygen leading-4 text-[ar(--base-200) opacity-70 dark:opacity-90">
                                <span className="sm:hidden">{article.description.slice(0, 100)}....</span>
                                <span className="hidden sm:block lg:hidden">{article.description.slice(0, 80)}....</span>
                                <span className="hidden lg:block">{article.description.slice(0, 100)}....</span>
                            </h4>

                            <div className='mt-2 sm:mt-0 xl:mt-2 flex items-center justify-between gap-2 text-xs sm:text-[10px] lg:text-xs font-jost'>
                                <p>
                                    <span className="opacity-90 dark:opacity-100">By</span>
                                    <span className='opacity-70 dark:opacity-90 font-bold dark:font-semibold'>{article.authorName}</span> • <span className="opacity-70"> {new Date(article.postedDate).toDateString()}
                                    </span>
                                </p>
                                <span className='text-xs sm:text-[8px] md:text-[10px] lg:text-xs opacity-60 dark:opacity-80 cursor-pointer'> <FaRegShareSquare /></span>
                            </div>
                        </div>

                        {/* isPremium logic */}
                        {article.isPremium &&
                            <div className='absolute top-7 -right-4.5 md:top-7 md:right-[520px] rotate-270 transition duration-500'>
                                <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Celebrity;