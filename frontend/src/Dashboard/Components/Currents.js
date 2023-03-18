import { ArrowDropDown, ArrowRightAlt } from '@mui/icons-material';
import {
  Avatar,
  Backdrop,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getAllOrders } from '../Helper/queries';
import { GetChip } from '../Helper/helper';
import '../Styles/Requests.css';
import data from './DummyData';
import axios from 'axios';

const Current = () => {
  const [dopen, setDopen] = useState('');
  const props = useOutletContext();
  // const reqs = props[0];
  const [lreqs, setLreqs] = useState([]);
  console.log({lreqs})
  
  useEffect(() => {
    console.log("hello", {p: props[0]})
    setLreqs(props[0]);
  }, [props])

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setDopen('');
  };

  const handleOpen = (id) => {
    setDopen(id);
  };

  const handleStatusChange = async (status) => {
    setDopen('');
    setLoading(true);
    const resp = await axios.patch(`/api/requests/${dopen}`, {
      status,
    });
    console.log('Status', { resp });
    const temp = lreqs;
    temp.forEach((req) => {
      if (req.id === dopen) {
        req.status = status;
      }
    });
    props[2](temp);
    setLreqs(temp);
    setLoading(false);
  };

  const Row = (props) => {
    const data = props.row;
    const [open, setOpen] = useState(false);
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
            <Box>
              <Typography variant="subtitle1" sx={{ ml: 4, fontWeight: '700' }}>
                {data.receiverName}
              </Typography>
            </Box>
          </TableCell>
          <TableCell align="center">
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              {data.weight}
            </Typography>
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: '600' }}>
            {Date(data.createdTime._seconds).toString().slice(0, 15)}
          </TableCell>
          <TableCell align="center">
            <Box
              onClick={() =>
                data.status === 'Pending' ? handleOpen(data.id) : null
              }
            >
              {GetChip(data.status)}
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6} sx={{ p: 0 }}>
            <Collapse in={open}>
              <Box
                sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'center' }}
              >
                <tbody style={{ fontSize: '15px' }}>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Pickup Location</td>
                    <td>:&nbsp;</td>
                    <td>{`(${data.pickup.latitude}, ${data.pickup.longitude})`}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700' }}>Delivery Location</td>
                    <td>:&nbsp;</td>
                    <td>{`(${data.destination.latitude}, ${data.destination.longitude})`}</td>
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
    <Container sx={{ py: 3 }}>
      <Backdrop open={loading} sx={{ color: '#fff', zIndex: 1000 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={dopen.length !== 0} onClose={handleClose}>
        <DialogTitle sx={{ px: 4 }}>
          <Typography textAlign={'center'} sx={{ fontWeight: '700' }}>
            Accept the Request
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 2,
            }}
          >
            <Box
              onClick={() => handleStatusChange('Rejected')}
              sx={{
                filter: 'drop-shadow(0px 0px 5px rgb(0,0,0,0.5))',
                transform: 'scale(1.1)',
              }}
            >
              {GetChip('Rejected')}
            </Box>
            <ArrowRightAlt sx={{ mx: 2, transform: 'rotate(180deg)' }} />
            {GetChip('Pending')}
            <ArrowRightAlt sx={{ mx: 2 }} />
            <Box
              onClick={() => (true ? handleStatusChange('Accepted') : null)}
              sx={{
                filter: 'drop-shadow(0px 0px 5px rgb(0,0,0,0.5))',
                transform: 'scale(1.1)',
              }}
            >
              {GetChip('Accepted')}
            </Box>
          </Container>
          {false && (
            <Container sx={{ mt: 3 }}>
              <Typography
                textAlign={'center'}
                sx={{ fontWeight: '800' }}
                variant="h6"
                color={'error'}
              >
                No Drones Available !!
              </Typography>
            </Container>
          )}
        </DialogContent>
      </Dialog>
      <Typography variant="h4">Drone Requests</Typography>
      <TableContainer component={Paper} sx={{ my: 3 }}>
        <Table>
          <TableHead>
            <TableCell className="tableheader" align="center"></TableCell>
            <TableCell className="tableheader" align="left" sx={{ pl: 5 }}>
              Name
            </TableCell>
            <TableCell className="tableheader" align="center" sx={{ pl: 5 }}>
              Weight (KG)
            </TableCell>
            <TableCell className="tableheader" align="center">
              Request Date
            </TableCell>
            <TableCell className="tableheader" align="center" width={100}>
              Status
            </TableCell>
          </TableHead>
          <TableBody sx={{ overflow: 'scroll' }}>
            {(lreqs
              ? lreqs.filter(
                  (req) => ['Pending', 'Accepted', 'Active'].includes(req.status)
                )
              : []
            )
              .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .map((row) => {
                return <Row key={row.userName} row={row} />;
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 6, 7]}
          component="div"
          count={lreqs ? lreqs?.filter((req) => ['Pending', 'Accepted', 'Active'].includes(req.status)).length : 0}
          rowsPerPage={rowPerPage}
          page={page}
          onPageChange={(e, newpage) => setPage(newpage)}
          onRowsPerPageChange={(e) => setRowPerPage(e.target.value)}
        />
      </TableContainer>
    </Container>
  );
};

export default Current;
