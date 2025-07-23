// ✅ Extended MyArticles with Edit + Delete Logic (Updated)

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../hooks/useAuth/useAuth';
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

    const { data: articles = [], refetch, isPending, isError, error } = useQuery({
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
        return <p className="text-center text-lg text-gray-500 mt-10">Loading articles...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500 mt-10">Error: {error?.message || 'Something went wrong!'}</p>;
    }

    return (
        <section className="px-4 lg:px-10 py-10 font-jost">
            <h2 className="text-3xl font-bold mb-6 text-center">My Articles</h2>
            <div className="overflow-x-auto text-center">
                <table className="table-auto w-full border-2 border-gray-300 rounded-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border-2 border-gray-300">#</th>
                            <th className="px-4 py-2 border-2 border-gray-300">Title</th>
                            <th className="px-4 py-2 border-2 border-gray-300">Details</th>
                            <th className="px-4 py-2 border-2 border-gray-300">Status</th>
                            <th className="px-4 py-2 border-2 border-gray-300">isPremium</th>
                            <th className="px-4 py-2 border-2 border-gray-300">Update</th>
                            <th className="px-4 py-2 border-2 border-gray-300">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr key={article._id} className="border-t-2 border-gray-300">
                                <td className="px-4 py-2 border-2 border-gray-300">{index + 1}</td>
                                <td className="px-4 py-2 border-2 border-gray-300 text-start">{article.title}</td>
                                <td className="px-4 py-2 border-2 border-gray-300">
                                    <Link to={`/article/${article._id}`} className="text-blue-500 hover:underline">View</Link>
                                </td>
                                <td className="px-4 py-2 border-2 border-gray-300">
                                    {article.status === 'approved' && <span className="text-green-600 font-medium">Approved</span>}
                                    {article.status === 'pending' && <span className="text-yellow-600 font-medium">Pending</span>}
                                    {article.status === 'declined' && (
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-red-600 font-medium">Declined</span>
                                            <button onClick={() => openReasonModal(article.declineReason)} className="text-xs text-red-500 underline">See Reason</button>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-2 border-2 border-gray-300 font-semibold">{article.isPremium ? 'Yes' : 'No'}</td>
                                <td className="px-4 py-2 border-2 border-gray-300">
                                    <button onClick={() => openEditModal(article)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">Edit</button>
                                </td>
                                <td className="px-4 py-2 border-2 border-gray-300">
                                    <button onClick={() => handleDelete(article._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                                <button type="button" onClick={closeEditModal} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyArticles;