import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, CircularProgress } from '@mui/material';
import axios from 'axios';
// import Requests from './Requests';
// import Drones from './Drones';

const Home = ({ user }) => {
  const [activePickups, setActivePickups] = useState(null);

  useEffect(() => {
    console.log({ user });
  }, []);

  const fetchActivePickups = () => {
    axios
      .get('/api/requests')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ padding: '2vmax 4vmax !important', width: '100%' }}>
      <Box xs={12} style={{ display: 'flex' }}>
        <Avatar src={user.image} style={{ width: '120px', height: '120px' }} />
        <div style={{ marginLeft: '20px', marginTop: '20px' }}>
          <div style={{ fontWeight: '600', fontSize: '24px' }}>{user.name}</div>
          <div style={{ fontSize: '18px' }}>{user.email}</div>
        </div>
      </Box>

      <Box style={{ marginTop: '40px', width: '100%' }}>
        <Typography variant="h4">Active Pickups</Typography>
        <hr />
        {!activePickups ? (
          <div
            style={{
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div></div>
        )}
      </Box>
    </Box>
  );
};

export default Home;
