import { useEffect, useState } from 'react';

import {
  CheckRounded,
  CloseRounded,
  ShareLocationRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  Container,
  TableBody,
  TableRow,
  CircularProgress,
  Tooltip,
  Modal,
} from '@mui/material';
import { LiveMap } from '../../Components/Map/liveMap';
import './History.css';
import { getLines } from '../../Utils/geoJson';
import axios from 'axios';

function BasicModal(props) {
  const { req } = props;
  const { destination, pickup, id } = req;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [lines, setLines] = useState();
  const [viewState, setViewState] = useState({
    ...destination,
    zoom: 15,
  });
  const points = [[pickup, destination]];
  const currentLines = getLines(points);
  const [markers, setMarkers] = useState([destination]);
  const [warehouses, setWarehouses] = useState([pickup]);
  const [drones, setDrones] = useState([]);
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Share Location">
          <ShareLocationRounded />
        </Tooltip>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LiveMap
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{
            height: '80%',
            width: '80%',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.2)',
            zIndex: 100,
          }}
          dataOne={currentLines}
          viewState={viewState}
          setViewState={setViewState}
          drones={drones}
          warehouses={warehouses}
          markers={markers}
        />
      </Modal>
    </div>
  );
}

const HistoryElement = ({ data }) => {
  console.log({ data });

  const [open, setOpen] = useState(false);

  const rowStyle = [
    {
      backgroundColor: '#f2f2f2',
    },
    {
      backgroundColor: '#ffffff',
    },
  ];

  return (
    <>
      <TableRow key={data.id} style={rowStyle[1]}>
        <TableCell>
          <BasicModal req={data} />
        </TableCell>
        <TableCell>{data.receiverName}</TableCell>
        <TableCell>{data.id}</TableCell>
        <TableCell>{data.weight}</TableCell>
        {/* <TableCell>{data.size}</TableCell> */}
        <TableCell>{data.status}</TableCell>
        {/* <TableCell>
          <IconButton style={{ color: 'green' }}>
            <CheckRounded />
          </IconButton>
          <IconButton style={{ color: 'red' }}>
            <CloseRounded />
          </IconButton>
        </TableCell> */}
        <TableCell>
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
          </IconButton>
        </TableCell>
      </TableRow>
      {open && (
        <>
          <TableRow style={rowStyle[0]}>
            <TableCell>Pickup Location:</TableCell>
            <TableCell>Latitude {data.pickup.latitude}</TableCell>
            <TableCell>Longitude {data.pickup.longitude}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow style={rowStyle[0]}>
            <TableCell>Destination</TableCell>
            <TableCell>Latitude {data.destination.latitude}</TableCell>
            <TableCell>Longitude {data.destination.longitude}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </>
      )}
    </>
  );
};

const History = () => {
  const [history, setHistory] = useState(null);

  const textStyle = {
    fontFamily: 'TipografiaRamis',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  };

  const fetchHistory = () => {
    axios
      .get('/api/requests')
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Box sx={{ padding: '2vmax 4vmax !important', width: '100%' }}>
      <Typography variant="h4">Order History</Typography>
      <hr />
      <Container sx={{ my: 3 }}>
        {!history ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '100px',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead style={textStyle}>
                <TableCell style={{ fontWeight: 'bold' }}>Track</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>USER</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>PACKAGE ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>WEIGHT</TableCell>
                {/* <TableCell>SIZE</TableCell> */}
                <TableCell style={{ fontWeight: 'bold' }}>STATUS</TableCell>
                {/* <TableCell>APPROVE</TableCell> */}
                <TableCell style={{ fontWeight: 'bold' }}></TableCell>
              </TableHead>
              <TableBody>
                {history.map((data, index) => (
                  <HistoryElement data={data} key={'data-history-' + index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default History;
