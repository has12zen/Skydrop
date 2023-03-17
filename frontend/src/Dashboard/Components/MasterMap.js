import * as React from 'react';
import { useState } from 'react';
import { LiveMap } from '../../Components/Map/liveMap';
import {  Card, CardContent,  Typography } from '@mui/material';
import '../Styles/MasterMap.css';

const DemoCard = ({ drone }) => {
  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {drone.color}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          latitude:{drone.latitude}\n

          longitude:{drone.longitude}
        </Typography>
        <Typography variant="body2">
            This is drone info
        </Typography>
      </CardContent>
    </Card>
  );
};
function MasterMap() {
  const [viewState, setViewState] = useState({
    latitude: 40,
    longitude: -73,
    zoom: 12,
  });
  const [markers, setMarkers] = useState([
    {
      latitude: 41.75,
      longitude: -73.98,
    },
  ]);
  const [warehouses, setWarehouses] = useState([
    {
      latitude: 39,
      longitude: -73.98,
    },
  ]);
  const [drones, setDrones] = useState([
    {
      latitude: 40.75,
      longitude: -73.98,
      color: 'red',
    },
  ]);
  const dataOne = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [warehouses[0].longitude, warehouses[0].latitude],
            [markers[0].longitude, markers[0].latitude],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [warehouses[0].longitude, warehouses[0].latitude],
            [markers[0].longitude, markers[0].longitude],
          ],
        },
      },
    ],
  };
 
  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
        <div
          style={{
            overflow: 'auto',
          }}
        >
          {drones.map((drone, index) => (
            <div key={index} item xs={12}>
              <DemoCard drone={drone} />
            </div>
          ))}
        </div>
        <div id="mapCont">
          <LiveMap
            dataOne={dataOne}
            viewState={viewState}
            setViewState={setViewState}
            drones={drones}
            warehouses={warehouses}
            markers={markers}
          />
        </div>
      </div>
    </>
  );
}
export default MasterMap;
