import React from 'react';
import { Helmet } from 'react-helmet-async';
import CommonSidebar from '../shared/CommonSidebar/CommonSidebar';

// Blogs data
const blogPosts = [
    {
        id: 1,
        title: "Top 5 Articles Every Reader Should Explore in 2025",
        date: "August 10, 2025",
        author: "Echonow Team",
        description:
            "Explore our handpicked articles of the year covering culture, technology, lifestyle, and more. A curated list designed to inform and inspire.",
        image: "https://i.ibb.co.com/99QKF6qN/post-1.jpg",
    },
    {
        id: 2,
        title: "Why Daily Reading Shapes Smarter Communities",
        date: "July 25, 2025",
        author: "Editorial Desk",
        description:
            "Consistent reading not only sharpens knowledge but also builds awareness, empathy, and critical thinking in society. Learn why it matters today.",
        image: "https://i.ibb.co.com/HTFyQp1C/post-2.jpg",
    },
    {
        id: 3,
        title: "How to Choose News and Articles That Truly Matter",
        date: "June 15, 2025",
        author: "Guest Contributor",
        description:
            "With so much content online, it’s easy to get lost. Here’s how to pick trustworthy articles and reliable sources that give you real value.",
        image: "https://i.ibb.co.com/wFk1z7YC/post-3.jpg",
    },
];

const Blogs = () => {
    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>Our Blogs - Echonow</title>
                <meta
                    name="description"
                    content="Read Echonow’s latest blogs and articles covering culture, technology, lifestyle, and current issues. Stay informed with our trusted content."
                />
            </Helmet>

            {/* Content */}
            <section className="max-w-[1200px] font-jost mx-auto flex flex-col md:flex-row sm:px-4 px-2 pt-1 pb-4 sm:py-4">

                <div className="grid gap-3 px-4 sm:px-6">
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            className="flex pl-5 items-center rounded-lg border border-[#e0e0e0] dark:border-[#3f3f3f] overflow-hidden transition-shadow"
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="h-60 w-90 object-cover"
                            />
                            <div className="p-5 text-left">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-300 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {post.date} • {post.author}
                                </p>
                                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
                                    {post.description}
                                </p>
                                <button className="mt-4 inline-block text-orange-500 dark:text-orange-300 font-medium hover:underline">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* side content */}
                    <CommonSidebar />
            </section>
        </>
    );
};

export default Blogs;
