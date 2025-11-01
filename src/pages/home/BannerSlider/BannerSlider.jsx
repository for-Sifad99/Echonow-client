import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxios';
import useHandle from '../../../../hooks/useHandle/useHandle';
import SubLoader from '../../shared/Loader/SubLoader';
import { useQuery } from '@tanstack/react-query';
import { FaRegShareSquare } from "react-icons/fa";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = () => {
    const axiosPublic = useAxiosPublic();
    const handleNavigate = useHandle();

    // Carousel settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    };

    // Fetching all hot articles (special articles)
    const { data: trendingArticles = [], isLoading } = useQuery({
        queryKey: ['trendingArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/articles/banner-trending');
            return res.data?.hot || [];
        }
    });


    // Loading loader
    if (isLoading) {
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
    }

    return (
        <div className="relative z-0 px-2 sm:mx-3 py-3 xl:max-w-[1366px] 2xl:max-w-[1728px] xl:mx-auto">
            {trendingArticles.length > 0 ? (
                <div className="overflow-hidden">
                    <Slider {...settings}>
                        {trendingArticles.map((article, idx) => (
                            <div key={idx} className="px-1">
                                <div onClick={() => handleNavigate(article, article._id)} className="group relative w-full h-full overflow-hidden shadow-lg">
                                    <img
                                        src={article.image}
                                        alt="banner"
                                        className="w-full h-[90vw] sm:h-96 md:h-80 xl:h-98 object-cover" 
                                    />
                                    <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center gap-2 p-4 bg-gradient-to-t from-[var(--dark)] via-transparent text-[var(--white)]">
                                        <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-primary text-[var(--white)]  inline-block">{article.tags[0]}</span>
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