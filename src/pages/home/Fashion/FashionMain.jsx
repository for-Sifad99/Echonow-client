import React from 'react';
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxios";
import useHandle from '../../../../hooks/useHandle/useHandle';
import SubLoader from "../../shared/Loader/SubLoader";
import { useQuery } from "@tanstack/react-query";
import { FaRegShareSquare } from "react-icons/fa";

const FashionMain = () => {
    const axiosPublic = useAxiosPublic();
    const handleNavigate = useHandle();

    // Fetching al fashion articles
    const { data: fashionArticles = [], isLoading } = useQuery({
        queryKey: ["fashionArticles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/articles/special");
            return res.data.fashion;
        },
    });

    // Loading loader
    if (isLoading) {
        return <div className="flex items-center justify-center mx-auto my-10">
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
    };

    return (
        <section className="grid md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {fashionArticles.map((article, idx) => (
                <div
                    onClick={() => handleNavigate(article, article._id)}
                    key={idx}
                    className="group flex flex-col border border-[#e0e0e0] dark:border-[#3f3f3f]"
                >
                    {/* Left image and isPremium logic */}
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

                    {/* Right content */}
                    <div className="flex flex-col justify-center items-center text-[var(--dark)] dark:text-[var(--white)]  md:mt-3 space-y-2 px-2 pt-2 pb-4">
                        <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">
                            {article.tags}
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
