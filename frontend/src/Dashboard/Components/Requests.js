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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDropDown,
  Send,
  ArrowRightAlt,
} from '@mui/icons-material';
import '../Styles/Requests.css';
import { getAllOrders } from '../Helper/queries';
import { GetChip } from '../Helper/helper';
import data from './DummyData';

const Requests = ({ reqs, setReqs, drone }) => {
  const [dopen, setDopen] = useState('');
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
    const temp = reqs;
    temp.forEach((req) => {
      if (req.id === dopen) {
        req.status = status;
      }
    });
    setReqs(temp);
    setLoading(false);
  };

  const Row = (props) => {
    const InnerRow = (label, value, border = true) => {
      return (
        <tr
          style={{
            borderBottom: `${
              border ? '1px solid rgb(100,100,100)' : '0px solid'
            }`,
          }}
        >
          <td style={{ fontWeight: '700' }}>{label}</td>
          <td>:&nbsp;</td>
          <td>{value}</td>
        </tr>
      );
    };

    const row = props.row;

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
          <TableCell align="center">
            <Box onClick={() => row.status === 'Pending' ? handleOpen(row.id) : null}>{GetChip(row.status)}</Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4} sx={{ p: 0 }}>
            <Collapse in={open}>
              <Box
                sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'center' }}
              >
                <tbody>
                  {InnerRow('Weight', `${row.weight} KG`)}
                  {InnerRow(
                    'Pick Up Location',
                    `(${row.pickup.latitude}, ${row.pickup.longitude})`
                  )}
                  {InnerRow(
                    'Delivery Location',
                    `(${row.destination.latitude}, ${row.destination.longitude})`,
                    false
                  )}
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
    <Box sx={{ py: 3 }}>
      <Backdrop open={loading} sx={{color: '#fff', zIndex: 1000}}>
        <CircularProgress color='inherit' />
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
              py:2
            }}
          >
            <Box onClick={() => handleStatusChange('Rejected')} sx={{filter: "drop-shadow(0px 0px 5px rgb(0,0,0,0.5))", transform: "scale(1.1)"}}>{GetChip('Rejected')}</Box>
            <ArrowRightAlt sx={{ mx: 2, transform:"rotate(180deg)" }} />
            {GetChip('Pending')}
            <ArrowRightAlt sx={{ mx: 2 }} />
            <Box onClick={() => true ? handleStatusChange('Accepted') : null} sx={{filter: "drop-shadow(0px 0px 5px rgb(0,0,0,0.5))", transform: "scale(1.1)"}}>{GetChip('Accepted')}</Box>
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
            {(reqs
              ? reqs.filter((req) => ['Pending', 'Accepted', 'Active'].includes(req.status)).slice(0, 6)
              : []
            ).map((row) => {
              return <Row key={row.userName} row={row} />;
            })}
          </TableBody>
        </Table>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="text"
            endIcon={<Send />}
            sx={{ color: 'black' }}
            onClick={() => navigate('/currents')}
          >
            Show all
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default Requests;
