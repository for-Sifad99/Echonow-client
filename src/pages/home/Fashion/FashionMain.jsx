import React from 'react';
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxios";
import useHandle from '../../../../hooks/useHandle/useHandle';
import { useQuery } from "@tanstack/react-query";
import { FaRegShareSquare } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FashionMain = () => {
    const axiosPublic = useAxiosPublic();
    const handleNavigate = useHandle();

    // Fetching all fashion articles
    const { data: fashionArticles = [], isLoading } = useQuery({
        queryKey: ["fashionArticles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/articles", {
                params: {
                    tags: "fashion",
                    limit: 10
                }
            });
            // Return articles from the response
            return res.data?.articles || [];
        },
    });

    // Loading with skeleton
    if (isLoading) {
        return (
            <section className="grid md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {[...Array(4)].map((_, idx) => (
                    <div
                        key={idx}
                        className="group flex flex-col border border-[#e0e0e0] dark:border-[#3f3f3f]"
                    >
                        <Skeleton height={200} />
                        <div className="flex flex-col justify-center items-center text-[var(--dark)] dark:text-[var(--white)] md:mt-3 space-y-2 px-2 pt-2 pb-4">
                            <Skeleton width={80} height={20} />
                            <Skeleton width={200} height={25} />
                            <Skeleton width={250} height={20} count={2} />
                            <div className='mt-1 md:mt-0 lg:mt-1 flex items-center justify-between gap-2 text-xs sm:text-[10px] lg:text-xs font-jost'>
                                <Skeleton width={150} height={15} />
                                <Skeleton circle width={15} height={15} />
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        );
    };

    return (
        <section className="grid md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {fashionArticles.map((article, idx) => (
                <div
                    onClick={() => handleNavigate(article, article._id)}
                    key={idx}
                    className="group flex flex-col border border-[#e0e0e0] dark:border-[#3f3f3f]"
                >
                    {/* Left image with blur effect loader */}
                    <div className='relative'>
                        <div className="relative">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-60 md:h-52 lg:h-60 object-cover blur-sm"
                                onLoad={(e) => e.target.classList.remove('blur-sm')}
                            />
                        </div>
                        {article.isPremium &&
                            <div className='absolute top-6.5 -left-5.5 rotate-270 transition duration-500'>
                                <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                            </div>
                        }
                    </div>

                    {/* Right content */}
                    <div className="flex flex-col justify-center items-center text-[var(--dark)] dark:text-[var(--white)]  md:mt-3 space-y-2 px-2 pt-2 pb-4">
                        <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">
                            {article.tags[0]}
                        </span>

                        <h3 className="text-center text-xl sm:text-base lg:text-xl font-bold font-libreBas leading-6 sm:leading-5 lg:leading-6 group-hover:underline">
                            <span className="md:hidden"> ''{article.title.slice(0, 50)}..''</span>
                            <span className="hidden md:block lg:block"> ''{article.title.slice(0, 30)}..''</span>
                            <span className="hidden ld:block"> ''{article.title}..''</span>
                        </h3>

                        <h4 className="text-center mt-0.5 md:mt-0 lg:mt-0.5 text-xs font-oxygen leading-4 text-[var(--base-200) opacity-70 dark:opacity-90">
                            <span className="md:hidden">{article.description.slice(0, 100)}....</span>
                            <span className="hidden md:block lg:hidden">{article.description.slice(0, 60)}....</span>
                            <span className="hidden lg:block">{article.description.slice(0, 100)}....</span>
                        </h4>
                        
                        <div className='mt-1 md:mt-0 lg:mt-1 flex items-center justify-between gap-2 text-xs sm:text-[10px] lg:text-xs font-jost'>
                            <p>
                                <span className="opacity-90 dark:opacity-100">By
                                </span>
                                <span className='opacity-70 dark:opacity-90 font-bold dark:font-semibold'> {article.authorName}</span> • <span className="opacity-70"> {new Date(article.postedDate).toDateString()}
                                </span>
                            </p>
                            <span className='text-xs sm:text-[8px] md:text-[10px] lg:text-xs opacity-50 dark:opacity-80 cursor-pointer'> <FaRegShareSquare /></span>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default FashionMain;