import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogData } from './Blogs';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogData[parseInt(id)];

  // Date format utility
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark2-bg)] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-[var(--white)] mb-4">Blog post not found</h2>
            <button 
              onClick={() => navigate('/our-blogs')}
              className="px-4 py-2 bg-[var(--primary)] text-[var(--white)] rounded-lg hover:bg-[#d33] transition duration-300"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Split description into paragraphs for better readability
  const renderDescription = () => {
    // If the description contains explicit paragraph breaks, use those
    if (blog.description.includes('\n\n')) {
      return blog.description.split('\n\n').map((paragraph, index) => (
        <p key={index} className="mb-6 text-lg leading-relaxed last:mb-0">
          {paragraph}
        </p>
      ));
    }
    
    // Otherwise, split into sentences and create paragraphs of 3-4 sentences each
    const sentences = blog.description.match(/[^\.!?]+[\.!?]+/g) || [blog.description];
    const paragraphs = [];
    
    for (let i = 0; i < sentences.length; i += 3) {
      const paragraphSentences = sentences.slice(i, i + 3);
      paragraphs.push(
        <p key={i} className="mb-6 text-lg leading-relaxed">
          {paragraphSentences.join(' ')}
        </p>
      );
    }
    
    return paragraphs;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark2-bg)] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button 
          onClick={() => navigate('/our-blogs')}
          className="flex items-center mb-6 text-[var(--primary)] dark:text-[var(--accent-white)] hover:underline"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </button>

        {/* Blog post content */}
        <article className="bg-white dark:bg-[var(--dark-bg)] rounded-lg shadow-lg overflow-hidden">
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

          {/* Article Content */}
          <div className="p-6 sm:p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 dark:text-[var(--white)] mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Date */}
            <p className="text-base text-gray-500 dark:text-[var(--accent-white)] mb-8">
              Published on: {formatDate(blog.date)}
            </p>

            {/* Description */}
            <div className="text-gray-700 dark:text-[var(--accent-white)] font-jost">
              {renderDescription()}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;