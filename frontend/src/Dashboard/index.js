import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import './Styles/Dashboard.css';
import {
  Home,
  HourglassTop,
  History,
  Logout,
  LocationOn,
} from '@mui/icons-material';
import {getAllOrders, getUsersRequests} from './queries';

import { getAuth, signOut } from 'firebase/auth';

const eraseCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const Dashboard = ({ setUser, user }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [requests, setRequests] = useState([]);
  console.log("index", {requests})

  useEffect(() => {
    const location = window.location.pathname.split('/')[1];
    switch (location) {
      case undefined: {
        setActive(0);
        break;
      }
      case 'currents': {
        setActive(1);
        break;
      }
      case 'history': {
        setActive(2);
        break;
      }
      case 'map': {
        setActive(3);
        break;
      }
      case 'new-pickup': {
        setActive(1);
        break;
      }
      case 'order-history': {
        setActive(2);
        break;
      }
      default:
        setActive(0);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getAllOrders();
      console.log({resp})
      setRequests(resp.data);
    };
    if(user?.admin){
      fetchData();
    }
  }, [user?.admin]);

  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        eraseCookie('accessToken');

        setUser(null);

        navigate('/');
      })
      .catch((error) => {
        alert('Failed to logout. Try again later!');
      });
  };

  const MenuItem = (name, route = '/', icon, idx, onClickHandler = null) => {
    return (
      <Box
        className={`menuItem ${idx === active ? 'activeMenu' : ''}`}
        onClick={() => (onClickHandler ? onClickHandler() : navigate(route))}
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
    <Box sx={{ height: '100vh', backgroundColor: '#4599e6' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={2} sx={{ paddingTop: '20px' }}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Sky Drop
          </Typography>
          <Box className="menuItemCont">
            {user?.admin ? (
              <>
                {MenuItem('Home', '/', <Home />, 0)}
                {MenuItem('Current Requests', 'currents', <HourglassTop />, 1)}
                {MenuItem('Package History', 'history', <History />, 2)}
                {MenuItem('Master Map', 'map', <LocationOn />, 3)}
                {MenuItem('Logout', '', <Logout />, 4, () => {
                  logout();
                })}
              </>
            ) : (
              <>
                {MenuItem('Home', '/', <Home />, 0)}
                {MenuItem('Request Pickup', 'new-pickup', <HourglassTop />, 1)}
                {MenuItem('Order History', 'order-history', <History />, 2)}
                {MenuItem('Logout', '', <Logout />, 3, () => {
                  logout();
                })}
              </>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs
          sx={{ padding: '15px 15px 15px 0px', maxHeight: '100vh' }}
        >
          <Box
            className="dashContent"
            sx={{ overflow: 'auto', height: '100%' }}
          >
            <Outlet context={requests.data} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
