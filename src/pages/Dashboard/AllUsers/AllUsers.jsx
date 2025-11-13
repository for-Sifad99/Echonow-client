import React, { useState } from "react";
import PageHelmet from "../../shared/PageTitle/PageHelmet";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaCrown } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import { MdWorkspacePremium, MdOutlineAdminPanelSettings } from "react-icons/md";
import { toast } from "sonner";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filters, setFilters] = useState({ search: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, refetch, isPending } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/all-users?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const { allUsers = [], totalUsers = 0, totalPages = 1 } = data || {};

  const handleMakeAdmin = async (email) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to make Admin!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/api/users/admin/${email}`, { role: "admin" });
          if (res.data.modifiedCount > 0) {
            toast.success("User promoted to admin!");
            refetch();
          }
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to promote user!");
    }
  };

  const handleMakePremium = async (email) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to make this user Premium!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/api/users/${email}`, {
            isPremium: true,
            premiumTaken: new Date(),
            premiumExpiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          });
          if (res.data.modifiedCount > 0) {
            toast.success("User upgraded to Premium!");
            refetch();
          }
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to upgrade user!");
    }
  };

  const filteredUsers = allUsers.filter((user) => {
    const searchTerm = filters.search.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.role?.toLowerCase().includes(searchTerm)
    );
  });

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <>
      <PageHelmet
        title="Manage Users"
        description="View and manage all registered users on EchoPress. Make users admin if needed."
      />

      <div className="space-y-4 sm:space-y-6">
        <h1 className="flex justify-center sm:justify-start text-3xl sm:text-4xl md:text-5xl text-[var(--dark)] dark:text-[var(--white)] font-oxygen font-semibold leading-tight mb-6">
          All Users
        </h1>

        {/* Search Box */}
        <div className="w-full flex justify-center sm:justify-start">
          <div className="font-oxygen flex items-center text-sm px-1 w-full sm:max-w-md h-11 text-[var(--dark)] dark:text-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] border-2 border-gray-100 dark:border-gray-600 rounded-xl z-50 relative transition-all duration-300 ease-in-out focus-within:shadow-md sm:focus-within:w-md">
            <input
              type="text"
              placeholder="Search by name, email or role"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="ml-2 bg-transparent border-none outline-none w-full text-sm sm:text-base"
            />
            {filters.search ? (
              <FiX
                onClick={() => setFilters({ search: "" })}
                className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer"
              />
            ) : (
              <FiSearch className="stroke-[var(--primary)] dark:stroke-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] p-[10px] h-[36px] w-[36px] rounded-xl cursor-pointer" />
            )}
          </div>
        </div>

        {isPending ? (
          <div className="overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)] shadow-md">
            <table className="table w-full border-separate border-spacing-0">
              <thead>
                <tr className="font-oxygen bg-[var(--accent-white)] dark:bg-gray-700 text-sm">
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
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-[#33333d] border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                    <td className="p-3 text-sm font-medium">
                      <Skeleton width={20} />
                    </td>
                    <td className="p-3">
                      <Skeleton circle width={32} height={32} />
                    </td>
                    <td className="p-3 text-sm">
                      <Skeleton width={80} />
                    </td>
                    <td className="p-3">
                      <Skeleton width={120} />
                    </td>
                    <td className="p-3">
                      <Skeleton width={60} />
                    </td>
                    <td className="p-3">
                      <Skeleton width={40} />
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center items-center gap-1">
                        <Skeleton circle width={20} height={20} />
                        <Skeleton circle width={20} height={20} />
                        <Skeleton circle width={20} height={20} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : allUsers.length === 0 ? (
          <p className="text-lg sm:text-xl text-gray-600 col-span-full text-center font-libreBas py-4">
            No users found.
          </p>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto rounded-lg custom-scrollbar text-[var(--dark)] dark:text-[var(--white)] shadow-md">
              <table className="table w-full border-separate border-spacing-0 min-w-[800px] md:min-w-full">
                <thead>
                  <tr className="font-oxygen bg-[var(--accent-white)] dark:bg-gray-700 text-sm">
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
                      <td className="p-3 text-sm font-medium">
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td className="p-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-9 h-9 sm:w-10 sm:h-10">
                            <img
                              src={user.photo || "/default-user.png"}
                              alt="User profile"
                              className="object-cover blur-sm"
                              onLoad={(e) => e.target.classList.remove("blur-sm")}
                              onError={(e) => {
                                e.target.src = "/default-user.png";
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-sm font-medium">{user.name || "Unnamed"}</td>
                      <td className="p-3 text-sm max-w-[150px] sm:max-w-none truncate">{user.email}</td>
                      <td className="p-3">
                        <span className="text-xs sm:text-sm font-semibold uppercase px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="p-3">
                        {user.isPremium ? (
                          <span className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-semibold">
                            <FaCrown className="mr-1 text-xs" /> Yes
                          </span>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">No</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center items-center gap-1 sm:gap-2">
                          {user.role === "admin" ? (
                            <span className="text-xs sm:text-sm text-[var(--primary)] dark:text-[#a5a1fa] font-semibold px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900">
                              Admin
                            </span>
                          ) : (
                            <>
                              <div className="tooltip" data-tip="Make Admin">
                                <button
                                  onClick={() => handleMakeAdmin(user.email)}
                                  className="btn btn-xs sm:btn-sm p-1 bg-[#8884d8] text-[var(--white)] hover:bg-[#6c68c0] rounded-xs cursor-pointer transition duration-300 border-none shadow-sm"
                                >
                                  <MdOutlineAdminPanelSettings className="text-xs sm:text-base" />
                                </button>
                              </div>

                              {!user.isPremium && (
                                <div className="tooltip" data-tip="Make Premium">
                                  <button
                                    onClick={() => handleMakePremium(user.email)}
                                    className="btn btn-xs sm:btn-sm p-1 bg-amber-500 text-[var(--white)] hover:bg-amber-600 rounded-xs cursor-pointer transition duration-300 border-none shadow-sm"
                                  >
                                    <MdWorkspacePremium className="text-xs sm:text-base" />
                                  </button>
                                </div>
                              )}

                              <div className="tooltip" data-tip="View Details">
                                <button
                                  onClick={() => setSelectedUser(user)}
                                  className="btn btn-xs sm:btn-sm p-1 bg-[var(--primary)] text-[var(--white)] hover:bg-[#d33] rounded-xs cursor-pointer transition duration-300 border-none shadow-sm"
                                >
                                  <AiOutlineInfoCircle className="text-xs sm:text-base" />
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
                      <td colSpan="7" className="text-center py-6 text-base rounded-b-lg">
                        No users found with that search info.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalUsers)} of {totalUsers} users
              </p>
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm ${
                    page === 1
                      ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-[var(--primary)] hover:bg-[#d33] text-white"
                  }`}
                >
                  Previous
                </button>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm ${
                    page === totalPages
                      ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-[var(--primary)] hover:bg-[#d33] text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {/* Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999999] p-3">
            <div className="bg-white dark:bg-[var(--dark-secondary)] p-4 sm:p-6 rounded-lg shadow w-[95%] sm:max-w-md md:max-w-lg space-y-4 relative text-[var(--dark)] dark:text-[var(--white)] max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold font-oxygen">User Details</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-lg sm:text-xl px-2 bg-[var(--primary)] text-[var(--white)] hover:bg-[#ffe0b3] hover:text-[var(--primary)] rounded-full transition duration-500"
                >
                  &times;
                </button>
              </div>
              <div className="font-jost text-xs sm:text-sm">
                <p className="mb-1">
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p className="mb-1">
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p className="mb-1">
                  <strong>Verified:</strong> {selectedUser.isVerified ? "Yes" : "No"}
                </p>
                <p className="mb-1">
                  <strong>Premium:</strong> {selectedUser.isPremium ? "Yes" : "No"}
                </p>
                {selectedUser.premiumTaken && (
                  <p className="mb-1">
                    <strong>Premium Taken:</strong>{" "}
                    {new Date(selectedUser.premiumTaken).toLocaleString()}
                  </p>
                )}
                {selectedUser.premiumExpiresAt && (
                  <p className="mb-1">
                    <strong>Expires At:</strong>{" "}
                    {new Date(selectedUser.premiumExpiresAt).toLocaleString()}
                  </p>
                )}
                <p className="mb-1">
                  <strong>Created:</strong> {new Date(selectedUser.createdAt).toLocaleString()}
                </p>
                <p className="mb-1">
                  <strong>Updated:</strong> {new Date(selectedUser.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllUsers;
