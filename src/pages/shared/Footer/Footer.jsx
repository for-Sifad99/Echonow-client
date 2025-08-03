import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxios";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterLine } from "react-icons/ri";
import { AiOutlineYoutube } from "react-icons/ai";
import { SlSocialPintarest } from "react-icons/sl";
import logo from '/logo.png';
import { Link } from "react-router-dom";

const Footer = () => {
    const axiosPublic = useAxiosPublic();

    const { data: articles = [] } = useQuery({
        queryKey: ["allArticles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/articles");
            return res.data.allArticles;
        },
    });

    const images = articles.slice(0, 16).map((article) => article.image);

    return (
        <footer className="bg-[#212227] text-[var(--white)] px-2 sm:px-4 pt-11 sm:pt-13 md:pt-16 mt-8">
            <section className="w-full mx-auto">
                <div className="text-center">

                    <Link to='/'>
                        <div className='flex items-center justify-center gap-1'>
                            <img
                                className='w-7.5 sm:w-9 md:w-12 lg:w-14 xl:w-15 lg:-mb-1 xl:-mb-1.5'
                                src={logo}
                                alt="Echo website logo"
                            />
                            <h1 className='text-xl sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-5xl font-medium font-oxygen'>
                                EchoNow
                            </h1>
                        </div>
                    </Link>

                    <p className="-mt-1 xl:mt-0.5 text-[10px] sm:text-xs tracking-widest text-orange-400">
                        SETTING YOU UP FOR SUCCESS
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-1.5 xl:gap-2 my-2.5 sm:my-4.5 xl:my-5 text-lg">
                        <p className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 xl:h-10 xl:w-10 rounded-full flex items-center justify-center bg-blue-400">
                            <a href="#"><RiTwitterLine /></a>
                        </p>
                        <p className="h-7 w-7 sm:h-8 sm:w-8 md:w-9 md:h-9 xl:h-10 xl:w-10 rounded-full flex items-center justify-center bg-violet-900">
                            <a href="#"><IoLogoInstagram /></a>
                        </p>
                        <p className="h-7 w-7 sm:h-8 sm:w-8 md:w-9 md:h-9 xl:h-10 xl:w-10 rounded-full flex items-center justify-center bg-red-700">
                            <a href="#"><SlSocialPintarest /></a>
                        </p>
                        <p className="h-7 w-7 sm:h-8 sm:w-8 md:w-9 md:h-9 xl:h-10 xl:w-10 rounded-full flex items-center justify-center bg-[var(--primary)]">
                            <a href="#"><AiOutlineYoutube /></a>
                        </p>
                    </div>

                    {/* Nav Links */}
                    <div className="mb-11 sm:mb-13 md:mb-16 text-xs sm:text-sm font-jost font-medium">
                        <a href="#" className="hover:underline border-r-2 pr-2 sm:pr-4 border-[#3f3f3f]">About Us</a>
                        <a href="#" className="hover:underline border-r-2 px-2 sm:px-4 border-[#3f3f3f]">Private policy</a>
                        <a href="#" className="hover:underline pl-4">Forums</a>
                    </div>
                </div>

                {/* Instagram-like Image Grid */}
                <div 
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                className="grid grid-cols-4 sm:grid-cols-8 max-w-[1200px] mx-auto justify-center items-center relative overflow-hidden md:bg-transparent cursor-pointer">
                    {images.map((img, idx) => (
                        <div className="w-full h-16 sm:h-full" key={idx}>
                            <img
                                src={img}
                                alt={`Article ${idx + 1}`}
                                className="w-full h-full sm:min-w-[100px] sm:min-h-[100px] sm:max-w-[100px] sm:max-h-[100px] md:min-w-[118px] md:min-h-[118px] md:max-w-[118px] md:max-h-[118px] lg:min-w-[138px] lg:min-h-[138px] lg:max-w-[138px] lg:max-h-[138px] xl:min-w-[148px] xl:min-h-[148px] xl:max-w-[148px] xl:max-h-[148px] object-cover"
                            />
                        </div>
                    ))}

                    {/* Center Facebook Label */}
                    <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-jost uppercase bg-[var(--white)] text-gray-700 px-4 py-1 rounded-full font-medium shadow-md text-sm flex items-center gap-2">
                        <FaFacebookF />
                        Facebook
                    </div>
                </div>

                {/* Footer bottom text */}
                <div className="text-xs sm:text-sm lg:text-[15px] text-center pt-3.5 sm:pt-6.5 pb-5 sm:pb-8 text-[var(--accent-white)] leading-3 opacity-60">
                    Copyright 2024 EchoNow. All rights reserved powered by
                    <a href="#" className="underline"> echonow-netlify.app</a>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
