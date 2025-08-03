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
import { auth } from '../firebase/firebase.config'

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

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
    const googleSignIn = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
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

    // Firebase Auth Observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);
            console.log('this form observer:', currentUser);

            if (currentUser) {
                const token = await currentUser.getIdToken();
                localStorage.setItem('access-token', token);
            } else {
                localStorage.removeItem('access-token');
            }

            setLoading(false);
        });

        return () => unSubscribe();
    }, []);

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
