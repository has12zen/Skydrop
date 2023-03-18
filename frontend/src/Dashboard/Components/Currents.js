import { ArrowDropDown } from '@mui/icons-material';
import {
  Avatar,
  Chip,
  Collapse,
  Container,
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

const Current = () => {
  const props = useOutletContext();
  const reqs = props[0];

  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);

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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src="https://picsum.photos/100" />
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
            {Date(data.createdTime._seconds).toString().slice(0, 24)}
          </TableCell>
          <TableCell align="center">{GetChip(data.status)}</TableCell>
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
            {(reqs
              ? reqs.filter(
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
          count={reqs ? reqs?.length : 0}
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
