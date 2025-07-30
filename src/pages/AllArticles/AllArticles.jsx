import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaRegShareSquare } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth/useAuth';
import Pagination from "../../pages/shared/Pagination/Pagination";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxios";
import toast from "react-hot-toast";
import SubLoader from "../shared/Loader/SubLoader";

const AllArticles = () => {
    const { user: authUser } = useAuth();
    const [search, setSearch] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const axiosPublic = useAxiosPublic();

    const { data = [], isPending } = useQuery({
        queryKey: ["articles", { search, tags: selectedTags, publisher: selectedPublisher, page }],
        queryFn: async () => {
            const res = await axiosPublic.get("/articles", {
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

    // Fetch logged-in user's info (for isPremium)
    const {
        data: dbUser,
    } = useQuery({
        queryKey: ['user-info', authUser?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${authUser?.email}`);
            return res.data;
        },
        enabled: !!authUser?.email,
    });

    const { data: topFashion = [], isLoading } = useQuery({
        queryKey: ["top-fashion"],
        queryFn: async () => {
            const res = await axiosPublic.get("/articles/top-fashion");
            return res.data;
        },
    });

    if (isPending)  {
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
    }
    if (articles.length === 0)  {
        return <p className="my-10 text-xl text-[var(--dark)] dark:text-[var(--white)] col-span-full text-center font-libreBas">No articles found.</p>
    }

    const handleNavigate = (article, id) => {
        if (!dbUser) {
            return toast.error('Please get login first!')
        }
        if (article.isPremium && dbUser?.isPremium) {
            navigate(`/article/${id}`);
        } else if (!article.isPremium) {
            navigate(`/article/${id}`);
        }
        else if (article.isPremium && !dbUser?.isPremium) {
            toast.error('Please get subscription first!')
        }
    }

    return (
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6 text-[var(--dark)] dark:text-[var(--white)] py-10 px-2 sm:px-4">
            {/* Filter Sidebar */}
            {
                articles.length === 0 ? ' ' :
                    <aside className="md:-mt-1 w-full md:w-[280px] lg:min-w-[300px] md:sticky md:top-2 h-fit space-y-6">
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
                            <h4 className="font-semibold font-oxygen text-xl mb-2">Filter by Publisher</h4>
                            <div className="space-y-[1px]">
                                {publishers.map((pub) => (
                                    <div key={pub}>
                                        <label className="flex items-center gap-2 font-jost">
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
                            <h4 className="font-semibold font-oxygen text-xl mb-2">Filter by Tags</h4>
                            <div className="flex flex-wrap gap-2">
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

                        {/* Explore More */}
                        {isLoading ? <div className="flex items-center justify-center mx-auto my-6">
                            <div className="md:hidden">
                                <SubLoader size="text-base" />
                            </div>
                            <div className="hidden md:block">
                                <SubLoader size="text-xl" />
                            </div>
                        </div> :
                            <div className="pb-4 rounded-md">
                                <h3 className="text-lg font-bold font-libreBas mb-3 text-[var-(--dark)] dark:text-[var(--white)]">Explore More</h3>

                                {topFashion.slice(0, 1).map((article, idx) => (
                                    <div
                                        onClick={() => handleNavigate(article, article._id)}
                                        key={idx}
                                        className="group relative flex flex-col"
                                    >
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full max-h-72 sm:max-h-96 md:h-44 object-cover"
                                        />
                                        <div className="flex flex-col justify-center items-center md:items-start text-[var(--dark)] dark:text-[var(--white)] md:mt-3 space-y-2 py-3 pr-3 md:p-0 md:pr-3 md:pt-2 md:pb-3 lg:pb-0">
                                            <span className="mt-4 md:mt-0 font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">Featured</span>
                                            <h3 className="mt-2 md:mt-0 text-center md:text-start text-xl sm:text-2xl md:text-base xl:text-lg font-bold font-libreBas leading-6 md:leading-5 lg:leading-5.5 group-hover:underline"> ''{article.title.slice(0, 50)}..''
                                            </h3>
                                            <h4 className="text-center md:text-start mt-1 text-xs sm:text-sm md:text-xs font-oxygen leading-4 text-[var(--base-200) opacity-70 dark:opacity-90">
                                                {article.description.slice(0, 90)}....

                                            </h4>
                                            <div className='mt-2 sm:mt-0 xl:mt-2 flex items-center justify-between gap-2 text-xs sm:text-[10px] lg:text-xs font-jost'>
                                                <p>
                                                    <span className="opacity-90 dark:opacity-90">By</span> <span className='opacity-70 dark:opacity-90 font-bold dark:font-semibold'>{article.authorName}</span> • <span className="opacity-70"> {new Date(article.postedDate).toDateString()}</span>
                                                </p>
                                                <span className='text-xs sm:text-[8px] md:text-[10px] lg:text-xs opacity-60 dark:opacity-80 cursor-pointer'> <FaRegShareSquare /></span>
                                            </div>
                                        </div>
                                        {article.isPremium &&
                                            <div className='absolute top-[27px] -left-5.5 rotate-270 transition duration-500'>
                                                <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                    </aside>
            }

            {/* Articles Section */}
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-4 ld:gap-5 xl:gap-6">
                    {
                        articles.map((article) => (
                            <div
                                onClick={() => handleNavigate(article, article._id)}
                                key={articles._id}
                                className="group flex flex-col border border-[#e0e0e0] dark:border-[#3f3f3f]"
                            >
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

                {articles.length === 0 ? ' ' :
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
            </div>
        </div>
    );
};

export default AllArticles;
