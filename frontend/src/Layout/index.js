import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Avatar, Button, CircularProgress, SvgIcon } from '@mui/material';

import { googleLogout } from '@react-oauth/google';

const Layout = ({ user, setUser }) => {
  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
      {user && (
        <div style={{ paddingRight: '10px', paddingTop: '5px' }}>
          <Button
            onClick={() => {
              googleLogout();

              setUser(null);
            }}
          >
            LOGOUT
          </Button>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
