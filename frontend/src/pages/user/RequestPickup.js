import React, { useState, useEffect } from 'react';

import {
  Autocomplete,
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

import { DefaultMap } from '../../Components/Map';

import { SearchRounded } from '@mui/icons-material';
import { MapProvider, useMap } from 'react-map-gl';

import axios from 'axios';

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
              myMapB.flyTo({center: points});
            }}
          >
            {place.place_name}
          </div>
        );
      })}
    </>
  );
}

const SelectLocation = ({ title, onClose, selectedValue, open }) => {
  const [searchText, setSearchText] = useState('');

  const [viewState, setViewState] = useState({
    latitude: 40.75,
    longitude: -73.98,
    zoom: 12,
  });
  const [marker, setMarker] = useState({
    latitude: 40.75,
    longitude: -73.98,
  });
  const { myMapB } = useMap();

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
              <ListPickUps places={places} setMarker={setMarker} />
            <div
              style={{
                position: 'absolute',
                zIndex: 5,
                background: 'white',
                top: '50px',
              }}
            ></div>
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
  const [openPickupDialog, setOpenPickupDialog] = useState(false);
  const [openDestDialog, setOpenDestDialog] = useState(false);

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
          <TextField label="Receiver Name" type="text" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{ margin: '10px 0px 10px 0px' }}
        >
          <TextField label="Receiver Phone" type="tel" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{ margin: '10px 0px 10px 0px' }}
        >
          <TextField label="Receiver Email" type="email" />
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
            Select Pickup Location
          </div>
          <SelectLocation
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
            Select Destination Location
          </div>
        </Grid>
        <SelectLocation
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
          <TextField label="Payload Weight" type="number" />
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
          <Button variant="contained">PLACE ORDER</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestPickup;
