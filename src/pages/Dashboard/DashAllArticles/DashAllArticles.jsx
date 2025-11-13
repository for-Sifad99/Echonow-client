import React, { useState } from 'react';
import PageHelmet from '../../shared/PageTitle/PageHelmet';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaCrown, FaTrashAlt, FaTimes } from 'react-icons/fa';
import { FiSearch, FiX } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DashAllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [declineModalOpen, setDeclineModalOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const StatusBadge = ({ status }) => {
        const statusStyles = {
            pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
            approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
            declined: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
        };

        return (
            <span className={`text-base font-semibold uppercase px-2 py-1 rounded-full ${statusStyles[status] || statusStyles.pending}`}>
                {status}
            </span>
        );
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['articles', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/all-articles?page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    const { allArticles = [], total = 0, totalPages = 1 } = data || {};

    const handleApprove = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to Approve this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'Cancel'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/api/articles/${id}`, { status: 'approved' });
                    if (res.data.result.modifiedCount > 0) {
                        toast.success("Articles successfully approved!");
                        refetch();
                    }
                };
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to approved article!");
        };
    };

    const handleMakePremium = async (id) => {
        try {
            const res = await axiosSecure.patch(`/api/articles/${id}`, { isPremium: true });
            if (res.data.result.modifiedCount > 0) {
                toast.success("Articles successfully made premium!");
            }
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to make premium!");
        }
    };

    const handleDecline = (article) => {
        setSelectedArticle(article);
        setDeclineModalOpen(true);
    };

    const confirmDecline = async () => {
        try {
            const CleanDeclineReason = declineReason === '' ? null : declineReason;
            const status = declineReason === '' ? 'pending' : 'declined';
            const res = await axiosSecure.patch(`/api/articles/${selectedArticle._id}`, {
                status: status,
                declineReason: CleanDeclineReason,
            });
            setDeclineModalOpen(false);
            if (res.data.result.modifiedCount > 0) {
                toast.success("Articles successfully declined!");
            }
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to decline!");
        };
    };

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to delete this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'Cancel'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/api/articles/${id}`);
                    if (res.data.result.deletedCount > 0) {
                        toast.success("Articles successfully deleted!");
                        refetch();
                    }
                }
            });
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to delete article!");
        };
    };

    const filteredArticles = allArticles.filter((a) =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.authorEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <>
            <PageHelmet
                title="Manage Article"
                description="Approve, decline, or make articles premium from this admin panel."
            />

            <div className="space-y-4">
                <h1 className='flex justify-center sm:justify-start text-3xl sm:text-4xl md:text-5xl text-[var(--dark)] dark:text-[var(--white)] font-oxygen font-semibold leading-tight mb-6'>
                    All Articles
                </h1>

               {/* Search Box */}
                <div className="w-full">
                    <div
                        className='font-oxygen flex items-center text-sm px-2 sm:px-3 w-full sm:w-[400px] md:w-[450px] h-11 sm:h-12 text-[var(--dark)] dark:text-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] border-2 border-gray-100 dark:border-gray-600 rounded-xl relative transition-all duration-300 focus-within:ring-2 focus-within:ring-[var(--primary)]'
                    >
                        <input
                            type="text"
                            placeholder="Search by title, author name or email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='ml-2 bg-transparent border-none outline-none w-full text-sm sm:text-base'
                        />

                        {searchTerm ? (
                            <FiX
                                onClick={() => setSearchTerm('')}
                                className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer"
                            />
                        ) :
                            <FiSearch className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer" />
                        }
                    </div>
                </div>

                {/* Table */}
                {isLoading ? (
                    <div className="overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)] shadow-md">
                        <Skeleton count={8} height={40} />
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)] shadow-md">
                        <table className="table w-full border-separate border-spacing-0 min-w-[800px] md:min-w-full">
                            <thead>
                                <tr className="font-oxygen bg-[var(--accent-white)] dark:bg-gray-700 text-xs sm:text-sm">
                                    <th className="p-3 text-left font-semibold rounded-tl-lg">Index</th>
                                    <th className="p-3 text-left font-semibold">Image</th>
                                    <th className="p-3 text-left font-semibold">Title</th>
                                    <th className="p-3 text-left font-semibold">Author</th>
                                    <th className="p-3 text-left font-semibold">Status</th>
                                    <th className="p-3 text-left font-semibold">Premium</th>
                                    <th className="p-3 text-center font-semibold rounded-tr-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="font-jost">
                                {filteredArticles.map((article, index) => (
                                    <tr key={article._id} className="hover:bg-slate-50 dark:hover:bg-[#33333d] border-b border-gray-200 dark:border-gray-600 last:border-b-0 transition-all duration-300">
                                        <td className="p-3 text-xs sm:text-sm font-medium">
                                            {(page - 1) * limit + index + 1}
                                        </td>

                                        <td className="p-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-9 h-9">
                                                    <img
                                                        src={article.image}
                                                        alt="Article"
                                                        className="object-cover blur-sm rounded-md"
                                                        onLoad={(e) => e.target.classList.remove('blur-sm')}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3 text-xs sm:text-sm max-w-[100px] sm:max-w-xs font-medium line-clamp-1">
                                            {article.title}
                                        </td>

                                        <td className="p-3 text-xs sm:text-sm">
                                            <p className="font-medium truncate">{article.authorName}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{article.authorEmail}</p>
                                        </td>

                                        <td className="p-3">
                                            <StatusBadge status={article.status} />
                                        </td>

                                        <td className="p-3">
                                            {article.isPremium ? (
                                                <span className="flex items-center text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-semibold">
                                                    <FaCrown className="mr-1 text-xs" /> Yes
                                                </span>
                                            ) : (
                                                <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">No</span>
                                            )}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center items-center gap-1">
                                                {article.status === 'pending' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(article._id)}
                                                            className="btn btn-xs p-1 bg-green-500 text-white hover:bg-green-600 rounded-md border-none"
                                                        >
                                                            <FaCheck className="text-xs" />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDecline(article)}
                                                            className="btn btn-xs p-1 bg-red-500 text-white hover:bg-red-600 rounded-md border-none"
                                                        >
                                                            <FaTimes className="text-xs" />
                                                        </button>
                                                    </>
                                                ) : article.status === 'approved' ? (
                                                    <>
                                                        {!article.isPremium && (
                                                            <button
                                                                onClick={() => handleMakePremium(article._id)}
                                                                className="btn btn-xs p-1 bg-amber-500 text-white hover:bg-amber-600 rounded-md border-none"
                                                            >
                                                                <FaCrown className="text-xs" />
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => setSelectedArticle(article)}
                                                            className="btn btn-xs p-1 bg-[var(--primary)] text-white hover:bg-[#d33] rounded-md border-none"
                                                        >
                                                            <AiOutlineInfoCircle className="text-xs" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => setSelectedArticle(article)}
                                                        className="btn btn-xs p-1 bg-[var(--primary)] text-white hover:bg-[#d33] rounded-md border-none"
                                                    >
                                                        <AiOutlineInfoCircle className="text-xs" />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDelete(article._id)}
                                                    className="btn btn-xs p-1 bg-red-500 text-white hover:bg-red-600 rounded-md border-none"
                                                >
                                                    <FaTrashAlt className="text-xs" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredArticles.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-sm sm:text-base rounded-b-lg">
                                            No articles found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {!isLoading && allArticles.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} articles
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePrevPage}
                                disabled={page === 1}
                                className={`px-4 py-2 rounded-lg text-sm ${page === 1 ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-[var(--primary)] hover:bg-[#d33] text-white'}`}
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                                className={`px-4 py-2 rounded-lg text-sm ${page === totalPages ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-[var(--primary)] hover:bg-[#d33] text-white'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Decline Modal */}
                <Dialog open={declineModalOpen} onClose={() => setDeclineModalOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle className="text-lg sm:text-xl">Decline Article</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Decline Reason (Optional)"
                            type="text"
                            fullWidth
                            multiline
                            rows={3}
                            value={declineReason}
                            onChange={(e) => setDeclineReason(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    </DialogContent>
                    <DialogActions className="px-4 pb-4">
                        <Button onClick={() => setDeclineModalOpen(false)} color="primary" size="small">
                            Cancel
                        </Button>
                        <Button onClick={confirmDecline} color="primary" variant="contained" size="small">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Article Details Modal with Soft Blur Background */}
                {selectedArticle && !declineModalOpen && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center z-[999999] p-3">
                        <div className="bg-white dark:bg-[var(--dark-secondary)] p-5 sm:p-6 rounded-2xl shadow-lg w-[95%] max-w-[90%] sm:max-w-lg md:max-w-xl space-y-4 relative text-[var(--dark)] dark:text-[var(--white)] max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl sm:text-2xl font-bold font-oxygen">
                                    Article Details
                                </h2>
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className="text-lg sm:text-xl px-3 bg-[var(--primary)] text-white hover:bg-[#d33] rounded-full transition-all duration-300"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="font-jost text-xs sm:text-sm">
                                <img
                                    src={selectedArticle.image}
                                    alt="Article"
                                    className="w-full h-36 sm:h-48 object-cover rounded-lg mb-4 blur-sm"
                                    onLoad={(e) => e.target.classList.remove('blur-sm')}
                                />
                                <h3 className="text-lg sm:text-xl font-bold mb-2">{selectedArticle.title}</h3>
                                <p><strong>Author:</strong> {selectedArticle.authorName}</p>
                                <p><strong>Email:</strong> {selectedArticle.authorEmail}</p>
                                <p><strong>Status:</strong> <StatusBadge status={selectedArticle.status} /></p>
                                <p><strong>Premium:</strong> {selectedArticle.isPremium ? "Yes" : "No"}</p>
                                <p><strong>Posted Date:</strong> {new Date(selectedArticle.postedDate).toLocaleString()}</p>
                                <p><strong>Publisher:</strong> {selectedArticle.publisher}</p>
                                <p><strong>Tags:</strong> {selectedArticle.tags?.join(", ")}</p>
                                {selectedArticle.declineReason && (
                                    <p><strong>Decline Reason:</strong> {selectedArticle.declineReason}</p>
                                )}
                                <p className="mt-3"><strong>Description:</strong></p>
                                <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{selectedArticle.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DashAllArticles;
