import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Homepage from '../pages/Homepage/Homepage';
const AppLayout = () => {
  return (
    <div>
      <Navbar/>
      <Homepage/>
      <Footer />
    </div>
  )
};

export default AppLayout;
