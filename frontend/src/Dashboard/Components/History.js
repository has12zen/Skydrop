import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';

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
  const [history, setHistory] = useState([]);
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
              <TableHead >
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
