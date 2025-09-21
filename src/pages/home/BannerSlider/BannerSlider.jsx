import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxios';
import useHandle from '../../../../hooks/useHandle/useHandle';
import SubLoader from '../../shared/Loader/SubLoader';
import { useQuery } from '@tanstack/react-query';
import { FaRegShareSquare } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const BannerSlider = () => {
    const axiosPublic = useAxiosPublic(); 0
    const handleNavigate = useHandle();

    // Fetching all tending articles
    const { data: trendingArticles = [], isLoading } = useQuery({
        queryKey: ['trendingArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/articles/special');
            return res.data?.trending || [];
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
        <div className="relative z-10 px-2 sm:mx-3 py-3 xl:max-w-[1366px] 2xl:max-w-[1728px] xl:mx-auto">

            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={6}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1536: { slidesPerView: 5 },
                }}
            >
                {trendingArticles.map((article, idx) => (
                    <SwiperSlide key={idx}>
                        <div onClick={() => handleNavigate(article, article._id)} className="group relative w-full h-full md:max-w-xs mx-auto overflow-hidden shadow-lg">
                            <img
                                src={article.image}
                                alt="banner"
                                className="h-[100vw] sm:h-96 md:h-80 xl:h-96 w-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center gap-2 p-4 bg-gradient-to-t from-[var(--dark)] via-transparent text-[var(--white)]">
                                <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)]  inline-block">{article.tags}</span>
                                <h3 className="max-w-xs sm:w-full text-center text-lg md:text-sm xl:text-lg font-bold font-libreBas leading-5 md:leading-3.5 xl:leading-5 group-hover:underline">{article.title}</h3>
                                <div className='flex items-center gap-2'>
                                    <p className="text-xs font-jost mt-1 md:mt-0 lg:mt-0">By <span className='opacity-90 font-semibold'>{article.authorName}</span> • <span className="opacity-70"> {new Date(article.postedDate).toDateString()}</span>
                                    </p>
                                    <span className='text-xs opacity-80'> <FaRegShareSquare /></span>
                                </div>
                            </div>

                            {/* isPremium logic */}
                            {article.isPremium &&
                                <div className='absolute top-7 -right-5 group-hover:-right-4 rotate-90 group-hover:rotate-270 transition duration-500'>
                                    <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                                </div>
                            }
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSlider;
