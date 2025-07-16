import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxios';
import useAuth from '../../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import toast from 'react-hot-toast';


const MyProfile = () => {
    const axiosPublic = useAxiosPublic();
    const { user, signOutUser, updateUserProfile } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        photo: '', // will hold URL after upload
    });
    const [uploading, setUploading] = useState(false);

    // Fetch user profile from backend
    const { data: dbUser, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['user-profile', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        onSuccess: (data) => {
            setFormData({
                name: data.name || user.displayName || '',
                photo: data.photo || user.photoURL || '',
            });
        },
    });

    // Upload image file to ImgBB
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            const res = await axios.post(url, formData);
            const photoUrl = res.data.data.url;
            setFormData((prev) => ({
                ...prev,
                photo: photoUrl,
            }))
        }
        catch (err) {
            toast.error('Error', 'Image upload failed.', err);
        }finally{
            setUploading(false);
;        }
    };

    // Mutation for updating user profile in backend & Firebase
    const updateUserMutation = useMutation({
        mutationFn: async (updatedUser) => {
            return await axiosPublic.patch(`/users/${user.email}`, updatedUser);
        },
        onSuccess: async (_, updatedUser) => {
            try {
                await updateUserProfile({
                    displayName: updatedUser.name,
                    photoURL: updatedUser.photo,
                });
                Swal.fire('Updated!', 'Your profile has been updated.', 'success');
                refetch();
            } catch {
                Swal.fire('Partial update!', 'Backend updated but Firebase update failed.', 'warning');
            }
        },
        onError: () => {
            Swal.fire('Error', 'Failed to update profile.', 'error');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserMutation.mutate({
            name: formData.name,
            photo: formData.photo,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogout = () => {
        signOutUser()
            .then(() => Swal.fire('Logged Out', '', 'info'))
            .catch(() => Swal.fire('Error', 'Logout failed', 'error'));
    };

    if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
    if (isError) return <p className="text-red-500 text-center mt-10">{error?.message}</p>;

    return (
        <section className="w-full px-4 py-6 sm:py-10 lg:px-8 bg-white isolate relative">
            <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden pl-20 sm:px-36 blur-3xl" aria-hidden="true">
                <div className="mx-auto aspect-1100/650 w-140.75 bg-linear-to-tr from-[#ff0011] to-[#fcbabf] opacity-30" ></div>
            </div>
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-[var(--primary)] font-oxygen">My Profile</h2>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10">
                <div className="flex flex-col items-center gap-6">
                    <img
                        src={dbUser?.photo}
                        alt="User"
                        className="w-52 h-52 rounded-full object-cover"
                    />
                    <p className='-mb-8 -mt-2 font-libreBas font-bold'>{dbUser?.name}</p>
                    <button
                        onClick={handleLogout}
                        className="text-xl px-6 py-2 font-jost text-[var(--primary)] font-medium rounded-md cursor-pointer"
                    >
                        --------Logout--------
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3 sm:space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border p-2 rounded-md"
                            disabled={uploading}
                        />
                    </div>

                    {uploading && <p className="text-center text-gray-500">Uploading image...</p>}

                    <div className="flex justify-end sm:pt-4">
                        <button
                            type="submit"
                            disabled={updateUserMutation.isLoading || uploading}
                            className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-md transition duration-700"
                        >
                            {updateUserMutation.isLoading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default MyProfile;
