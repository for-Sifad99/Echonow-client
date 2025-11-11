import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight, BsThreeDots } from 'react-icons/bs';
import blog1 from '../../assets/blog-1.jpeg';
import blog2 from '../../assets/blog-2.jpg';
import blog3 from '../../assets/blog-3.jpg';
import blog4 from '../../assets/blog-4.jpg';
import blog5 from '../../assets/blog-5.jpg';
import Skeleton from 'react-loading-skeleton';

export const blogData = [
  {
    picture: blog1,
    title: "Climate Change: The Rising Cost of Ignoring Nature",
    description:
      "As global temperatures continue to rise, communities around the world are witnessing unprecedented environmental shifts. From prolonged droughts in Africa to severe flooding in South Asia, the effects of climate change are reshaping our daily lives. Experts warn that if immediate steps are not taken, we could face irreversible damage to ecosystems that sustain us. Governments are being urged to adopt green policies, while individuals are encouraged to make sustainable lifestyle choices like reducing plastic use and switching to renewable energy. The time for discussion is over—action is the only solution.",
    date: "2025-11-10",
  },
  {
    picture: blog2,
    title: "AI Revolution: How Artificial Intelligence Is Changing Daily Life",
    description:
      "Artificial Intelligence has moved far beyond science fiction. From healthcare and education to transportation and entertainment, AI is now a silent partner in most sectors. Smart assistants predict your schedule, while hospitals use machine learning to detect diseases early. However, with the rise of automation, concerns about job loss and ethical responsibility are growing. Experts suggest a balanced approach: embracing technology while ensuring human values remain central. The AI revolution isn't coming—it's already here.",
    date: "2025-11-09",
  },
  {
    picture: blog3,
    title: "Global Politics: Power Shifts in the 21st Century",
    description:
      "The geopolitical map of the world is changing faster than ever. Nations are forming new alliances while trade wars and digital conflicts redefine power. The United States and China continue to compete for global dominance, while smaller nations focus on economic independence. Political analysts say the new world order will not be defined by military strength alone but by technological innovation and environmental policy. As diplomacy becomes more digital, leaders must adapt to a rapidly evolving political landscape.",
    date: "2025-11-08",
  },
  {
    picture: blog4,
    title: "Health Breakthrough: A New Era of Personalized Medicine",
    description:
      "Medical science is entering a new age where treatments can be tailored to an individual's genetic makeup. This shift toward personalized medicine promises to eliminate trial-and-error prescribing and improve recovery rates. Scientists have already developed genetic-based therapies for cancer, diabetes, and heart disease. However, the cost and accessibility of these treatments remain major challenges. The future of healthcare lies in collaboration between researchers, policymakers, and private industries to make precision medicine affordable for all.",
    date: "2025-11-07",
  },
  {
    picture: blog5,
    title: "Global Economy 2025: Challenges and Opportunities",
    description:
      "After a decade of uncertainty, the global economy is showing signs of steady recovery. Emerging markets like India and Vietnam are driving industrial growth, while Western economies focus on technological expansion. However, inflation, resource shortages, and cyber threats remain pressing issues. Economists believe that digital transformation and sustainable investments will define the next phase of economic stability. The world must balance growth with responsibility to ensure a fair future for all.",
    date: "2025-11-06",
  }
];

// ২. BlogCard কম্পোনেন্ট
const BlogCard = ({ blog, index, isLoading }) => {
  // Date format utility
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto mb-12 bg-white dark:bg-[var(--dark-bg)] shadow-xl rounded-lg overflow-hidden">
        <Skeleton className="w-full" style={{ aspectRatio: '22/9' }} />
        <div className="p-6">
          <Skeleton width={300} height={30} className="mb-2" />
          <Skeleton width={200} height={20} className="mb-4" />
          <Skeleton count={3} className="mb-6" />
          <div className="flex items-center justify-start space-x-4">
            <Skeleton width={150} height={40} />
            <Skeleton width={30} height={30} circle={true} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-12 bg-white dark:bg-[var(--dark-bg)] shadow-xl rounded-lg overflow-hidden">
      {/* Blog Image */}
      <img
        src={blog.picture}
        alt={blog.title}
        className="w-full h-auto object-cover blur-sm transition-all duration-500"
        style={{ aspectRatio: '22/9' }}
        onLoad={(e) => e.target.classList.remove('blur-sm')}
        onError={(e) => {
          // Fallback to a default image if needed
          e.target.src = '/default-article.png';
          e.target.classList.remove('blur-sm');
        }}
      />

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-serif font-semibold text-gray-800 dark:text-[var(--white)] mb-2 leading-tight hover:text-gray-900 dark:hover:text-[var(--accent-white)] cursor-pointer">
          {blog.title}
        </h2>

        {/* Date (Added for better context) */}
        <p className="text-sm text-gray-500 dark:text-[var(--accent-white)] mb-4">
          Published on: {formatDate(blog.date)}
        </p>

        {/* Description */}
        <p className="text-gray-600 dark:text-[var(--accent-white)] mb-6 line-clamp-3">
          {blog.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-start space-x-4">
          {/* Continue Reading Button */}
          <Link to={`/our-blogs/${index}`} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] rounded-lg hover:bg-[#d33] transition duration-150 ease-in-out shadow-md">
            <span>Continue Reading</span>
            <BsArrowRight className="w-4 h-4" />
          </Link>
          
          {/* Three Dots Icon (like in the image) */}
          <button className="p-2 text-gray-500 dark:text-[var(--accent-white)] hover:text-gray-700 dark:hover:text-[var(--white)] rounded-full hover:bg-gray-100 dark:hover:bg-[var(--dark-secondary)] transition duration-150 ease-in-out">
            <BsThreeDots className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ৩. BlogPage কম্পোনেন্ট (যেটি সবকিছু রেন্ডার করবে)
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্লগ.json থেকে ডেটা লোড করার লজিক
  useEffect(() => {
    // ডেমো: ডেটা লোড করার জন্য একটি ছোট delay
    setTimeout(() => {
      setBlogs(blogData); // সরাসরি ইম্পোর্ট করা ডেটা ব্যবহার করছি
      setLoading(false);
    }, 500);
  }, []);
  
  // ছবির মতো হেডিং এবং আইকন
  const headerIcon = (
    <div className="flex items-center justify-center w-6 h-6 ml-2 rounded-full border border-gray-300 dark:border-[var(--accent)] text-gray-500 dark:text-[var(--accent-white)] text-xs">
      i
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark2-bg)] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header - 'Writing' হেডিং */}
          <header className="flex items-center justify-between mb-10 border-b border-gray-200 dark:border-[var(--accent)] pb-3">
            <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-[var(--white)]">
              <Skeleton width={150} />
            </h1>
            <div className="flex items-center justify-center w-6 h-6 ml-2 rounded-full border border-gray-300 dark:border-[var(--accent)] text-gray-500 dark:text-[var(--accent-white)] text-xs">
              <Skeleton circle={true} width={20} height={20} />
            </div>
          </header>

          {/* Blog Posts Container */}
          <main className="space-y-12">
            {[...Array(3)].map((_, index) => (
              <BlogCard key={index} isLoading={true} />
            ))}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark2-bg)] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header - 'Writing' হেডিং */}
        <header className="flex items-center justify-between mb-10 border-b border-gray-200 dark:border-[var(--accent)] pb-3">
          <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-[var(--white)]">
            Writing
          </h1>
          {headerIcon} {/* ডানদিকে ছোট 'i' আইকন */}
        </header>

        {/* Blog Posts Container */}
        <main className="space-y-12">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} index={index} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Blog;