import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaUserCheck, FaUserShield } from "react-icons/fa";
import CountUp from "react-countup";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// All stat cards
const StatCard = ({ title, icon, count, color, loading }) => {
    if (loading) {
        return (
            <div className="p-6 flex flex-col gap-3 w-full border border-[#e0e0e0] dark:border-[#3f3f3f]">
                <div className="flex items-center gap-6">
                    <Skeleton circle width={80} height={80} />
                    <Skeleton width={60} height={40} />
                </div>
                <Skeleton width={150} height={25} />
            </div>
        );
    }
    
    return (
        <div className="p-6 flex flex-col gap-3 w-full border border-[#e0e0e0] dark:border-[#3f3f3f]">
            <div className="flex items-center gap-6">
                <div className={`w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl ${color} text-[var(--white)] dark:text-[var(--dark)]`}>
                    {icon}
                </div>
                <p className="text-5xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 font-libreBas">
                    <CountUp end={count} duration={2} />
                </p>
            </div>
            <h3
                className="text-[28px] sm:text-xl md:text-2xl font-semibold text-[var(--dark)] dark:text-[var(--white)] font-jost">{title}</h3>
        </div>
    );
};

const InfoCards = () => {
    const axiosPublic = useAxiosPublic();

    // Fetching user count info
    const { data = {}, isLoading } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/users-count-info");
            return res.data;
        },
    });

    const { totalUsers = 0, premiumUsers = 0, normalUsers = 0 } = data;

    return (
        <section className="max-w-4xl mx-auto px-2 sm:px-4 py-7 sm:py-9 md:py-11 lg:py-12">
            {/* Title */}
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
                <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                    <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    {isLoading ? (
                        <Skeleton width={200} height={30} />
                    ) : (
                        <h2 className="text-xl sm:text-3xl font-libreBas font-bold text-[var(--dark)] dark:text-[var(--white)]">
                            User Overview
                        </h2>
                    )}
                    <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                </div>
                {isLoading ? (
                    <Skeleton width={150} height={20} className="mt-2 mx-auto" />
                ) : (
                    <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
                        Quick stats of all, premium, and normal users
                    </p>
                )}
            </div>

            {/* Cards content */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
                <StatCard
                    title="All total users"
                    icon={<FaUsers />}
                    count={totalUsers}
                    color="bg-blue-500"
                    loading={isLoading}
                />
                <StatCard
                    title="Normal users"
                    icon={<FaUserCheck />}
                    count={normalUsers}
                    color="bg-emerald-500"
                    loading={isLoading}
                />
                <StatCard
                    title="Premium users"
                    icon={<FaUserShield />}
                    count={premiumUsers}
                    color="bg-yellow-500"
                    loading={isLoading}
                />
            </div>
        </section>
    );
};

export default InfoCards;