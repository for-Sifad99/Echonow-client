import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxios';
import useHandle from '../../../../hooks/useHandle/useHandle';
import { useQuery } from '@tanstack/react-query';
import { FaRegShareSquare } from "react-icons/fa";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BannerSlider = () => {
    const axiosPublic = useAxiosPublic();
    const handleNavigate = useHandle();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine slides to show based on window width
    const getSlidesToShow = () => {
        if (windowWidth < 640) return 1;
        if (windowWidth < 768) return 2;
        if (windowWidth < 1024) return 3;
        return 4;
    };

    // Carousel settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: getSlidesToShow(),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false
    };

    // Fetching all hot articles (special articles)
    const { data: trendingArticles = [], isLoading } = useQuery({
        queryKey: ['trendingArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/articles/banner-trending');
            return res.data?.hot || [];
        }
    });

    // Loading with skeleton
    if (isLoading) {
        return (
            <div className="relative z-0 px-2 sm:mx-3 py-3 xl:max-w-[1366px] 2xl:max-w-[1728px] xl:mx-auto">
                <div className="overflow-hidden">
                    <Slider key={windowWidth} {...settings}>
                        {[...Array(getSlidesToShow())].map((_, idx) => (
                            <div key={idx} className="px-1">
                                <div className="group relative w-full h-full overflow-hidden shadow-lg">
                                    <Skeleton height={300} className="w-full" />
                                    <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center gap-2 p-4 bg-gradient-to-t from-[var(--dark)] via-transparent text-[var(--white)]">
                                        <Skeleton width={80} height={20} />
                                        <Skeleton width={150} height={20} />
                                        <div className='flex items-center gap-2'>
                                            <Skeleton width={120} height={15} />
                                            <span className='text-xs opacity-80'> <FaRegShareSquare /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-0 px-2 sm:mx-3 py-3 xl:max-w-[1366px] 2xl:max-w-[1728px] xl:mx-auto">
            {trendingArticles.length > 0 ? (
                <div className="overflow-hidden">
                    <Slider key={windowWidth} {...settings}>
                        {trendingArticles.map((article, idx) => (
                            <div key={idx} className="px-1">
                                <div onClick={() => handleNavigate(article, article._id)} className="group relative w-full h-full overflow-hidden shadow-lg">
                                    {/* Blur effect loader for image */}
                                    <div className="relative">
                                        <img
                                            src={article.image}
                                            alt="banner"
                                            className="w-full h-[90vw] sm:h-96 md:h-80 xl:h-98 object-cover blur-sm"
                                            onLoad={(e) => e.target.classList.remove('blur-sm')}
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center gap-2 p-4 bg-gradient-to-t from-[var(--dark)] via-transparent text-[var(--white)]">
                                        <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">{article.tags[0]}</span>
                                        <h3 className="max-w-xs w-full text-center text-lg font-bold font-libreBas leading-5 group-hover:underline line-clamp-2">{article.title}</h3>
                                        <div className='flex items-center gap-2'>
                                            <p className="text-xs font-jost mt-1">By <span className='opacity-90 font-semibold'>{article.authorName}</span> • <span className="opacity-70"> {new Date(article.postedDate).toDateString()}</span>
                                            </p>
                                            <span className='text-xs opacity-80'> <FaRegShareSquare /></span>
                                        </div>

                                        {/* isPremium logic */}
                                        {article.isPremium &&
                                            <div className='absolute top-7 -right-5 group-hover:-right-4 rotate-90 group-hover:rotate-270 transition duration-500'>
                                                <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <div className="flex items-center justify-center h-64">
                    <p className="text-lg text-gray-500">No trending articles available</p>
                </div>
            )}
        </div>
    );
};

export default BannerSlider;