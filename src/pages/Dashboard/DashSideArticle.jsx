import React from 'react';
import SubLoader from '../shared/Loader/SubLoader';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GrHomeOption } from "react-icons/gr";
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxios';

const DashSideArticle = () => {
    const axiosPublic = useAxiosPublic();

    const { data: trendingArticles = [], isPending, isError } = useQuery({
        queryKey: ['trendingArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/articles/trending');
            return res.data;
        }
    });

    if (isPending) {
        return <div className="flex items-center justify-center mx-auto my-6">
                <SubLoader size="text-base" />
        </div>
    };
    if (isError) return console.log('Error loading articles!');

    return (
        <div className="pb-6">
            <h2 className="text-xl font-libreBas text-[var(--dark] dark:text-[var(--white)] font-semibold mb-3">Trending Articles</h2>
            {trendingArticles.slice(0, 1).map(article => (
                <Link
                    to={`/article/${article._id}`}
                    key={article._id}
                    className="group flex flex-col gap-2 w-full h-44 transition mb-1.5 bg-[var(--white)] dark:bg-[var(--dark-bg)]"
                >
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full min-h-24 max-h-24 object-cover rounded"
                    />
                    <div className='flex items-center justify-start w-full mt-1'>
                        <span className="font-jost h-[20px] -ml-6 text-[10px] px-3 py-0.5 uppercase font-semibold bg-[var(--primary)] text-[var(--white)]  rotate-270">{article.tags[0]}</span>
                        <h3 className="-ml-4 group-hover:underline text-sm text-[var(--dark)] dark:text-[var(--white)] font-bold font-libreBas leading-4 ">{article.title}...</h3>
                    </div>
                </Link>
            ))}
            {trendingArticles.slice(1, 4).map(article => (
                <Link
                    to={`/article/${article._id}`}
                    key={article._id}
                    className="group flex items-center gap-2 w-full h-24 text:[var(--dark-bg)] dark:text-[var(--white)] bg-[var(--white)] dark:bg-[var(--dark-bg)] transition"
                >

                    <div className='flex flex-col gap-2'>
                        <span className="font-jost w-fit text-[10px] px-3 py-0.5 uppercase font-semibold bg-[var(--primary)] text-[var(--white)]">{article.tags[0]}</span>
                        <h3 className="group-hover:underline text-[11px] font-bold font-libreBas leading-3.5">{article.title.slice(0, 50)}...</h3>
                    </div>
                    <img
                        src={article.image}
                        alt={article.title}
                        className="min-w-[84px] min-h-[82px] max-h-[82px] object-cover rounded"
                    />
                </Link>
            ))}
            <div className='relative w-full h-30 mt-8'>
                <img src="https://i.ibb.co/twng45BL/Screenshot-2025-07-19-025738.png"
                    className='w-full h-full object-cover rounded-xl' alt="" />
                <Link to='/' className='flex items-center justify-center mx-auto cursor-pointer '>
                    <button className='absolute top-[46%] flex items-center gap-1 font-jost w-fit px-3 py-0.5 uppercase font-semibold bg-[var(--primary)] text-[var(--secondary)] rounded'><GrHomeOption className=' fill-[var(--secondary)]'/>Back to Home</button>
               </Link>
            </div>
        </div>
    );
};

export default DashSideArticle;
