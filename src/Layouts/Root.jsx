import React, { useState, useEffect, useContext, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollNavbar from '../pages/shared/Header/TopNavbar';
import Navbar from '../pages/shared/Header/Navbar';
import Footer from '../pages/shared/Footer/Footer';
import Loader from '../pages/shared/Loader/Loader';
import { AuthContext } from '../../contexts/AuthContext';

const Root = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { loading: authLoading } = useContext(AuthContext);
  const loaderTimeoutRef = useRef(null);
  const hasInitialLoadCompleted = useRef(false);

  // Handle initial load only
  useEffect(() => {
    // Don't show loader for route transitions after initial load
    if (hasInitialLoadCompleted.current) {
      return;
    }
    
    // Show loader on initial load only
    setLoading(true);
    
    // Clear any existing timeout
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current);
    }
    
    // Set minimum loading time for better UX
    loaderTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      hasInitialLoadCompleted.current = true;
    }, 3000);

    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, []); // Only trigger on initial mount, not on location changes

  // Handle auth loading state
  useEffect(() => {
    if (!authLoading && !hasInitialLoadCompleted.current) {
      // Add slight delay to ensure smooth transition
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
      
      loaderTimeoutRef.current = setTimeout(() => {
        setLoading(false);
        hasInitialLoadCompleted.current = true;
      }, 3000);
    }
  }, [authLoading]);

  // Show loader during initial load and auth loading
  if (loading || authLoading) {
    return <Loader minDisplayTime={3000} />;
  }

  return (
    <section className="flex flex-col min-h-screen bg-[var(--white)] dark:bg-[var(--dark2-bg)]">
      {/* Header */}
      <ScrollNavbar /> 
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <Outlet /> 
      </main>

      {/* Footer */}
      <Footer />  
    </section>
  );
};

export default Root;