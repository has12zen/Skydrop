import React from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import Requests from './Requests';
import Drones from './Drones';
import add from '../Images/add.webp';

const Home = ({setActive}) => {
  return (
    <Grid container sx={{ padding: '2vmax 4vmax !important', display: 'flex' }}>
      <Grid item sx={{ mr: 4 }}>
        <Requests setActive={setActive} />
      </Grid>
      <Grid item xs>
        <Drones />
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
          <Paper
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1,
              cursor: 'pointer',
            }}
            elevation={3}
          >
            <img src={add} alt="add" width={40} />
            <Typography
              variant="subtitle1"
              container="div"
              sx={{ fontWeight: '700', ml: 1 }}
            >
              Add Drones
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
