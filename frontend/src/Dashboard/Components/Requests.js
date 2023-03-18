import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { useNavigate } from 'react-router-dom';
import { ArrowDropDown, Send } from '@mui/icons-material';
import '../Styles/Requests.css';
import { getAllOrders } from '../queries';
import data from './DummyData'

const GetChip = (chipId) => {
  switch (chipId) {
    case "Pending":
      return (
        <Chip label="Pending" sx={{ color: 'black', fontWeight: '700' }} />
      );
    case "Active":
      return (
        <Chip
          label="Active"
          sx={{ backgroundColor: 'orange', color: 'white', fontWeight: '700' }}
        />
      );
    case "Completed":
      return (
        <Chip
          label="Completed"
          sx={{ backgroundColor: 'green', color: 'white', fontWeight: '700' }}
        />
      );
    case "Rejected":
      return (
        <Chip
          label="Rejected"
          sx={{ backgroundColor: 'red', color: 'white', fontWeight: '700' }}
        />
      );
    default:
      return;
  }
};

const Requests = ({reqs}) => {
  const Row = (props) => {
    const InnerRow = (label, value, border=true) => {
      return (
        <tr style={{borderBottom: `${border?"1px solid rgb(100,100,100)":"0px solid"}`}}>
          <td style={{ fontWeight: '700' }}>{label}</td>
          <td>:&nbsp;</td>
          <td>{value}</td>
        </tr>
      );
    };
    
    const row = props.row;
    
    const [open, setOpen] = useState(false);
    const plocation =
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
              <Avatar src="https://picsum.photos/100" />
              <Typography variant="subtitle1" sx={{ ml: 4, fontWeight: '700' }}>
                {row.receiverName}
              </Typography>
            </Box>
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: '600' }}>
            {Date(row.createdTime._seconds).toString().slice(0, 24)}
          </TableCell>
          <TableCell align="center">{GetChip(row.status)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4} sx={{ p: 0 }}>
            <Collapse in={open}>
              <Box
                sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'center' }}
              >
                <tbody>
                  {InnerRow('Weight', row.weight)}
                  {InnerRow('Pick Up Location', `(${row.pickup.latitude}, ${row.pickup.longitude})`)}
                  {InnerRow('Delivery Location', `(${row.destination.latitude}, ${row.destination.longitude})`, false)}
                </tbody>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  const navigate = useNavigate();

  return (
    <Box sx={{py: 3}}>
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
            {(reqs.data?reqs.data.slice(0, 6):[]).map((row) => {
              return (
                <Row
                  key={row.userName}
                  row={row}
                />
              );
            })}
          </TableBody>
        </Table>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="text"
            endIcon={<Send />}
            sx={{ color: 'black' }}
            onClick={() => navigate('currents')}
          >
            Show all
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default Requests;
