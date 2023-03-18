import { useEffect, useState } from 'react';

import {
  CheckRounded,
  CloseRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  Container,
  TableBody,
  TableRow,
  Avatar,
  CircularProgress,
} from '@mui/material';

import axios from 'axios';

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
      <TableRow key={data.id} style={rowStyle[1]}>
        <TableCell>{data.receiverName}</TableCell>
        <TableCell>{data.id}</TableCell>
        <TableCell>{data.weight}</TableCell>
        {/* <TableCell>{data.size}</TableCell> */}
        <TableCell>{data.status}</TableCell>
        {/* <TableCell>
          <IconButton style={{ color: 'green' }}>
            <CheckRounded />
          </IconButton>
          <IconButton style={{ color: 'red' }}>
            <CloseRounded />
          </IconButton>
        </TableCell> */}
        <TableCell>
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
          </IconButton>
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

const History = () => {
  const [history, setHistory] = useState(null);

  const textStyle = {
    fontFamily: 'TipografiaRamis',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  };

  const fetchHistory = () => {
    axios
      .get('/api/requests')
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // const data = [
  //   {
  //     userName: 'User Name 1',
  //     weight: '100 kg',
  //     size: '100cm x 100cm x 100cm',
  //     requestDate: '17 Jun 2000',
  //     packageId: 101,
  //     status: 0,
  //     avatar: './user.png',
  //   },
  //   {
  //     userName: 'User Name 2',
  //     weight: '100 kg',
  //     size: '100cm x 100cm x 100cm',
  //     requestDate: '17 Jun 2001',
  //     packageId: 102,
  //     status: 1,
  //     avatar: './user.png',
  //   },
  // ];

  return (
    <Box sx={{ padding: '2vmax 4vmax !important', width: '100%' }}>
      <Typography variant="h4">Order History</Typography>
      <Container sx={{ my: 3 }}>
        {!history ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead style={textStyle}>
                <TableCell>USER</TableCell>
                <TableCell>PACKAGE ID</TableCell>
                <TableCell>WEIGHT</TableCell>
                {/* <TableCell>SIZE</TableCell> */}
                <TableCell>STATUS</TableCell>
                {/* <TableCell>APPROVE</TableCell> */}
                <TableCell></TableCell>
              </TableHead>
              <TableBody>
                {history.map((data, index) => (
                  <HistoryElement data={data} key={'data-history-' + index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default History;
