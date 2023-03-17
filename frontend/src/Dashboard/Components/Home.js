import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import Requests from './Requests';
import Drones from './Drones';
import add from '../Images/add.webp';

const Home = ({ setActive }) => {
  return (
    <Grid container sx={{ padding: '2vmax 4vmax !important', display: 'flex' }}>
      <Grid item sx={{ mr: 4 }}>
        <Requests setActive={setActive} />
      </Grid>
      <Grid item xs>
        <Drones />
        <Box sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
          <Button
            startIcon={<img src={add} alt="add" width={40} />}
            variant="contained"
            sx={{ fontWeight: '700', backgroundColor: "#164068", color: "white" }}
          >
            <Typography sx={{fontWeight: "700"}}>Add Drones</Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
