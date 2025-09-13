import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxios';
import useHandle from '../../../../hooks/useHandle/useHandle';
import SubLoader from '../Loader/SubLoader';
import { useQuery } from '@tanstack/react-query';

const SideArticle = ({ closeSidebar }) => {
    const axiosPublic = useAxiosPublic();
    const handleNavigate = useHandle();

    // Fetching hit articles
    const { data: hotArticles = [], isPending } = useQuery({
        queryKey: ['hotArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/articles/special');
            return res.data.hot
        }
    });

    // Pending loader
    if (isPending) {
        return <div className="flex items-center justify-center mx-auto my-6">
            <SubLoader size="text-base" />
        </div>
    };

    return (
        <div className="pb-6">
            {/* Title */}
            <h2 className="text-xl font-libreBas text-[var(--dark] dark:text-[var(--white)] font-semibold mb-3">Trending Articles</h2>

            {/* Big article */}
            {hotArticles.slice(0, 1).map(article => (
                <div
                    onClick={() => { handleNavigate(article, article._id), closeSidebar() }}
                    key={article._id}
                    className="group relative flex flex-col gap-2 w-full h-44 transition mb-10"
                >
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full min-h-36 max-h-36 object-cover"
                    />
                    <div className='flex items-center justify-start w-full'>
                        <span className="font-jost h-[20px] -ml-[27.6px] text-[10px] px-3 py-0.5 uppercase font-semibold bg-[var(--primary)] text-[var(--white)]  rotate-270">
                            {article.tags[0]}
                        </span>
                        <h3 className="-ml-4 group-hover:underline text-sm text-[var(--dark)] dark:text-[var(--white)] font-bold font-libreBas leading-4.5">
                            {article.title}...
                        </h3>
                    </div>

                    {/* isPremium logic */}
                    {article.isPremium &&
                        <div className='absolute top-[27px] -right-[23px] rotate-90 transition duration-500'>
                            <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                        </div>
                    }
                </div>
            ))}

            {/* Four article */}
            {hotArticles.slice(1, 4).map(article => (
                <div
                    onClick={() => { handleNavigate(article, article._id), closeSidebar() }}
                    key={article._id}
                    className="group relative flex items-center gap-2 w-full h-24 text:[var(--dark-bg)] dark:text-[var(--white)] transition"
                >

                    <div className='flex flex-col gap-2'>
                        <span className="font-jost w-fit text-[10px] px-3 py-0.5 uppercase font-semibold bg-[var(--primary)] text-[var(--white)]">
                            {article.tags[0]}
                        </span>
                        <h3 className="group-hover:underline text-[12px] font-bold font-libreBas leading-3.5">
                            {article.title.slice(0, 60)}...
                        </h3>
                    </div>
                    <img
                        src={article.image}
                        alt={article.title}
                        className="min-w-[84px] min-h-[80px] max-h-[80px] object-cover"
                    />

                    {/* isPremium logic */}
                    {article.isPremium &&
                        <div className='absolute top-2 right-1 transition duration-500'>
                            <span className="font-jost px-1 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">
                                P
                            </span>
                        </div>
                    }
                </div>
            ))}
        </div>
    );
};

export default SideArticle;
