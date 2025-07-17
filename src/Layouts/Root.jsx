import React from 'react';
import { Outlet } from 'react-router';
import Header from '../pages/shared/Header/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />  {/* Top part */}

      <main className="flex-1">
        <Outlet />  {/* Main content */}
      </main>

      <Footer />  {/* Bottom part */}
    </div>
  );
};

export default Root;