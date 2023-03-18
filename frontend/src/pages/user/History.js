import { Box, Typography, TableContainer, Table, TableHead, TableCell, Container, TableBody, TableRow } from '@mui/material';
const { data } = require('./DummyPackHistData')
const History = () => {
  const textStyle = {
    fontFamily: 'TipografiaRamis',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333'
  };

  const rowStyle = [
    {
      backgroundColor: '#f2f2f2',
    },
    {
      backgroundColor: '#ffffff',
    }
  ];

  const data = [
    {
      userName: 'User Name 1',
      weight: '100 kg',
      size: '100cm x 100cm x 100cm',
      requestDate: '17 Jun 2000',
      packageId: 101,
      status: 0,
      avatar: './user.png'
    },
    {
      userName: 'User Name 2',
      weight: '100 kg',
      size: '100cm x 100cm x 100cm',
      requestDate: '17 Jun 2001',
      packageId: 102,
      status: 1,
      avatar: './user.png'
    },
    
  ];

  return (
    <Box sx={{ padding: '2vmax 4vmax !important', width: '100%' }}>
      <Typography variant="h4">Order History</Typography>
      <Container sx={{my: 3}}>
      <TableContainer>
        <Table>
          <TableHead style = {textStyle}> 
            <TableCell>USER IMAGE</TableCell>
            <TableCell>USER</TableCell>
            <TableCell>PACKAGE ID</TableCell>
            <TableCell>WEIGHT</TableCell>
            <TableCell>SIZE</TableCell>
            <TableCell>STATUS</TableCell>
          </TableHead>
          <TableBody>
            {
              data.map((data, index) => (
                <TableRow key = {data.packageId}style={rowStyle[index % 2]}>
                  <TableCell><img src = {data.avatar} alt = "Avatar"></img></TableCell>
                  <TableCell>{data.userName}</TableCell>
                  <TableCell>{data.packageId}</TableCell>
                  <TableCell>{data.weight}</TableCell>
                  <TableCell>{data.size}</TableCell>
                  <TableCell>{data.status}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </Box>
  );
};

export default History;
