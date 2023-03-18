import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import Requests from './Requests';
import Drones from './Drones';
import add from '../../assets/home/add.webp';
import { getAllOrders } from '../Helper/queries';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const props = useOutletContext();
  const reqs = props[0];
  const drone = props[1];
  console.log('Home', { reqs });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleYes = async () => {
    setOpen(false);
    setLoading(true);
    const resp = await axios.post('/api/drones/add');
    drone.data.push(resp.data.data);
    setLoading(false);
  };

  return (
    <Grid container sx={{ padding: '2vmax 4vmax !important', display: 'flex' }}>
      <Backdrop open={loading} sx={{color: '#fff', zIndex: 1000}}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>
          <Typography sx={{ fontWeight: '700' }}>Add Drone</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">
              Are you sure you want to add one more drone ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: 'flex', justifyContent: 'space-around', pb: 3 }}
        >
          <Button onClick={handleCancel} color="error" variant="contained" size='small'>
            <Typography sx={{ color: 'white', fontWeight: '600' }} variant='subtitle1'>
              Cancel
            </Typography>
          </Button>
          <Button
            onClick={handleYes}
            autoFocus
            color="success"
            variant="contained"
            size='small'
          >
            <Typography sx={{ color: 'white', fontWeight: '600' }} variant='subtitle1'>
              Yes
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={8} sx={{ mr: 4 }}>
        <Requests
          reqs={reqs}
          setReqs={props[2]}
          drone={drone?.data?.filter((dr) => dr.available)?.length}
        />
      </Grid>
      <Grid item xs>
        <Drones drone={drone} reqs={reqs} />
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            startIcon={<img src={add} alt="add" width={40} />}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            <Typography sx={{ fontWeight: '600' }}>Add Drone</Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
