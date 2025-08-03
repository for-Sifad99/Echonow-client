import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageHelmet from '../shared/PageTitle/PageHelmet';
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxios";
import CommonSidebar from '../shared/CommonSidebar/CommonSidebar';
import SubLoader from '../shared/Loader/SubLoader';
import { useQuery } from "@tanstack/react-query";
import { BiLogoFacebook } from "react-icons/bi";
import { RiTwitterLine } from "react-icons/ri";
import { IoLogoInstagram, } from "react-icons/io";
import { SlSocialPintarest } from "react-icons/sl";
import { TfiAlarmClock } from "react-icons/tfi";
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GrView } from "react-icons/gr";


const ArticleDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const hasUpdatedView = useRef(false);

    // TanStack v5 syntax: query key and queryFn inside one object
    const {
        data: article,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["article", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/article/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    useEffect(() => {
        if (!id || hasUpdatedView.current) return;

        hasUpdatedView.current = true;

        // Increment view count
        axiosSecure
            .patch(`/article/${id}/views`)
            .then(() => {
                console.log("View count updated successfully");
                refetch();
            })
            .catch(console.error);
    }, [id, axiosSecure, refetch]);

    if (isPending) {
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

    if (isError) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10">
                <p>Error loading article: {error.message}</p>
            </div>
        );
    }

    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title={`${article?.title}`}
                description={article?.description || "Read this engaging article now on EchoNow – the voice of real stories."}
            />

            {/* Content */}
            <section className="flex flex-col lg:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6 w-full max-w-[1366px] mx-auto px-4 sm:px-4 py-10 text-[var(--dark)] dark:text-[var(--white)] ">
                <div className="flex-1">
                    <div className="flex flex-col justify-center gap-2 sm:gap-3">
                        <div className="flex flex-col sm:flex-row text-[10px] sm:text-xs text-gray-500 dark:text-[var(--white)] font-oxygen">
                            <div className="flex items-center">
                                <Link className="text-gray-600 dark:text-[var(--white)] " to='/'>Home </Link>
                                <MdOutlineKeyboardArrowRight />
                                <div className="flex items-center">
                                    {article.tags.map((t, index) => (
                                        <span key={index} className="flex items-center">
                                            <span>{t}</span>
                                            {index !== article.tags.length - 1 && <MdOutlineKeyboardArrowRight />}
                                        </span>
                                    ))}
                                </div>
                                <MdOutlineKeyboardArrowRight />
                            </div>
                            <h3>{article?.title}</h3>
                        </div>

                        <h3 className="font-oxygen">through <a href="#" className="font-bold underline">{article.publisher}</a></h3>
                        <div className="font-jost flex items-center gap-2">
                            {article.tags.map((t, index) => (
                                <span key={index} className="text-[10px] px-3 py-0.5 uppercase font-semibold bg-[var(--primary)] text-[var(--white)]">{t}</span>
                            ))}
                        </div>

                        <h1 className="font-libreBas text-xl leading-6 sm:text-[34px] sm:leading-10 font-bold text-[var(--dark)] dark:text-[var(--white)] ">{article?.title}</h1>

                        <div className="font-oxygen text-sm leading-4.5 sm:text-base sm:leading-6 text-gray-800 dark:text-[var(--white)] dark:opacity-80 whitespace-pre-line">
                            {article?.description}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-0.5 sm:items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 font-jost">
                                <img src="https://i.ibb.co/TxN8kJzG/HPz3fFn.png" className="w-3.5 sm:w-5 rounded-full" alt="" />
                                <h2 className="text-gray-700 dark:text-[var(--white)]  font-semibold -ml-1.5 sm:-ml-2.5">{article.authorName}</h2>
                                <h2 className="flex items-center gap-0.5"><TfiAlarmClock />Posted At: {new Date(article.postedDate).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}</h2>
                                <h3 className="flex items-center gap-0.5"><GrView />{article?.viewCount || 0}</h3>
                            </div>
                            <div className="flex items-center gap-0.5 sm:gap-1.5 font-bold text-base sm:text-xl">
                                <a href="#" className="flex items-center gap-0.5 text-sm font-normal text-[var(--dark) dark:text-[var(--white)] font-jost"><FaRegShareSquare />Share</a>
                                <a href="#" className=" text-blue-600"><BiLogoFacebook /></a>
                                <a href="#" className="text-blue-400"><RiTwitterLine /></a>
                                <a href="#" className="text-pink-500"><IoLogoInstagram /></a>
                                <a href="#" className="text-sm sm:text-base text-[var(--primary)]"><SlSocialPintarest /></a>
                            </div>
                        </div>

                        <div className="relative w-full">
                            <img
                                src={article?.image}
                                alt={article?.title}
                                className="rounded-md mb-6 h-full w- object-contain"
                            />
                            {article.isPremium && (
                                <span className="absolute top-15 -left-8 bg-yellow-400 text-base font-bold text-black px-6 py-1.5 shadow rotate-270">
                                    Premium
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <CommonSidebar />
            </section>
        </>
    );
};

export default ArticleDetails;