import React from 'react';
import SubLoader from '../../shared/Loader/SubLoader';
import TypeWriterEffect from 'react-typewriter-effect';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '../../../../hooks/useAxiosSecure/useAxios';

const AddPublisher = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    // Fetch publishers using TanStack Query
    const { data: publishers = [], refetch, isPending } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/publisher');
            return res.data.recent;
        },
    });

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("image", data.logo[0]);

            const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            const imgRes = await axios.post(imageUploadUrl, formData);
            const imageUrl = imgRes.data.data.url;

            const publisher = {
                name: data.name,
                logo: imageUrl,
                postedDate: new Date(),
            };

            await axiosSecure.post('/publisher', publisher);
            toast.success('Publisher added!');
            reset();
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };

    // ✅ FIXED: Check if publishers is a valid array
    const recentPublishers = Array.isArray(publishers)
        ? [...publishers].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate)).slice(0, 5)
        : [];

    return (
        <div className="space-y-4">
            <h1 className='flex justify-center sm:justify-start text-4xl sm:text-5xl text-[var(--dark)] dark:text-[var(--white)] font-oxygen font-semibold leading-11 '>Add Publisher</h1>
            <p className="flex flex-col gap-6 font-jost text-sm sm:text-lg md:text-xl leading-3.5 sm:leading-5 md:leading-5.5 text-center sm:text-start text-[var(--accent)] dark:text-[var(--accent-white)] w-full max-w-sm sm:max-w-3xl mx-auto sm:mx-0 mb-6 sm:mb-10 -mt-3.5 sm:-mt-2">
                Publishers help organize books and content in our system. Add top publishers to improve visibility and credibility of your library!
                <p className='w-32 border-b-2 pt-1 sm:pt-2 mx-auto sm:mx-0'></p>
            </p>

            <div className="font-jost grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8 xl:gap-14 w-full max-w-sm sm:max-w-full items-start mx-auto sm:mx-0 ">
                {/* Form Section */}
                <div className="w-full rounded-xl text-[var(--dark)] dark:text-[var(--white)]">
                    <h3 className="font-oxygen text-xl sm:text-2xl font-semibold mb-4 ">Create New Publisher</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:gap-3 md:gap-[13.7px]">
                        <div className='flex flex-col mb-2'>
                            <label className="font-oxygen font-medium]">Publisher Name</label>
                            <input
                                type="text"
                                placeholder='publisher name'
                                {...register('name', { required: true })}
                                className="h-11 px-4 py-2 text-[var(--dark)] dark:text-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] border-2 border-gray-100 dark:border-gray-600 outline-none rounded-xl"
                            />
                        </div>

                        <div className='flex flex-col mb-2'>
                            <label className="font-oxygen font-medium ">Publisher Logo</label>
                            <input
                                type="file"
                                {...register('logo', { required: true })}
                                className="h-11 px-4 py-2 text-[var(--dark)] dark:text-[var(--white)] dark:bg-[var(--accent)] bg-[var(--accent-white)] border-2 border-gray-100 dark:border-gray-600 outline-none rounded-xl"
                            />
                        </div>

                        <button className="btn shadow-none text-[var(--white)] dark:text-[var(--dark)] bg-[var(--primary)] hover:bg-red-500 dark:bg-[var(--accent-white)] dark:hover:bg-[var(--white)] w-full transition duration-300">Add Publisher</button>
                    </form>
                </div>

                {/* Recent Publishers Section */}
                <div className="w-full rounded-xl text-[var(--dark)] dark:text-[var(--white)]">
                    <h3 className="border-l-2 flex flex-col font-oxygen text-xl leading-5 sm:text-2xl font-semibold mb-4 pl-2">
                        Recent Added
                        <div className="text-base text-[var(--primary)] dark:text-[#cdcbff]">
                            <TypeWriterEffect
                                textStyle={{
                                    fontFamily: 'inherit',
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                }}
                                startDelay={500}
                                text="Publishers"
                                typeSpeed={80}
                                eraseSpeed={50}
                                eraseDelay={1000}
                                cursorColor="transparent"
                                loop={true}
                            />
                        </div>
                    </h3>

                    {isPending ? (
                        <div className="flex items-center justify-center mx-auto my-6">
                            <div className="md:hidden">
                                <SubLoader size="text-base" />
                            </div>
                            <div className="hidden md:block xl:hidden">
                                <SubLoader size="text-lg" />
                            </div>
                            <div className="hidden xl:block">
                                <SubLoader size="text-xl" />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentPublishers.map((pub) => (
                                <div key={pub._id} className="group flex items-center gap-4  bg-[var(--white)] dark:bg-[var(--accent)] hover:bg-[#ffeabc] dark:hover:bg-[#e7e6ff] p-3 rounded-lg shadow-sm transition duration-400">
                                    <img
                                        src={pub.logo}
                                        alt={pub.name}
                                        className="w-9 h-9 rounded-md object-contain"
                                    />
                                    <div className='transition duration-400'>
                                        <h4 className="capitalize text-[var(-dark)] dark:text-[var(--white)] dark:group-hover:text-[var(--dark)] text-lg leading-6 font-semibold">{pub.name}</h4>
                                        <p className="text-[var(--accent)] dark:text-[var(--base-100)] dark:group-hover:text-[var(--accent)] text-xs">
                                            {new Date(pub.postedDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {recentPublishers.length === 0 && (
                                <p className="text-base-content/60">No publishers added yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPublisher;
