import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Requests from './Requests';
import Drones from './Drones';
import add from '../../assets/home/add.webp';

const Home = ({ setActive }) => {
  return (
    <Grid container sx={{ padding: '2vmax 4vmax !important', display: 'flex' }}>
      <Grid item xs={8} sx={{ mr: 4 }}>
        <Requests setActive={setActive} />
      </Grid>
      <Grid item xs>
        <Drones />
      </Grid>
    </Grid>
  );
};

export default Home;
