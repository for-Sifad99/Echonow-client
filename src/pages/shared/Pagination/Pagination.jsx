import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ page, totalPages, setPage }) => {
    return (
        <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6">
            {/* Left or previous button */}
            <button
                disabled={page <= 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="text-xs sm:text-base p-1.5 sm:p-2 rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-red-400 hover:text-white bg-gray-200 disabled:opacity-70 transition duration-700 cursor-pointer"
            >
                <FaChevronLeft />
            </button>


            {/* Middle button */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`text-sm sm:text-base px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md font-semibold transition duration-500 cursor-pointer ${page === p ? "bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white" : "text-red-500 bg-gray-100 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400"
                            }`}
                    >
                        {p}
                    </button>
                ))}

            {/* Right or next button */}
            <button
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="text-xs sm:text-base p-1.5 sm:p-2 rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-red-400 hover:text-white bg-gray-200 disabled:opacity-70 transition duration-700 cursor-pointer"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;