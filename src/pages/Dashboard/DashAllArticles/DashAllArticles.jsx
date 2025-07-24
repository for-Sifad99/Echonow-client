import React, { useState } from 'react';
import SubLoader from '../../shared/Loader/SubLoader';
import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaCrown, FaTrashAlt, FaTimes } from 'react-icons/fa';
import { FiSearch, FiX } from "react-icons/fi";
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const DashAllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [declineModalOpen, setDeclineModalOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState('');

    const { data: articles = [], isLoading, refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-articles');
            return res.data.allArticles;

        },
    });

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
                    const res = await axiosSecure.patch(`/articles/${id}`, { isApproved: true, status: 'approved' });

                    if (res.data.result.modifiedCount > 0) {
                        toast.success("Articles successfully approved!");
                    }
                };
            });

            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to approved article!");
        };
    };

    const handleMakePremium = async (id) => {
        try {
            const res = await axiosSecure.patch(`/articles/${id}`, { isPremium: true });
            if (res.data.result.modifiedCount > 0) {
                toast.success("Articles successfully approved!");
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
            const res = await axiosSecure.patch(`/articles/${selectedArticle._id}`, {
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
                    const res = await axiosSecure.delete(`/articles/${id}`);

                    console.log(res.data)
                    if (res.data.result.deletedCount > 0) {
                        toast.success("Articles successfully deleted!");
                    }
                }
            })

            refetch();
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to delete article!");
        };
    };

    const filteredArticles = articles.filter((a) =>
        a.authorName.toLowerCase().includes(searchName.toLowerCase()) &&
        a.authorEmail.toLowerCase().includes(searchEmail.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <h1 className='flex justify-center sm:justify-start text-4xl sm:text-5xl text-[var(--dark)] dark:text-[var(--white)] font-oxygen font-semibold leading-11 mb-6'>All Articles (Admin)</h1>

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
                <div className="flex items-center justify-center mx-auto my-10">
                    <div className="md:hidden">
                        <SubLoader size="text-xl" />
                    </div>
                    <div className="hidden md:block xl:hidden">
                        <SubLoader size="text-2xl" />
                    </div>
                    <div className="hidden xl:block">
                        <SubLoader size="text-3xl" />
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)]">
                    <table className="table w-full">
                        <thead>
                            <tr className="font-oxygen bg-[var(--accent-white)] (--dark-secondary)] dark:text-[var(--white)] dark:bg-gray-700">
                                <th>Image</th>
                                <th>Title</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Posted</th>
                                <th>Status</th>
                                <th>Publisher</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='font-jost'>
                            {filteredArticles.map(article => (
                                <tr key={article._id} className="hover:bg-slate-50 dark:hover:bg-[#33333d] rounded-md">
                                    <td className='rounded-md'>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-7 h-7 md:w-10 md:h-10">
                                                <img src={article.authorPhoto} alt="articles" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-xs md:text-sm lg:text-xs xl:text-sm">
                                        <p className="lg:hidden leading-3">{article.title.slice(0, 10)} ...</p>
                                        <p className="hidden lg:block xl:hidden leading-3">{article.title.slice(0, 12)}...</p>
                                        <p className="hidden xl:block 2xl:hidden leading-3">{article.title.slice(0, 30)}...</p>
                                        <p className="hidden 2xl:block">{article.title}</p>
                                    </td>
                                    <td>{article.authorName}</td>
                                    <td className='text-xs xl:text-sm'>
                                        <p className="xl:hidden">{article.authorEmail.slice(0, 10)}...</p>
                                        <p className="hidden xl:block">{article.authorEmail}</p></td>
                                    <td className='text-xs'>{new Date(article.postedDate).toLocaleDateString()}</td>
                                    <td className='text-[#009264]  dark:text-[#00bf83] font-bold'>{article.status}</td>
                                    <td>{article.publisher}</td>
                                    <td className='rounded-md'>
                                        {
                                            article.status === 'approved' ?
                                                <div className="flex justify-center items-center gap-1">
                                                    <div className="tooltip" data-tip="Make Premium">
                                                        <button onClick={() => handleMakePremium(article._id)} className="btn btn-xs bg-[#8884d8] text-[var(--white)] hover:hover:bg-[#ebe9e9]  hover:text-[#8884d8] transition duration-500  border-none shadow-none"><FaCrown /></button>
                                                    </div>
                                                    <div className="tooltip" data-tip="Delete">
                                                        <button onClick={() => handleDelete(article._id)} className="btn btn-xs bg-[var(--primary)]  text-[var(--white)] hover:hover:bg-[#ebe9e9]  hover:text-[var(--primary)] transition duration-500  border-none shadow-none"><FaTrashAlt /></button>
                                                    </div>
                                                </div> :
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="flex items-center gap-1">
                                                        <div className="tooltip" data-tip="Approve">
                                                            <button onClick={() => handleApprove(article._id)} className="btn btn-xs bg-[#00bf83]  text-[var(--white)] hover:hover:bg-[#ebe9e9]  hover:text-[#00bf83] transition duration-500 border-none shadow-none"><FaCheck /></button>
                                                        </div>
                                                        <div className="tooltip" data-tip="Decline">
                                                            <button disabled={article.status === 'declined'} onClick={() => handleDecline(article)} className="btn btn-xs bg-[#FFBB28] text-[var(--white)] hover:bg-[#ebe9e9]  hover:text-[#FFBB28] transition duration-500  border-none shadow-none "><FaTimes />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <div className="tooltip" data-tip="Make Premium">
                                                            <button onClick={() => handleMakePremium(article._id)} className="btn btn-xs bg-[#8884d8] text-[var(--white)] hover:bg-[#ebe9e9]  hover:text-[#8884d8] transition duration-500  border-none shadow-none"><FaCrown /></button>
                                                        </div>
                                                        <div className="tooltip" data-tip="Delete">
                                                            <button onClick={() => handleDelete(article._id)} className="btn btn-xs bg-[var(--primary)]  text-[var(--white)] hover:bg-[#ebe9e9]  hover:text-[var(--primary)] transition duration-500 border-none shadow-none"><FaTrashAlt /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                        }

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Decline Modal */}
            <Dialog open={declineModalOpen} onClose={() => setDeclineModalOpen(false)}>
                <DialogTitle>Decline Article</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Reason for Decline"
                        type="text"
                        fullWidth
                        multiline
                        minRows={3}
                        variant="outlined"
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeclineModalOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDecline} color="error">Decline</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DashAllArticles;
