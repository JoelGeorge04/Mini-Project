// src/components/Layout/Layout.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Layout.css';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the current path is login or signup
  const showHeader = location.pathname === '/login' || location.pathname === '/signup'|| location.pathname === '/';

  return (
    <div>
      {showHeader && (
        <header>
          <h1>Booking.Go</h1>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
