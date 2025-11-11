import React, { useState } from "react";
import PageHelmet from '../shared/PageTitle/PageHelmet';
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxios";
import useHandle from "../../../hooks/useHandle/useHandle";
import Pagination from "../../pages/shared/Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import { FaRegShareSquare } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AllArticles = () => {
    const [search, setSearch] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const [page, setPage] = useState(1);
    const axiosPublic = useAxiosPublic();
    const handleNavigate = useHandle();

    // Fetching publisher and tags form article data
    const { data = [], isPending } = useQuery({
        queryKey: ["articles", { search, tags: selectedTags, publisher: selectedPublisher, page }],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/articles", {
                params: {
                    search,
                    tags: selectedTags.join(","),
                    publisher: selectedPublisher,
                    page,
                    limit: 6,
                },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    const articles = data?.articles || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / 6);

    const tags = [...new Set(articles.map((a) => a.tags).flat())];
    const publishers = [...new Set(articles.map((a) => a.publisher))];

    // Pending loader
    if (isPending) {
        return (
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6 text-[var(--dark)] dark:text-[var(--white)] py-4 px-2 sm:px-4">
                {/* Filter sidebar skeleton */}
                <aside className="md:-mt-1 w-full md:w-[280px] lg:min-w-[290px] h-full space-y-3 sm:space-y-6">
                    <div className="w-full max-w-sm">
                        <Skeleton width={80} height={20} className="mb-2" />
                        <div className="relative mt-1">
                            <Skeleton height={44} />
                        </div>
                    </div>

                    <div className="w-full max-w-sm">
                        <Skeleton width={150} height={20} className="mb-2" />
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} width={100} height={18} />
                            ))}
                            <Skeleton width={60} height={30} className="mt-2" />
                        </div>
                    </div>

                    <div className="w-full max-w-sm">
                        <Skeleton width={120} height={20} className="mb-2" />
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} width={60} height={25} borderRadius={50} />
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main articles section skeleton */}
                <div className="flex flex-col gap-6 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="flex flex-col border border-[#e0e0e0] dark:border-[#3f3f3f]">
                                <Skeleton className="w-full h-60 md:h-52 lg:h-60" />
                                <div className="flex flex-col justify-center items-center md:mt-3 space-y-2 px-2 pt-2 pb-4">
                                    <Skeleton width={80} height={20} />
                                    <Skeleton width={200} height={25} />
                                    <Skeleton width={150} height={20} />
                                    <div className='mt-1 md:mt-0 lg:mt-1 flex items-center justify-between gap-2 w-full'>
                                        <Skeleton width={120} height={15} />
                                        <Skeleton width={20} height={20} circle={true} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination skeleton */}
                    <div className="flex justify-center">
                        <Skeleton width={300} height={40} />
                    </div>
                </div>
            </div>
        );
    };

    // Set content while have no article
    if (articles.length === 0) {
        return <p className="my-10 text-xl text-[var(--dark)] dark:text-[var(--white)] col-span-full text-center font-libreBas">No articles found.</p>
    };

    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title="See All Latest Articles"
                description="Explore all articles on EchoNow – from fashion to tech, entertainment to education, we've got it all covered."
            />

            {/* Content */}
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6 text-[var(--dark)] dark:text-[var(--white)] py-4 px-2 sm:px-4">
                {/* Filter sidebar */}
                {
                    articles.length === 0 ? ' ' :
                        <aside className="md:-mt-1 w-full md:w-[280px] lg:min-w-[290px] h-full space-y-3 sm:space-y-6">
                            <div className="w-full max-w-sm">
                                <label className="font-semibold font-oxygen text-xl">Search</label>
                                <div className="relative mt-1">
                                    <div className='font-oxygen flex items-center bg-[var(--accent-white)] dark:bg-[var(--accent)] justify-between text-sm pl-4 pr-1 w-full h-11 rounded-xl z-50' >
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                setPage(1);
                                            }}
                                            placeholder="Search by title..."
                                            className='ml-2 dark:text-[var(--white)] bg-[var(--accent-white)] dark:bg-[var(--accent)] border-none outline-none' />
                                        <FiSearch className="stroke-[var(--primary)] dark:stroke-[var(--dark)] bg-[var(--secondary)] text-[var(--dark)] dark:bg-[var(--white)] p-[11px] h-[37px] w-[37px] rounded-xl cursor-pointer" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full max-w-sm">
                                <h4 className="font-semibold font-oxygen text-xl sm:mb-2">Filter by Publisher</h4>
                                <div className="sm:space-y-[1px]">
                                    {publishers.map((pub) => (
                                        <div key={pub}>
                                            <label className="flex items-center -mb-1  sm:mb-0 gap-2 font-jost">
                                                <input
                                                    type="radio"
                                                    name="publisher"
                                                    value={pub}
                                                    checked={selectedPublisher === pub}
                                                    onChange={() => {
                                                        setSelectedPublisher(pub);
                                                        setPage(1);
                                                    }}
                                                />
                                                {pub}
                                            </label>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            setSelectedPublisher("");
                                            setPage(1);
                                        }}
                                        className="text-sm py-1 px-8 w-fit bg-[var(--primary)] dark:bg-red-500 text-[var(--white)] mt-2 cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>

                            <div className="w-full max-w-sm">
                                <h4 className="font-semibold font-oxygen text-xl mb-0.5 sm:mb-2">Filter by Tags</h4>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {tags.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => {
                                                setSelectedTags((prev) =>
                                                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                                                );
                                                setPage(1);
                                            }}
                                            className={`px-3 py-1 rounded-full font-jost text-sm ${selectedTags.includes(tag)
                                                ? "bg-[var(--primary)] text-[var(--white)]"
                                                : "border border-[#e0e0e0] dark:border-[#3f3f3f]"
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>
                }

                {/* Main articles section */}
                <div className="flex flex-col gap-6 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                        {
                            articles.map((article) => (
                                <div
                                    onClick={() => handleNavigate(article, article._id)}
                                    key={article._id}
                                    className="group flex flex-col border border-[#e0e0e0] dark:border-[#3f3f3f]"
                                >
                                    <div className='relative'>
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-60 md:h-52 lg:h-60 object-cover blur-sm transition-all duration-500"
                                            onLoad={(e) => e.target.classList.remove('blur-sm')}
                                            onError={(e) => (e.target.src = '/default-article.png')}
                                        />
                                        {article.isPremium &&
                                            <div className='absolute top-6.5 -left-5.5 rotate-270 transition duration-500'>
                                                <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                                            </div>
                                        }
                                    </div>

                                    <div className="flex flex-col justify-center items-center text-[var(--dark)] dark:text-[var(--white)]  md:mt-3 space-y-2 px-2 pt-2 pb-4">
                                        <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">{article.tags}</span>
                                        <h3 className="text-center text-xl sm:text-base lg:text-xl font-bold font-libreBas leading-6 sm:leading-5 lg:leading-6 group-hover:underline">
                                            <span className="md:hidden"> ''{article.title.slice(0, 50)}..''</span>
                                            <span className="hidden md:block lg:block"> ''{article.title.slice(0, 30)}..''</span>
                                            <span className="hidden ld:block"> ''{article.title}..''</span>
                                        </h3>

                                        <h4 className="text-center mt-0.5 md:mt-0 lg:mt-0.5 text-xs font-oxygen leading-4 text-[var(--base-200) opacity-70 dark:opacity-90">
                                            <span className="md:hidden">{article.description.slice(0, 100)}....</span>
                                            <span className="hidden md:block lg:hidden">{article.description.slice(0, 34)}....</span>
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
                            ))
                        }
                    </div>

                    {/* Pagination content */}
                    {articles.length === 0 ? ' ' :
                        <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
                </div>
            </div>
        </>
    );
};

export default AllArticles;