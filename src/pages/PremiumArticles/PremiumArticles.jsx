import React, { useState } from 'react';
import PageHelmet from '../shared/PageTitle/PageHelmet';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxios';
import useHandle from '../../../hooks/useHandle/useHandle';
import Pagination from '../../pages/shared/Pagination/Pagination';
import CommonSidebar from '../shared/CommonSidebar/CommonSidebar';
import SubLoader from '../shared/Loader/SubLoader';
import { useQuery } from '@tanstack/react-query';
import { FaRegShareSquare } from "react-icons/fa";

const PremiumArticles = () => {
    const [page, setPage] = useState(1);
    const limit = 6;
    const axiosSecure = useAxiosSecure();
    const handleNavigate = useHandle();

    // Get paginated premium articles
    const {
        data: articleData,
        isPending,
    } = useQuery({
        queryKey: ['premium-articles', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/premium?page=${page}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const articles = articleData?.articles || [];
    const totalPages = articleData?.totalPages || 1;

    return (
       <>
            {/* Page Title */}
            <PageHelmet
                title="Premium Articles"
                description="Exclusive premium articles handpicked for our subscribers."
            />

            {/* Content */}
            <section className="max-w-[1200px] mx-auto px-2 sm:px-4 py-4">
                <div className='flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6'>

                    {/* Left Content */}
                    <div className='flex-1'>
                        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                            {isPending ? (
                                <div className="flex items-center justify-center mx-auto my-10">
                                    <div className="md:hidden">
                                        <SubLoader size="text-lg" />
                                    </div>
                                    <div className="hidden md:block xl:hidden">
                                        <SubLoader size="text-xl" />
                                    </div>
                                    <div className="hidden xl:flex">
                                        <SubLoader size="text-2xl" />
                                    </div>
                                </div>
                            ) : articles.length === 0 ? (
                                <p className="my-10 text-xl text-[var(--dark)] dark:text-[var(--white)] col-span-full text-center font-libreBas">No articles found.</p>
                            ) : (
                                            articles.map((article) => (
                                                <div
                                                    onClick={() => handleNavigate(article, article._id)}
                                                    key={articles._id}
                                                    className="group flex flex-col border border-[#e0e0e0] dark:border-[#3f3f3f]"
                                                >
                                                    <div className='relative'>
                                                        <img
                                                            src={article.image}
                                                            alt={article.title}
                                                            className="w-full h-60 md:h-52 lg:h-60 object-cover"
                                                        />

                                                        {article.isPremium &&
                                                            <div className='absolute top-6.5 -left-5.5 rotate-270 transition duration-500'>
                                                                <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                                                            </div>
                                                        }
                                                    </div>

                                                    <div className="flex flex-col justify-center items-center text-[var(--dark)] dark:text-[var(--white)]  md:mt-3 space-y-2 px-2 pt-2 pb-4">
                                                       
                                                        <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">{article.tags}
                                                        </span>

                                                        <h3 className="text-center text-xl sm:text-base lg:text-xl font-bold font-libreBas leading-6 sm:leading-5 lg:leading-6 group-hover:underline">
                                                            <span className="md:hidden"> ''{article.title.slice(0, 50)}..''</span>
                                                            <span className="hidden md:block lg:block"> ''{article.title.slice(0, 30)}..''</span>
                                                            <span className="hidden ld:block"> ''{article.title}..''</span>
                                                        </h3>

                                                        <h4 className="text-center mt-0.5 md:mt-0 lg:mt-0.5 text-xs font-oxygen leading-4 text-[var(--base-200) opacity-70 dark:opacity-90">
                                                            <span className="md:hidden">{article.description.slice(0, 100)}....</span>
                                                            <span className="hidden md:block lg:hidden">{article.description.slice(0, 34)}....</span>
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
                                            ))
                            )}
                        </div>
                    </div>

                    {/* Right sidebar */}
                    {articles.length === 0 ? ' ' :
                        <CommonSidebar />
                    }
                </div>

                {/* Pagination */}
                {articles.length === 0 ? ' ' :
                    <div className="mt-10 flex justify-center">
                        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                    </div>
                }
            </section>
       </>
    );
};

export default PremiumArticles;
