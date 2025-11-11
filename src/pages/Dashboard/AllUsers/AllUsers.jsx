import React, { useState } from "react";
import PageHelmet from "../../shared/PageTitle/PageHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineInfoCircle, AiOutlineUserSwitch } from "react-icons/ai";
import { FaUserShield, FaCrown, FaUserCheck } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import { MdWorkspacePremium, MdOutlineAdminPanelSettings } from "react-icons/md";
import { toast } from 'sonner';
import Swal from "sweetalert2";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [filters, setFilters] = useState({ name: "", email: "", role: "" });
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // 10 users per page

    // Fetching all users info with pagination
    const { data, refetch, isPending } = useQuery({
        queryKey: ["users", page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/all-users?page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    const { allUsers = [], totalUsers = 0, totalPages = 1 } = data || {};

    // Make admin handler
    const handleMakeAdmin = async (email) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to make Admin!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'Cancel'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/api/users/admin/${email}`, {
                        role: "admin",
                    });

                    if (res.data.modifiedCount > 0) {
                        toast.success("User promoted to admin!");
                        refetch();
                    }
                };
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to promote user!");
        }
    };

    // Make premium handler
    const handleMakePremium = async (email) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to make this user Premium!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
                cancelButtonText: 'Cancel'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/api/users/${email}`, {
                        isPremium: true,
                        premiumTaken: new Date(),
                        premiumExpiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                    });

                    if (res.data.modifiedCount > 0) {
                        toast.success("User upgraded to Premium!");
                        refetch();
                    }
                };
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to upgrade user!");
        }
    };

    const clearFilter = (field) => {
        setFilters({ ...filters, [field]: "" });
    };

    const filteredUsers = allUsers.filter((user) => {
        const nameMatch = user.name?.toLowerCase().includes(filters.name.toLowerCase());
        const emailMatch = user.email?.toLowerCase().includes(filters.email.toLowerCase());
        const roleMatch = user.role?.toLowerCase().includes(filters.role.toLowerCase());

        return nameMatch && emailMatch && roleMatch;
    });

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
                title="Manage Users"
                description="View and manage all registered users on EchoPress. Make users admin if needed."
            />

            {/* Content */}
            <div className="space-y-4">
                <h1 className='flex justify-center sm:justify-start text-4xl sm:text-5xl text-[var(--dark)] dark:text-[var(--white)] font-oxygen font-semibold leading-11 mb-6'>All Users</h1>

                {/* Filters */}
                <div className="max-w-[280px] sm:max-w-full md:w-3/4 flex flex-col sm:flex-row gap-1 md:gap-2">
                    {["name", "email", "role"].map((field) => (
                        <div
                            key={field}
                            className='font-oxygen flex items-center justify-between text-sm px-1 w-full h-11 text-[var(--dark)] dark:text-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] border-2 border-gray-100 dark:border-gray-600 rounded-xl z-50 relative'
                        >
                            <input
                                type="text"
                                placeholder={`Search by ${field}`}
                                value={filters[field]}
                                onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
                                className='ml-2 bg-transparent border-none outline-none w-full'
                            />

                            {filters[field] ? (
                                <FiX
                                    onClick={() => clearFilter(field)}
                                    className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer"
                                />
                            ) :
                                <FiSearch className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer" />}
                        </div>
                    ))}
                </div>

                {isPending ? (
                    <div className="overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)] shadow-md">
                        <table className="table w-full border-separate border-spacing-0">
                            <thead>
                                <tr className="font-oxygen bg-[var(--accent-white)] dark:bg-gray-700 text-base">
                                    <th className="p-3 text-left font-semibold rounded-tl-lg">Index</th>
                                    <th className="p-3 text-left font-semibold">Profile</th>
                                    <th className="p-3 text-left font-semibold">Name</th>
                                    <th className="p-3 text-left font-semibold">Email</th>
                                    <th className="p-3 text-left font-semibold">Role</th>
                                    <th className="p-3 text-left font-semibold">Premium</th>
                                    <th className="p-3 text-center font-semibold rounded-tr-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody className="font-jost">
                                {[...Array(5)].map((_, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-slate-50 dark:hover:bg-[#33333d] border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                                    >
                                        <td className="p-3 text-base font-medium">
                                            <Skeleton width={20} />
                                        </td>
                                        <td className="p-3">
                                            <Skeleton circle width={40} height={40} />
                                        </td>
                                        <td className="p-3 text-base">
                                            <Skeleton width={100} />
                                        </td>
                                        <td className="p-3">
                                            <div className="text-base text-gray-700 dark:text-gray-200">
                                                <Skeleton width={150} />
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <Skeleton width={80} height={25} />
                                        </td>
                                        <td className="p-3">
                                            <Skeleton width={60} />
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-center items-center gap-2">
                                                <Skeleton circle width={24} height={24} />
                                                <Skeleton circle width={24} height={24} />
                                                <Skeleton circle width={24} height={24} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : allUsers.length === 0 ? (
                    <p className="text-xl text-gray-600 col-span-full text-center font-libreBas">No users found.</p>
                ) : <>
                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)] shadow-md">
                        <table className="table w-full border-separate border-spacing-0">
                            <thead>
                                <tr className="font-oxygen bg-[var(--accent-white)] dark:bg-gray-700 text-base">
                                    <th className="p-3 text-left font-semibold rounded-tl-lg">Index</th>
                                    <th className="p-3 text-left font-semibold">Profile</th>
                                    <th className="p-3 text-left font-semibold">Name</th>
                                    <th className="p-3 text-left font-semibold">Email</th>
                                    <th className="p-3 text-left font-semibold">Role</th>
                                    <th className="p-3 text-left font-semibold">Premium</th>
                                    <th className="p-3 text-center font-semibold rounded-tr-lg">Action</th>
                                </tr>
                            </thead>

                            <tbody className="font-jost">
                                {filteredUsers.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-slate-50 dark:hover:bg-[#33333d] border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                                    >
                                        <td className="p-3 text-base font-medium">
                                            {(page - 1) * limit + index + 1}
                                        </td>

                                        <td className="p-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img 
                                                        src={user.photo || '/default-user.png'} 
                                                        alt="User profile" 
                                                        className="object-cover blur-sm"
                                                        onLoad={(e) => e.target.classList.remove('blur-sm')}
                                                        onError={(e) => {
                                                            e.target.src = '/default-user.png';
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3 text-base">
                                            <span className="font-medium">{user.name || "Unnamed"}</span>
                                        </td>
                                        <td className="p-3">
                                            <div className="text-base text-gray-700 dark:text-gray-200">
                                                <p>{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <span className="text-base font-semibold uppercase px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                                {user.role || "user"}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {user.isPremium ? (
                                                <span className="flex items-center text-amber-600 dark:text-amber-400 text-base font-semibold">
                                                    <FaCrown className="mr-1" /> Yes
                                                </span>
                                            ) : (
                                                <span className="text-gray-500 dark:text-gray-400 text-base">No</span>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-center items-center gap-2">
                                                {user.role === "admin" ? (
                                                    <span className="text-base text-[var(--primary)] dark:text-[#a5a1fa] font-semibold px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900">
                                                        Admin
                                                    </span>
                                                ) : (
                                                    <>
                                                        <div className="tooltip" data-tip="Make Admin">
                                                            <button
                                                                onClick={() => handleMakeAdmin(user.email)}
                                                                className="btn btn-sm p-1.5 bg-[#8884d8] text-[var(--white)] hover:bg-[#6c68c0] rounded-xs cursor-pointer transition duration-300 border-none shadow-sm"
                                                            >
                                                                <MdOutlineAdminPanelSettings  className="text-base" />
                                                            </button>
                                                        </div>
                                                        
                                                        {!user.isPremium && (
                                                            <div className="tooltip" data-tip="Make Premium">
                                                                <button
                                                                    onClick={() => handleMakePremium(user.email)}
                                                                    className="btn btn-sm p-1.5 bg-amber-500 text-[var(--white)] hover:bg-amber-600 rounded-xs cursorpointer transition duration-300 border-none shadow-sm"
                                                                >
                                                                    <MdWorkspacePremium className="text-base" />
                                                                </button>
                                                            </div>
                                                        )}

                                                        <div className="tooltip" data-tip="View Details">
                                                            <button
                                                                onClick={() => setSelectedUser(user)}
                                                                className="btn btn-sm p-1.5 bg-[var(--primary)] text-[var(--white)] hover:bg-[#d33] rounded-xs cursor-pointer transition duration-300 border-none shadow-sm"
                                                            >
                                                                <AiOutlineInfoCircle className="text-base" />
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-6 text-lg rounded-b-lg">
                                            No users found with that search info.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalUsers)} of {totalUsers} users
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
                </>}

                {/* Modal */}
                {
                    selectedUser && (
                        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-[999999]">
                            <div className="bg-white dark:bg-[var(--dark-secondary)] p-6 rounded-lg shadow w-[95%] max-w-[280px] sm:max-w-sm space-y-4 relative text-[var(--dark)] dark:text-[var(--white)]">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold font-oxygen">
                                        User Details
                                    </h2>
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="text-lg px-2 bg-[var(--primary)] text-[var(--white)] hover:bg-[#ffe0b3] hover:text-[var(--primary)] rounded-full transition duration-500 border-none shadow-none cursor-pointer"
                                    >
                                        &times;
                                    </button>
                                </div>
                                <div className="font-jost text-xs sm:text-base">
                                    <p><strong>Name:</strong> {selectedUser.name}</p>
                                    <p><strong>Email:</strong> {selectedUser.email}</p>
                                    <p><strong>Role:</strong> {selectedUser.role}</p>
                                    <p><strong>Verified:</strong> {selectedUser.isVerified ? "Yes" : "No"}</p>
                                    <p><strong>Premium:</strong> {selectedUser.isPremium ? "Yes" : "No"}</p>
                                    {selectedUser.premiumTaken && <p><strong>Premium Taken:</strong> {new Date(selectedUser.premiumTaken).toLocaleString()}</p>}
                                    {selectedUser.premiumExpiresAt && <p><strong>Expires At:</strong> {new Date(selectedUser.premiumExpiresAt).toLocaleString()}</p>}
                                    <p><strong>Created:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
                                    <p><strong>Updated:</strong> {new Date(selectedUser.updatedAt).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    );
};

export default AllUsers;