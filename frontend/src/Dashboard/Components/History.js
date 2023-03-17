import { Container, Table, TableCell, TableContainer, TableHead, Typography } from '@mui/material';
import React from 'react';

const History = () => {
  return (
    <Container sx={{my: 3}}>
      <Typography variant="h4">Package History</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Package ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Package ID</TableCell>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default History;