import React, { useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import { ArrowDropDown, Send } from '@mui/icons-material';
import '../Styles/Requests.css';

const GetChip = (chipId) => {
  switch(chipId) {
    case 0: return <Chip label="Pending" sx={{ color: 'black', fontWeight: '700' }} />;
    case 1: return (
      <Chip
        label="Active"
        sx={{ backgroundColor: 'orange', color: 'white', fontWeight: '700' }}
      />
    );
    case 2: return (
      <Chip
        label="Completed"
        sx={{ backgroundColor: 'green', color: 'white', fontWeight: '700' }}
      />
    );
    case 3: return (
      <Chip
        label="Rejected"
        sx={{ backgroundColor: 'red', color: 'white', fontWeight: '700' }}
      />
    );
    default: return;
  }
};

const Requests = ({setActive}) => {
  const Row = (props) => {
    const [open, setOpen] = useState(false);
    const plocation =
      '23 Street, 2nd Cross, 3rd Main, 4th Block, 5th Ward, 6th Town, 7th City, 8th State, 9th Country';
    const dlocation =
      '23 Street, 2nd Cross, 3rd Main, 4th Block, 5th Ward, 6th Town, 7th City, 8th State, 9th Country';
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <ArrowDropDown
              sx={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                cursor: 'pointer',
              }}
              onClick={() => setOpen(!open)}
            />
          </TableCell>
          <TableCell align="left">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src='https://picsum.photos/100' />
              <Typography variant="subtitle1" sx={{ ml: 4, fontWeight: '700' }}>
                User Name
              </Typography>
            </Box>
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: '600' }}>
            17 Jun 2001
          </TableCell>
          <TableCell align="center">
            {GetChip(1)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4} sx={{ p: 0 }}>
            <Collapse in={open}>
              <Box
                sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'center' }}
              >
                <tbody>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Weight</td>
                    <td>:&nbsp;</td>
                    <td>20kg</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Size</td>
                    <td>:&nbsp;</td>
                    <td>100cm x 100cm x 100cm</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Pickup Location</td>
                    <td>:&nbsp;</td>
                    <td>{plocation}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Delivery Location</td>
                    <td>:&nbsp;</td>
                    <td>{dlocation}</td>
                  </tr>
                </tbody>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <Box>
      <Typography variant="h5">Requests</Typography>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableCell className="tableheader" align="center"></TableCell>
            <TableCell className="tableheader" align="left" sx={{ pl: 5 }}>
              Name
            </TableCell>
            <TableCell className="tableheader" align="center">
              Request Date
            </TableCell>
            <TableCell className="tableheader" align="center">
              Status
            </TableCell>
          </TableHead>
          <TableBody>
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
          </TableBody>
        </Table>
        <Box sx={{ textAlign: 'right' }}>
          <Button variant="text" endIcon={<Send />} sx={{ color: 'black' }} onClick={() => setActive(1)}>
            Show all
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default Requests;