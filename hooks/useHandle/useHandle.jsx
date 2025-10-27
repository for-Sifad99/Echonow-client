import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDbUser from '../useDbUser/useDbUser'; 
import toast from 'react-hot-toast';

const useHandle = () => {
    const { dbUser } = useDbUser();
    const navigate = useNavigate();

    const handleNavigate = (article, id) => {
        // Allow navigation to non-premium articles without login
        if (!article.isPremium) {
            navigate(`/article/${id}`);
            return;
        }
        
        // For premium articles, check user status
        if (!dbUser) {
            return toast.error('Please login to view premium articles!');
        };

        if (dbUser?.isPremium) {
            navigate(`/article/${id}`);
        } else {
            toast.error('Please get subscription first!');
        };
    };

    return handleNavigate;
};

export default useHandle;
