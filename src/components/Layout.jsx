import React, { useState } from 'react';
import Navbar from './Navbar';

const Layout = ({children, isPencilWrapper}) => {
  return (
    <div>
      <header>
        <Navbar isPencilWrapper={isPencilWrapper}/>
      </header>

      <main>
        {children}
      </main>

      <footer>
        <p>&copy; 2024 Price Offer</p>
      </footer>
    </div>
  );
};

export default Layout;
