import React, { useEffect, useState, useRef } from "react";
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
  {
    title: "Impressive features!",
    desc: "The range of tools available is impressive and they work seamlessly together.",
    name: "Emma Thompson",
    rating: 5,
  },
  {
    title: "User-friendly interface!",
    desc: "Even as a beginner, I found the platform intuitive and easy to navigate.",
    name: "James Wilson",
    rating: 4,
  },
];

export default function TestimonialSection() {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const intervalRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2s minimum skeleton
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!loading) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000); // Change every 5 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [loading]);

  // Handle manual navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    // Reset auto-rotation timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    // Reset auto-rotation timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    
    // Reset auto-rotation timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
  };

  // Get visible testimonials for carousel (responsive number of items)
  const getVisibleTestimonials = () => {
    // Determine how many testimonials to show based on screen size
    const testimonialsToShow = windowWidth < 640 ? 1 : 
                              windowWidth < 768 ? 2 : 
                              windowWidth < 1024 ? 3 : 4;
    
    const visible = [];
    for (let i = 0; i < testimonialsToShow; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], originalIndex: index });
    }
    return visible;
  };

  return (
    <section className="max-w-[1200px] mx-auto px-2 sm:px-4 py-7 sm:py-9 md:py-11 lg:py-12 relative">
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

      {/* Carousel container */}
      <div className="relative overflow-hidden">
        {/* Navigation arrows */}
        <button 
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[var(--dark)] dark:bg-[var(--white)] text-[var(--white)] dark:text-[var(--dark)] rounded-full p-2 shadow-lg hover:bg-[var(--primary)] transition-all duration-300 opacity-70 hover:opacity-100"
          aria-label="Previous testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[var(--dark)] dark:bg-[var(--white)] text-[var(--white)] dark:text-[var(--dark)] rounded-full p-2 shadow-lg hover:bg-[var(--primary)] transition-all duration-300 opacity-70 hover:opacity-100"
          aria-label="Next testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Testimonials grid with responsive columns */}
        <div className="grid gap-2 sm:gap-3 xl:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-10">
          {loading ? (
            // Skeleton loading for different screen sizes
            Array.from({ length: windowWidth < 640 ? 1 : 
                               windowWidth < 768 ? 2 : 
                               windowWidth < 1024 ? 3 : 4 }).map((_, idx) => (
              <div key={idx} className="text-[var(--dark)] dark:text-[var(--white)] border border-[#e0e0e0] dark:border-[#3f3f3f] p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <Skeleton width="70%" height={20} />
                  <Skeleton count={3} className="mt-3" />
                  <div className="flex items-center gap-3 mt-6">
                    <Skeleton circle width={40} height={40} />
                    <Skeleton width={100} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            getVisibleTestimonials().map((item, idx) => (
              <div
                key={`${item.originalIndex}-${idx}`}
                className="text-[var(--dark)] dark:text-[var(--white)] border border-[#e0e0e0] dark:border-[#3f3f3f] p-6 shadow-lg flex flex-col justify-between transition-all duration-700 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-oxygen text-lg font-semibold">{item.title}</h3>
                    <p className="font-jost mt-2 text-sm text-gray-600 dark:text-gray-200">{item.desc}</p>
                  </div>

                  {/* bottom row */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      {/* round green div */}
                        <div className="h-8 w-8 xl:h-10 xl:w-10 rounded-full bg-[#f22d3a] blur-sm"
                          onLoad={(e) => e.target.classList.remove('blur-sm')}
                          onError={(e) => e.target.classList.remove('blur-sm')}
                        ></div>
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
              </div>
            ))
          )}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'bg-[var(--primary)] scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}