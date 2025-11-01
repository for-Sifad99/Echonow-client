import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxios';
import useHandle from '../../../../hooks/useHandle/useHandle';
import SubLoader from '../../shared/Loader/SubLoader';
import { useQuery } from "@tanstack/react-query";

const AllPublishers = () => {
    const axiosSecure = useAxiosSecure();
    const handleNavigate = useHandle();

    // Fetch publishers using TanStack Query
    const { data = {}, isPending } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/publisher-with-articles');
            return res.data;
        },
    });

    const publishers = data.publishers || [];
    const matchedArticles = data.matchedArticles || [];

    // Pending loader
    if (isPending) {
        return <div className="flex items-center justify-center mx-auto my-10">
            <div className="md:hidden">
                <SubLoader size="text-xl" />
            </div>
            <div className="hidden md:block xl:hidden">
                <SubLoader size="text-2xl" />
            </div>
            <div className="hidden xl:flex">
                <SubLoader size="text-3xl" />
            </div>
        </div>
    };

    return (
        <section className='max-w-[1200px] mx-auto px-2 sm:px-4 py-7 sm:py-9 md:py-11 lg:py-12'>
            {/* Title */}
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
                <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                    <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    <h2 className="text-xl sm:text-3xl font-libreBas font-bold text-[var(--dark)] dark:text-[var(--white)]">
                        All Publishers
                    </h2>
                    <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                </div>
                <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
                    Let's see our all publishers
                </p>
            </div>

            {/* Main content */}
            <div className='grid sm:grid-cols-3 items-center justify-center gap-2 sm:gap-3 lg:gap-4'>
                {publishers.map((pub, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleNavigate(matchedArticles[idx], matchedArticles[idx]._id)}
                            className="group flex flex-col lg:flex-row justify-center items-center py-2 px-2 lg:px-4 md:gap-4 border text-[var(--dark)] dark:text-[var(--white)] border-[#e0e0e0] dark:border-[#3f3f3f]" 
                        >
                            <img
                                src={pub.logo}
                                alt={pub.name}
                                className="w-full sm:h-28 sm:w-28 md:h-30 md:w-30 xl:h-36 xl:w-36 object-cover rounded"
                            />
                            <div className="flex flex-col justify-center items-center lg:items-start lg:mt-3 space-y-1 pb-2 lg:pb-0">
                                <h2 className="mt-3 sm:mt-1 md:-mt-1 lg:mt-2 xl:mt-1 text-3xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold font-jost leading-5 sm:leading-5 lg:leading-5">{pub.name}</h2>
                                <h3
                                    className="flex items-start justify-start mt-5 sm:mt-2 md:mt-3 lg:mt-2 xl:mt-3.5 text-sm sm:text-[13px] xl:text-[16px] font-bold font-libreBas leading-4.5 sm:leading-4 lg:leading-3 xl:leading-4.5 text-center lg:text-start group-hover:underline cursor-pointer">
                                <span className="sm:hidden">
                                    <span className='text-[var(--primary)] dark:text-red-400'>First Post:</span> ''{matchedArticles[idx].title.slice(0, 50)}..''</span>
                                <span className="hidden sm:block lg:hidden">
                                    <span className='text-[var(--primary)] dark:text-red-400'>First Post:</span> ''{matchedArticles[idx].title.slice(0, 38)}..''</span>
                                <span className="hidden lg:block"><span className='text-[var(--primary)] dark:text-red-400'>First Post:</span> ''{matchedArticles[idx].title.slice(0, 20)}..''</span>
                                </h3>
                                <div className='flex mt-0.5 sm:mt-1 lg:-mt-0.5 xl:mt-0 items-center justify-between gap-2 text-xs sm:text-[10px] md:text-[11px] lg:text-[10px] font-jost'>
                                    <p>
                                        <span className="opacity-90 dark:opacity-100">Added At:</span>
                                        <span className="opacity-70"> {new Date(pub.postedDate).toDateString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
        </section>
    );
};

export default AllPublishers;