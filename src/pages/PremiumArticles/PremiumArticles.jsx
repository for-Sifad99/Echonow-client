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
            <section className="max-w-[1200px] mx-auto px-2 sm:px-4 py-10">
                <div className='flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6'>

                    {/* Left Content */}
                    <div className='flex-1'>
                        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
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
                                articles.map((article, idx) => {
                                    return (
                                        <div
                                            onClick={() => handleNavigate(article, article._id)}
                                            key={idx}
                                            className="group relative flex flex-col"
                                        >
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full max-h-72 sm:max-h-96 md:h-44 object-cover"
                                            />
                                            <div className="flex flex-col justify-center items-center md:items-start text-[var(--dark)] dark:text-[var(--white)] md:mt-3 space-y-2 py-3 pr-3 md:p-0 md:pr-3 md:pt-2 md:pb-3 lg:pb-0">
                                                <span className="mt-4 md:mt-0 font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">Featured</span>
                                                <h3 className="mt-2 md:mt-0 text-center md:text-start text-xl sm:text-2xl md:text-base xl:text-lg font-bold font-libreBas leading-6 md:leading-5 lg:leading-5.5 group-hover:underline"> ''{article.title.slice(0, 50)}..''
                                                </h3>
                                                <h4 className="text-center md:text-start mt-1 text-xs sm:text-sm md:text-xs font-oxygen leading-4 text-[var(--base-200) opacity-70 dark:opacity-90">
                                                    {article.description.slice(0, 90)}....

                                                </h4>
                                                <div className='mt-2 sm:mt-0 xl:mt-2 flex items-center justify-between gap-2 text-xs sm:text-[10px] lg:text-xs font-jost'>
                                                    <p>
                                                        <span className="opacity-90 dark:opacity-90">By</span> <span className='opacity-70 dark:opacity-90 font-bold dark:font-semibold'>{article.authorName}</span> • <span className="opacity-70"> {new Date(article.postedDate).toDateString()}</span>
                                                    </p>
                                                    <span className='text-xs sm:text-[8px] md:text-[10px] lg:text-xs opacity-60 dark:opacity-80 cursor-pointer'> <FaRegShareSquare /></span>
                                                </div>
                                            </div>
                                            {article.isPremium &&
                                                <div className='absolute top-[27px] -left-5.5 rotate-270 transition duration-500'>
                                                    <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                                                </div>
                                            }
                                        </div>
                                    );
                                })
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
