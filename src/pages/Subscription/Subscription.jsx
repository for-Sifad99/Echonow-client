import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
    const [payInfo, setPayInfo] = useState([1, 1]);
    const navigate = useNavigate();

    const plans = [
        {
            name: "Basic",
            cost: 1,
            duration: 1,
            title: 'Perfect for normal access',
            features: [
                "View all approved public articles",
                "Search and filter articles",
                "Access non-premium content",
                "Submit 1 article only",
                "Basic dashboard features",
                "Profile info update",
            ],
            button: "Get Started",
        },
        {
            name: "Standard",
            cost: 15,
            duration: 5,
            title: 'Great for short-term premium access',
            features: [
                "Unlock premium articles",
                "Unlimited article submissions",
                "Premium article designs",
                "Enabled detail access",
                "Premium articles route",
                "Priority approval & support",
            ],
            button: "Subscribe Now",
        },
        {
            name: "Pro",
            cost: 25,
            duration: 10,
            title: 'Best value for extended use',
            features: [
                "Family-wide access",
                "View all trending & premium content",
                "Unlimited posts per user",
                "Advanced stat tracking",
                "Extended subscription options",
                "Early feature access",
            ],
            button: "Explore Plan",
        }
    ];

    const handleSubscribe = () => {
        // Navigate to payment page with duration
        const duration = Number(payInfo[0]);
        const cost = Number(payInfo[1]);
        navigate(`/payment/${duration}/${cost}`);
    };

    return (
        <div className="relative isolate bg-white dark:bg-[var(--dark2-bg)] px-4 py-4 sm:py-10 lg:px-8">
            <div className="dark:hidden absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden pl-20 sm:px-36 blur-3xl" aria-hidden="true">
                <div className="mx-auto aspect-1000/650 w-100.75 bg-linear-to-tr from-[#ff0011] to-[#fcbabf] opacity-30" ></div>
            </div>
            <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                    <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    <h2 className="text-2xl text-[var(--dark)] dark:text-[var(--white)] sm:text-3xl font-libreBas font-bold">
                        Pricing
                    </h2>
                    <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                </div>
                <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
                    Choose an affordable plan that’s packed with the best features.
                </p>
            </div>
            <div className="max-w-5xl mx-auto">
                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <div key={index}
                            className="text-[var(--dark)] dark:text-[var(--white)] p-4 sm:p-10  md:p-6 lg:p-7 xl:p-8  transition duration-300 border border-[#e0e0e0] dark:border-[#3f3f3f]">
                            <h3 className="text-base/7 font-bold text-[var(--primary)] dark:text-red-400 font-oxygen">{plan.name}</h3>
                            <p className="mt-4 flex items-baseline gap-x-2">
                                <span className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">${plan.cost}</span>
                                <span className="text-base text-gray-500 dark:text-gray-300 font-libreBas">/{plan.duration} {plan.duration < 5 ? 'min' : 'days'}</span>
                            </p>
                            <p className="my-6 text-base/7 sm:text-lg md:text-base/7  text-gray-600 dark:text-gray-200 font-jost font-semibold leading-3.5">{plan.title}</p>
                            <ul className="space-y-2 text-sm/6 text-gray-800 dark:text-gray-300 font-medium font-jost">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex gap-x-3 leading-4">✅ {f}</li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleSubscribe(setPayInfo([plan.duration, plan.cost]))} className="mt-6 text-sm font-jost px-10 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-400 text-[var(--white)] font-semibold transition duration-700 cursor-pointer">{plan.button}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subscription;