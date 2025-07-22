import React, { useState } from "react";
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

    const { data: users = [], refetch, isLoading } = useQuery({
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
                    const res = await axiosSecure.patch(`/users/${email}`, {
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

    if (isLoading) {
        return (
            <p className="text-center text-[var(--dark)] dark:text-[var(--white)]">
                Loading...
            </p>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className='flex justify-center sm:justify-start text-4xl sm:text-5xl text-[var(--dark)] dark:text-[var(--white)] font-oxygen font-semibold leading-11 mb-6'>All Users</h1>

            {/* Filters */}
            <div className="w-3/4 flex gap-2">
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

            {/* Table */}
            <div className="overflow-x-scroll lg:overflow-x-auto rounded-md">
                <table className="table text-white-[var(--dark)] dark:text-[var(--white)]">
                    <thead className="bg-[var(--primary)] dark:bg-[var(--accent)] text-[var(--white)] font-oxygen">
                        <tr>
                            <th>Index</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr
                                key={user._id}
                                className={` ${index % 2 === 0 ? "bg-[var(--white)] dark:bg-[var(--dark-secondary)]" : "bg-[var(--secondary)]  dark:bg-[#3d3d49]"}`}
                            >
                                <td><p className="text-xl font-libreBa text-[var(--dark)] dark:text-[var(--white)]">{index + 1}</p></td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-10 w-10">
                                            <img src={user.photo} alt="user" />
                                        </div>
                                    </div>
                                </td>
                                <td className="text-lg font-medium font-libreBa">{user.name || "Unnamed"}</td>
                                <td className="text-sm font-semibold text-gray-600 dark:text-gray-200 font-jost">{user.email}</td>
                                <td className="uppercase text-sm font-bold font-oxygen">{user.role || "user"}</td>
                                <td className="space-x-1 font-jost flex items-center gap-2">
                                    {user.role === "admin" ? (
                                        <span className="text-lg text-[var(--primary)] dark:text-[#a5a1fa] font-semibold">Admin</span>
                                    ) : (
                                        <>
                                            <div className="tooltip" data-tip="Make Admin">
                                                <button
                                                    onClick={() => handleMakeAdmin(user.email)}
                                                    className="btn btn-sm bg-[#8884d8] text-[var(--white)] hover:bg-[#d6d5ff] hover:text-[#5854a8] dark:bg-[var(--accent-white)] dark:text-[var(--dark)] rounded-lg transition duration-500 border-none shadow-none"
                                                >
                                                    <FaUserShield />
                                                </button>
                                            </div>
                                            <div className="tooltip" data-tip="View Details">
                                                <button
                                                    onClick={() => setSelectedUser(user)}
                                                    className="btn btn-sm bg-[var(--primary)] text-[var(--white)] hover:bg-[#ffe0b3] hover:text-[var(--primary)] dark:bg-[var(--accent-white)] dark:text-[var(--dark)] rounded-lg transition duration-500 border-none shadow-none"
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
                            <tr>
                                <td colSpan="6" className="text-center py-3 text-lg">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-[9999]">
                    <div className="bg-white dark:bg-[var(--dark-secondary)] p-6 rounded-lg shadow w-[94%] max-w-sm space-y-4 relative text-[var(--dark)] dark:text-[var(--white)]">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold font-oxygen">User Details</h2>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-lg px-2 bg-[var(--primary)] text-[var(--white)] hover:bg-[#ffe0b3] hover:text-[var(--primary)] rounded-full transition duration-500 border-none shadow-none cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                            <div className="font-jost">
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
            )}
        </div>
    );
};

export default AllUsers;
