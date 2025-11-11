import React, { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from '../firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [popupInProgress, setPopupInProgress] = useState(false);

    // Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign In
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign In
    const googleSignIn = async () => {
        // Prevent multiple simultaneous popup requests
        if (popupInProgress) {
            throw new Error('A popup request is already in progress');
        }
        
        setLoading(true);
        setPopupInProgress(true);
        
        try {
            const provider = new GoogleAuthProvider();
            // Add custom parameters to prevent multiple popups
            provider.setCustomParameters({
                prompt: 'select_account'
            });
            
            const result = await signInWithPopup(auth, provider);
            return result;
        } catch (error) {
            // Handle specific Firebase errors
            if (error.code === 'auth/cancelled-popup-request') {
                // This error occurs when multiple popups are opened
                // We can ignore this as it's handled by preventing multiple popups
                console.warn('Popup request was cancelled');
                throw new Error('Login popup was closed or cancelled');
            } else if (error.code === 'auth/popup-blocked') {
                throw new Error('Popup was blocked by browser. Please allow popups for this site.');
            } else {
                throw error;
            }
        } finally {
            setPopupInProgress(false);
            setLoading(false);
        }
    };

    // Update Profile
    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    };

    // Reset Password
    const forgotPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    // Sign Out
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);

            if (currentUser) {
                const token = await currentUser.getIdToken(true); // force refresh
                localStorage.setItem('access-token', token);
            } else {
                localStorage.removeItem('access-token');
            }

            setLoading(false);
        });

        return () => unSubscribe();
    }, []);

    // All auth info which need to use all over the website
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        updateUserProfile,
        forgotPassword,
        signOutUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;