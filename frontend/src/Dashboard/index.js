import React, {useState} from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
// import {Home, History} from '@mui/icons-material';
import './Styles/Dashboard.css';
import home from './Images/home.png'
import current from './Images/current.webp'
import history from './Images/history.webp'
import add from './Images/add.webp'
import logout from './Images/logout.webp'

const Dashboard = () => {
  const [active, setActive] = useState(0);
  
  const MenuItem = (name, icon, idx) => {
    return (
      <Box className={`menuItem ${idx === active ? 'activeMenu' : ''}`} onClick={() => setActive(idx)}>
        <Box sx={{marginRight:"10px"}}>
          <img src={icon} width={40} height={40} alt="menu-item" className="menuIcon" />
        </Box>
        <Typography variant="subtitle1" container="div" sx={{fontWeight: "700"}}>{name}</Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ height: '100vh', backgroundColor: '#518c5b' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={2} sx={{ paddingTop: '20px' }}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Sky Drop
          </Typography>
          <Box className="menuItemCont">
            {MenuItem('Home', home, 0)}
            {MenuItem('Current Requests', current, 1)}
            {MenuItem('Package History', history, 2)}
            {MenuItem('Add Drone', add, 3)}
            {MenuItem('Logout', logout, 4)}
          </Box>
        </Grid>
        <Grid item xs sx={{ padding: '15px 15px 15px 0px' }}>
          <Box className="dashContent">
            <Container sx={{ padding: '2vmax 4vmax !important' }}>
              <Typography variant="h4">Dashboard</Typography>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
