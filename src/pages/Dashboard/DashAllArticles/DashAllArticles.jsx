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
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [declineModalOpen, setDeclineModalOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // 10 articles per page

    // Status badge component
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

    // Fetching all articles info with pagination
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['articles', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/all-articles?page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    const { allArticles = [], total = 0, totalPages = 1 } = data || {};

    // Approve handler
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

    // Make premium handler
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

    // Decline handler
    const handleDecline = (article) => {
        setSelectedArticle(article);
        setDeclineModalOpen(true);
    };

    // Conform decline handler
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

    // Delete handler
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

                    // Removed unnecessary console.log
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
        a.authorName.toLowerCase().includes(searchName.toLowerCase()) &&
        a.authorEmail.toLowerCase().includes(searchEmail.toLowerCase())
    );

    // Pagination handlers
    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title="Manage Article"
                description="Approve, decline, or make articles premium from this admin panel."
            />

            {/* Content */}
            <div className="space-y-4">
                <h1 className='flex justify-center sm:justify-start text-4xl sm:text-5xl text-[var(--dark)] dark:text-[var(--white)] font-oxygen font-semibold leading-11 mb-6'>
                    All Articles
                </h1>

                <div className="w-full max-w-[280px] sm:max-w-4/5 md:max-w-4/7 flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <div
                        className='font-oxygen flex items-center text-sm px-1 w-full h-11 text-[var(--dark)] dark:text-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] border-2 border-gray-100 dark:border-gray-600 rounded-xl relative'
                    >
                        <input
                            type="text"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className='ml-2 bg-transparent border-none outline-none w-full'
                        />

                        {searchName ? (
                            <FiX
                                onClick={() => setSearchName('')}
                                className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer"
                            />
                        ) :
                            <FiSearch className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer" />
                        }
                    </div>

                    <div
                        className='font-oxygen flex items-center text-sm px-1 w-full h-11 text-[var(--dark)] dark:text-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] border-2 border-gray-100 dark:border-gray-600 rounded-xl'
                    >
                        <input
                            type="text"
                            placeholder="Search by Email"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            className='ml-2 bg-transparent border-none outline-none w-full'
                        />

                        {searchEmail ? (
                            <FiX
                                onClick={() => setSearchEmail('')}
                                className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer"
                            />
                        ) :
                            <FiSearch className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer" />
                        }
                    </div>
                </div>

                {isLoading ? (
                    <div className="rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)] shadow-md">
                        <table className="table w-full border-separate border-spacing-0">
                            <thead>
                                <tr className="font-oxygen bg-[var(--accent-white)] dark:bg-gray-700 text-sm">
                                    <th className="p-2 text-left font-semibold rounded-tl-lg">Index</th>
                                    <th className="p-2 text-left font-semibold">Image</th>
                                    <th className="p-2 text-left font-semibold">Title</th>
                                    <th className="p-2 text-left font-semibold">Author</th>
                                    <th className="p-2 text-left font-semibold">Status</th>
                                    <th className="p-2 text-left font-semibold">Premium</th>
                                    <th className="p-2 text-center font-semibold rounded-tr-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="font-jost">
                                {[...Array(5)].map((_, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-slate-50 dark:hover:bg-[#33333d] border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                                    >
                                        <td className="p-2 text-sm font-medium">
                                            <Skeleton width={20} />
                                        </td>
                                        <td className="p-2">
                                            <Skeleton circle width={32} height={32} />
                                        </td>
                                        <td className="p-2 text-sm max-w-xs">
                                            <Skeleton width={100} />
                                        </td>
                                        <td className="p-2">
                                            <div className="text-sm">
                                                <Skeleton width={80} />
                                                <Skeleton width={100} className="mt-1" />
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <Skeleton width={60} height={25} />
                                        </td>
                                        <td className="p-2">
                                            <Skeleton width={40} />
                                        </td>
                                        <td className="p-2">
                                            <div className="flex justify-center items-center gap-1">
                                                <Skeleton circle width={24} height={24} />
                                                <Skeleton circle width={24} height={24} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)] shadow-md">
                        <table className="table w-full border-separate border-spacing-0">
                            <thead>
                                <tr className="font-oxygen bg-[var(--accent-white)] dark:bg-gray-700 text-sm">
                                    <th className="p-2 text-left font-semibold rounded-tl-lg">Index</th>
                                    <th className="p-2 text-left font-semibold">Image</th>
                                    <th className="p-2 text-left font-semibold">Title</th>
                                    <th className="p-2 text-left font-semibold">Author</th>
                                    <th className="p-2 text-left font-semibold">Status</th>
                                    <th className="p-2 text-left font-semibold">Premium</th>
                                    <th className="p-2 text-center font-semibold rounded-tr-lg">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="font-jost">
                                {filteredArticles.map((article, index) => (
                                    <tr
                                        key={article._id}
                                        className="hover:bg-slate-50 dark:hover:bg-[#33333d] border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                                    >
                                        <td className="p-2 text-sm font-medium">
                                            {(page - 1) * limit + index + 1}
                                        </td>

                                        <td className="p-2">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-8 h-8">
                                                    <img 
                                                        src={article.image} 
                                                        alt="Article" 
                                                        className="object-cover blur-sm"
                                                        onLoad={(e) => e.target.classList.remove('blur-sm')}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-2 text-sm max-w-xs">
                                            <span className="font-medium line-clamp-1">{article.title}</span>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-sm">
                                                <p className="font-medium truncate max-w-[100px]">{article.authorName}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-[100px]">{article.authorEmail}</p>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <StatusBadge status={article.status} />
                                        </td>
                                        <td className="p-2">
                                            {article.isPremium ? (
                                                <span className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-semibold">
                                                    <FaCrown className="mr-1 text-xs" /> Yes
                                                </span>
                                            ) : (
                                                <span className="text-gray-500 dark:text-gray-400 text-sm">No</span>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            <div className="flex justify-center items-center gap-1">
                                                {article.status === 'pending' ? (
                                                    <>
                                                        <div className="tooltip" data-tip="Approve">
                                                            <button
                                                                onClick={() => handleApprove(article._id)}
                                                                className="btn btn-xs p-1 bg-green-500 text-[var(--white)] hover:bg-green-600 rounded-md transition duration-300 border-none shadow-sm"
                                                            >
                                                                <FaCheck className="text-sm" />
                                                            </button>
                                                        </div>

                                                        <div className="tooltip" data-tip="Decline">
                                                            <button
                                                                onClick={() => handleDecline(article)}
                                                                className="btn btn-xs p-1 bg-red-500 text-[var(--white)] hover:bg-red-600 rounded-md transition duration-300 border-none shadow-sm"
                                                            >
                                                                <FaTimes className="text-sm" />
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : article.status === 'approved' ? (
                                                    <>
                                                        {!article.isPremium && (
                                                            <div className="tooltip" data-tip="Make Premium">
                                                                <button
                                                                    onClick={() => handleMakePremium(article._id)}
                                                                    className="btn btn-xs p-1 bg-amber-500 text-[var(--white)] hover:bg-amber-600 rounded-md transition duration-300 border-none shadow-sm"
                                                                >
                                                                    <FaCrown className="text-sm" />
                                                                </button>
                                                            </div>
                                                        )}

                                                        <div className="tooltip" data-tip="View Details">
                                                            <button
                                                                onClick={() => setSelectedArticle(article)}
                                                                className="btn btn-xs p-1 bg-[var(--primary)] text-[var(--white)] hover:bg-[#d33] rounded-md transition duration-300 border-none shadow-sm"
                                                            >
                                                                <AiOutlineInfoCircle className="text-sm" />
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="tooltip" data-tip="View Details">
                                                        <button
                                                            onClick={() => setSelectedArticle(article)}
                                                            className="btn btn-xs p-1 bg-[var(--primary)] text-[var(--white)] hover:bg-[#d33] rounded-md transition duration-300 border-none shadow-sm"
                                                        >
                                                            <AiOutlineInfoCircle className="text-sm" />
                                                        </button>
                                                    </div>
                                                )}

                                                <div className="tooltip" data-tip="Delete">
                                                    <button
                                                        onClick={() => handleDelete(article._id)}
                                                        className="btn btn-xs p-1 bg-red-500 text-[var(--white)] hover:bg-red-600 rounded-md transition duration-300 border-none shadow-sm"
                                                    >
                                                        <FaTrashAlt className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredArticles.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-base rounded-b-lg">
                                            No articles found with that search info.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && allArticles.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} articles
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePrevPage}
                                disabled={page === 1}
                                className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-[var(--primary)] hover:bg-[#d33] text-white'}`}
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                                className={`px-4 py-2 rounded-lg ${page === totalPages ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-[var(--primary)] hover:bg-[#d33] text-white'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Decline Modal */}
                <Dialog open={declineModalOpen} onClose={() => setDeclineModalOpen(false)}>
                    <DialogTitle>Decline Article</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Decline Reason (Optional)"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={declineReason}
                            onChange={(e) => setDeclineReason(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeclineModalOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDecline} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Article Details Modal */}
                {selectedArticle && !declineModalOpen && (
                    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-[999999]">
                        <div className="bg-white dark:bg-[var(--dark-secondary)] mt-16 sm:mt-18 p-6 rounded-lg shadow w-[95%] max-w-[280px] sm:max-w-lg space-y-4 relative text-[var(--dark)] dark:text-[var(--white)] max-h-[80vh] sm:max-h-[86vh] overflow-y-auto">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold font-oxygen">
                                    Article Details
                                </h2>
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className="text-lg px-2 bg-[var(--primary)] text-[var(--white)] hover:bg-[#ffe0b3] hover:text-[var(--primary)] rounded-full transition duration-500 border-none shadow-none cursor-pointer"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="font-jost text-xs sm:text-base">
                                <img src={selectedArticle.image} alt="Article" className="w-full h-48 object-cover rounded-lg mb-4 blur-sm" 
                                    onLoad={(e) => e.target.classList.remove('blur-sm')} />
                                <h3 className="text-xl font-bold mb-2">{selectedArticle.title}</h3>
                                <p className="mb-2"><strong>Author:</strong> {selectedArticle.authorName}</p>
                                <p className="mb-2"><strong>Email:</strong> {selectedArticle.authorEmail}</p>
                                <p className="mb-2"><strong>Status:</strong> <StatusBadge status={selectedArticle.status} /></p>
                                <p className="mb-2"><strong>Premium:</strong> {selectedArticle.isPremium ? "Yes" : "No"}</p>
                                <p className="mb-2"><strong>Posted Date:</strong> {new Date(selectedArticle.postedDate).toLocaleString()}</p>
                                <p className="mb-2"><strong>Publisher:</strong> {selectedArticle.publisher}</p>
                                <p className="mb-2"><strong>Tags:</strong> {selectedArticle.tags?.join(", ")}</p>
                                {selectedArticle.declineReason && (
                                    <p className="mb-2"><strong>Decline Reason:</strong> {selectedArticle.declineReason}</p>
                                )}
                                <p className="mt-4"><strong>Description:</strong></p>
                                <p className="text-gray-700 dark:text-gray-300">{selectedArticle.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    );
};

export default DashAllArticles;