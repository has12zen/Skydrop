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
} from '@mui/material';
import axios from 'axios';
import Requests from './Requests';
import Drones from './Drones';
import add from '../../assets/home/add.webp';
import { getAllOrders } from '../queries';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const [drone, setDrone] = useState();
  console.log({ drone });
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get('/api/drones');
      console.log({ resp });
      const data = resp.data.data;
      setDrone(data);
    };
    fetchData();
  }, []);

  const reqs = useOutletContext();
  console.log("Home", {reqs});

  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleYes = async () => {
    const resp = await axios.post('/api/drones/add');
    console.log({ resp });
    drone.data.push({
      available: true,
      latitude: null,
      longitude: null,
      reqId: "",
      speed: null,
      working: true,
    })
    setOpen(false);
  };

  return (
    <Grid container sx={{ padding: '2vmax 4vmax !important', display: 'flex' }}>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>
          <Typography variant="h5">Add Drone</Typography>
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
          <Button onClick={handleCancel} color="error" variant="contained">
            <Typography sx={{ color: 'white', fontWeight: '600' }}>
              Cancel
            </Typography>
          </Button>
          <Button
            onClick={handleYes}
            autoFocus
            color="success"
            variant="contained"
          >
            <Typography sx={{ color: 'white', fontWeight: '600' }}>
              Yes
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={8} sx={{ mr: 4 }}>
        <Requests reqs={reqs} />
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
