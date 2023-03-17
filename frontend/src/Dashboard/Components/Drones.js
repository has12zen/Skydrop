import {
  Box,
  Container,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

const Drones = () => {
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
          {tableRow('Total Drones', 5)}
          {tableRow('Active Drones', 5)}
          {tableRow('Available Drones', 0)}
          {tableRow('Total Requests', 0)}
          {tableRow('Pending Requests', 0)}
        </Table>
      </Paper>
    </Box>
  );
};

export default Drones;
