import { Button, Container, Table, TableCell, TableContainer, TableHead, Typography } from '@mui/material';
import React from 'react';
import axios from 'axios';

const History = () => {
  // axios.patch('http://localhost:3002/api/requests/IUI5rbFSjB2RiOgYjQ6O', {
  //   status: "completed",
  // }).then((res) => {
  //   console.log(res);
  // }).catch((err) => {
  //   console.log(err);
  // });

  // axios.get('http://localhost:3002/api/requests').then((resp) => {
  //   console.log(resp);
  // }).catch((err) => {
  //   console.log(err);
  // })

  const onClickHandler = () => {
    // axios.post("http://localhost:3002/api/drones/add").then((res) => {
    //   console.log({res});
    // }).catch((err) => {
    //   console.log({err});
    // })
    // axios.get("http://localhost:3002/api/drones").then((res) => {
    //   console.log({res});
    // }).catch((err) => {
    //   console.log({err});
    // })

    // axios.patch("http://localhost:3002/api/drones/CXNBGM09iNVXVtQWDvjb", {
    //   latitude: 70,
    //   longitude: -30,
    //   available: false
    // }).then((res) => {
    //   console.log({res});
    // }).catch((err) => {
    //   console.log({err});
    // })
  };

  
  return (
    <Container sx={{my: 3}}>
      <Typography variant="h4">Package History</Typography>
      <Button onClick={onClickHandler}>make req</Button>
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