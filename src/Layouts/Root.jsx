import React from 'react';
import { Outlet } from 'react-router';
import ScrollNavbar from '../pages/shared/Header/TopNavbar';
import Navbar from '../pages/shared/Header/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const Root = () => {
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