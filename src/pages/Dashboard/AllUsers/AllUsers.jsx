import React, { useState } from "react";
import SubLoader from '../../shared/Loader/SubLoader';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxios";
import { FaUserShield } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [filters, setFilters] = useState({ name: "", email: "", role: "" });
    const [selectedUser, setSelectedUser] = useState(null);

    const { data: users = [], refetch, isPending } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-users");
            return res.data.allUsers;
        },
    });

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
                    const res = await axiosSecure.patch(`/users/admin/${email}`, {
                        role: "admin",
                    });

                    if (res.data.modifiedCount > 0) {
                        toast.success("User promoted to admin! 👑");
                        refetch();
                    }
                };
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to promote user!");
        }
    };

    const clearFilter = (field) => {
        setFilters({ ...filters, [field]: "" });
    };

    const filteredUsers = users.filter((user) => {
        const nameMatch = user.name?.toLowerCase().includes(filters.name.toLowerCase());
        const emailMatch = user.email?.toLowerCase().includes(filters.email.toLowerCase());
        const roleMatch = user.role?.toLowerCase().includes(filters.role.toLowerCase());

        return nameMatch && emailMatch && roleMatch;
    });

    return (
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
            ) : users.length === 0 ? (
                <p className="text-xl text-gray-600 col-span-full text-center font-libreBas">No users found.</p>
            ) : <>
                {/* Table */}
                <div className="overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)]">
                    <table className="table w-full">
                        <thead>
                            <tr className="font-oxygen bg-[var(--accent-white)] (--dark-secondary)] dark:text-[var(--white)] dark:bg-gray-700">
                                <th>Index</th>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-jost">
                            {filteredUsers.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-slate-50 dark:hover:bg-[#33333d]"
                                >
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-7 h-7 md:w-10 md:h-10">
                                                <img src={user.photo} alt="user" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-xs md:text-sm">{user.name || "Unnamed"}</td>
                                    <td className="text-xs md:text-sm text-gray-600 dark:text-gray-200 font-semibold">
                                        <p className="md:hidden">{user.email.slice(0, 12)}...</p>
                                        <p className="hidden md:block">{user.email}</p>
                                    </td>
                                    <td className="uppercase">
                                        {user.role || "user"}</td>
                                    <td className="flex justify-center items-center gap-1">
                                        {user.role === "admin" ? (
                                            <span className="text-base md:text-lg text-[var(--primary)] dark:text-[#a5a1fa] font-semibold rounded-md ">Admin</span>
                                        ) : (
                                            <>
                                                <div className="tooltip" data-tip="Make Admin" >
                                                    <button
                                                        onClick={() => handleMakeAdmin(user.email)}
                                                        className="btn btn-xs md:btn-sm bg-[#8884d8] text-[var(--white)] hover:hover:bg-[#ebe9e9]  hover:text-[#8884d8] rounded-lg transition duration-500 border-none shadow-none"
                                                    >
                                                        <FaUserShield />
                                                    </button>
                                                </div>
                                                <div className="tooltip" data-tip="View Details">
                                                    <button
                                                        onClick={() => setSelectedUser(user)}
                                                        className="btn btn-xs md:btn-sm bg-[var(--primary)] text-[var(--white)] hover:hover:bg-[#ebe9e9] hover:text-[var(--primary)] dark:bg-[var(--accent-white)] dark:text-[var(--dark)] rounded-lg transition duration-500 border-none shadow-none"
                                                    >
                                                        <AiOutlineInfoCircle />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr className="rounded-md">
                                    <td colSpan="6" className="text-center py-3 text-lg">
                                        No users found with that search info.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>}
            {/* Modal */}
            {
                selectedUser && (
                    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-[9999]">
                        <div className="bg-white dark:bg-[var(--dark-secondary)] p-6 rounded-lg shadow w-[95%] max-w-[280px] sm:max-w-sm space-y-4 relative text-[var(--dark)] dark:text-[var(--white)]">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold font-oxygen">User Details</h2>
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
    );
};

export default AllUsers;
