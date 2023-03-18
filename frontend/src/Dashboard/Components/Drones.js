import {
  Box,
  Container,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import data from './DummyData';

const Drones = ({drone, reqs}) => {
  const tableRow = (a, b) => {
    return (
      <TableRow sx={{ width: '100%' }}>
        <TableCell sx={{ fontSize: '15px', fontWeight: '700' }}>
          {a}:{' '}
        </TableCell>
        <TableCell sx={{ fontSize: '15px', fontWeight: '700' }}>{b}</TableCell>
      </TableRow>
    );
  };

  return (
    <Box sx={{mt:3}}>
      <Typography variant="h5">Drones</Typography>
      <Paper elevation={3} sx={{ mt: 3 }}>
        <Box sx={{textAlign: "center"}}>
          <img
            src="https://thumbs.gfycat.com/ColorfulUnluckyArthropods-max-1mb.gif"
            alt="drone"
            width={200}
          />
        </Box>
        <Table>
          {tableRow('Total Drones', drone?.data?.length)}
          {tableRow('Active Drones', drone?.data?.filter((dr) => dr.working)?.length)}
          {tableRow('Available Drones', drone?.data?.filter((dr) => dr.available)?.length)}
          {tableRow('Total Requests', reqs?.data?.length)}
          {tableRow('Pending Requests', reqs?.data?.filter((req) => req.status==="Pending")?.length)}
        </Table>
      </Paper>
    </Box>
  );
};

export default Drones;
