import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
    const [payInfo, setPayInfo] = useState([1, 1]);
    const navigate = useNavigate();

    const handleSubscribe = () => {
        // Navigate to payment page with duration
        const duration = Number(payInfo[0]);
        const cost = Number(payInfo[1]);
        navigate(`/payment/${duration}/${cost}`);
    };

    return (
        <div className="relative isolate bg-white px-4 py-4 sm:py-10 lg:px-8">
            <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden pl-20 sm:px-36 blur-3xl" aria-hidden="true">
                <div className="mx-auto aspect-1000/650 w-100.75 bg-linear-to-tr from-[#ff0011] to-[#fcbabf] opacity-30" ></div>
            </div>
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base/7 font-semibold text-[var(--primary)] font-oxygen">Pricing</h2>
                <p className="mt-4 sm:mt-8 text-3xl font-semibold tracking-tight text-balance text-[var(--dark)] sm:text-6xl leading-6 sm:leading-12 font-libreBas">Choose the right plan for you</p>
            </div>
            <p className="mx-auto mt-3 sm:mt-6 max-w-sm sm:max-w-2xl text-center text-base text-pretty text-gray-600 sm:text-xl/8 leading-4 sm:leading-6 font-jost">Choose an affordable plan that’s packed with the best features.</p>
            <div className="max-w-5xl mx-auto pt-10 sm:pt-16 pb-10">
                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="rounded-3xl bg-white/60 p-8 ring-1 hover:ring-2 ring-gray-900/10 hover:ring-red-100 transition duration-300">
                        <h3 className="text-base/7 font-bold text-[var(--primary)] font-oxygen">Basic</h3>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span className="text-5xl font-semibold tracking-tight text-gray-900">$1</span>
                            <span className="text-base text-gray-500 font-libreBas">/1 min</span>
                        </p>
                        <p className="my-6 text-base/7 text-gray-600 font-jost font-semibold">Perfect for assignment checking</p>
                        <ul className="space-y-1 text-sm/6 text-gray-800 font-medium font-jost">
                            <li className="flex gap-x-3">✅ Basic analytics</li>
                            <li className="flex gap-x-3">✅ Single device access</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl bg-white/60 p-8 ring-1 hover:ring-2 ring-gray-900/10 hover:ring-red-100 transition duration-300">
                        <h3 className="text-base/7 font-bold text-[var(--primary)] font-oxygen">Standard</h3>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span className="text-5xl font-semibold tracking-tight text-gray-900">$15</span>
                            <span className="text-base text-gray-500 font-libreBas">/5 days</span>
                        </p>
                        <p className="my-6 text-base/7 text-gray-600 font-jost font-semibold">Great for short-term premium access</p>
                        <ul className="space-y-1 text-sm/6 text-gray-800 font-medium font-jost">
                            <li className="flex gap-x-3">✅ Up to 5 devices</li>
                            <li className="flex gap-x-3">✅ Premium support</li>
                            <li className="flex gap-x-3">✅ Access to all features</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl bg-white/60 p-8 ring-1 hover:ring-2 ring-gray-900/10 hover:ring-red-100 transition duration-300">
                        <h3 className="text-base/7 font-bold text-[var(--primary)] font-oxygen">Pro</h3>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span className="text-5xl font-semibold tracking-tight text-gray-900">$25</span>
                            <span className="text-base text-gray-500 font-libreBas">/10 days</span>
                        </p>
                        <p className="my-6 text-base/7 text-gray-600 font-jost font-semibold">Best value for extended use</p>
                        <ul className="space-y-1 text-sm/6 text-gray-800 font-medium font-jost">
                            <li className="flex gap-x-3">✅ Unlimited device access</li>
                            <li className="flex gap-x-3">✅ Priority support</li>
                            <li className="flex gap-x-3">✅ Advanced analytics</li>
                            <li className="flex gap-x-3">✅ Bonus features</li>
                        </ul>
                    </div>
                </div>

                {/* Subscription Button */}
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {/* Dropdown */}
                    <div className="flex justify-center">
                        <select
                            value={payInfo.join("|")}
                            onChange={(e) => {
                                const [duration, cost] = e.target.value.split("|");
                                setPayInfo([duration, cost]);
                            }}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="1|1">1 Minute - $1</option>
                            <option value="5|15">5 Days - $15</option>
                            <option value="10|25">10 Days - $25</option>
                        </select>

                    </div>
                    <button
                        onClick={handleSubscribe}
                        className="px-6 py-2.5 bg-gradient-to-r from-red-400 to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white transition duration-700 cursor-pointer font-semibold rounded-lg"
                    >
                        Take Subscription
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;