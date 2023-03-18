import {
  Avatar,
  Box,
  Button,
  Chip,
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
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';
import { useOutletContext } from 'react-router-dom';
import { GetChip } from '../Helper/helper';

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
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src="https://picsum.photos/100" />
          <Typography sx={{ ml: 2 }}>{data.receiverName}</Typography>
        </TableCell>
        <TableCell>{data.userId}</TableCell>
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
  const reqs = useOutletContext();
  const history = reqs?.filter((req) => req.status !== 'Pending');
  return (
    <Box sx={{ padding: '2vmax 4vmax !important', width: '100%' }}>
      <Typography variant="h4">Order History</Typography>
      <Container sx={{ my: 3 }}>
        {!history ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </div>
        ) : history.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableCell align="center">USER</TableCell>
                <TableCell>PACKAGE ID</TableCell>
                <TableCell>WEIGHT (KG)</TableCell>
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
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <Chip label="Nothing to show here" style={{ fontSize: '18px' }} />
          </div>
        )}
      </Container>
    </Box>
  );
};

export default History;
