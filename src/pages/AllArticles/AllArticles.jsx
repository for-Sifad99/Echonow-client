import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import useAuth from '../../../hooks/useAuth/useAuth';
import Pagination from "../../pages/shared/Pagination/Pagination";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxios";
import toast from "react-hot-toast";

const AllArticles = () => {
    const { user: authUser } = useAuth();
    const [search, setSearch] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const axiosPublic = useAxiosPublic();

    const { data, isPending } = useQuery({
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

    return (
        <div className="w-full py-8 px-4 lg:px-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
                <div>
                    <label className="font-semibold text-gray-800">Search</label>
                    <div className="relative mt-1">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                        <FiSearch className="absolute top-3 right-3 text-gray-500" />
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Filter by Publisher</h4>
                    <div className="space-y-1">
                        {publishers.map((pub) => (
                            <div key={pub}>
                                <label className="flex items-center gap-2">
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
                            className="text-sm text-red-500 underline mt-2"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Filter by Tags</h4>
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
                                className={`px-3 py-1 rounded-full border text-sm ${selectedTags.includes(tag)
                                    ? "bg-[var(--primary)] text-white"
                                    : "text-gray-600 border-gray-300"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Articles Section */}
            <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {isPending ? (
                        <p className="text-gray-500 col-span-full text-center text-2xl font-oxygen">LOADING...</p>
                    ) : articles.length === 0 ? (
                        <p className="text-xl text-gray-600 col-span-full text-center font-libreBas">No articles found.</p>
                    ) : (
                        articles.map((article) => (
                            <div
                                key={article._id}
                                className={`bg-white rounded-lg border shadow group overflow-hidden relative transition duration-300 hover:shadow-md ${article.isPremium ? "border-yellow-500" : "border-gray-200"
                                    }`}
                            >
                                <div className="px-4 pt-4 pb-2 space-y-2">
                                    <h3 className="mt-4 font-jost leading-6 text-lg font-bold text-gray-800 mb-2">
                                        {article.title.length > 60
                                            ? article.title.slice(0, 60) + "..."
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
                                            ? article.description.slice(0, 80) + "..."
                                            : article.description}
                                    </p>

                                    <div className="text-xs text-gray-500 mt-1">
                                        Publisher: <span className="font-medium">{article.publisher}</span>
                                    </div>

                                    <div className="text-xs text-gray-500">Author: {article.authorName}</div>

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
                        ))
                    )}
                </div>

                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </div>
        </div>
    );
};

export default AllArticles;
