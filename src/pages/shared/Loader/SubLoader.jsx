import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; 

const SubLoader = ({ text = 'LOADING...', size = 'text-2xl', className = '' }) => {
    return (
        <div className={clsx('w-fit font-sans leading-none', className)}>
            <div className={clsx('loader-text', size)}>
                {text}
            </div>
        </div>
    );
};

SubLoader.propTypes = {
    text: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
};

export default SubLoader;

