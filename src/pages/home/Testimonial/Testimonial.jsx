import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    title: "Excellent product!",
    desc: "The service quality and features are top-notch, truly exceeded my expectations.",
    name: "Mr Johnson",
    rating: 5,
  },
  {
    title: "Great experience!",
    desc: "I loved the design and usability. Everything feels smooth and professional.",
    name: "David Miller",
    rating: 4,
  },
  {
    title: "Highly recommended!",
    desc: "This platform makes my daily workflow much easier and more productive.",
    name: "Sophia Lee",
    rating: 5,
  },
  {
    title: "Outstanding support!",
    desc: "The support team is very responsive and solved my issue in no time at all.",
    name: "Michael Lee",
    rating: 4,
  },
];

export default function TestimonialSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3s skeleton
    return () => clearTimeout(timer);
  }, []);

  return (
      <section className="max-w-[1200px] mx-auto px-2 px:px-4 py-7 sm:py-9 md:py-11 lg:py-12">

      {/* Title */}
      <div className="text-center mb-5 sm:mb-6 md:mb-8">
        <div className="flex justify-center items-center gap-1.5 sm:gap-3">
          <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
          <h2 className="text-xl text-[var(--dark)] dark:text-[var(--white)] sm:text-3xl font-libreBas font-bold">
           Reviews
          </h2>
          <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
        </div>
        <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
        Let's see what our users say!
        </p>
      </div>

      <div className="grid gap-2 sm:gap-3 xl:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="text-[var(--dark)] dark:text-[var(--white)] border border-[#e0e0e0] dark:border-[#3f3f3f] p-6 shadow-sm flex flex-col justify-between"
          >
            {loading ? (
              <div>
                <Skeleton width="70%" height={20} />
                <Skeleton count={3} className="mt-3" />
                <div className="flex items-center gap-3 mt-6">
                  <Skeleton circle width={40} height={40} />
                  <Skeleton width={100} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-oxygen text-lg font-semibold">{item.title}</h3>
                  <p className="font-jost mt-2 text-sm text-gray-600 dark:text-gray-200">{item.desc}</p>
                </div>

                {/* bottom row */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1">
                    {/* round green div */}
                      <div className="h-8 w-8 xl:h-10 xl:w-10 rounded-full bg-[#f22d3a]"></div>
                      <span className="text-xs xl:text-sm font-medium font-libreBas">{item.name}</span>
                  </div>
                  {/* rating stars */}
                  <div className="flex text-orange-500">
                    {Array(item.rating)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
