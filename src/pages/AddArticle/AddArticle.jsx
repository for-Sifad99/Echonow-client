import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxios";

const AddArticle = () => {
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const [publishers, setPublishers] = useState([]);
    const [types, setTypes] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setPublishers([
            { label: "Prothom Alo", value: "prothom alo" },
            { label: "Routers", value: "routers" },
            { label: "Verge", value: "verge" },
        ]);

        setTypes([
            { label: "Normal", value: "normal" },
            { label: "Tending", value: "tending" },
            { label: "Hot", value: "hot" },
        ])
    }, []);

    const tagOptions = [
        { value: "beauty", label: "Beauty" },
        { value: "guides", label: "Guides" },
        { value: "celebrity", label: "Celebrity" },
        { value: "style", label: "Style" },
        { value: "fashion", label: "Fashion" },
    ];

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("image", data.image[0]);

            const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            const imgRes = await axios.post(imageUploadUrl, formData);
            const imageUrl = imgRes.data.data.url;

            const articleData = {
                title: data.title,
                publisher: data.publisher.value,
                tags: data.tags.map((tag) => tag.value),
                description: data.description,
                image: imageUrl,
                authorName: user?.displayName,
                authorEmail: user?.email,
                status: "pending",
                declineReason : null,
                postedDate: new Date(),
                type: data.type.value,
                isPremium: false,
                viewCount: 0,
            };

            await axiosSecure.post("http://localhost:3000/article", articleData);
            toast.success("Article submitted for approval!");
            // reset();
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit article");
        }
    };

    return (
        <section className="w-full py-4 px-6 md:py-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dark)] mb-4">
                    Add New Article
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] px-3 py-2"
                            placeholder="Enter article title"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center w-full gap-4">
                          <div className="w-full">
                            <label className="block font-medium text-gray-700 mb-1">Publisher</label>
                            <Controller
                                name="publisher"
                                control={control}
                                rules={{ required: "Publisher is required" }}
                                render={({ field }) => (
                                    <Select {...field} options={publishers} placeholder="Select publisher" />
                                )}
                            />
                            {errors.publisher && <p className="text-red-500 text-sm">{errors.publisher.message}</p>}
                        </div>
                        <div className="w-full">
                            <label className="block font-medium text-gray-700 mb-1">Article Type</label>
                            <Controller
                                name="type"
                                control={control}
                                rules={{ required: "type is required" }}
                                render={({ field }) => (
                                    <Select {...field} options={types} placeholder="Select type" />
                                )}
                            />
                            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                        </div>
                    </div>


                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Tags</label>
                        <Controller
                            name="tags"
                            control={control}
                            rules={{ required: "Select at least one tag" }}
                            render={({ field }) => (
                                <Select {...field} options={tagOptions} isMulti placeholder="Select tags" />
                            )}
                        />
                        {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
                    </div>


                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows="5"
                            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] px-3 py-2"
                            placeholder="Write your article description"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>


                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", { required: "Image is required" })}
                            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] px-3 py-2"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-fit flex items-center justify-center sm:ml-auto bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white px-5 py-2 rounded-md transition duration-700 cursor-pointer"
                    >
                        <FiUpload className="inline-block mr-2 mb-0.5" /> Submit Article
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddArticle;