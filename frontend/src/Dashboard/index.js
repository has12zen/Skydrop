import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DashHome from './Components/Home';
import Currents from './Components/Currents';
import './Styles/Dashboard.css';
import {
  Home,
  HourglassTop,
  History,
  Logout,
  LocationOn,
} from '@mui/icons-material';

import { getAuth, signOut } from 'firebase/auth';

import db from '../db';

const Dashboard = ({ setUser }) => {
  const [active, setActive] = useState(0);

  const auth = getAuth();

  const MenuItem = (name, icon, idx, onClickHandler) => {
    return (
      <Box
        className={`menuItem ${idx === active ? 'activeMenu' : ''}`}
        onClick={onClickHandler}
      >
        <Box sx={{ marginRight: '10px' }}>{icon}</Box>
        <Typography
          variant="subtitle1"
          container="div"
          sx={{ fontWeight: '700' }}
        >
          {name}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ height: '100vh', backgroundColor: '#33906c' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={2} sx={{ paddingTop: '20px' }}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Sky Drop
          </Typography>
          <Box className="menuItemCont">
            {MenuItem('Home', <Home />, 0, () => {
              setActive(0);
            })}
            {MenuItem('Current Requests', <HourglassTop />, 1, () => {
              setActive(1);
            })}
            {MenuItem('Package History', <History />, 2, () => {
              setActive(2);
            })}
            {MenuItem('Master Map', <LocationOn />, 3, () => {
              setActive(3);
            })}
            {MenuItem('Logout', <Logout />, 4, () => {
              signOut(auth)
                .then(() => {
                  setUser(null);
                })
                .catch((error) => {
                  alert('Failed to logout. Try again later!');
                });
            })}
          </Box>
        </Grid>
        <Grid item xs sx={{ padding: '15px 15px 15px 0px' }}>
          <Box className="dashContent">
            {active === 0 && <DashHome setActive={setActive} />}
            {active === 1 && <Currents />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
