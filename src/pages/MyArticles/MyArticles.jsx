import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHelmet from '../shared/PageTitle/PageHelmet';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../hooks/useAuth/useAuth';
import CommonSidebar from '../shared/CommonSidebar/CommonSidebar';
import SubLoader from '../shared/Loader/SubLoader';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedReason, setSelectedReason] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editArticle, setEditArticle] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Fetching logged in user specific articles
    const { data: articles = [], refetch, isPending } = useQuery({
        queryKey: ['my-articles', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/user?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Delete handler
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this article?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/articles/${id}`);
                refetch();
                Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
            } catch (err) {
                Swal.fire('Error!', 'Something went wrong.', err);
            };
        };
    };

    // Open modal handler
    const openReasonModal = (reason) => {
        setSelectedReason(reason);
        setShowModal(true);
    };

    const openEditModal = (article) => {
        setEditArticle({
            ...article,
            tags: article.tags?.map(tag => ({ label: tag, value: tag })) || []
        });
        setShowEditModal(true);
    };

    // Article edit handler
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { _id, ...rest } = editArticle;

        const updatedData = {
            ...rest,
            tags: editArticle.tags.map(tag => tag.value)
        };

        try {
            await axiosSecure.patch(`/articles/${editArticle._id}`, updatedData);
            refetch();
            setShowEditModal(false);
            toast.success('Your article has been updated!');
        } catch (error) {
            Swal.fire('Error!', 'Failed to update article.', error);
        }
    };

    // Close modal handler
    const closeModal = () => {
        setSelectedReason('');
        setShowModal(false);
    };

    const closeEditModal = () => {
        setEditArticle(null);
        setShowEditModal(false);
    };


    // Select custom styles
    const customSelectStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            boxShadow: "none",
            minHeight: 42,
            cursor: "pointer",
            color: "inherit",
            borderRadius: 0,
            outline: "none",
        }),
        input: (base) => ({
            ...base,
            backgroundColor: "transparent",
            color: "inherit",
            margin: 0,
            padding: 0,
            outline: "none",
        }),
        singleValue: (base) => ({
            ...base,
            color: "inherit",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "white",
            color: "inherit",
            borderRadius: 0,
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "#e0e0e0",
            color: "#000",
            borderRadius: 0,
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "#000",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "rgba(255, 85, 85, 0.2)" : "transparent",
            color: "inherit",
            cursor: "pointer",
            outline: "none",
        }),
    };

    // Pending loader
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

    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title="My Articles"
                description="Manage and view all the articles you've published on EchoNow."
            />

            {/* Content */}
            <section className="max-w-[1200px] text-[var(--dark)] dark:text-[var(--white)] mx-auto sm:px-4 px-2 py-4 flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6 font-jost">

                {/* left content */}
                {articles.length === 0 ? <p className="flex items-center justify-center mx-auto my-10 text-xl text-[var(--dark)] dark:text-[var(--white)] col-span-full text-center font-libreBas">No articles found.</p> :
                    <div className="flex-1 overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)]">

                        {/* Title */}
                        <div className="text-center mb-5 sm:mb-6 md:mb-8">
                            <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                                <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                                <h2 className="text-2xl sm:text-3xl font-libreBas font-bold">
                                    My Articles
                                </h2>
                                <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                            </div>
                            <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
                                Let's know our celebrities current situation
                            </p>
                        </div>

                        {/* Main content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                            {
                                articles.map((article) => (
                                    <div
                                        key={article._id}
                                        className="flex flex-col border border-[#e0e0e0] dark:border-[#3f3f3f]"
                                    >
                                        <div className='relative'>
                                            {/* Top image */}
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-60 md:h-52 lg:h-60 object-cover"
                                            />

                                            {/* isPremium logic */}
                                            {article.isPremium &&
                                                <div className='absolute top-6.5 -left-5.5 rotate-270 transition duration-500'>
                                                    <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                                                </div>
                                            }
                                        </div>

                                        {/* Bottom content */}
                                        <div className="flex flex-col justify-center items-center text-[var(--dark)] dark:text-[var(--white)]  md:mt-3 space-y-2 px-2 pt-2 pb-4">
                                            <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[#8884d8]  text-[var(--white)] inline-block">
                                                {article.tags}
                                            </span>
                                            <Link to={`/article/${article._id}`}>
                                                <h3 className="text-center text-xl sm:text-base lg:text-xl font-bold font-libreBas leading-6 sm:leading-5 lg:leading-6 hover:underline">
                                                    <span className="md:hidden"> ''{article.title.slice(0, 50)}..''</span>
                                                    <span className="hidden md:block lg:block"> ''{article.title.slice(0, 30)}..''</span>
                                                    <span className="hidden ld:block"> ''{article.title}..''</span>
                                                </h3>
                                            </Link>

                                            <div className='uppercase text-xs lg:text-sm font-jost text-[#009264]  dark:text-[#00bf83] font-semibold'>{article.status === 'approved' && <span>Approved</span>}
                                                {article.status === 'pending' && <span className="text-yellow-500 font-medium">Pending</span>}
                                                {article.status === 'declined' && (
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-red-600 dark:text-red-400 font-semibold">Declined</span>
                                                        <button onClick={() => openReasonModal(article.declineReason)} className="text-red-500 dark:text-red-400 underline cursor-pointer">See Reason</button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className='flex flex-col gap-2'>
                                                <div className='flex items-center gap-2 py-1'>
                                                    <div data-tip="Edit" className="tooltip">
                                                        <button onClick={() => openEditModal(article)} className="btn btn-xs px-4 text-sm bg-[#00bf83] text-[var(--white)] hover:bg-[#ebe9e9] hover:text-[var(--dark)] transition duration-500 border-none shadow-none rounded-none">Edit</button>
                                                    </div>
                                                    <div data-tip="Delete" className="tooltip">
                                                        <button
                                                            onClick={() => handleDelete(article._id)} className="btn btn-xs px-4 text-sm  bg-red-500 text-[var(--white)] hover:bg-[#ebe9e9] hover:text-[var(--dark)] transition duration-500 border-none shadow-none rounded-none">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }

                {/* right content */}
                {articles.length === 0 ? ' ' :
                    <CommonSidebar />
                }

                {/* Decline Reason Modal */}
                {showModal && (
                    <div className="fixed inset-0 backdrop-blur-xs bg-black/20 bg-opacity-40 flex justify-center items-center z-[999]">
                        <div className="bg-[var(--white)] dark:bg-[var(--dark2-bg)] rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-lg font-semibold mb-3">Decline Reason</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{selectedReason || 'No reason provided.'}</p>
                            <button onClick={closeModal} className="w-full px-4 py-2 text-sm  bg-red-500 text-[var(--white)] hover:bg-[#ebe9e9] hover:text-[var(--dark)] transition duration-500 cursor-pointer">Close</button>
                        </div>
                    </div>
                )}


                {/* Edit Article Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 backdrop-blur-xs bg-black/20 bg-opacity-40 flex justify-center items-center z-[999] overflow-y-auto">
                        <div className="bg-[var(--white)] dark:bg-[var(--dark2-bg)] darkk:text-[var(--dark)] rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">

                            {/* Title */}
                            <h3 className="text-3xl font-semibold mb-2 mt-3 sm:my-3">Edit Article</h3>

                            {/* Form */}
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                {/* Title input */}
                                <input type="text" className="w-full border border-[#ccc] p-2 no-outline" placeholder="Title" value={editArticle.title} onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })} />

                                {/* Publisher input */}
                                <input type="text" className="w-full border border-[#ccc] p-2 no-outline" placeholder="Publisher" value={editArticle.publisher} onChange={(e) => setEditArticle({ ...editArticle, publisher: e.target.value })} />

                                {/* Image input */}
                                <input type="text" className="w-full border border-[#ccc] p-2 no-outline" placeholder="Image URL" value={editArticle.image} onChange={(e) => setEditArticle({ ...editArticle, image: e.target.value })} />

                                {/* Tags select */}
                                <Select
                                    isMulti
                                    options={[
                                        { value: 'fashion', label: 'fashion' },
                                        { value: 'health', label: 'health' },
                                        { value: 'technology', label: 'technology' },
                                        { value: 'lifestyle', label: 'lifestyle' },
                                    ]}
                                    value={editArticle.tags}
                                    onChange={(selectedOptions) => setEditArticle({ ...editArticle, tags: selectedOptions })}
                                    styles={customSelectStyles}
                                    className='text-[var(--dark)] no-outline'
                                />

                                {/* Description textarea */}
                                <textarea className="w-full teaxt-base leading-5 md:leading-5.5 border border-[#ccc] p-2 no-outline" rows={5} placeholder="Description" value={editArticle.description} onChange={(e) => setEditArticle({ ...editArticle, description: e.target.value })} />

                                {/* Actions */}
                                <div className="flex justify-end gap-4">
                                    <button type="button" onClick={closeEditModal} className="px-4 py-2 text-sm  bg-red-500 text-[var(--white)] hover:bg-[#ebe9e9] hover:text-[var(--dark)] transition duration-500 cursor-pointer">Cancel</button>
                                    <button type="submit" className="px-4 py-2 text-sm  bg-[#8884d8] text-[var(--white)] hover:bg-[#ebe9e9] hover:text-[var(--dark)] transition duration-500 cursor-pointer">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default MyArticles;