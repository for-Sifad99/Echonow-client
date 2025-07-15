// Pagination.js
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ page, totalPages, setPage }) => {
    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button
                disabled={page <= 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
            >
                <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-1 rounded-md ${page === p ? "bg-[var(--primary)] text-white" : "bg-gray-100"
                            }`}
                    >
                        {p}
                    </button>
                ))}
            <button
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;