import React from 'react';
import { Outlet } from 'react-router';
import Header from '../pages/shared/Header/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet className='min-h-screen' />
      <Footer />
    </div>
  );
};

export default Root;