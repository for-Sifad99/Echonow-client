import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SubLoader from '../shared/Loader/SubLoader';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../hooks/useAuth/useAuth';
import CommonSidebar from '../shared/CommonSidebar/CommonSidebar';
import Swal from 'sweetalert2';
import Select from 'react-select';
import toast from 'react-hot-toast';

const MyArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedReason, setSelectedReason] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editArticle, setEditArticle] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const { data: articles = [], refetch, isPending } = useQuery({
        queryKey: ['my-articles', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/user?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

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
            }
        }
    };

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

    const closeModal = () => {
        setSelectedReason('');
        setShowModal(false);
    };

    const closeEditModal = () => {
        setEditArticle(null);
        setShowEditModal(false);
    };

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
        <section className="max-w-[1200px] text-[var(--dark)] dark:text-[var(--white)] mx-auto sm:px-4 px-2 py-10 flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6 font-jost">

            {/* left content */}
            {articles.length === 0 ? <p className="flex items-center justify-center mx-auto my-10 text-xl text-[var(--dark)] dark:text-[var(--white)] col-span-full text-center font-libreBas">No articles found.</p> :
                <div className="flex-1 overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)]">

                    <div className="text-center mb-8">
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

                    <table className="table w-full">
                        <thead>
                            <tr className="font-oxygen bg-[var(--accent-white)] (--dark-secondary)] dark:text-[var(--white)] dark:bg-gray-700">
                                <th>#</th>
                                <th>Photo</th>
                                <th>Title</th>
                                <th>Details</th>
                                <th>Status</th>
                                <th>isPrem.</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='font-jost'>
                            {articles.map((article, index) => (
                                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-[#33333d] rounded-md">
                                    <td className='rounded-md font-libreBas font-semibold font-lg'>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-7 h-7 md:w-10 md:h-10">
                                                <img src={article.image} alt="article image" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-xs md:text-sm lg:text-xs xl:text-sm">
                                        <p className="lg:hidden leading-3">{article.title.slice(0, 10)} ...</p>
                                        <p className="hidden lg:block xl:hidden leading-3">{article.title.slice(0, 12)}...</p>
                                        <p className="hidden xl:block 2xl:hidden leading-3">{article.title.slice(0, 30)}...</p>
                                        <p className="hidden 2xl:block">{article.title}</p>
                                    </td>
                                    <td data-tip="Approve" className="tooltip py-5">
                                        <Link to={`/article/${article._id}`} className="text-blue-500 hover:underline">
                                            <button className="btn btn-xs px-4 text-sm  bg-[#00bf83]  text-[var(--dark)] dark:text-[var(--white)] hover:bg-[#ebe9e9] transition duration-500 border-none shadow-none rounded-none">View</button></Link>
                                    </td>
                                    <td className='text-[#009264]  dark:text-[#00bf83] font-bold'>{article.status === 'approved' && <span className="text-green-600 font-medium">Approved</span>}
                                        {article.status === 'pending' && <span className="text-yellow-500 font-medium">Pending</span>}
                                        {article.status === 'declined' && (
                                            <div className="flex flex-col items-center">
                                                <span className="text-red-600 dark:text-red-400 font-semibold">Declined</span>
                                                <button onClick={() => openReasonModal(article.declineReason)} className="text-xs text-red-500 dark:text-red-400 underline cursor-pointer">See Reason</button>
                                            </div>
                                        )}
                                    </td>
                                    <td className='font-bold font-oxygen'>{article.isPremium ? 'Yes' : 'No'}</td>
                                    <td>
                                        <div data-tip="Edit" className="tooltip">
                                            <button onClick={() => openEditModal(article)} className="btn btn-xs px-4 text-sm bg-[#8884d8]  text-[var(--dark)] dark:text-[var(--white)] hover:bg-[#ebe9e9] transition duration-500 border-none shadow-none rounded-none">Edit</button>
                                        </div>
                                    </td>
                                    <td data-tip="Delete" className="tooltip py-5">
                                        <button
                                            onClick={() => handleDelete(article._id)} className="btn btn-xs px-4 text-sm  bg-red-500  text-[var(--dark)] dark:text-[var(--white)] hover:bg-[#ebe9e9] transition duration-500 border-none shadow-none rounded-none">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {/* right content */}
            {articles.length === 0 ? ' ' :
                <CommonSidebar />
            }

            {/* Decline Reason Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-xs bg-black/20 bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-3">Decline Reason</h3>
                        <p className="text-gray-700 mb-4">{selectedReason || 'No reason provided.'}</p>
                        <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
                    </div>
                </div>
            )}


            {/* Edit Article Modal */}
            {showEditModal && (
                <div className="fixed inset-0 backdrop-blur-xs bg-black/20 bg-opacity-40 flex justify-center items-center z-50 overflow-y-auto">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h3 className="text-xl font-semibold mb-4">Edit Article</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input type="text" className="w-full border p-2 rounded" placeholder="Title" value={editArticle.title} onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })} />
                            <input type="text" className="w-full border p-2 rounded" placeholder="Publisher" value={editArticle.publisher} onChange={(e) => setEditArticle({ ...editArticle, publisher: e.target.value })} />
                            <input type="text" className="w-full border p-2 rounded" placeholder="Image URL" value={editArticle.image} onChange={(e) => setEditArticle({ ...editArticle, image: e.target.value })} />
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
                                className="react-select-container"
                            />
                            <textarea className="w-full border p-2 rounded" rows={5} placeholder="Description" value={editArticle.description} onChange={(e) => setEditArticle({ ...editArticle, description: e.target.value })} />
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={closeEditModal} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer duration-300">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[#8884d8]  text-[var(--dark)] hover:bg-[#ebe9e9] cursor-pointer duration-300">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyArticles;