import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  CircularProgress,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  IconButton,
} from '@mui/material';

import {
  CheckRounded,
  CloseRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';
import { GetChip } from '../../Dashboard/Helper/helper';

import axios from 'axios';
// import Requests from './Requests';
// import Drones from './Drones';

const HistoryElement = ({ data }) => {
  console.log({ data });

  const [open, setOpen] = useState(false);

  const rowStyle = [
    {
      backgroundColor: '#f2f2f2',
    },
    {
      backgroundColor: '#ffffff',
    },
  ];

  return (
    <>
      <TableRow
        key={data.id}
        style={{ ...rowStyle[1], cursor: 'pointer' }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <TableCell>
          {/* <Avatar src="https://picsum.photos/100" /> */}
          <Typography sx={{ ml: 2 }}>{data.receiverName}</Typography>
        </TableCell>
        <TableCell>{data.id}</TableCell>
        <TableCell>{data.weight}</TableCell>
        {/* <TableCell>{data.size}</TableCell> */}
        <TableCell>{GetChip(data.status)}</TableCell>
        {/* <TableCell>
          <IconButton style={{ color: 'green' }}>
            <CheckRounded />
          </IconButton>
          <IconButton style={{ color: 'red' }}>
            <CloseRounded />
          </IconButton>
        </TableCell> */}
        <TableCell>
          {open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
        </TableCell>
      </TableRow>
      {open && (
        <>
          <TableRow style={rowStyle[0]}>
            <TableCell>Pickup Location:</TableCell>
            <TableCell>Latitude {data.pickup.latitude}</TableCell>
            <TableCell>Longitude {data.pickup.longitude}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow style={rowStyle[0]}>
            <TableCell>Destination</TableCell>
            <TableCell>Latitude {data.destination.latitude}</TableCell>
            <TableCell>Longitude {data.destination.longitude}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </>
      )}
    </>
  );
};

const ActiveHistory = ({ history }) => {
  const textStyle = {
    fontFamily: 'TipografiaRamis',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <Box>
      <Container sx={{ my: 3 }}>
        <TableContainer>
          <Table>
            <TableHead style={textStyle}>
              <TableCell style={{ fontWeight: 'bold' }}>USER</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>PACKAGE ID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>WEIGHT</TableCell>
              {/* <TableCell>SIZE</TableCell> */}
              <TableCell style={{ fontWeight: 'bold' }}>STATUS</TableCell>
              {/* <TableCell>APPROVE</TableCell> */}
              <TableCell style={{ fontWeight: 'bold' }}></TableCell>
            </TableHead>
            <TableBody>
              {history.map((data, index) => (
                <HistoryElement data={data} key={'data-history-' + index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

const Home = ({ user }) => {
  const [activePickups, setActivePickups] = useState(null);

  useEffect(() => {
    fetchActivePickups();
  }, []);

  const fetchActivePickups = () => {
    axios
      .get('/api/requests/active')
      .then((res) => {
        setActivePickups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        padding: '2vmax 4vmax !important',
        width: '100%',
        overflow: 'auto',
      }}
    >
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
          <ActiveHistory history={activePickups} />
        )}
      </Box>
    </Box>
  );
};

export default Home;
