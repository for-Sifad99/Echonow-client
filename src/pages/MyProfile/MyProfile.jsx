import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHelmet from '../shared/PageTitle/PageHelmet';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxios';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxios';
import useAuth from '../../../hooks/useAuth/useAuth';
import useEmailVerification from '../../../hooks/useEmailVerification/useEmailVerification';
import EmailVerificationModal from '../shared/EmailVerification/EmailVerificationModal';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import axios from 'axios';
import { CheckCircle, XCircle, MailCheck } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

    const { data: verificationStatus, isLoading: isVerificationLoading } = useVerificationStatus(user?.email);

    const [uploading, setUploading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        photo: '',
    });

    useEffect(() => {
        if (!user?.email) return;

        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosPublic.get(`/api/users/${user.email}`);
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

    const updateUserProfileHandler = async (updatedUser) => {
        setUpdating(true);
        try {
            await axiosSecure.patch(`/api/users/${user.email}`, updatedUser);
            try {
                await updateUserProfile({
                    displayName: updatedUser.name,
                    photoURL: updatedUser.photo,
                });

                toast.success('Your profile has been updated!');

                const res = await axiosPublic.get(`/api/users/${user.email}`);
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

    if (loading) {
        return (
            <section className="max-w-[1100px] mx-auto px-4 py-8 bg-[var(--white)] dark:bg-[var(--dark2-bg)] text-[var(--dark)] dark:text-[var(--white)] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500">
                <div className="text-center mb-8">
                    <Skeleton width={200} height={30} className="mx-auto" />
                    <Skeleton width={300} height={20} className="mt-2 mx-auto" />
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-start gap-6 font-jost">
                    <div className="flex flex-col items-center gap-4 sm:gap-6 bg-gray-50 dark:bg-[#1d1d1d] p-6 rounded-xl shadow-md w-full sm:w-1/3">
                        <Skeleton circle width={180} height={180} />
                        <Skeleton width={150} height={25} />
                        <Skeleton width={200} height={40} />
                        <Skeleton width="100%" height={40} />
                    </div>

                    <div className="w-full sm:w-2/3 bg-gray-50 dark:bg-[#1d1d1d] p-6 rounded-xl shadow-md space-y-5 transition-all">
                        <div>
                            <Skeleton width={100} height={20} />
                            <Skeleton width="100%" height={40} className="mt-2" />
                        </div>
                        <div>
                            <Skeleton width={150} height={20} />
                            <Skeleton width="100%" height={40} className="mt-2" />
                        </div>
                        <div className="flex justify-end pt-3">
                            <Skeleton width={120} height={40} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return <p className="text-red-500 dark:text-red-400 text-center mt-10 font-jost">{error.message}</p>;
    }

    return (
        <>
            <PageHelmet
                title="My Profile"
                description="View and edit your EchoNow profile, subscriptions, and preferences."
            />

            <section className="max-w-[1100px] mx-auto px-4 py-8 bg-[var(--white)] dark:bg-[var(--dark2-bg)] text-[var(--dark)] dark:text-[var(--white)] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500">
                {/* Title */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold font-libreBas">My Profile</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Manage your account and update your information.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-start gap-6 font-jost">
                    {/* Left: Profile info */}
                    <div className="flex flex-col items-center gap-4 sm:gap-6 bg-gray-50 dark:bg-[#1d1d1d] p-6 rounded-xl shadow-md w-full sm:w-1/3">
                        <img
                            src={dbUser?.photo || user?.photoURL}
                            alt="User profile"
                            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover ring-4 ring-gray-200 dark:ring-gray-700 transition-all blur-sm"
                            onLoad={(e) => e.target.classList.remove('blur-sm')}
                            onError={(e) => (e.target.src = '/default-user.png')}
                        />
                        <h3 className="text-lg sm:text-xl font-semibold">{dbUser?.name}</h3>

                        {/* Email Verification Status */}
                        {user?.providerData?.[0]?.providerId === 'password' && (
                            <div className="w-full max-w-[250px]">
                                {isVerificationLoading ? (
                                    <div className="flex justify-center text-gray-600 dark:text-gray-300 text-sm">
                                        Loading status...
                                    </div>
                                ) : verificationStatus?.isEmailVerified ? (
                                    <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-4 py-2 rounded-full shadow-sm">
                                        <CheckCircle size={18} />
                                        <span className="text-sm font-medium">Email Verified</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 px-4 py-2 rounded-full shadow-sm">
                                            <XCircle size={18} />
                                            <span className="text-sm font-medium">Not Verified</span>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-1.5 rounded-md font-medium transition-all"
                                        >
                                            <MailCheck size={16} />
                                            Verify Email
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={handleLogout}
                            className="w-full px-8 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium shadow-md transition-all"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Right: Edit form */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full sm:w-2/3 bg-gray-50 dark:bg-[#1d1d1d] p-6 rounded-xl shadow-md space-y-5 transition-all"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-[#2a2a2a] focus:ring-2 focus:ring-blue-500 outline-none transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Profile Photo{' '}
                                {uploading && (
                                    <span className="text-gray-600 dark:text-gray-400 text-xs ml-2">
                                        Uploading...
                                    </span>
                                )}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-[#2a2a2a] focus:ring-2 focus:ring-blue-500 outline-none transition"
                                disabled={uploading}
                            />
                        </div>

                        <div className="flex justify-end pt-3">
                            <button
                                type="submit"
                                disabled={updating || uploading}
                                className="px-8 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg font-medium shadow-md transition-all"
                            >
                                {updating ? (
                                    <>
                                        Updating
                                        <span className="loading loading-spinner w-4 ml-2 text-white"></span>
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
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