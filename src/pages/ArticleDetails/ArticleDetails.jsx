import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxios";

const ArticleDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const hasUpdatedView = useRef(false);

    // TanStack v5 syntax: query key and queryFn inside one object
    const {
        data: article,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["article", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/article/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    useEffect(() => {
        if (!id || hasUpdatedView.current) return;

        hasUpdatedView.current = true;

        // Increment view count
        axiosSecure
            .patch(`/article/${id}/views`)
            .then(() => {
                console.log("View count updated successfully");
                refetch();
            })
            .catch(console.error);
    }, [id, axiosSecure, refetch]);

    if (isPending) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10">
                <p>Loading article details...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10">
                <p>Error loading article: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-[var(--dark)] mb-4">{article?.title}</h1>

            <img
                src={article?.image}
                alt={article?.title}
                className="w-full rounded-md mb-6 max-h-[400px] object-cover"
            />

            <div className="mb-4 text-gray-600">
                <span className="font-semibold">Publisher:</span> {article?.publisher}
            </div>

            <div className="mb-6 text-gray-600">
                <span className="font-semibold">Views:</span> {article?.viewCount || 0}
            </div>

            <div className="text-gray-800 leading-7 whitespace-pre-line">
                {article?.description}
            </div>
        </div>
    );
};

export default ArticleDetails;
