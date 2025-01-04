// src/components/Layout/Layout.jsx

import React from 'react';

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
