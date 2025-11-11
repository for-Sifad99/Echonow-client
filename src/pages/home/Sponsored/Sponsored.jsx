import React from 'react';
import sponsored from '../../../assets/sponsored.jpg';

const Sponsored = () => {
  return (
    <div className='w-full max-w-3xl 2xl:max-w-4xl mx-auto px-2 sm:px-4 py-7 sm:py-9 md:py-11 lg:py-12 flex flex-col items-center justify-center gap-4'>
      {/* Title */}
      <h2 className='font-oxygen text-xs text-[var(--dark)] dark:text-[var(--white)]'>-Sponsored-</h2>
      
      <img 
        src={sponsored} 
        className='mx-auto w-full blur-sm'
        alt="Sponsored" 
        onLoad={(e) => e.target.classList.remove('blur-sm')}
        onError={(e) => {
          e.target.src = '/default-article.png';
          e.target.classList.remove('blur-sm');
        }}
      />
    </div>
  );
};

export default Sponsored;