import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHelmet from '../shared/PageTitle/PageHelmet';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxios';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../hooks/useAuth/useAuth';
import useEmailVerification from '../../../hooks/useEmailVerification/useEmailVerification';
import SubLoader from '../shared/Loader/SubLoader';
import EmailVerificationModal from '../shared/EmailVerification/EmailVerificationModal';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyProfile = () => {
    const { user, signOutUser, updateUserProfile } = useAuth();
    const { useVerificationStatus } = useEmailVerification();
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Get email verification status
    const { data: verificationStatus, isLoading: isVerificationLoading } = useVerificationStatus(user?.email);

    const [uploading, setUploading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        photo: '',
    });

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
            toast.error('Image upload failed.');
        } finally {
            setUploading(false);
        }
    };

    // Profile update handler
    const updateUserProfileHandler = async (updatedUser) => {
        setUpdating(true);
        try {
            await axiosSecure.patch(`/users/${user.email}`, updatedUser);
            try {
                await updateUserProfile({
                    displayName: updatedUser.name,
                    photoURL: updatedUser.photo,
                });

                toast.success('Your profile has been updated!');

                // Refetch user data after update
                const res = await axiosPublic.get(`/users/${user.email}`);
                setDbUser(res.data);
                setFormData({
                    name: res.data.name || user.displayName || '',
                    photo: res.data.photo || user.photoURL || '',
                });
            } catch {
                toast.error('Backend updated but Firebase update failed.');
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

    // Logout handler
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
                    .then(() => {
                        toast.success('You are successfully logged out!')
                        navigate('/')
                    })
                    .catch(() => toast.error('Sorry! Logout failed.'));
            }
        });
    };

    // Loading loader
    if (loading) {
        return <div className="flex items-center justify-center mx-auto my-10">
            <div className="md:hidden">
                <SubLoader size="text-lg" />
            </div>
            <div className="hidden md:block xl:hidden">
                <SubLoader size="text-xl" />
            </div>
            <div className="hidden xl:flex">
                <SubLoader size="text-2xl" />
            </div>
        </div>
    };

    // Error content
    if (error) {
        return <p className="text-red-500 dark:text-red-400 text-center mt-10 font-jost">{error.message}</p>;
    }

    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title="My Profile"
                description="View and edit your EchoNow profile, subscriptions, and preferences."
            />

            {/* Content */}
            <section className="max-w-[1200px] mx-auto px-2 sm:px-4 py-4 text-[ver(--dark)] dark:text-[var(--white)] bg-[var(--white)] dark:bg-[var(--dark2-bg)] isolate relative">
                <div
                    className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden pl-20 sm:px-36 blur-3xl"
                    aria-hidden="true"
                >
                    <div className="dark:hidden mx-auto aspect-1100/650 w-140.75 bg-linear-to-tr from-[#ff0011] to-[#fcbabf] opacity-30">
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-5 sm:mb-6 md:mb-8">
                    <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                        <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                        <h2 className="text-2xl sm:text-3xl font-libreBas font-bold text-[var(--dark)] dark:text-[var(--white)]">
                            Latest Stories
                        </h2>
                        <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    </div>
                    <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
                        Let's know about our current modern fashions
                    </p>
                </div>

                {/* main content */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 font-jost">
                    <div className="flex flex-col items-center gap-6">
                        <img 
                            src={dbUser?.photo || user?.photoURL || '/default-user.png'} 
                            alt="User profile" 
                            className="w-52 h-52 rounded-full object-cover"
                            onError={(e) => {
                                e.target.src = '/default-user.png';
                            }}
                        />
                        <p className="-mb-8 -mt-2 font-libreBas font-bold">{dbUser?.name}</p>

                        {/* Email Verification Status */}
                        {user?.providerData?.[0]?.providerId === 'password' && (
                            <div className="w-full max-w-xs bg-gray-50 dark:bg-gray-700 rounded-lg p-4 -mb-8 mt-2">
                                {isVerificationLoading ? (
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">Loading...</p>
                                ) : verificationStatus?.isEmailVerified ? (
                                    <div className="flex items-center text-green-600 dark:text-green-400">
                                        <span className="text-sm">Verified</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Not verified</p>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                                        >
                                            Verify Email
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={handleLogout}
                            className="mt-4 px-10 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-400 text-[var(--white)] font-semibold transition duration-700 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3 sm:space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-400 dark:border-[#3f3f3f] px-3 py-2"
                                required
                            />
                        </div>

                        {/* Photo */}
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
                                className="w-full border border-gray-400 dark:border-[#3f3f3f] p-2"
                                disabled={uploading}
                            />
                        </div>

                        {/* Action */}
                        <div className="flex justify-end sm:pt-4">
                            <button
                                type="submit"
                                disabled={updating || uploading}
                                className="px-10 py-2 bg-gradient-to-r bg-[#8884d8] hover:text-[var(--dark)] hover:bg-[#ebe9e9] text-[var(--white)] font-semibold transition duration-700 cursor-pointer"
                            >
                                {updating ? <>Editing <span className="loading loading-spinner w-4 text-white"></span></> : 'Edit'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <EmailVerificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onVerified={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default MyProfile;