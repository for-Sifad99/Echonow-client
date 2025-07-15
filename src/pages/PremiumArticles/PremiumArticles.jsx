import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../hooks/useAuth/useAuth'; // must exist for current user context
import Pagination from '../../pages/shared/Pagination/Pagination';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxios';
import toast from 'react-hot-toast';

const PremiumArticles = () => {
    const [page, setPage] = useState(1);
    const limit = 6;
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user: authUser } = useAuth(); 
    const navigate = useNavigate();

    // Get paginated premium articles
    const {
        data: articleData,
        isPending,
        isError,
        error,
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

    // Fetch logged-in user's info (for isPremium)
    const {
        data: dbUser,
        isLoading: userLoading,
    } = useQuery({
        queryKey: ['user-info', authUser?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${authUser?.email}`);
            return res.data;
        },
        enabled: !!authUser?.email,
    });

    const handleNavigate = (article, id) => {
        if (article.isPremium && dbUser?.isPremium) {
            navigate(`/article/${id}`);
        } else if (!article.isPremium) {
            navigate(`/article/${id}`);
        }
        else if (article.isPremium && !dbUser?.isPremium) {
            toast.error('Please get subscription first!')
        }
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 mt-10">
                ❌ Failed to load articles: {error?.message || 'Unknown error'}
            </div>
        );
    }

    return (
        <section className="py-8 px-4 lg:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {isPending || userLoading ? (
                    <p className="text-gray-500 col-span-full text-center text-2xl font-oxygen">
                        LOADING...
                    </p>
                ) : articles.length === 0 ? (
                    <p className="text-xl text-gray-600 col-span-full text-center font-libreBas">
                        No premium articles found.
                    </p>
                ) : (
                    articles.map((article) => {
                        return (
                            <div
                                key={article._id}
                                className={`bg-white rounded-lg border shadow group overflow-hidden relative transition duration-300 hover:shadow-md ${article.isPremium ? 'border-yellow-500' : 'border-gray-200'
                                    }`}
                            >
                                <div className="px-4 pt-4 pb-2 space-y-2">
                                    <h3 className="mt-5 font-jost leading-6 text-lg font-bold text-gray-800 mb-2">
                                        {article.title.length > 60
                                            ? article.title.slice(0, 60) + '...'
                                            : article.title}
                                    </h3>

                                    <div className="w-full h-40 rounded-md overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>

                                    <p className="text-sm text-gray-600 mt-2">
                                        {article.description.length > 80
                                            ? article.description.slice(0, 80) + '...'
                                            : article.description}
                                    </p>

                                    <div className="text-xs text-gray-500 mt-1">
                                        Publisher:{' '}
                                        <span className="font-medium">{article.publisher}</span>
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        Author: {article.authorName}
                                    </div>

                                    <button
                                        onClick={() => handleNavigate(article, article._id)}
                                        className={`block w-full mt-3 text-center px-4 py-2 rounded-md text-sm font-semibold transition duration-700 cursor-pointer ${(article.isPremium && !dbUser?.isPremium)
                                            ? 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-400 cursor-not-allowed text-white transition duration-500'
                                            : `text-white bg-gradient-to-r transition duration-500 ${article.isPremium && dbUser?.isPremium ? 'from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-300' : 'from-red-400 to-red-600 hover:from-red-500 hover:to-red-400'}`
                                            }`}>Details</button>


                                    {article.isPremium && (
                                        <span className="absolute top-4 right-4 bg-yellow-400 text-xs font-bold text-black px-3 py-1 rounded shadow">
                                            Premium
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </div>
        </section>
    );
};

export default PremiumArticles;
