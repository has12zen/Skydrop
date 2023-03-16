import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = ({ user, setUser }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      <Outlet />
    </div>
  );
};

export default Layout;
