import React, { useState, useEffect } from 'react';
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
    const [updating, setUpdating] = useState(false);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user profile using useEffect and axiosPublic
    useEffect(() => {
        if (!user?.email) return;

        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosPublic.get(`/users/${user.email}`);
                setDbUser(res.data);
                setFormData({
                    name: res.data.name || user.displayName || '',
                    photo: res.data.photo || user.photoURL || '',
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user?.email, axiosPublic, user.displayName, user.photoURL]);

    // Upload image file to ImgBB
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formDataImg = new FormData();
        formDataImg.append('image', file);

        try {
            const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            const res = await axios.post(url, formDataImg);
            const photoUrl = res.data.data.url;
            setFormData((prev) => ({
                ...prev,
                photo: photoUrl,
            }));
        } catch (err) {
            toast.error('Image upload failed.', err);
        } finally {
            setUploading(false);
        }
    };

    // Normal async function to update profile (no useMutation)
    const updateUserProfileHandler = async (updatedUser) => {
        setUpdating(true);
        try {
            await axiosPublic.patch(`/users/${user.email}`, updatedUser);
            try {
                await updateUserProfile({
                    displayName: updatedUser.name,
                    photoURL: updatedUser.photo,
                });

                // Sweet Alert
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Your profile has been updated."
                });
                // Refetch user data after update
                const res = await axiosPublic.get(`/users/${user.email}`);
                setDbUser(res.data);
                setFormData({
                    name: res.data.name || user.displayName || '',
                    photo: res.data.photo || user.photoURL || '',
                });
            } catch {
                toast.error(
                    'Backend updated but Firebase update failed.',
                );
            }
        } catch {
            toast.error('Sorry! Failed to update profile.');
        } finally {
            setUpdating(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfileHandler({
            name: formData.name,
            photo: formData.photo,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
   
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                signOutUser()
                    .then(() => toast.success('You are successfully logged out!'))
                    .catch(() => toast.error('Sorry! Logout failed.'));
            }
        });
    };
  
    if (loading) return <p className="text-center mt-10">Loading profile...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error.message}</p>;

    return (
        <section className="w-full px-4 py-6 sm:py-10 lg:px-8 bg-white isolate relative">
            <div
                className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden pl-20 sm:px-36 blur-3xl"
                aria-hidden="true"
            >
                <div className="mx-auto aspect-1100/650 w-140.75 bg-linear-to-tr from-[#ff0011] to-[#fcbabf] opacity-30"></div>
            </div>
            <h2 className="text-center mb-10 text-base/7 font-semibold text-[var(--primary)] font-oxygen">
                My Profile
            </h2>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10">
                <div className="flex flex-col items-center gap-6">
                    <img src={dbUser?.photo || 'https://i.ibb.co/qMPZvv6H/8211048.png'} alt="User" className="w-52 h-52 rounded-full object-cover" />
                    <p className=" -mb-8 -mt-2 font-libreBas font-bold">{dbUser?.name}</p>
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
                        <label className="block text-sm font-medium mb-1">
                            Photo{' '}
                            {uploading && (
                                <span className="text-gray-600">
                                    Uploading <span className="loading loading-dots loading-sm"></span>
                                </span>
                            )}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border p-2 rounded-md"
                            disabled={uploading}
                        />
                    </div>

                    <div className="flex justify-end sm:pt-4">
                        <button
                            type="submit"
                            disabled={updating || uploading}
                            className="px-10 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-md transition duration-700 cursor-pointer"
                        >
                            {updating ? <>Editing <span className="loading loading-spinner w-4 text-white"></span></> : 'Edit'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default MyProfile;
