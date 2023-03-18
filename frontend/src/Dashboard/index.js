import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography,
  Card,
  CardContent,
  Menu,
  Button,
  MenuItem,
  Badge
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet, useNavigate } from 'react-router-dom';
import './Styles/Dashboard.css';
import {
  Home,
  HourglassTop,
  History,
  Logout,
  LocationOn,
} from '@mui/icons-material';
import { getAllOrders, getUsersRequests } from './Helper/queries';
import {notifData} from './Components/DummyData';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';

const eraseCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const Dashboard = ({ setUser, user }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [requests, setRequests] = useState([]);
  const [notifs, setNotifs] = useState(notifData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drone, setDrone] = useState();

  const handleRequestChange = (newReq) => {
    setRequests(newReq);
  };
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log('Index', { requests });
  console.log(notifs);
  
  console.log("Index", { drone });
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get('/api/drones');
      const data = resp.data.data;
      setDrone(data);
    };
    fetchData();
  }, []);

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
      setRequests(resp);
    };
    if (user?.admin) {
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

  const MenuItem1 = (name, route = '/', icon, idx, onClickHandler = null) => {
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
  
  function NotificationsButton() {
    return (
      <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <NotificationsIcon/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}

        sx={{
          position: 'absolute',
          top: '35%',
          left: '105%',
          transform: 'translate(-50%, -50%)',
          // backgroundColor: 'white',
          width: '50%',
          height: '50%',
          textAlign: 'right',
          padding: 2,
          opacity: '1',
          display: "flex"
        }}
      >

        {
        notifs.map((notif) => {
          return <MenuItem onClick={handleClose}>{notif.data}</MenuItem>;
        })
        }
      </Menu>
    </div>
    );
  }

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
                {MenuItem1('Home', '/', <Home />, 0)}
                {MenuItem1('Current Requests', 'currents', <HourglassTop />, 1)}
                {MenuItem1('Package History', 'history', <History />, 2)}
                {MenuItem1('Master Map', 'map', <LocationOn />, 3)}
                {MenuItem1('Logout', '', <Logout />, 4, () => {
                  logout();
                })}
              </>
            ) : (
              <>
                {MenuItem1('Home', '/', <Home />, 0)}
                {MenuItem1('Request Pickup', 'new-pickup', <HourglassTop />, 1)}
                {MenuItem1('Order History', 'order-history', <History />, 2)}
                {MenuItem1('Logout', '', <Logout />, 3, () => {
                  logout();
                })}
              </>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs
          sx={{ padding: '15px 15px 15px 0px', maxHeight: '100vh', position: "relative" }}
        >
          <Box
            className="dashContent"
            sx={{ overflow: 'auto', height: '100%' }}
          >
            <Outlet context={[requests, drone, handleRequestChange, setDrone]} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '15px',
              right: '30px',
              textAlign: 'right',
              padding: 2,
              opacity: '1',
              display: "flex"
            }}
          >
            {/* <NotificationsIcon/> */}
            <NotificationsButton/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
