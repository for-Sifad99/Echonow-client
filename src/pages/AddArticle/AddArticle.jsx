import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHelmet from '../shared/PageTitle/PageHelmet';
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxios";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxios";
import useAuth from "../../../hooks/useAuth/useAuth";
import CommonSidebar from "../shared/CommonSidebar/CommonSidebar";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { toast } from 'sonner';
import axios from "axios";
import "./addArticle.css";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const AddArticle = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const [publishers, setPublishers] = useState([]);
    const [types, setTypes] = useState([]);
    const axiosPublic = useAxiosPublic();

    // Fetching Publishers Info
    const { data: allPublishers = [] } = useQuery({
        queryKey: ["allPublishers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/publisher-with-articles");
            return res.data.publishers;
        },
    });

    // Set publishers and types in select option
    useEffect(() => {
        if (allPublishers.length > 0) {
            const dynamicPublishers = allPublishers.map((pub) => ({
                label: pub.name.charAt(0).toUpperCase() + pub.name.slice(1),
                value: pub.name.toLowerCase(),
            }));
            setPublishers(dynamicPublishers);
        }

        setTypes([
            { label: "Normal", value: "normal" },
            { label: "Hot", value: "hot" },
        ]);
    }, [allPublishers]);

    // All options data
    const tagOptions = [
        { value: "beauty", label: "Beauty" },
        { value: "guides", label: "Guides" },
        { value: "celebrity", label: "Celebrity" },
        { value: "style", label: "Style" },
        { value: "fashion", label: "Fashion" },
    ];

    // Select custom styles
    const customSelectStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            boxShadow: "none",
            minHeight: 42,
            cursor: "pointer",
            color: "inherit",
            borderRadius: 0,
            outline: "none",
        }),
        input: (base) => ({
            ...base,
            backgroundColor: "transparent",
            color: "inherit",
            margin: 0,
            padding: 0,
            outline: "none",
        }),
        singleValue: (base) => ({
            ...base,
            color: "inherit",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "white",
            color: "inherit",
            borderRadius: 0,
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "#e0e0e0",
            color: "#000",
            borderRadius: 0,
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "#000",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "rgba(255, 85, 85, 0.2)" : "transparent",
            color: "inherit",
            cursor: "pointer",
            outline: "none",
        }),
    };

    // OnSubmit handler here
    const onSubmit = async (data) => {
        try {
            // Image uploading in imgbb
            const formData = new FormData();
            formData.append("image", data.image[0]);

            const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            const imgRes = await axios.post(imageUploadUrl, formData);
            const imageUrl = imgRes.data.data.url;

            // Article data which is gonna be post
            const articleData = {
                title: data.title,
                publisher: data.publisher.value,
                tags: data.tags.map((tag) => tag.value),
                description: data.description,
                image: imageUrl,
                authorName: user?.displayName,
                authorEmail: user?.email,
                status: "pending",
                declineReason: null,
                postedDate: new Date(),
                type: data.type.value,
                isPremium: false,
                viewCount: 0,
            };

            const res = await axiosSecure.post("/article", articleData);
            if (res.data.insertedId) {
                toast.success("Article submitted for approval!");
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 409) {
                toast.error("You can't post more than one!");
            } else {
                toast.error("Failed to submit article");
            }
        }
    };

    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title="Add New Post"
                description="Publish your next story to EchoNow – let your voice be heard through engaging articles and headlines."
            />

            {/* Content */}
            <section className="max-w-[1200px] font-jost mx-auto sm:px-4 px-2 pt-1 pb-4 sm:py-4 transition-colors duration-500 text-[#1c1d1e]">
                <div className="flex flex-col lg:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6">
                    {/* form content */}
                    <div className="w-full flex-1">
                        {/* Top header */}
                        <div className="flex justify-between items-center mb-4 md:mb-9">
                            <div className="text-xs sm:text-sm text-gray-800 dark:text-[var(--accent-white)] font-oxygen flex items-center">
                                <Link to='/'>Home </Link>
                                <MdOutlineKeyboardArrowRight />
                                <span className="opacity-80">Add Article</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <img 
                                    src={user?.photoURL || '/default-user.png'} 
                                    className="w-3.5 sm:w-5 rounded-full object-cover" 
                                    alt="User profile"
                                    onError={(e) => {
                                        e.target.src = '/default-user.png';
                                    }}
                                />
                                <h2 className="text-gray-700 dark:text-[var(--white)]  font-semibold">{user?.displayName}</h2>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-start mb-2 md:mb-6">
                            <div className="flex items-center justify-start gap-1.5 sm:gap-3">
                                <h2 className="text-2xl text-[var(--dark)] dark:text-[var(--white)] sm:text-3xl font-libreBas font-bold">
                                    Add Article
                                </h2>
                                <div className="w-10 sm:w-30 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                            </div>
                            <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm -mt-1 sm:-mt-1.5 ">
                                Fill the form to add article
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="add-article-form space-y-5 px-8 py-14 shadow-lg bg-[var(--accent-white)] dark:bg-[#1c1d1e] dark:text-[var(--white)] "
                            style={{ borderRadius: 0 }}
                        >
                            {/* Title */}
                            <div>
                                <Label className="block font-medium mb-1 font-oxygen">Title</Label>
                                <Input
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    placeholder="Enter article title"
                                    className="w-full px-4 py-2 rounded-none no-outline"
                                    autoComplete="off"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Publisher */}
                            <div>
                                <Label className="block font-medium mb-1 font-oxygen">Publisher</Label>
                                <Controller
                                    name="publisher"
                                    control={control}
                                    defaultValue={null}
                                    rules={{ required: "Publisher is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={publishers}
                                            placeholder="Select publisher"
                                            styles={customSelectStyles}
                                            isClearable
                                            classNamePrefix="react-select"
                                            className="no-outline"
                                        />
                                    )}
                                />
                                {errors.publisher && (
                                    <p className="text-red-500 text-sm mt-1">{errors.publisher.message}</p>
                                )}
                            </div>

                            {/* Type */}
                            <div>
                                <Label className="block font-medium mb-1 font-oxygen">Article Type</Label>
                                <Controller
                                    name="type"
                                    control={control}
                                    defaultValue={null}
                                    rules={{ required: "Type is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={types}
                                            placeholder="Select type"
                                            styles={customSelectStyles}
                                            isClearable
                                            classNamePrefix="react-select"
                                            className="no-outline"
                                        />
                                    )}
                                />
                                {errors.type && (
                                    <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                                )}
                            </div>

                            {/* Tags */}
                            <div>
                                <Label className="block font-medium mb-1 font-oxygen">Tags</Label>
                                <Controller
                                    name="tags"
                                    control={control}
                                    defaultValue={[]}
                                    rules={{ required: "Select at least one tag" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={tagOptions}
                                            isMulti
                                            placeholder="Select tags"
                                            styles={customSelectStyles}
                                            closeMenuOnSelect={false}
                                            classNamePrefix="react-select"
                                            className="no-outline"
                                        />
                                    )}
                                />
                                {errors.tags && (
                                    <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <Label className="block font-medium mb-1 font-oxygen">Description</Label>
                                <textarea
                                    {...register("description", { required: "Description is required" })}
                                    rows="5"
                                    placeholder="Write your article description"
                                    className="w-full px-4 py-2 rounded-none no-outline"
                                ></textarea>
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Upload Image */}
                            <div>
                                <Label className="block font-medium mb-1 font-oxygen">Upload Image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    {...register("image", { required: "Image is required" })}
                                    className="w-full px-4 py-2 rounded-none no-outline"
                                />
                                {errors.image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full sm:w-fit flex items-center justify-center ml-auto gap-2 bg-[#1c1d1e] text-[var(--white)] px-6 py-2 rounded-none transition-all duration-300 no-outline border-none cursor-pointer"
                            >
                                <FiUpload /> Submit Article
                            </Button>
                        </form>
                    </div>

                    {/* side content */}
                    <div className="hidden lg:flex">
                        <CommonSidebar />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddArticle;