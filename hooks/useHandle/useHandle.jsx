import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDbUser from '../useDbUser/useDbUser'; 
import toast from 'react-hot-toast';

const useHandle = () => {
    const { dbUser } = useDbUser();
    const navigate = useNavigate();

    const handleNavigate = (article, id) => {
        if (!dbUser) {
            return toast.error('Please get login first!');
        };

        if (article.isPremium && dbUser?.isPremium) {
            navigate(`/article/${id}`);
        } else if (!article.isPremium) {
            navigate(`/article/${id}`);
        } else if (article.isPremium && !dbUser?.isPremium) {
            toast.error('Please get subscription first!');
        };
    };

    return handleNavigate;
};

export default useHandle;
