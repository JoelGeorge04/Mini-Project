// src/components/Layout/Layout.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Welcome to the Mini-Project</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
