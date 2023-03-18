import React, { useState, useEffect } from 'react';

import {
  Button,
  Box,
  Grid,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Input,
} from '@mui/material';

import { CheckRounded, SearchRounded } from '@mui/icons-material';
import { MapProvider, useMap } from 'react-map-gl';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { DefaultMap } from '../../Components/Map';
import { MAPBOX_TOKEN } from '../../constants';

import './RequestPickup.css';

function ListPickUps({ places, setMarker }) {
  const { myMapB } = useMap();
  return (
    <>
      {places.map((place, index) => {
        return (
          <div
            key={'place-result-' + index}
            style={{ padding: '10px' }}
            class="place-result-pick"
            onClick={() => {
              const points = place.geometry.coordinates;
              // console.log('place', place);
              setMarker({
                latitude: points[1],
                longitude: points[0],
              });
              // console.log('myMapB', myMapB);
              myMapB.flyTo({ center: points });
            }}
          >
            {place.place_name}
          </div>
        );
      })}
    </>
  );
}

const SelectLocation = ({
  title,
  onClose,
  selectedValue,
  open,
  marker,
  setMarker,
}) => {
  const [searchText, setSearchText] = useState('');

  const [viewState, setViewState] = useState({
    latitude: 20.149,
    longitude: 85.665,
    zoom: 12,
  });

  const [places, setPlaces] = useState([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const search = () => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText
          .split(' ')
          .join('%20')}.json?access_token=${MAPBOX_TOKEN}`
      )
      .then((res) => {
        setPlaces(res.data.features);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchText.length === 0) setPlaces([]);
    else search();
  }, [searchText]);

  return (
    <MapProvider>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        PaperProps={{ sx: { width: '100%', height: '100%' } }}
      >
        <div
          style={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Input
              label="Address"
              type="text"
              style={{ width: '300px' }}
              value={searchText}
              onChange={(e) => {
                const text = e.target.value.trimStart();

                setSearchText(text);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      if (searchText.length > 0) search();
                    }}
                  >
                    <SearchRounded />
                  </IconButton>
                </InputAdornment>
              }
            />
            <div
              style={{
                position: 'absolute',
                zIndex: 5,
                background: 'white',
                top: '50px',
              }}
            >
              <ListPickUps places={places} setMarker={setMarker} />
            </div>

            <IconButton
              onClick={handleClose}
              style={{ position: 'absolute', right: '10px' }}
            >
              <CheckRounded fill="green" />
            </IconButton>
          </div>
        </div>

        <DefaultMap
          marker={marker}
          setMarker={setMarker}
          viewState={viewState}
          setViewState={setViewState}
        />
      </Dialog>
    </MapProvider>
  );
};

const RequestPickup = () => {
  const navigate = useNavigate();

  const [openPickupDialog, setOpenPickupDialog] = useState(false);
  const [openDestDialog, setOpenDestDialog] = useState(false);
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [weight, setWeight] = useState(0);

  const [pickupMarker, setPickupMarker] = useState({
    latitude: 20.14529,
    longitude: 85.67352,
  });

  const [destMarker, setDestMarker] = useState({
    latitude: 20.14529,
    longitude: 85.67352,
  });

  const placeOrder = () => {
    const data = {
      weight,
      pickup: pickupMarker,
      destination: destMarker,
      receiverName,
      receiverPhone,
      receiverEmail,
    };

    axios
      .post('/api/requests/create', data)
      .then((res) => {
        console.log({ res });

        navigate('/');
      })
      .catch((err) => {
        console.log({ err });

        alert('Failed to place order. Try again later!');
      });
  };

  return (
    <Box sx={{ padding: '2vmax 4vmax !important', width: '100%' }}>
      <Typography variant="h4">Request Pickup</Typography>
      <hr />

      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{ margin: '10px 0px 10px 0px' }}
        >
          <TextField
            value={receiverName}
            label="Receiver Name"
            type="text"
            onChange={(e) => {
              setReceiverName(e.target.value);
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{ margin: '10px 0px 10px 0px' }}
        >
          <TextField
            value={receiverPhone}
            label="Receiver Phone"
            type="tel"
            onChange={(e) => setReceiverPhone(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{ margin: '10px 0px 10px 0px' }}
        >
          <TextField
            value={receiverEmail}
            label="Receiver Email"
            type="email"
            onChange={(e) => setReceiverEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <div
            onClick={() => setOpenPickupDialog(true)}
            style={{
              cursor: 'pointer',
              padding: '20px',
              margin: '10px 0px 10px 0px',
              borderRadius: '5px',
              backgroundColor: 'rgb(240, 240, 240)',
            }}
          >
            <div style={{ fontWeight: 600 }}>Select Pickup Location</div>
            <div>
              lat: {pickupMarker.latitude}, long:
              {pickupMarker.longitude}
            </div>
          </div>
          <SelectLocation
            marker={pickupMarker}
            setMarker={setPickupMarker}
            title="Select Pickup Location"
            open={openPickupDialog}
            onClose={() => setOpenPickupDialog(false)}
          />
        </Grid>
        <Grid item xs={12}>
          <div
            onClick={() => setOpenDestDialog(true)}
            style={{
              cursor: 'pointer',
              padding: '20px',
              margin: '10px 0px 10px 0px',
              borderRadius: '5px',
              backgroundColor: 'rgb(240, 240, 240)',
            }}
          >
            <div style={{ fontWeight: 600 }}>Select Destination Location</div>
            <div>
              lat: {destMarker.latitude}, long:
              {destMarker.longitude}
            </div>
          </div>
        </Grid>
        <SelectLocation
          marker={destMarker}
          setMarker={setDestMarker}
          title="Select Destination Location"
          open={openDestDialog}
          onClose={() => setOpenDestDialog(false)}
        />

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{ margin: '10px 0px 10px 0px' }}
        >
          <TextField
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            label="Payload Weight"
            type="number"
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button variant="contained" onClick={placeOrder}>
            PLACE ORDER
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestPickup;
