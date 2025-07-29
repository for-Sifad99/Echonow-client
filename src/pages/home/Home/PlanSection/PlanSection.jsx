import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

const PlanSection = () => {
    const navigate = useNavigate();

    const handleSubscribe = () => {
        navigate("/subscription");
    };

    return (
        <section className="max-w-[1200px] mx-auto px-2 px:px-4 py-10">
            <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                    <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    <h2 className="text-2xl text-[var(--dark)] dark:text-[var(--white)] sm:text-3xl font-libreBas font-bold">
                        Choose Your Plan
                    </h2>
                    <div className="w-10 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                </div>
                <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
                    Pick the one that fits your news journey best!
                </p>
            </div>

            <div className="grid gap-6 md:gap-4 lg:gap-5 xl:gap-6 md:grid-cols-3 max-w-7xl mx-auto">
                {plans.map((plan, index) => (
                    <div key={index}
                        className="text-[var(--dark)] dark:text-[var(--white)] p-4 sm:p-10  md:p-6 lg:p-7  xl:p-8  transition duration-300 border border-[#e0e0e0] dark:border-[#3f3f3f]">
                        <h3 className="text-base/7 font-bold text-[var(--primary)] dark:text-red-400 font-oxygen">{plan.name}</h3>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">${plan.cost}</span>
                            <span className="text-base text-gray-500 dark:text-gray-300 font-libreBas">/{plan.duration} {plan.duration < 5 ? 'min' : 'days'}</span>
                        </p>
                        <p className="my-6 text-base/7 sm:text-lg md:text-base/7  text-gray-600 dark:text-gray-200 font-jost font-semibold leading-3.5">{plan.title}</p>
                        <ul className="space-y-2 text-sm/6 text-gray-800 dark:text-gray-300 font-medium font-jost">
                            {plan.features.map(f => (
                                <li className="flex gap-x-3 leading-4">✅ {f}</li>
                            ))}
                        </ul>
                        <button
                            onClick={handleSubscribe} className="mt-6 text-sm font-jost px-10 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-400 text-[var(--white)] font-semibold transition duration-700 cursor-pointer">{plan.button}</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PlanSection;
